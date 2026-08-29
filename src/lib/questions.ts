export interface Question {
  id: string;
  text: string;
  options?: string[];
  type: "select" | "text";
  placeholder?: string;
  explanation?: string;
  optional?: boolean;
  condition?: (answers: Record<string, string>) => boolean;
}

export const noWillQuestions: Question[] = [
  {
    id: "fullName",
    text: "מה השם המלא שלך?",
    type: "text",
    placeholder: "שם פרטי ושם משפחה",
    explanation: "השם ישמש בנוסח הצוואה הראשוני בלבד.",
  },
  {
    id: "familyStructure",
    text: "מה המצב המשפחתי שלך?",
    type: "select",
    options: [
      "יש לי בן/בת זוג וילדים משותפים",
      "יש לי בן/בת זוג וילדים מקשר קודם",
      "אין לי בן/בת זוג, אבל יש לי ילדים",
      "יש לי בן/בת זוג, אין ילדים",
      "אין לי בן/בת זוג ואין ילדים",
      "מצב אחר",
    ],
    explanation: "זה עוזר לנו להתאים את המבנה הבסיסי של הצוואה.",
  },
  {
    id: "spouseName",
    text: "מה שם בן/בת הזוג שלך?",
    type: "text",
    placeholder: "שם פרטי ושם משפחה",
    explanation: "השם ישמש בצוואה לציון היורש/ת.",
    condition: (a) => !!a.familyStructure && a.familyStructure.includes("בן/בת זוג") && !a.familyStructure.startsWith("אין"),
  },
  {
    id: "inheritanceModel",
    text: "למי תרצה/י להוריש?",
    type: "select",
    options: [
      "הכל לבן/בת הזוג",
      "קודם לבן/בת הזוג, ואחר כך ליורשים נוספים (לילדים)",
      "לחלק בין כמה אנשים",
      "חלוקה מיוחדת שאני רוצה להגדיר",
      "עדיין לא בטוח/ה",
    ],
    explanation: "אפשר לשנות את זה בהמשך — רק כדי להבין את הכיוון.",
  },
  {
    id: "customDistribution",
    text: "תאר/י בקצרה את החלוקה שאת/ה רוצה",
    type: "text",
    placeholder: "לדוגמה: 50% לבן/בת הזוג, 25% לכל ילד",
    explanation: "נתרגם את זה לניסוח משפטי בצוואה.",
    condition: (a) => a.inheritanceModel === "חלוקה מיוחדת שאני רוצה להגדיר",
  },
  {
    id: "childrenCount",
    text: "כמה ילדים יש לך?",
    type: "select",
    options: ["1", "2", "3", "4", "5", "6", "7"],
    condition: (a) => {
      const fs = a.familyStructure || "";
      const hasChildren = fs.includes("ילדים") && fs !== "אין לי בן/בת זוג ואין ילדים" && fs !== "יש לי בן/בת זוג, אין ילדים";
      return hasChildren;
    },
  },
  {
    id: "child1Name",
    text: "מה שם הילד/ה הראשון/ה?",
    type: "text",
    placeholder: "שם פרטי ושם משפחה",
    condition: (a) => Number(a.childrenCount) >= 1,
  },
  {
    id: "child2Name",
    text: "מה שם הילד/ה השני/ה?",
    type: "text",
    placeholder: "שם פרטי ושם משפחה",
    condition: (a) => Number(a.childrenCount) >= 2,
  },
  {
    id: "child3Name",
    text: "מה שם הילד/ה השלישי/ת?",
    type: "text",
    placeholder: "שם פרטי ושם משפחה",
    condition: (a) => Number(a.childrenCount) >= 3,
  },
  {
    id: "child4Name",
    text: "מה שם הילד/ה הרביעי/ת?",
    type: "text",
    placeholder: "שם פרטי ושם משפחה",
    condition: (a) => Number(a.childrenCount) >= 4,
  },
  {
    id: "child5Name",
    text: "מה שם הילד/ה החמישי/ת?",
    type: "text",
    placeholder: "שם פרטי ושם משפחה",
    condition: (a) => Number(a.childrenCount) >= 5,
  },
  {
    id: "child6Name",
    text: "מה שם הילד/ה השישי/ת?",
    type: "text",
    placeholder: "שם פרטי ושם משפחה",
    condition: (a) => Number(a.childrenCount) >= 6,
  },
  {
    id: "child7Name",
    text: "מה שם הילד/ה השביעי/ת?",
    type: "text",
    placeholder: "שם פרטי ושם משפחה",
    condition: (a) => Number(a.childrenCount) >= 7,
  },
  {
    id: "hasOtherHeirs",
    text: "יש עוד מישהו שתרצה/י להוריש לו? (מלבד בן/בת זוג וילדים)",
    type: "select",
    options: ["כן", "לא"],
    condition: (a) =>
      a.inheritanceModel?.includes("לחלק") ||
      a.inheritanceModel?.includes("חלוקה מיוחדת"),
  },
  {
    id: "otherHeirNames",
    text: "למי עוד תרצה/י להוריש?",
    type: "text",
    placeholder: "לדוגמה: אחי דוד לוי, חברתי שרה כהן",
    explanation: "הפרד/י בין השמות בפסיק.",
    condition: (a) => a.hasOtherHeirs === "כן",
  },
  {
    id: "multipleHeirs",
    text: "האם יש יותר מיורש אחד שאת/ה רוצה לכלול בצוואה? (כולל ילדים ואנשים נוספים)",
    type: "select",
    options: ["כן", "לא"],
    explanation: "אם כבר ציינת ילדים או יורשים נוספים — בחר/י כן.",
  },
  {
    id: "distributionMethod",
    text: "איך לחלק ביניהם?",
    type: "select",
    options: [
      "שווה בשווה",
      "חלקים לא שווים",
      "לפי אחוזים",
      "כל אחד מקבל נכס מסוים",
      "עדיין לא החלטתי",
    ],
    condition: (a) => a.multipleHeirs === "כן",
  },
  {
    id: "specialAssetInstruction",
    text: "יש נכס מסוים שחשוב לך לציין לגביו הוראה?",
    type: "select",
    options: ["כן", "לא"],
    explanation: "למשל דירה, עסק, חשבון בנק או כל דבר אחר.",
  },
  {
    id: "specialAssetDetails",
    text: "ספר/י בקצרה — מה הנכס ומה ההוראה?",
    type: "text",
    placeholder: "לדוגמה: הדירה ברחוב... תועבר ל...",
    condition: (a) => a.specialAssetInstruction === "כן",
  },
  {
    id: "substituteHeir",
    text: "אם מישהו מהיורשים לא יוכל לקבל — חשוב לך לקבוע מי יקבל במקומו?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
  },
  {
    id: "substituteHeirMode",
    text: "מה יקרה עם החלק שלו?",
    type: "select",
    options: [
      "יעבור לילדים שלו",
      "יתחלק בין שאר היורשים",
      "יעבור לאדם אחר שאבחר",
      "עדיין לא החלטתי",
    ],
    condition: (a) => a.substituteHeir === "כן",
  },
  {
    id: "substituteHeirName",
    text: "מי האדם שיקבל במקומו?",
    type: "text",
    placeholder: "שם פרטי ושם משפחה",
    condition: (a) => a.substituteHeirMode === "יעבור לאדם אחר שאבחר",
  },
  {
    id: "successiveHeir",
    text: "תרצה/י שהרכוש יעבור קודם לאדם אחד ורק אחר כך לאדם אחר?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
    explanation: "למשל: קודם לבן/בת הזוג, ואחרי פטירתו לילדים.",
  },
  {
    id: "successiveHeirDetails",
    text: "מי מקבל ראשון ומי אחר כך?",
    type: "text",
    placeholder: "לדוגמה: קודם בן/בת הזוג, אחר כך הילדים",
    condition: (a) => a.successiveHeir === "כן",
  },
  {
    id: "minorChildren",
    text: "יש ילדים קטנים או יורשים שתרצה/י לדחות את קבלת חלקם?",
    type: "select",
    options: ["כן", "לא"],
    explanation: "למשל: שהכסף ייתן רק כשהילד יגיע לגיל 21.",
  },
  {
    id: "minorChildrenDetails",
    text: "איך תרצה/י שזה יעבוד?",
    type: "select",
    options: [
      "מישהו ינהל את הכסף עד גיל מסוים",
      "הכסף יועבר בשלבים",
      "אדם מסוים ינהל עד שיתקיים תנאי",
      "עדיין לא החלטתי",
    ],
    condition: (a) => a.minorChildren === "כן",
  },
  {
    id: "executorNeeded",
    text: "תרצה/י למנות מישהו שינהל את חלוקת העיזבון?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
    explanation: "מומלץ כשיש כמה יורשים או נכסים שונים.",
  },
  {
    id: "executorName",
    text: "מי האדם שתרצה/י שינהל?",
    type: "text",
    placeholder: "שם מלא",
    explanation: "אפשר להשלים גם בהמשך.",
    condition: (a) => a.executorNeeded === "כן",
  },
  {
    id: "executorProtections",
    text: "חשוב לך שמנהל העיזבון יוכל להיעזר באנשי מקצוע?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
    explanation: "למשל שמאי, רואה חשבון או עורך דין.",
    condition: (a) => a.executorNeeded === "כן",
  },
  {
    id: "conflictRisk",
    text: "יש סיכוי שהיורשים לא יסכימו ביניהם?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
  },
  {
    id: "conflictProtection",
    text: "תרצה/י להוסיף מנגנונים שימנעו מחלוקות?",
    type: "select",
    options: [
      "כן, כולל הערכת שווי מקצועית",
      "כן, כולל הגנה מפני התנגדות לצוואה",
      "כן, את שניהם",
      "לא",
      "לא בטוח/ה",
    ],
    condition: (a) => a.conflictRisk === "כן" || a.conflictRisk === "לא בטוח/ה",
  },
  {
    id: "rightOfFirstRefusal",
    text: "יש מישהו שתרצה/י לתת לו עדיפות לקנות נכס מהעיזבון?",
    type: "select",
    options: ["כן", "לא"],
    explanation: "למשל: זכות ראשונה לקנות את הדירה.",
  },
  {
    id: "rightOfFirstRefusalDetails",
    text: "איזה נכס ולמי העדיפות?",
    type: "text",
    placeholder: "לדוגמה: הדירה ב..., עדיפות ל...",
    condition: (a) => a.rightOfFirstRefusal === "כן",
  },
  {
    id: "specificCharge",
    text: "תרצה/י לחייב יורש מסוים לעשות משהו?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
    explanation: "למשל: לשלם למישהו, לתת זכות מגורים, לשמור על נכס.",
  },
  {
    id: "specificChargeDetails",
    text: "מה החיוב?",
    type: "text",
    placeholder: "לדוגמה: לשלם סכום מסוים / לתת זכות מגורים",
    condition: (a) => a.specificCharge === "כן",
  },
  {
    id: "digitalAssets",
    text: "יש לך חשבונות דיגיטליים שחשוב להסדיר?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
    explanation: "למשל: מייל, רשתות חברתיות, ארנקים דיגיטליים.",
  },
  {
    id: "burialAndMemorial",
    text: "תרצה/י לכלול הוראות לגבי קבורה או אזכרות?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
  },
];

