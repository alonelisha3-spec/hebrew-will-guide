import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";
import { heebo } from "../fonts";

export const Scene2Problem = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const text1S = spring({ frame: frame - 8, fps, config: { damping: 16 } });
  const text2S = spring({ frame: frame - 25, fps, config: { damping: 16 } });
  const badgeS = spring({ frame: frame - 48, fps, config: { damping: 18 } });

  return (
    <AbsoluteFill>
      <Video
        src={staticFile("videos/scene2-legal.mp4")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        volume={0}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(10,15,24,0.88) 0%, rgba(10,15,24,0.6) 100%)",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        direction: "rtl", padding: 60, textAlign: "center",
      }}>
        <div style={{
          fontSize: 24, fontWeight: 500, color: "#c9a855",
          fontFamily: heebo, letterSpacing: "0.12em", marginBottom: 25,
          opacity: interpolate(text1S, [0, 1], [0, 1]),
        }}>
          משרד עו״ד אלון אלישע
        </div>

        <div style={{
          fontSize: 54, fontWeight: 700, color: "white",
          fontFamily: heebo, lineHeight: 1.5,
          opacity: interpolate(text1S, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(text1S, [0, 1], [30, 0])}px)`,
        }}>
          טכנולוגיה ייחודית
        </div>

        <div style={{
          fontSize: 50, fontWeight: 600, color: "#c9a855",
          fontFamily: heebo, lineHeight: 1.5, marginTop: 8,
          opacity: interpolate(text2S, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(text2S, [0, 1], [25, 0])}px)`,
        }}>
          שמוזילה עלויות
          <br />
          ומשפרת איכות
        </div>

        <div style={{
          marginTop: 45,
          opacity: interpolate(badgeS, [0, 1], [0, 1]),
          transform: `scale(${interpolate(badgeS, [0, 1], [0.8, 1])})`,
        }}>
          <div style={{
            background: "rgba(201,168,85,0.12)", border: "1.5px solid rgba(201,168,85,0.35)",
            borderRadius: 14, padding: "16px 30px",
          }}>
            <span style={{ fontSize: 30, fontWeight: 600, color: "white", fontFamily: heebo }}>
              צוואה מקצועית — בלי מחירים מנופחים
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
