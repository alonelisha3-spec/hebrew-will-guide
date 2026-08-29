export const config = { runtime: "edge" };

/**
 * Partial quiz snapshots from visitors who abandon mid-flow.
 *
 * Deliberately dashboard-only: these fire on every tab-hide, so routing them
 * through the ntfy/FormSubmit/Formspree paths used by /api/lead would bury the
 * owner in notifications. Email stays the safety net for real submissions.
 */
export default async function handler(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST only" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let data;
  try {
    data = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const {
    sessionId,
    track,
    stepIndex,
    stepNumber,
    totalSteps,
    answeredCount,
    answers,
    answersDetailed,
    attribution,
    abandonedAt,
  } = data;

  // An abandonment with nothing answered tells us nothing
  if (!answeredCount || !answers || Object.keys(answers).length === 0) {
    return new Response(JSON.stringify({ skipped: "no answers" }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const intakeUrl = process.env.DASHBOARD_INTAKE_URL;
  const intakeSecret = process.env.DASHBOARD_INTAKE_SECRET;

  if (!intakeUrl || !intakeSecret) {
    return new Response(JSON.stringify({ skipped: "not_configured" }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  let ok = false;
  try {
    const res = await fetch(intakeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${intakeSecret}`,
      },
      body: JSON.stringify({
        source: "hebrew-will-guide",
        // Discriminator: this is NOT a lead. No name, no phone, no consent —
        // the visitor left before the form. Must never be counted as a lead.
        kind: "partial_quiz",
        is_partial: true,
        session_id: sessionId || null,
        track: track || null,
        step_index: typeof stepIndex === "number" ? stepIndex : null,
        step_number: typeof stepNumber === "number" ? stepNumber : null,
        total_steps: typeof totalSteps === "number" ? totalSteps : null,
        answered_count: answeredCount,
        quiz_answers: answers || {},
        quiz_answers_detailed: answersDetailed || {},
        gclid: attribution?.gclid || null,
        fbclid: attribution?.fbclid || null,
        utm_source: attribution?.utm_source || null,
        utm_medium: attribution?.utm_medium || null,
        utm_campaign: attribution?.utm_campaign || null,
        utm_content: attribution?.utm_content || null,
        utm_term: attribution?.utm_term || null,
        referrer: attribution?.referrer || null,
        landing_url: attribution?.landing_url || null,
        attribution_captured_at: attribution?.captured_at || null,
        abandoned_at: abandonedAt || null,
        received_at: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8000),
    });
    ok = res.ok;
    if (!res.ok) {
      console.error("Partial intake failed:", res.status, await res.text().catch(() => ""));
    }
  } catch (err) {
    console.error("Partial intake failed:", err);
  }

  return new Response(JSON.stringify({ success: ok }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}
