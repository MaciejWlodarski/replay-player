import { useContext, useRef, useState } from "react";
import RCSlider from "rc-slider";
import Timeline from "./Timeline/Timeline";
import Hover from "./Hover/Hover";
import {
  RoundContext,
  SetTickContext,
  TickContext,
} from "../../../../hooks/context/context";
import "./Slider.css";

const Slider = ({ prevTickRef }) => {
  const { lastTick } = useContext(RoundContext);
  const tick = useContext(TickContext);
  const setTick = useContext(SetTickContext);

  const [cursorPos, setCursorPos] = useState(null);
  const isHoveredRef = useRef(false);

  const handleMouseMove = (e) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();

    const x = e.clientX - rect.left;
    if (!isHoveredRef.current) {
      setCursorPos(x / rect.width);
    }
  };

  const handleMouseLeave = () => {
    setCursorPos(null);
  };

  return (
    <div
      className="slider-component"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Hover cursorPos={cursorPos} isHoveredRef={isHoveredRef} />
      <Timeline />
      <RCSlider
        max={lastTick}
        value={tick}
        onChange={(e) => {
          setTick(() => e);
          prevTickRef.current = e;
        }}
      />
    </div>
  );
};

export default Slider;
