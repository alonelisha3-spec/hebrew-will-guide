import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";
import { heebo } from "../fonts";

export const Scene2Problem = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelS = spring({ frame: frame - 5, fps, config: { damping: 16 } });
  const titleS = spring({ frame: frame - 12, fps, config: { damping: 14 } });
  const bottomS = spring({ frame: frame - 90, fps, config: { damping: 14 } });

  const items = [
    "שעות איפיון",
    "כתיבת טיוטות",
    "עריכת מסמכים",
  ];

  return (
    <AbsoluteFill>
      <Video src={staticFile("videos/scene2-documents.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(10,5,0,0.55) 0%, rgba(15,5,5,0.82) 100%)",
      }} />

      {/* Top corner label */}
      <div style={{
        position: "absolute", top: 60, right: 60,
        opacity: interpolate(labelS, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(labelS, [0, 1], [30, 0])}px)`,
      }}>
        <div style={{
          border: "2px solid rgba(255,123,123,0.6)",
          padding: "8px 20px", borderRadius: 4,
          fontSize: 22, fontWeight: 700, color: "#ff7b7b",
          fontFamily: heebo, letterSpacing: 4, direction: "rtl",
        }}>
          מה שמשלמים עליו היום
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
          fontFamily: heebo, textAlign: "center", marginBottom: 45, lineHeight: 1.3,
          opacity: interpolate(titleS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleS, [0, 1], [30, 0])}px)`,
          textShadow: "0 3px 20px rgba(0,0,0,0.7)",
        }}>
          על מה משלמים <span style={{ color: "#ff7b7b" }}>בצוואה</span> היום?
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, width: "100%", maxWidth: 750 }}>
          {items.map((text, i) => {
            const enter = spring({ frame: frame - 28 - i * 14, fps, config: { damping: 14 } });
            const strike = interpolate(
              spring({ frame: frame - 65 - i * 8, fps, config: { damping: 18 } }),
              [0, 1], [0, 100]
            );

            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 20,
                padding: "18px 28px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,123,123,0.25)",
                borderRadius: 10,
                opacity: interpolate(enter, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(enter, [0, 1], [60, 0])}px)`,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(255,100,100,0.2)", border: "1.5px solid rgba(255,100,100,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, color: "#ff7b7b", fontWeight: 700, flexShrink: 0,
                }}>
                  ✕
                </div>
                <div style={{ position: "relative", flex: 1 }}>
                  <span style={{
                    fontSize: 34, fontWeight: 500, color: "rgba(255,255,255,0.9)",
                    fontFamily: heebo,
                  }}>
                    {text}
                  </span>
                  <div style={{
                    position: "absolute", top: "50%", right: 0,
                    width: `${strike}%`, height: 3,
                    background: "#ff7b7b",
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom punchline */}
        <div style={{
          marginTop: 35,
          fontSize: 30, fontWeight: 600, color: "#e8c96a",
          fontFamily: heebo, textAlign: "center",
          opacity: interpolate(bottomS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(bottomS, [0, 1], [20, 0])}px)`,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}>
          כל זה — בינה מלאכותית עושה היום בחינם.
        </div>
      </div>
    </AbsoluteFill>
  );
};
