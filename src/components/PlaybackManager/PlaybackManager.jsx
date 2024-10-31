import { memo, useCallback, useEffect, useMemo } from "react";
import usePlaybackControl from "../../hooks/playback/usePlaybackControl";
import Playback from "./Playback/Playback";

const PlaybackManager = () => {
  const {
    isPlaying,
    setIsPlaying,
    speedIdx,
    setSpeedIdx,
    speedArray,
    prevRenderRef,
    prevTickRef,
  } = usePlaybackControl();

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
    prevRenderRef.current = Date.now();
  }, [setIsPlaying, prevRenderRef]);

  const speedUp = useCallback(
    () =>
      setSpeedIdx((prev) => (prev === speedArray.length - 1 ? 0 : prev + 1)),
    [setSpeedIdx, speedArray.length]
  );

  const speedDown = useCallback(
    () =>
      setSpeedIdx((prev) => (prev === 0 ? speedArray.length - 1 : prev - 1)),
    [setSpeedIdx, speedArray.length]
  );

  const speed = useMemo(() => speedArray[speedIdx], [speedArray, speedIdx]);

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
  }, [togglePlay, speedUp, speedDown]);

  return (
    <Playback
      isPlaying={isPlaying}
      speed={speed}
      togglePlay={togglePlay}
      speedUp={speedUp}
      speedDown={speedDown}
      prevTickRef={prevTickRef}
    />
  );
};

export default memo(PlaybackManager);
