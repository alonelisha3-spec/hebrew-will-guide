import { useState, useEffect } from "react";
import { X, FileText } from "lucide-react";

interface Props {
  onStart: () => void;
}

const EXIT_SHOWN_KEY = "exit_popup_shown";

export function ExitIntentPopup({ onStart }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(EXIT_SHOWN_KEY)) return;

    const handler = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        setShow(true);
        sessionStorage.setItem(EXIT_SHOWN_KEY, "1");
        document.removeEventListener("mouseleave", handler);
      }
    };

    // Also handle mobile: if user switches tabs / goes back
    const visHandler = () => {
      if (document.hidden && !sessionStorage.getItem(EXIT_SHOWN_KEY)) {
        setShow(true);
        sessionStorage.setItem(EXIT_SHOWN_KEY, "1");
      }
    };

    // Delay adding listener to avoid immediate triggers
    const timeout = setTimeout(() => {
      document.addEventListener("mouseleave", handler);
      document.addEventListener("visibilitychange", visHandler);
    }, 10000); // Wait 10 seconds before enabling

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseleave", handler);
      document.removeEventListener("visibilitychange", visHandler);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-in fade-in duration-300 p-4">
      <div className="relative bg-card border border-border rounded-xl shadow-2xl max-w-md w-full p-6 md:p-8 animate-in zoom-in-95 duration-300">
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 left-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="סגור"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-7 h-7 text-primary" />
          </div>

          <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
            לפני שעוזבים — בדיקה תוך 2 דקות
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            ענו על מספר שאלות פשוטות וקבלו נוסח צוואה ראשוני בהתאמה אישית —
            ללא התחייבות וללא עלות.
          </p>

          <button
            onClick={() => {
              setShow(false);
              onStart();
            }}
            className="w-full rounded-lg bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
          >
            אני רוצה לבדוק
          </button>

          <button
            onClick={() => setShow(false)}
            className="mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            לא עכשיו
          </button>
        </div>
      </div>
    </div>
  );
}
