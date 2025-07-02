-- Fix critical signup flow - create missing handle_new_user function and trigger
-- This ensures new users get entries in both user_profiles and profiles tables

-- Create the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Insert into user_profiles (central identity table for token logic)
  INSERT INTO public.user_profiles (
    id, 
    created_at, 
    onboarded, 
    referral_code
  ) VALUES (
    NEW.id,
    timezone('utc'::text, now()),
    false,
    COALESCE(NEW.raw_user_meta_data ->> 'referral_code', NEW.raw_user_meta_data ->> 'referralCode')
  );

  -- Insert into profiles (user profile data with FPT balance)
  INSERT INTO public.profiles (
    id,
    email,
    fpt_balance,
    role,
    referral_code,
    referred_by
  ) VALUES (
    NEW.id,
    NEW.email,
    100, -- Starting bonus as per existing logic
    'newcomer',
    'FPX-' || upper(substring(md5(NEW.id::text) from 1 for 6)),
    NEW.raw_user_meta_data ->> 'referral_code'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';

-- Drop existing trigger if it exists to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();