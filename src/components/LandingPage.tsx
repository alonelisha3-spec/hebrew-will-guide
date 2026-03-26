import { Shield, FileText, Scale, CheckCircle2 } from "lucide-react";
import { FAQSection } from "./FAQSection";
import portraitImg from "@/assets/portrait-alon.png";

interface Props {
  onNoWill: () => void;
  onExistingWill: () => void;
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
            התחילו עכשיו וקבלו טיוטת צוואה ראשונית
          </h1>
          <p className="mt-6 text-base md:text-lg text-accent-foreground/85 leading-relaxed max-w-2xl mx-auto">
            ענו על מספר שאלות וקבלו תוצאה ראשונית ברורה, כולל טיוטת צוואה,
            זיהוי חוסרים ונקודות שמומלץ להסדיר לפני חתימה.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm max-w-3xl mx-auto">
            <div className="rounded-lg bg-white/10 border border-white/10 px-4 py-3">
              <p className="font-semibold text-white">טיוטת צוואה ראשונית</p>
              <p className="text-accent-foreground/70 mt-1">תוך דקות ספורות</p>
            </div>
            <div className="rounded-lg bg-white/10 border border-white/10 px-4 py-3">
              <p className="font-semibold text-white">איתור חוסרים</p>
              <p className="text-accent-foreground/70 mt-1">
                בנושאים שעלולים ליצור בעיה בעתיד
              </p>
            </div>
            <div className="rounded-lg bg-white/10 border border-white/10 px-4 py-3">
              <p className="font-semibold text-white">המשך טיפול אישי</p>
              <p className="text-accent-foreground/70 mt-1">
                אם תרצו להפוך את הטיוטה למסמך מסודר
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onNoWill}
              className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-base font-semibold text-primary-foreground shadow-lg hover:brightness-110 w-full sm:w-auto"
            >
              <FileText className="w-4 h-4 ml-2" />
              אני רוצה לקבל טיוטת צוואה
            </button>
            <button
              onClick={onExistingWill}
              className="inline-flex items-center justify-center rounded-md bg-white/10 border border-white/20 px-10 py-4 text-base font-semibold text-accent-foreground hover:bg-white/20 w-full sm:w-auto"
            >
              <Shield className="w-4 h-4 ml-2" />
              אני רוצה לבדוק צוואה קיימת
            </button>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 text-sm text-accent-foreground/70">
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
              לפני שחותמים, עדיף להבין מה חסר
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              התחילו עכשיו, קבלו טיוטה ראשונית ותמונה ברורה יותר של מה נכון להסדיר.
            </p>
            <button
              onClick={onNoWill}
              className="mt-8 inline-flex items-center justify-center rounded-md bg-accent px-10 py-4 text-base font-semibold text-accent-foreground shadow-lg hover:brightness-110"
            >
              אני רוצה להתחיל
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
