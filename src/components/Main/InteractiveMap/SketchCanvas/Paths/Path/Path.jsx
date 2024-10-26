import { memo } from "react";

export const pointsToPathD = (points) => {
  if (points.length === 0) return "";

  const start = points[0];
  const pathD = points
    .slice(1)
    .reduce(
      (acc, point) => `${acc} L ${point.x},${point.y}`,
      `M ${start.x},${start.y}`
    );

  return pathD;
};

const Path = ({ path }) => {
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
