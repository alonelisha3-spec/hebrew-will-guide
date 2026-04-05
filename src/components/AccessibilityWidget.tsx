import { useState } from "react";

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [linkHighlight, setLinkHighlight] = useState(false);
  const [grayscale, setGrayscale] = useState(false);

  const togglePanel = () => setIsOpen((prev) => !prev);

  const changeFontSize = (delta: number) => {
    const next = Math.min(150, Math.max(80, fontSize + delta));
    setFontSize(next);
    document.documentElement.style.fontSize = `${next}%`;
  };

  const toggleHighContrast = () => {
    setHighContrast((prev) => {
      document.documentElement.classList.toggle("accessibility-high-contrast", !prev);
      return !prev;
    });
  };

  const toggleLinkHighlight = () => {
    setLinkHighlight((prev) => {
      document.documentElement.classList.toggle("accessibility-link-highlight", !prev);
      return !prev;
    });
  };

  const toggleGrayscale = () => {
    setGrayscale((prev) => {
      document.documentElement.classList.toggle("accessibility-grayscale", !prev);
      return !prev;
    });
  };

  const resetAll = () => {
    setFontSize(100);
    setHighContrast(false);
    setLinkHighlight(false);
    setGrayscale(false);
    document.documentElement.style.fontSize = "100%";
    document.documentElement.classList.remove(
      "accessibility-high-contrast",
      "accessibility-link-highlight",
      "accessibility-grayscale"
    );
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={togglePanel}
        aria-label="הצהרת נגישות"
        className="fixed bottom-6 left-24 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden="true">
          <path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-1 7h2a1 1 0 0 1 1 1v1.5l2.5 5a1 1 0 1 1-1.8.9L13 13.5V20a1 1 0 1 1-2 0v-3h-1v3a1 1 0 1 1-2 0v-6.6l-1.7 3.9a1 1 0 1 1-1.8-.9l2.5-5V10a1 1 0 0 1 1-1z" />
        </svg>
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 left-6 z-50 w-72 rounded-xl bg-card border border-border shadow-2xl p-5 animate-in slide-in-from-bottom-4 duration-200"
          dir="rtl"
          role="dialog"
          aria-label="תפריט נגישות"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-card-foreground">נגישות</h3>
            <button
              onClick={togglePanel}
              aria-label="סגור תפריט נגישות"
              className="text-muted-foreground hover:text-card-foreground text-lg leading-none"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3">
            {/* Font size */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-card-foreground">גודל טקסט</span>
              <div className="flex gap-2">
                <button
                  onClick={() => changeFontSize(-10)}
                  className="w-8 h-8 rounded-md bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground text-sm font-bold transition-colors"
                  aria-label="הקטן טקסט"
                >
                  א-
                </button>
                <button
                  onClick={() => changeFontSize(10)}
                  className="w-8 h-8 rounded-md bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground text-sm font-bold transition-colors"
                  aria-label="הגדל טקסט"
                >
                  א+
                </button>
              </div>
            </div>

            {/* High contrast */}
            <button
              onClick={toggleHighContrast}
              className={`w-full text-right text-sm px-3 py-2 rounded-md transition-colors ${
                highContrast
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              ניגודיות גבוהה
            </button>

            {/* Link highlight */}
            <button
              onClick={toggleLinkHighlight}
              className={`w-full text-right text-sm px-3 py-2 rounded-md transition-colors ${
                linkHighlight
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              הדגשת קישורים
            </button>

            {/* Grayscale */}
            <button
              onClick={toggleGrayscale}
              className={`w-full text-right text-sm px-3 py-2 rounded-md transition-colors ${
                grayscale
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              גווני אפור
            </button>

            {/* Reset */}
            <button
              onClick={resetAll}
              className="w-full text-center text-xs text-muted-foreground underline hover:text-card-foreground mt-2"
            >
              איפוס הגדרות
            </button>
          </div>
        </div>
      )}
    </>
  );
}
