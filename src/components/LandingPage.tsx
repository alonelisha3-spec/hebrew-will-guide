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
  const headline = "אם זמן העבודה התקצר ב-80% — למה אתה משלם אותו דבר?";
  const subHeadline = "הטכנולוגיה קיצרה את הפרוצדורה. אנחנו גובים רק על מה שבאמת דורש עורך דין — ההתאמה האישית, האחריות המשפטית, והאפיון הסופי.";
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="py-12 md:py-16 bg-accent text-accent-foreground relative overflow-hidden">
        <div className="container max-w-3xl text-center px-4 md:px-6 relative z-10">
          <p className="text-[10px] tracking-[0.25em] text-primary uppercase mb-3">
            משרד עורכי דין אלון אלישע
          </p>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight text-white">
            {headline}
          </h1>
          <p className="mt-3 text-sm md:text-base text-accent-foreground/90 leading-relaxed max-w-2xl mx-auto">
            {subHeadline}
          </p>
          <p className="mt-2 text-xs text-accent-foreground/60">
            אותו שירות משפטי · אותה אחריות · בלי לשלם על פרוצדורה מיושנת
          </p>

          {/* Social proof bar */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs">
            <div className="flex items-center gap-1.5 text-white/90">
              <Scale className="w-3.5 h-3.5 text-primary" />
              <span className="font-bold">ניסיון של שנים</span>
              <span className="text-accent-foreground/60">בדיני צוואות</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/90">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span className="font-bold">אחריות מלאה</span>
              <span className="text-accent-foreground/60">של עורך דין</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/90">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span className="font-bold">פחות מ-2 דקות</span>
              <span className="text-accent-foreground/60">למילוי השאלון</span>
            </div>
          </div>

          {/* Quick Assessment */}
          <div className="mt-6">
            <QuickAssessment onStartFull={onNoWill} />
          </div>

          <div className="mt-5 flex flex-col items-center justify-center gap-3">
            <button
              onClick={onNoWill}
              className="group relative inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-base font-bold text-primary-foreground shadow-lg w-full sm:w-auto sm:min-w-[320px] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_hsl(38_50%_58%/0.4)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <FileText className="w-5 h-5 ml-2 relative z-10" />
              <span className="relative z-10">לבדיקה מלאה + טיוטת צוואה</span>
            </button>

            <a
              href={`https://wa.me/972549260698?text=${encodeURIComponent("שלום, אשמח לשמוע פרטים על הכנת צוואה.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#25D366]/40 bg-[#25D366]/10 px-8 py-3 text-sm font-semibold text-[#25D366] w-full sm:w-auto sm:min-w-[320px] transition-all duration-200 hover:bg-[#25D366]/20 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              דברו איתי בוואטסאפ
            </a>

            <button
              onClick={onExistingWill}
              className="text-xs text-accent-foreground/50 hover:text-accent-foreground transition-colors underline underline-offset-4"
            >
              יש לי כבר צוואה ואני רוצה לבדוק אותה
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs max-w-2xl mx-auto">
            <div className="rounded-lg bg-white/10 border border-white/10 px-3 py-2.5">
              <p className="font-semibold text-white">האפיון הראשוני? דיגיטלי</p>
              <p className="text-accent-foreground/60 mt-0.5 text-[11px]">שאלון חכם שחוסך לעורך הדין שעות הכנה</p>
            </div>
            <div className="rounded-lg bg-white/10 border border-white/10 px-3 py-2.5">
              <p className="font-semibold text-white">השירות? מלא</p>
              <p className="text-accent-foreground/60 mt-0.5 text-[11px]">שיחה אישית, אפיון סופי, התאמות</p>
            </div>
            <div className="rounded-lg bg-white/10 border border-white/10 px-3 py-2.5">
              <p className="font-semibold text-white">המחיר? הוגן</p>
              <p className="text-accent-foreground/60 mt-0.5 text-[11px]">כי זמן העבודה באמת התקצר</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-[11px] text-accent-foreground/60">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary/80" />
              ללא התחייבות
            </span>
            <span className="flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-primary/80" />
              טיוטה בלבד — לא מסמך סופי
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-primary/80" />
              לא מחליף ייעוץ משפטי
            </span>
          </div>

          {/* Legal disclaimer */}
          <div className="mt-6 max-w-2xl mx-auto rounded-lg border border-primary/30 bg-white/[0.06] px-4 py-3 text-right">
            <p className="font-bold text-primary mb-2 text-xs text-center">
              ⚖️ הבהרה משפטית
            </p>
            <p className="text-[11px] text-accent-foreground/70 leading-relaxed">
              הכלי מייצר טיוטת מסמך ראשונית בלבד ואינו מהווה ייעוץ משפטי.
              השימוש אינו יוצר יחסי עורך דין–לקוח ואינו מחליף ייעוץ של עורך דין מוסמך.
              אין להסתמך על הטיוטה כמסמך משפטי תקף.
            </p>
            <div className="mt-2 flex items-center justify-center gap-4 text-primary text-[11px]">
              <a href="tel:054-9260698" className="flex items-center gap-1 hover:text-primary/80">
                <Phone className="w-3 h-3" />054-9260698
              </a>
              <span className="text-accent-foreground/30">|</span>
              <a href="mailto:alonelisha3@gmail.com" className="flex items-center gap-1 hover:text-primary/80">
                <Mail className="w-3 h-3" />alonelisha3@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container max-w-3xl px-4 md:px-6">
          <h2 className="text-xl md:text-2xl font-bold text-center text-foreground mb-1">
            אנחנו לא מחליפים את עורך הדין.
          </h2>
          <h3 className="text-lg md:text-xl font-bold text-center text-primary mb-5">
            אנחנו מחליפים את הפרוצדורה.
          </h3>

          <p className="text-center text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto mb-3">
            פגישה ראשונה, אפיון, בניית טיוטה — כל זה פרוצדורה טכנית, לא עבודה משפטית.
            הטכנולוגיה עושה את זה תוך דקות. אז למה אתה עדיין משלם עליה?
          </p>
          <p className="text-center text-foreground text-sm leading-relaxed max-w-2xl mx-auto mb-6 font-medium">
            אצלנו אתה משלם רק על הדלתא — ההתאמה האישית, האפיון הסופי, והאחריות המשפטית.
          </p>

          {/* Table - Desktop */}
          <div className="hidden md:block overflow-hidden rounded-lg border border-border shadow-sm">
            <table className="w-full text-right text-sm" dir="rtl">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-2.5 text-xs font-bold text-muted-foreground"></th>
                  <th className="px-4 py-2.5 text-center text-xs font-bold text-muted-foreground">הדרך הישנה 🐌</th>
                  <th className="px-4 py-2.5 text-center text-xs font-bold text-primary">הדרך של אלון אלישע ⚡</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs">
                {[
                  { step: "שלב 1", old: "קביעת פגישה — תיאום של שבועות", now: "שאלון דיגיטלי — 2 דקות" },
                  { step: "שלב 2", old: "פגישת אפיון — שעה במשרד", now: "הנתונים מוזנים אוטומטית" },
                  { step: "שלב 3", old: "הכנת טיוטה — ימים עד שבועות", now: "טיוטה מוכנה מיידית" },
                  { step: "שלב 4", old: "שליחה ללקוח + תיקונים", now: "הלקוח חותם בעצמו + מגיש" },
                  { step: "שלב 5", old: "פגישה נוספת + חתימה", now: "אפיון אישי — צוואה מותאמת ומקצועית" },
                ].map((r, i) => (
                  <tr key={r.step} className={i % 2 === 0 ? "bg-card" : "bg-card/50"}>
                    <td className="px-4 py-2.5 font-medium text-foreground">{r.step}</td>
                    <td className="px-4 py-2.5 text-center text-muted-foreground">{r.old}</td>
                    <td className="px-4 py-2.5 text-center text-foreground font-medium">{r.now}</td>
                  </tr>
                ))}
                <tr className="bg-primary/5 border-t-2 border-primary/20">
                  <td className="px-4 py-2.5 font-bold text-foreground">מחיר</td>
                  <td className="px-4 py-2.5 text-center text-muted-foreground">אלפי ש״ח</td>
                  <td className="px-4 py-2.5 text-center text-primary font-bold">מאות ש״ח</td>
                </tr>
                <tr className="bg-primary/5">
                  <td className="px-4 py-2.5 font-bold text-foreground">זמן</td>
                  <td className="px-4 py-2.5 text-center text-muted-foreground">2–4 שבועות</td>
                  <td className="px-4 py-2.5 text-center text-primary font-bold">באותו היום</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Cards - Mobile */}
          <div className="md:hidden space-y-2">
            {[
              { step: "שלב 1", old: "קביעת פגישה — שבועות", now: "שאלון דיגיטלי — 2 דקות" },
              { step: "שלב 2", old: "פגישת אפיון — שעה במשרד", now: "הנתונים מוזנים אוטומטית" },
              { step: "שלב 3", old: "הכנת טיוטה — ימים עד שבועות", now: "טיוטה מוכנה מיידית" },
              { step: "שלב 4", old: "שליחה + תיקונים", now: "הלקוח חותם ומגיש" },
              { step: "שלב 5", old: "פגישה נוספת + חתימה", now: "אפיון אישי — צוואה מותאמת" },
            ].map(item => (
              <div key={item.step} className="rounded border border-border bg-card p-3">
                <p className="font-bold text-foreground text-xs mb-1">{item.step}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground line-through flex-1">{item.old}</span>
                  <span className="text-primary font-medium flex-1">{item.now}</span>
                </div>
              </div>
            ))}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-center text-sm">
              <div className="flex justify-around mb-1">
                <div><p className="text-[10px] text-muted-foreground">מחיר ישן</p><p className="text-muted-foreground line-through">אלפי ש״ח</p></div>
                <div><p className="text-[10px] text-primary">אצלנו</p><p className="text-primary font-bold">מאות ש״ח</p></div>
              </div>
              <div className="flex justify-around">
                <div><p className="text-[10px] text-muted-foreground">זמן ישן</p><p className="text-muted-foreground line-through">2–4 שבועות</p></div>
                <div><p className="text-[10px] text-primary">אצלנו</p><p className="text-primary font-bold">באותו היום</p></div>
              </div>
            </div>
          </div>

          {/* Quote */}
          <blockquote className="mt-6 max-w-2xl mx-auto text-center">
            <p className="text-base md:text-lg font-bold text-foreground leading-relaxed">
              &ldquo;הלקוח לא צריך לשלם על פרוצדורה.
              <span className="text-primary"> הוא צריך לשלם על שיקול דעת משפטי.</span>&rdquo;
            </p>
            <footer className="mt-1 text-muted-foreground text-xs">— אלון אלישע, עו״ד</footer>
          </blockquote>

          <div className="mt-5 text-center">
            <button
              onClick={onNoWill}
              className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-base font-bold text-primary-foreground shadow-lg transition-all duration-200 hover:scale-105"
            >
              <FileText className="w-5 h-5 ml-2" />
              התחילו עכשיו — בחינם
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-8 md:py-10 bg-[#f9f7f3]">
        <div className="container max-w-3xl px-4 md:px-6">
          <h3 className="text-center text-xs font-bold text-[#0d1b2e]/50 tracking-wide mb-4">מה אומרים לקוחות המשרד</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {[
              { name: 'אוריאן ישראל', text: 'אלון ליווה אותי בצורה מקצועית ואישית. הרגשתי שיש מישהו שבאמת דואג לאינטרסים שלי, גם בלי להיפגש פיזית. הכל היה ברור, שקוף ומדויק.' },
              { name: 'אביב קריקון', text: 'הגעתי עם חשש מתהליך דיגיטלי, אבל אלון הפתיע אותי. זמין, מקצועי, ועם תשומת לב לכל פרט. קיבלתי שירות ברמה שלא חוויתי גם במשרדים גדולים.' },
              { name: 'אלה בן דוד', text: 'עורך דין שמדבר בגובה העיניים ולא מסבך. הכל נעשה בצורה נוחה ומהירה, עם ליווי אישי לאורך כל הדרך. ממליצה בחום.' },
            ].map(t => (
              <div key={t.name} className="bg-white rounded-lg p-3 border border-[#e8e0d0] text-right">
                <p className="text-[11px] text-[#555] leading-relaxed mb-1.5">"{t.text}"</p>
                <p className="text-[11px] font-bold text-[#c9a84c]">— {t.name}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-[#0d1b2e]/30">
            <span>⚖️ חבר לשכת עורכי הדין בישראל</span>
            <span>📍 מוהליבר 11, הרצליה</span>
          </div>
        </div>
      </section>

      <FAQSection />

      {/* PERSONAL STORY */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container max-w-3xl px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start gap-5 md:gap-8">
            <img
              src={portraitImg}
              alt="עו״ד אלון אלישע"
              loading="lazy"
              className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover object-top shadow-md border-3 border-accent/20 flex-shrink-0 mx-auto md:mx-0"
            />
            <div className="text-right">
              <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">
                למה הפסקתי לגבות אלפי שקלים על צוואה
              </h2>
              <div className="space-y-2 text-muted-foreground leading-relaxed text-xs md:text-sm">
                <p>
                  אני עושה צוואות כבר שנים. ליוויתי מאות משפחות, ראיתי מה קורה כשאין צוואה, ומה קורה כשיש צוואה שנכתבה נכון. <strong className="text-foreground">הניסיון הזה לא הולך לשום מקום.</strong>
                </p>
                <p>
                  אבל הייתי גובה אלפי שקלים. לא כי העבודה שלי שווה פחות — אלא כי התהליך היה ארוך: פגישה, אפיון, טיוטה, תיקונים, פגישה נוספת. <strong className="text-foreground">80% מהזמן הלך על פרוצדורה — לא על עבודה משפטית.</strong>
                </p>
                <p>
                  היום בניתי כלי דיגיטלי שעושה את האפיון הראשוני בדקות. <strong className="text-foreground">אבל אתה עדיין מקבל הכל:</strong> אקרא כל מילה, נדבר, אתאים, ואקח אחריות. הכלי חוסך לי שעות — והחיסכון עובר אליך.
                </p>
                <p>
                  <strong className="text-foreground">אני לא מוכן לגבות על פרוצדורה שהטכנולוגיה עושה בשבילי. כי זה לא הוגן.</strong>
                </p>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { title: 'שיחה אישית + התאמה', desc: 'נדבר, נבין את המצב שלך, ואתאים בדיוק אליך' },
                  { title: 'אפיון סופי', desc: 'שימה על כל סעיף, בדיקה שהכל עומד משפטית' },
                  { title: 'אחריות משפטית', desc: 'אני חותם, אני אחראי. לא AI — עורך דין' },
                  { title: 'הגנה על המשפחה', desc: 'שהצוואה תעמוד במבחן — ואף אחד לא ייפגע' },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-2 bg-primary/5 rounded p-2.5 border border-primary/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground text-xs">{item.title}</p>
                      <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20 text-center">
                <p className="text-sm font-bold text-foreground">
                  אותו ניסיון. אותה אחריות. אותה איכות.
                </p>
                <p className="text-primary font-bold text-sm">
                  בלי לשלם על פרוצדורה שהטכנולוגיה כבר עושה בשבילך.
                </p>
              </div>

              <button
                onClick={onNoWill}
                className="mt-4 w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-base font-bold text-primary-foreground shadow-lg transition-all duration-200 hover:scale-105"
              >
                <FileText className="w-5 h-5 ml-2" />
                התחילו עכשיו — בחינם
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
