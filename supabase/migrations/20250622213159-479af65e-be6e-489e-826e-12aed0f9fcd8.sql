
-- Enable pgcrypto extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create storage bucket before policies
INSERT INTO storage.buckets (id, name, public) VALUES ('content_uploads', 'content_uploads', true) ON CONFLICT DO NOTHING;

-- Create activities table first
CREATE TABLE public.activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

-- Enable RLS before creating policies
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Create policies for activities
CREATE POLICY "Users can view their own activities" ON public.activities FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own activities" ON public.activities FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create posts table
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('create_earn', 'share_insight')),
  title TEXT NOT NULL,
  body TEXT,
  image_url TEXT,
  external_url TEXT,
  tags TEXT[] DEFAULT '{}',
  section TEXT CHECK (section IN ('stock', 'crypto')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS before creating policies
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create policies for posts
CREATE POLICY "Users can view all posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Users can create their own posts" ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update their own posts" ON public.posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete their own posts" ON public.posts FOR DELETE USING (auth.uid() = author_id);

-- Add post_id column to activities table
ALTER TABLE public.activities ADD COLUMN post_id UUID REFERENCES public.posts(id) ON DELETE SET NULL;

-- Storage policies with correct datatype matching (uuid = uuid)
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'content_uploads');
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'content_uploads' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update their own uploads" ON storage.objects FOR UPDATE USING (bucket_id = 'content_uploads' AND owner = auth.uid());
CREATE POLICY "Users can delete their own uploads" ON storage.objects FOR DELETE USING (bucket_id = 'content_uploads' AND owner = auth.uid());

-- RPC function to create earn posts with safe casting
CREATE OR REPLACE FUNCTION public.create_earn_post(payload jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_post public.posts%ROWTYPE;
  activity_id UUID;
BEGIN
  -- Validate required fields
  IF payload->>'title' IS NULL OR trim(payload->>'title') = '' THEN
    RAISE EXCEPTION 'Title is required';
  END IF;
  
  IF payload->>'body' IS NULL OR trim(payload->>'body') = '' THEN
    RAISE EXCEPTION 'Content body is required';
  END IF;

  -- Insert new post with safe casting for tags
  INSERT INTO public.posts (
    author_id,
    type,
    title,
    body,
    image_url,
    tags,
    section
  ) VALUES (
    auth.uid(),
    'create_earn',
    trim(payload->>'title'),
    trim(payload->>'body'),
    payload->>'image_url',
    CASE 
      WHEN payload->'tags' IS NOT NULL THEN 
        ARRAY(SELECT jsonb_array_elements_text(payload->'tags')::text)
      ELSE 
        '{}'::TEXT[]
    END,
    COALESCE(payload->>'section', 'stock')
  ) RETURNING * INTO new_post;

  -- Create activity record
  INSERT INTO public.activities (
    user_id,
    activity_type,
    post_id,
    metadata
  ) VALUES (
    auth.uid(),
    'create_post',
    new_post.id,
    jsonb_build_object(
      'post_type', 'create_earn',
      'title', new_post.title,
      'section', new_post.section
    )
  ) RETURNING id INTO activity_id;

  -- Return the new post as jsonb
  RETURN to_jsonb(new_post);
END;
$$;

-- RPC function to create share insight posts with safe casting
CREATE OR REPLACE FUNCTION public.share_insight_post(payload jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_post public.posts%ROWTYPE;
  activity_id UUID;
BEGIN
  -- Validate required fields
  IF payload->>'title' IS NULL OR trim(payload->>'title') = '' THEN
    RAISE EXCEPTION 'Title is required';
  END IF;
  
  IF payload->>'external_url' IS NULL OR trim(payload->>'external_url') = '' THEN
    RAISE EXCEPTION 'Link URL is required';
  END IF;

  -- Insert new post with safe casting for tags
  INSERT INTO public.posts (
    author_id,
    type,
    title,
    body,
    image_url,
    external_url,
    tags
  ) VALUES (
    auth.uid(),
    'share_insight',
    trim(payload->>'title'),
    trim(payload->>'commentary'),
    payload->>'image_url',
    trim(payload->>'external_url'),
    CASE 
      WHEN payload->'tags' IS NOT NULL THEN 
        ARRAY(SELECT jsonb_array_elements_text(payload->'tags')::text)
      ELSE 
        '{}'::TEXT[]
    END
  ) RETURNING * INTO new_post;

  -- Create activity record
  INSERT INTO public.activities (
    user_id,
    activity_type,
    post_id,
    metadata
  ) VALUES (
    auth.uid(),
    'create_post',
    new_post.id,
    jsonb_build_object(
      'post_type', 'share_insight',
      'title', new_post.title,
      'external_url', new_post.external_url
    )
  ) RETURNING id INTO activity_id;

  -- Return the new post as jsonb
  RETURN to_jsonb(new_post);
END;
$$;

-- Guard for realtime publication and enable realtime for posts table
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    CREATE PUBLICATION supabase_realtime;
  END IF;
END $$;

ALTER TABLE public.posts REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.posts;

-- Update new user signup to start with 0 FPT balance
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
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
    0,
    'newcomer',
    'FPX-' || upper(substring(md5(new.id::text) from 1 for 6)),
    new.raw_user_meta_data->>'referral_code'
  );
  RETURN new;
END;
$$;
