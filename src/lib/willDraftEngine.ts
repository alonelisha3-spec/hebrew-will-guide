// Generate a formal Hebrew will draft based on questionnaire answers

export interface WillDraftData {
  willType: "צוואה רגילה" | "צוואה הדדית" | "נדרש בירור";
  keyPoints: string[];
  fullDraft: string;
}

export function generateWillPreview(answers: Record<string, string>): {
  willType: string;
  keyPoints: string[];
} {
  const hasSpouse = answers.hasSpouse === "כן";
  const hasChildren = answers.hasChildren === "כן";
  const mainBeneficiary = answers.mainBeneficiary;

  let willType = "צוואה רגילה";
  if (
    hasSpouse &&
    hasChildren &&
    (mainBeneficiary === "לבן/בת הזוג ולאחר מכן לילדים" || mainBeneficiary === "לבן/בת הזוג")
  ) {
    willType = "צוואה הדדית";
  }

  const keyPoints: string[] = [];

  if (!hasSpouse && !hasChildren) {
    keyPoints.push("ללא בן/בת זוג וללא ילדים — יש לציין יורשים חלופיים");
  }
  if (hasSpouse) {
    keyPoints.push("הצוואה תכלול הוראות להגנה על בן/בת הזוג");
  }
  if (hasChildren && answers.minorChildren === "כן") {
    keyPoints.push("נדרשת התייחסות מיוחדת לילדים קטינים");
  }
  if (answers.equalDistribution === "לא, חלוקה שונה") {
    keyPoints.push("חלוקה בלתי שוויונית — דורשת ניסוח קפדני");
  }
  if (answers.digitalAssets !== "לא") {
    keyPoints.push("הצוואה תכלול הוראה בעניין נכסים דיגיטליים");
  }
  if (answers.estateManager === "כן") {
    keyPoints.push("ימונה מנהל עיזבון בהתאם לבחירתך");
  }
  if (answers.grandchildrenClause === "כן") {
    keyPoints.push('ייכלל מנגנון "נכדים במקום ילד"');
  }

  if (keyPoints.length === 0) {
    keyPoints.push("צוואה סטנדרטית מותאמת לנתוניך");
  }

  return { willType, keyPoints: keyPoints.slice(0, 3) };
}

export function generateFullWillDraft(answers: Record<string, string>): WillDraftData {
  const preview = generateWillPreview(answers);
  const fullDraft = buildDraftText(answers, preview.willType);

  return {
    willType: preview.willType as WillDraftData["willType"],
    keyPoints: preview.keyPoints,
    fullDraft,
  };
}

