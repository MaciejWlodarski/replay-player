import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const useSetTick = (round) => {
  const [params] = useSearchParams();

  const [tick, setTick] = useState(Number(params.get("tick")) || 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const speedArray = [0.5, 1, 1.5, 2, 4, 8];

  useEffect(() => {
    if (round && tick > round.lastTick) setTick(() => round.lastTick);
  }, [round]);

  const [prevRender, setPrevRender] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    let prevRenderTime = prevRender;
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
          const delta = dataAvailable ? newRender - prevRenderTime : 0;
          dataAvailable = true;

          const tickDurationMs = 1000 / (64 * speedArray[speed]);
          const tickIncrement = delta / tickDurationMs;

          const newTick = Math.min(prevTick + tickIncrement, lastTick);

          setPrevRender(() => {
            prevRenderTime = newRender;
            return newRender;
          });

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
    speed,
    setSpeed,
    speedArray,
    isPlaying,
    setIsPlaying,
    setPrevRender,
  };
};

export default useSetTick;
