import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";
import { heebo } from "../fonts";

export const Scene1Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom on family image
  const zoom = interpolate(frame, [0, 90], [1, 1.15], { extrapolateRight: "clamp" });
  
  // Text overlay fades in
  const textS = spring({ frame: frame - 10, fps, config: { damping: 20 } });
  const subS = spring({ frame: frame - 30, fps, config: { damping: 18 } });

  return (
    <AbsoluteFill>
      {/* Full-bleed family image with slow Ken Burns zoom */}
      <div style={{
        position: "absolute", inset: 0, overflow: "hidden",
      }}>
        <Img
          src={staticFile("images/family.jpg")}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: `scale(${zoom})`,
          }}
        />
        {/* Dark gradient overlay for text readability */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.1) 100%)",
        }} />
      </div>

      {/* Text at bottom */}
      <div style={{
        position: "absolute", bottom: 120, left: 0, right: 0,
        textAlign: "center", direction: "rtl", padding: "0 50px",
      }}>
        <div style={{
          fontSize: 68, fontWeight: 700, color: "white",
          fontFamily: heebo, lineHeight: 1.4,
          opacity: interpolate(textS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(textS, [0, 1], [40, 0])}px)`,
          textShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}>
          להגן על המשפחה שלכם
        </div>
        <div style={{
          fontSize: 40, fontWeight: 400, color: "#c9a855",
          fontFamily: heebo, marginTop: 15,
          opacity: interpolate(subS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(subS, [0, 1], [20, 0])}px)`,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}>
          מתחיל בצוואה נכונה
        </div>
      </div>
    </AbsoluteFill>
  );
};
