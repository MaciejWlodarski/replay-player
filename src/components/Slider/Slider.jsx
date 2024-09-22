import React from "react";
import { CirclePause, CirclePlay } from "lucide-react";
import RCSlider from "rc-slider";
import CheckboxButton from "/src/components/CheckboxButton/CheckboxButton";
import { tickToTime } from "/src/utils/utils.js";
import "./Slider.css";

const Slider = ({
  round,
  tick,
  setTick,
  isPlaying,
  speed,
  togglePlay,
  speedUp,
  speedDown,
}) => {
  if (!round) return <div className="slider-container" />;
  const { lastTick, marks } = round;

  return (
    <div className="slider-container">
      <div className="slider-content">
        <div className="slider-panel">
          <CheckboxButton
            label={`${speed}x`}
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
            onButtonDown={() => togglePlay()}
          />
        </div>
        <div className="slider-component">
          <RCSlider
            max={lastTick}
            value={tick}
            onChange={(e) => setTick(() => e)}
            marks={marks}
          />
        </div>
        <div className="slider-panel">
          <div className="timer">
            <div className="slider-time">{tickToTime(tick)}</div>
            <div className="slider-time">{Math.round(tick)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
