import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";
import { heebo } from "../fonts";

export const Scene3Solution = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const subS = spring({ frame: frame - 30, fps, config: { damping: 18 } });
  const resultS = spring({ frame: frame - 50, fps, config: { damping: 14 } });
  const firmS = spring({ frame: frame - 65, fps, config: { damping: 18 } });

  return (
    <AbsoluteFill>
      <Video src={staticFile("videos/scene3-tech.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(0,10,20,0.45) 0%, rgba(0,10,20,0.65) 50%, rgba(0,10,20,0.8) 100%)",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        direction: "rtl", padding: 60, textAlign: "center",
      }}>
        <div style={{
          fontSize: 40, fontWeight: 500, color: "rgba(255,255,255,0.7)",
          fontFamily: heebo,
          opacity: interpolate(titleS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleS, [0, 1], [30, 0])}px)`,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}>
          שילוב של
        </div>

        <div style={{
          display: "flex", gap: 40, marginTop: 25, alignItems: "center",
          opacity: interpolate(subS, [0, 1], [0, 1]),
          transform: `scale(${interpolate(subS, [0, 1], [0.8, 1])})`,
        }}>
          <div style={{
            fontSize: 48, fontWeight: 700, color: "#7cb8ff",
            fontFamily: heebo, textShadow: "0 0 25px rgba(100,160,255,0.3)",
          }}>
            טכנולוגיה
          </div>
          <div style={{ fontSize: 48, color: "rgba(255,255,255,0.4)" }}>+</div>
          <div style={{
            fontSize: 48, fontWeight: 700, color: "#e8c96a",
            fontFamily: heebo, textShadow: "0 0 25px rgba(232,201,106,0.3)",
          }}>
            משפט
          </div>
        </div>

        <div style={{
          width: interpolate(
            spring({ frame: frame - 45, fps, config: { damping: 15 } }),
            [0, 1], [0, 400]
          ),
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(232,201,106,0.5), transparent)",
          margin: "40px 0",
        }} />

        <div style={{
          fontSize: 50, fontWeight: 700, color: "white",
          fontFamily: heebo, lineHeight: 1.5,
          opacity: interpolate(resultS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(resultS, [0, 1], [40, 0])}px)`,
          textShadow: "0 4px 20px rgba(0,0,0,0.6)",
        }}>
          צוואה מקצועית — בלי מחירים מנופחים
        </div>

        <div style={{
          fontSize: 30, fontWeight: 400, color: "rgba(255,255,255,0.6)",
          fontFamily: heebo, marginTop: 12,
          opacity: interpolate(firmS, [0, 1], [0, 1]),
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}>
          משרד עו״ד אלון אלישע
        </div>
      </div>
    </AbsoluteFill>
  );
};
