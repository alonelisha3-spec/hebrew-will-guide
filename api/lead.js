export const config = { runtime: "edge" };

const NTFY_TOPIC = "https://ntfy.sh/elisha-law-leads";
const NOTIFY_EMAIL = "alonelisha3@gmail.com";

const EMAIL_NOT_PROVIDED = "לא נמסר";

/**
 * The form posts the Hebrew placeholder "לא נמסר" when no address was given,
 * and the intake endpoint rejects the whole lead with 422 "email is malformed".
 * A missing or unusable address must cost us the address, never the lead.
 */
function normalizeEmail(value) {
  if (!value) return null;
  const trimmed = String(value).trim();
  if (!trimmed || trimmed === EMAIL_NOT_PROVIDED) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) ? trimmed : null;
}

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
    fullName,
    phone,
    email,
    intentType,
    willType,
    timestamp,
    marketingConsent,
    answersSummary,
    answers,
    answersDetailed,
    sessionId,
    track,
    attribution,
  } = data;
  if (!fullName || !phone) {
    return new Response(JSON.stringify({ error: "name and phone required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const results = { ntfy: false, formsubmit: false, dashboard: false };

  // Formspree is sent directly from the browser (Hebrew encoding works there)
  // This API route handles only ntfy + FormSubmit backups

  // 1. ntfy.sh — push notification
  try {
    const msg = [
      `שם: ${fullName}`,
      `טלפון: ${phone}`,
      `אימייל: ${email || "לא נמסר"}`,
      `סוג פנייה: ${intentType || ""}`,
      `סוג צוואה: ${willType || "לא ידוע"}`,
      `זמן: ${timestamp || ""}`,
      `תשובות: ${answersSummary || ""}`,
    ].join("\n");

    const res = await fetch(NTFY_TOPIC, {
      method: "POST",
      headers: {
        "Title": `ליד חדש: ${fullName} | ${phone}`,
        "Tags": "briefcase,moneybag",
        "Priority": "high",
      },
      body: msg,
    });
    results.ntfy = res.ok;
  } catch (err) {
    console.error("ntfy failed:", err);
  }

  // 3. FormSubmit — backup email (may need activation)
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${NOTIFY_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Referer": "https://hebrew-will-guide.vercel.app",
        "Origin": "https://hebrew-will-guide.vercel.app",
      },
      body: JSON.stringify({
        _subject: `ליד חדש: ${fullName} | ${phone}`,
        _template: "table",
        "שם מלא": fullName,
        "טלפון": phone,
        "אימייל": email || "לא נמסר",
        "סוג פנייה": intentType || "",
        "סוג צוואה": willType || "לא ידוע",
        "זמן": timestamp || "",
        "תשובות": answersSummary || "",
      }),
    });
    const body = await res.json().catch(() => ({}));
    results.formsubmit = body.success === "true";
  } catch (err) {
    console.error("FormSubmit failed:", err);
  }

  // 4. Dashboard intake — the measurable path. Runs server-side so the shared
  // secret stays out of the browser bundle. Email above remains the safety net,
  // so a failure here must never fail the submission.
  const intakeUrl = process.env.DASHBOARD_INTAKE_URL;
  const intakeSecret = process.env.DASHBOARD_INTAKE_SECRET;

  if (!intakeUrl || !intakeSecret) {
    results.dashboard = "not_configured";
  } else {
    try {
      const res = await fetch(intakeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${intakeSecret}`,
        },
        body: JSON.stringify({
          source: "hebrew-will-guide",
          kind: "lead",
          session_id: sessionId || null,
          name: fullName,
          phone,
          email: normalizeEmail(email),
          inquiry_type: intentType || null,
          will_type: willType || null,
          marketing_consent: Boolean(marketingConsent),
          track: track || null,
          // Structured, keyed by question id — the email's flattened text is
          // kept only as answers_summary for cross-checking against the inbox.
          quiz_answers: answers || {},
          quiz_answers_detailed: answersDetailed || {},
          answers_summary: answersSummary || "",
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
          submitted_at_local: timestamp || null,
          submitted_at: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(8000),
      });
      results.dashboard = res.ok;
      if (!res.ok) {
        console.error("Dashboard intake failed:", res.status, await res.text().catch(() => ""));
      }
    } catch (err) {
      console.error("Dashboard intake failed:", err);
    }
  }

  const anySuccess = results.ntfy || results.formsubmit || results.dashboard === true;

  return new Response(JSON.stringify({ success: anySuccess, results }), {
    status: anySuccess ? 200 : 502,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
