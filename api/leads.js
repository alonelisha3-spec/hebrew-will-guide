export const config = { runtime: "edge" };

export default async function handler() {
  try {
    // ntfy.sh returns NDJSON (one JSON per line) — must accept text/plain
    const res = await fetch("https://ntfy.sh/elisha-law-leads/json?poll=1&since=30d");

    const text = await res.text();
    if (!text.trim()) {
      return jsonResponse({ leads: [] });
    }

    const lines = text.trim().split("\n").filter(Boolean);
    const leads = [];

    for (const line of lines) {
      try {
        const msg = JSON.parse(line);
        if (msg.event !== "message") continue;

        const body = msg.message || "";
        const fields = {};
        for (const row of body.split("\n")) {
          const idx = row.indexOf(": ");
          if (idx > 0) {
            fields[row.substring(0, idx).trim()] = row.substring(idx + 2).trim();
          }
        }

        leads.push({
          id: msg.id,
          time: msg.time,
          title: msg.title || "",
          name: fields["שם"] || "",
          phone: fields["טלפון"] || "",
          email: fields["אימייל"] || "",
          type: fields["סוג פנייה"] || fields["סוג"] || "",
          willType: fields["סוג צוואה"] || fields["צוואה"] || "",
          timestamp: fields["זמן"] || "",
        });
      } catch {
        // skip
      }
    }

    leads.sort((a, b) => b.time - a.time);
    return jsonResponse({ leads });
  } catch (err) {
    return jsonResponse({ leads: [], error: String(err) });
  }
}

function jsonResponse(data) {
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "s-maxage=10, stale-while-revalidate=30",
    },
  });
}