function buildDraftText(a: Record<string, string>, willType: string): string {
  const name = a.fullName || "___________";
  const idNum = a.idNumber || "___________";
  const address = a.address || "___________";
  const today = new Date().toLocaleDateString("he-IL");

  const hasSpouse = a.hasSpouse === "כן";
  const spouseName = a.spouseName || "___________";
  const hasChildren = a.hasChildren === "כן";
  const childrenNames = a.childrenNames
    ? a.childrenNames.split(",").map((n) => n.trim()).filter(Boolean)
    : [];
  const multipleChildren = a.multipleChildren === "כן";
  const minorChildren = a.minorChildren === "כן";
  const mainBeneficiary = a.mainBeneficiary || "";
  const equalDist = a.equalDistribution !== "לא, חלוקה שונה";
  const hasRealEstate = a.realEstate === "כן";
  const hasFinancial = a.financialAssets === "כן";
  const hasDigital = a.digitalAssets !== "לא";
  const wantsManager = a.estateManager === "כן";
  const managerName = a.estateManagerName || "___________";
  const grandchildren = a.grandchildrenClause === "כן";

  const isMutualStyle =
    hasSpouse &&
    (mainBeneficiary === "לבן/בת הזוג ולאחר מכן לילדים" ||
      mainBeneficiary === "לבן/בת הזוג");

  const lines: string[] = [];

  // Title
  lines.push("צ ו ו א ה");
  lines.push("");

  if (isMutualStyle) {
    lines.push(`(טיוטה ראשונית — במתכונת צוואה הדדית)`);
  } else {
    lines.push(`(טיוטה ראשונית — צוואה בכתב)`);
  }
  lines.push("");

  // Testator details
  lines.push(`אני, ${name}, נושא/ת תעודת זהות מספר ${idNum}, מרחוב ${address}, מצהיר/ה בזאת כדלקמן:`);
  lines.push("");

  // Declaration of capacity
  lines.push("1. הצהרת כשירות ורצון חופשי");
  lines.push("");
  lines.push(
    `אני עורך/ת צוואה זו מרצוני החופשי, בדעה צלולה ומיושבת, ללא כל לחץ, השפעה בלתי הוגנת, כפייה או איום מצד כל אדם, ובהיותי כשיר/ה לעשות כן על פי דין.`
  );
  lines.push("");

  // Revocation
  lines.push("2. ביטול צוואות קודמות");
  lines.push("");
  lines.push(
    `בזאת אני מבטל/ת כל צוואה, תוספת לצוואה או הוראת צוואה שנערכו על ידי בעבר, ומורה כי צוואה זו בלבד תחול ותקפה.`
  );
  lines.push("");

  // Inheritance instructions
  lines.push("3. הוראות הורשה");
  lines.push("");

  let clauseNum = 1;

  if (isMutualStyle && hasSpouse) {
    lines.push(
      `3.${clauseNum}. אני מצווה את כל רכושי, מכל סוג ומין שהוא, לבן/בת זוגי, ${spouseName}, וזאת כדי להבטיח את המשך קיומו/ה הכלכלי ואת זכותו/ה להשתמש ברכוש ולנהלו ללא מגבלה.`
    );
    lines.push("");
    clauseNum++;

    if (hasChildren) {
      if (childrenNames.length > 0) {
        if (equalDist) {
          lines.push(
            `3.${clauseNum}. לאחר פטירת בן/בת הזוג הנותר/ת, יחולק הרכוש בין ילדיי בחלקים שווים: ${childrenNames.join(", ")}.`
          );
        } else {
          lines.push(
            `3.${clauseNum}. לאחר פטירת בן/בת הזוג הנותר/ת, יחולק הרכוש בין ילדיי — ${childrenNames.join(", ")} — בהתאם להוראות שייקבעו בצוואה הסופית ובהתאם לייעוץ משפטי.`
          );
        }
      } else {
        lines.push(
          `3.${clauseNum}. לאחר פטירת בן/בת הזוג הנותר/ת, יועבר הרכוש לילדיי${equalDist ? " בחלקים שווים" : " בהתאם לחלוקה שתיקבע"}.`
        );
      }
      lines.push("");
      clauseNum++;
    }
  } else if (hasSpouse && mainBeneficiary === "לבן/בת הזוג") {
    lines.push(
      `3.${clauseNum}. אני מצווה את כל רכושי, מכל סוג ומין, לבן/בת זוגי, ${spouseName}.`
    );
    lines.push("");
    clauseNum++;
  } else if (hasChildren) {
    if (childrenNames.length > 0) {
      if (equalDist) {
        lines.push(
          `3.${clauseNum}. אני מצווה את כל רכושי לילדיי, בחלקים שווים ביניהם: ${childrenNames.join(", ")}.`
        );
      } else {
        lines.push(
          `3.${clauseNum}. אני מצווה את רכושי לילדיי — ${childrenNames.join(", ")} — בהתאם לחלוקה שלהלן: [יש להשלים חלוקה ספציפית בהתייעצות עם עורך דין].`
        );
      }
    } else {
      lines.push(
        `3.${clauseNum}. אני מצווה את כל רכושי לילדיי${equalDist ? ", בחלקים שווים ביניהם" : ""}.`
      );
    }
    lines.push("");
    clauseNum++;

    if (hasSpouse) {
      lines.push(
        `3.${clauseNum}. לבן/בת זוגי, ${spouseName}, אני מצווה זכות שימוש ומגורים בדירת המגורים המשותפת לכל חייו/ה.`
      );
      lines.push("");
      clauseNum++;
    }
  } else {
    lines.push(
      `3.${clauseNum}. אני מצווה את כל רכושי ל_____________ [יש להשלים פרטי היורש/ים].`
    );
    lines.push("");
    clauseNum++;
  }

  // Minor children
  if (minorChildren) {
    lines.push(`4. הוראות בעניין ילדים קטינים`);
    lines.push("");
    lines.push(
      `ככל שבעת פטירתי יהיו בין ילדיי קטינים, מונה בזאת את ${hasSpouse ? spouseName : "___________"} כאפוטרופוס/ית על גופם ורכושם. האפוטרופוס/ית יהיה/תהיה רשאי/ת לנהל את חלקם בעיזבון עד הגיעם לגיל 18, ולהשתמש בכספים לצורכי חינוכם, בריאותם ורווחתם.`
    );
    lines.push("");
  }

  // Grandchildren clause
  if (grandchildren && hasChildren) {
    const sectionNum = minorChildren ? 5 : 4;
    lines.push(`${sectionNum}. הוראת "יורש במקום יורש"`);
    lines.push("");
    lines.push(
      `אם מי מילדיי ילך לעולמו לפניי, יבואו ילדיו (נכדיי) במקומו ויירשו את חלקו בעיזבון, בחלקים שווים ביניהם.`
    );
    lines.push("");
  }

  // Real estate
  let nextSection = (minorChildren ? 5 : 4) + (grandchildren && hasChildren ? 1 : 0);
  if (hasRealEstate) {
    lines.push(`${nextSection}. נכסי מקרקעין`);
    lines.push("");
    lines.push(
      `הוראות צוואה זו חלות על כלל נכסי המקרקעין שבבעלותי, לרבות דירות מגורים, קרקעות וזכויות חכירה, בין אם רשומים על שמי ובין אם הזכויות בהם טרם נרשמו.`
    );
    lines.push("");
    nextSection++;
  }

  // Financial assets
  if (hasFinancial) {
    lines.push(`${nextSection}. נכסים כספיים`);
    lines.push("");
    lines.push(
      `הוראות צוואה זו חלות על כלל חשבונות הבנק, תוכניות החיסכון, קופות הגמל, קרנות ההשתלמות, פוליסות הביטוח, ניירות הערך וכל זכות כספית אחרת הרשומה על שמי או המגיעה לי.`
    );
    lines.push("");
    nextSection++;
  }

  // Digital assets
  if (hasDigital) {
    lines.push(`${nextSection}. נכסים דיגיטליים`);
    lines.push("");
    lines.push(
      `אני מורה כי כלל הנכסים הדיגיטליים שבבעלותי — לרבות חשבונות מקוונים, ארנקים דיגיטליים, מטבעות קריפטוגרפיים, חנויות מקוונות, קבצים מאוחסנים בענן וכל נכס דיגיטלי אחר — ייכללו בעיזבוני וייחלקו בהתאם להוראות צוואה זו. אני ממנה את ${wantsManager ? managerName : hasSpouse ? spouseName : "___________"} לטפל בנכסים אלה ולהעבירם ליורשיי.`
    );
    lines.push("");
    nextSection++;
  }

  // Estate manager
  if (wantsManager) {
    lines.push(`${nextSection}. מינוי מנהל עיזבון`);
    lines.push("");
    lines.push(
      `אני ממנה בזאת את ${managerName} לשמש כמנהל/ת עיזבוני. מנהל/ת העיזבון יהיה/תהיה רשאי/ת לנקוט בכל פעולה הנדרשת לביצוע הוראות צוואה זו, לרבות מימוש נכסים, פירעון חובות, חלוקת העיזבון ליורשים וייצוג העיזבון בפני כל גורם.`
    );
    lines.push("");
    nextSection++;
  }

  // Estate expenses
  lines.push(`${nextSection}. הוצאות עיזבון`);
  lines.push("");
  lines.push(
    `הוצאות הלוויה, הקבורה, חובותיי וכל ההוצאות הכרוכות בניהול העיזבון ובחלוקתו ישולמו מתוך כלל נכסי העיזבון, בטרם חלוקתו ליורשים.`
  );
  lines.push("");
  nextSection++;

  // Signature
  lines.push(`${nextSection}. חתימה`);
  lines.push("");
  lines.push(`ולראיה באתי על החתום ביום ${today}:`);
  lines.push("");
  lines.push(`שם המצווה: ${name}`);
  lines.push(`חתימה: _______________`);
  lines.push("");
  lines.push(`עד ראשון:`);
  lines.push(`שם: _______________`);
  lines.push(`ת.ז.: _______________`);
  lines.push(`חתימה: _______________`);
  lines.push("");
  lines.push(`עד שני:`);
  lines.push(`שם: _______________`);
  lines.push(`ת.ז.: _______________`);
  lines.push(`חתימה: _______________`);

  lines.push("");
  lines.push("─".repeat(40));
  lines.push("");
  lines.push(
    `הערה חשובה: מסמך זה הינו טיוטה ראשונית בלבד ואינו מהווה צוואה תקפה. לפני חתימה יש לבצע בדיקה והתאמה משפטית מול עורך דין.`
  );

  return lines.join("\n");
}

