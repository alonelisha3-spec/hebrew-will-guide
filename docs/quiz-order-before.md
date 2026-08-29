# Quiz question order — BEFORE

Snapshot taken 2026-08-29, from `src/lib/questions.ts` at commit `a0d672f`.

Recorded as the documented baseline before moving the identity questions to the end.

## Flow before the change

```
landing -> questionnaire -> preview -> lead (identity gate) -> results (full draft)
```

The full draft was only reachable **after** submitting name and phone.

Quiz step 1 asked `fullName`, and the lead form asked for the name again.


## `noWillQuestions` — 37 questions

_Track: no existing will (the main campaign track)_

| # | id | type | conditional | question |
|---|---|---|---|---|
| 1 | `fullName` | text | — | מה השם המלא שלך? |
| 2 | `familyStructure` | select | — | מה המצב המשפחתי שלך? |
| 3 | `spouseName` | text | yes | מה שם בן/בת הזוג שלך? |
| 4 | `inheritanceModel` | select | — | למי תרצה/י להוריש? |
| 5 | `customDistribution` | text | yes | תאר/י בקצרה את החלוקה שאת/ה רוצה |
| 6 | `childrenCount` | select | yes | כמה ילדים יש לך? |
| 7 | `child1Name` | text | yes | מה שם הילד/ה הראשון/ה? |
| 8 | `child2Name` | text | yes | מה שם הילד/ה השני/ה? |
| 9 | `child3Name` | text | yes | מה שם הילד/ה השלישי/ת? |
| 10 | `child4Name` | text | yes | מה שם הילד/ה הרביעי/ת? |
| 11 | `child5Name` | text | yes | מה שם הילד/ה החמישי/ת? |
| 12 | `child6Name` | text | yes | מה שם הילד/ה השישי/ת? |
| 13 | `child7Name` | text | yes | מה שם הילד/ה השביעי/ת? |
| 14 | `hasOtherHeirs` | select | yes | יש עוד מישהו שתרצה/י להוריש לו? (מלבד בן/בת זוג וילדים) |
| 15 | `otherHeirNames` | text | yes | למי עוד תרצה/י להוריש? |
| 16 | `multipleHeirs` | select | — | האם יש יותר מיורש אחד שאת/ה רוצה לכלול בצוואה? (כולל ילדים ואנשים נוספים) |
| 17 | `distributionMethod` | select | yes | איך לחלק ביניהם? |
| 18 | `specialAssetInstruction` | select | — | יש נכס מסוים שחשוב לך לציין לגביו הוראה? |
| 19 | `specialAssetDetails` | text | yes | ספר/י בקצרה — מה הנכס ומה ההוראה? |
| 20 | `substituteHeir` | select | — | אם מישהו מהיורשים לא יוכל לקבל — חשוב לך לקבוע מי יקבל במקומו? |
| 21 | `substituteHeirMode` | select | yes | מה יקרה עם החלק שלו? |
| 22 | `substituteHeirName` | text | yes | מי האדם שיקבל במקומו? |
| 23 | `successiveHeir` | select | — | תרצה/י שהרכוש יעבור קודם לאדם אחד ורק אחר כך לאדם אחר? |
| 24 | `successiveHeirDetails` | text | yes | מי מקבל ראשון ומי אחר כך? |
| 25 | `minorChildren` | select | — | יש ילדים קטנים או יורשים שתרצה/י לדחות את קבלת חלקם? |
| 26 | `minorChildrenDetails` | select | yes | איך תרצה/י שזה יעבוד? |
| 27 | `executorNeeded` | select | — | תרצה/י למנות מישהו שינהל את חלוקת העיזבון? |
| 28 | `executorName` | text | yes | מי האדם שתרצה/י שינהל? |
| 29 | `executorProtections` | select | yes | חשוב לך שמנהל העיזבון יוכל להיעזר באנשי מקצוע? |
| 30 | `conflictRisk` | select | — | יש סיכוי שהיורשים לא יסכימו ביניהם? |
| 31 | `conflictProtection` | select | yes | תרצה/י להוסיף מנגנונים שימנעו מחלוקות? |
| 32 | `rightOfFirstRefusal` | select | — | יש מישהו שתרצה/י לתת לו עדיפות לקנות נכס מהעיזבון? |
| 33 | `rightOfFirstRefusalDetails` | text | yes | איזה נכס ולמי העדיפות? |
| 34 | `specificCharge` | select | — | תרצה/י לחייב יורש מסוים לעשות משהו? |
| 35 | `specificChargeDetails` | text | yes | מה החיוב? |
| 36 | `digitalAssets` | select | — | יש לך חשבונות דיגיטליים שחשוב להסדיר? |
| 37 | `burialAndMemorial` | select | — | תרצה/י לכלול הוראות לגבי קבורה או אזכרות? |

