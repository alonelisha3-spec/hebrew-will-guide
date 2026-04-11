import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

/* Scene 5 — CTA: Free check + website */
export const Scene5CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Shield icon assembles
  const shieldS = spring({ frame: frame - 3, fps, config: { damping: 10, stiffness: 160 } });

  // Text
  const titleS = spring({ frame: frame - 12, fps, config: { damping: 14 } });
  const subS = spring({ frame: frame - 24, fps, config: { damping: 18 } });
  const btnS = spring({ frame: frame - 35, fps, config: { damping: 10, stiffness: 180 } });
  const urlS = spring({ frame: frame - 48, fps, config: { damping: 20 } });

  const btnPulse = 1 + Math.sin(frame * 0.15) * 0.02;
  const glowPulse = 0.25 + Math.sin(frame * 0.15) * 0.15;

  // Radial burst lines
  const burstLines = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30) * (Math.PI / 180);
    const length = interpolate(shieldS, [0, 1], [0, 80 + (i % 3) * 30]);
    const startR = 70;
    return {
      x1: Math.cos(angle) * startR,
      y1: Math.sin(angle) * startR,
      x2: Math.cos(angle) * (startR + length),
      y2: Math.sin(angle) * (startR + length),
      opacity: interpolate(shieldS, [0, 1], [0, 0.12 + (i % 2) * 0.06]),
    };
  });

  return (
    <AbsoluteFill>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, #0a0f18 0%, #12182a 50%, #0a0f18 100%)",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        direction: "rtl",
      }}>
        <div style={{ textAlign: "center", padding: 60 }}>
          {/* Shield icon with burst */}
          <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 35px" }}>
            {/* Burst lines */}
            <svg width="300" height="300" viewBox="-150 -150 300 300"
              style={{ position: "absolute", left: -80, top: -80 }}>
              {burstLines.map((line, i) => (
                <line key={i}
                  x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                  stroke="#c9a855" strokeWidth="1.5" opacity={line.opacity}
                />
              ))}
            </svg>

            {/* Shield SVG */}
            <div style={{
              transform: `scale(${interpolate(shieldS, [0, 1], [0.3, 1])})`,
              opacity: interpolate(shieldS, [0, 1], [0, 1]),
            }}>
              <svg width="140" height="140" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l8 4v6c0 5.25-3.4 9.74-8 11-4.6-1.26-8-5.75-8-11V6l8-4z"
                  fill="rgba(201,168,85,0.15)" stroke="#c9a855" strokeWidth="1.2" />
                <path d="M9 12l2 2 4-4" stroke="#c9a855" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  strokeDasharray="12"
                  strokeDashoffset={interpolate(shieldS, [0, 1], [12, 0])}
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <div style={{
            fontSize: 56, fontWeight: 700, color: "white",
            fontFamily: heebo, lineHeight: 1.5,
            opacity: interpolate(titleS, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleS, [0, 1], [40, 0])}px)`,
          }}>
            בדיקה מהירה בחינם
          </div>

          <div style={{
            fontSize: 34, fontWeight: 400, color: "rgba(255,255,255,0.55)",
            fontFamily: heebo, marginTop: 12, lineHeight: 1.6,
            opacity: interpolate(subS, [0, 1], [0, 1]),
          }}>
            גלו מה המצב שלכם — ללא התחייבות
          </div>

          {/* CTA Button */}
          <div style={{
            marginTop: 45,
            opacity: interpolate(btnS, [0, 1], [0, 1]),
            transform: `scale(${interpolate(btnS, [0, 1], [0.5, 1]) * btnPulse})`,
          }}>
            <div style={{
              background: "linear-gradient(135deg, #c9a855 0%, #ddb862 50%, #c9a855 100%)",
              borderRadius: 18, padding: "24px 60px",
              boxShadow: `0 0 50px rgba(201,168,85,${glowPulse})`,
              display: "inline-block",
            }}>
              <span style={{ fontSize: 40, fontWeight: 700, color: "#0a0f18", fontFamily: heebo }}>
                התחילו עכשיו
              </span>
            </div>
          </div>

          {/* URL */}
          <div style={{
            marginTop: 30,
            opacity: interpolate(urlS, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(urlS, [0, 1], [10, 0])}px)`,
          }}>
            <span style={{
              fontSize: 30, fontWeight: 600, color: "#c9a855",
              fontFamily: heebo, direction: "ltr",
            }}>
              elisha-law.com
            </span>
          </div>

          <div style={{
            marginTop: 20,
            opacity: interpolate(urlS, [0, 1], [0, 0.45]),
            fontSize: 20, color: "rgba(255,255,255,0.35)", fontFamily: heebo,
          }}>
            משרד עו״ד אלון אלישע
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
