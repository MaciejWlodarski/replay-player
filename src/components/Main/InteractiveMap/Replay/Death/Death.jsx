import React from "react";
import classNames from "classnames";
import "./Death.css";

const Death = ({ death, map }) => {
  const { factor } = map;
  const { pos, side } = death;

  const deathPos = {
    x: (pos.x - map.start.x) * factor,
    y: (map.start.y - pos.y) * factor,
  };

  const team = side == 2 ? "t" : "ct";

  const deathSize = 3 * factor;

  return (
    <g className={classNames("death-component", team)}>
      <g
        className="death-stroke"
        transform={`translate(${deathPos.x}, ${deathPos.y}) scale(${deathSize})`}
      >
        <path d="M6 -6 -6 6" />
        <path d="M-6 -6 6 6" />
      </g>

      <g
        className="death"
        transform={`translate(${deathPos.x}, ${deathPos.y}) scale(${deathSize})`}
      >
        <path d="M6 -6 -6 6" />
        <path d="M-6 -6 6 6" />
      </g>
    </g>
  );
};

const Deaths = ({ deaths, map }) => {
  return (
    <g className="deaths">
      {deaths.map((death, idx) => (
        <Death key={idx} death={death} map={map} />
      ))}
    </g>
  );
};

export default Deaths;
