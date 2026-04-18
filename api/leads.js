export const config = { runtime: "edge" };

export default async function handler() {
  try {
    const res = await fetch("https://ntfy.sh/elisha-law-leads/json?poll=1&since=all", {
      headers: { "User-Agent": "ElishaLawDashboard/1.0" },
    });

    const text = await res.text();
    const lines = text.trim().split("\n").filter(Boolean);
    const leads = [];
    const debug = { status: res.status, lines: lines.length, firstLine: lines[0]?.substring(0, 100) || "" };

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
          name: fields["\u05e9\u05dd"] || "",
          phone: fields["\u05d8\u05dc\u05e4\u05d5\u05df"] || "",
          email: fields["\u05d0\u05d9\u05de\u05d9\u05d9\u05dc"] || "",
          type: fields["\u05e1\u05d5\u05d2 \u05e4\u05e0\u05d9\u05d9\u05d4"] || fields["\u05e1\u05d5\u05d2"] || "",
          willType: fields["\u05e1\u05d5\u05d2 \u05e6\u05d5\u05d5\u05d0\u05d4"] || fields["\u05e6\u05d5\u05d5\u05d0\u05d4"] || "",
          timestamp: fields["\u05d6\u05de\u05df"] || "",
          raw: body.substring(0, 80),
        });
      } catch {
        // skip
      }
    }

    leads.sort((a, b) => b.time - a.time);
    return jsonResponse({ leads, debug });
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
