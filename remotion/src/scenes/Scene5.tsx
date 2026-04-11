import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";
import { heebo } from "../fonts";

export const Scene5CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shieldS = spring({ frame: frame - 3, fps, config: { damping: 10, stiffness: 160 } });
  const titleS = spring({ frame: frame - 12, fps, config: { damping: 14 } });
  const subS = spring({ frame: frame - 24, fps, config: { damping: 18 } });
  const btnS = spring({ frame: frame - 35, fps, config: { damping: 10, stiffness: 180 } });
  const urlS = spring({ frame: frame - 48, fps, config: { damping: 20 } });

  const btnPulse = 1 + Math.sin(frame * 0.15) * 0.02;
  const glowPulse = 0.3 + Math.sin(frame * 0.15) * 0.15;

  return (
    <AbsoluteFill>
      <Video src={staticFile("videos/scene5-home.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(0,5,15,0.4) 0%, rgba(0,5,15,0.6) 50%, rgba(0,5,15,0.8) 100%)",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        direction: "rtl",
      }}>
        <div style={{ textAlign: "center", padding: 60 }}>
          {/* Shield */}
          <div style={{
            width: 120, height: 120, margin: "0 auto 30px",
            transform: `scale(${interpolate(shieldS, [0, 1], [0.3, 1])})`,
            opacity: interpolate(shieldS, [0, 1], [0, 1]),
          }}>
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l8 4v6c0 5.25-3.4 9.74-8 11-4.6-1.26-8-5.75-8-11V6l8-4z"
                fill="rgba(232,201,106,0.2)" stroke="#e8c96a" strokeWidth="1.2" />
              <path d="M9 12l2 2 4-4" stroke="#e8c96a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="12"
                strokeDashoffset={interpolate(shieldS, [0, 1], [12, 0])}
              />
            </svg>
          </div>

          <div style={{
            fontSize: 56, fontWeight: 700, color: "white",
            fontFamily: heebo, lineHeight: 1.5,
            opacity: interpolate(titleS, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleS, [0, 1], [40, 0])}px)`,
            textShadow: "0 4px 20px rgba(0,0,0,0.6)",
          }}>
            בדיקה מהירה בחינם
          </div>

          <div style={{
            fontSize: 34, fontWeight: 400, color: "rgba(255,255,255,0.7)",
            fontFamily: heebo, marginTop: 12, lineHeight: 1.6,
            opacity: interpolate(subS, [0, 1], [0, 1]),
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}>
            גלו מה המצב שלכם — ללא התחייבות
          </div>

          <div style={{
            marginTop: 45,
            opacity: interpolate(btnS, [0, 1], [0, 1]),
            transform: `scale(${interpolate(btnS, [0, 1], [0.5, 1]) * btnPulse})`,
          }}>
            <div style={{
              background: "linear-gradient(135deg, #c9a855 0%, #e8c96a 50%, #c9a855 100%)",
              borderRadius: 18, padding: "24px 60px",
              boxShadow: `0 0 50px rgba(232,201,106,${glowPulse})`,
              display: "inline-block",
            }}>
              <span style={{ fontSize: 40, fontWeight: 700, color: "#0a0f18", fontFamily: heebo }}>
                התחילו עכשיו
              </span>
            </div>
          </div>

          <div style={{
            marginTop: 30,
            opacity: interpolate(urlS, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(urlS, [0, 1], [10, 0])}px)`,
          }}>
            <span style={{
              fontSize: 30, fontWeight: 600, color: "#e8c96a",
              fontFamily: heebo, direction: "ltr",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}>
              elisha-law.com
            </span>
          </div>

          <div style={{
            marginTop: 20,
            opacity: interpolate(urlS, [0, 1], [0, 0.5]),
            fontSize: 20, color: "rgba(255,255,255,0.45)", fontFamily: heebo,
            textShadow: "0 1px 5px rgba(0,0,0,0.4)",
          }}>
            משרד עו״ד אלון אלישע
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
