
CREATE TABLE public.funnel_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text NOT NULL,
  event_name text NOT NULL,
  step_index integer,
  question_id text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.funnel_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert funnel events"
ON public.funnel_events
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Service role can read funnel events"
ON public.funnel_events
FOR SELECT
TO public
USING (auth.role() = 'service_role'::text);

CREATE INDEX idx_funnel_events_session ON public.funnel_events (session_id);
CREATE INDEX idx_funnel_events_event ON public.funnel_events (event_name);
CREATE INDEX idx_funnel_events_created ON public.funnel_events (created_at);
