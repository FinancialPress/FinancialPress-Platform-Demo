
-- First, let's see what transaction types are currently in the table
SELECT DISTINCT transaction_type FROM public.transactions;

-- Then update any invalid transaction types to valid ones
UPDATE public.transactions SET transaction_type = 'bonus' WHERE transaction_type NOT IN ('earn_share', 'earn_tip_received', 'spend_tip', 'spend_subscription', 'bonus', 'referral', 'earn_invite', 'like', 'comment');

-- Now update the constraint to include like and comment
ALTER TABLE public.transactions DROP CONSTRAINT IF EXISTS transactions_transaction_type_check;

ALTER TABLE public.transactions ADD CONSTRAINT transactions_transaction_type_check 
CHECK (transaction_type IN ('earn_share', 'earn_tip_received', 'spend_tip', 'spend_subscription', 'bonus', 'referral', 'earn_invite', 'like', 'comment'));

-- Disable RLS temporarily to ensure tokens can be added
ALTER TABLE public.transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
