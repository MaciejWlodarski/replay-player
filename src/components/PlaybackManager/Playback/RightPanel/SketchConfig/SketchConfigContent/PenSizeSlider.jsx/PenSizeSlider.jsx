import { memo, useCallback, useContext, useMemo } from "react";
import { PenContext } from "../../../../../../../hooks/context/context";
import Slider from "rc-slider";

const PenSizeSlider = () => {
  const { pen, setPen, penSizes } = useContext(PenContext);

  const currentIndex = useMemo(
    () => penSizes.indexOf(pen.radius),
    [pen, penSizes]
  );

  const handleSliderChange = useCallback(
    (value) => {
      setPen((prevPen) => ({ ...prevPen, radius: penSizes[value] }));
    },
    [setPen, penSizes]
  );

  return (
    <div className="pen-radius">
      <div className="slider-default">
        <Slider
          min={0}
          max={9}
          value={currentIndex}
          onChange={handleSliderChange}
        />
      </div>
      <div className="radius-value">
        <span>{currentIndex + 1}</span>
      </div>
    </div>
  );
};

export default memo(PenSizeSlider);
