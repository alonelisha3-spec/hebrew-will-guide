import { useEffect, useState } from "react";
import { AlertTriangle, FileText, Users, Shield, Phone, MessageCircle, CheckCircle, Download } from "lucide-react";
import { legalWarningText as legalWarning } from "@/lib/legalTexts";
import { trackEvent } from "@/lib/tracking";
import { generateWillPdf } from "@/lib/generatePdf";
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
  /** Identity form, rendered under the draft. The draft stays visible either way. */
  leadForm?: React.ReactNode;
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

const LAWYER_PHONE = "054-9260698";
const WHATSAPP_LINK = `https://wa.me/972549260698?text=${encodeURIComponent("שלום, מילאתי את כלי הצוואה באתר ואשמח לשיחת ייעוץ.")}`;

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
  leadForm,
}: Props) {
  const extraGaps = gaps?.filter((g) => g.severity === "high").slice(0, 2) || [];
  const displayGapCount = ALWAYS_SHOW_GAPS.length + extraGaps.length;

  const isDraft = mode === "draft";
  const riskBadge = reviewRiskLevel === "high" ? "גבוה" : reviewRiskLevel === "medium" ? "בינוני" : "נמוך";
  const riskBadgeBg = reviewRiskLevel === "high" ? "bg-red-500/10 text-red-500" : reviewRiskLevel === "medium" ? "bg-yellow-500/10 text-yellow-500" : "bg-green-500/10 text-green-500";

  const [generatingPdf, setGeneratingPdf] = useState(false);

  useEffect(() => {
    trackEvent("results_viewed", { metadata: { mode, willType } });
  }, []);

  async function handleDownloadPdf() {
    if (!fullDraft || generatingPdf) return;
    setGeneratingPdf(true);
    try {
      await generateWillPdf(fullDraft, leadName);
      trackEvent("pdf_downloaded", { metadata: { willType } });
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setGeneratingPdf(false);
    }
  }

  return (
    <div className="min-h-screen py-6 md:py-14 bg-background">
      <div className="container max-w-2xl space-y-5 md:space-y-8 px-3 md:px-6">

        {/* ── Hero Section ── */}
        <div className="bg-card rounded-2xl border border-border shadow-md p-5 md:p-10 animate-slide-up text-center">
          <div className="gold-line mx-auto mb-4 md:mb-6" />

          {isDraft ? (
            <>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-semibold mb-3 md:mb-4">
                <CheckCircle className="w-3.5 h-3.5" />
                הטיוטה מוכנה
              </div>
              <h1 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-foreground leading-snug md:leading-relaxed">
                {leadName ? `${leadName}, ` : ""}הטיוטה שלך מוכנה — אך זיהינו {displayGapCount} נקודות לשיפור
              </h1>
              <p className="text-xs md:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
                הנוסח נותן בסיס טוב, אבל בלי התאמה משפטית אישית הוא עלול להיות חסר תוקף או לגרום לסכסוכים
              </p>
            </>
          ) : (
            <>
              <div className={`inline-flex items-center gap-2 ${riskBadgeBg} rounded-full px-4 py-1.5 text-xs font-semibold mb-3 md:mb-4`}>
                <AlertTriangle className="w-3.5 h-3.5" />
                רמת סיכון: {riskBadge}
              </div>
              <h1 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-foreground leading-snug md:leading-relaxed">
                {reviewHeadline ||
                  `${leadName ? `${leadName}, ` : ""}הצוואה הקיימת שלך דורשת עדכון`}
              </h1>
              <p className="text-xs md:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
                הבדיקה העלתה נושאים שעלולים להשפיע על תוקף הצוואה או על חלוקת העיזבון
              </p>
            </>
          )}
        </div>

        {/* ── The draft itself, with its download button in the header. One card,
             one heading: the visitor answered 16-38 questions and had no way to
             read the result on screen. Never gated — the form below is optional. ── */}
        {isDraft && fullDraft && (
          <div
            className="bg-card rounded-2xl border border-border shadow-sm p-4 md:p-8 animate-slide-up"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 mb-4 md:mb-5">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary shrink-0" />
                <h2 className="text-sm md:text-lg font-bold text-foreground">
                  נוסח הטיוטה שנוצר מהתשובות שלך
                </h2>
              </div>
              <button
                onClick={handleDownloadPdf}
                disabled={generatingPdf}
                className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-8 py-4 md:px-6 md:py-3 text-base md:text-sm font-bold text-primary-foreground shadow-lg hover:brightness-110 transition-all active:scale-[0.97] disabled:opacity-60"
              >
                <Download className="w-5 h-5 md:w-4 md:h-4" />
                {generatingPdf ? "מכין PDF..." : "הורד טיוטה כ-PDF"}
              </button>
            </div>
            <div
              dir="rtl"
              className="max-h-[60vh] overflow-y-auto rounded-lg border border-border bg-secondary/30 p-4 md:p-6"
            >
              <pre className="whitespace-pre-wrap break-words text-right font-sans text-xs md:text-sm leading-7 text-foreground">
                {fullDraft}
              </pre>
            </div>
          </div>
        )}

        {/* ── Identity form — sits UNDER the draft, never in front of it ── */}
        {leadForm && (
          <div
            className="animate-slide-up"
            style={{ animationDelay: "150ms", animationFillMode: "backwards" }}
          >
            {leadForm}
          </div>
        )}

        {/* ── Review Issues (review mode) ── */}
        {!isDraft && reviewIssues && reviewIssues.length > 0 && (
          <div
            className="bg-card rounded-2xl border border-border shadow-sm p-4 md:p-8 animate-slide-up"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <div className="flex items-center gap-2 mb-4 md:mb-5">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-sm md:text-lg font-bold text-foreground">
                ממצאי הבדיקה:
              </h2>
            </div>
            <div className="space-y-3 md:space-y-4">
              {reviewIssues.map((issue, i) => (
                <div key={i} className="flex items-start gap-2.5 md:gap-3 rounded-lg border border-border bg-secondary/30 p-3 md:p-4">
                  <span className="mt-1 w-2 h-2 rounded-full shrink-0 bg-[hsl(var(--risk-high))]" />
                  <p className="text-xs md:text-sm leading-relaxed text-foreground">{issue}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Gaps Section ── */}
        <div
          className="bg-card rounded-2xl border border-border shadow-sm p-4 md:p-8 animate-slide-up"
          style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
        >
          <div className="flex items-center gap-2 mb-4 md:mb-5">
            <AlertTriangle className="w-5 h-5 text-[hsl(var(--risk-high))]" />
            <h2 className="text-sm md:text-lg font-bold text-foreground">
              {isDraft ? `זוהו ${displayGapCount} חוסרים שחשוב להשלים:` : `נקודות נוספות לתשומת לב:`}
            </h2>
          </div>
          <div className="space-y-3 md:space-y-4">
            {ALWAYS_SHOW_GAPS.map((gap, i) => {
              const Icon = gap.icon;
              return (
                <div key={i} className="flex items-start gap-2.5 md:gap-3 rounded-lg border border-[hsl(var(--risk-high)/0.2)] bg-[hsl(var(--risk-high)/0.04)] p-3 md:p-4">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 mt-0.5 shrink-0 text-[hsl(var(--risk-high))]" />
                  <p className="text-xs md:text-sm leading-relaxed text-foreground">{gap.text}</p>
                </div>
              );
            })}
            {extraGaps.map((gap, i) => (
              <div key={`extra-${i}`} className="flex items-start gap-2.5 md:gap-3 rounded-lg border border-[hsl(var(--risk-high)/0.2)] bg-[hsl(var(--risk-high)/0.04)] p-3 md:p-4">
                <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 mt-0.5 shrink-0 text-[hsl(var(--risk-high))]" />
                <p className="text-xs md:text-sm leading-relaxed text-foreground">{gap.title}: {gap.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA Section — Contact Lawyer ── */}
        <div
          className="bg-gradient-to-br from-primary/10 via-card to-primary/5 rounded-2xl border-2 border-primary/40 shadow-lg p-5 md:p-8 animate-slide-up text-center"
          style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
        >
          <div className="gold-line mx-auto mb-4 md:mb-5" />
          <h2 className="text-base md:text-xl font-bold mb-2 text-foreground">
            {isDraft
              ? "רוצה צוואה שבאמת תחזיק בבית משפט?"
              : "רוצה לוודא שהצוואה שלך תקפה ומעודכנת?"}
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground mb-5 md:mb-6 leading-relaxed max-w-md mx-auto">
            עו"ד אלון אלישע, מומחה לדיני ירושה וצוואות, מציע שיחת ייעוץ ראשונית
            ללא התחייבות — כדי לוודא שהמשפחה שלך מוגנת.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${LAWYER_PHONE}`}
              onClick={() => trackEvent("cta_call", { metadata: { source: "results" } })}
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-lg hover:brightness-110 transition-all active:scale-[0.97]"
            >
              <Phone className="w-5 h-5" />
              התקשר עכשיו — {LAWYER_PHONE}
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("cta_whatsapp", { metadata: { source: "results" } })}
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-4 text-base font-bold text-white shadow-lg hover:brightness-110 transition-all active:scale-[0.97]"
            >
              <MessageCircle className="w-5 h-5" />
              שלח הודעה בוואטסאפ
            </a>
          </div>
          <p className="text-[10px] md:text-xs text-muted-foreground/60 mt-4">
            שיחת הייעוץ הראשונית ללא עלות וללא התחייבות
          </p>
        </div>

        {/* ── Disclaimer ── */}
        <p className="text-[10px] md:text-[11px] text-muted-foreground/60 text-center max-w-xl mx-auto leading-relaxed pb-4 md:pb-6">
          {legalWarning}
        </p>
      </div>
    </div>
  );
}