### Options

- `familyStructure`: יש לי בן/בת זוג וילדים משותפים · יש לי בן/בת זוג וילדים מקשר קודם · אין לי בן/בת זוג, אבל יש לי ילדים · יש לי בן/בת זוג, אין ילדים · אין לי בן/בת זוג ואין ילדים · מצב אחר
- `inheritanceModel`: הכל לבן/בת הזוג · קודם לבן/בת הזוג, ואחר כך ליורשים נוספים (לילדים) · לחלק בין כמה אנשים · חלוקה מיוחדת שאני רוצה להגדיר · עדיין לא בטוח/ה
- `childrenCount`: 1 · 2 · 3 · 4 · 5 · 6 · 7
- `hasOtherHeirs`: כן · לא
- `multipleHeirs`: כן · לא
- `distributionMethod`: שווה בשווה · חלקים לא שווים · לפי אחוזים · כל אחד מקבל נכס מסוים · עדיין לא החלטתי
- `specialAssetInstruction`: כן · לא
- `substituteHeir`: כן · לא · לא בטוח/ה
- `substituteHeirMode`: יעבור לילדים שלו · יתחלק בין שאר היורשים · יעבור לאדם אחר שאבחר · עדיין לא החלטתי
- `successiveHeir`: כן · לא · לא בטוח/ה
- `minorChildren`: כן · לא
- `minorChildrenDetails`: מישהו ינהל את הכסף עד גיל מסוים · הכסף יועבר בשלבים · אדם מסוים ינהל עד שיתקיים תנאי · עדיין לא החלטתי
- `executorNeeded`: כן · לא · לא בטוח/ה
- `executorProtections`: כן · לא · לא בטוח/ה
- `conflictRisk`: כן · לא · לא בטוח/ה
- `conflictProtection`: כן, כולל הערכת שווי מקצועית · כן, כולל הגנה מפני התנגדות לצוואה · כן, את שניהם · לא · לא בטוח/ה
- `rightOfFirstRefusal`: כן · לא
- `specificCharge`: כן · לא · לא בטוח/ה
- `digitalAssets`: כן · לא · לא בטוח/ה
- `burialAndMemorial`: כן · לא · לא בטוח/ה

## `existingWillQuestions` — 6 questions

_Track: has an existing will_

| # | id | type | conditional | question |
|---|---|---|---|---|
| 1 | `existingWillType` | select | — | איזה סוג צוואה יש לך היום? |
| 2 | `familyChanged` | select | — | השתנה משהו במצב המשפחתי מאז שנכתבה? |
| 3 | `assetsChanged` | select | — | נוספו נכסים חדשים מאז? |
| 4 | `mechanismMissing` | select | — | חסר בה משהו חשוב לדעתך? |
| 5 | `digitalAssets` | select | — | יש חשבונות דיגיטליים שלא מוסדרים בצוואה? |
| 6 | `conflictRisk` | select | — | יש סיכוי למחלוקת בין היורשים? |

### Options

- `existingWillType`: צוואה רגילה · צוואה הדדית · לא בטוח/ה
- `familyChanged`: כן · לא · לא בטוח/ה
- `assetsChanged`: כן · לא · לא בטוח/ה
- `mechanismMissing`: כן · לא · לא בטוח/ה
- `digitalAssets`: כן · לא · לא בטוח/ה
- `conflictRisk`: כן · לא · לא בטוח/ה

## Signals that motivated the change

- GA4: 3 of every 5 quiz starters drop at step 1, which asked `fullName`.
- Owner review: real users submitted false names to reach the draft without identifying themselves.
- Meta: 13,228 impressions in the 65+ bracket, mostly mobile — free-text name entry as the first screen.

All three point at the same cause: identity was demanded before any value was delivered.
