import { useCallback, useContext, useMemo } from "react";
import { Tooltip } from "react-tooltip";
import { PenContext } from "../../../../../../hooks/context/context";
import { colorMap } from "../../../../../../utils/utils";
import classNames from "classnames";
import Slider from "rc-slider";
import Button from "../../../../../Button/Button";
import { Redo, Undo, X } from "lucide-react";
import "./SketchConfigContent.css";

const SketchConfigContent = ({ tooltipId }) => {
  const [pen, setPen] = useContext(PenContext);

  const colors = useMemo(() => ["white", "t", "ct", "green", "red"], []);

  const penSizes = useMemo(() => [5, 8, 12, 18, 27, 40, 60, 90, 135, 200], []);
  const currentIndex = useMemo(
    () => penSizes.indexOf(pen.radius),
    [pen, penSizes]
  );

  const setColor = useCallback(
    (color) => setPen((prev) => ({ ...prev, color })),
    [setPen]
  );

  const handleSliderChange = useCallback(
    (value) => {
      setPen((prevPen) => ({ ...prevPen, radius: penSizes[value] }));
    },
    [setPen, penSizes]
  );

  return (
    <Tooltip
      id={tooltipId}
      place={"top"}
      opacity={1}
      border={`1px solid ${colorMap.border}`}
      openEvents={{ click: true }}
      closeEvents={{ click: true }}
      globalCloseEvents={{ clickOutsideAnchor: false }}
      clickable={true}
      delayShow={0.1}
      delayHide={0.1}
      offset={6}
    >
      <div className="pen-color">
        {colors.map((name) => {
          const color = colorMap[name];
          return (
            <Button
              key={name}
              className={classNames("color", name, {
                selected: color === pen.color,
              })}
              onLeftClick={() => setColor(color)}
              style={{ backgroundColor: color }}
            />
          );
        })}
      </div>
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
      <div className="buttons">
        <Button>
          <Undo strokeWidth={1.5} />
        </Button>
        <Button>
          <Redo strokeWidth={1.5} />
        </Button>
        <Button>
          <X strokeWidth={1.5} />
        </Button>
      </div>
    </Tooltip>
  );
};

export default SketchConfigContent;
