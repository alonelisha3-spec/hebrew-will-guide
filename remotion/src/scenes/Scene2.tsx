import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

export const Scene2Problem = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1S = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 140 } });
  const line2S = spring({ frame: frame - 20, fps, config: { damping: 16 } });
  const line3S = spring({ frame: frame - 40, fps, config: { damping: 16 } });
  const emphS = spring({ frame: frame - 55, fps, config: { damping: 12, stiffness: 180 } });

  // Subtle red pulse
  const pulse = 0.12 + Math.sin(frame * 0.08) * 0.04;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", direction: "rtl", padding: 70 }}>
      {/* Red glow */}
      <div style={{
        position: "absolute",
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(224,64,64,${pulse}) 0%, transparent 60%)`,
        filter: "blur(50px)",
      }} />

      <div style={{ textAlign: "center" }}>
        <div style={{
          fontSize: 52, fontWeight: 600, color: "rgba(255,255,255,0.85)",
          fontFamily: heebo, lineHeight: 1.6,
          opacity: interpolate(line1S, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line1S, [0, 1], [40, 0])}px)`,
        }}>
          בלי צוואה —
        </div>

        <div style={{
          fontSize: 48, fontWeight: 500, color: "rgba(255,255,255,0.7)",
          fontFamily: heebo, lineHeight: 1.6, marginTop: 15,
          opacity: interpolate(line2S, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line2S, [0, 1], [30, 0])}px)`,
        }}>
          מישהו אחר יחליט
        </div>

        <div style={{
          fontSize: 48, fontWeight: 500, color: "rgba(255,255,255,0.7)",
          fontFamily: heebo, lineHeight: 1.6, marginTop: 5,
          opacity: interpolate(line3S, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line3S, [0, 1], [30, 0])}px)`,
        }}>
          מה יקרה עם הרכוש שלכם
        </div>

        {/* Emphasis line */}
        <div style={{
          marginTop: 50,
          opacity: interpolate(emphS, [0, 1], [0, 1]),
          transform: `scale(${interpolate(emphS, [0, 1], [0.8, 1])})`,
        }}>
          <div style={{
            background: "rgba(224,64,64,0.12)", border: "1px solid rgba(224,64,64,0.3)",
            borderRadius: 16, padding: "20px 40px",
          }}>
            <span style={{
              fontSize: 40, fontWeight: 700, color: "#e04040",
              fontFamily: heebo,
            }}>
              זה לא מה שרציתם, נכון?
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
