
-- Create a function to automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
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
    100, -- Default FPT balance for new users
    'newcomer', -- Default role
    CASE 
      WHEN new.raw_user_meta_data->>'referral_code' IS NOT NULL 
      THEN 'FPX-' || upper(substring(md5(new.id::text) from 1 for 6))
      ELSE NULL
    END,
    new.raw_user_meta_data->>'referral_code'
  );
  RETURN new;
END;
$$;

-- Create trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
