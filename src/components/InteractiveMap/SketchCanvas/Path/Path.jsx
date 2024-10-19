import { memo } from "react";
import { pointsToPathD } from "../canvasUtils";

const Path = ({ idx, path }) => {
  const { points, pen } = path;
  const { color, radius } = pen;

  const start = points[0];

  return (
    <>
      <circle cx={start.x} cy={start.y} fill={color} r={radius / 100} />
      <path
        d={pointsToPathD(points)}
        stroke={color}
        strokeWidth={radius / 50}
        fill="none"
      />
    </>
  );
};

export default memo(Path);
