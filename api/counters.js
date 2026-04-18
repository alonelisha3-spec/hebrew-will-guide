const COUNTER_BASE = "https://api.counterapi.dev/v1/elisha-law-live";
const COUNTERS = ["page-views", "quiz-start", "quiz-complete", "leads", "preview-action"];

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");

  const results = {};

  await Promise.all(
    COUNTERS.map(async (name) => {
      try {
        const r = await fetch(`${COUNTER_BASE}/${name}/`);
        if (r.ok) {
          const data = await r.json();
          results[name] = data.count || 0;
        } else {
          results[name] = 0;
        }
      } catch {
        results[name] = 0;
      }
    })
  );

  res.json(results);
}
