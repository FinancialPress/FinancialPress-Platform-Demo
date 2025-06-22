
-- Fix the database functions to handle missing updated_at column in profiles table

-- Update the add_fpt_tokens function to not reference updated_at
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

  -- Update the profiles table with the new balance (without updated_at)
  UPDATE public.profiles 
  SET fpt_balance = public.get_user_fpt_balance(target_user_id)
  WHERE id = target_user_id;

  RETURN TRUE;
END;
$$;

-- Update the spend_fpt_tokens function to not reference updated_at
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

  -- Update the profiles table with the new balance (without updated_at)
  UPDATE public.profiles 
  SET fpt_balance = public.get_user_fpt_balance(target_user_id)
  WHERE id = target_user_id;

  RETURN TRUE;
END;
$$;

-- Update the trigger function to not reference updated_at
CREATE OR REPLACE FUNCTION public.update_profile_balance()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update the profile balance whenever a transaction is inserted (without updated_at)
  UPDATE public.profiles 
  SET fpt_balance = public.get_user_fpt_balance(NEW.user_id)
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$;
