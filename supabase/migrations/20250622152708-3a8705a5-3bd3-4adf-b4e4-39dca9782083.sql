
-- Create a transactions table to track all FPT movements
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount NUMERIC NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('earn_share', 'earn_tip_received', 'spend_tip', 'spend_subscription', 'bonus', 'referral')),
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on transactions table
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for transactions
CREATE POLICY "Users can view their own transactions" 
  ON public.transactions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions" 
  ON public.transactions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create an index for faster queries
CREATE INDEX idx_transactions_user_id_created_at ON public.transactions(user_id, created_at DESC);

-- Create a function to calculate user's current FPT balance
CREATE OR REPLACE FUNCTION public.get_user_fpt_balance(target_user_id UUID)
RETURNS NUMERIC
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT COALESCE(
    (SELECT SUM(amount) FROM public.transactions WHERE user_id = target_user_id),
    (SELECT fpt_balance FROM public.profiles WHERE id = target_user_id)
  );
$$;

-- Create a function to add FPT tokens (for earnings)
CREATE OR REPLACE FUNCTION public.add_fpt_tokens(
  target_user_id UUID,
  token_amount NUMERIC,
  transaction_type TEXT,
  description TEXT DEFAULT NULL,
  metadata JSONB DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert the transaction record
  INSERT INTO public.transactions (
    user_id,
    amount,
    transaction_type,
    description,
    metadata
  ) VALUES (
    target_user_id,
    token_amount,
    transaction_type,
    description,
    metadata
  );

  -- Update the profiles table with the new balance
  UPDATE public.profiles 
  SET fpt_balance = public.get_user_fpt_balance(target_user_id),
      updated_at = now()
  WHERE id = target_user_id;

  RETURN TRUE;
END;
$$;

-- Create a function to spend FPT tokens (for tips/subscriptions)
CREATE OR REPLACE FUNCTION public.spend_fpt_tokens(
  target_user_id UUID,
  token_amount NUMERIC,
  transaction_type TEXT,
  description TEXT DEFAULT NULL,
  metadata JSONB DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_balance NUMERIC;
BEGIN
  -- Get current balance
  current_balance := public.get_user_fpt_balance(target_user_id);
  
  -- Check if user has sufficient balance
  IF current_balance < token_amount THEN
    RAISE EXCEPTION 'Insufficient FPT balance. Current: %, Required: %', current_balance, token_amount;
  END IF;

  -- Insert the negative transaction record
  INSERT INTO public.transactions (
    user_id,
    amount,
    transaction_type,
    description,
    metadata
  ) VALUES (
    target_user_id,
    -token_amount,
    transaction_type,
    description,
    metadata
  );

  -- Update the profiles table with the new balance
  UPDATE public.profiles 
  SET fpt_balance = public.get_user_fpt_balance(target_user_id),
      updated_at = now()
  WHERE id = target_user_id;

  RETURN TRUE;
END;
$$;

-- Create a trigger to automatically update profile balance when transactions change
CREATE OR REPLACE FUNCTION public.update_profile_balance()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update the profile balance whenever a transaction is inserted
  UPDATE public.profiles 
  SET fpt_balance = public.get_user_fpt_balance(NEW.user_id),
      updated_at = now()
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_update_profile_balance
  AFTER INSERT ON public.transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_profile_balance();
