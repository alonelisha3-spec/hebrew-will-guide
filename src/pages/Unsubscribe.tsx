import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Status = "loading" | "valid" | "already" | "invalid" | "success" | "error";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    const validate = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${token}`,
          { headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } }
        );
        const data = await res.json();
        if (!res.ok) setStatus("invalid");
        else if (data.valid === false) setStatus("already");
        else setStatus("valid");
      } catch {
        setStatus("invalid");
      }
    };
    validate();
  }, [token]);

  const handleUnsubscribe = async () => {
    try {
      const { error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      setStatus(error ? "error" : "success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6" dir="rtl">
      <div className="max-w-md w-full bg-card rounded-xl p-8 text-center shadow-lg">
        {status === "loading" && <p className="text-muted-foreground">טוען...</p>}
        {status === "valid" && (
          <>
            <h1 className="text-xl font-bold text-foreground mb-4">הסרה מרשימת תפוצה</h1>
            <p className="text-muted-foreground mb-6">לחץ לאישור הסרה מקבלת הודעות מייל.</p>
            <button onClick={handleUnsubscribe} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition">
              אישור הסרה
            </button>
          </>
        )}
        {status === "already" && <p className="text-muted-foreground">כבר הוסרת מרשימת התפוצה.</p>}
        {status === "invalid" && <p className="text-destructive">קישור לא תקין או שפג תוקפו.</p>}
        {status === "success" && <p className="text-primary font-semibold">הוסרת בהצלחה מרשימת התפוצה.</p>}
        {status === "error" && <p className="text-destructive">אירעה שגיאה. נסה שוב.</p>}
      </div>
    </div>
  );
};

export default Unsubscribe;
