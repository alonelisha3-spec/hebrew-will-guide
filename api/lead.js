export const config = { runtime: "edge" };

const FORMSPREE_URL = "https://formspree.io/f/mgopabze";
const NTFY_TOPIC = "https://ntfy.sh/elisha-law-leads";
const NOTIFY_EMAIL = "alonelisha3@gmail.com";

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

  const { fullName, phone, email, intentType, willType, timestamp, marketingConsent, answersSummary } = data;
  if (!fullName || !phone) {
    return new Response(JSON.stringify({ error: "name and phone required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const results = { formspree: false, ntfy: false, formsubmit: false };

  // 1. Formspree — server-side with URL-encoded + UTF-8 charset for Hebrew
  try {
    const params = new URLSearchParams();
    params.append("_subject", `ליד חדש - צוואות | ${fullName} | ${willType || "לא ידוע"}`);
    params.append("fullName", fullName);
    params.append("phone", phone);
    params.append("email", email || "לא נמסר");
    params.append("intentType", intentType || "");
    params.append("willType", willType || "");
    params.append("timestamp", timestamp || new Date().toISOString());
    params.append("marketingConsent", marketingConsent || "");
    params.append("answersSummary", answersSummary || "");

    const res = await fetch(FORMSPREE_URL, {
      method: "POST",
      body: params.toString(),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
    });
    results.formspree = res.ok;
    if (!res.ok) {
      console.error("Formspree error:", res.status, await res.text().catch(() => ""));
    }
  } catch (err) {
    console.error("Formspree failed:", err);
  }

  // 2. ntfy.sh — push notification
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

  const anySuccess = results.formspree || results.ntfy || results.formsubmit;

  return new Response(JSON.stringify({ success: anySuccess, results }), {
    status: anySuccess ? 200 : 502,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
