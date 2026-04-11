import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

/* Scene 2 — Problem: Shocking stat + consequences */
export const Scene2Problem = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgShift = interpolate(frame, [0, 120], [0, -15], { extrapolateRight: "clamp" });

  // Big number counter
  const countTo71 = Math.min(71, Math.round(interpolate(frame, [8, 50], [0, 71], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  const numberS = spring({ frame: frame - 5, fps, config: { damping: 14 } });

  // Consequences appear
  const cons = [
    "הירושה תחולק לפי החוק — לא לפי רצונכם",
    "סכסוכים משפחתיים שנמשכים שנים",
    "עלויות משפטיות מיותרות",
  ];

  // Red warning pulse
  const warningPulse = 0.6 + Math.sin(frame * 0.1) * 0.15;

  return (
    <AbsoluteFill>
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(${200 + bgShift}deg, #0a0f18 0%, #1a0f0f 50%, #0a0f18 100%)`,
      }} />

      {/* Warning accent shapes */}
      <div style={{
        position: "absolute", top: 80, right: 80,
        width: 200, height: 200, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(200,60,60,${warningPulse * 0.08}) 0%, transparent 70%)`,
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        direction: "rtl", padding: 60,
      }}>
        {/* Big stat number */}
        <div style={{
          opacity: interpolate(numberS, [0, 1], [0, 1]),
          transform: `scale(${interpolate(numberS, [0, 1], [0.5, 1])})`,
          textAlign: "center",
        }}>
          <div style={{
            fontSize: 160, fontWeight: 700, color: "#e85555",
            fontFamily: heebo, lineHeight: 1,
            textShadow: "0 0 60px rgba(232,85,85,0.3)",
          }}>
            %{countTo71}
          </div>
          <div style={{
            fontSize: 36, fontWeight: 500, color: "rgba(255,255,255,0.7)",
            fontFamily: heebo, marginTop: 10,
            opacity: interpolate(
              spring({ frame: frame - 35, fps, config: { damping: 20 } }),
              [0, 1], [0, 1]
            ),
          }}>
            מהישראלים ללא צוואה תקפה
          </div>
        </div>

        {/* Divider line */}
        <div style={{
          width: interpolate(
            spring({ frame: frame - 42, fps, config: { damping: 15 } }),
            [0, 1], [0, 500]
          ),
          height: 1.5,
          background: "linear-gradient(90deg, transparent, rgba(232,85,85,0.4), transparent)",
          margin: "40px 0",
        }} />

        {/* Consequences list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 800 }}>
          {cons.map((text, i) => {
            const s = spring({ frame: frame - 50 - i * 12, fps, config: { damping: 14 } });
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 18,
                opacity: interpolate(s, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(s, [0, 1], [80, 0])}px)`,
              }}>
                {/* X icon */}
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(232,85,85,0.15)", border: "1.5px solid rgba(232,85,85,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, color: "#e85555", fontWeight: 700, flexShrink: 0,
                }}>
                  ✕
                </div>
                <span style={{
                  fontSize: 32, fontWeight: 400, color: "rgba(255,255,255,0.85)",
                  fontFamily: heebo,
                }}>
                  {text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
