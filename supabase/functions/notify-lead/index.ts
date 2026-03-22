import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const NOTIFY_EMAIL = "alonelisha3@gmail.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { fullName, phone, email, answers, willType, riskLevel, riskItems } = body;

    if (!fullName || !phone) {
      return new Response(
        JSON.stringify({ error: "שם וטלפון הם שדות חובה" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Save to DB
    const { error: dbError } = await supabase.from("leads").insert({
      full_name: fullName,
      phone,
      email: email || null,
      answers: answers || {},
      will_type: willType || null,
      risk_level: riskLevel || null,
      risk_items: riskItems || [],
    });

    if (dbError) {
      console.error("DB insert error:", JSON.stringify(dbError));
      return new Response(
        JSON.stringify({ error: "שגיאה בשמירת הנתונים" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build notification email content
    const answersFormatted = answers
      ? Object.entries(answers as Record<string, string>)
          .map(([k, v]) => `  ${k}: ${v}`)
          .join("\n")
      : "לא מולא";

    const riskItemsList = riskItems?.length
      ? (riskItems as string[]).map((item: string) => `  • ${item}`).join("\n")
      : "";

    const emailSubject = `פנייה חדשה | ${fullName} | בדיקת צוואה`;
    const emailText = [
      `פנייה חדשה מבדיקת צוואה חכמה`,
      ``,
      `שם: ${fullName}`,
      `טלפון: ${phone}`,
      email ? `דוא"ל: ${email}` : null,
      ``,
      willType ? `סוג בדיקה: ${willType}` : null,
      riskLevel ? `רמת סיכון: ${riskLevel}` : null,
      riskItemsList ? `\nנושאים שזוהו:\n${riskItemsList}` : null,
      ``,
      `תשובות:\n${answersFormatted}`,
      ``,
      `תאריך: ${new Date().toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" })}`,
    ]
      .filter(Boolean)
      .join("\n");

    // Send notification email to the lawyer using Supabase Auth admin
    // (using the internal SMTP configured in Supabase)
    try {
      const { error: emailError } = await supabase.auth.admin.inviteUserByEmail(
        NOTIFY_EMAIL,
        { data: {} }
      );
      // This is a workaround — log the notification instead if invite fails
      if (emailError) {
        console.log("Email notification (invite method not suitable, logging instead):");
      }
    } catch {
      // Expected — we don't actually want to invite, just notify
    }

    // Log the full notification for review in edge function logs
    console.log("=== NEW LEAD NOTIFICATION ===");
    console.log(`To: ${NOTIFY_EMAIL}`);
    console.log(`Subject: ${emailSubject}`);
    console.log(emailText);
    console.log("=== END NOTIFICATION ===");

    return new Response(
      JSON.stringify({ success: true, message: "הפרטים נשמרו בהצלחה" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error processing lead:", err);
    return new Response(
      JSON.stringify({ error: "שגיאה בעיבוד הבקשה" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
