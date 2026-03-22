import { useState } from "react";
import { saveLead } from "@/lib/store";

interface Props {
  answers: Record<string, string>;
  intent: "full" | "email" | "callback";
  willDraftData?: { willType: string; fullDraft: string };
  onSubmit: (info: { name: string; phone: string; email?: string }) => void;
}

export function LeadCapture({ answers, intent, willDraftData, onSubmit }: Props) {
  const [fullName, setFullName] = useState(answers.fullName || "");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consentDraft, setConsentDraft] = useState(false);
  const [consentData, setConsentData] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "שדה חובה";
    if (!phone.trim()) errs.phone = "שדה חובה";
    else if (!/^0\d{8,9}$/.test(phone.replace(/[-\s]/g, "")))
      errs.phone = "מספר טלפון לא תקין";
    if (intent === "email" && !email.trim()) errs.email = "נדרש דוא״ל לשליחה";
    if (!consentDraft) errs.consentDraft = "נדרש אישור כדי להמשיך";
    if (!consentData) errs.consentData = "נדרש אישור כדי להמשיך";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    await saveLead(
      {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        answers,
        timestamp: new Date().toISOString(),
      },
      willDraftData
        ? {
            willType: willDraftData.willType as any,
            riskLevel: "בינונית",
            headline: "",
            riskItems: [],
            fullDraft: willDraftData.fullDraft,
          }
        : undefined
    );

    setSubmitting(false);
    onSubmit({
      name: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
    });
  }

  const intentLabel = {
    full: "הצגת טיוטת הצוואה",
    email: "שליחת הטיוטה למייל",
    callback: "בקשת שיחה מהמשרד",
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-background">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl border border-border shadow-md p-6 md:p-8 animate-slide-up">
          <div className="gold-line mx-auto mb-6" />
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2 text-foreground">
            כמעט סיימנו
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-8 leading-relaxed">
            לצורך {intentLabel[intent]} נבקש פרטים קצרים
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground">
                שם מלא <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground/50"
                placeholder="שם פרטי ומשפחה"
                maxLength={100}
              />
              {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground">
                טלפון <span className="text-destructive">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground/50"
                placeholder="050-0000000"
                dir="ltr"
                maxLength={15}
              />
              {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground">
                דוא״ל{" "}
                {intent === "email" ? (
                  <span className="text-destructive">*</span>
                ) : (
                  <span className="text-xs text-muted-foreground">(רשות)</span>
                )}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground/50"
                placeholder="email@example.com"
                dir="ltr"
                maxLength={255}
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentDraft}
                  onChange={(e) => setConsentDraft(e.target.checked)}
                  className="mt-1 rounded border-border accent-primary"
                />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  אני מאשר/ת שמדובר בטיוטה ראשונית בלבד, שאינה מהווה ייעוץ משפטי ואינה צוואה סופית לחתימה <span className="text-destructive">*</span>
                </span>
              </label>
              {errors.consentDraft && <p className="text-destructive text-xs mr-7">{errors.consentDraft}</p>}

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentData}
                  onChange={(e) => setConsentData(e.target.checked)}
                  className="mt-1 rounded border-border accent-primary"
                />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  אני מאשר/ת שימוש בפרטים שמסרתי לצורך יצירת הטיוטה, שמירת המידע במערכת ויצירת קשר בקשר לבקשתי <span className="text-destructive">*</span>
                </span>
              </label>
              {errors.consentData && <p className="text-destructive text-xs mr-7">{errors.consentData}</p>}

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentMarketing}
                  onChange={(e) => setConsentMarketing(e.target.checked)}
                  className="mt-1 rounded border-border accent-primary"
                />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  אני מסכים/ה לקבל עדכונים והצעות מהמשרד <span className="text-xs">(רשות)</span>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:shadow-xl hover:brightness-110 active:scale-[0.97] disabled:opacity-60"
            >
              {submitting ? "שולח..." : intentLabel[intent]}
            </button>
          </form>

          <p className="text-[10px] text-muted-foreground/50 text-center mt-6 leading-relaxed">
            המידע נשמר לצורך יצירת הטיוטה, טיפול בפנייה ויצירת קשר. ניתן לבקש עיון, תיקון או הסרה בהתאם לדין.
          </p>
        </div>
      </div>
    </div>
  );
}
