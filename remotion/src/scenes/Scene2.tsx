import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";
import { heebo } from "../fonts";

export const Scene2Problem = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelS = spring({ frame: frame - 5, fps, config: { damping: 16 } });

  // Old-school cost items getting struck through
  const oldItems = [
    { label: "פגישות אינסופיות במשרד", price: "₪₪₪" },
    { label: "ניירת, טפסים, בולים", price: "₪₪" },
    { label: "שעות חיוב על תהליך", price: "₪₪₪₪" },
  ];

  return (
    <AbsoluteFill>
      <Video src={staticFile("videos/scene2-documents.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(10,5,0,0.55) 0%, rgba(15,5,5,0.78) 100%)",
      }} />

      {/* Top corner label — like a film stamp */}
      <div style={{
        position: "absolute", top: 60, right: 60,
        opacity: interpolate(labelS, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(labelS, [0, 1], [30, 0])}px)`,
      }}>
        <div style={{
          border: "2px solid rgba(255,123,123,0.6)",
          padding: "8px 20px", borderRadius: 4,
          fontSize: 22, fontWeight: 700, color: "#ff7b7b",
          fontFamily: heebo, letterSpacing: 4, direction: "rtl",
        }}>
          השיטה הישנה
        </div>
      </div>

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        direction: "rtl", padding: 60,
      }}>
        <div style={{
          fontSize: 58, fontWeight: 700, color: "white",
          fontFamily: heebo, textAlign: "center", marginBottom: 50, lineHeight: 1.3,
          opacity: interpolate(
            spring({ frame: frame - 12, fps, config: { damping: 14 } }),
            [0, 1], [0, 1]
          ),
          transform: `translateY(${interpolate(
            spring({ frame: frame - 12, fps, config: { damping: 14 } }),
            [0, 1], [30, 0]
          )}px)`,
          textShadow: "0 3px 20px rgba(0,0,0,0.7)",
        }}>
          על מה אתה <span style={{ color: "#ff7b7b" }}>באמת</span> משלם?
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%", maxWidth: 850 }}>
          {oldItems.map((item, i) => {
            const enter = spring({ frame: frame - 30 - i * 14, fps, config: { damping: 14 } });
            const strike = interpolate(
              spring({ frame: frame - 70 - i * 8, fps, config: { damping: 18 } }),
              [0, 1], [0, 100]
            );

            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                gap: 18, padding: "18px 28px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,123,123,0.2)",
                borderRadius: 10,
                opacity: interpolate(enter, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(enter, [0, 1], [60, 0])}px)`,
              }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <span style={{
                    fontSize: 32, fontWeight: 500, color: "rgba(255,255,255,0.85)",
                    fontFamily: heebo,
                  }}>
                    {item.label}
                  </span>
                  {/* strike-through line */}
                  <div style={{
                    position: "absolute", top: "50%", right: 0,
                    width: `${strike}%`, height: 3,
                    background: "#ff7b7b",
                    transformOrigin: "right",
                  }} />
                </div>
                <span style={{
                  fontSize: 28, fontWeight: 700, color: "#ff7b7b",
                  fontFamily: heebo, letterSpacing: 2,
                }}>
                  {item.price}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
