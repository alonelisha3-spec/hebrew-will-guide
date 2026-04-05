import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";

const steps = [
  { num: "1", text: "ענו על מספר שאלות פשוטות" },
  { num: "2", text: "קבלו נוסח צוואה מותאם אישית" },
  { num: "3", text: "השלימו עם עורך דין מומחה" },
];

export const Scene3HowItWorks = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headSpring = spring({ frame: frame - 5, fps, config: { damping: 20 } });
  const headOp = interpolate(headSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 60, direction: "rtl" }}>
      <div style={{
        opacity: headOp,
        fontSize: 52, fontWeight: 700, color: "#c9a855",
        textAlign: "center", marginBottom: 100, fontFamily: "sans-serif",
      }}>
        איך זה עובד?
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 50, width: "100%" }}>
        {steps.map((step, i) => {
          const s = spring({ frame: frame - 20 - i * 20, fps, config: { damping: 18 } });
          const scale = interpolate(s, [0, 1], [0.7, 1]);
          const op = interpolate(s, [0, 1], [0, 1]);
          return (
            <div key={i} style={{
              opacity: op, transform: `scale(${scale})`,
              display: "flex", alignItems: "center", gap: 30,
              background: "rgba(201,168,85,0.08)",
              border: "1px solid rgba(201,168,85,0.2)",
              borderRadius: 24, padding: "30px 36px",
            }}>
              <div style={{
                width: 70, height: 70, borderRadius: "50%",
                background: "linear-gradient(135deg, #c9a855, #b8943e)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 36, fontWeight: 700, color: "#0f1923",
                flexShrink: 0, fontFamily: "sans-serif",
              }}>
                {step.num}
              </div>
              <div style={{
                fontSize: 38, color: "white", fontWeight: 500,
                fontFamily: "sans-serif", lineHeight: 1.4,
              }}>
                {step.text}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
