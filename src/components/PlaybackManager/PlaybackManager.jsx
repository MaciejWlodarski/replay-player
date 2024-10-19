import { memo, useEffect, useMemo } from "react";
import usePlaybackControl from "../../hooks/playback/usePlaybackControl";
import Playback from "./Playback/Playback";

const PlaybackManager = () => {
  const {
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    speedArray,
    prevRenderRef,
    prevTickRef,
  } = usePlaybackControl();

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
    <Playback
      isPlaying={isPlaying}
      speed={getSpeed}
      togglePlay={togglePlay}
      speedUp={speedUp}
      speedDown={speedDown}
      prevTickRef={prevTickRef}
    />
  );
};

export default memo(PlaybackManager);
