
-- First, let's drop the existing constraint that's causing the signup failures
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Add a new constraint that allows the roles we actually use
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('newcomer', 'creator', 'distributor'));

-- Update the handle_new_user function to ensure it creates profiles with valid data
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    fpt_balance,
    role,
    referral_code,
    referred_by
  )
  VALUES (
    new.id,
    new.email,
    100,
    'newcomer',
    'FPX-' || upper(substring(md5(new.id::text) from 1 for 6)),
    new.raw_user_meta_data->>'referral_code'
  );
  RETURN new;
END;
$function$
