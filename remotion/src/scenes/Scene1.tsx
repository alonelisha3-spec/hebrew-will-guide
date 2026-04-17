import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";
import { heebo } from "../fonts";

export const Scene1Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const word1 = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 130 } });
  const word2 = spring({ frame: frame - 40, fps, config: { damping: 12, stiffness: 130 } });
  const word3 = spring({ frame: frame - 65, fps, config: { damping: 10, stiffness: 150 } });
  const lineWidth = interpolate(
    spring({ frame: frame - 55, fps, config: { damping: 12 } }),
    [0, 1], [0, 600]
  );

  return (
    <AbsoluteFill>
      <Video src={staticFile("videos/scene1-home-warm.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.8) 100%)",
      }} />

      {/* Editorial layout — left aligned, asymmetric */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "flex-end",
        direction: "rtl", padding: "0 80px",
      }}>
        <div style={{
          fontSize: 28, fontWeight: 500, color: "#e8c96a",
          fontFamily: heebo, letterSpacing: 8,
          opacity: interpolate(word1, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(word1, [0, 1], [20, 0])}px)`,
          marginBottom: 20,
          textShadow: "0 2px 10px rgba(0,0,0,0.6)",
        }}>
          ‎2026
        </div>

        <div style={{
          fontSize: 88, fontWeight: 800, color: "white",
          fontFamily: heebo, lineHeight: 1.1, letterSpacing: -1,
          opacity: interpolate(word2, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(word2, [0, 1], [40, 0])}px)`,
          textShadow: "0 4px 25px rgba(0,0,0,0.7)",
          textAlign: "right",
        }}>
          צוואה.
        </div>

        <div style={{
          width: lineWidth, height: 3,
          background: "linear-gradient(90deg, #e8c96a, transparent)",
          margin: "20px 0", borderRadius: 2,
        }} />

        <div style={{
          fontSize: 72, fontWeight: 700, color: "#e8c96a",
          fontFamily: heebo, lineHeight: 1.2,
          opacity: interpolate(word3, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(word3, [0, 1], [30, 0])}px)`,
          textShadow: "0 4px 20px rgba(0,0,0,0.6)",
          textAlign: "right",
        }}>
          בלי הסיפורים הישנים.
        </div>
      </div>
    </AbsoluteFill>
  );
};
