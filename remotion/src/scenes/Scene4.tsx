import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";
import { heebo } from "../fonts";

const steps = [
  { icon: "📝", text: "מילוי שאלון קצר באתר", sub: "5 דקות" },
  { icon: "⚖️", text: "עו״ד בודק ומכין צוואה", sub: "תוך 48 שעות" },
  { icon: "✅", text: "צוואה חתומה ומוכנה", sub: "מסמך משפטי מחייב" },
];

export const Scene4Proof = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame: frame - 3, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill>
      <Video src={staticFile("videos/scene4-signing.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(5,5,10,0.55) 0%, rgba(5,5,10,0.75) 50%, rgba(5,5,10,0.85) 100%)",
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
          textShadow: "0 4px 20px rgba(0,0,0,0.6)",
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
                    width: 3,
                    height: 45 * interpolate(
                      spring({ frame: frame - 35 - i * 20, fps, config: { damping: 20 } }),
                      [0, 1], [0, 1]
                    ),
                    background: "linear-gradient(180deg, rgba(232,201,106,0.5), rgba(232,201,106,0.15))",
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
                    background: "rgba(232,201,106,0.15)",
                    border: "2px solid rgba(232,201,106,0.5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    transform: `scale(${interpolate(iconBounce, [0, 1], [0.3, 1])})`,
                    boxShadow: "0 0 30px rgba(232,201,106,0.15)",
                  }}>
                    <span style={{ fontSize: 36 }}>{step.icon}</span>
                  </div>

                  <div>
                    <div style={{
                      fontSize: 34, fontWeight: 600, color: "white",
                      fontFamily: heebo, lineHeight: 1.4,
                      textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                    }}>
                      {step.text}
                    </div>
                    <div style={{
                      fontSize: 22, fontWeight: 400, color: "#e8c96a",
                      fontFamily: heebo, marginTop: 4,
                      textShadow: "0 1px 5px rgba(0,0,0,0.4)",
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
