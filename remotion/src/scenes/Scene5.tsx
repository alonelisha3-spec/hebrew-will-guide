import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";
import { heebo } from "../fonts";

export const Scene5CTA = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame: frame - 3, fps, config: { damping: 14, stiffness: 140 } });
  const subS = spring({ frame: frame - 18, fps, config: { damping: 20 } });
  const btnS = spring({ frame: frame - 30, fps, config: { damping: 10, stiffness: 180 } });
  const urlS = spring({ frame: frame - 42, fps, config: { damping: 20 } });

  const btnPulse = 1 + Math.sin(frame * 0.15) * 0.02;
  const glowPulse = 0.3 + Math.sin(frame * 0.15) * 0.15;

  return (
    <AbsoluteFill>
      <Video
        src={staticFile("videos/scene5-home.mp4")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        volume={0}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(10,15,24,0.8)",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        direction: "rtl",
      }}>
        <div style={{ textAlign: "center", padding: 60 }}>
          <div style={{
            fontSize: 58, fontWeight: 700, color: "white",
            fontFamily: heebo, lineHeight: 1.5,
            opacity: interpolate(titleS, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleS, [0, 1], [40, 0])}px)`,
          }}>
            בדיקה מהירה בחינם
          </div>

          <div style={{
            fontSize: 36, fontWeight: 400, color: "rgba(255,255,255,0.6)",
            fontFamily: heebo, marginTop: 15, lineHeight: 1.6,
            opacity: interpolate(subS, [0, 1], [0, 1]),
          }}>
            גלו מה המצב שלכם — ללא התחייבות
          </div>

          <div style={{
            marginTop: 50,
            opacity: interpolate(btnS, [0, 1], [0, 1]),
            transform: `scale(${interpolate(btnS, [0, 1], [0.5, 1]) * btnPulse})`,
          }}>
            <div style={{
              background: "linear-gradient(135deg, #c9a855 0%, #ddb862 50%, #c9a855 100%)",
              borderRadius: 18, padding: "26px 65px",
              boxShadow: `0 0 50px rgba(201,168,85,${glowPulse})`,
            }}>
              <span style={{ fontSize: 42, fontWeight: 700, color: "#0a0f18", fontFamily: heebo }}>
                התחילו עכשיו
              </span>
            </div>
          </div>

          <div style={{
            marginTop: 35,
            opacity: interpolate(urlS, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(urlS, [0, 1], [10, 0])}px)`,
          }}>
            <span style={{
              fontSize: 32, fontWeight: 600, color: "#c9a855",
              fontFamily: heebo, direction: "ltr",
            }}>
              elisha-law.com
            </span>
          </div>

          <div style={{
            marginTop: 25,
            opacity: interpolate(urlS, [0, 1], [0, 0.5]),
            fontSize: 22, color: "rgba(255,255,255,0.35)", fontFamily: heebo,
          }}>
            משרד עו״ד אלון אלישע
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
