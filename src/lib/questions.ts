export interface Question {
  id: string;
  text: string;
  options?: string[];
  type: "select" | "text";
  placeholder?: string;
  condition?: (answers: Record<string, string>) => boolean;
}

// מסלול: אין לי צוואה
export const noWillQuestions: Question[] = [
  {
    id: "fullName",
    text: "מהו שמך המלא?",
    type: "text",
    placeholder: "שם פרטי ושם משפחה",
  },
  {
    id: "familyStatus",
    text: "מה מצבך המשפחתי?",
    type: "select",
    options: ["נשוי/אה", "ידוע/ה בציבור", "רווק/ה", "גרוש/ה", "אלמן/ה"],
  },
  {
    id: "hasSpouse",
    text: "האם יש לך בן/בת זוג?",
    type: "select",
    options: ["כן", "לא"],
  },
  {
    id: "spouseProtection",
    text: "האם חשוב לך להגן קודם כל על בן/בת הזוג?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
    condition: (a) => a.hasSpouse === "כן",
  },
  {
    id: "hasChildren",
    text: "האם יש לך ילדים?",
    type: "select",
    options: ["כן", "לא"],
  },
  {
    id: "multipleChildren",
    text: "האם יש לך יותר מילד אחד?",
    type: "select",
    options: ["כן", "לא"],
    condition: (a) => a.hasChildren === "כן",
  },
  {
    id: "minorChildren",
    text: "האם יש ילדים קטינים?",
    type: "select",
    options: ["כן", "לא"],
    condition: (a) => a.hasChildren === "כן",
  },
  {
    id: "mainBeneficiary",
    text: "למי מיועד עיקר הרכוש?",
    type: "select",
    options: [
      "לבן/בת הזוג",
      "לילדים בחלקים שווים",
      "לבן/בת הזוג ולאחר מכן לילדים",
      "אחר",
    ],
  },
  {
    id: "equalDistribution",
    text: "האם החלוקה בין היורשים צריכה להיות שווה?",
    type: "select",
    options: ["כן, חלוקה שווה", "לא, חלוקה שונה"],
  },
  {
    id: "conflictRisk",
    text: "האם יש חשש למחלוקת בין היורשים?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
  },
  {
    id: "realEstate",
    text: "האם יש לך נכסי מקרקעין?",
    type: "select",
    options: ["כן", "לא"],
  },
  {
    id: "financialAssets",
    text: "האם יש לך חסכונות, קופות, קרנות או זכויות כספיות?",
    type: "select",
    options: ["כן", "לא"],
  },
  {
    id: "digitalAssets",
    text: "האם יש לך נכסים דיגיטליים?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
  },
  {
    id: "estateManager",
    text: "האם ברצונך למנות מנהל עיזבון?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
  },
  {
    id: "grandchildrenClause",
    text: "האם לכלול מנגנון של 'נכדים במקום ילד'?",
    type: "select",
    options: ["כן", "לא"],
  },
  {
    id: "specialCircumstances",
    text: "האם יש נסיבות משפחתיות מיוחדות?",
    type: "select",
    options: ["כן", "לא"],
  },
  {
    id: "specialDetails",
    text: "נא לפרט בקצרה",
    type: "text",
    placeholder: "תיאור קצר",
    condition: (a) => a.specialCircumstances === "כן",
  },
  // רשות בלבד
  {
    id: "provideIdNow",
    text: "האם תרצה/י להזין עכשיו מספר תעודת זהות? (לא חובה)",
    type: "select",
    options: ["כן", "לא, אשלים בהמשך"],
  },
  {
    id: "idNumber",
    text: "מהו מספר תעודת הזהות שלך?",
    type: "text",
    placeholder: "מספר תעודת זהות",
    condition: (a) => a.provideIdNow === "כן",
  },
  {
    id: "provideAddressNow",
    text: "האם תרצה/י להזין עכשיו כתובת מגורים? (לא חובה)",
    type: "select",
    options: ["כן", "לא, אשלים בהמשך"],
  },
  {
    id: "address",
    text: "מהי כתובת מגוריך?",
    type: "text",
    placeholder: "רחוב, מספר, עיר",
    condition: (a) => a.provideAddressNow === "כן",
  },
  {
    id: "provideNamesNow",
    text: "האם תרצה/י להזין עכשיו שמות בני משפחה? (לא חובה)",
    type: "select",
    options: ["כן", "לא, אשלים בהמשך"],
    condition: (a) => a.hasChildren === "כן" || a.hasSpouse === "כן",
  },
  {
    id: "spouseName",
    text: "מהו שם בן/בת הזוג?",
    type: "text",
    placeholder: "שם מלא",
    condition: (a) => a.hasSpouse === "כן" && a.provideNamesNow === "כן",
  },
  {
    id: "childrenNames",
    text: "נא לציין את שמות הילדים (מופרדים בפסיק)",
    type: "text",
    placeholder: "לדוגמה: יעל, דני, נעמה",
    condition: (a) => a.hasChildren === "כן" && a.provideNamesNow === "כן",
  },
];

// מסלול: יש לי צוואה
export const existingWillQuestions: Question[] = [
  {
    id: "willType",
    text: "האם הצוואה שלך רגילה או הדדית?",
    type: "select",
    options: ["צוואה רגילה", "צוואה הדדית", "לא בטוח/ה"],
  },
  {
    id: "familyChanged",
    text: "האם חל שינוי במצבך המשפחתי מאז עריכת הצוואה?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
  },
  {
    id: "assetsChanged",
    text: "האם נוספו נכסים משמעותיים מאז עריכת הצוואה?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
  },
  {
    id: "digitalAssets",
    text: "האם יש נכסים דיגיטליים שאינם מוזכרים בצוואה?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
  },
  {
    id: "conflictRisk",
    text: "האם יש חשש למחלוקת בין היורשים?",
    type: "select",
    options: ["כן", "לא", "לא בטוח/ה"],
  },
];
