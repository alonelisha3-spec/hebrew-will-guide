import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const Scene1Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineY = interpolate(frame, [0, 25], [1920, 960], { extrapolateRight: "clamp" });
  const lineOpacity = interpolate(frame, [0, 20], [0, 0.3], { extrapolateRight: "clamp" });

  const titleSpring = spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 120 } });
  const titleY = interpolate(titleSpring, [0, 1], [80, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  const subSpring = spring({ frame: frame - 30, fps, config: { damping: 20 } });
  const subOpacity = interpolate(subSpring, [0, 1], [0, 1]);
  const subY = interpolate(subSpring, [0, 1], [40, 0]);

  const badgeSpring = spring({ frame: frame - 50, fps, config: { damping: 15 } });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.5, 1]);
  const badgeOpacity = interpolate(badgeSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 60 }}>
      {/* Decorative gold line */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 2, height: lineY, background: "linear-gradient(180deg, transparent, #c9a855)",
        opacity: lineOpacity,
      }} />

      {/* Badge */}
      <div style={{
        position: "absolute", top: 180,
        opacity: badgeOpacity, transform: `scale(${badgeScale})`,
        background: "rgba(201,168,85,0.12)", border: "1px solid rgba(201,168,85,0.3)",
        borderRadius: 30, padding: "12px 32px",
        fontSize: 28, color: "#c9a855", letterSpacing: "0.15em",
        fontFamily: "sans-serif",
      }}>
        משרד עו״ד אלון אלישע
      </div>

      {/* Main title */}
      <div style={{
        opacity: titleOpacity, transform: `translateY(${titleY}px)`,
        textAlign: "center", direction: "rtl",
      }}>
        <div style={{
          fontSize: 82, fontWeight: 700, color: "white",
          lineHeight: 1.3, fontFamily: "sans-serif",
        }}>
          רוצים להסדיר
        </div>
        <div style={{
          fontSize: 92, fontWeight: 700, color: "#c9a855",
          lineHeight: 1.3, fontFamily: "sans-serif",
        }}>
          צוואה?
        </div>
      </div>

      {/* Subtitle */}
      <div style={{
        position: "absolute", bottom: 400,
        opacity: subOpacity, transform: `translateY(${subY}px)`,
        textAlign: "center", direction: "rtl",
        fontSize: 36, color: "rgba(255,255,255,0.7)",
        lineHeight: 1.6, fontFamily: "sans-serif",
        maxWidth: 800, padding: "0 40px",
      }}>
        קבלו נוסח צוואה מוכן
        <br />
        בהתאמה אישית — תוך 2 דקות
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: "absolute", bottom: 320,
        width: 120, height: 3,
        background: "linear-gradient(90deg, transparent, #c9a855, transparent)",
        opacity: subOpacity,
      }} />
    </AbsoluteFill>
  );
};
