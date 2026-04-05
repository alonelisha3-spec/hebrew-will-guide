const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const UTM_STORAGE_KEY = "utm_data";

export interface UtmData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_url?: string;
  referrer?: string;
}

/** Call once on app load to capture and persist UTM params */
export function captureUtmParams(): void {
  const params = new URLSearchParams(window.location.search);
  const utm: UtmData = {};
  let hasUtm = false;

  for (const key of UTM_PARAMS) {
    const val = params.get(key);
    if (val) {
      utm[key] = val;
      hasUtm = true;
    }
  }

  if (hasUtm) {
    utm.landing_url = window.location.href;
    utm.referrer = document.referrer || undefined;
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
  }
}

/** Get stored UTM data (returns empty object if none) */
export function getUtmData(): UtmData {
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Check if traffic came from a specific source */
export function isFromSource(source: string): boolean {
  return getUtmData().utm_source?.toLowerCase() === source.toLowerCase();
}
