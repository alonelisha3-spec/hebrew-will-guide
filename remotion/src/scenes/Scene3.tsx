import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";
import { heebo } from "../fonts";

export const Scene3Solution = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelS = spring({ frame: frame - 5, fps, config: { damping: 16 } });
  const titleS = spring({ frame: frame - 12, fps, config: { damping: 14 } });
  const bottomS = spring({ frame: frame - 95, fps, config: { damping: 14 } });

  const items = [
    "עורך דין אמיתי",
    "שיחה אישית",
    "התאמה לסיפור שלך",
    "ליווי עד החתימה",
  ];

  return (
    <AbsoluteFill>
      <Video src={staticFile("videos/scene3-tech.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(0,10,20,0.55) 0%, rgba(0,10,20,0.85) 100%)",
      }} />

      {/* Top corner label */}
      <div style={{
        position: "absolute", top: 60, right: 60,
        opacity: interpolate(labelS, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(labelS, [0, 1], [30, 0])}px)`,
      }}>
        <div style={{
          border: "2px solid rgba(232,201,106,0.7)",
          padding: "8px 20px", borderRadius: 4,
          fontSize: 22, fontWeight: 700, color: "#e8c96a",
          fontFamily: heebo, letterSpacing: 4, direction: "rtl",
        }}>
          מה שבאמת חשוב — נשאר
        </div>
      </div>

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        direction: "rtl", padding: 60,
      }}>
        <div style={{
          fontSize: 50, fontWeight: 700, color: "white",
          fontFamily: heebo, textAlign: "center", marginBottom: 40, lineHeight: 1.3,
          opacity: interpolate(titleS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleS, [0, 1], [30, 0])}px)`,
          textShadow: "0 3px 20px rgba(0,0,0,0.7)",
        }}>
          האיכות <span style={{ color: "#e8c96a" }}>נשארת</span>.
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18,
          width: "100%", maxWidth: 800,
        }}>
          {items.map((text, i) => {
            const enter = spring({ frame: frame - 25 - i * 10, fps, config: { damping: 14 } });

            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "18px 24px",
                background: "rgba(232,201,106,0.08)",
                border: "1.5px solid rgba(232,201,106,0.4)",
                borderRadius: 10,
                opacity: interpolate(enter, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px)`,
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: "rgba(232,201,106,0.25)",
                  border: "1.5px solid rgba(232,201,106,0.7)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, color: "#e8c96a", fontWeight: 800, flexShrink: 0,
                }}>
                  ✓
                </div>
                <span style={{
                  fontSize: 26, fontWeight: 500, color: "white",
                  fontFamily: heebo,
                }}>
                  {text}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: 35,
          fontSize: 30, fontWeight: 600, color: "rgba(255,255,255,0.85)",
          fontFamily: heebo, textAlign: "center",
          opacity: interpolate(bottomS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(bottomS, [0, 1], [20, 0])}px)`,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}>
          רק הפרוצדורה — מתייתרת.
        </div>
      </div>
    </AbsoluteFill>
  );
};
