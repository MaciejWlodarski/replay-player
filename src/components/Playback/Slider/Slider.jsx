import React, { useContext } from "react";
import { CirclePause, CirclePlay } from "lucide-react";
import RCSlider from "rc-slider";
import CheckboxButton from "/src/components/CheckboxButton/CheckboxButton";
import {
  RoundContext,
  SetTickContext,
  TickContext,
} from "../../../hooks/context/context";
import "./Slider.css";

const Slider = ({
  isPlaying,
  speed,
  togglePlay,
  speedUp,
  speedDown,
  prevTickRef,
}) => {
  const round = useContext(RoundContext);
  const tick = useContext(TickContext);
  const setTick = useContext(SetTickContext);

  if (!round) return <div className="slider-container" />;
  const { marks, lastTick } = round;

  return (
    <div className="slider-container">
      <div className="slider-content">
        <div className="slider-panel left">
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
            onChange={(e) => {
              setTick(() => e);
              prevTickRef.current = e;
            }}
            marks={marks}
          />
        </div>
        <div className="slider-panel right">{Math.round(tick)}</div>
      </div>
    </div>
  );
};

export default Slider;
