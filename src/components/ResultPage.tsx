import { useState } from "react";
import { Download, Phone, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react";
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

const severityConfig = {
  high: { icon: AlertCircle, color: "text-red-600", bg: "bg-red-50 border-red-200", label: "חשוב" },
  medium: { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50 border-amber-200", label: "מומלץ" },
  low: { icon: Info, color: "text-blue-600", bg: "bg-blue-50 border-blue-200", label: "כדאי לדעת" },
};

function GapsSection({ gaps }: { gaps: WillGap[] }) {
  const high = gaps.filter((g) => g.severity === "high");
  const medium = gaps.filter((g) => g.severity === "medium");
  const low = gaps.filter((g) => g.severity === "low");
  const sorted = [...high, ...medium, ...low];

  return (
    <div
      className="bg-card rounded-xl border border-border shadow-sm p-6 md:p-8 animate-slide-up"
      style={{ animationDelay: "150ms", animationFillMode: "backwards" }}
    >
      <h2 className="text-base md:text-lg font-bold mb-2 text-foreground">
        מה עוד חסר בנוסח הזה?
      </h2>
      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
        זיהינו {sorted.length} נושאים שכדאי להשלים עם עורך דין כדי שהצוואה תהיה תקפה ומלאה:
      </p>
      <div className="space-y-3">
        {sorted.map((gap, i) => {
          const config = severityConfig[gap.severity];
          const Icon = config.icon;
          return (
            <div
              key={i}
              className={`rounded-lg border p-4 ${config.bg}`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${config.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-foreground">{gap.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${config.color} bg-white/60`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {gap.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [cbSubmitted, setCbSubmitted] = useState(false);
  const [cbSubmitting, setCbSubmitting] = useState(false);
  const [cbName, setCbName] = useState(leadName);
  const [cbPhone, setCbPhone] = useState(leadPhone);

  function handleDownload() {
    if (!fullDraft) return;
    const blob = new Blob([fullDraft], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `נוסח_צוואה_${leadName.replace(/\s/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleCallbackSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cbName.trim() || !cbPhone.trim()) {
      toast.error("נא למלא שם וטלפון");
      return;
    }
    setCbSubmitting(true);
    try {
      await supabase.functions.invoke("notify-lead", {
        body: {
          fullName: cbName.trim(),
          phone: cbPhone.trim(),
          answers: {},
          willType,
          riskLevel: reviewRiskLevel || "",
          riskItems: reviewIssues || [],
        },
      });
      setCbSubmitted(true);
      toast.success("הפרטים נקלטו בהצלחה — ניצור קשר בהקדם.");
    } catch {
      toast.error("שגיאה בשליחת הפרטים.");
    }
    setCbSubmitting(false);
  }

  return (
    <div className="min-h-screen py-10 md:py-14 bg-background">
      <div className="container max-w-2xl space-y-6 md:space-y-8 px-4 md:px-6">
        {/* Header card */}
        <div className="bg-card rounded-xl border border-border shadow-md p-6 md:p-8 animate-slide-up">
          <div className="gold-line mx-auto mb-6" />
          <h1 className="text-xl md:text-2xl font-bold text-center mb-4 text-foreground" style={{ lineHeight: 1.5 }}>
            {mode === "draft"
              ? "נוסח הצוואה שלך מוכן"
              : reviewHeadline || "נמצאו נושאים שמומלץ לבדוק בצוואה הקיימת"}
          </h1>

          <div className="bg-secondary/50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">סוג צוואה:</span>
              <span className="font-bold text-foreground">{willType}</span>
            </div>
            {reviewRiskLevel && (
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-muted-foreground">רמת סיכון:</span>
                <span className="font-bold text-foreground">{reviewRiskLevel}</span>
              </div>
            )}
          </div>

          {mode === "draft" && (
            <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900 mb-6 space-y-2">
              <p>{legalWarning}</p>
              <p>המשתמש מצהיר כי ידוע לו שעל מנת להקנות תוקף משפטי לצוואה, נדרש ניסוח מותאם אישית, בדיקה משפטית פרטנית ועמידה בדרישות הדין, לרבות דרישות צורניות וראייתיות.</p>
            </div>
          )}
        </div>

        {/* Draft content */}
        {mode === "draft" && fullDraft && (
          <div
            className="bg-card rounded-xl border border-border shadow-sm p-6 md:p-8 animate-slide-up"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <pre
              className="whitespace-pre-wrap text-sm leading-relaxed text-foreground font-heebo"
              dir="rtl"
              style={{ fontFamily: "inherit" }}
            >
              {fullDraft}
            </pre>
          </div>
        )}

        {/* Review issues */}
        {mode === "review" && reviewIssues && reviewIssues.length > 0 && (
          <div
            className="bg-card rounded-xl border border-border shadow-sm p-6 md:p-8 animate-slide-up"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <h2 className="text-base md:text-lg font-bold mb-5 text-foreground">
              הנושאים שזוהו בבדיקה
            </h2>
            <ul className="space-y-3">
              {reviewIssues.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Download button (draft mode only) */}
        {mode === "draft" && fullDraft && (
          <div
            className="animate-slide-up"
            style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
          >
            <button
              onClick={handleDownload}
              className="w-full rounded-lg bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:brightness-110 active:scale-[0.97] flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              הורד את נוסח הצוואה
            </button>
          </div>
        )}

        {/* Gaps / Insights section */}
        {gaps && gaps.length > 0 && <GapsSection gaps={gaps} />}

        {/* Practical meaning */}
        <div
          className="bg-card rounded-xl border border-border shadow-sm p-6 md:p-8 animate-slide-up"
          style={{ animationDelay: "250ms", animationFillMode: "backwards" }}
        >
          <h2 className="text-base md:text-lg font-bold mb-3 text-foreground">המשמעות המעשית</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            צוואה שאינה מותאמת למצב המשפחתי, לנכסים ולסיכונים הקיימים — עלולה
            ליצור מחלוקות בין יורשים, לעכב את חלוקת העיזבון או להביא לתוצאה שאינה
            תואמת את רצון המצווה. בחינה מקצועית יכולה לזהות פערים אלה ולהתאים את
            ההסדר לנסיבות בפועל.
          </p>
        </div>

        {/* CTA callback */}
        <div
          className="bg-accent rounded-xl border border-accent p-6 md:p-8 text-center animate-slide-up"
          style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
        >
          <div className="gold-line mx-auto mb-5" />
          <h2 className="text-lg md:text-xl font-bold mb-3 text-accent-foreground">
            אני רוצה בדיקה משפטית והשלמה סופית
          </h2>
          <p className="text-sm text-accent-foreground/60 mb-6 leading-relaxed max-w-md mx-auto">
            השאירו פרטים ונחזור אליכם לשיחת ייעוץ ראשונית — ללא התחייבות.
          </p>

          {cbSubmitted ? (
            <div className="flex items-center justify-center gap-2 text-risk-low font-medium">
              <CheckCircle className="w-5 h-5" />
              <span>הפרטים נקלטו בהצלחה. ניצור קשר בהקדם.</span>
            </div>
          ) : !showCallbackForm ? (
            <button
              onClick={() => setShowCallbackForm(true)}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:shadow-xl hover:brightness-110 active:scale-[0.97]"
            >
              <Phone className="w-4 h-4" />
              בקשת שיחה מהמשרד
            </button>
          ) : (
            <form onSubmit={handleCallbackSubmit} className="max-w-sm mx-auto space-y-4 text-right">
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
              <button
                type="submit"
                disabled={cbSubmitting}
                className="w-full rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:brightness-110 active:scale-[0.97] disabled:opacity-60"
              >
                {cbSubmitting ? "שולח..." : "שליחת פרטים"}
              </button>
            </form>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-muted-foreground/60 text-center max-w-xl mx-auto leading-relaxed pb-6">
          {legalWarning}
        </p>
      </div>
    </div>
  );
}
