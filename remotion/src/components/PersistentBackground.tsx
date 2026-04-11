import { AbsoluteFill, useCurrentFrame } from "remotion";

export const PersistentBackground = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame * 0.012) * 6;
  const pulse = 0.06 + Math.sin(frame * 0.03) * 0.02;

  return (
    <AbsoluteFill>
      <div style={{
        width: "100%", height: "100%",
        background: "linear-gradient(155deg, #0a0f18 0%, #14202e 35%, #1a1a2e 65%, #0d1117 100%)",
      }} />
      {/* Urgent red accent orb */}
      <div style={{
        position: "absolute",
        top: `${20 + drift}%`, right: "-8%",
        width: 450, height: 450, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(200,50,50,${pulse}) 0%, transparent 70%)`,
        filter: "blur(80px)",
      }} />
      {/* Gold accent */}
      <div style={{
        position: "absolute",
        bottom: `${15 - drift}%`, left: "-5%",
        width: 350, height: 350, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(201,168,85,${pulse * 0.8}) 0%, transparent 70%)`,
        filter: "blur(60px)",
      }} />
    </AbsoluteFill>
  );
};
