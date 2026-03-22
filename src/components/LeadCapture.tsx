import { useState } from "react";
import { saveLead } from "@/lib/store";

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
    if (!consentCallback) errs.consent = "יש לאשר כדי להמשיך";
    if (!consentDisclaimer) errs.disclaimer = "יש לאשר כדי להמשיך";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    saveLead({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      answers,
      timestamp: new Date().toISOString(),
    });

    setTimeout(() => {
      setSubmitting(false);
      onSubmit({
        name: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
      });
    }, 400);
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="container max-w-md">
        <div className="bg-card rounded-xl border shadow-lg p-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-center mb-2">כמעט סיימנו</h2>
          <p className="text-sm text-muted-foreground text-center mb-8 leading-relaxed">
            כדי להציג את תוצאות הבדיקה המלאות ולקבוע האם יש צורך בצוואה רגילה,
            צוואה הדדית או עדכון צוואה קיימת, יש להשאיר פרטים.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                שם מלא <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                placeholder="הזינו שם מלא"
                maxLength={100}
              />
              {errors.fullName && (
                <p className="text-destructive text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                טלפון <span className="text-destructive">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                placeholder="050-1234567"
                dir="ltr"
                maxLength={15}
              />
              {errors.phone && (
                <p className="text-destructive text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                אימייל <span className="text-xs text-muted-foreground">(אופציונלי)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
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
                  className="mt-1 rounded border-border"
                />
                <span className="text-sm leading-relaxed">
                  אני מאשר/ת שיחזרו אליי בקשר לבדיקה
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
                  className="mt-1 rounded border-border"
                />
                <span className="text-sm leading-relaxed">
                  קראתי והבנתי שהבדיקה אינה ייעוץ משפטי
                </span>
              </label>
              {errors.disclaimer && (
                <p className="text-destructive text-xs mr-7">{errors.disclaimer}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition-all duration-200 hover:shadow-xl hover:shadow-primary/15 active:scale-[0.97] disabled:opacity-60"
            >
              {submitting ? "שולח..." : "הצג תוצאה"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
