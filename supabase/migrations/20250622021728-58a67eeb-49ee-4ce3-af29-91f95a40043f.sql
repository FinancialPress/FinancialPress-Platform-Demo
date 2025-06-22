
-- Add RLS policies for engagement_events table
ALTER TABLE public.engagement_events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own engagement events" ON public.engagement_events;
DROP POLICY IF EXISTS "Users can insert their own engagement events" ON public.engagement_events;

-- Allow users to view their own engagement events
CREATE POLICY "Users can view their own engagement events" ON public.engagement_events
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to insert their own engagement events
CREATE POLICY "Users can insert their own engagement events" ON public.engagement_events
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Add RLS policies for earnings table
ALTER TABLE public.earnings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own earnings" ON public.earnings;
DROP POLICY IF EXISTS "Users can insert their own earnings" ON public.earnings;

-- Allow users to view their own earnings
CREATE POLICY "Users can view their own earnings" ON public.earnings
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to insert their own earnings
CREATE POLICY "Users can insert their own earnings" ON public.earnings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Add RLS policies for reward_rules table (public read access)
ALTER TABLE public.reward_rules ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Anyone can view reward rules" ON public.reward_rules;

-- Allow anyone to view reward rules (they are configuration data)
CREATE POLICY "Anyone can view reward rules" ON public.reward_rules
  FOR SELECT USING (true);

-- Add unique constraint for rule_type if it doesn't exist
ALTER TABLE public.reward_rules ADD CONSTRAINT reward_rules_rule_type_unique UNIQUE (rule_type);

-- Insert default reward rules (handle conflicts with WHERE NOT EXISTS)
INSERT INTO public.reward_rules (rule_type, description, value, active)
SELECT 'like', 'Reward for liking a post', 0.2, true
WHERE NOT EXISTS (SELECT 1 FROM public.reward_rules WHERE rule_type = 'like');

INSERT INTO public.reward_rules (rule_type, description, value, active)
SELECT 'share', 'Reward for sharing a post', 0.5, true
WHERE NOT EXISTS (SELECT 1 FROM public.reward_rules WHERE rule_type = 'share');

INSERT INTO public.reward_rules (rule_type, description, value, active)
SELECT 'bookmark', 'Reward for bookmarking a post', 0.1, true
WHERE NOT EXISTS (SELECT 1 FROM public.reward_rules WHERE rule_type = 'bookmark');

INSERT INTO public.reward_rules (rule_type, description, value, active)
SELECT 'comment', 'Reward for commenting on a post', 0.3, true
WHERE NOT EXISTS (SELECT 1 FROM public.reward_rules WHERE rule_type = 'comment');

-- Enable realtime for profiles table to support live FPT balance updates
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.profiles;
