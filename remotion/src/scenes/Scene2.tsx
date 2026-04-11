import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

export const Scene2Problem = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Big number counter
  const countTo = 70;
  const countProgress = interpolate(frame, [5, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const currentCount = Math.round(countProgress * countTo);

  const numScale = spring({ frame: frame - 5, fps, config: { damping: 12, stiffness: 100 } });
  const textS = spring({ frame: frame - 35, fps, config: { damping: 20 } });
  const line2S = spring({ frame: frame - 50, fps, config: { damping: 20 } });

  // Pulsing red glow behind number
  const pulse = 0.15 + Math.sin(frame * 0.1) * 0.05;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", direction: "rtl", padding: 60 }}>
      {/* Red glow behind stat */}
      <div style={{
        position: "absolute",
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(224,64,64,${pulse}) 0%, transparent 60%)`,
        filter: "blur(40px)",
      }} />

      <div style={{ textAlign: "center" }}>
        <div style={{
          fontSize: 200, fontWeight: 700, color: "#e04040",
          fontFamily: heebo, lineHeight: 1,
          transform: `scale(${interpolate(numScale, [0, 1], [0.3, 1])})`,
          opacity: interpolate(numScale, [0, 1], [0, 1]),
          direction: "ltr",
        }}>
          {currentCount}%
        </div>

        <div style={{
          fontSize: 48, fontWeight: 600, color: "white",
          fontFamily: heebo, marginTop: 20, lineHeight: 1.5,
          opacity: interpolate(textS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(textS, [0, 1], [30, 0])}px)`,
        }}>
          מהישראלים הולכים בלי צוואה
        </div>

        <div style={{
          fontSize: 36, fontWeight: 400, color: "rgba(255,255,255,0.6)",
          fontFamily: heebo, marginTop: 30, lineHeight: 1.6,
          opacity: interpolate(line2S, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line2S, [0, 1], [20, 0])}px)`,
        }}>
          הרכוש שלכם יחולק לפי החוק —
          <br />
          <span style={{ color: "#c9a855", fontWeight: 600 }}>לא לפי הרצון שלכם</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
