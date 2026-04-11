import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

export const Scene2Problem = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1S = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 140 } });
  const line2S = spring({ frame: frame - 22, fps, config: { damping: 16 } });
  const emphS = spring({ frame: frame - 45, fps, config: { damping: 10, stiffness: 180 } });

  // Gold glow
  const pulse = 0.1 + Math.sin(frame * 0.08) * 0.04;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", direction: "rtl", padding: 70 }}>
      <div style={{
        position: "absolute",
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(201,168,85,${pulse}) 0%, transparent 60%)`,
        filter: "blur(50px)",
      }} />

      <div style={{ textAlign: "center" }}>
        <div style={{
          fontSize: 50, fontWeight: 600, color: "rgba(255,255,255,0.85)",
          fontFamily: heebo, lineHeight: 1.6,
          opacity: interpolate(line1S, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line1S, [0, 1], [40, 0])}px)`,
        }}>
          טכנולוגיה ייחודית
        </div>

        <div style={{
          fontSize: 50, fontWeight: 600, color: "#c9a855",
          fontFamily: heebo, lineHeight: 1.6, marginTop: 10,
          opacity: interpolate(line2S, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line2S, [0, 1], [30, 0])}px)`,
        }}>
          שמוזילה עלויות
          <br />
          ומשפרת איכות
        </div>

        <div style={{
          marginTop: 50,
          opacity: interpolate(emphS, [0, 1], [0, 1]),
          transform: `scale(${interpolate(emphS, [0, 1], [0.8, 1])})`,
        }}>
          <div style={{
            background: "rgba(201,168,85,0.1)", border: "1px solid rgba(201,168,85,0.3)",
            borderRadius: 16, padding: "20px 40px",
          }}>
            <span style={{
              fontSize: 36, fontWeight: 600, color: "rgba(255,255,255,0.8)",
              fontFamily: heebo,
            }}>
              צוואה מקצועית — בלי מחירים מנופחים
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
