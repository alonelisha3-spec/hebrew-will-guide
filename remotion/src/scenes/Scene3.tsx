import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";
import { heebo } from "../fonts";

export const Scene3Solution = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelS = spring({ frame: frame - 5, fps, config: { damping: 16 } });
  const aiS = spring({ frame: frame - 18, fps, config: { damping: 10, stiffness: 160 } });
  const handoffS = spring({ frame: frame - 45, fps, config: { damping: 14 } });
  const lawyerS = spring({ frame: frame - 65, fps, config: { damping: 12, stiffness: 140 } });

  // Pulsing AI glow
  const pulse = 0.4 + Math.sin(frame * 0.18) * 0.2;

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
          border: "2px solid rgba(124,184,255,0.6)",
          padding: "8px 20px", borderRadius: 4,
          fontSize: 22, fontWeight: 700, color: "#7cb8ff",
          fontFamily: heebo, letterSpacing: 4, direction: "rtl",
        }}>
          השיטה של 2025
        </div>
      </div>

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        direction: "rtl", padding: 60, textAlign: "center",
      }}>
        {/* AI pill */}
        <div style={{
          display: "flex", alignItems: "center", gap: 18,
          background: "rgba(124,184,255,0.12)",
          border: "2px solid rgba(124,184,255,0.5)",
          borderRadius: 100, padding: "18px 40px",
          opacity: interpolate(aiS, [0, 1], [0, 1]),
          transform: `scale(${interpolate(aiS, [0, 1], [0.7, 1])})`,
          boxShadow: `0 0 40px rgba(124,184,255,${pulse})`,
        }}>
          <div style={{
            width: 14, height: 14, borderRadius: "50%",
            background: "#7cb8ff",
            boxShadow: `0 0 ${15 + pulse * 20}px #7cb8ff`,
          }} />
          <span style={{
            fontSize: 38, fontWeight: 700, color: "#7cb8ff",
            fontFamily: heebo, letterSpacing: 2,
          }}>
            AI עושה את העבודה השחורה
          </span>
        </div>

        {/* Arrow down — handoff */}
        <div style={{
          marginTop: 35, marginBottom: 35,
          opacity: interpolate(handoffS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(handoffS, [0, 1], [-20, 0])}px)`,
        }}>
          <svg width="50" height="60" viewBox="0 0 50 60" fill="none">
            <path d="M25 5 L25 50 M10 38 L25 53 L40 38" stroke="rgba(232,201,106,0.7)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Lawyer pill */}
        <div style={{
          opacity: interpolate(lawyerS, [0, 1], [0, 1]),
          transform: `scale(${interpolate(lawyerS, [0, 1], [0.85, 1])})`,
        }}>
          <div style={{
            fontSize: 30, fontWeight: 500, color: "rgba(255,255,255,0.7)",
            fontFamily: heebo, marginBottom: 10,
          }}>
            ואתה משלם רק על
          </div>
          <div style={{
            fontSize: 64, fontWeight: 800, color: "#e8c96a",
            fontFamily: heebo, lineHeight: 1.2,
            textShadow: "0 0 30px rgba(232,201,106,0.4), 0 4px 20px rgba(0,0,0,0.6)",
          }}>
            המשפט עצמו.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
