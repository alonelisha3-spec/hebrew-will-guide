import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { Scene1Hook } from "./scenes/Scene1";
import { Scene2Problem } from "./scenes/Scene2";
import { Scene3Solution } from "./scenes/Scene3";
import { Scene4Proof } from "./scenes/Scene4";
import { Scene5CTA } from "./scenes/Scene5";

export const MainVideo = () => {
  return (
    <AbsoluteFill style={{ background: "#0a0f18" }}>
      <TransitionSeries>
        {/* Scene 1 — Hook: What happens to your family? (4s) */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <Scene1Hook />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 15 })}
        />

        {/* Scene 2 — Problem: 71% without a will (4s) */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <Scene2Problem />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 12 })}
        />

        {/* Scene 3 — Solution: Tech + Law (4s) */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <Scene3Solution />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 12 })}
        />

        {/* Scene 4 — Process: 3 steps (3.5s) */}
        <TransitionSeries.Sequence durationInFrames={105}>
          <Scene4Proof />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 12 })}
        />

        {/* Scene 5 — CTA (3.5s) */}
        <TransitionSeries.Sequence durationInFrames={105}>
          <Scene5CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
