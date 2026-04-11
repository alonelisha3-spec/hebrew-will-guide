import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from "remotion";
import { heebo } from "../fonts";

const steps = [
  { icon: "📋", text: "ענו על 5 שאלות פשוטות" },
  { icon: "⚡", text: "קבלו טיוטת צוואה מותאמת" },
  { icon: "✅", text: "דברו עם עורך דין להשלמה" },
];

export const Scene3Solution = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame: frame - 3, fps, config: { damping: 16, stiffness: 140 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", direction: "rtl", padding: 60 }}>
      {/* Title */}
      <div style={{
        position: "absolute", top: 160, textAlign: "center",
        opacity: interpolate(titleS, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(titleS, [0, 1], [40, 0])}px)`,
      }}>
        <div style={{ fontSize: 56, fontWeight: 700, color: "#c9a855", fontFamily: heebo }}>
          איך זה עובד?
        </div>
        <div style={{
          width: 120, height: 4, margin: "20px auto",
          background: "linear-gradient(90deg, transparent, #c9a855, transparent)",
        }} />
      </div>

      {/* Steps */}
      <div style={{ marginTop: 80, display: "flex", flexDirection: "column", gap: 40, width: "100%" }}>
        {steps.map((step, i) => {
          const delay = 15 + i * 18;
          const s = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 160 } });
          const slideX = interpolate(s, [0, 1], [200, 0]);

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 30,
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20, padding: "28px 36px",
              opacity: interpolate(s, [0, 1], [0, 1]),
              transform: `translateX(${slideX}px)`,
            }}>
              <div style={{
                fontSize: 50, width: 80, height: 80,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(201,168,85,0.15)", borderRadius: 16,
                flexShrink: 0,
              }}>
                {step.icon}
              </div>
              <div style={{
                fontSize: 38, fontWeight: 600, color: "white",
                fontFamily: heebo, lineHeight: 1.4,
              }}>
                {step.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Time badge */}
      <Sequence from={55}>
        <TimeBadge />
      </Sequence>
    </AbsoluteFill>
  );
};

const TimeBadge = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const badgeS = spring({ frame, fps, config: { damping: 10, stiffness: 200 } });
  return (
    <div style={{
      position: "absolute", bottom: 100,
      background: "#c9a855", borderRadius: 40,
      padding: "16px 50px",
      opacity: interpolate(badgeS, [0, 1], [0, 1]),
      transform: `scale(${interpolate(badgeS, [0, 1], [0.5, 1])})`,
    }}>
      <span style={{ fontSize: 36, fontWeight: 700, color: "#0a0f18", fontFamily: heebo }}>
        ⏱ הכל תוך 2 דקות
      </span>
    </div>
  );
};
