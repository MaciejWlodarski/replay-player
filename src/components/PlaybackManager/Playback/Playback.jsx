import React, { useContext } from "react";
import { CirclePause, CirclePlay } from "lucide-react";
import CheckboxButton from "/src/components/CheckboxButton/CheckboxButton";
import { RoundContext } from "../../../hooks/context/context";
import Slider from "./Slider/Slider";
import RightPanel from "./RightPanel/RightPanel";
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
          <CheckboxButton
            label={`${speed}x`}
            isChecked={false}
            onButtonDown={speedUp}
            onRightClick={speedDown}
            additionalClassName={"speed"}
          />
          <CheckboxButton
            label={
              isPlaying ? (
                <CirclePause size={20} strokeWidth={1.5} className="pause" />
              ) : (
                <CirclePlay size={20} strokeWidth={1.5} className="pause" />
              )
            }
            isChecked={false}
            onButtonDown={togglePlay}
          />
        </div>
        <Slider prevTickRef={prevTickRef} />
        <RightPanel />
      </div>
    </div>
  );
};

export default Playback;
