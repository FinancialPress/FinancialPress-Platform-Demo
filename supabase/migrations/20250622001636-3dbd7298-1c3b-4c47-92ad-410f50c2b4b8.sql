
-- Add username field to profiles table with unique constraint
ALTER TABLE public.profiles 
ADD COLUMN username TEXT UNIQUE;

-- Add constraint for username format (alphanumeric, underscores, hyphens only, 3-20 characters)
ALTER TABLE public.profiles 
ADD CONSTRAINT username_format_check 
CHECK (username IS NULL OR (username ~ '^[a-zA-Z0-9_-]{3,20}$'));

-- Create index for faster username lookups
CREATE INDEX idx_profiles_username ON public.profiles(username);
