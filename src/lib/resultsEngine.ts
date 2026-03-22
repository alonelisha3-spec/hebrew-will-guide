// Legacy engine kept for admin page compatibility
export type WillType = "אין צוואה" | "צוואה רגילה" | "צוואה הדדית";
export type RiskLevel = "נמוכה" | "בינונית" | "גבוהה" | "גבוהה מאוד";

export interface ResultData {
  willType: WillType;
  riskLevel: RiskLevel;
  headline: string;
  explanation?: string;
  riskItems: string[];
  fullDraft?: string;
}

export function calculateResults(answers: Record<string, string>): ResultData {
  return {
    willType: "צוואה רגילה",
    riskLevel: "בינונית",
    headline: "",
    riskItems: [],
  };
}
