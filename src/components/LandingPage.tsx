import { useState, useEffect } from "react";
import { Shield, FileText, Scale, CheckCircle2, Users, Clock, TrendingUp, Phone, Mail, MessageCircle } from "lucide-react";
import { FAQSection } from "./FAQSection";
import { QuickAssessment } from "./QuickAssessment";
import portraitImg from "@/assets/portrait-alon.png";

interface Props {
  onNoWill: () => void;
  onExistingWill: () => void;
  isFromFacebook?: boolean;
}

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / (duration / 30));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{count.toLocaleString("he-IL")}+</span>;
}

export function LandingPage({ onNoWill, onExistingWill, isFromFacebook }: Props) {
  const headline = isFromFacebook
    ? "אם זמן העבודה התקצר ב-80% — למה אתה משלם אותו דבר?"
    : "אם זמן העבודה התקצר ב-80% — למה אתה משלם אותו דבר?";
  const subHeadline = isFromFacebook
    ? "הטכנולוגיה קיצרה את הפרוצדורה. אנחנו גובים רק על מה שבאמת דורש עורך דין — ההתאמה האישית, האחריות המשפטית, והאפיון הסופי."
    : "הטכנולוגיה קיצרה את הפרוצדורה. אנחנו גובים רק על מה שבאמת דורש עורך דין — ההתאמה האישית, האחריות המשפטית, והאפיון הסופי.";
  return (
    <div className="min-h-screen">
      <section className="py-24 md:py-36 bg-accent text-accent-foreground relative overflow-hidden">
        <div className="container max-w-4xl text-center px-4 md:px-6 relative z-10">
          <p className="text-xs tracking-[0.25em] text-primary uppercase mb-5">
            משרד עורכי דין אלון אלישע
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold leading-tight text-white"
            style={{ lineHeight: 1.3 }}
          >
            {headline}
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-accent-foreground/90 leading-relaxed max-w-3xl mx-auto font-medium">
            {subHeadline}
          </p>
          <p className="mt-4 text-base md:text-lg text-accent-foreground/70 leading-relaxed max-w-2xl mx-auto">
            אותו שירות משפטי · אותה אחריות · בלי לשלם על פרוצדורה מיושנת
          </p>

          {/* Social proof bar */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 md:gap-12 text-base">
            <div className="flex items-center gap-2 text-white/90">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg"><AnimatedCounter target={850} /></span>
              <span className="text-accent-foreground/70">כבר השתמשו בכלי</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg">98%</span>
              <span className="text-accent-foreground/70">שביעות רצון</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg">פחות מ-2 דקות</span>
              <span className="text-accent-foreground/70">למילוי</span>
            </div>
          </div>

          {/* Quick Assessment */}
          <div className="mt-12">
            <QuickAssessment onStartFull={onNoWill} />
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4">
            <button
              onClick={onNoWill}
              className="group relative inline-flex items-center justify-center rounded-md bg-primary px-16 py-7 text-2xl font-bold text-primary-foreground shadow-xl w-full sm:w-auto sm:min-w-[400px] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(38_50%_58%/0.4)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <FileText className="w-7 h-7 ml-3 relative z-10" />
              <span className="relative z-10">לבדיקה מלאה + טיוטת צוואה</span>
            </button>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/972549260698?text=${encodeURIComponent("שלום, אשמח לשמוע פרטים על הכנת צוואה.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-[#25D366]/40 bg-[#25D366]/10 px-10 py-5 text-lg font-semibold text-[#25D366] w-full sm:w-auto sm:min-w-[400px] transition-all duration-200 hover:bg-[#25D366]/20 hover:scale-105"
            >
              <MessageCircle className="w-6 h-6" />
              דברו איתי בוואטסאפ
            </a>

            <button
              onClick={onExistingWill}
              className="inline-flex items-center justify-center text-base text-accent-foreground/60 hover:text-accent-foreground transition-colors underline underline-offset-4"
            >
              יש לי כבר צוואה ואני רוצה לבדוק אותה
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-base max-w-3xl mx-auto">
            <div className="rounded-lg bg-white/10 border border-white/10 px-5 py-4">
              <p className="font-semibold text-white text-lg">האפיון הראשוני? דיגיטלי</p>
              <p className="text-accent-foreground/70 mt-1">שאלון חכם שחוסך לעורך הדין שעות הכנה</p>
            </div>
            <div className="rounded-lg bg-white/10 border border-white/10 px-5 py-4">
              <p className="font-semibold text-white text-lg">השירות? מלא</p>
              <p className="text-accent-foreground/70 mt-1">
                שיחה אישית, אפיון סופי, התאמות והתאמה אליך
              </p>
            </div>
            <div className="rounded-lg bg-white/10 border border-white/10 px-5 py-4">
              <p className="font-semibold text-white text-lg">המחיר? הוגן</p>
              <p className="text-accent-foreground/70 mt-1">
                כי זמן העבודה באמת התקצר — והמחיר משקף את זה
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 text-base text-accent-foreground/70">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary/80" />
              ללא התחייבות
            </span>
            <span className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary/80" />
              טיוטה בלבד — לא מסמך סופי
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary/80" />
              לא מחליף ייעוץ משפטי
            </span>
          </div>

          {/* Legal disclaimer - prominent */}
          <div className="mt-14 max-w-3xl mx-auto rounded-xl border-2 border-primary/40 bg-white/[0.08] px-7 py-6 text-right">
            <p className="font-bold text-primary mb-4 text-lg text-center">
              ⚖️ הבהרה משפטית — חובה לקרוא לפני השימוש
            </p>
            <p className="text-sm text-accent-foreground/80 leading-relaxed">
              הכלי מייצר טיוטת מסמך ראשונית בלבד לצורכי עבודה מקדימה, ואינו מהווה ייעוץ משפטי.
              השימוש בכלי אינו יוצר יחסי עורך דין–לקוח בין המשתמש למשרד עו״ד אלון אלישע,
              ואינו מתיימר להחליף ייעוץ או ליווי של עורך דין מוסמך.
              הטיוטה המתקבלת מיועדת אך ורק כבסיס ראשוני להשלמה.
              אין להסתמך על הטיוטה כמסמך משפטי תקף.
              המשרד ממליץ ליצור צוואה תקפה על פי דין לאחר ייעוץ משפטי.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-primary font-medium text-base">
              <a href="tel:054-9260698" className="flex items-center gap-2 hover:text-primary/80 transition-colors">
                <Phone className="w-4 h-4" />
                054-9260698
              </a>
              <span className="hidden sm:inline text-accent-foreground/30">|</span>
              <a href="mailto:alonelisha3@gmail.com" className="flex items-center gap-2 hover:text-primary/80 transition-colors">
                <Mail className="w-4 h-4" />
                alonelisha3@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container max-w-4xl px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            אנחנו לא מחליפים את עורך הדין.
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-center text-primary mb-10">
            אנחנו מחליפים את הפרוצדורה.
          </h3>

          <p className="text-center text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto mb-6">
            פגישה ראשונה, אפיון, בניית טיוטה — כל זה פרוצדורה טכנית, לא עבודה משפטית.
            הטכנולוגיה עושה את זה תוך דקות. אז למה אתה עדיין משלם עליה?
          </p>
          <p className="text-center text-foreground text-lg leading-relaxed max-w-3xl mx-auto mb-12 font-medium">
            אצלנו אתה משלם רק על הדלתא — ההתאמה האישית, האפיון הסופי, והאחריות המשפטית.
            אותו שירות. אותו עורך דין. בלי לצאת פראייר.
          </p>

          {/* Comparison Table - Desktop */}
          <div className="hidden md:block overflow-hidden rounded-xl border border-border shadow-lg">
            <table className="w-full text-right" dir="rtl">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-6 py-4 text-sm font-bold text-muted-foreground"></th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-muted-foreground">הדרך הישנה 🐌</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-primary">הדרך של אלון אלישע ⚡</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="bg-card">
                  <td className="px-6 py-4 font-medium text-foreground">שלב 1</td>
                  <td className="px-6 py-4 text-center text-muted-foreground">קביעת פגישה — תיאום של שבועות</td>
                  <td className="px-6 py-4 text-center text-foreground font-medium">שאלון דיגיטלי — 2 דקות</td>
                </tr>
                <tr className="bg-card/50">
                  <td className="px-6 py-4 font-medium text-foreground">שלב 2</td>
                  <td className="px-6 py-4 text-center text-muted-foreground">פגישת אפיון — שעה במשרד</td>
                  <td className="px-6 py-4 text-center text-foreground font-medium">הנתונים מוזנים אוטומטית</td>
                </tr>
                <tr className="bg-card">
                  <td className="px-6 py-4 font-medium text-foreground">שלב 3</td>
                  <td className="px-6 py-4 text-center text-muted-foreground">הכנת טיוטה — ימים עד שבועות</td>
                  <td className="px-6 py-4 text-center text-foreground font-medium">טיוטה מוכנה מיידית</td>
                </tr>
                <tr className="bg-card/50">
                  <td className="px-6 py-4 font-medium text-foreground">שלב 4</td>
                  <td className="px-6 py-4 text-center text-muted-foreground">שליחה ללקוח + תיקונים</td>
                  <td className="px-6 py-4 text-center text-foreground font-medium">הלקוח חותם בעצמו + מגיש</td>
                </tr>
                <tr className="bg-card">
                  <td className="px-6 py-4 font-medium text-foreground">שלב 5</td>
                  <td className="px-6 py-4 text-center text-muted-foreground">פגישה נוספת + חתימה</td>
                  <td className="px-6 py-4 text-center text-foreground font-medium">אפיון אישי מול עורך הדין — צוואה מותאמת ומקצועית שמגלמת את רצונך</td>
                </tr>
                <tr className="bg-primary/5 border-t-2 border-primary/20">
                  <td className="px-6 py-4 font-bold text-foreground">מחיר</td>
                  <td className="px-6 py-4 text-center text-muted-foreground">5,000+ ש״ח</td>
                  <td className="px-6 py-4 text-center text-primary font-bold text-lg">מאות ש״ח</td>
                </tr>
                <tr className="bg-primary/5">
                  <td className="px-6 py-4 font-bold text-foreground">זמן</td>
                  <td className="px-6 py-4 text-center text-muted-foreground">2–4 שבועות</td>
                  <td className="px-6 py-4 text-center text-primary font-bold text-lg">באותו היום</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Comparison Cards - Mobile */}
          <div className="md:hidden space-y-4">
            {[
              { step: "שלב 1", old: "קביעת פגישה — שבועות", new: "שאלון דיגיטלי — 2 דקות" },
              { step: "שלב 2", old: "פגישת אפיון — שעה במשרד", new: "הנתונים מוזנים אוטומטית" },
              { step: "שלב 3", old: "הכנת טיוטה — ימים עד שבועות", new: "טיוטה מוכנה מיידית" },
              { step: "שלב 4", old: "שליחה + תיקונים", new: "הלקוח חותם ומגיש" },
              { step: "שלב 5", old: "פגישה נוספת + חתימה", new: "אפיון אישי — צוואה מותאמת שמגלמת את רצונך" },
            ].map((item) => (
              <div key={item.step} className="rounded-lg border border-border bg-card p-4">
                <p className="font-bold text-foreground text-sm mb-2">{item.step}</p>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground line-through flex-1">{item.old}</span>
                  <span className="text-sm text-primary font-medium flex-1">{item.new}</span>
                </div>
              </div>
            ))}
            <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5 text-center">
              <div className="flex justify-around mb-2">
                <div>
                  <p className="text-xs text-muted-foreground">מחיר ישן</p>
                  <p className="text-lg text-muted-foreground line-through">5,000+ ש״ח</p>
                </div>
                <div>
                  <p className="text-xs text-primary font-medium">אצלנו</p>
                  <p className="text-lg text-primary font-bold">מאות ש״ח</p>
                </div>
              </div>
              <div className="flex justify-around">
                <div>
                  <p className="text-xs text-muted-foreground">זמן ישן</p>
                  <p className="text-lg text-muted-foreground line-through">2–4 שבועות</p>
                </div>
                <div>
                  <p className="text-xs text-primary font-medium">אצלנו</p>
                  <p className="text-lg text-primary font-bold">באותו היום</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quote */}
          <blockquote className="mt-14 max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl font-bold text-foreground leading-relaxed">
              &ldquo;הלקוח לא צריך לשלם על פרוצדורה.
              <br />
              <span className="text-primary">הוא צריך לשלם על שיקול דעת משפטי.</span>&rdquo;
            </p>
            <footer className="mt-4 text-muted-foreground text-base">
              — אלון אלישע, עו״ד
            </footer>
          </blockquote>

          {/* CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={onNoWill}
              className="inline-flex items-center justify-center rounded-md bg-primary px-14 py-6 text-xl font-bold text-primary-foreground shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_hsl(38_50%_58%/0.4)]"
            >
              <FileText className="w-6 h-6 ml-3" />
              התחילו עכשיו — בחינם
            </button>
          </div>
        </div>
      </section>

      <FAQSection />

      {/* Personal Story Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container max-w-4xl px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
            <img
              src={portraitImg}
              alt="עו״ד אלון אלישע"
              loading="lazy"
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover object-top shadow-lg border-4 border-accent/20 flex-shrink-0 mx-auto md:mx-0"
            />
            <div className="text-right">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                למה הפסקתי לגבות אלפי שקלים על צוואה
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
                <p>
                  אני עושה צוואות כבר שנים. ליוויתי מאות משפחות, ראיתי מה קורה כשאין צוואה, ומה קורה כשיש צוואה שנכתבה נכון. <strong className="text-foreground">הניסיון הזה לא הולך לשום מקום.</strong>
                </p>
                <p>
                  אבל הייתי גובה אלפי שקלים. לא כי העבודה המשפטית שלי שווה פחות — אלא כי התהליך היה ארוך: פגישה ראשונה, אפיון, בניית טיוטה מאפס, תיקונים, פגישה נוספת. <strong className="text-foreground">80% מהזמן שלי הלך על פרוצדורה — לא על עבודה משפטית.</strong>
                </p>
                <p>
                  היום בניתי כלי דיגיטלי שעושה את האפיון הראשוני ומכין לי טיוטה בדקות — עבודה שפעם לקחה לי ימים. <strong className="text-foreground">אבל אתה עדיין מקבל הכל:</strong> אני אקרא כל מילה, נדבר, אאפיין, אתאים, ואקח אחריות. הכלי חוסך לי שעות — והחיסכון הזה עובר אליך.
                </p>
                <p>
                  <strong className="text-foreground">אני כבר לא מוכן לגבות על פרוצדורה שהטכנולוגיה עושה בשבילי. כי זה לא הוגן.</strong>
                </p>
                <p className="text-foreground font-medium">
                  מה אתה כן מקבל:
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-3 bg-primary/5 rounded-lg p-4 border border-primary/10">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">שיחה אישית + התאמה</p>
                    <p className="text-sm text-muted-foreground">נדבר, נבין את המצב שלך, ואתאים את הצוואה בדיוק אליך</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-primary/5 rounded-lg p-4 border border-primary/10">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">אפיון סופי</p>
                    <p className="text-sm text-muted-foreground">שימה על כל סעיף, בדיקה שהכל עומד משפטית</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-primary/5 rounded-lg p-4 border border-primary/10">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">אחריות משפטית</p>
                    <p className="text-sm text-muted-foreground">אני חותם, אני אחראי. לא AI, לא כלי — עורך דין</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-primary/5 rounded-lg p-4 border border-primary/10">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">הגנה על המשפחה</p>
                    <p className="text-sm text-muted-foreground">שהצוואה תעמוד במבחן — ואף אחד לא ייפגע</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-5 bg-accent/10 rounded-xl border border-accent/20 text-center">
                <p className="text-lg font-bold text-foreground mb-1">
                  אותו ניסיון. אותה אחריות. אותה איכות.
                </p>
                <p className="text-primary font-bold text-xl">
                  בלי לשלם על פרוצדורה שהטכנולוגיה כבר עושה בשבילך.
                </p>
              </div>

              <button
                onClick={onNoWill}
                className="mt-8 w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-primary px-14 py-6 text-xl font-bold text-primary-foreground shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_hsl(38_50%_58%/0.4)]"
              >
                <FileText className="w-6 h-6 ml-3" />
                התחילו עכשיו — בחינם
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
