import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function TermsOfUse() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="container max-w-3xl mx-auto" dir="rtl">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">תנאי שימוש</h1>
          <p className="text-xs text-muted-foreground mb-8">עודכן לאחרונה: מרץ 2026</p>

          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-foreground mb-3">1. כללי</h2>
              <p>
                אתר זה ("המערכת") מופעל על ידי משרד עורכי דין אלון אלישע ("המשרד"). השימוש במערכת מהווה הסכמה מלאה ובלתי מסויגת לתנאי שימוש אלה. אם אינך מסכים/ה לתנאים — אל תשתמש/י במערכת.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">2. מהות השירות</h2>
              <p>
                המערכת מציעה כלי עזר ראשוני להפקת נוסח צוואה בהתאמה אישית או לבדיקה ראשונית של צוואה קיימת, על בסיס תשובות המשתמש. התוצאות המופקות הן כלליות, ראשוניות ואוטומטיות בלבד.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">3. אי-תחולת ייעוץ משפטי</h2>
              <p>
                השימוש במערכת <strong className="text-foreground">אינו מהווה ייעוץ משפטי</strong>, אינו יוצר יחסי עורך דין–לקוח, ואינו מחליף פגישת ייעוץ אישית עם עורך דין. נוסח הצוואה, התוצאות והניתוחים המוצגים אינם מהווים צוואה תקפה לפי חוק הירושה, התשכ"ה-1965, ואין להסתמך עליהם ככאלה.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">4. הגבלת אחריות</h2>
              <ul className="list-disc mr-5 space-y-2">
                <li>המשרד אינו אחראי לנזק כלשהו — ישיר, עקיף, תוצאתי או מיוחד — הנובע מהשימוש במערכת, מהסתמכות על תוצאותיה, או מאי-שימוש בייעוץ משפטי פרטני.</li>
                <li>המשרד אינו אחראי לדיוק, שלמות או עדכניות המידע המופק, ואינו מתחייב שהטיוטה או התוצאה תשקפנה את רצון המשתמש או תעמודנה בדרישות הדין.</li>
                <li>האחריות למסירת מידע מלא, נכון ומעודכן חלה על המשתמש בלבד.</li>
                <li>המשתמש מצהיר כי ידוע לו שצוואה שנחתמה ללא ליווי משפטי עלולה להיפסל או להוביל לתוצאות שאינן תואמות את כוונתו.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">5. שיפוי</h2>
              <p>
                המשתמש מתחייב לשפות את המשרד, עובדיו ונציגיו בגין כל תביעה, דרישה, נזק, הפסד, הוצאה או חבות (לרבות שכר טרחת עורך דין) הנובעים משימוש במערכת, מהסתמכות על תוצאותיה, או מהפרת תנאי שימוש אלה.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">6. קניין רוחני</h2>
              <p>
                כל התכנים, העיצוב, הקוד, הלוגיקה, הטקסטים והמבנה של המערכת הם קניינו הבלעדי של המשרד. אין להעתיק, לשכפל, להפיץ או לעשות שימוש מסחרי בתכנים ללא אישור מראש ובכתב.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">7. שימוש מותר</h2>
              <p>
                השימוש במערכת מיועד לאנשים פרטיים בלבד, לצרכים אישיים ולא מסחריים. אין להשתמש במערכת לצורך מתן שירותים משפטיים לצדדים שלישיים, לרבות ייעוץ, תיווך או הפקת מסמכים עבור אחרים.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">8. זמינות המערכת</h2>
              <p>
                המשרד אינו מתחייב לזמינות רציפה של המערכת, ושומר לעצמו את הזכות לשנות, להשעות או להפסיק את השירות בכל עת וללא הודעה מוקדמת.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">9. דין חל וסמכות שיפוט</h2>
              <p>
                על תנאי שימוש אלה יחולו דיני מדינת ישראל. סמכות השיפוט הבלעדית תהיה נתונה לבתי המשפט המוסמכים בתל אביב-יפו.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">10. שינויים בתנאים</h2>
              <p>
                המשרד שומר לעצמו את הזכות לעדכן תנאים אלה מעת לעת. המשך השימוש במערכת לאחר עדכון התנאים מהווה הסכמה לתנאים המעודכנים.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-foreground mb-3">11. יצירת קשר</h2>
              <p>
                לשאלות בנוגע לתנאי השימוש ניתן לפנות למשרד בטלפון{" "}
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
