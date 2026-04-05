import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

const steps = [
  { num: "1", text: "ענו על מספר שאלות קצרות" },
  { num: "2", text: "קבלו נוסח צוואה מותאם אישית" },
  { num: "3", text: "אפשרות להשלים עם משרדנו" },
];

export const Scene3HowItWorks = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headS = spring({ frame: frame - 8, fps, config: { damping: 18 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 70, direction: "rtl" }}>
      <div style={{
        opacity: interpolate(headS, [0, 1], [0, 1]),
        fontSize: 54, fontWeight: 700, color: "#c9a855",
        textAlign: "center", marginBottom: 100, fontFamily: heebo,
      }}>
        איך זה עובד?
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 50, width: "100%" }}>
        {steps.map((step, i) => {
          const s = spring({ frame: frame - 15 - i * 14, fps, config: { damping: 16 } });
          return (
            <div key={i} style={{
              opacity: interpolate(s, [0, 1], [0, 1]),
              transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`,
              display: "flex", alignItems: "center", gap: 28,
              background: "rgba(201,168,85,0.08)",
              border: "1px solid rgba(201,168,85,0.2)",
              borderRadius: 24, padding: "32px 36px",
            }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "linear-gradient(135deg, #c9a855, #b8943e)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 36, fontWeight: 700, color: "#0f1923",
                flexShrink: 0, fontFamily: heebo,
              }}>
                {step.num}
              </div>
              <div style={{
                fontSize: 38, color: "white", fontWeight: 500,
                fontFamily: heebo, lineHeight: 1.5,
              }}>
                {step.text}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        position: "absolute", bottom: 260,
        opacity: interpolate(spring({ frame: frame - 65, fps, config: { damping: 20 } }), [0, 1], [0, 1]),
        fontSize: 30, color: "rgba(255,255,255,0.5)",
        fontFamily: heebo, fontWeight: 300, textAlign: "center",
      }}>
        משרד עו״ד אלון אלישע — מומחים לדיני ירושה וצוואות
      </div>
    </AbsoluteFill>
  );
};
