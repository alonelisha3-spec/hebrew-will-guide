import { useState, useEffect } from "react";
import { Shield, FileText, Scale, CheckCircle2, Users, Clock, TrendingUp } from "lucide-react";
import { FAQSection } from "./FAQSection";
import portraitImg from "@/assets/portrait-alon.png";

interface Props {
  onNoWill: () => void;
  onExistingWill: () => void;
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

export function LandingPage({ onNoWill, onExistingWill }: Props) {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-32 bg-accent text-accent-foreground relative overflow-hidden">
        <div className="container max-w-4xl text-center px-4 md:px-6 relative z-10">
          <p className="text-xs tracking-[0.25em] text-primary uppercase mb-4">
            משרד עורכי דין אלון אלישע
          </p>
          <h1
            className="text-3xl md:text-5xl font-bold leading-tight text-white"
            style={{ lineHeight: 1.25 }}
          >
            רוצים להסדיר צוואה?
            <br />
            התחילו עכשיו וקבלו נוסח צוואה מוכן בהתאמה אישית
          </h1>
          <p className="mt-6 text-base md:text-lg text-accent-foreground/85 leading-relaxed max-w-2xl mx-auto">
            ענו על מספר שאלות פשוטות וקבלו נוסח צוואה מלא, ברור ומותאם למצב
            האישי שלכם — כולל זיהוי חוסרים ונושאים שחשוב להסדיר.
          </p>

          {/* Social proof bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm">
            <div className="flex items-center gap-2 text-white/90">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-bold"><AnimatedCounter target={850} /></span>
              <span className="text-accent-foreground/70">כבר הכינו נוסח</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="font-bold">98%</span>
              <span className="text-accent-foreground/70">שביעות רצון</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-bold">פחות מ-2 דקות</span>
              <span className="text-accent-foreground/70">למילוי</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm max-w-3xl mx-auto">
            <div className="rounded-lg bg-white/10 border border-white/10 px-4 py-3">
              <p className="font-semibold text-white">נוסח צוואה מוכן תוך דקות</p>
              <p className="text-accent-foreground/70 mt-1">מבוסס על הנתונים שלך</p>
            </div>
            <div className="rounded-lg bg-white/10 border border-white/10 px-4 py-3">
              <p className="font-semibold text-white">התאמה למצב משפחתי ונכסים</p>
              <p className="text-accent-foreground/70 mt-1">
                זיהוי נושאים שמצריכים הסדרה
              </p>
            </div>
            <div className="rounded-lg bg-white/10 border border-white/10 px-4 py-3">
              <p className="font-semibold text-white">אפשרות להמשך טיפול אישי במשרד</p>
              <p className="text-accent-foreground/70 mt-1">
                בדיקה משפטית והשלמה סופית
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <button
              onClick={onNoWill}
              className="group relative inline-flex items-center justify-center rounded-md bg-primary px-12 py-5 text-lg font-bold text-primary-foreground shadow-lg w-full sm:w-auto sm:min-w-[320px] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(38_50%_58%/0.4)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <FileText className="w-5 h-5 ml-2 relative z-10" />
              <span className="relative z-10">אני רוצה להכין צוואה</span>
            </button>
            <button
              onClick={onExistingWill}
              className="inline-flex items-center justify-center text-sm text-accent-foreground/60 hover:text-accent-foreground transition-colors underline underline-offset-4"
            >
              יש לי כבר צוואה ואני רוצה לבדוק אותה
            </button>
          </div>

          {/* Urgency nudge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/15 border border-primary/25 px-4 py-2 text-xs text-primary animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            12 אנשים מילאו את השאלון היום
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 text-sm text-accent-foreground/70">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary/80" />
              ללא התחייבות
            </span>
            <span className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-primary/80" />
              תהליך ראשוני בלבד
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary/80" />
              ניתן להשלים בהמשך פרטים חסרים
            </span>
          </div>

          <div className="mt-10 max-w-2xl mx-auto rounded-lg border border-white/15 bg-white/5 px-5 py-4 text-xs text-accent-foreground/60 leading-relaxed text-center">
            <p>
              השימוש במערכת אינו מהווה ייעוץ משפטי, אינו יוצר יחסי עורך דין–לקוח, ואינו מפיק צוואה תקפה לחתימה. המערכת מספקת נוסח ראשוני וכללי בלבד, המבוסס על תשובות המשתמש, ללא בדיקה או אימות נסיבות אישיות. כל הסתמכות על התוצאה נעשית באחריות המשתמש בלבד. המשרד לא יישא באחריות לכל נזק הנובע מהשימוש במערכת או מהסתמכות על תוצריה.
            </p>
          </div>
        </div>
      </section>

      <FAQSection />

      <section className="py-20 md:py-28 bg-background">
        <div className="container max-w-3xl px-4 md:px-6 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <img
            src={portraitImg}
            alt="עו״ד אלון אלישע"
            className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover object-top shadow-lg border-4 border-accent/20 flex-shrink-0"
          />
          <div className="text-center md:text-right">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              אל תשאירו את הדברים החשובים לאי-ודאות
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              התחילו עכשיו, ענו על מספר שאלות, וקבלו נוסח צוואה ראשוני ומסודר
              בהתם לנתונים שלכם.
            </p>
            <button
              onClick={onNoWill}
              className="mt-8 inline-flex items-center justify-center rounded-md bg-accent px-10 py-4 text-base font-semibold text-accent-foreground shadow-lg transition-all duration-200 hover:brightness-110 hover:scale-105"
            >
              התחל עכשיו
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}