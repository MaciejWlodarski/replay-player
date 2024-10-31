import { useCallback, useContext, useRef, useState } from "react";
import RCSlider from "rc-slider";
import Timeline from "./Timeline/Timeline";
import Hover from "./Hover/Hover";
import {
  RoundContext,
  SetTickContext,
  TickContext,
  TickRefContext,
} from "../../../../hooks/context/context";
import "./Slider.css";

const Slider = ({ prevTickRef }) => {
  const { lastTick } = useContext(RoundContext);
  const tick = useContext(TickContext);
  const setTick = useContext(SetTickContext);
  const tickRef = useContext(TickRefContext);

  const [cursorPos, setCursorPos] = useState(null);
  const isHoveredRef = useRef(false);

  const handleMouseMove = useCallback((e) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();

    const x = e.clientX - rect.left;
    if (!isHoveredRef.current) {
      setCursorPos(x / rect.width);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursorPos(null);
  }, []);

  const handleSliderChange = useCallback(
    (value) => {
      setTick(value);
      tickRef.current = value;
      prevTickRef.current = value;
    },
    [setTick, tickRef, prevTickRef]
  );

  return (
    <div
      className="slider-component"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Hover cursorPos={cursorPos} isHoveredRef={isHoveredRef} />
      <Timeline />
      <RCSlider max={lastTick} value={tick} onChange={handleSliderChange} />
    </div>
  );
};

export default Slider;
