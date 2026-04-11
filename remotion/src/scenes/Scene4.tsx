import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

export const Scene4Proof = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const countTo = 850;
  const countProgress = interpolate(frame, [3, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const currentCount = Math.round(countProgress * countTo);

  const numS = spring({ frame: frame - 2, fps, config: { damping: 14, stiffness: 120 } });
  const textS = spring({ frame: frame - 25, fps, config: { damping: 20 } });
  const starsS = spring({ frame: frame - 35, fps, config: { damping: 15 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", direction: "rtl", padding: 60 }}>
      {/* Gold glow */}
      <div style={{
        position: "absolute",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,85,0.12) 0%, transparent 60%)",
        filter: "blur(40px)",
      }} />

      <div style={{ textAlign: "center" }}>
        <div style={{
          fontSize: 180, fontWeight: 700, color: "#c9a855",
          fontFamily: heebo, lineHeight: 1, direction: "ltr",
          opacity: interpolate(numS, [0, 1], [0, 1]),
          transform: `scale(${interpolate(numS, [0, 1], [0.4, 1])})`,
        }}>
          {currentCount.toLocaleString("he-IL")}+
        </div>

        <div style={{
          fontSize: 46, fontWeight: 600, color: "white",
          fontFamily: heebo, marginTop: 15,
          opacity: interpolate(textS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(textS, [0, 1], [25, 0])}px)`,
        }}>
          כבר השתמשו בכלי
        </div>

        {/* Stars */}
        <div style={{
          marginTop: 40, fontSize: 50,
          opacity: interpolate(starsS, [0, 1], [0, 1]),
          transform: `scale(${interpolate(starsS, [0, 1], [0.5, 1])})`,
        }}>
          ⭐⭐⭐⭐⭐
        </div>

        <div style={{
          fontSize: 34, color: "rgba(255,255,255,0.5)",
          fontFamily: heebo, marginTop: 15, fontWeight: 400,
          opacity: interpolate(starsS, [0, 1], [0, 1]),
        }}>
          98% שביעות רצון
        </div>
      </div>
    </AbsoluteFill>
  );
};
