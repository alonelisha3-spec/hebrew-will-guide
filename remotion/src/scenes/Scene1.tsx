import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

export const Scene1Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1 = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 130 } });
  const line2 = spring({ frame: frame - 35, fps, config: { damping: 14, stiffness: 130 } });
  const lineWidth = interpolate(
    spring({ frame: frame - 28, fps, config: { damping: 15 } }),
    [0, 1], [0, 600]
  );

  // Subtle drift on background
  const drift = Math.sin(frame * 0.02) * 8;

  return (
    <AbsoluteFill style={{ background: "#0a0f18" }}>
      {/* Subtle radial gradient background */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 30% 40%, rgba(232,201,106,0.08) 0%, transparent 60%)",
        transform: `translate(${drift}px, ${drift * 0.5}px)`,
      }} />

      {/* Decorative quote mark */}
      <div style={{
        position: "absolute", top: 120, right: 100,
        fontSize: 220, color: "rgba(232,201,106,0.08)",
        fontFamily: heebo, fontWeight: 800, lineHeight: 1,
        opacity: interpolate(line1, [0, 1], [0, 1]),
      }}>
        ?
      </div>

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        direction: "rtl", padding: "0 80px", textAlign: "center",
      }}>
        <div style={{
          fontSize: 56, fontWeight: 700, color: "white",
          fontFamily: heebo, lineHeight: 1.4,
          opacity: interpolate(line1, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line1, [0, 1], [40, 0])}px)`,
          textShadow: "0 4px 25px rgba(0,0,0,0.7)",
        }}>
          כמה שילמת בפעם האחרונה
        </div>

        <div style={{
          width: lineWidth, height: 2,
          background: "linear-gradient(90deg, transparent, #e8c96a, transparent)",
          margin: "30px 0", borderRadius: 2,
        }} />

        <div style={{
          fontSize: 56, fontWeight: 700, color: "#e8c96a",
          fontFamily: heebo, lineHeight: 1.4,
          opacity: interpolate(line2, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line2, [0, 1], [40, 0])}px)`,
          textShadow: "0 4px 20px rgba(0,0,0,0.6)",
        }}>
          על משהו שאפשר לקבל בחינם?
        </div>
      </div>
    </AbsoluteFill>
  );
};
