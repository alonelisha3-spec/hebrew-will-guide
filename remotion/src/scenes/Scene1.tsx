import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

export const Scene1Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineY = interpolate(frame, [0, 30], [1920, 960], { extrapolateRight: "clamp" });
  const lineOp = interpolate(frame, [0, 25], [0, 0.3], { extrapolateRight: "clamp" });

  const badgeS = spring({ frame: frame - 5, fps, config: { damping: 18 } });
  const titleS = spring({ frame: frame - 15, fps, config: { damping: 16, stiffness: 120 } });
  const subS = spring({ frame: frame - 35, fps, config: { damping: 20 } });
  const tagS = spring({ frame: frame - 50, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 70, direction: "rtl" }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 2, height: lineY,
        background: "linear-gradient(180deg, transparent, #c9a855)",
        opacity: lineOp,
      }} />

      <div style={{
        position: "absolute", top: 200,
        opacity: interpolate(badgeS, [0, 1], [0, 1]),
        transform: `scale(${interpolate(badgeS, [0, 1], [0.5, 1])})`,
        background: "rgba(201,168,85,0.12)", border: "1px solid rgba(201,168,85,0.3)",
        borderRadius: 30, padding: "14px 36px",
        fontSize: 30, color: "#c9a855", letterSpacing: "0.12em",
        fontFamily: heebo, fontWeight: 500,
      }}>
        משרד עו״ד אלון אלישע
      </div>

      <div style={{
        opacity: interpolate(titleS, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(titleS, [0, 1], [60, 0])}px)`,
        textAlign: "center",
      }}>
        <div style={{ fontSize: 80, fontWeight: 700, color: "white", lineHeight: 1.35, fontFamily: heebo }}>
          רוצים להסדיר
        </div>
        <div style={{ fontSize: 90, fontWeight: 700, color: "#c9a855", lineHeight: 1.35, fontFamily: heebo }}>
          צוואה?
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 420,
        opacity: interpolate(subS, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(subS, [0, 1], [30, 0])}px)`,
        textAlign: "center",
        fontSize: 38, color: "rgba(255,255,255,0.75)", lineHeight: 1.7,
        fontFamily: heebo, fontWeight: 400, maxWidth: 820, padding: "0 20px",
      }}>
        קבלו נוסח צוואה מוכן בהתאמה אישית
        <br />
        תוך 2 דקות בלבד
      </div>

      <div style={{
        position: "absolute", bottom: 320,
        opacity: interpolate(tagS, [0, 1], [0, 1]),
        background: "rgba(201,168,85,0.15)", border: "1px solid rgba(201,168,85,0.25)",
        borderRadius: 16, padding: "14px 40px",
        fontSize: 32, color: "#c9a855", fontFamily: heebo, fontWeight: 600,
      }}>
        ללא עלות · ללא התחייבות
      </div>

      <div style={{
        position: "absolute", bottom: 260,
        width: 100, height: 2,
        background: "linear-gradient(90deg, transparent, #c9a855, transparent)",
        opacity: interpolate(tagS, [0, 1], [0, 0.5]),
      }} />
    </AbsoluteFill>
  );
};
