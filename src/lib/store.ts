import { supabase } from "@/integrations/supabase/client";
import type { ResultData } from "./resultsEngine";

export interface LeadData {
  fullName: string;
  phone: string;
  email?: string;
  answers: Record<string, string>;
  timestamp: string;
}

const STORAGE_KEY = "will_check_leads";

export async function saveLead(
  lead: LeadData,
  result?: ResultData
): Promise<{ success: boolean; error?: string }> {
  // Save locally as backup
  try {
    const existing = getLeads();
    existing.push(lead);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // localStorage may fail silently
  }

  // Send to backend
  try {
    const { data, error } = await supabase.functions.invoke("notify-lead", {
      body: {
        fullName: lead.fullName,
        phone: lead.phone,
        email: lead.email,
        answers: lead.answers,
        willType: result?.willType,
        riskLevel: result?.riskLevel,
        riskItems: result?.riskItems,
      },
    });

    if (error) {
      console.error("Edge function error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Network error:", err);
    return { success: false, error: "שגיאת רשת" };
  }
}

export function getLeads(): LeadData[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
