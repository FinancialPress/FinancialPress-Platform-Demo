
-- Add 'earn_invite' to the allowed transaction types
ALTER TABLE public.transactions 
DROP CONSTRAINT transactions_transaction_type_check;

ALTER TABLE public.transactions 
ADD CONSTRAINT transactions_transaction_type_check 
CHECK (transaction_type IN ('earn_share', 'earn_tip_received', 'spend_tip', 'spend_subscription', 'bonus', 'referral', 'earn_invite'));
