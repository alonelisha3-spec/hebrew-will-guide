import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

export const Scene5CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const yearS = spring({ frame: frame - 5, fps, config: { damping: 16 } });
  const punchS = spring({ frame: frame - 18, fps, config: { damping: 12, stiffness: 140 } });
  const emphS = spring({ frame: frame - 35, fps, config: { damping: 10, stiffness: 160 } });
  const closingS = spring({ frame: frame - 55, fps, config: { damping: 16 } });
  const urlS = spring({ frame: frame - 70, fps, config: { damping: 18 } });
  const firmS = spring({ frame: frame - 82, fps, config: { damping: 20 } });

  const glowPulse = 0.3 + Math.sin(frame * 0.15) * 0.15;
  const drift = Math.sin(frame * 0.025) * 6;

  return (
    <AbsoluteFill style={{ background: "#0a0f18" }}>
      {/* Subtle gold radial */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 50% 60%, rgba(232,201,106,0.1) 0%, transparent 65%)",
        transform: `translate(${drift}px, ${drift * 0.5}px)`,
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        direction: "rtl", padding: 60, textAlign: "center",
      }}>
        {/* Year */}
        <div style={{
          fontSize: 26, fontWeight: 600, color: "#e8c96a",
          fontFamily: heebo, letterSpacing: 8, marginBottom: 25,
          opacity: interpolate(yearS, [0, 1], [0, 0.85]),
          transform: `translateY(${interpolate(yearS, [0, 1], [15, 0])}px)`,
        }}>
          ‎2026
        </div>

        {/* Main statement */}
        <div style={{
          fontSize: 46, fontWeight: 600, color: "white",
          fontFamily: heebo, lineHeight: 1.4,
          opacity: interpolate(punchS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(punchS, [0, 1], [30, 0])}px)`,
          textShadow: "0 3px 20px rgba(0,0,0,0.7)",
        }}>
          רק <span style={{
            color: "#e8c96a", fontWeight: 800,
            fontSize: 64,
            display: "inline-block",
            transform: `scale(${interpolate(emphS, [0, 1], [0.7, 1])})`,
            opacity: interpolate(emphS, [0, 1], [0, 1]),
            textShadow: "0 0 30px rgba(232,201,106,0.4)",
          }}>פראייר</span> משלם
        </div>

        <div style={{
          fontSize: 38, fontWeight: 500, color: "rgba(255,255,255,0.85)",
          fontFamily: heebo, lineHeight: 1.4, marginTop: 8,
          opacity: interpolate(punchS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(punchS, [0, 1], [30, 0])}px)`,
          textShadow: "0 3px 15px rgba(0,0,0,0.6)",
        }}>
          על מה שטכנולוגיה עושה בשבילו.
        </div>

        {/* Divider */}
        <div style={{
          width: interpolate(
            spring({ frame: frame - 50, fps, config: { damping: 15 } }),
            [0, 1], [0, 350]
          ),
          height: 2,
          background: "linear-gradient(90deg, transparent, #e8c96a, transparent)",
          margin: "32px 0",
        }} />

        {/* Closing line */}
        <div style={{
          fontSize: 36, fontWeight: 700, color: "white",
          fontFamily: heebo, lineHeight: 1.4,
          opacity: interpolate(closingS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(closingS, [0, 1], [20, 0])}px)`,
          textShadow: "0 3px 15px rgba(0,0,0,0.6)",
        }}>
          אל תהיה אחד מהם.
        </div>

        {/* URL button */}
        <div style={{
          marginTop: 45,
          opacity: interpolate(urlS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(urlS, [0, 1], [20, 0])}px)`,
        }}>
          <div style={{
            background: "linear-gradient(135deg, #c9a855 0%, #e8c96a 50%, #c9a855 100%)",
            borderRadius: 14, padding: "20px 50px",
            boxShadow: `0 0 ${40 + glowPulse * 30}px rgba(232,201,106,${glowPulse})`,
            display: "inline-block",
          }}>
            <span style={{
              fontSize: 36, fontWeight: 800, color: "#0a0f18",
              fontFamily: heebo, direction: "ltr", letterSpacing: 1,
            }}>
              elisha-law.com
            </span>
          </div>
        </div>

        <div style={{
          marginTop: 22,
          opacity: interpolate(firmS, [0, 1], [0, 0.6]),
          fontSize: 22, color: "rgba(255,255,255,0.6)", fontFamily: heebo,
          letterSpacing: 2,
        }}>
          משרד עו״ד אלון אלישע
        </div>
      </div>
    </AbsoluteFill>
  );
};
