import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

const benefits = [
  { icon: "✅", text: "ללא עלות" },
  { icon: "✅", text: "ללא התחייבות" },
  { icon: "⏱️", text: "פחות מ-2 דקות" },
  { icon: "🎯", text: "מותאם למצב האישי שלכם" },
];

export const Scene4Benefits = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headS = spring({ frame: frame - 5, fps, config: { damping: 18 } });
  const freeS = spring({ frame: frame - 90, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 70, direction: "rtl" }}>
      <div style={{
        opacity: interpolate(headS, [0, 1], [0, 1]),
        fontSize: 54, fontWeight: 700, color: "white",
        textAlign: "center", marginBottom: 80, fontFamily: heebo,
      }}>
        מה מקבלים?
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 36, width: "100%" }}>
        {benefits.map((b, i) => {
          const s = spring({ frame: frame - 18 - i * 14, fps, config: { damping: 13, stiffness: 170 } });
          return (
            <div key={i} style={{
              opacity: interpolate(s, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(s, [0, 1], [-180, 0])}px)`,
              display: "flex", alignItems: "center", gap: 24,
              fontSize: 42, color: "white", fontFamily: heebo, fontWeight: 500,
              padding: "22px 32px",
              background: "rgba(255,255,255,0.04)",
              borderRadius: 18,
              borderRight: "4px solid #c9a855",
            }}>
              <span style={{ fontSize: 36 }}>{b.icon}</span>
              <span>{b.text}</span>
            </div>
          );
        })}
      </div>

      {/* Emphasis banner */}
      <div style={{
        position: "absolute", bottom: 280,
        opacity: interpolate(freeS, [0, 1], [0, 1]),
        transform: `scale(${interpolate(freeS, [0, 1], [0.8, 1])})`,
        background: "linear-gradient(135deg, rgba(201,168,85,0.2), rgba(201,168,85,0.08))",
        border: "2px solid rgba(201,168,85,0.4)",
        borderRadius: 20, padding: "22px 50px",
        fontSize: 36, color: "#c9a855", fontFamily: heebo, fontWeight: 700,
        textAlign: "center",
      }}>
        השירות ללא עלות וללא התחייבות
      </div>
    </AbsoluteFill>
  );
};
