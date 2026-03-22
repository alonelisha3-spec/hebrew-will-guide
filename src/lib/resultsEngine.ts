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
  const riskItems: string[] = ["אין שליטה על אופן חלוקת הרכוש"];

  const isMarried = answers.familyStatus === "נשוי/אה" || answers.familyStatus === "ידוע/ה בציבור";
  if (isMarried) riskItems.push("אין התייחסות ייעודית לבן/בת הזוג");
  if (answers.minorChildren === "כן") riskItems.push("אין הסדרה לילדים קטינים");
  if (answers.inheritanceConflict !== "לא") riskItems.push("אין טיפול בסיכון למחלוקות בין יורשים");
  if (answers.digitalAssets !== "לא") riskItems.push("אין התייחסות לנכסים דיגיטליים");
  if (answers.estateManager === "כן") riskItems.push("אין מינוי מנהל עיזבון");

  return {
    willType: "אין צוואה",
    riskLevel: "גבוהה מאוד",
    headline: "אין לך צוואה – רמת הסיכון גבוהה מאוד",
    explanation: "בהיעדר צוואה, חלוקת הרכוש נעשית לפי ברירת המחדל הקבועה בחוק, ולא בהכרח לפי רצונך.",
    riskItems,
  };
}

function buildRegularWillResult(answers: Record<string, string>): ResultData {
  const riskItems: string[] = [];
  const isMarried = answers.familyStatus === "נשוי/אה" || answers.familyStatus === "ידוע/ה בציבור";

  if (isMarried && answers.spouseProtection !== "לא")
    riskItems.push("ייתכן שאין הגנה מספקת על בן/בת הזוג");
  if (answers.multipleChildren === "כן")
    riskItems.push("נדרש מנגנון חלוקה ברור בין מספר יורשים");
  if (answers.minorChildren === "כן")
    riskItems.push("נדרשת התייחסות מדויקת לילדים קטינים");
  if (answers.inheritanceConflict !== "לא")
    riskItems.push("קיים סיכון למחלוקת בין יורשים");
  if (answers.unequalDistribution === "כן")
    riskItems.push("חלוקה לא שוויונית מחייבת ניסוח מדויק במיוחד");
  if (answers.digitalAssets !== "לא")
    riskItems.push("נדרש טיפול מפורש בנכסים דיגיטליים");
  if (answers.estateManager === "כן")
    riskItems.push("מומלץ להסדיר מינוי וסמכויות של מנהל עיזבון");
  if (answers.oldWill === "כן")
    riskItems.push("ייתכן שהצוואה אינה מעודכנת למצב המשפחתי והנכסי כיום");

  return {
    willType: "צוואה רגילה",
    riskLevel: getRiskLevel(riskItems.length),
    headline: "בדיקת צוואה רגילה – נמצאו נקודות לבדיקה",
    riskItems,
  };
}

function buildMutualWillResult(answers: Record<string, string>): ResultData {
  const riskItems: string[] = [];

  if (answers.spouseProtection !== "לא")
    riskItems.push("יש לוודא שהצוואה מגנה בפועל על בן/בת הזוג הנותר/ת");
  if (answers.multipleChildren === "כן")
    riskItems.push("נדרשת חלוקה ברורה ומדויקת בין הילדים לאחר פטירת שני בני הזוג");
  if (answers.inheritanceConflict !== "לא")
    riskItems.push("קיים סיכון למחלוקת בין יורשים ויש לשקול מנגנוני הגנה");
  if (answers.unequalDistribution === "כן")
    riskItems.push("חלוקה לא שוויונית בצוואה הדדית דורשת ניסוח מוקפד במיוחד");
  if (answers.digitalAssets !== "לא")
    riskItems.push("רצוי להסדיר במפורש נכסים דיגיטליים");
  if (answers.estateManager === "כן")
    riskItems.push("מומלץ לשקול מינוי מנהל עיזבון והגדרת סמכויותיו");
  if (answers.oldWill === "כן")
    riskItems.push("ייתכן שהצוואה אינה מותאמת עוד למצב העדכני");
  if (answers.realEstate === "כן")
    riskItems.push("יש לוודא שהוראות הצוואה מתייחסות באופן נכון לנכסי מקרקעין");

  return {
    willType: "צוואה הדדית",
    riskLevel: getRiskLevel(riskItems.length),
    headline: "בדיקת צוואה הדדית – נמצאו נקודות מהותיות לבדיקה",
    explanation: "צוואה הדדית מחייבת התייחסות מדויקת לרצון המשותף של בני הזוג, להגנה על בן הזוג הנותר ולמגבלות שינוי וביטול.",
    riskItems,
  };
}

function getRiskLevel(issueCount: number): RiskLevel {
  if (issueCount <= 1) return "נמוכה";
  if (issueCount <= 3) return "בינונית";
  if (issueCount <= 5) return "גבוהה";
  return "גבוהה מאוד";
}
