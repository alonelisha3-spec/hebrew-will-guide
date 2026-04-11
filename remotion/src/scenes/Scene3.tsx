import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";
import { heebo } from "../fonts";

const steps = [
  { num: "1", text: "מילוי שאלון קצר באתר" },
  { num: "2", text: "עו״ד בודק ומכין צוואה" },
  { num: "3", text: "צוואה חתומה ומוכנה" },
];

export const Scene3Solution = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame: frame - 3, fps, config: { damping: 16 } });

  return (
    <AbsoluteFill>
      <Video
        src={staticFile("videos/scene3-tech.mp4")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        volume={0}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg, rgba(10,15,24,0.92) 0%, rgba(10,15,24,0.75) 100%)",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        direction: "rtl", padding: 60,
      }}>
        <div style={{
          fontSize: 50, fontWeight: 700, color: "white",
          fontFamily: heebo, textAlign: "center", marginBottom: 55,
          opacity: interpolate(titleS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleS, [0, 1], [30, 0])}px)`,
        }}>
          איך זה עובד?
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 30, width: "100%", maxWidth: 800 }}>
          {steps.map((step, i) => {
            const s = spring({ frame: frame - 18 - i * 15, fps, config: { damping: 14, stiffness: 160 } });
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 25,
                opacity: interpolate(s, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(s, [0, 1], [-60, 0])}px)`,
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "rgba(201,168,85,0.15)", border: "1.5px solid rgba(201,168,85,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 36, fontWeight: 700, color: "#c9a855", fontFamily: heebo, flexShrink: 0,
                }}>
                  {step.num}
                </div>
                <span style={{ fontSize: 36, fontWeight: 500, color: "white", fontFamily: heebo }}>
                  {step.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
