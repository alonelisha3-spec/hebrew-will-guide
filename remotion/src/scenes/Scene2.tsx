import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";
import { heebo } from "../fonts";

export const Scene2Problem = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Image slides in from right
  const imgS = spring({ frame: frame - 3, fps, config: { damping: 20, stiffness: 120 } });
  const text1S = spring({ frame: frame - 15, fps, config: { damping: 16 } });
  const text2S = spring({ frame: frame - 30, fps, config: { damping: 16 } });
  const badgeS = spring({ frame: frame - 50, fps, config: { damping: 18 } });

  return (
    <AbsoluteFill style={{ background: "#0a0f18", direction: "rtl" }}>
      {/* Lawyer image — right half with diagonal clip */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: "55%", height: "100%",
        overflow: "hidden",
        opacity: interpolate(imgS, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(imgS, [0, 1], [80, 0])}px)`,
      }}>
        <Img
          src={staticFile("images/lawyer-office.jpg")}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            filter: "brightness(0.7)",
          }}
        />
        {/* Diagonal overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(105deg, #0a0f18 25%, transparent 55%)",
        }} />
      </div>

      {/* Text — left side */}
      <div style={{
        position: "absolute", top: "50%", left: 60, transform: "translateY(-50%)",
        maxWidth: "55%",
      }}>
        <div style={{
          fontSize: 22, fontWeight: 500, color: "#c9a855",
          fontFamily: heebo, letterSpacing: "0.15em", marginBottom: 20,
          opacity: interpolate(text1S, [0, 1], [0, 1]),
        }}>
          משרד עו״ד אלון אלישע
        </div>

        <div style={{
          fontSize: 52, fontWeight: 700, color: "white",
          fontFamily: heebo, lineHeight: 1.5,
          opacity: interpolate(text1S, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(text1S, [0, 1], [30, 0])}px)`,
        }}>
          טכנולוגיה ייחודית
        </div>

        <div style={{
          fontSize: 48, fontWeight: 600, color: "#c9a855",
          fontFamily: heebo, lineHeight: 1.5, marginTop: 5,
          opacity: interpolate(text2S, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(text2S, [0, 1], [25, 0])}px)`,
        }}>
          שמוזילה עלויות
          <br />
          ומשפרת איכות
        </div>

        {/* Badge */}
        <div style={{
          marginTop: 40,
          opacity: interpolate(badgeS, [0, 1], [0, 1]),
          transform: `scale(${interpolate(badgeS, [0, 1], [0.8, 1])})`,
        }}>
          <div style={{
            background: "rgba(201,168,85,0.12)", border: "1.5px solid rgba(201,168,85,0.35)",
            borderRadius: 14, padding: "16px 30px", display: "inline-block",
          }}>
            <span style={{ fontSize: 30, fontWeight: 600, color: "white", fontFamily: heebo }}>
              צוואה מקצועית — בלי מחירים מנופחים
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
