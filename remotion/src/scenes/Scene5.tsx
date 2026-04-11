import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

export const Scene5CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame: frame - 3, fps, config: { damping: 14, stiffness: 140 } });
  const subS = spring({ frame: frame - 18, fps, config: { damping: 20 } });
  const btnS = spring({ frame: frame - 30, fps, config: { damping: 10, stiffness: 180 } });
  const urlS = spring({ frame: frame - 45, fps, config: { damping: 20 } });

  // Pulsing button glow
  const btnPulse = 1 + Math.sin(frame * 0.15) * 0.03;
  const glowPulse = 0.4 + Math.sin(frame * 0.15) * 0.15;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", direction: "rtl", padding: 60 }}>
      {/* Radial gold glow */}
      <div style={{
        position: "absolute",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,85,0.1) 0%, transparent 60%)",
        filter: "blur(50px)",
      }} />

      <div style={{ textAlign: "center" }}>
        <div style={{
          fontSize: 64, fontWeight: 700, color: "white",
          fontFamily: heebo, lineHeight: 1.4,
          opacity: interpolate(titleS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleS, [0, 1], [50, 0])}px)`,
        }}>
          אל תחכו.
          <br />
          <span style={{ color: "#c9a855" }}>תתחילו עכשיו.</span>
        </div>

        <div style={{
          fontSize: 34, fontWeight: 400, color: "rgba(255,255,255,0.7)",
          fontFamily: heebo, marginTop: 25, lineHeight: 1.6,
          opacity: interpolate(subS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(subS, [0, 1], [25, 0])}px)`,
        }}>
          בדיקה מהירה בחינם
          <br />
          ללא התחייבות
        </div>

        {/* CTA Button */}
        <div style={{
          marginTop: 50,
          opacity: interpolate(btnS, [0, 1], [0, 1]),
          transform: `scale(${interpolate(btnS, [0, 1], [0.5, 1]) * btnPulse})`,
        }}>
          <div style={{
            background: "linear-gradient(135deg, #c9a855 0%, #e0c068 50%, #c9a855 100%)",
            borderRadius: 20, padding: "28px 70px",
            boxShadow: `0 0 ${60 * glowPulse}px rgba(201,168,85,${glowPulse})`,
          }}>
            <span style={{
              fontSize: 44, fontWeight: 700, color: "#0a0f18",
              fontFamily: heebo,
            }}>
              בואו נתחיל ←
            </span>
          </div>
        </div>

        {/* URL */}
        <div style={{
          marginTop: 40,
          opacity: interpolate(urlS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(urlS, [0, 1], [15, 0])}px)`,
        }}>
          <div style={{
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 12, padding: "14px 40px", display: "inline-block",
          }}>
            <span style={{
              fontSize: 30, fontWeight: 500, color: "#c9a855",
              fontFamily: heebo, letterSpacing: "0.03em", direction: "ltr",
            }}>
              hebrew-will-guide.lovable.app
            </span>
          </div>
        </div>

        {/* Badge */}
        <div style={{
          position: "absolute", bottom: 50, left: "50%", transform: "translateX(-50%)",
          opacity: interpolate(urlS, [0, 1], [0, 0.6]),
          fontSize: 24, color: "rgba(255,255,255,0.4)", fontFamily: heebo,
        }}>
          משרד עו״ד אלון אלישע
        </div>
      </div>
    </AbsoluteFill>
  );
};
