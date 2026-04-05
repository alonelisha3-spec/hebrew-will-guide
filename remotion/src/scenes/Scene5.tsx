import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

export const Scene5CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame: frame - 5, fps, config: { damping: 14 } });
  const btnS = spring({ frame: frame - 35, fps, config: { damping: 11, stiffness: 100 } });
  const urlS = spring({ frame: frame - 60, fps, config: { damping: 20 } });
  const brandS = spring({ frame: frame - 80, fps, config: { damping: 20 } });

  const pulse = Math.sin(frame * 0.08) * 0.025 + 1;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 70, direction: "rtl" }}>
      <div style={{
        position: "absolute",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,85,0.12) 0%, transparent 60%)",
        filter: "blur(40px)",
      }} />

      <div style={{
        opacity: interpolate(titleS, [0, 1], [0, 1]),
        transform: `scale(${interpolate(titleS, [0, 1], [0.8, 1])})`,
        textAlign: "center", marginBottom: 70,
      }}>
        <div style={{ fontSize: 62, fontWeight: 700, color: "white", lineHeight: 1.4, fontFamily: heebo }}>
          אל תחכו.
        </div>
        <div style={{ fontSize: 62, fontWeight: 700, color: "#c9a855", lineHeight: 1.4, fontFamily: heebo }}>
          התחילו עכשיו.
        </div>
      </div>

      <div style={{
        opacity: interpolate(btnS, [0, 1], [0, 1]),
        transform: `scale(${interpolate(btnS, [0, 1], [0.5, 1]) * pulse})`,
        background: "linear-gradient(135deg, #c9a855, #b8943e)",
        borderRadius: 22, padding: "38px 72px",
        fontSize: 44, fontWeight: 700, color: "#0f1923",
        fontFamily: heebo,
        boxShadow: "0 12px 50px rgba(201,168,85,0.3)",
      }}>
        אני רוצה להכין צוואה
      </div>

      <div style={{
        position: "absolute", bottom: 360,
        opacity: interpolate(urlS, [0, 1], [0, 1]),
        fontSize: 28, color: "rgba(255,255,255,0.45)",
        fontFamily: heebo, fontWeight: 300,
      }}>
        hebrew-will-guide.lovable.app
      </div>

      <div style={{
        position: "absolute", bottom: 300,
        opacity: interpolate(urlS, [0, 1], [0, 1]),
        fontSize: 30, color: "#c9a855",
        fontFamily: heebo, fontWeight: 600, letterSpacing: "0.08em",
      }}>
        ללא עלות · ללא התחייבות
      </div>

      {/* Firm branding */}
      <div style={{
        position: "absolute", bottom: 180,
        opacity: interpolate(brandS, [0, 1], [0, 1]),
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      }}>
        <div style={{
          width: 80, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(201,168,85,0.4), transparent)",
        }} />
        <div style={{
          fontSize: 26, color: "rgba(255,255,255,0.4)",
          fontFamily: heebo, fontWeight: 400, marginTop: 12,
        }}>
          משרד עו״ד אלון אלישע
        </div>
        <div style={{
          fontSize: 22, color: "rgba(255,255,255,0.3)",
          fontFamily: heebo, fontWeight: 300,
        }}>
          מומחים לדיני ירושה וצוואות
        </div>
      </div>
    </AbsoluteFill>
  );
};
