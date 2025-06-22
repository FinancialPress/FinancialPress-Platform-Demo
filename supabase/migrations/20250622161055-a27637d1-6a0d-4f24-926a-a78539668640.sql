
-- First, let's ensure we have the proper trigger setup for automatic balance updates
CREATE OR REPLACE FUNCTION public.update_profile_balance()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update the profile balance whenever a transaction is inserted
  UPDATE public.profiles 
  SET fpt_balance = public.get_user_fpt_balance(NEW.user_id)
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists and recreate it
DROP TRIGGER IF EXISTS update_fpt_balance_trigger ON public.transactions;
CREATE TRIGGER update_fpt_balance_trigger
  AFTER INSERT ON public.transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_profile_balance();

-- Drop existing policies and recreate them
DROP POLICY IF EXISTS "Users can view their own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can insert their own transactions" ON public.transactions;

-- Create RLS policies to allow users to view and insert their own transactions
CREATE POLICY "Users can view their own transactions" 
  ON public.transactions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions" 
  ON public.transactions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_transactions_user_id_created_at ON public.transactions(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_fpt_balance ON public.profiles(fpt_balance);