// Review existing will
export interface ReviewResult {
  willType: string;
  riskLevel: string;
  issues: string[];
  headline: string;
}

export function generateExistingWillReview(answers: Record<string, string>): ReviewResult {
  const issues: string[] = [];

  if (answers.familyChanged !== "לא") {
    issues.push("חל שינוי במצב המשפחתי — ייתכן שהצוואה אינה משקפת את המצב הנוכחי");
  }
  if (answers.assetsChanged !== "לא") {
    issues.push("נוספו נכסים שאינם מוזכרים בצוואה — עלולה להיווצר אי-בהירות");
  }
  if (answers.digitalAssets !== "לא") {
    issues.push("נכסים דיגיטליים אינם מוסדרים בצוואה");
  }
  if (answers.conflictRisk !== "לא") {
    issues.push("קיים חשש למחלוקת בין יורשים — מומלץ לבחון מנגנוני הגנה");
  }

  const riskLevel =
    issues.length <= 1 ? "נמוכה" : issues.length <= 2 ? "בינונית" : issues.length <= 3 ? "גבוהה" : "גבוהה מאוד";

  const willType = answers.willType || "לא צוין";

  return {
    willType,
    riskLevel,
    issues,
    headline:
      issues.length === 0
        ? "לא זוהו ממצאים חריגים — מומלץ לבצע בדיקה שגרתית"
        : `זוהו ${issues.length} נקודות הדורשות בחינה משפטית`,
  };
}
