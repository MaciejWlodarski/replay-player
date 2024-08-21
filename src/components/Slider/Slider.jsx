import React from "react";
import { CirclePause, CirclePlay } from "lucide-react";
import RCSlider from "rc-slider";
import CheckboxButton from "/src/components/CheckboxButton/CheckboxButton";
import { tickToTime } from "/src/utils/utils.js";
import "./Slider.css";

const Slider = ({
  lastTick,
  currTick,
  setCurrTick,
  isPlaying,
  setIsPlaying,
  speed,
  setSpeed,
  marks,
}) => {
  const togglePlay = () => {
    if (currTick >= lastTick) return;
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="slider-container">
      <div className={`slider-content`}>
        <div className="slider-panel">
          <CheckboxButton
            label={
              <div>
                {isPlaying ? (
                  <CirclePause className="pause" />
                ) : (
                  <CirclePlay className="pause" />
                )}
              </div>
            }
            isChecked={false}
            onButtonDown={() => togglePlay()}
          />
        </div>
        <div className="slider-component">
          <RCSlider
            max={lastTick}
            value={currTick}
            onChange={(e) => setCurrTick(() => e)}
            marks={marks}
          />
        </div>
        <div className="slider-panel">
          <div className="slider-time">{tickToTime(currTick)}</div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
