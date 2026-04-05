import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig, Sequence } from "remotion";

const problems = [
  "😰 לא יודעים מאיפה להתחיל?",
  "⚖️ חוששים מתהליך מסובך?",
  "💰 לא רוצים לשלם אלפים?",
];

export const Scene2Problem = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headSpring = spring({ frame: frame - 5, fps, config: { damping: 20 } });
  const headOpacity = interpolate(headSpring, [0, 1], [0, 1]);
  const headY = interpolate(headSpring, [0, 1], [50, 0]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 60, direction: "rtl" }}>
      <div style={{
        opacity: headOpacity, transform: `translateY(${headY}px)`,
        fontSize: 56, fontWeight: 700, color: "white",
        textAlign: "center", marginBottom: 80, fontFamily: "sans-serif",
      }}>
        אנחנו מכירים את זה
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 40, width: "100%" }}>
        {problems.map((text, i) => {
          const s = spring({ frame: frame - 25 - i * 15, fps, config: { damping: 15, stiffness: 150 } });
          const x = interpolate(s, [0, 1], [300, 0]);
          const op = interpolate(s, [0, 1], [0, 1]);
          return (
            <div key={i} style={{
              opacity: op, transform: `translateX(${x}px)`,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20, padding: "30px 40px",
              fontSize: 40, color: "rgba(255,255,255,0.9)",
              fontFamily: "sans-serif", textAlign: "right",
            }}>
              {text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
