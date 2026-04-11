import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";
import { heebo } from "../fonts";

export const Scene1Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const questionS = spring({ frame: frame - 25, fps, config: { damping: 14, stiffness: 120 } });
  const subS = spring({ frame: frame - 55, fps, config: { damping: 16 } });
  const lineWidth = interpolate(
    spring({ frame: frame - 50, fps, config: { damping: 12 } }),
    [0, 1], [0, 500]
  );

  return (
    <AbsoluteFill>
      <Video src={staticFile("videos/scene1-family.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

      {/* Dark overlay for text readability */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)",
      }} />

      {/* Text overlay */}
      <div style={{
        position: "absolute", bottom: 160, left: 0, right: 0,
        textAlign: "center", direction: "rtl", padding: "0 60px",
      }}>
        <div style={{
          fontSize: 62, fontWeight: 700, color: "white",
          fontFamily: heebo, lineHeight: 1.5,
          opacity: interpolate(questionS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(questionS, [0, 1], [50, 0])}px)`,
          textShadow: "0 4px 20px rgba(0,0,0,0.6)",
        }}>
          מה יקרה למשפחה שלכם
        </div>

        <div style={{
          width: lineWidth, height: 3,
          background: "linear-gradient(90deg, transparent, #e8c96a, transparent)",
          margin: "15px auto", borderRadius: 2,
        }} />

        <div style={{
          fontSize: 52, fontWeight: 500, color: "#e8c96a",
          fontFamily: heebo, marginTop: 10,
          opacity: interpolate(subS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(subS, [0, 1], [30, 0])}px)`,
          textShadow: "0 3px 15px rgba(0,0,0,0.5)",
        }}>
          ...בלעדיכם?
        </div>
      </div>
    </AbsoluteFill>
  );
};
