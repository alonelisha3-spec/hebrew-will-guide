import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "funnel_session_id";

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function trackEvent(
  eventName: string,
  extra?: { stepIndex?: number; questionId?: string; metadata?: Record<string, string | number | boolean> }
) {
  const payload = {
    session_id: getSessionId(),
    event_name: eventName,
    step_index: extra?.stepIndex ?? null,
    question_id: extra?.questionId ?? null,
    metadata: extra?.metadata ?? {},
  };

  // Fire and forget
  supabase.from("funnel_events").insert([payload]).then(({ error }) => {
    if (error) console.warn("tracking error:", error.message);
  });
}
