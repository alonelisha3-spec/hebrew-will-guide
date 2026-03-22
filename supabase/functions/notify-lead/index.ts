import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { fullName, phone, email, answers, willType, riskLevel, riskItems, fullDraft } = body;

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
    const leadId = crypto.randomUUID();
    const { error: dbError } = await supabase.from("leads").insert({
      id: leadId,
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

    // Send notification email to the lawyer via transactional email system
    const timestamp = new Date().toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" });
    try {
      const { error: emailError } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "lead-notification",
          recipientEmail: "alonelisha3@gmail.com",
          idempotencyKey: `lead-notify-${leadId}`,
          templateData: {
            fullName,
            phone,
            email: email || "",
            willType: willType || "",
            riskLevel: riskLevel || "",
            riskItems: riskItems || [],
            answers: answers || {},
            fullDraft: fullDraft || "",
            timestamp,
          },
        },
      });

      if (emailError) {
        console.error("Email send error:", emailError);
      } else {
        console.log("Lead notification email enqueued for", fullName);
      }
    } catch (emailErr) {
      console.error("Email invoke error:", emailErr);
    }

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
