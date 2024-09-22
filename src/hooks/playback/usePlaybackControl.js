import { useEffect, useRef, useState, useMemo } from "react";

const usePlaybackControl = (round, tick, setTick) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const speedArray = useMemo(() => [0.5, 1, 1.5, 2, 4, 8], []);

  const prevRenderRef = useRef(0);
  const animationRef = useRef(null);

  useEffect(() => {
    if (round && tick > round.lastTick) setTick(() => round.lastTick);
  }, [round]);

  useEffect(() => {
    let dataAvailable;

    const renderFrame = () => {
      if (!round) {
        dataAvailable = false;
        return;
      }

      const { lastTick } = round;
      setTick((prevTick) => {
        if (prevTick < lastTick) {
          const newRender = Date.now();
          const delta = dataAvailable ? newRender - prevRenderRef.current : 0;
          dataAvailable = true;

          const tickDurationMs = 1000 / (64 * speedArray[speed]);
          const tickIncrement = delta / tickDurationMs;

          const newTick = Math.min(prevTick + tickIncrement, lastTick);

          prevRenderRef.current = newRender;

          return newTick;
        } else {
          setIsPlaying(() => false);
          return prevTick;
        }
      });

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
    tick,
    setTick,
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    speedArray,
    prevRenderRef,
  };
};

export default usePlaybackControl;
