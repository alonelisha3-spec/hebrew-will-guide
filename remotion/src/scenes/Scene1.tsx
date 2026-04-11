import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { heebo } from "../fonts";

/* Scene 1 — Emotional Hook: Family silhouettes appear, then the question */
export const Scene1Hook = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient shift
  const bgShift = interpolate(frame, [0, 120], [0, 20], { extrapolateRight: "clamp" });

  // Family silhouettes fade in one by one
  const parent1 = spring({ frame: frame - 8, fps, config: { damping: 20 } });
  const parent2 = spring({ frame: frame - 16, fps, config: { damping: 20 } });
  const child1 = spring({ frame: frame - 24, fps, config: { damping: 18 } });
  const child2 = spring({ frame: frame - 30, fps, config: { damping: 18 } });

  // Heart pulse between parents
  const heartBeat = Math.sin(frame * 0.12) * 0.15 + 1;

  // Main question text
  const questionS = spring({ frame: frame - 50, fps, config: { damping: 14, stiffness: 120 } });
  const subS = spring({ frame: frame - 70, fps, config: { damping: 16 } });

  // Dramatic line under text
  const lineWidth = interpolate(
    spring({ frame: frame - 65, fps, config: { damping: 12 } }),
    [0, 1], [0, 400]
  );

  // Subtle floating particles
  const particles = Array.from({ length: 8 }, (_, i) => ({
    x: 150 + i * 110,
    y: 200 + Math.sin(frame * 0.03 + i * 1.5) * 40,
    opacity: interpolate(frame, [10 + i * 5, 30 + i * 5], [0, 0.15], { extrapolateRight: "clamp" }),
    size: 4 + (i % 3) * 3,
  }));

  return (
    <AbsoluteFill>
      {/* Animated gradient background */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(${160 + bgShift}deg, #0a0f18 0%, #1a1520 40%, #0d1825 100%)`,
      }} />

      {/* Floating gold particles */}
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute", left: p.x, top: p.y,
          width: p.size, height: p.size, borderRadius: "50%",
          background: "#c9a855", opacity: p.opacity,
        }} />
      ))}

      {/* Family silhouettes group */}
      <div style={{
        position: "absolute", top: 180, left: 0, right: 0,
        display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 30,
      }}>
        {/* Parent 1 */}
        <div style={{
          opacity: interpolate(parent1, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(parent1, [0, 1], [60, 0])}px)`,
        }}>
          <svg width="100" height="200" viewBox="0 0 100 200">
            <circle cx="50" cy="35" r="25" fill="#c9a855" opacity="0.8" />
            <rect x="25" y="65" width="50" height="90" rx="12" fill="#c9a855" opacity="0.6" />
            <rect x="20" y="155" width="22" height="45" rx="6" fill="#c9a855" opacity="0.5" />
            <rect x="58" y="155" width="22" height="45" rx="6" fill="#c9a855" opacity="0.5" />
          </svg>
        </div>

        {/* Heart between parents */}
        <div style={{
          marginBottom: 100,
          transform: `scale(${interpolate(parent2, [0, 1], [0, 1]) * heartBeat})`,
          opacity: interpolate(parent2, [0, 1], [0, 0.8]),
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#c9a855">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        {/* Parent 2 */}
        <div style={{
          opacity: interpolate(parent2, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(parent2, [0, 1], [60, 0])}px)`,
        }}>
          <svg width="90" height="190" viewBox="0 0 90 190">
            <circle cx="45" cy="32" r="23" fill="#c9a855" opacity="0.8" />
            <path d="M20 60 Q45 55 70 60 L65 150 H25 Z" fill="#c9a855" opacity="0.6" />
            <rect x="18" y="148" width="20" height="42" rx="6" fill="#c9a855" opacity="0.5" />
            <rect x="52" y="148" width="20" height="42" rx="6" fill="#c9a855" opacity="0.5" />
          </svg>
        </div>

        {/* Child 1 */}
        <div style={{
          opacity: interpolate(child1, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(child1, [0, 1], [40, 0])}px)`,
          marginLeft: -15,
        }}>
          <svg width="60" height="130" viewBox="0 0 60 130">
            <circle cx="30" cy="22" r="16" fill="#c9a855" opacity="0.8" />
            <rect x="12" y="42" width="36" height="55" rx="8" fill="#c9a855" opacity="0.6" />
            <rect x="10" y="95" width="15" height="35" rx="5" fill="#c9a855" opacity="0.5" />
            <rect x="35" y="95" width="15" height="35" rx="5" fill="#c9a855" opacity="0.5" />
          </svg>
        </div>

        {/* Child 2 (smaller) */}
        <div style={{
          opacity: interpolate(child2, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(child2, [0, 1], [30, 0])}px)`,
          marginLeft: -10,
        }}>
          <svg width="45" height="100" viewBox="0 0 45 100">
            <circle cx="22" cy="18" r="13" fill="#c9a855" opacity="0.8" />
            <rect x="8" y="34" width="28" height="40" rx="7" fill="#c9a855" opacity="0.6" />
            <rect x="6" y="72" width="12" height="28" rx="4" fill="#c9a855" opacity="0.5" />
            <rect x="26" y="72" width="12" height="28" rx="4" fill="#c9a855" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Question text */}
      <div style={{
        position: "absolute", bottom: 180, left: 0, right: 0,
        textAlign: "center", direction: "rtl", padding: "0 60px",
      }}>
        <div style={{
          fontSize: 62, fontWeight: 700, color: "white",
          fontFamily: heebo, lineHeight: 1.5,
          opacity: interpolate(questionS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(questionS, [0, 1], [50, 0])}px) scale(${interpolate(questionS, [0, 1], [0.9, 1])})`,
        }}>
          מה יקרה למשפחה שלכם
        </div>

        {/* Gold underline */}
        <div style={{
          width: lineWidth, height: 3, background: "linear-gradient(90deg, transparent, #c9a855, transparent)",
          margin: "15px auto",
          borderRadius: 2,
        }} />

        <div style={{
          fontSize: 52, fontWeight: 500, color: "#c9a855",
          fontFamily: heebo, marginTop: 10,
          opacity: interpolate(subS, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(subS, [0, 1], [30, 0])}px)`,
        }}>
          ...בלעדיכם?
        </div>
      </div>
    </AbsoluteFill>
  );
};
