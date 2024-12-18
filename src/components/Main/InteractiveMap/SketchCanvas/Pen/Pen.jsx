import { useContext, useMemo } from "react";
import { AltContext } from "@/providers/KeyProvider";
import { colorMap } from "@/utils/utils";

const Pen = ({ pen, setPen, penSizes, penColors, pos }) => {
  const altState = useContext(AltContext);

  const currentSizeIndex = useMemo(
    () => penSizes.indexOf(pen.radius),
    [pen, penSizes]
  );

  const penHexColors = useMemo(
    () => penColors.map((color) => colorMap[color]),
    [penColors]
  );

  const currentColorIndex = useMemo(() => {
    return penHexColors.indexOf(pen.color);
  }, [pen, penHexColors]);

  if (!altState || !pos) return;

  const handleScroll = (event) => {
    setPen((prevPen) => {
      if (event.deltaY < 0) {
        if (currentSizeIndex === penSizes.length - 1) return prevPen;
        return { ...prevPen, radius: penSizes[currentSizeIndex + 1] };
      } else {
        if (currentSizeIndex === 0) return prevPen;
        return { ...prevPen, radius: penSizes[currentSizeIndex - 1] };
      }
    });
  };

  const handleMouseDown = (event) => {
    setPen((prevPen) => {
      if (event.button === 0) {
        const newColorIndex =
          (currentColorIndex - 1 + penHexColors.length) % penHexColors.length;
        return { ...prevPen, color: penHexColors[newColorIndex] };
      } else if (event.button === 2) {
        const newColorIndex = (currentColorIndex + 1) % penHexColors.length;
        return { ...prevPen, color: penHexColors[newColorIndex] };
      }
      return prevPen;
    });
  };

  return (
    <>
      <text
        x={pos.x}
        y={pos.y - pen.radius / 100 - 0.5}
        textAnchor="middle"
        fontSize={1.5}
      >
        {currentSizeIndex + 1}
      </text>
      <circle
        cx={pos.x}
        cy={pos.y}
        fill={pen.color}
        r={pen.radius / 100}
        onMouseDown={handleMouseDown}
        onWheel={handleScroll}
      />
    </>
  );
};

export default Pen;
