import React, { useContext } from "react";
import { CirclePause, CirclePlay } from "lucide-react";
import { RoundContext } from "../../../hooks/context/context";
import Slider from "./Slider/Slider";
import RightPanel from "./RightPanel/RightPanel";
import Button from "../../Button/Button";
import "./Playback.css";

const Playback = ({
  isPlaying,
  speed,
  togglePlay,
  speedUp,
  speedDown,
  prevTickRef,
}) => {
  const round = useContext(RoundContext);

  if (!round) return <div className="playback-container" />;

  return (
    <div className="playback-container">
      <div className="playback-content">
        <div className="playback-panel left">
          <Button
            className={"speed"}
            onLeftClick={speedUp}
            onRightClick={speedDown}
          >
            {`${speed}x`}
          </Button>
          <Button onLeftClick={togglePlay}>
            {isPlaying ? (
              <CirclePause size={20} strokeWidth={1.5} className="pause" />
            ) : (
              <CirclePlay size={20} strokeWidth={1.5} className="pause" />
            )}
          </Button>
        </div>
        <Slider prevTickRef={prevTickRef} />
        <RightPanel />
      </div>
    </div>
  );
};

export default Playback;
