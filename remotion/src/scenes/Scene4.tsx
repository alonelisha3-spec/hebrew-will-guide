import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";
import { heebo } from "../fonts";

export const Scene4Proof = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame: frame - 3, fps, config: { damping: 14 } });
  const oldCardS = spring({ frame: frame - 18, fps, config: { damping: 14 } });
  const vsS = spring({ frame: frame - 38, fps, config: { damping: 8, stiffness: 180 } });
  const newCardS = spring({ frame: frame - 50, fps, config: { damping: 12, stiffness: 140 } });
  const newGlow = 0.3 + Math.sin(frame * 0.2) * 0.15;

  return (
    <AbsoluteFill>
      <Video src={staticFile("videos/scene4-signing.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(5,5,10,0.6) 0%, rgba(5,5,10,0.88) 100%)",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        direction: "rtl", padding: 50,
      }}>
        <div style={{
          fontSize: 46, fontWeight: 700, color: "white",
          fontFamily: heebo, textAlign: "center", marginBottom: 50, lineHeight: 1.4,
          opacity: interpolate(titleS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleS, [0, 1], [30, 0])}px)`,
          textShadow: "0 4px 20px rgba(0,0,0,0.6)",
        }}>
          אותה צוואה. <span style={{ color: "#e8c96a" }}>חצי מהמחיר.</span>
        </div>

        {/* Comparison */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 18,
          width: "100%", maxWidth: 780, position: "relative",
        }}>
          {/* OLD card */}
          <div style={{
            opacity: interpolate(oldCardS, [0, 1], [0, 0.55]),
            transform: `translateX(${interpolate(oldCardS, [0, 1], [-50, 0])}px)`,
            background: "rgba(255,123,123,0.08)",
            border: "1.5px solid rgba(255,123,123,0.3)",
            borderRadius: 14, padding: "22px 30px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            filter: `grayscale(${interpolate(oldCardS, [0, 1], [0, 0.6])})`,
          }}>
            <div>
              <div style={{ fontSize: 22, color: "rgba(255,255,255,0.5)", fontFamily: heebo, marginBottom: 4 }}>
                השיטה הישנה
              </div>
              <div style={{ fontSize: 32, fontWeight: 600, color: "rgba(255,255,255,0.7)", fontFamily: heebo, textDecoration: "line-through", textDecorationColor: "#ff7b7b" }}>
                ₪3,000 – ₪6,000
              </div>
            </div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.45)", fontFamily: heebo, textAlign: "left" }}>
              משפט<br />+ פרוצדורה
            </div>
          </div>

          {/* VS badge */}
          <div style={{
            position: "absolute", left: "50%", top: "50%",
            transform: `translate(-50%, -50%) scale(${interpolate(vsS, [0, 1], [0, 1])}) rotate(${interpolate(vsS, [0, 1], [-30, 0])}deg)`,
            opacity: interpolate(vsS, [0, 1], [0, 1]),
            zIndex: 5,
          }}>
            <div style={{
              width: 70, height: 70, borderRadius: "50%",
              background: "#0a0f18",
              border: "2px solid #e8c96a",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, fontWeight: 800, color: "#e8c96a",
              fontFamily: heebo, letterSpacing: 1,
              boxShadow: "0 0 30px rgba(232,201,106,0.4)",
            }}>
              VS
            </div>
          </div>

          {/* NEW card */}
          <div style={{
            opacity: interpolate(newCardS, [0, 1], [0, 1]),
            transform: `translateX(${interpolate(newCardS, [0, 1], [50, 0])}px) scale(${interpolate(newCardS, [0, 1], [0.95, 1])})`,
            background: "linear-gradient(135deg, rgba(232,201,106,0.18) 0%, rgba(232,201,106,0.08) 100%)",
            border: "2px solid rgba(232,201,106,0.7)",
            borderRadius: 14, padding: "22px 30px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            boxShadow: `0 0 ${30 + newGlow * 30}px rgba(232,201,106,${newGlow})`,
          }}>
            <div>
              <div style={{ fontSize: 22, color: "#e8c96a", fontFamily: heebo, marginBottom: 4, fontWeight: 600 }}>
                השיטה שלנו
              </div>
              <div style={{ fontSize: 38, fontWeight: 800, color: "white", fontFamily: heebo }}>
                רק על המשפט
              </div>
            </div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)", fontFamily: heebo, textAlign: "left" }}>
              AI עושה<br />את השאר
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
