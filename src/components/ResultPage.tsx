import { ResultData } from "@/lib/resultsEngine";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

interface Props {
  result: ResultData;
  onContactRequest: () => void;
}

const riskConfig = {
  "נמוכה": { color: "text-risk-low", bg: "bg-risk-low/10", icon: CheckCircle },
  "בינונית": { color: "text-risk-medium", bg: "bg-risk-medium/10", icon: Info },
  "גבוהה": { color: "text-risk-high", bg: "bg-risk-high/10", icon: AlertTriangle },
  "גבוהה מאוד": { color: "text-risk-critical", bg: "bg-risk-critical/10", icon: XCircle },
};

export function ResultPage({ result, onContactRequest }: Props) {
  const config = riskConfig[result.riskLevel];
  const RiskIcon = config.icon;

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-2xl space-y-8">
        {/* Main result card */}
        <div className="bg-card rounded-xl border shadow-lg p-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2.5 rounded-lg ${config.bg}`}>
              <RiskIcon className={`w-6 h-6 ${config.color}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">סוג הבדיקה</p>
              <p className="font-semibold">{result.willType}</p>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-4" style={{ lineHeight: 1.4 }}>
            {result.headline}
          </h1>

          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${config.bg} ${config.color}`}>
            רמת סיכון: {result.riskLevel}
          </div>

          {result.explanation && (
            <p className="mt-6 text-muted-foreground leading-relaxed">
              {result.explanation}
            </p>
          )}
        </div>

        {/* Risk items */}
        {result.riskItems.length > 0 && (
          <div
            className="bg-card rounded-xl border shadow-sm p-8 animate-slide-up"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <h2 className="text-lg font-bold mb-5">
              הנושאים המרכזיים שעלו בבדיקה
            </h2>
            <ul className="space-y-3">
              {result.riskItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed animate-slide-right"
                  style={{
                    animationDelay: `${200 + i * 60}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  <span className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${config.color.replace("text-", "bg-")}`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Practical meaning */}
        <div
          className="bg-card rounded-xl border shadow-sm p-8 animate-slide-up"
          style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
        >
          <h2 className="text-lg font-bold mb-3">המשמעות המעשית</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            צוואה שאינה מותאמת למצב המשפחתי, לנכסים ולסיכונים הקיימים עלולה ליצור
            מחלוקות, לעכב את מימוש העיזבון, או להביא לתוצאה שאינה תואמת את רצון
            המצווה.
          </p>
        </div>

        {/* CTA */}
        <div
          className="bg-secondary/60 rounded-xl border p-8 text-center animate-slide-up"
          style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
        >
          <h2 className="text-xl font-bold mb-3">
            מעוניינים בבדיקה משפטית מסודרת?
          </h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            ניתן להשאיר פרטים ולקבל חזרה טלפונית לצורך בדיקה והתאמה של צוואה
            רגילה או הדדית.
          </p>
          <button
            onClick={onContactRequest}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition-all duration-200 hover:shadow-xl hover:shadow-primary/15 active:scale-[0.97]"
          >
            אני רוצה שיחזרו אליי
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center max-w-xl mx-auto leading-relaxed pb-8">
          המידע במערכת זו הוא כללי וראשוני בלבד, אינו מהווה ייעוץ משפטי, אינו
          מחליף פגישה עם עורך דין, ואינו יוצר צוואה תקפה לפי חוק.
        </p>
      </div>
    </div>
  );
}
