import { memo, useMemo } from "react";
import * as d3 from "d3";

const Path = ({ path }) => {
  const { points, pen } = path;
  const { color, radius } = pen;

  const start = points[0];

  const pathD = useMemo(() => {
    const lineGenerator = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(d3.curveBasis);

    return lineGenerator(points) || "";
  }, [points]);

  return (
    <>
      <circle cx={start.x} cy={start.y} fill={color} r={radius / 100} />
      <path d={pathD} stroke={color} strokeWidth={radius / 50} fill="none" />
    </>
  );
};

export default memo(Path);
