import React, { useContext } from "react";
import { RoundContext, MapContext } from "../../../../hooks/context/context";
import "./Death.css";

const Death = ({ death }) => {
  const { map, factor, tick } = useContext(MapContext);

  if (death.tick > tick) return;
  const { pos, side } = death;

  const deathPos = {
    x: (pos.x - map.start.x) * factor,
    y: (map.start.y - pos.y) * factor,
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

const Deaths = () => {
  const { deaths } = useContext(RoundContext);

  return (
    <g className="deaths">
      {deaths.map((death, idx) => (
        <Death key={idx} death={death} />
      ))}
    </g>
  );
};

export default Deaths;
