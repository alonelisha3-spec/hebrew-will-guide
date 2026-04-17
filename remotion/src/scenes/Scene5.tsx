import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";
import { heebo } from "../fonts";

export const Scene5CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1S = spring({ frame: frame - 5, fps, config: { damping: 14 } });
  const line2S = spring({ frame: frame - 22, fps, config: { damping: 14 } });
  const line3S = spring({ frame: frame - 40, fps, config: { damping: 10, stiffness: 150 } });
  const urlS = spring({ frame: frame - 60, fps, config: { damping: 18 } });
  const firmS = spring({ frame: frame - 75, fps, config: { damping: 20 } });

  const glowPulse = 0.3 + Math.sin(frame * 0.15) * 0.15;

  return (
    <AbsoluteFill>
      <Video src={staticFile("videos/scene5-home.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(0,5,15,0.5) 0%, rgba(0,5,15,0.75) 100%)",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        direction: "rtl", padding: 60, textAlign: "center",
      }}>
        {/* Three-line manifesto */}
        <div style={{
          fontSize: 54, fontWeight: 700, color: "white",
          fontFamily: heebo, lineHeight: 1.4,
          opacity: interpolate(line1S, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line1S, [0, 1], [30, 0])}px)`,
          textShadow: "0 4px 20px rgba(0,0,0,0.7)",
        }}>
          תשלם על <span style={{ color: "#e8c96a" }}>משפט</span>.
        </div>

        <div style={{
          fontSize: 54, fontWeight: 700, color: "white",
          fontFamily: heebo, lineHeight: 1.4, marginTop: 8,
          opacity: interpolate(line2S, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line2S, [0, 1], [30, 0])}px)`,
          textShadow: "0 4px 20px rgba(0,0,0,0.7)",
        }}>
          לא על <span style={{ color: "#ff7b7b", textDecoration: "line-through" }}>פרוצדורה</span>.
        </div>

        {/* Divider */}
        <div style={{
          width: interpolate(
            spring({ frame: frame - 35, fps, config: { damping: 15 } }),
            [0, 1], [0, 350]
          ),
          height: 2,
          background: "linear-gradient(90deg, transparent, #e8c96a, transparent)",
          margin: "32px 0",
        }} />

        {/* Punchline */}
        <div style={{
          fontSize: 42, fontWeight: 600, color: "rgba(255,255,255,0.92)",
          fontFamily: heebo, lineHeight: 1.4,
          opacity: interpolate(line3S, [0, 1], [0, 1]),
          transform: `scale(${interpolate(line3S, [0, 1], [0.9, 1])})`,
          textShadow: "0 3px 15px rgba(0,0,0,0.6)",
        }}>
          תהיה כמו כולם ב-2026.
        </div>

        {/* URL with glow */}
        <div style={{
          marginTop: 50,
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
          opacity: interpolate(firmS, [0, 1], [0, 0.55]),
          fontSize: 22, color: "rgba(255,255,255,0.55)", fontFamily: heebo,
          letterSpacing: 2,
          textShadow: "0 1px 5px rgba(0,0,0,0.5)",
        }}>
          משרד עו״ד אלון אלישע
        </div>
      </div>
    </AbsoluteFill>
  );
};
