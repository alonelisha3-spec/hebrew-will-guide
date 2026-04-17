import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";
import { heebo } from "../fonts";

export const Scene4Proof = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1S = spring({ frame: frame - 8, fps, config: { damping: 14 } });
  const line2S = spring({ frame: frame - 35, fps, config: { damping: 12, stiffness: 140 } });
  const lineWidth = interpolate(
    spring({ frame: frame - 28, fps, config: { damping: 15 } }),
    [0, 1], [0, 550]
  );

  return (
    <AbsoluteFill>
      <Video src={staticFile("videos/scene4-signing.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(5,5,10,0.65) 0%, rgba(5,5,10,0.88) 100%)",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        direction: "rtl", padding: 60, textAlign: "center",
      }}>
        <div style={{
          fontSize: 52, fontWeight: 700, color: "white",
          fontFamily: heebo, lineHeight: 1.4,
          opacity: interpolate(line1S, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line1S, [0, 1], [40, 0])}px)`,
          textShadow: "0 4px 20px rgba(0,0,0,0.7)",
        }}>
          אז למה להמשיך לשלם
        </div>

        <div style={{
          width: lineWidth, height: 2,
          background: "linear-gradient(90deg, transparent, #e8c96a, transparent)",
          margin: "28px 0", borderRadius: 2,
        }} />

        <div style={{
          fontSize: 56, fontWeight: 800, color: "#e8c96a",
          fontFamily: heebo, lineHeight: 1.3,
          opacity: interpolate(line2S, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line2S, [0, 1], [40, 0])}px) scale(${interpolate(line2S, [0, 1], [0.92, 1])})`,
          textShadow: "0 0 30px rgba(232,201,106,0.3), 0 4px 20px rgba(0,0,0,0.6)",
        }}>
          על מה שטכנולוגיה כבר עושה?
        </div>
      </div>
    </AbsoluteFill>
  );
};
