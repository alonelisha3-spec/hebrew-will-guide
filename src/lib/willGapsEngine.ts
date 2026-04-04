/**
 * Analyzes questionnaire answers and identifies gaps/missing elements
 * compared to a professionally-drafted will.
 * Returns actionable insights the user should address with a lawyer.
 */

export interface WillGap {
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
}

function yes(v?: string) {
  return v === "כן";
}
function no(v?: string) {
  return v === "לא";
}
function unsure(v?: string) {
  return v === "לא בטוח/ה" || v === "לא בטוח";
}
function hasValue(v?: string) {
  return !!v && String(v).trim() !== "";
}

export function analyzeWillGaps(
  answers: Record<string, string>,
  willType: string
): WillGap[] {
  const gaps: WillGap[] = [];
  const isMutual = willType === "צוואה הדדית";

  // --- Always relevant gaps ---

  // 1. No ID / address provided
  if (!hasValue(answers.idNumber)) {
    gaps.push({
      title: "חסר מספר תעודת זהות",
      description:
        "צוואה תקפה מחייבת פרטי זיהוי מלאים של המצווה — ללא ת.ז. לא ניתן להגיש צוואה לרשם הירושות.",
      severity: "high",
    });
  }
  if (!hasValue(answers.address)) {
    gaps.push({
      title: "חסרת כתובת מגורים",
      description:
        "כתובת המגורים נדרשת לצורך זיהוי המצווה ומניעת אי-בהירויות.",
      severity: "medium",
    });
  }

  // 2. No substitute heir
  if (!yes(answers.substituteHeir)) {
    gaps.push({
      title: "לא נקבע יורש חלופי",
      description:
        'אם אחד היורשים ילך לעולמו לפני המצווה — חלקו לא מוסדר. צוואה מקצועית כוללת מנגנון "יורש במקום יורש" למניעת חלוקה לא רצויה.',
      severity: "high",
    });
  }

  // 3. No executor
  if (!yes(answers.executorNeeded)) {
    gaps.push({
      title: "לא מונה מנהל עיזבון",
      description:
        "ללא מנהל עיזבון, חלוקת הנכסים תלויה בהסכמת כל היורשים ועלולה להתעכב. מינוי מנהל עיזבון מאפשר ביצוע מהיר ומסודר.",
      severity: "medium",
    });
  } else {
    // Executor exists — check protections
    if (!yes(answers.executorProtections) && !unsure(answers.executorProtections)) {
      gaps.push({
        title: "חסרות הגנות למנהל העיזבון",
        description:
          "צוואה מקצועית כוללת סעיפי הגנה: פטור מאחריות אישית בתום לב, זכות להיעזר ביועצים מקצועיים, וזכות להוציא הוצאות סבירות מהעיזבון.",
        severity: "medium",
      });
    }
  }

  // 4. No anti-contest clause
  if (!yes(answers.conflictRisk) && !unsure(answers.conflictRisk)) {
    gaps.push({
      title: "לא נבדק סיכון למחלוקת בין יורשים",
      description:
        "צוואה מקצועית כוללת סעיף שלילת זכויות מיורש שיתנגד לצוואה — כדי להרתיע מהליכים משפטיים מיותרים.",
      severity: "medium",
    });
  } else if (
    answers.conflictProtection !== "כן, את שניהם" &&
    answers.conflictProtection !== "כן, כולל הגנה מפני התנגדות לצוואה"
  ) {
    gaps.push({
      title: "חסר סעיף שלילת זכויות במקרה התנגדות",
      description:
        'סעיף "אם יתנגד — ייפסל חלקו" נפוץ בצוואות מקצועיות ומרתיע מהליכים. בנוסח הנוכחי אין מנגנון כזה.',
      severity: "medium",
    });
  }

  // 5. No neutral valuation mechanism
  if (
    yes(answers.multipleHeirs) &&
    !yes(answers.rightOfFirstRefusal) &&
    answers.distributionMethod !== "שווה בשווה"
  ) {
    gaps.push({
      title: "חסר מנגנון שמאות ניטרלית",
      description:
        "כשהחלוקה אינה שווה, או כשיש נכסים שקשה לחלק (דירה, עסק) — שמאות ניטרלית מונעת מחלוקות על שווי.",
      severity: "medium",
    });
  }

  // 6. No burial / memorial instructions
  if (!yes(answers.burialAndMemorial)) {
    gaps.push({
      title: "לא נקבעו הוראות לגבי קבורה ואזכרות",
      description:
        "צוואה מקצועית קובעת שהוצאות קבורה, שבעה ואזכרות ישולמו מהעיזבון לפני החלוקה, כולל הקצאה לאזכרות עתידיות.",
      severity: "low",
    });
  }

  // 7. No digital assets handling
  if (!yes(answers.digitalAssets) && !unsure(answers.digitalAssets)) {
    gaps.push({
      title: "נכסים דיגיטליים לא מוסדרים",
      description:
        "חשבונות בנק מקוונים, מייל, רשתות חברתיות, ארנקים דיגיטליים — ללא הוראה מפורשת עלולים להיות בלתי נגישים ליורשים.",
      severity: "low",
    });
  }

  // 8. Asset specifics missing
  if (!yes(answers.specialAssetInstruction)) {
    gaps.push({
      title: "אין פירוט של נכסים ספציפיים",
      description:
        "צוואה מקצועית מפרטת נכסים מרכזיים: כתובת דירה, מספרי חשבון בנק, פרטי ניירות ערך — כדי למנוע ספקות.",
      severity: "medium",
    });
  }

  // --- Mutual will specific gaps ---
  if (isMutual) {
    gaps.push({
      title: "חסר הסדר ביטול/שינוי לפי סעיף 8א לחוק הירושה",
      description:
        "צוואה הדדית מחייבת התייחסות מפורשת לכללי השינוי והביטול: בחיי שני הצדדים, לאחר פטירת אחד ולפני חלוקה, ולאחר חלוקה — כל מצב דורש הסדר שונה.",
      severity: "high",
    });

    if (!yes(answers.successiveHeir)) {
      gaps.push({
        title: 'חסר מנגנון "יורש אחר יורש" בצוואה הדדית',
        description:
          "בצוואה הדדית חיוני שהרכוש יעבור לבן/בת הזוג ואחר כך לילדים. ללא מנגנון זה, בן הזוג הנותר יכול להוריש למי שירצה.",
        severity: "high",
      });
    }

    gaps.push({
      title: "חסרה הצהרת הסתמכות הדדית",
      description:
        "צוואה הדדית מבוססת על הסתמכות הדדית בין בני הזוג. ללא הצהרה מפורשת, עלול להתעורר ספק בדבר תוקף הצוואה.",
      severity: "high",
    });

    gaps.push({
      title: "אין הסדר לפטירה בו-זמנית",
      description:
        "מה קורה אם שני בני הזוג נפטרים באותו מועד? צוואה הדדית מקצועית מגדירה חלוקה ישירה לילדים במקרה כזה.",
      severity: "medium",
    });
  }

  // 9. Right of first refusal — missing details
  if (yes(answers.rightOfFirstRefusal) && !hasValue(answers.rightOfFirstRefusalDetails)) {
    gaps.push({
      title: "זכות קדימה ללא פירוט",
      description:
        "צוואה מקצועית מגדירה: כיצד ייקבע שווי הנכס, לוח זמנים למימוש, ואפשרות קיזוז מחלק בעיזבון.",
      severity: "medium",
    });
  }

  // 10. Witness section awareness
  gaps.push({
    title: "חסרים פרטי עדים",
    description:
      "צוואה בכתב מחייבת חתימה בפני שני עדים שאינם נהנים ממנה ואינם בני משפחה מדרגה ראשונה. ללא עדים הצוואה עלולה להיפסל.",
    severity: "high",
  });

  return gaps;
}
