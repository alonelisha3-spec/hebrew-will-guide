import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

const steps = [
  { icon: "🖥️", text: "מילוי שאלון קצר באתר" },
  { icon: "⚖️", text: "עו״ד בודק ומכין צוואה" },
  { icon: "✅", text: "צוואה חתומה ומוכנה" },
];

export const Scene3Solution = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame: frame - 3, fps, config: { damping: 16 } });

  return (
    <AbsoluteFill style={{
      background: "linear-gradient(160deg, #0a0f18 0%, #121a2b 100%)",
      justifyContent: "center", alignItems: "center", direction: "rtl", padding: 60,
    }}>
      {/* Gold accent line */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 2, height: interpolate(titleS, [0, 1], [0, 200]),
        background: "linear-gradient(to bottom, #c9a855, transparent)",
      }} />

      <div style={{
        fontSize: 50, fontWeight: 700, color: "white",
        fontFamily: heebo, textAlign: "center", marginBottom: 60,
        opacity: interpolate(titleS, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(titleS, [0, 1], [30, 0])}px)`,
      }}>
        איך זה עובד?
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 35, width: "100%" }}>
        {steps.map((step, i) => {
          const s = spring({ frame: frame - 18 - i * 15, fps, config: { damping: 14, stiffness: 160 } });
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 25,
              opacity: interpolate(s, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(s, [0, 1], [-60, 0])}px)`,
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: "rgba(201,168,85,0.12)", border: "1.5px solid rgba(201,168,85,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 36, flexShrink: 0,
              }}>
                {step.icon}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <span style={{
                  fontSize: 48, fontWeight: 700, color: "#c9a855", fontFamily: heebo,
                }}>
                  {i + 1}.
                </span>
                <span style={{
                  fontSize: 36, fontWeight: 500, color: "white", fontFamily: heebo,
                }}>
                  {step.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
