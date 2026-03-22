export type WillType = "אין צוואה" | "צוואה רגילה" | "צוואה הדדית";
export type RiskLevel = "נמוכה" | "בינונית" | "גבוהה" | "גבוהה מאוד";

export interface ResultData {
  willType: WillType;
  riskLevel: RiskLevel;
  headline: string;
  explanation?: string;
  riskItems: string[];
}

export function calculateResults(answers: Record<string, string>): ResultData {
  const willAnswer = answers.hasWill;

  if (willAnswer === "לא, אין לי צוואה") {
    return buildNoWillResult(answers);
  } else if (willAnswer === "כן, צוואה רגילה") {
    return buildRegularWillResult(answers);
  } else {
    return buildMutualWillResult(answers);
  }
}

function buildNoWillResult(answers: Record<string, string>): ResultData {
  const riskItems: string[] = ["אין הסדרה של אופן חלוקת הרכוש — החלוקה תיעשה לפי ברירת המחדל בחוק"];

  const isMarried = answers.familyStatus === "נשוי/אה" || answers.familyStatus === "ידוע/ה בציבור";
  if (isMarried) riskItems.push("לא קיימת הוראה ייעודית להגנה על בן/בת הזוג");
  if (answers.minorChildren === "כן") riskItems.push("אין הסדרה משפטית לעניין ילדים קטינים");
  if (answers.inheritanceConflict !== "לא") riskItems.push("אין מנגנון למניעת מחלוקות בין יורשים");
  if (answers.digitalAssets !== "לא") riskItems.push("נכסים דיגיטליים אינם מוסדרים");
  if (answers.estateManager === "כן") riskItems.push("לא מונה מנהל עיזבון");

  return {
    willType: "אין צוואה",
    riskLevel: "גבוהה מאוד",
    headline: "לא נמצאה צוואה בתוקף — רמת הסיכון מוערכת כגבוהה מאוד",
    explanation: "בהיעדר צוואה, חלוקת העיזבון נעשית על פי הוראות חוק הירושה בלבד — ללא כל התחשבות ברצון האישי של המצווה. מצב זה עלול להוביל לתוצאות שאינן תואמות את כוונותיכם.",
    riskItems,
  };
}

function buildRegularWillResult(answers: Record<string, string>): ResultData {
  const riskItems: string[] = [];
  const isMarried = answers.familyStatus === "נשוי/אה" || answers.familyStatus === "ידוע/ה בציבור";

  if (isMarried && answers.spouseProtection !== "לא")
    riskItems.push("ייתכן שהצוואה אינה מעניקה הגנה מספקת לבן/בת הזוג");
  if (answers.multipleChildren === "כן")
    riskItems.push("נדרש מנגנון חלוקה מפורש ומדויק בין מספר יורשים");
  if (answers.minorChildren === "כן")
    riskItems.push("נדרשת התייחסות פרטנית לעניין ילדים קטינים");
  if (answers.inheritanceConflict !== "לא")
    riskItems.push("קיים חשש למחלוקת בין יורשים — יש לשקול מנגנוני מניעה");
  if (answers.unequalDistribution === "כן")
    riskItems.push("חלוקה בלתי שוויונית מחייבת ניסוח קפדני ומבוסס");
  if (answers.digitalAssets !== "לא")
    riskItems.push("נדרשת הוראה מפורשת בעניין נכסים דיגיטליים");
  if (answers.estateManager === "כן")
    riskItems.push("מומלץ להסדיר מינוי וסמכויות מנהל עיזבון");
  if (answers.oldWill === "כן")
    riskItems.push("ייתכן שהצוואה אינה משקפת את המצב המשפחתי והנכסי העדכני");

  return {
    willType: "צוואה רגילה",
    riskLevel: getRiskLevel(riskItems.length),
    headline: "בדיקת צוואה רגילה — זוהו נקודות הדורשות בחינה",
    riskItems,
  };
}

function buildMutualWillResult(answers: Record<string, string>): ResultData {
  const riskItems: string[] = [];

  if (answers.spouseProtection !== "לא")
    riskItems.push("יש לוודא שהצוואה מגנה בפועל על בן/בת הזוג הנותר/ת");
  if (answers.multipleChildren === "כן")
    riskItems.push("נדרשת חלוקה מדויקת בין הילדים לאחר פטירת שני בני הזוג");
  if (answers.inheritanceConflict !== "לא")
    riskItems.push("קיים חשש למחלוקת — מומלץ לבחון מנגנוני הגנה והסדרה");
  if (answers.unequalDistribution === "כן")
    riskItems.push("חלוקה בלתי שוויונית בצוואה הדדית דורשת ניסוח מוקפד במיוחד");
  if (answers.digitalAssets !== "לא")
    riskItems.push("רצוי להסדיר באופן מפורש נכסים דיגיטליים במסגרת הצוואה");
  if (answers.estateManager === "כן")
    riskItems.push("מומלץ לשקול מינוי מנהל עיזבון ולהגדיר את סמכויותיו");
  if (answers.oldWill === "כן")
    riskItems.push("ייתכן שהצוואה אינה מותאמת עוד לנסיבות העדכניות");
  if (answers.realEstate === "כן")
    riskItems.push("יש לוודא שהוראות הצוואה מתייחסות כראוי לנכסי מקרקעין");

  return {
    willType: "צוואה הדדית",
    riskLevel: getRiskLevel(riskItems.length),
    headline: "בדיקת צוואה הדדית — זוהו נקודות מהותיות הדורשות בחינה",
    explanation: "צוואה הדדית מחייבת התייחסות מדויקת לרצון המשותף של בני הזוג, להגנה על בן הזוג הנותר, ולמגבלות הנוגעות לשינוי או ביטול בהתאם לחוק.",
    riskItems,
  };
}

function getRiskLevel(issueCount: number): RiskLevel {
  if (issueCount <= 1) return "נמוכה";
  if (issueCount <= 3) return "בינונית";
  if (issueCount <= 5) return "גבוהה";
  return "גבוהה מאוד";
}
