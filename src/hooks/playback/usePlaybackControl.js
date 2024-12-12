import { useEffect, useRef, useState, useMemo, useContext } from "react";
import { RoundContext } from "@/providers/GameDataProvider";
import {
  SetTickContext,
  TickContext,
  TickRefContext,
} from "@/providers/TickProvider";
import { ArrowLeftContext, ArrowRightContext } from "@/providers/KeyProvider";

const usePlaybackControl = () => {
  const round = useContext(RoundContext);
  const tick = useContext(TickContext);
  const setTick = useContext(SetTickContext);
  const tickRef = useContext(TickRefContext);
  const arrowRightState = useContext(ArrowRightContext);
  const arrowLeftState = useContext(ArrowLeftContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(1);

  const speedArray = useMemo(() => [0.5, 1, 1.5, 2, 4, 8], []);

  const prevRenderRef = useRef(0);
  const prevTickRef = useRef(tick);
  const animationRef = useRef(null);

  useEffect(() => {
    if (round && tick > round.lastTick) {
      setTick(() => round.lastTick);
      tickRef.current = round.lastTick;
    }
    prevTickRef.current = 0;
  }, [round]);

  useEffect(() => {
    let dataAvailable;

    const renderFrame = () => {
      if (!round) {
        dataAvailable = false;
        return;
      }

      const { lastTick } = round;

      if (prevTickRef.current <= lastTick && prevTickRef.current >= 0) {
        setTick((prevTick) => {
          const newRender = Date.now();
          const delta = dataAvailable ? newRender - prevRenderRef.current : 0;
          dataAvailable = true;

          const tickDurationMs = 1000 / (64 * speedArray[speedIdx]);
          const tickIncrement = delta / tickDurationMs;

          let newTick;
          if (arrowLeftState) {
            newTick = Math.max(prevTick - tickIncrement, 0);
          } else {
            newTick = Math.min(prevTick + tickIncrement, lastTick);
          }

          prevRenderRef.current = newRender;
          prevTickRef.current = newTick;

          tickRef.current = newTick;
          return newTick;
        });
      }

      if (prevTickRef.current >= lastTick) {
        setIsPlaying(() => false);
      }

      animationRef.current = requestAnimationFrame(renderFrame);
    };

    if (isPlaying || arrowLeftState || arrowRightState) {
      animationRef.current = requestAnimationFrame(renderFrame);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    isPlaying,
    arrowLeftState,
    arrowRightState,
    speedIdx,
    round,
    setTick,
    speedArray,
    tickRef,
  ]);

  return {
    isPlaying,
    setIsPlaying,
    speedIdx,
    setSpeedIdx,
    speedArray,
    prevRenderRef,
    prevTickRef,
  };
};

export default usePlaybackControl;
