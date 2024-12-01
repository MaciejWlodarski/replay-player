import { useContext, useMemo } from "react";
import { AltContext } from "../../../../../providers/KeyProvider";

const Pen = ({ pen, setPen, penSizes, pos }) => {
  const altState = useContext(AltContext);

  const currentIndex = useMemo(
    () => penSizes.indexOf(pen.radius),
    [pen, penSizes]
  );

  if (!altState || !pos) return;

  const handleScroll = (event) => {
    setPen((prevPen) => {
      const { radius } = prevPen;
      const currentIndex = penSizes.indexOf(radius);

      if (event.deltaY < 0) {
        if (currentIndex === penSizes.length - 1) return prevPen;
        return { ...prevPen, radius: penSizes[currentIndex + 1] };
      } else {
        if (currentIndex === 0) return prevPen;
        return { ...prevPen, radius: penSizes[currentIndex - 1] };
      }
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
        {currentIndex + 1}
      </text>
      <circle
        cx={pos.x}
        cy={pos.y}
        fill={pen.color}
        r={pen.radius / 100}
        onWheel={handleScroll}
      />
    </>
  );
};

export default Pen;
