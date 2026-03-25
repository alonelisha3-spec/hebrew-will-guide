import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="container max-w-3xl mx-auto" dir="rtl">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">מדיניות פרטיות</h1>
          <p className="text-xs text-muted-foreground mb-8">עודכן לאחרונה: מרץ 2026</p>

          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-foreground mb-3">1. כללי</h2>
              <p>
                מדיניות פרטיות זו מתארת כיצד משרד עורכי דין אלון אלישע ("המשרד") אוסף, משתמש ומגן על מידע אישי שנמסר על ידי משתמשי המערכת. המשרד מכבד את פרטיות המשתמשים ופועל בהתאם להוראות חוק הגנת הפרטיות, התשמ"א-1981 והתקנות שמכוחו.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">2. מידע שנאסף</h2>
              <p className="mb-2">המערכת עשויה לאסוף את סוגי המידע הבאים:</p>
              <ul className="list-disc mr-5 space-y-2">
                <li><strong className="text-foreground">פרטים מזהים:</strong> שם מלא, מספר טלפון, כתובת דוא״ל.</li>
                <li><strong className="text-foreground">תשובות לשאלון:</strong> מידע בנוגע למצב משפחתי, נכסים, יורשים ונסיבות אישיות שנמסרו במסגרת השאלון.</li>
                <li><strong className="text-foreground">מידע רגיש (לבחירת המשתמש):</strong> מספר תעודת זהות, כתובת מגורים, שמות בני משפחה — ככל שהמשתמש בחר להזינם.</li>
                <li><strong className="text-foreground">מידע טכני:</strong> כתובת IP, סוג דפדפן, מערכת הפעלה — לצורכי אבטחה ושיפור חוויית המשתמש.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">3. מטרות השימוש במידע</h2>
              <ul className="list-disc mr-5 space-y-2">
                <li>הפקת טיוטת צוואה ראשונית או בדיקת צוואה קיימת על בסיס התשובות.</li>
                <li>יצירת קשר עם המשתמש בהתאם לבקשתו (חזרה טלפונית, שליחת תוצאות בדוא״ל).</li>
                <li>שמירת מידע תפעולי לצורך מעקב פנימי וטיפול בפנייה.</li>
                <li>שיפור המערכת, ניתוח שימוש ואבטחת מידע.</li>
                <li>שליחת עדכונים, תוכן מקצועי והצעות שירות — רק אם המשתמש הסכים לכך במפורש.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">4. שיתוף מידע עם צדדים שלישיים</h2>
              <p className="mb-2">המשרד לא ימכור או ישכיר מידע אישי של משתמשים. מידע עשוי להיות משותף במקרים הבאים בלבד:</p>
              <ul className="list-disc mr-5 space-y-2">
                <li>ספקי שירות טכניים המסייעים בתפעול המערכת (אחסון, דוא״ל), תחת התחייבות לסודיות.</li>
                <li>דרישה חוקית — צו בית משפט, דרישת רשות מוסמכת או הליך משפטי.</li>
                <li>הגנה על זכויות המשרד במקרה של מחלוקת משפטית.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">5. אבטחת מידע</h2>
              <p>
                המשרד נוקט אמצעים סבירים לאבטחת המידע, לרבות הצפנת תקשורת (SSL), שמירה בשרתים מאובטחים ומגבלות גישה. עם זאת, אין אפשרות להבטיח אבטחה מוחלטת, והמשתמש מכיר ומסכים לסיכון שנותר.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">6. שמירת מידע</h2>
              <p>
                המידע יישמר כל עוד הדבר נדרש למטרות שלשמן נאסף, או כנדרש על פי דין. מידע שאינו נדרש עוד יימחק או יטושטש בתוך פרק זמן סביר.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">7. זכויות המשתמש</h2>
              <p className="mb-2">בהתאם לחוק הגנת הפרטיות, למשתמש הזכות:</p>
              <ul className="list-disc mr-5 space-y-2">
                <li>לעיין במידע האישי המוחזק אודותיו.</li>
                <li>לבקש תיקון או מחיקה של מידע שגוי או מיותר.</li>
                <li>להתנגד לשימוש במידע לצורכי דיוור ישיר.</li>
              </ul>
              <p className="mt-2">
                לכל בקשה ניתן לפנות בדוא״ל{" "}
                <a href="mailto:alonelisha3@gmail.com" className="text-primary hover:underline">alonelisha3@gmail.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">8. עוגיות (Cookies)</h2>
              <p>
                המערכת עשויה להשתמש בעוגיות לצורכי תפעול ושיפור חוויית המשתמש. המשתמש רשאי לנהל את הגדרות העוגיות דרך הדפדפן שלו.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">9. שינויים במדיניות</h2>
              <p>
                המשרד שומר לעצמו את הזכות לעדכן מדיניות זו מעת לעת. המשך השימוש במערכת לאחר עדכון מהווה הסכמה למדיניות המעודכנת.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">10. יצירת קשר</h2>
              <p>
                לשאלות בנוגע למדיניות הפרטיות ניתן לפנות למשרד בטלפון{" "}
                <a href="tel:054-9260698" className="text-primary hover:underline" dir="ltr">054-9260698</a>{" "}
                או בדוא״ל{" "}
                <a href="mailto:alonelisha3@gmail.com" className="text-primary hover:underline">alonelisha3@gmail.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
