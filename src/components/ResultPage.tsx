import { AlertTriangle, FileText, Users, Shield } from "lucide-react";
import { legalWarningText as legalWarning } from "@/lib/legalTexts";
import type { WillGap } from "@/lib/willGapsEngine";

interface Props {
  mode: "draft" | "review";
  willType: string;
  fullDraft?: string;
  reviewHeadline?: string;
  reviewIssues?: string[];
  reviewRiskLevel?: string;
  gaps?: WillGap[];
  leadName: string;
  leadPhone: string;
  leadEmail?: string;
}

const ALWAYS_SHOW_GAPS = [
  {
    icon: Users,
    text: "חסר מנגנון ליורשים חלופיים — מה קורה אם אחד היורשים לא יוכל לרשת?",
  },
  {
    icon: FileText,
    text: "ניסוח משפטי בסיסי שעלול להוביל לפרשנויות שונות בבית המשפט",
  },
  {
    icon: Shield,
    text: "אין מנגנון למניעת סכסוכים בין יורשים או להגנה על בן/בת הזוג",
  },
];

export function ResultPage({
  mode,
  willType,
  fullDraft,
  reviewHeadline,
  reviewIssues,
  reviewRiskLevel,
  gaps,
  leadName,
  leadPhone,
  leadEmail,
}: Props) {
  const extraGaps = gaps?.filter((g) => g.severity === "high").slice(0, 1) || [];
  const displayGapCount = ALWAYS_SHOW_GAPS.length + extraGaps.length;

  function handleDownloadTxt() {
    if (!fullDraft) return;
    const blob = new Blob([fullDraft], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `טיוטת_צוואה_${leadName.replace(/\s/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }




  return (
    <div className="min-h-screen py-10 md:py-14 bg-background">
      <div className="container max-w-2xl space-y-6 md:space-y-8 px-4 md:px-6">

        {/* ── Hero Section ── */}
        <div className="bg-card rounded-2xl border border-border shadow-md p-6 md:p-10 animate-slide-up text-center">
          <div className="gold-line mx-auto mb-6" />
          <h1 className="text-xl md:text-2xl font-bold mb-3 text-foreground leading-relaxed">
            הצוואה שלך טובה — אך המערכת זיהתה מספר חוסרים מהותיים
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
            הטיוטה שבנית נותנת בסיס, אך כרגע אינה מלאה ואינה מגנה עליך באופן מלא
          </p>
        </div>

        {/* ── Gaps Section ── */}
        <div
          className="bg-card rounded-2xl border border-border shadow-sm p-6 md:p-8 animate-slide-up"
          style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle className="w-5 h-5 text-[hsl(var(--risk-high))]" />
            <h2 className="text-base md:text-lg font-bold text-foreground">
              המערכת זיהתה {displayGapCount} חוסרים מהותיים:
            </h2>
          </div>
          <div className="space-y-4">
            {ALWAYS_SHOW_GAPS.map((gap, i) => {
              const Icon = gap.icon;
              return (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-[hsl(var(--risk-high)/0.2)] bg-[hsl(var(--risk-high)/0.04)] p-4">
                  <Icon className="w-5 h-5 mt-0.5 shrink-0 text-[hsl(var(--risk-high))]" />
                  <p className="text-sm leading-relaxed text-foreground">{gap.text}</p>
                </div>
              );
            })}
            {extraGaps.map((gap, i) => (
              <div key={`extra-${i}`} className="flex items-start gap-3 rounded-lg border border-[hsl(var(--risk-high)/0.2)] bg-[hsl(var(--risk-high)/0.04)] p-4">
                <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-[hsl(var(--risk-high))]" />
                <p className="text-sm leading-relaxed text-foreground">{gap.title}: {gap.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Download Section ── */}
        {fullDraft && (
          <div
            className="bg-card rounded-2xl border border-border shadow-sm p-6 md:p-8 animate-slide-up text-center"
            style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
          >
            <div className="gold-line mx-auto mb-5" />
            <h2 className="text-lg md:text-xl font-bold mb-2 text-foreground">
              הורד את הטיוטה שלך
            </h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-md mx-auto">
              ניתן להוריד את הטיוטה כקובץ טקסט
            </p>
            <div className="flex items-center justify-center">
              <button
                onClick={handleDownloadTxt}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg hover:brightness-110 transition-all active:scale-[0.98]"
              >
                <FileText className="w-4 h-4" />
                הורד כקובץ טקסט
              </button>
            </div>
          </div>
        )}

        {/* ── Disclaimer ── */}
        <p className="text-[11px] text-muted-foreground/60 text-center max-w-xl mx-auto leading-relaxed pb-6">
          {legalWarning}
        </p>
      </div>
    </div>
  );
}
