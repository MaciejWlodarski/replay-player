import React from "react";
import { CirclePause, CirclePlay } from "lucide-react";
import RangeSlider from "rc-slider";
import CheckboxButton from "/src/components/CheckboxButton/CheckboxButton";
import { tickToTime } from "/src/utils/utils.js";
import "./Slider.css";

const Slider = ({
  endTick,
  currTick,
  setCurrTick,
  isPlaying,
  setIsPlaying,
  speed,
  setSpeed,
}) => {
  const togglePlay = () => {
    if (currTick >= endTick) return;
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
          <RangeSlider
            max={endTick}
            value={currTick}
            onChange={(e) => {
              setCurrTick(() => e);
              console.log(e);
            }}
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
