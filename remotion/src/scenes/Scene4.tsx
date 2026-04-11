import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";
import { heebo } from "../fonts";

export const Scene4Proof = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Signing image zoom
  const zoom = interpolate(frame, [0, 75], [1.05, 1], { extrapolateRight: "clamp" });
  const overlayS = spring({ frame: frame - 5, fps, config: { damping: 20 } });
  const quoteS = spring({ frame: frame - 20, fps, config: { damping: 16 } });

  return (
    <AbsoluteFill>
      {/* Signing image background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <Img
          src={staticFile("images/signing.jpg")}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: `scale(${zoom})`,
            filter: "brightness(0.4)",
          }}
        />
      </div>

      {/* Centered testimonial card */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        direction: "rtl", padding: 60,
      }}>
        <div style={{
          background: "rgba(10,15,24,0.85)",
          border: "1px solid rgba(201,168,85,0.3)",
          borderRadius: 24, padding: "50px 45px",
          maxWidth: 800, textAlign: "center",
          opacity: interpolate(overlayS, [0, 1], [0, 1]),
          transform: `scale(${interpolate(overlayS, [0, 1], [0.9, 1])})`,
        }}>
          <div style={{
            fontSize: 80, color: "#c9a855", fontFamily: heebo, lineHeight: 1,
            opacity: 0.5, marginBottom: -10,
          }}>
            ״
          </div>
          <div style={{
            fontSize: 34, fontWeight: 500, color: "white",
            fontFamily: heebo, lineHeight: 1.7,
            opacity: interpolate(quoteS, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(quoteS, [0, 1], [15, 0])}px)`,
          }}>
            התהליך היה פשוט ומהיר.
            <br />
            קיבלנו צוואה מקצועית
            <br />
            <span style={{ color: "#c9a855", fontWeight: 700 }}>במחיר שלא ציפינו לו.</span>
          </div>
          <div style={{
            marginTop: 30, fontSize: 24, color: "rgba(255,255,255,0.5)",
            fontFamily: heebo,
            opacity: interpolate(quoteS, [0, 1], [0, 1]),
          }}>
            — לקוח מרוצה
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
