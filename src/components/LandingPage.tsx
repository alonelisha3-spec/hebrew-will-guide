import { Shield, FileText, Clock, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import portraitImg from "@/assets/portrait-alon.png";

interface Props {
  onNoWill: () => void;
  onExistingWill: () => void;
  isFromFacebook?: boolean;
}

export function LandingPage({ onNoWill, onExistingWill }: Props) {
  return (
    <div className="min-h-screen">
      {/* HERO — clean & focused */}
      <section className="py-14 md:py-20 bg-accent text-accent-foreground relative overflow-hidden">
        <div className="container max-w-2xl text-center px-4 md:px-6 relative z-10">
          <p className="text-[10px] tracking-[0.25em] text-primary uppercase mb-4">
            משרד עורכי דין אלון אלישע
          </p>

          <h1 className="text-2xl md:text-4xl font-bold leading-tight text-white">
            צוואה דיגיטלית — הכינו נוסח צוואה
            <br />
            <span className="text-primary">תוך 2 דקות</span>
          </h1>

          <p className="mt-4 text-sm md:text-base text-accent-foreground/80 leading-relaxed max-w-lg mx-auto">
            ענו על כמה שאלות פשוטות וקבלו טיוטת צוואה דיגיטלית ראשונית — בחינם, ללא התחייבות.
          </p>

          {/* Trust badges */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-5 text-xs text-white/70">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              פחות מ-2 דקות
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-primary" />
              ללא התחייבות
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              לא צריך ידע משפטי
            </span>
          </div>

          {/* Main CTA */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              onClick={onNoWill}
              className="group relative inline-flex items-center justify-center rounded-xl bg-primary px-10 py-5 text-lg font-bold text-primary-foreground shadow-lg w-full sm:w-auto sm:min-w-[320px] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_hsl(38_50%_58%/0.4)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <FileText className="w-5 h-5 ml-2 relative z-10" />
              <span className="relative z-10">התחילו עכשיו</span>
            </button>

            <button
              onClick={onExistingWill}
              className="text-sm text-accent-foreground/60 hover:text-white transition-colors underline underline-offset-4"
            >
              יש לי כבר צוואה — רוצה לבדוק אותה
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — 3 simple steps */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container max-w-2xl px-4 md:px-6">
          <h2 className="text-lg md:text-xl font-bold text-center text-foreground mb-8">
            איך זה עובד?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {[
              { step: "1", title: "עונים על שאלון קצר", desc: "שאלות פשוטות על המצב המשפחתי והרכוש — בלי ידע משפטי" },
              { step: "2", title: "מקבלים טיוטת צוואה", desc: "המערכת מייצרת טיוטה ראשונית מותאמת לתשובות שלכם" },
              { step: "3", title: "משלימים עם עורך דין", desc: "עו\"ד אלון אלישע בודק, מתאים ולוקח אחריות" },
            ].map((item) => (
              <div key={item.step} className="bg-card rounded-xl border border-border p-5">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-lg flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHORT ABOUT + TESTIMONIALS */}
      <section className="py-8 md:py-10 bg-[#f9f7f3]">
        <div className="container max-w-2xl px-4 md:px-6">
          {/* About */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={portraitImg}
              alt="עו״ד אלון אלישע"
              loading="lazy"
              className="w-16 h-16 rounded-full object-cover object-top shadow-md border-2 border-primary/20 shrink-0"
            />
            <div>
              <p className="font-bold text-[#0d1b2e] text-sm">עו״ד אלון אלישע</p>
              <p className="text-xs text-[#555] leading-relaxed">
                מומחה לדיני ירושה וצוואות. ניסיון של שנים בליווי משפחות.
                הכלי הדיגיטלי חוסך את הפרוצדורה — אתם מקבלים את אותו שירות מקצועי, בפחות.
              </p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {[
              { name: "אוריאן ישראל", text: "אלון ליווה אותי בצורה מקצועית ואישית. הכל היה ברור, שקוף ומדויק." },
              { name: "אביב קריקון", text: "זמין, מקצועי, ועם תשומת לב לכל פרט. שירות ברמה גבוהה." },
              { name: "אלה בן דוד", text: "עורך דין שמדבר בגובה העיניים. הכל נעשה בצורה נוחה ומהירה." },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-lg p-3 border border-[#e8e0d0] text-right">
                <p className="text-[11px] text-[#555] leading-relaxed mb-1.5">"{t.text}"</p>
                <p className="text-[11px] font-bold text-[#c9a84c]">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-10 bg-accent text-center">
        <div className="container max-w-xl px-4">
          <h2 className="text-lg md:text-xl font-bold text-white mb-3">
            מוכנים להתחיל?
          </h2>
          <p className="text-sm text-accent-foreground/70 mb-6">
            השאלון לוקח פחות מ-2 דקות. אין צורך בידע משפטי.
          </p>
          <button
            onClick={onNoWill}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-10 py-4 text-base font-bold text-primary-foreground shadow-lg transition-all duration-200 hover:scale-105"
          >
            <FileText className="w-5 h-5 ml-2" />
            בואו נתחיל
          </button>

          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href="tel:054-9260698"
              className="flex items-center gap-1.5 text-xs text-accent-foreground/60 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              054-9260698
            </a>
            <a
              href={`https://wa.me/972549260698?text=${encodeURIComponent("שלום, אשמח לשמוע פרטים על הכנת צוואה.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#25D366] hover:text-[#25D366]/80 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              וואטסאפ
            </a>
          </div>

          <p className="mt-4 text-[10px] text-accent-foreground/40 max-w-md mx-auto leading-relaxed">
            הכלי מייצר טיוטה ראשונית בלבד ואינו מהווה ייעוץ משפטי.
            אין להסתמך על הטיוטה כמסמך תקף ללא ליווי עורך דין.
          </p>
        </div>
      </section>
    </div>
  );
}
