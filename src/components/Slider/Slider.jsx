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
  marks,
  setPrevRender,
}) => {
  const togglePlay = () => {
    if (currTick >= lastTick) setCurrTick(() => 0);
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
            onButtonDown={() => {
              togglePlay();
              setPrevRender(() => Date.now());
            }}
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
          <div className="slider-time">{Math.round(currTick)}</div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
