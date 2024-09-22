import { useContext, useEffect, useMemo } from "react";
import { TickContext, SetTickContext } from "../../hooks/context/context";
import usePlaybackControl from "../../hooks/playback/usePlaybackControl";
import Slider from "../Slider/Slider";

const Playback = ({ round }) => {
  const tick = useContext(TickContext);
  const setTick = useContext(SetTickContext);

  const {
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    speedArray,
    prevRenderRef,
  } = usePlaybackControl(round, tick, setTick);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    prevRenderRef.current = Date.now();
  };

  const speedUp = () =>
    setSpeed((prev) => (prev === speedArray.length - 1 ? 0 : prev + 1));

  const speedDown = () =>
    setSpeed((prev) => (prev === 0 ? speedArray.length - 1 : prev - 1));

  const getSpeed = useMemo(() => speedArray[speed], [speedArray, speed]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.code) {
        case "Space":
          togglePlay();
          break;
        case "ArrowUp":
          speedUp();
          break;
        case "ArrowDown":
          speedDown();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Slider
      round={round}
      tick={tick}
      setTick={setTick}
      isPlaying={isPlaying}
      speed={getSpeed}
      togglePlay={togglePlay}
      speedUp={speedUp}
      speedDown={speedDown}
    />
  );
};

export default Playback;
