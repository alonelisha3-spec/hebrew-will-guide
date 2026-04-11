import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

/* Scene 3 — Solution: Technology + Law = unique approach */
export const Scene3Solution = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgShift = interpolate(frame, [0, 120], [0, 25], { extrapolateRight: "clamp" });

  // Two circles merging
  const circle1X = interpolate(
    spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 100 } }),
    [0, 1], [-120, -40]
  );
  const circle2X = interpolate(
    spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 100 } }),
    [0, 1], [120, 40]
  );
  const circleOpacity = interpolate(
    spring({ frame: frame - 8, fps, config: { damping: 20 } }),
    [0, 1], [0, 1]
  );

  // Merge flash
  const mergeS = spring({ frame: frame - 35, fps, config: { damping: 8 } });
  const mergeGlow = interpolate(mergeS, [0, 1], [0, 0.4]);

  // Labels
  const label1S = spring({ frame: frame - 20, fps, config: { damping: 16 } });
  const label2S = spring({ frame: frame - 26, fps, config: { damping: 16 } });

  // Result text
  const resultS = spring({ frame: frame - 50, fps, config: { damping: 14 } });
  const subResultS = spring({ frame: frame - 65, fps, config: { damping: 18 } });

  // Orbiting dots around merge point
  const orbitDots = Array.from({ length: 6 }, (_, i) => {
    const angle = (frame * 0.02) + (i * Math.PI / 3);
    const radius = 160 + Math.sin(frame * 0.05 + i) * 15;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      opacity: interpolate(mergeS, [0, 1], [0, 0.25]),
    };
  });

  return (
    <AbsoluteFill>
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(${140 + bgShift}deg, #0a0f18 0%, #0f1a25 50%, #0a0f18 100%)`,
      }} />

      {/* Center visual: two circles merging */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        display: "flex", justifyContent: "center", alignItems: "center",
      }}>
        {/* Orbiting dots */}
        {orbitDots.map((dot, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `calc(50% + ${dot.x}px)`,
            top: `calc(42% + ${dot.y}px)`,
            width: 6, height: 6, borderRadius: "50%",
            background: "#c9a855", opacity: dot.opacity,
          }} />
        ))}

        {/* Circle 1 - Tech */}
        <div style={{
          position: "absolute",
          left: `calc(50% + ${circle1X}px - 80px)`,
          top: "calc(42% - 80px)",
          width: 160, height: 160, borderRadius: "50%",
          border: "2px solid rgba(100,160,255,0.5)",
          background: "rgba(100,160,255,0.08)",
          opacity: circleOpacity,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(100,160,255,0.8)" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
        </div>

        {/* Circle 2 - Law */}
        <div style={{
          position: "absolute",
          left: `calc(50% + ${circle2X}px - 80px)`,
          top: "calc(42% - 80px)",
          width: 160, height: 160, borderRadius: "50%",
          border: "2px solid rgba(201,168,85,0.5)",
          background: "rgba(201,168,85,0.08)",
          opacity: circleOpacity,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,85,0.8)" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>

        {/* Merge glow */}
        <div style={{
          position: "absolute",
          left: "calc(50% - 60px)", top: "calc(42% - 60px)",
          width: 120, height: 120, borderRadius: "50%",
          background: `radial-gradient(circle, rgba(201,168,85,${mergeGlow}) 0%, transparent 70%)`,
        }} />

        {/* Labels */}
        <div style={{
          position: "absolute", left: `calc(50% + ${circle1X}px - 80px)`, top: "calc(42% + 100px)",
          width: 160, textAlign: "center",
          opacity: interpolate(label1S, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(label1S, [0, 1], [15, 0])}px)`,
        }}>
          <span style={{ fontSize: 26, fontWeight: 600, color: "rgba(100,160,255,0.9)", fontFamily: heebo }}>
            טכנולוגיה
          </span>
        </div>

        <div style={{
          position: "absolute", left: `calc(50% + ${circle2X}px - 80px)`, top: "calc(42% + 100px)",
          width: 160, textAlign: "center",
          opacity: interpolate(label2S, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(label2S, [0, 1], [15, 0])}px)`,
        }}>
          <span style={{ fontSize: 26, fontWeight: 600, color: "rgba(201,168,85,0.9)", fontFamily: heebo }}>
            משפט
          </span>
        </div>
      </div>

      {/* Result text at bottom */}
      <div style={{
        position: "absolute", bottom: 140, left: 0, right: 0,
        textAlign: "center", direction: "rtl", padding: "0 60px",
      }}>
        <div style={{
          fontSize: 50, fontWeight: 700, color: "white",
          fontFamily: heebo, lineHeight: 1.5,
          opacity: interpolate(resultS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(resultS, [0, 1], [40, 0])}px)`,
        }}>
          צוואה מקצועית — בלי מחירים מנופחים
        </div>
        <div style={{
          fontSize: 30, fontWeight: 400, color: "rgba(255,255,255,0.5)",
          fontFamily: heebo, marginTop: 12,
          opacity: interpolate(subResultS, [0, 1], [0, 1]),
        }}>
          משרד עו״ד אלון אלישע
        </div>
      </div>
    </AbsoluteFill>
  );
};
