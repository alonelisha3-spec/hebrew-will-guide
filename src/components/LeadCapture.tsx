import { useState } from "react";

interface Props {
  answers: Record<string, string>;
  intent: "full" | "email" | "callback";
  willDraftData?: { willType: string; fullDraft: string };
  onSubmit: (info: { name: string; phone: string; email?: string }) => void;
}

export function LeadCapture({ answers, intent, willDraftData, onSubmit }: Props) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consentData, setConsentData] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) errs.fullName = "יש למלא שם מלא";
    if (!phone.trim()) {
      errs.phone = "יש למלא טלפון";
    } else if (!/^0\d{8,9}$/.test(phone.replace(/[-\s]/g, ""))) {
      errs.phone = "מספר טלפון לא תקין";
    }

    if (intent === "email" && !email.trim()) {
      errs.email = "יש למלא כתובת דוא״ל";
    }

    if (!consentData) {
      errs.consentData = "יש לאשר שימוש בפרטים לצורך יצירת קשר";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function buildSummary() {
    const importantAnswers = Object.entries(answers)
      .filter(([, value]) => value && String(value).trim() !== "")
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    return importantAnswers || "לא נרשמו תשובות";
  }

  async function sendLeadToEmail() {
    const payload = new FormData();

    payload.append("_subject", "ליד חדש - מערכת צוואות");
    payload.append("_captcha", "false");
    payload.append("_template", "table");

    payload.append("שם מלא", fullName.trim());
    payload.append("טלפון", phone.trim());
    payload.append("אימייל", email.trim() || "לא נמסר");
    payload.append("סוג פנייה", intent);
    payload.append("סוג צוואה", willDraftData?.willType || "לא ידוע");
    payload.append("תשובות", buildSummary());
    payload.append("טיוטה", willDraftData?.fullDraft || "לא נוצרה טיוטה");

    await fetch("https://formsubmit.co/alonelisha3@gmail.com", {
      method: "POST",
      body: payload,
    });
  }

  function sendLeadToWhatsApp() {
    const msg = `ליד חדש ממערכת הצוואות

שם: ${fullName.trim()}
טלפון: ${phone.trim()}
אימייל: ${email.trim() || "לא נמסר"}
סוג פנייה: ${intent}
סוג צוואה: ${willDraftData?.willType || "לא ידוע"}

תשובות:
${buildSummary()}
`;

    window.open(
      `https://wa.me/972549260698?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      await sendLeadToEmail();
      sendLeadToWhatsApp();

      onSubmit({
        name: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
      });
    } catch (error) {
      console.error("Lead submit failed:", error);
      alert("אירעה שגיאה בשליחת הפרטים. נסו שוב.");
    } finally {
      setSubmitting(false);
    }
  }

  const title =
    intent === "callback"
      ? "נמצאו נקודות שמומלץ לבדוק"
      : "כדי לקבל את התוצאה המלאה";

  const subtitle =
    intent === "callback"
      ? "השאירו פרטים ואחזור אליכם לגבי הטיוטה או החוסרים שעלו"
      : "השאירו פרטים קצרים כדי לקבל את הטיוטה או התוצאה המלאה";

  const buttonLabel =
    intent === "callback"
      ? "אני רוצה שיחזרו אליי"
      : "המשך לתוצאה המלאה";

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-background">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl border border-border shadow-md p-6 md:p-8 animate-slide-up">
          <div className="gold-line mx-auto mb-6" />

          <h2 className="text-xl md:text-2xl font-bold text-center mb-2 text-foreground">
            {title}
          </h2>

          <p className="text-sm text-muted-foreground text-center mb-8 leading-relaxed">
            {subtitle}
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
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
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
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
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
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="email@example.com"
                dir="ltr"
                maxLength={255}
              />
              {errors.email && (
                <p className="text-destructive text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentData}
                  onChange={(e) => setConsentData(e.target.checked)}
                  className="mt-1 rounded border-border accent-primary"
                />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  אני מאשר/ת שימוש בפרטים שמסרתי לצורך יצירת קשר בקשר לבקשתי <span className="text-destructive">*</span>
                </span>
              </label>
              {errors.consentData && (
                <p className="text-destructive text-xs mr-7">{errors.consentData}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:shadow-xl hover:brightness-110 active:scale-[0.97] disabled:opacity-60"
            >
              {submitting ? "שולח..." : buttonLabel}
            </button>
          </form>

          <p className="text-[10px] text-muted-foreground/50 text-center mt-6 leading-relaxed">
            לאחר השליחה, הפרטים יישלחו למשרד לצורך יצירת קשר והמשך טיפול.
          </p>
        </div>
      </div>
    </div>
  );
}
