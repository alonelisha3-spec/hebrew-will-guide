import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const PersistentBackground = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame * 0.008) * 5;
  const drift2 = Math.cos(frame * 0.006) * 8;

  return (
    <AbsoluteFill>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(170deg, #0f1923 0%, #1e2a3a 40%, #162233 70%, #0d1520 100%)",
        }}
      />
      {/* Subtle gold accent orb */}
      <div
        style={{
          position: "absolute",
          top: `${30 + drift}%`,
          right: `${-10 + drift2}%`,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,85,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: `${10 + drift2}%`,
          left: `${-5 + drift}%`,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,85,0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
    </AbsoluteFill>
  );
};
