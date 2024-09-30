import { useEffect, useRef, useState, useMemo, useContext } from "react";
import { RoundContext, SetTickContext, TickContext } from "../context/context";

const usePlaybackControl = () => {
  const round = useContext(RoundContext);
  const tick = useContext(TickContext);
  const setTick = useContext(SetTickContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const speedArray = useMemo(() => [0.5, 1, 1.5, 2, 4, 8], []);

  const prevRenderRef = useRef(0);
  const prevTickRef = useRef(tick);
  const animationRef = useRef(null);

  useEffect(() => {
    if (round && tick > round.lastTick) {
      setTick(() => round.lastTick);
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

      if (prevTickRef.current < lastTick) {
        setTick((prevTick) => {
          const newRender = Date.now();
          const delta = dataAvailable ? newRender - prevRenderRef.current : 0;
          dataAvailable = true;

          const tickDurationMs = 1000 / (64 * speedArray[speed]);
          const tickIncrement = delta / tickDurationMs;

          const newTick = Math.min(prevTick + tickIncrement, lastTick);

          prevRenderRef.current = newRender;
          prevTickRef.current = newTick;

          return newTick;
        });
      } else {
        setIsPlaying(() => false);
      }

      animationRef.current = requestAnimationFrame(renderFrame);
    };

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(renderFrame);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, speed, round]);

  return {
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    speedArray,
    prevRenderRef,
    prevTickRef,
  };
};

export default usePlaybackControl;
