import React, { useContext } from "react";
import { RoundContext, MapContext } from "../../../../hooks/context";
import "./Shot.css";

const Shot = ({ shot, map, factor, gradient }) => {
  const { pos, yaw } = shot;

  const shotPos = {
    x: (pos.x - map.start.x) * factor,
    y: (map.start.y - pos.y) * factor,
  };

  return (
    <g>
      <line
        className="shot"
        x1={shotPos.x}
        y1={shotPos.y}
        x2={shotPos.x + 1000 * factor}
        y2={shotPos.y + 1000 * factor}
        stroke={`url(#${gradient})`}
        strokeWidth={5 * factor}
        transform={`rotate(${-yaw - 45}, ${shotPos.x}, ${shotPos.y})`}
      />
    </g>
  );
};

const Shots = () => {
  const { map, factor, tick } = useContext(MapContext);
  const { shots } = useContext(RoundContext);

  return (
    <g className="shots">
      <defs>
        <linearGradient id="shotGradient" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity={1} />
          <stop offset="100%" stopColor="white" stopOpacity={0} />
        </linearGradient>
      </defs>

      {shots[Math.floor(tick)]?.map((shot, idx) => (
        <Shot
          key={idx}
          shot={shot}
          map={map}
          factor={factor}
          gradient={"shotGradient"}
        />
      ))}
    </g>
  );
};

export default Shots;
