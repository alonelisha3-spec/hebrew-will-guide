export const config = { runtime: "edge" };

export default async function handler() {
  try {
    // Read last 50 messages from ntfy.sh topic (cached as lead notifications)
    const res = await fetch("https://ntfy.sh/elisha-law-leads/json?poll=1&since=30d", {
      headers: { "Accept": "application/json" },
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ leads: [], error: "ntfy fetch failed" }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const text = await res.text();
    const lines = text.trim().split("\n").filter(Boolean);

    const leads = [];
    for (const line of lines) {
      try {
        const msg = JSON.parse(line);
        if (msg.event !== "message") continue;

        // Parse the lead data from the message body
        const body = msg.message || "";
        const fields = {};
        for (const row of body.split("\n")) {
          const [key, ...rest] = row.split(": ");
          if (key && rest.length) fields[key.trim()] = rest.join(": ").trim();
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
        // skip malformed lines
      }
    }

    // Sort newest first
    leads.sort((a, b) => b.time - a.time);

    return new Response(JSON.stringify({ leads }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "s-maxage=10, stale-while-revalidate=30",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ leads: [], error: String(err) }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
}
