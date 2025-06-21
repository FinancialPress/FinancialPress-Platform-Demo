
-- Step 1: Rename the field to reflect placeholder usage
ALTER TABLE public.profiles RENAME COLUMN wallet_address TO wallet_identifier;

-- Step 2: Add a clear inline comment for future devs
COMMENT ON COLUMN public.profiles.wallet_identifier IS 
  'Temporary wallet placeholder (e.g., WALLET-ABC123DEF0). Replace with Reown address when integrated.';
