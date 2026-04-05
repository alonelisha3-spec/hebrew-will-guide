import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { Scene1Intro } from "./scenes/Scene1";
import { Scene2Problem } from "./scenes/Scene2";
import { Scene3HowItWorks } from "./scenes/Scene3";
import { Scene4Benefits } from "./scenes/Scene4";
import { Scene5CTA } from "./scenes/Scene5";
import { PersistentBackground } from "./components/PersistentBackground";

export const MainVideo = () => {
  return (
    <AbsoluteFill>
      <PersistentBackground />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={60}>
          <Scene1Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 8 })}
        />
        <TransitionSeries.Sequence durationInFrames={95}>
          <Scene2Problem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-top-left" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 8 })}
        />
        <TransitionSeries.Sequence durationInFrames={110}>
          <Scene3HowItWorks />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 8 })}
        />
        <TransitionSeries.Sequence durationInFrames={92}>
          <Scene4Benefits />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 8 })}
        />
        <TransitionSeries.Sequence durationInFrames={93}>
          <Scene5CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
