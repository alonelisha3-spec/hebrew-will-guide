import { useState, useEffect } from "react";
import { Shield, FileText, Scale, CheckCircle2, Users, Clock, TrendingUp, Phone, Mail } from "lucide-react";
import { FAQSection } from "./FAQSection";
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
    ? "ראיתם את הפוסט? עכשיו תבדקו בעצמכם"
    : "הכינו בסיס לצוואה — בכמה דקות";
  const subHeadline = isFromFacebook
    ? "ענו על מספר שאלות וקבלו טיוטה מסודרת של הרצונות שלכם — כולל זיהוי נושאים שכדאי להסדיר."
    : "ענו על מספר שאלות וקבלו טיוטה מסודרת של הרצונות שלכם — כולל זיהוי נושאים שכדאי להסדיר.";
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
            ענו על מספר שאלות וקבלו טיוטה מסודרת שתעזור לכם לארגן
            את הרצונות — כולל זיהוי נושאים שכדאי להסדיר.
          </p>

          {/* Social proof bar */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 md:gap-12 text-base">
            <div className="flex items-center gap-2 text-white/90">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg"><AnimatedCounter target={850} /></span>
              <span className="text-accent-foreground/70">כבר יצרו בסיס</span>
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

          <div className="mt-12 flex flex-col items-center justify-center gap-5">
            <button
              onClick={onNoWill}
              className="group relative inline-flex items-center justify-center rounded-md bg-primary px-16 py-7 text-2xl font-bold text-primary-foreground shadow-xl w-full sm:w-auto sm:min-w-[400px] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(38_50%_58%/0.4)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <FileText className="w-7 h-7 ml-3 relative z-10" />
              <span className="relative z-10">אני רוצה להכין בסיס לצוואה</span>
            </button>
            <button
              onClick={onExistingWill}
              className="inline-flex items-center justify-center text-base text-accent-foreground/60 hover:text-accent-foreground transition-colors underline underline-offset-4"
            >
              יש לי כבר צוואה ואני רוצה לבדוק אותה
            </button>
            <p className="text-sm text-accent-foreground/60 mt-1">ללא עלות וללא התחייבות</p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-base max-w-3xl mx-auto">
            <div className="rounded-lg bg-white/10 border border-white/10 px-5 py-4">
              <p className="font-semibold text-white text-lg">טיוטה מסודרת תוך דקות</p>
              <p className="text-accent-foreground/70 mt-1">בסיס מבוסס על הנתונים שלכם</p>
            </div>
            <div className="rounded-lg bg-white/10 border border-white/10 px-5 py-4">
              <p className="font-semibold text-white text-lg">זיהוי נושאים להסדרה</p>
              <p className="text-accent-foreground/70 mt-1">
                מצב משפחתי, נכסים וחוסרים
              </p>
            </div>
            <div className="rounded-lg bg-white/10 border border-white/10 px-5 py-4">
              <p className="font-semibold text-white text-lg">המשך עם עורך דין</p>
              <p className="text-accent-foreground/70 mt-1">
                בדיקה משפטית והשלמה לצוואה תקפה
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

      <FAQSection />

      <section className="py-24 md:py-32 bg-background">
        <div className="container max-w-3xl px-4 md:px-6 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <img
            src={portraitImg}
            alt="עו״ד אלון אלישע"
            loading="lazy"
            className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover object-top shadow-lg border-4 border-accent/20 flex-shrink-0"
          />
          <div className="text-center md:text-right">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              אל תשאירו את הדברים החשובים לאי-ודאות
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-base md:text-lg">
              התחילו עכשיו, ענו על מספר שאלות, וקבלו טיוטה מסודרת —
              בסיס מותאם לרצונות שלכם.
            </p>
            <button
              onClick={onNoWill}
              className="mt-8 inline-flex items-center justify-center rounded-md bg-accent px-12 py-5 text-lg font-semibold text-accent-foreground shadow-lg transition-all duration-200 hover:brightness-110 hover:scale-105"
            >
              התחל עכשיו
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
