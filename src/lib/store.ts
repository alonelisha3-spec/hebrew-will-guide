export interface LeadData {
  fullName: string;
  phone: string;
  email?: string;
  answers: Record<string, string>;
  timestamp: string;
}

const STORAGE_KEY = "will_check_leads";

export function saveLead(lead: LeadData): void {
  const existing = getLeads();
  existing.push(lead);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getLeads(): LeadData[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
