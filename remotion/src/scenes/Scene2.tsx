import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";
import { heebo } from "../fonts";

export const Scene2Problem = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame: frame - 5, fps, config: { damping: 14 } });

  const cons = [
    "הירושה תחולק לפי החוק — לא לפי רצונכם",
    "סכסוכים משפחתיים שנמשכים שנים",
    "עלויות משפטיות מיותרות",
  ];

  return (
    <AbsoluteFill>
      <Video src={staticFile("videos/scene2-documents.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(10,5,0,0.5) 0%, rgba(15,5,5,0.7) 50%, rgba(10,5,0,0.8) 100%)",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        direction: "rtl", padding: 60,
      }}>
        <div style={{
          opacity: interpolate(titleS, [0, 1], [0, 1]),
          transform: `scale(${interpolate(titleS, [0, 1], [0.85, 1])})`,
          textAlign: "center",
        }}>
          <div style={{
            fontSize: 56, fontWeight: 700, color: "#ff7b7b",
            fontFamily: heebo, lineHeight: 1.5,
            textShadow: "0 3px 20px rgba(0,0,0,0.6)",
          }}>
            בלי צוואה תקפה?
          </div>
          <div style={{
            fontSize: 38, fontWeight: 500, color: "rgba(255,255,255,0.8)",
            fontFamily: heebo, marginTop: 12,
            opacity: interpolate(
              spring({ frame: frame - 25, fps, config: { damping: 20 } }),
              [0, 1], [0, 1]
            ),
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}>
            זה מה שעלול לקרות:
          </div>
        </div>

        <div style={{
          width: interpolate(
            spring({ frame: frame - 42, fps, config: { damping: 15 } }),
            [0, 1], [0, 500]
          ),
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(255,123,123,0.5), transparent)",
          margin: "40px 0",
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 800 }}>
          {cons.map((text, i) => {
            const s = spring({ frame: frame - 40 - i * 12, fps, config: { damping: 14 } });
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 18,
                opacity: interpolate(s, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(s, [0, 1], [80, 0])}px)`,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(255,100,100,0.2)", border: "1.5px solid rgba(255,100,100,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, color: "#ff7b7b", fontWeight: 700, flexShrink: 0,
                }}>
                  ✕
                </div>
                <span style={{
                  fontSize: 32, fontWeight: 400, color: "rgba(255,255,255,0.9)",
                  fontFamily: heebo, textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}>
                  {text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
