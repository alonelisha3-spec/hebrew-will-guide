import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";

const benefits = [
  { icon: "✅", text: "ללא עלות" },
  { icon: "✅", text: "ללא התחייבות" },
  { icon: "✅", text: "פחות מ-2 דקות" },
  { icon: "✅", text: "התאמה למצב האישי" },
];

export const Scene4Benefits = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headSpring = spring({ frame: frame - 5, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 60, direction: "rtl" }}>
      <div style={{
        opacity: interpolate(headSpring, [0, 1], [0, 1]),
        fontSize: 52, fontWeight: 700, color: "white",
        textAlign: "center", marginBottom: 80, fontFamily: "sans-serif",
      }}>
        מה מקבלים?
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 36, width: "100%" }}>
        {benefits.map((b, i) => {
          const s = spring({ frame: frame - 15 - i * 12, fps, config: { damping: 14, stiffness: 180 } });
          const x = interpolate(s, [0, 1], [-200, 0]);
          const op = interpolate(s, [0, 1], [0, 1]);
          return (
            <div key={i} style={{
              opacity: op, transform: `translateX(${x}px)`,
              display: "flex", alignItems: "center", gap: 24,
              fontSize: 42, color: "white", fontFamily: "sans-serif",
              padding: "20px 30px",
              background: "rgba(255,255,255,0.04)",
              borderRadius: 16,
              borderRight: "4px solid #c9a855",
            }}>
              <span style={{ fontSize: 36 }}>{b.icon}</span>
              <span>{b.text}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
