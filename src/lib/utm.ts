const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const CLICK_ID_PARAMS = ["gclid", "fbclid"] as const;
const UTM_STORAGE_KEY = "utm_data";

export interface UtmData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  landing_url?: string;
  referrer?: string;
  captured_at?: string;
}

function readStored(): UtmData | null {
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmData) : null;
  } catch {
    return null;
  }
}

function hasAttribution(data: UtmData | null): boolean {
  if (!data) return false;
  return [...UTM_PARAMS, ...CLICK_ID_PARAMS].some((key) => Boolean(data[key]));
}

/**
 * Call once on app load to capture and persist the traffic source.
 *
 * Google Ads auto-tagging sends gclid with no utm_* params, and Meta sends
 * fbclid the same way, so capture must not be conditional on utm_* being
 * present. sessionStorage keeps this alive across the whole quiz flow, which
 * is client-side routed and loses the query string after the first render.
 */
export function captureUtmParams(): void {
  const params = new URLSearchParams(window.location.search);
  const incoming: UtmData = {};

  for (const key of [...UTM_PARAMS, ...CLICK_ID_PARAMS]) {
    const val = params.get(key);
    if (val) incoming[key] = val;
  }

  const stored = readStored();

  // A URL carrying campaign params is a fresh click: it wins. Otherwise keep
  // the first touch so later steps in the quiz don't blank out attribution.
  if (!hasAttribution(incoming) && hasAttribution(stored)) return;

  const data: UtmData = {
    ...incoming,
    landing_url: window.location.href,
    referrer: document.referrer || undefined,
    captured_at: new Date().toISOString(),
  };

  try {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Safari private mode and similar: attribution is best effort, never fatal
  }
}

/** Get stored traffic-source data (returns empty object if none) */
export function getUtmData(): UtmData {
  return readStored() || {};
}

/** Check if traffic came from a specific source */
export function isFromSource(source: string): boolean {
  return getUtmData().utm_source?.toLowerCase() === source.toLowerCase();
}
