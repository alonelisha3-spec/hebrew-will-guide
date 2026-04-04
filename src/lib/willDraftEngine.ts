// Generate a formal Hebrew will draft based on questionnaire answers

export interface WillDraftData {
  willType: "צוואה רגילה" | "צוואה הדדית" | "נדרש בירור";
  keyPoints: string[];
  fullDraft: string;
}

export interface ReviewResult {
  willType: string;
  riskLevel: string;
  issues: string[];
  headline: string;
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

function currentDateHe() {
  return new Date().toLocaleDateString("he-IL");
}

function clean(v?: string, fallback = "___________") {
  return hasValue(v) ? String(v).trim() : fallback;
}

function splitNames(v?: string): string[] {
  if (!hasValue(v)) return [];
  return String(v)
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function getWillType(answers: Record<string, string>): WillDraftData["willType"] {
  const familyStructure = answers.familyStructure || "";
  const inheritanceModel = answers.inheritanceModel || "";

  const spouseRelevant =
    familyStructure.includes("בן/בת זוג") ||
    familyStructure.includes("זוג") ||
    familyStructure.includes("משותפים");

  const spouseFirst =
    inheritanceModel.includes("הכל לבן/בת הזוג") ||
    inheritanceModel.includes("כל העיזבון לבן/בת הזוג") ||
    inheritanceModel.includes("קודם לבן/בת הזוג") ||
    inheritanceModel.includes("בן/בת הזוג קודם");

  if (spouseRelevant && spouseFirst) {
    return "צוואה הדדית";
  }

  if (!hasValue(familyStructure) || !hasValue(inheritanceModel)) {
    return "נדרש בירור";
  }

  return "צוואה רגילה";
}

export function generateWillPreview(answers: Record<string, string>): {
  willType: string;
  keyPoints: string[];
} {
  const willType = getWillType(answers);
  const points: string[] = [];

  const familyStructure = answers.familyStructure || "";
  const inheritanceModel = answers.inheritanceModel || "";
  const distributionMethod = answers.distributionMethod || "";

  if (willType === "צוואה הדדית") {
    points.push("הנתונים מצביעים על צורך במבנה של בן/בת זוג תחילה ולאחר מכן יורשים נוספים.");
  } else if (willType === "צוואה רגילה") {
    points.push("הנתונים מצביעים על צורך בצוואה אישית במבנה רגיל.");
  } else {
    points.push("נדרש בירור נוסף כדי לקבוע את מבנה הצוואה המתאים.");
  }

  if (yes(answers.substituteHeir)) {
    points.push('יש צורך במנגנון של "יורש במקום יורש".');
  }

  if (yes(answers.successiveHeir)) {
    points.push('יש צורך במנגנון של "יורש אחר יורש".');
  }

  if (yes(answers.executorNeeded)) {
    points.push("מומלץ לכלול מינוי מנהל עיזבון.");
  }

  if (yes(answers.specialAssetInstruction)) {
    points.push("יש נכס מסוים שמצריך הוראה ייעודית.");
  }

  if (yes(answers.rightOfFirstRefusal)) {
    points.push("יש צורך לבחון זכות קדימה לרכישת נכס מתוך העיזבון.");
  }

  if (yes(answers.specificCharge)) {
    points.push("נדרש לשלב חיוב על יורש או הוראה נלווית.");
  }

  if (yes(answers.conflictRisk) || unsure(answers.conflictRisk)) {
    points.push("קיים סיכון למחלוקת בין יורשים ויש לשקול מנגנוני הגנה.");
  }

  if (yes(answers.minorChildren)) {
    points.push("יש צורך בהסדרה ביחס לקטינים או לדחיית קבלת ירושה.");
  }

  if (yes(answers.digitalAssets) || unsure(answers.digitalAssets)) {
    points.push("נדרשת התייחסות לנכסים דיגיטליים.");
  }

  if (
    inheritanceModel.includes("חלוקה מיוחדת") ||
    inheritanceModel.includes("חלוקה לא שוויונית") ||
    distributionMethod.includes("לא שווים") ||
    distributionMethod.includes("אחוזים") ||
    distributionMethod.includes("נכס מסוים")
  ) {
    points.push("החלוקה אינה סטנדרטית ודורשת ניסוח קפדני.");
  }

  if (familyStructure === "מבנה משפחתי מורכב אחר") {
    points.push("מדובר במבנה משפחתי מורכב שמצריך התאמה משפטית פרטנית.");
  }

  return {
    willType,
    keyPoints: points.slice(0, 4),
  };
}

export function generateFullWillDraft(answers: Record<string, string>): WillDraftData {
  const willType = getWillType(answers);
  const preview = generateWillPreview(answers);

  return {
    willType,
    keyPoints: preview.keyPoints,
    fullDraft: buildDraftText(answers, willType),
  };
}

function buildDraftText(a: Record<string, string>, willType: WillDraftData["willType"]): string {
  if (willType === "צוואה הדדית") {
    return buildMutualWillText(a);
  }
  return buildRegularWillText(a, willType);
}

function buildMutualWillText(a: Record<string, string>): string {
  const name = clean(a.fullName);
  const idNum = clean(a.idNumber);
  const address = clean(a.address);
  const today = currentDateHe();
  const childrenNames = splitNames(a.childrenNames);
  const executorName = clean(a.executorName);
  const specialAssetDetails = clean(a.specialAssetDetails, "[יש להשלים פרטי נכס והוראה]");
  const specificChargeDetails = clean(a.specificChargeDetails, "[יש להשלים את החיוב המבוקש]");
  const specialDetails = clean(a.specialDetails, "[יש להשלים נסיבות מיוחדות]");

  const lines: string[] = [];
  let section = 1;

  lines.push("צ ו ו א ה   ה ד ד י ת");
  lines.push("");
  lines.push("(נוסח ראשוני – צוואה הדדית לפי סעיף 8א לחוק הירושה, תשכ\"ה–1965)");
  lines.push("");
  lines.push(`${today}`);
  lines.push("");

  // --- Joint declaration ---
  lines.push(`אנו הח\"מ, ${name}, ת\"ז ${idNum}, מרחוב ${address}, ובן/בת זוגו/ה ___________,  ת\"ז ___________, מצהירים בזאת כי אנו כשירים לצוות, פועלים בדעה צלולה ומתוך רצון חופשי, ללא כל כפייה, איום, לחץ או השפעה בלתי הוגנת מסוג שהוא.`);
  lines.push("");
  lines.push(`צוואה זו נערכה כצוואה הדדית בהתאם לסעיף 8א לחוק הירושה, תשכ\"ה–1965 (להלן: "החוק"), ומתבססת על רצוננו המשותף ועל ההסתמכות ההדדית כי הוראותיה יישמרו גם לאחר פטירת אחד מאיתנו. צוואה זו מהווה את צוואתנו האחרונה והיא מבטלת כל צוואה קודמת, ככל שנעשתה.`);
  lines.push("");

  // --- 1. Estate scope ---
  lines.push(`${section}. היקף העיזבון`);
  lines.push(`העיזבון כולל את כלל נכסינו, המשותפים והנפרדים, מכל מין וסוג שהוא, לרבות: דירות מגורים, מקרקעין מכל סוג, חשבונות בנק, פיקדונות, קרנות השתלמות, קופות גמל, זכויות פנסיה, זכויות סוציאליות, מניות, ניירות ערך, תכולת בית, מיטלטלין, כלי רכב, זכויות חוזיות, זכויות תביעה, כספים, זכויות מסחריות, מוניטין עסק ונכסים דיגיטליים.`);
  lines.push(`כל נכס שיירכש, ייווצר או יתווסף לאחר עריכת צוואה זו ייחשב כחלק מן העיזבון ויחול עליו דין צוואה זו, אלא אם הוחרג במפורש.`);
  lines.push("");
  section++;

  // --- 2. Simultaneous death ---
  lines.push(`${section}. פטירה בו-זמנית או פטירת שני בני הזוג`);
  lines.push(`אם שנינו נלך לעולמנו, בין במועד אחד ובין בנסיבות שלא ניתן לקבוע מי מאיתנו נפטר ראשון, אנו מצווים כי כל העיזבון, מכל מין וסוג שהוא, יועבר לילדינו:`);

  if (childrenNames.length > 0) {
    const share = (100 / childrenNames.length).toFixed(0);
    childrenNames.forEach((child, i) => {
      lines.push(`   ${i + 1}. ${child} – ${share}% מן העיזבון.`);
    });
  } else {
    lines.push(`   [יש להשלים שמות הילדים ואחוזי חלוקה]`);
  }

  lines.push(`ככל שאחד מהילדים הלך לעולמו לפני קבלת חלקו בעיזבון, יעבור חלקו לצאצאיו ("נכדים") בלבד, בחלקים שווים ביניהם לפי דין.`);
  lines.push("");
  section++;

  // --- 3. Specific assets (optional listing) ---
  if (yes(a.specialAssetInstruction) || yes(a.hasRealEstate)) {
    lines.push(`${section}. נכסים ספציפיים`);
    if (yes(a.hasRealEstate)) {
      lines.push(`   ${section}.1 דירת מגורים ו/או נכסי מקרקעין – [יש להשלים כתובת וגוש/חלקה].`);
    }
    if (yes(a.specialAssetInstruction)) {
      lines.push(`   ${section}.2 נכס מסוים שלגביו נדרשת הוראה ייעודית: ${specialAssetDetails}.`);
    }
    lines.push(`הוראות החלוקה האמורות יחולו גם על הנכסים המפורטים בסעיף זה, מבלי לגרוע מכלליות האמור.`);
    lines.push("");
    section++;
  }

  // --- 4. Neutral appraisal ---
  lines.push(`${section}. שמאות ניטרלית`);
  lines.push(`הערכת שווי של כל נכס – לרבות תכשיטים, מיטלטלין, ניירות ערך או מקרקעין – תבוצע בידי שמאי או שמאים המתמחים בתחום הנכס. השמאי ייבחר בהסכמת לפחות שני יורשים. אם לא תושג הסכמה בתוך 21 ימים, ימנה מנהל העיזבון את השמאי. השומה תהיה סופית ומחייבת את כלל היורשים.`);
  lines.push("");
  section++;

  // --- 5. First spouse death ---
  lines.push(`${section}. הוראות לעת פטירת הראשון מבני הזוג`);
  lines.push(`${section}.1 במקרה של פטירת אחד מאיתנו, אנו מצווים כי כל רכושנו, מכל מין וסוג, כפי שהוגדר בסעיף 1 לעיל, יעבור במלואו, ללא כל יוצא מן הכלל, לבן או לבת הזוג הנותר/ת בחיים (להלן: "בן הזוג הנותר").`);
  lines.push(`${section}.2 בן הזוג הנותר יהיה הזוכה הבלעדי בעיזבון, לרבות דירת המגורים, חשבונות הבנק, הזכויות הסוציאליות, קרנות ההשתלמות, קופות הגמל, הפנסיה, המיטלטלין, הכספים, הזכויות החוזיות וכל נכס מכל סוג שהוא.`);
  lines.push(`${section}.3 מטרת הוראה זו היא להבטיח כי בן הזוג הנותר יוכל להמשיך ולנהל את חייו באופן תקין, ללא פגיעה כלכלית וללא תלות בצדדים אחרים.`);
  lines.push(`${section}.4 רק בן הזוג הנותר בחיים יהיה זכאי לכל העיזבון במלואו בעת הפטירה הראשונה.`);
  lines.push("");
  section++;

  // --- 6. Estate manager ---
  if (yes(a.executorNeeded)) {
    lines.push(`${section}. מינוי מנהל/ת עיזבון והגנות`);
    lines.push(`${section}.1 מנהל/ת העיזבון הממונה על ידינו הוא/היא: ${executorName}.`);
    lines.push(`${section}.2 מנהל/ת העיזבון יפעל/תפעל ללא כל תמורה וללא שכר מסוג כל שהוא.`);
    lines.push(`${section}.3 מנהל/ת העיזבון לא יישא/תישא באחריות אישית לכל נזק, הפסד או טעות שנעשו בתום לב ובמסגרת מילוי התפקיד השוטף, לרבות טעות בשיקול דעת, ובלבד שלא הייתה כוונת מרמה או פעולה בניגוד עניינים מהותי.`);
    lines.push(`${section}.4 מנהל/ת העיזבון יהיה/תהיה רשאי/ת להסתמך על ייעוץ מקצועי (משפטי, שמאי, חשבונאי, פיננסי וכיו"ב), ולפעול בהתאם לייעוץ זה, מבלי שהדבר ייחשב כהפרת חובותיו/ה.`);
    lines.push(`${section}.5 מנהל/ת העיזבון רשאי/ת להוציא הוצאות סבירות הדרושות לביצוע תפקידו/ה, לרבות תשלומים לגורמים מקצועיים או מוסדות, אשר יוחזרו מתוך כספי העיזבון בלבד, ללא רווח אישי.`);
    lines.push(`${section}.6 שום יורש לא יהיה רשאי להעלות טענה או דרישה כנגד מנהל/ת העיזבון לגבי פעולה שנעשתה במסגרת סמכויותיו/ה על פי צוואה זו.`);
    lines.push(`${section}.7 כל פעולה שתיעשה על-ידי מנהל/ת העיזבון במסגרת סמכויותיו/ה תיחשב לפעולה תקפה ומחייבת כלפי כלל היורשים.`);
    lines.push("");
    section++;
  }

  // --- 7. Section 8A cancellation rules ---
  lines.push(`${section}. שינוי וביטול צוואה הדדית לפי סעיף 8א(ב) לחוק הירושה`);
  lines.push(`${section}.1 כל עוד שני בני הזוג בחיים: כל אחד מהמצווים רשאי לבטל או לשנות צוואה זו, כולה או חלקה, ובלבד שימסור לבן הזוג האחר הודעה על כך בכתב ובהתאם לדין.`);
  lines.push(`${section}.2 לאחר פטירת אחד מבני הזוג – כל עוד העיזבון טרם חולק: בן הזוג הנותר רשאי לשנות או לבטל צוואה זו רק אם יסתלק הסתלקות כללית מכל חלקו בעיזבון של בן הזוג שנפטר, ללא החרגות.`);
  lines.push(`${section}.3 לאחר פטירת אחד מבני הזוג – לאחר שהעיזבון חולק: בן הזוג הנותר רשאי לשנות או לבטל צוואה זו רק אם ישיב לעיזבון את כל מה שקיבל מכוח צוואה זו, את שוויו המלא, ללא חריגים.`);
  lines.push(`${section}.4 כל שינוי, תיקון או ביטול של צוואה זו לאחר פטירת אחד מבני הזוג לא יהיה תקף אלא אם נערך בהתאם לאמור בסעיף זה ובהתאם להוראות סעיף 8א(ב) לחוק.`);
  lines.push("");
  section++;

  // --- 8. Reliance declaration ---
  lines.push(`${section}. הצהרת הסתמכות הדדית`);
  lines.push(`הוראות סעיף זה נועדו לשמור על ההסתמכות ההדדית המהווה בסיס לעריכת צוואה זו, ולמנוע שינוי חד-צדדי הפוגע ברצון המשותף של המצווים. כל אחד מאיתנו מצהיר כי עריכת צוואתו מבוססת על הסתמכות מלאה על כך שגם בן/בת הזוג עורך/ת צוואה בנוסח זהה, וכי ללא הסתמכות זו לא היה/הייתה עורך/ת צוואה זו.`);
  lines.push("");
  section++;

  // --- Conflict mechanisms ---
  if (yes(a.conflictRisk) || unsure(a.conflictRisk)) {
    lines.push(`${section}. מנגנוני צמצום מחלוקות`);
    if (
      a.conflictProtection === "כן, לרבות שמאות / הערכת שווי" ||
      a.conflictProtection === "כן, שניהם"
    ) {
      lines.push(`שווי נכסים שיידרש להעריכם לצורך חלוקת העיזבון ייקבע באמצעות חוות דעת של איש מקצוע מתאים, ובמקרה הצורך ייקבע בצוואה הסופית מנגנון בחירה של שמאי או מומחה ניטרלי.`);
    }
    if (
      a.conflictProtection === "כן, לרבות מנגנון נגד התנגדות לצוואה" ||
      a.conflictProtection === "כן, שניהם"
    ) {
      lines.push(`בצוואה הסופית ניתן לשקול סעיף הקובע השלכות ביחס ליורש שינקוט הליך משפטי שמטרתו לסכל את קיום הצוואה, בכפוף לדין.`);
    }
    if (a.conflictProtection === "לא" || !hasValue(a.conflictProtection)) {
      lines.push(`קיים חשש למחלוקת בין יורשים, ומומלץ לבחון בצוואה הסופית מנגנוני הגנה והבהרה.`);
    }
    lines.push("");
    section++;
  }

  // --- Specific charge ---
  if (yes(a.specificCharge)) {
    lines.push(`${section}. חיוב יורש`);
    lines.push(`בהתאם לרצון שהובע, יש להטיל על יורש מסוים חיוב נלווה: ${specificChargeDetails}.`);
    lines.push("");
    section++;
  }

  // --- Digital assets ---
  if (yes(a.digitalAssets) || unsure(a.digitalAssets)) {
    lines.push(`${section}. נכסים דיגיטליים`);
    lines.push(`כלל הנכסים הדיגיטליים, החשבונות המקוונים, הקבצים המאוחסנים בענן, הזכויות הדיגיטליים והמטבעות הדיגיטליים, ככל שקיימים, ייכללו בעיזבון ויטופלו בהתאם להוראות צוואה זו.`);
    lines.push("");
    section++;
  }

  // --- Special circumstances ---
  if (yes(a.specialCircumstances)) {
    lines.push(`${section}. נסיבות מיוחדות`);
    lines.push(`לפי הנתונים שנמסרו, קיימות נסיבות משפחתיות או אישיות מיוחדות: ${specialDetails}. מומלץ לחדד נסיבות אלו בצוואה הסופית כדי למנוע אי-בהירות פרשנית.`);
    lines.push("");
    section++;
  }

  // --- Expenses & debts ---
  lines.push(`${section}. חובות, מסים והוצאות`);
  lines.push(`כל החובות, המסים, ההיטלים, התשלומים, האגרות, ההוצאות המשפטיות והחשבונאיות הנוגעים לעיזבוננו, לרבות הוצאות קבורה וציוד קבורה, ישולמו מתוך כספי העיזבון בטרם יחולק העיזבון בין הזכאים.`);
  lines.push("");
  section++;

  // --- Supplementary ---
  lines.push(`${section}. הוראה כללית משלימה`);
  lines.push(`בכל מקום שבו לא הושלם פרט מסוים בנוסח זה, יש להשלים את זהות היורשים, הנכסים, החלקים וההוראות הספציפיות במסגרת ניסוח סופי ומותאם אישית.`);
  lines.push("");
  section++;

  // --- Signature ---
  lines.push(`${section}. כשרות חתימה`);
  lines.push(`חתימותינו מטה מהוות ראיה חותכת כי קראנו את כל הוראות הצוואה, הבנו את תוכנה ואישרנו אותה מרצוננו החופשי.`);
  lines.push("");
  lines.push(`ולראיה באנו על החתום ביום ${today}.`);
  lines.push("");
  lines.push(`מצווה 1: ${name}`);
  lines.push(`ת.ז.: ${idNum}`);
  lines.push(`חתימה: _______________`);
  lines.push("");
  lines.push(`מצווה 2: _______________`);
  lines.push(`ת.ז.: _______________`);
  lines.push(`חתימה: _______________`);
  lines.push("");
  lines.push(`אנו הח"מ מצהירים בזאת כי שני המצווים חתמו על צוואה זו בפנינו שניהם, לאחר שהצהירו בפנינו כי זוהי צוואתם, וכי הם פועלים בדעה צלולה, מרצון חופשי וללא כל השפעה בלתי הוגנת. אנו מצהירים כי איננו יורשים על פי צוואה זו, איננו נהנים ממנה, ואיננו בני משפחה מדרגה ראשונה של מי מבני הזוג המצווים.`);
  lines.push("");
  lines.push(`עד 1: _______________`);
  lines.push(`ת.ז.: _______________`);
  lines.push(`חתימה: _______________`);
  lines.push("");
  lines.push(`עד 2: _______________`);
  lines.push(`ת.ז.: _______________`);
  lines.push(`חתימה: _______________`);
  lines.push("");
  lines.push("────────────────────────────────────────");
  lines.push("הערה חשובה: מסמך זה הוא נוסח ראשוני וכללי בלבד. הוא אינו מהווה צוואה תקפה, אינו מהווה ייעוץ משפטי, ואינו מחליף התאמה פרטנית, השלמת פרטים ובדיקה משפטית לפני חתימה.");

  return lines.join("\n");
}

function buildRegularWillText(a: Record<string, string>, willType: WillDraftData["willType"]): string {
  const name = clean(a.fullName);
  const idNum = clean(a.idNumber);
  const address = clean(a.address);
  const today = currentDateHe();

  const inheritanceModel = a.inheritanceModel || "";
  const distributionMethod = a.distributionMethod || "";
  const specialAssetDetails = clean(a.specialAssetDetails, "[יש להשלים פרטי נכס והוראה]");
  const substituteHeirMode = a.substituteHeirMode || "";
  const successiveHeirDetails = clean(a.successiveHeirDetails, "[יש להשלים יורש ראשון ויורש שני]");
  const minorChildrenDetails = a.minorChildrenDetails || "";
  const executorName = clean(a.executorName);
  const rightOfFirstRefusalDetails = clean(
    a.rightOfFirstRefusalDetails,
    "[יש להשלים פרטי הנכס ובעל זכות הקדימה]"
  );
  const specificChargeDetails = clean(
    a.specificChargeDetails,
    "[יש להשלים את החיוב המבוקש]"
  );
  const specialDetails = clean(a.specialDetails, "[יש להשלים נסיבות מיוחדות]");
  const childrenNames = splitNames(a.childrenNames);

  const lines: string[] = [];
  let section = 1;

  lines.push("צ ו ו א ה");
  lines.push("");

  if (willType === "צוואה רגילה") {
    lines.push("(נוסח ראשוני – צוואה בכתב)");
  } else {
    lines.push("(נוסח ראשוני – נדרש בירור להשלמת מבנה הצוואה)");
  }
  lines.push("");

  lines.push(`${today}`);
  lines.push("");

  lines.push(
    `אני, ${name}, ת"ז ${idNum}, מרחוב ${address}, מצהיר/ה בזאת כי אני עורך/ת צוואה זו בהיותי כשיר/ה לעשות כן, בדעה צלולה, מרצון חופשי וללא כל כפייה, לחץ, איום או השפעה בלתי הוגנת.`
  );
  lines.push("");

  // Revocation
  lines.push(`${section}. ביטול צוואות קודמות`);
  lines.push(
    `צוואה זו מהווה את צוואתי האחרונה והיא מבטלת כל צוואה, תוספת לצוואה או הוראת צוואה קודמת שנערכו על ידי בעבר, ככל שנערכו.`
  );
  lines.push("");
  section++;

  // Estate scope
  lines.push(`${section}. היקף העיזבון`);
  lines.push(
    `עיזבוני כולל את כלל נכסיי, זכויותיי והתחייבויותיי מכל מין וסוג, לרבות מקרקעין, מיטלטלין, חשבונות בנק, פיקדונות, כספים, זכויות סוציאליות, קרנות, קופות, מניות, ניירות ערך, זכויות חוזיות, זכויות תביעה, נכסים דיגיטליים וכל נכס או זכות אחרים הקיימים כיום או שיתווספו בעתיד, אלא אם הוחרגו במפורש.`
  );
  lines.push("");
  section++;

  // Inheritance structure
  lines.push(`${section}. מבנה כללי של ההורשה`);
  if (inheritanceModel.includes("הכל לבן/בת הזוג") || inheritanceModel.includes("כל העיזבון לבן/בת הזוג")) {
    lines.push(
      `אני מצווה את מלוא עיזבוני לבן/בת זוגי. ככל שיידרש, יש להשלים את פרטי בן/בת הזוג בצוואה הסופית.`
    );
  } else if (inheritanceModel.includes("קודם לבן/בת הזוג") || inheritanceModel.includes("בן/בת הזוג קודם")) {
    lines.push(
      `אני מצווה כי תחילה יעבור עיזבוני לבן/בת הזוג, ולאחר מכן ליורשים הבאים אחריו בהתאם להוראות צוואה זו.`
    );
  } else if (inheritanceModel.includes("לחלק בין") || inheritanceModel.includes("חלוקה ישירה")) {
    lines.push(
      `אני מצווה את עיזבוני לחלוקה ישירה בין כמה יורשים, בהתאם למנגנון החלוקה המפורט בצוואה זו.`
    );
  } else if (inheritanceModel.includes("חלוקה מיוחדת") || inheritanceModel.includes("חלוקה לא שוויונית")) {
    lines.push(
      `אני מצווה את עיזבוני בהתאם לחלוקה מותאמת אישית, שאינה בהכרח שוויונית, כמפורט בצוואה זו.`
    );
  } else {
    lines.push(
      `נדרש בירור נוסף לצורך קביעת מבנה ההורשה המדויק.`
    );
  }
  lines.push("");
  section++;

  // Distribution methods
  if (distributionMethod.includes("שווה בשווה") || distributionMethod === "בחלקים שווים") {
    lines.push(`${section}. אופן החלוקה בין היורשים`);
    if (childrenNames.length > 0) {
      lines.push(
        `החלוקה בין היורשים תהיה בחלקים שווים. בהתאם לנתונים שנמסרו, מדובר ביורשים הבאים: ${childrenNames.join(", ")}.`
      );
    } else {
      lines.push(`החלוקה בין היורשים תהיה בחלקים שווים.`);
    }
    lines.push("");
    section++;
  }

  if (distributionMethod.includes("לא שווים") || distributionMethod === "בחלקים לא שווים") {
    lines.push(`${section}. חלוקה לא שוויונית`);
    lines.push(
      `מדובר בחלוקה שאינה שוויונית. בצוואה הסופית יש לפרט את זהות היורשים ואת שיעור או אופן חלקו של כל אחד מהם בנפרד, כדי למנוע מחלוקת פרשנית.`
    );
    lines.push("");
    section++;
  }

  if (distributionMethod.includes("אחוזים") || distributionMethod === "באחוזים") {
    lines.push(`${section}. חלוקה באחוזים`);
    lines.push(
      `העיזבון יחולק באחוזים בין היורשים. בצוואה הסופית יש להשלים את שמות היורשים ואת שיעור חלקו של כל אחד מהם באחוזים.`
    );
    lines.push("");
    section++;
  }

  if (distributionMethod === "בנכסים מסוימים לכל אחד") {
    lines.push(`${section}. חלוקה לפי נכסים מסוימים`);
    lines.push(
      `ההורשה תתבצע לפי שיוך נכסים מסוימים ליורשים שונים. בצוואה הסופית יש להשלים את זהות הנכסים, את שמות היורשים ואת היחס בין שווי הנכסים לבין שאר רכיבי העיזבון.`
    );
    lines.push("");
    section++;
  }

  // Special asset
  if (yes(a.specialAssetInstruction)) {
    lines.push(`${section}. הוראה מיוחדת לגבי נכס מסוים`);
    lines.push(
      `בהתאם לתשובות שנמסרו, יש נכס מסוים שלגביו נדרשת הוראה ייעודית: ${specialAssetDetails}.`
    );
    lines.push("");
    section++;
  }

  // Substitute heir
  if (yes(a.substituteHeir)) {
    lines.push(`${section}. יורש במקום יורש`);
    if (substituteHeirMode === "חלקו יעבור לצאצאיו") {
      lines.push(
        `אם אחד היורשים ילך לעולמו לפניי או לפני קבלת חלקו בעיזבון, יבואו צאצאיו במקומו ויירשו את חלקו בחלקים שווים ביניהם.`
      );
    } else if (substituteHeirMode === "חלקו יחזור לשאר היורשים היחסיים") {
      lines.push(
        `אם אחד היורשים ילך לעולמו לפניי או לפני קבלת חלקו בעיזבון, יתווסף חלקו ליתר היורשים לפי יחס חלקיהם בעיזבון.`
      );
    } else if (substituteHeirMode === "אדם אחר ייכנס במקומו") {
      lines.push(
        `אם אחד היורשים ילך לעולמו לפניי או לפני קבלת חלקו בעיזבון, יבוא במקומו אדם אחר שיוגדר במפורש בצוואה הסופית.`
      );
    } else {
      lines.push(
        `יש לשלב מנגנון של יורש במקום יורש, בהתאם לזהות היורשים והחלופה הרצויה.`
      );
    }
    lines.push("");
    section++;
  }

  // Successive heir
  if (yes(a.successiveHeir)) {
    lines.push(`${section}. יורש אחר יורש`);
    lines.push(
      `בהתאם לרצון שהובע, יש להחיל מנגנון של "יורש אחר יורש". המנגנון המבוקש הוא: ${successiveHeirDetails}.`
    );
    lines.push(
      `בצוואה הסופית יש להסדיר במפורש את היקף זכויותיו של היורש הראשון, את כוחו לעשות שימוש בנכסים או למוכרם, ואת אופן מעבר הרכוש ליורש הבא אחריו.`
    );
    lines.push("");
    section++;
  }

  // Minor children
  if (yes(a.minorChildren)) {
    lines.push(`${section}. הוראות לגבי קטינים או יורשים שזכאותם נדחית`);
    if (minorChildrenDetails === "ניהול עד גיל מסוים") {
      lines.push(
        `ככל שחלק בעיזבון מיועד לקטין או למי שזכאותו נדחית, ינוהל חלקו עד הגיעו לגיל שייקבע בצוואה הסופית.`
      );
    } else if (minorChildrenDetails === "מסירת הכספים בשלבים") {
      lines.push(
        `ככל שחלק בעיזבון מיועד לקטין או למי שזכאותו נדחית, ניתן לקבוע כי הכספים יימסרו לו בשלבים שייקבעו בצוואה הסופית.`
      );
    } else if (minorChildrenDetails === "מינוי אדם שינהל עד להתקיים תנאי") {
      lines.push(
        `ככל שחלק בעיזבון מיועד לקטין או למי שזכאותו נדחית, ינוהל חלקו בידי אדם שימונה לכך עד להתקיים התנאי שנקבע.`
      );
    } else {
      lines.push(
        `נדרש מנגנון להסדרת ניהול ירושה עבור קטין או עבור יורש שזכאותו נדחית.`
      );
    }
    lines.push("");
    section++;
  }

  // Estate manager
  if (yes(a.executorNeeded)) {
    lines.push(`${section}. מינוי מנהל עיזבון`);
    lines.push(
      `אני ממנה בזאת את ${executorName} כמנהל/ת עיזבוני, והוא/היא יהיה/תהיה מוסמך/ת לפעול לצורך ביצוע הוראות צוואה זו, מימוש נכסים, תשלום חובות, קבלת ייעוץ מקצועי, חלוקת העיזבון וייצוגו מול כל גורם.`
    );
    if (yes(a.executorProtections) || unsure(a.executorProtections)) {
      lines.push(
        `מנהל/ת העיזבון יהיה/תהיה רשאי/ת להסתמך על ייעוץ מקצועי, להוציא הוצאות סבירות מתוך העיזבון, ולא יישא/תישא באחריות אישית לפעולה שנעשתה בתום לב במסגרת מילוי התפקיד, למעט מקרה של מרמה או ניגוד עניינים מהותי.`
      );
    }
    lines.push("");
    section++;
  }

  // Conflict mechanisms
  if (yes(a.conflictRisk) || unsure(a.conflictRisk)) {
    lines.push(`${section}. מנגנוני צמצום מחלוקות`);
    if (
      a.conflictProtection === "כן, לרבות שמאות / הערכת שווי" ||
      a.conflictProtection === "כן, שניהם"
    ) {
      lines.push(
        `שווי נכסים שיידרש להעריכם לצורך חלוקת העיזבון ייקבע באמצעות חוות דעת של איש מקצוע מתאים, ובמקרה הצורך ייקבע בצוואה הסופית מנגנון בחירה של שמאי או מומחה ניטרלי.`
      );
    }
    if (
      a.conflictProtection === "כן, לרבות מנגנון נגד התנגדות לצוואה" ||
      a.conflictProtection === "כן, שניהם"
    ) {
      lines.push(
        `בצוואה הסופית ניתן לשקול סעיף הקובע השלכות ביחס ליורש שינקוט הליך משפטי שמטרתו לסכל את קיום הצוואה, בכפוף לדין.`
      );
    }
    if (
      a.conflictProtection === "לא" ||
      !hasValue(a.conflictProtection)
    ) {
      lines.push(
        `קיים חשש למחלוקת בין יורשים, ומומלץ לבחון בצוואה הסופית מנגנוני הגנה והבהרה.`
      );
    }
    lines.push("");
    section++;
  }

  // Right of first refusal
  if (yes(a.rightOfFirstRefusal)) {
    lines.push(`${section}. זכות קדימה`);
    lines.push(
      `בהתאם לרצון שהובע, יש להעניק זכות קדימה ביחס לנכס מסוים מתוך העיזבון. פרטי הנכס ובעל הזכות: ${rightOfFirstRefusalDetails}.`
    );
    lines.push(
      `בצוואה הסופית יש להסדיר גם את אופן קביעת השווי, לוחות הזמנים למימוש זכות הקדימה, ואפשרות למימון או קיזוז מתוך חלקו של הזכאי בעיזבון.`
    );
    lines.push("");
    section++;
  }

  // Specific charge
  if (yes(a.specificCharge)) {
    lines.push(`${section}. חיוב יורש`);
    lines.push(
      `בהתאם לרצון שהובע, יש להטיל על יורש מסוים חיוב נלווה, כדלקמן: ${specificChargeDetails}.`
    );
    lines.push(
      `בצוואה הסופית יש לקבוע במפורש על מי מוטל החיוב, מה היקפו, ובאילו תנאים הוא יחול.`
    );
    lines.push("");
    section++;
  }

  // Digital assets
  if (yes(a.digitalAssets) || unsure(a.digitalAssets)) {
    lines.push(`${section}. נכסים דיגיטליים`);
    lines.push(
      `כלל הנכסים הדיגיטליים, החשבונות המקוונים, הקבצים המאוחסנים בענן, הזכויות הדיגיטליות והמטבעות הדיגיטליים, ככל שקיימים, ייכללו בעיזבון ויטופלו בהתאם להוראות הצוואה הסופית.`
    );
    lines.push("");
    section++;
  }

  // Burial
  if (yes(a.burialAndMemorial) || unsure(a.burialAndMemorial)) {
    lines.push(`${section}. הוצאות קבורה, שבעה ואזכרות`);
    lines.push(
      `הוצאות הקבורה, ההלוויה, השבעה והוצאות נלוות, ככל שיוחלט לכלול אותן בצוואה הסופית, ישולמו מתוך העיזבון לפני חלוקתו בין הזכאים.`
    );
    lines.push("");
    section++;
  }

  // Special circumstances
  if (yes(a.specialCircumstances)) {
    lines.push(`${section}. נסיבות מיוחדות`);
    lines.push(
      `לפי הנתונים שנמסרו, קיימות נסיבות משפחתיות או אישיות מיוחדות: ${specialDetails}. מומלץ לחדד נסיבות אלו בצוואה הסופית כדי למנוע אי-בהירות פרשנית.`
    );
    lines.push("");
    section++;
  }

  // General supplementary clause
  lines.push(`${section}. הוראה כללית משלימה`);
  lines.push(
    `בכל מקום שבו לא הושלם פרט מסוים בנוסח זה, יש להשלים את זהות היורשים, הנכסים, החלקים וההוראות הספציפיות במסגרת ניסוח סופי ומותאם אישית.`
  );
  lines.push("");
  section++;

  // Signature
  lines.push(`${section}. חתימה`);
  lines.push(`ולראיה באתי על החתום ביום ${today}.`);
  lines.push("");
  lines.push(`שם המצווה: ${name}`);
  lines.push(`ת.ז.: ${idNum}`);
  lines.push(`חתימת המצווה: _______________`);
  lines.push("");
  lines.push(`עד ראשון: _______________`);
  lines.push(`ת.ז.: _______________`);
  lines.push(`חתימה: _______________`);
  lines.push("");
  lines.push(`עד שני: _______________`);
  lines.push(`ת.ז.: _______________`);
  lines.push(`חתימה: _______________`);
  lines.push("");
  lines.push("────────────────────────────────────────");
  lines.push(
    "הערה חשובה: מסמך זה הוא נוסח ראשוני וכללי בלבד. הוא אינו מהווה צוואה תקפה, אינו מהווה ייעוץ משפטי, ואינו מחליף התאמה פרטנית, השלמת פרטים ובדיקה משפטית לפני חתימה."
  );

  return lines.join("\n");
}

export function generateExistingWillReview(answers: Record<string, string>): ReviewResult {
  const issues: string[] = [];

  if (answers.existingWillType === "לא בטוח/ה" || !hasValue(answers.existingWillType)) {
    issues.push("לא ברור מה סוג הצוואה הקיימת, ולכן קשה להעריך אם היא עדיין מתאימה.");
  }

  if (!no(answers.familyChanged)) {
    issues.push("חל שינוי במצב המשפחתי מאז עריכת הצוואה, ולכן ייתכן שנדרש עדכון.");
  }

  if (!no(answers.assetsChanged)) {
    issues.push("נוספו או השתנו נכסים משמעותיים, ויש לבחון אם הם מוסדרים בצוואה.");
  }

  if (!no(answers.mechanismMissing)) {
    issues.push("ייתכן שחסר בצוואה מנגנון מהותי, כגון יורש חלופי, מנהל עיזבון או הוראה לנכס מסוים.");
  }

  if (!no(answers.digitalAssets)) {
    issues.push("קיימים נכסים דיגיטליים שאינם מוסדרים במפורש בצוואה.");
  }

  if (!no(answers.conflictRisk)) {
    issues.push("קיים חשש למחלוקת בין יורשים, ולכן מומלץ לבחון מנגנוני הגנה.");
  }

  const riskLevel =
    issues.length <= 1
      ? "נמוכה"
      : issues.length <= 3
      ? "בינונית"
      : issues.length <= 5
      ? "גבוהה"
      : "גבוהה מאוד";

  const willType = answers.existingWillType || "לא צוין";

  return {
    willType,
    riskLevel,
    issues,
    headline:
      issues.length === 0
        ? "לא זוהו אינדיקציות בולטות לצורך מיידי בעדכון, אך עדיין מומלץ לבצע בדיקה תקופתית."
        : `זוהו ${issues.length} נושאים שמומלץ לבדוק ולעדכן בצוואה הקיימת.`,
  };
}
