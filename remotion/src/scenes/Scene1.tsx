import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

export const Scene1Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flash effect at start
  const flash = interpolate(frame, [0, 8], [0.6, 0], { extrapolateRight: "clamp" });

  // Line slashes in
  const lineW = interpolate(frame, [3, 18], [0, 900], { extrapolateRight: "clamp" });

  // Main text - dramatic entrance
  const t1 = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 150 } });
  const t2 = spring({ frame: frame - 15, fps, config: { damping: 14, stiffness: 150 } });

  // Question mark bounces
  const qm = spring({ frame: frame - 25, fps, config: { damping: 8, stiffness: 200 } });

  // Subtle shake on the whole scene
  const shake = frame < 10 ? Math.sin(frame * 8) * 3 : 0;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", direction: "rtl" }}>
      {/* Flash overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "white", opacity: flash, zIndex: 10,
      }} />

      {/* Red accent line */}
      <div style={{
        position: "absolute", top: 320,
        width: lineW, height: 4,
        background: "linear-gradient(90deg, transparent, #e04040, transparent)",
        left: "50%", transform: "translateX(-50%)",
      }} />

      <div style={{ transform: `translateX(${shake}px)`, textAlign: "center" }}>
        <div style={{
          fontSize: 78, fontWeight: 700, color: "white",
          fontFamily: heebo, lineHeight: 1.4,
          opacity: interpolate(t1, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(t1, [0, 1], [80, 0])}px)`,
        }}>
          מה יקרה למשפחה שלכם
        </div>
        <div style={{
          fontSize: 78, fontWeight: 700, color: "#e04040",
          fontFamily: heebo, lineHeight: 1.4,
          opacity: interpolate(t2, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(t2, [0, 1], [80, 0])}px)`,
        }}>
          אם לא תסדרו צוואה
        </div>
        <div style={{
          fontSize: 120, fontWeight: 700, color: "#e04040",
          fontFamily: heebo,
          opacity: interpolate(qm, [0, 1], [0, 1]),
          transform: `scale(${interpolate(qm, [0, 1], [3, 1])})`,
        }}>
          ?
        </div>
      </div>
    </AbsoluteFill>
  );
};
