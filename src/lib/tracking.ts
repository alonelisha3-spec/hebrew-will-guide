import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "funnel_session_id";
const COUNTER_BASE = "https://api.counterapi.dev/v1/elisha-law-live";

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

// Ping CounterAPI - reliable free counter
function incrementCounter(name: string) {
  fetch(`${COUNTER_BASE}/${name}/up`, { method: "GET" }).catch(() => {});
}

// Track to both: CounterAPI (works) + Supabase (backup, may fail silently)
export function trackEvent(
  eventName: string,
  extra?: { stepIndex?: number; questionId?: string; metadata?: Record<string, string | number | boolean> }
) {
  // Map event names to counter names
  const counterMap: Record<string, string> = {
    "page_view": "page-views",
    "cta_click": "quiz-start",
    "questionnaire_complete": "quiz-complete",
    "lead_submitted": "leads",
    "preview_action": "preview-action",
  };

  const counterName = counterMap[eventName];
  if (counterName) {
    incrementCounter(counterName);
  }

  // Also send to Supabase (legacy - may be blocked by RLS)
  const payload = {
    session_id: getSessionId(),
    event_name: eventName,
    step_index: extra?.stepIndex ?? null,
    question_id: extra?.questionId ?? null,
    metadata: extra?.metadata ?? {},
  };

  supabase.from("funnel_events").insert([payload]).then(({ error }) => {
    if (error) console.warn("tracking error:", error.message);
  });
}

// Track page view on app load
export function trackPageView() {
  incrementCounter("page-views");
}
