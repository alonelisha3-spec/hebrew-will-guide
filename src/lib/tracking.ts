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

// Send custom event to GA4 via gtag (already loaded in index.html)
function sendToGA4(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

// Track to both: GA4 (primary) + Supabase (backup, may fail silently)
export function trackEvent(
  eventName: string,
  extra?: { stepIndex?: number; questionId?: string; metadata?: Record<string, string | number | boolean> }
) {
  // Map event names to GA4 event names
  const ga4Map: Record<string, string> = {
    "page_view": "page_view",
    "cta_click": "quiz_start",
    "question_answered": "quiz_step",
    "questionnaire_complete": "quiz_complete",
    "lead_submitted": "generate_lead",
    "preview_action": "preview_action",
  };

  const ga4Event = ga4Map[eventName];
  if (ga4Event) {
    const params: Record<string, string | number | boolean> = { ...(extra?.metadata ?? {}) };
    if (ga4Event === "quiz_step") {
      params.step_number = (extra?.stepIndex ?? 0) + 1;
      if (extra?.questionId) params.question_id = extra.questionId;
    }
    sendToGA4(ga4Event, params);
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
  sendToGA4("page_view");
}
