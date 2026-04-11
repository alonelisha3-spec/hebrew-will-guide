import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

/* Scene 4 — Process: 3 steps with animated icons */
const steps = [
  { icon: "📝", text: "מילוי שאלון קצר באתר", sub: "5 דקות" },
  { icon: "⚖️", text: "עו״ד בודק ומכין צוואה", sub: "תוך 48 שעות" },
  { icon: "✅", text: "צוואה חתומה ומוכנה", sub: "מסמך משפטי מחייב" },
];

export const Scene4Proof = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame: frame - 3, fps, config: { damping: 14 } });

  const line1 = interpolate(
    spring({ frame: frame - 35, fps, config: { damping: 20 } }),
    [0, 1], [0, 1]
  );
  const line2 = interpolate(
    spring({ frame: frame - 55, fps, config: { damping: 20 } }),
    [0, 1], [0, 1]
  );

  return (
    <AbsoluteFill>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(170deg, #0a0f18 0%, #0f1520 50%, #0a0f18 100%)",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        direction: "rtl", padding: 50,
      }}>
        <div style={{
          fontSize: 50, fontWeight: 700, color: "white",
          fontFamily: heebo, textAlign: "center", marginBottom: 60,
          opacity: interpolate(titleS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleS, [0, 1], [30, 0])}px)`,
        }}>
          איך זה עובד?
        </div>

        <div style={{
          display: "flex", flexDirection: "column", gap: 45,
          width: "100%", maxWidth: 750, position: "relative",
        }}>
          {steps.map((step, i) => {
            const s = spring({ frame: frame - 15 - i * 18, fps, config: { damping: 12, stiffness: 140 } });
            const iconBounce = spring({ frame: frame - 20 - i * 18, fps, config: { damping: 6, stiffness: 200 } });

            return (
              <div key={i} style={{ position: "relative" }}>
                {i < 2 && (
                  <div style={{
                    position: "absolute", right: 38, top: 80,
                    width: 3, height: 45 * (i === 0 ? line1 : line2),
                    background: "linear-gradient(180deg, rgba(201,168,85,0.4), rgba(201,168,85,0.1))",
                    borderRadius: 2,
                  }} />
                )}

                <div style={{
                  display: "flex", alignItems: "center", gap: 25,
                  opacity: interpolate(s, [0, 1], [0, 1]),
                  transform: `translateX(${interpolate(s, [0, 1], [-80, 0])}px)`,
                }}>
                  <div style={{
                    width: 78, height: 78, borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(201,168,85,0.2), rgba(201,168,85,0.05))",
                    border: "2px solid rgba(201,168,85,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    transform: `scale(${interpolate(iconBounce, [0, 1], [0.3, 1])})`,
                    boxShadow: "0 0 30px rgba(201,168,85,0.1)",
                  }}>
                    <span style={{ fontSize: 36 }}>{step.icon}</span>
                  </div>

                  <div>
                    <div style={{
                      fontSize: 34, fontWeight: 600, color: "white",
                      fontFamily: heebo, lineHeight: 1.4,
                    }}>
                      {step.text}
                    </div>
                    <div style={{
                      fontSize: 22, fontWeight: 400, color: "#c9a855",
                      fontFamily: heebo, marginTop: 4,
                    }}>
                      {step.sub}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
