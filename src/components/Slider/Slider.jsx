import React from "react";
import { CirclePause, CirclePlay } from "lucide-react";
import RCSlider from "rc-slider";
import CheckboxButton from "/src/components/CheckboxButton/CheckboxButton";
import { tickToTime } from "/src/utils/utils.js";
import "./Slider.css";

const Slider = ({
  roundData,
  currTick,
  setCurrTick,
  isPlaying,
  setIsPlaying,
  setPrevRender,
  speed,
  setSpeed,
  speedArray,
}) => {
  if (!roundData) return <div className="slider-container" />;
  const { lastTick, marks } = roundData;

  const togglePlay = () => {
    if (currTick >= lastTick) setCurrTick(() => 0);
    setIsPlaying((prev) => !prev);
  };

  const speedUp = () => {
    setSpeed((prev) => {
      if (prev === speedArray.length - 1) return 0;
      return prev + 1;
    });
  };

  const speedDown = () => {
    setSpeed((prev) => {
      if (prev === 0) return speedArray.length - 1;
      return prev - 1;
    });
  };

  return (
    <div className="slider-container">
      <div className="slider-content">
        <div className="slider-panel">
          <CheckboxButton
            label={`${speedArray[speed]}x`}
            isChecked={false}
            onButtonDown={() => speedUp()}
            onRightClick={() => speedDown()}
            additionalClassName={"speed"}
          />
          <CheckboxButton
            label={
              isPlaying ? (
                <CirclePause className="pause" />
              ) : (
                <CirclePlay className="pause" />
              )
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
          <div className="timer">
            <div className="slider-time">{tickToTime(currTick)}</div>
            <div className="slider-time">{Math.round(currTick)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