export const existingWillQuestions: Question[] = [
  {
    id: "existingWillType",
    text: "איזה סוג צוואה יש לך היום?",
    type: "select",
    options: ["צוואה רגילה", "צוואה הדדית", "לא בטוח/ה"],
  },
  {
    id: "familyChanged",
    text: "השתנה משהו במצב המשפחתי מאז שנכתבה?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
  },
  {
    id: "assetsChanged",
    text: "נוספו נכסים חדשים מאז?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
  },
  {
    id: "mechanismMissing",
    text: "חסר בה משהו חשוב לדעתך?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
    explanation: "למשל: יורש חלופי, מנהל עיזבון, הוראה לנכס מסוים.",
  },
  {
    id: "digitalAssets",
    text: "יש חשבונות דיגיטליים שלא מוסדרים בצוואה?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
  },
  {
    id: "conflictRisk",
    text: "יש סיכוי למחלוקת בין היורשים?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
  },
];

export interface AnsweredQuestion {
  question: string;
  answer: string;
  type: Question["type"];
}

/**
 * Resolve a raw answers map into an object keyed by question id, carrying the
 * question text alongside the answer. The raw map is only id -> string, which
 * is useless in the dashboard without the question bank to join against.
 * Unknown ids (e.g. the `source` marker QuickAssessment injects) are kept with
 * an empty question text rather than dropped.
 */
export function describeAnswers(
  questionList: Question[],
  answers: Record<string, string>
): Record<string, AnsweredQuestion> {
  const byId = new Map(questionList.map((q) => [q.id, q]));
  const out: Record<string, AnsweredQuestion> = {};

  for (const [id, answer] of Object.entries(answers)) {
    if (answer === undefined || answer === null || String(answer).trim() === "") continue;
    const q = byId.get(id);
    out[id] = {
      question: q?.text ?? "",
      answer: String(answer),
      type: q?.type ?? "text",
    };
  }

  return out;
}

/** Question bank for a track, so callers don't repeat the ternary */
export function questionsForTrack(track: "noWill" | "existingWill"): Question[] {
  return track === "noWill" ? noWillQuestions : existingWillQuestions;
}
