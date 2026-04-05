import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

const problems = [
  "😰  לא יודעים מאיפה להתחיל?",
  "⚖️  חוששים מתהליך מסובך ויקר?",
  "🕐  אין זמן לשבת עם עורך דין?",
];

export const Scene2Problem = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headS = spring({ frame: frame - 8, fps, config: { damping: 18 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 70, direction: "rtl" }}>
      <div style={{
        opacity: interpolate(headS, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(headS, [0, 1], [40, 0])}px)`,
        fontSize: 54, fontWeight: 700, color: "white",
        textAlign: "center", marginBottom: 90, fontFamily: heebo,
      }}>
        אנחנו מכירים את זה
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 44, width: "100%" }}>
        {problems.map((text, i) => {
          const s = spring({ frame: frame - 30 - i * 18, fps, config: { damping: 14, stiffness: 140 } });
          return (
            <div key={i} style={{
              opacity: interpolate(s, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(s, [0, 1], [250, 0])}px)`,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 22, padding: "32px 40px",
              fontSize: 40, color: "rgba(255,255,255,0.9)",
              fontFamily: heebo, fontWeight: 400, textAlign: "right",
            }}>
              {text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
