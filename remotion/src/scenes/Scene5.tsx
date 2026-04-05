import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";

export const Scene5CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame: frame - 5, fps, config: { damping: 15 } });
  const titleOp = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleScale = interpolate(titleSpring, [0, 1], [0.8, 1]);

  const btnSpring = spring({ frame: frame - 30, fps, config: { damping: 12, stiffness: 100 } });
  const btnScale = interpolate(btnSpring, [0, 1], [0.5, 1]);
  const btnOp = interpolate(btnSpring, [0, 1], [0, 1]);

  const urlSpring = spring({ frame: frame - 55, fps, config: { damping: 20 } });
  const urlOp = interpolate(urlSpring, [0, 1], [0, 1]);

  const pulse = Math.sin(frame * 0.1) * 0.03 + 1;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 60, direction: "rtl" }}>
      {/* Gold glow behind CTA */}
      <div style={{
        position: "absolute",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,85,0.12) 0%, transparent 60%)",
        filter: "blur(40px)",
      }} />

      <div style={{
        opacity: titleOp, transform: `scale(${titleScale})`,
        textAlign: "center", marginBottom: 60,
      }}>
        <div style={{
          fontSize: 60, fontWeight: 700, color: "white",
          lineHeight: 1.3, fontFamily: "sans-serif",
        }}>
          אל תחכו.
        </div>
        <div style={{
          fontSize: 60, fontWeight: 700, color: "#c9a855",
          lineHeight: 1.3, fontFamily: "sans-serif",
        }}>
          התחילו עכשיו.
        </div>
      </div>

      <div style={{
        opacity: btnOp, transform: `scale(${btnScale * pulse})`,
        background: "linear-gradient(135deg, #c9a855, #b8943e)",
        borderRadius: 20, padding: "36px 70px",
        fontSize: 44, fontWeight: 700, color: "#0f1923",
        fontFamily: "sans-serif",
        boxShadow: "0 10px 40px rgba(201,168,85,0.3)",
      }}>
        אני רוצה להכין צוואה
      </div>

      <div style={{
        position: "absolute", bottom: 280,
        opacity: urlOp,
        fontSize: 30, color: "rgba(255,255,255,0.5)",
        fontFamily: "sans-serif",
      }}>
        hebrew-will-guide.lovable.app
      </div>

      <div style={{
        position: "absolute", bottom: 200,
        opacity: urlOp,
        fontSize: 26, color: "rgba(201,168,85,0.6)",
        fontFamily: "sans-serif", letterSpacing: "0.12em",
      }}>
        ללא עלות · ללא התחייבות
      </div>
    </AbsoluteFill>
  );
};
