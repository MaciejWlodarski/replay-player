import React from "react";
import "./Death.css";

const Death = ({ death, mapData, factor, tick }) => {
  if (death.tick > tick) return;
  const { pos, side } = death;

  const deathPos = {
    x: (pos.x - mapData.start.x) * factor,
    y: (mapData.start.y - pos.y) * factor,
  };

  const team = side == 2 ? "t" : "ct";

  return (
    <g className={`death-component ${team}`}>
      <circle
        className="death"
        cx={deathPos.x}
        cy={deathPos.y}
        r={30 * factor}
        strokeWidth={8 * factor}
      />
    </g>
  );
};

export default Death;
