import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";
import { heebo } from "../fonts";

export const Scene1Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textS = spring({ frame: frame - 12, fps, config: { damping: 20 } });
  const subS = spring({ frame: frame - 32, fps, config: { damping: 18 } });

  return (
    <AbsoluteFill>
      <Video
        src={staticFile("videos/scene1-family.mp4")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        volume={0}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.1) 100%)",
      }} />

      <div style={{
        position: "absolute", bottom: 120, left: 0, right: 0,
        textAlign: "center", direction: "rtl", padding: "0 50px",
      }}>
        <div style={{
          fontSize: 66, fontWeight: 700, color: "white",
          fontFamily: heebo, lineHeight: 1.4,
          opacity: interpolate(textS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(textS, [0, 1], [40, 0])}px)`,
          textShadow: "0 4px 25px rgba(0,0,0,0.6)",
        }}>
          להגן על המשפחה שלכם
        </div>
        <div style={{
          fontSize: 40, fontWeight: 500, color: "#c9a855",
          fontFamily: heebo, marginTop: 15,
          opacity: interpolate(subS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(subS, [0, 1], [20, 0])}px)`,
          textShadow: "0 2px 15px rgba(0,0,0,0.5)",
        }}>
          מתחיל בצוואה נכונה
        </div>
      </div>
    </AbsoluteFill>
  );
};
