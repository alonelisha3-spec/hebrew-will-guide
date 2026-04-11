import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

export const Scene1Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeS = spring({ frame: frame - 2, fps, config: { damping: 18 } });
  const titleS = spring({ frame: frame - 8, fps, config: { damping: 14, stiffness: 130 } });
  const subS = spring({ frame: frame - 22, fps, config: { damping: 18 } });
  const tagS = spring({ frame: frame - 35, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", direction: "rtl", padding: 70 }}>
      {/* Badge */}
      <div style={{
        position: "absolute", top: 180,
        opacity: interpolate(badgeS, [0, 1], [0, 1]),
        transform: `scale(${interpolate(badgeS, [0, 1], [0.5, 1])})`,
        background: "rgba(201,168,85,0.12)", border: "1px solid rgba(201,168,85,0.3)",
        borderRadius: 30, padding: "14px 36px",
        fontSize: 28, color: "#c9a855", letterSpacing: "0.1em",
        fontFamily: heebo, fontWeight: 500,
      }}>
        משרד עו״ד אלון אלישע
      </div>

      {/* Main text */}
      <div style={{
        textAlign: "center",
        opacity: interpolate(titleS, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(titleS, [0, 1], [60, 0])}px)`,
      }}>
        <div style={{ fontSize: 72, fontWeight: 700, color: "white", lineHeight: 1.4, fontFamily: heebo }}>
          רוצים להסדיר
        </div>
        <div style={{ fontSize: 80, fontWeight: 700, color: "#c9a855", lineHeight: 1.4, fontFamily: heebo }}>
          צוואה?
        </div>
      </div>

      {/* Sub text */}
      <div style={{
        position: "absolute", bottom: 280,
        opacity: interpolate(subS, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(subS, [0, 1], [20, 0])}px)`,
        textAlign: "center",
        fontSize: 36, color: "rgba(255,255,255,0.7)",
        fontFamily: heebo, fontWeight: 400, lineHeight: 1.7,
      }}>
        עכשיו זה קל, מהיר ומשתלם
      </div>

      {/* Tag */}
      <div style={{
        position: "absolute", bottom: 190,
        opacity: interpolate(tagS, [0, 1], [0, 1]),
        background: "rgba(201,168,85,0.15)", border: "1px solid rgba(201,168,85,0.25)",
        borderRadius: 16, padding: "12px 36px",
        fontSize: 30, color: "#c9a855", fontFamily: heebo, fontWeight: 600,
      }}>
        ללא עלות · ללא התחייבות
      </div>
    </AbsoluteFill>
  );
};
