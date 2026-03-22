import { useState } from "react";
import { saveLead } from "@/lib/store";
import { calculateResults } from "@/lib/resultsEngine";

interface Props {
  answers: Record<string, string>;
  onSubmit: (info: { name: string; phone: string; email?: string }) => void;
}

export function LeadCapture({ answers, onSubmit }: Props) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consentCallback, setConsentCallback] = useState(false);
  const [consentDisclaimer, setConsentDisclaimer] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "שדה חובה";
    if (!phone.trim()) errs.phone = "שדה חובה";
    else if (!/^0\d{8,9}$/.test(phone.replace(/[-\s]/g, "")))
      errs.phone = "מספר טלפון לא תקין";
    if (!consentCallback) errs.consent = "נדרש אישור כדי להמשיך";
    if (!consentDisclaimer) errs.disclaimer = "נדרש אישור כדי להמשיך";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const result = calculateResults(answers);

    await saveLead(
      {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        answers,
        timestamp: new Date().toISOString(),
      },
      result
    );

    setSubmitting(false);
    onSubmit({
      name: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-background">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl border border-border shadow-md p-6 md:p-8 animate-slide-up">
          <div className="gold-line mx-auto mb-6" />
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2 text-foreground">
            שלב אחרון לפני התוצאות
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-8 leading-relaxed">
            לצורך הצגת סיכום הבדיקה ובחינת ההתאמה לצוואה רגילה, הדדית או עדכון
            צוואה קיימת — נבקש פרטים קצרים.
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
              {errors.fullName && (
                <p className="text-destructive text-xs mt-1">{errors.fullName}</p>
              )}
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
              {errors.phone && (
                <p className="text-destructive text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground">
                דוא״ל{" "}
                <span className="text-xs text-muted-foreground">(רשות)</span>
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
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentCallback}
                  onChange={(e) => setConsentCallback(e.target.checked)}
                  className="mt-1 rounded border-border accent-primary"
                />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  אני מאשר/ת יצירת קשר מטעם המשרד בנוגע לתוצאות הבדיקה
                </span>
              </label>
              {errors.consent && (
                <p className="text-destructive text-xs mr-7">{errors.consent}</p>
              )}

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentDisclaimer}
                  onChange={(e) => setConsentDisclaimer(e.target.checked)}
                  className="mt-1 rounded border-border accent-primary"
                />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  ידוע לי כי הבדיקה אינה מהווה ייעוץ משפטי ואינה יוצרת יחסי
                  עורך דין–לקוח
                </span>
              </label>
              {errors.disclaimer && (
                <p className="text-destructive text-xs mr-7">{errors.disclaimer}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:shadow-xl hover:brightness-110 active:scale-[0.97] disabled:opacity-60"
            >
              {submitting ? "שולח..." : "הצגת תוצאות הבדיקה"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
