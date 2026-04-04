import { useState } from "react";
import { AlertTriangle, CheckCircle, Phone, FileText, Send, Shield, Pen, Users, Building } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
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

type CtaTag = "purchase" | "callback" | "draft_only";

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
  const [selectedCta, setSelectedCta] = useState<CtaTag | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cbName, setCbName] = useState(leadName);
  const [cbPhone, setCbPhone] = useState(leadPhone);
  const [cbEmail, setCbEmail] = useState(leadEmail || "");

  // Merge engine gaps with always-shown gaps, cap at 4
  const extraGaps = gaps?.filter((g) => g.severity === "high").slice(0, 1) || [];
  const displayGapCount = ALWAYS_SHOW_GAPS.length + extraGaps.length;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cbName.trim() || !cbPhone.trim()) {
      toast.error("נא למלא שם וטלפון");
      return;
    }
    setSubmitting(true);
    try {
      await supabase.functions.invoke("notify-lead", {
        body: {
          fullName: cbName.trim(),
          phone: cbPhone.trim(),
          email: cbEmail.trim() || undefined,
          answers: {},
          willType,
          riskLevel: reviewRiskLevel || "",
          riskItems: reviewIssues || [],
          ctaTag: selectedCta,
          fullDraft: fullDraft || undefined,
        },
      });
      setSubmitted(true);
    } catch {
      toast.error("שגיאה בשליחת הפרטים, נסו שוב.");
    }
    setSubmitting(false);
  }

  function handleDownloadDraft() {
    if (!fullDraft) return;
    const blob = new Blob([fullDraft], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `טיוטת_צוואה_${leadName.replace(/\s/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // After submission — confirmation screen
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-background">
        <div className="w-full max-w-lg text-center animate-slide-up">
          <div className="bg-card rounded-2xl border border-border shadow-lg p-8 md:p-10">
            <CheckCircle className="w-14 h-14 mx-auto mb-5 text-[hsl(var(--risk-low))]" />
            <h1 className="text-xl md:text-2xl font-bold mb-3 text-foreground">
              קיבלתי את הפרטים שלך
            </h1>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-6">
              {selectedCta === "purchase"
                ? "נציג יחזור אליך בהקדם להסדרת התשלום והשלמת הצוואה"
                : selectedCta === "callback"
                ? "נחזור אליך בהקדם"
                : "הטיוטה שלך מוכנה — ניתן להוריד אותה כעת"}
            </p>
            {selectedCta === "draft_only" && fullDraft && (
              <button
                onClick={handleDownloadDraft}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary/80 transition-all"
              >
                <FileText className="w-4 h-4" />
                הורד את הטיוטה
              </button>
            )}
          </div>
        </div>
      </div>
    );
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

        {/* ── Offer Section ── */}
        <div
          className="bg-accent rounded-2xl border border-accent p-6 md:p-8 animate-slide-up"
          style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
        >
          <div className="gold-line mx-auto mb-5" />
          <h2 className="text-lg md:text-xl font-bold text-center mb-2 text-accent-foreground">
            קבל צוואה שלמה, חוקית ותקינה בהתאם לדין
          </h2>
          <p className="text-sm text-accent-foreground/70 text-center mb-6 leading-relaxed max-w-lg mx-auto">
            השלמה מלאה של הצוואה על בסיס הנתונים שלך, כולל ניסוח משפטי מותאם — ללא צורך בפגישה
          </p>

          {/* Price */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-3xl md:text-4xl font-bold text-accent-foreground">500 ₪</span>
          </div>

          {/* Process explanation */}
          <div className="bg-accent-foreground/5 rounded-xl p-5 mb-6 space-y-3">
            <p className="text-xs font-semibold text-accent-foreground/80 mb-2">לאחר קבלת הצוואה:</p>
            <div className="flex items-start gap-2.5">
              <Pen className="w-4 h-4 mt-0.5 shrink-0 text-accent-foreground/60" />
              <p className="text-xs text-accent-foreground/70 leading-relaxed">ניתן לכתוב אותה בכתב יד או להדפיס</p>
            </div>
            <div className="flex items-start gap-2.5">
              <Users className="w-4 h-4 mt-0.5 shrink-0 text-accent-foreground/60" />
              <p className="text-xs text-accent-foreground/70 leading-relaxed">לחתום בפני שני עדים בהתאם להנחיות</p>
            </div>
            <div className="flex items-start gap-2.5">
              <Building className="w-4 h-4 mt-0.5 shrink-0 text-accent-foreground/60" />
              <p className="text-xs text-accent-foreground/70 leading-relaxed">ניתן גם לקבוע תור להפקדה אצל האפוטרופוס הכללי</p>
            </div>
          </div>

          {/* CTA Buttons */}
          {!selectedCta ? (
            <div className="space-y-3">
              <button
                onClick={() => setSelectedCta("purchase")}
                className="w-full rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-lg transition-all duration-200 hover:shadow-xl hover:brightness-110 active:scale-[0.98]"
              >
                אני מעוניין בצוואה שלמה וחוקית — רכישה ב־500 ₪
              </button>
              <button
                onClick={() => setSelectedCta("callback")}
                className="w-full rounded-xl border-2 border-primary bg-transparent px-6 py-4 text-base font-semibold text-accent-foreground transition-all duration-200 hover:bg-primary/10 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                אני מעוניין — אנא חזרו אליי
              </button>
              <button
                onClick={() => setSelectedCta("draft_only")}
                className="w-full rounded-xl border border-accent-foreground/20 bg-transparent px-6 py-3 text-sm text-accent-foreground/60 transition-all duration-200 hover:bg-accent-foreground/5 active:scale-[0.98]"
              >
                אשאר עם הטיוטה בלבד
              </button>
            </div>
          ) : (
            /* Lead form after CTA selection */
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4 text-right animate-slide-up">
              <p className="text-xs text-accent-foreground/60 text-center mb-2">
                {selectedCta === "purchase"
                  ? "נציג יחזור אליך להסדרת התשלום"
                  : selectedCta === "callback"
                  ? "השאר פרטים ונחזור אליך בהקדם"
                  : "השאר פרטים ונשלח לך את הטיוטה"}
              </p>
              <input
                type="text"
                value={cbName}
                onChange={(e) => setCbName(e.target.value)}
                className="w-full rounded-lg border border-accent-foreground/20 bg-accent-foreground/5 px-4 py-3 text-sm text-accent-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-accent-foreground/30"
                placeholder="שם מלא"
                maxLength={100}
              />
              <input
                type="tel"
                value={cbPhone}
                onChange={(e) => setCbPhone(e.target.value)}
                className="w-full rounded-lg border border-accent-foreground/20 bg-accent-foreground/5 px-4 py-3 text-sm text-accent-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-accent-foreground/30"
                placeholder="050-0000000"
                dir="ltr"
                maxLength={15}
              />
              {(selectedCta === "hot_no_call" || selectedCta === "cold") && (
                <input
                  type="email"
                  value={cbEmail}
                  onChange={(e) => setCbEmail(e.target.value)}
                  className="w-full rounded-lg border border-accent-foreground/20 bg-accent-foreground/5 px-4 py-3 text-sm text-accent-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-accent-foreground/30"
                  placeholder="דוא״ל"
                  dir="ltr"
                  maxLength={255}
                />
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:brightness-110 active:scale-[0.97] disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? "שולח..." : (
                  <>
                    <Send className="w-4 h-4" />
                    שליחה
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setSelectedCta(null)}
                className="w-full text-xs text-accent-foreground/40 hover:text-accent-foreground/60 transition-colors"
              >
                ← חזרה לבחירה
              </button>
            </form>
          )}
        </div>

        {/* ── Disclaimer ── */}
        <p className="text-[11px] text-muted-foreground/60 text-center max-w-xl mx-auto leading-relaxed pb-6">
          {legalWarning}
        </p>
      </div>
    </div>
  );
}
