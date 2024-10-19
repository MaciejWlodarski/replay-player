import { useContext } from "react";
import { AltContext } from "../../../../hooks/context/context";

const Pen = ({ pos, pen, setPen }) => {
  const altState = useContext(AltContext);

  if (!altState || !pos) return;

  const handleScroll = (event) => {
    if (event.deltaY < 0) {
      setPen((prevPen) => {
        const { radius } = prevPen;
        if (radius === 200) return prevPen;

        return { ...prevPen, radius: radius + 5 };
      });
    } else {
      setPen((prevPen) => {
        const { radius } = prevPen;
        if (radius === 5) return prevPen;

        return { ...prevPen, radius: radius - 5 };
      });
    }
  };

  console.log(pen);

  return (
    <circle
      cx={pos.x}
      cy={pos.y}
      fill={pen.color}
      r={pen.radius / 100}
      onWheel={handleScroll}
    />
  );
};

export default Pen;
