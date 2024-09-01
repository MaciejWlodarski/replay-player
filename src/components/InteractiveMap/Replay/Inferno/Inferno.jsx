import React from "react";
import "./Inferno.css";

const Inferno = ({ inferno, mapData, factor, tick }) => {
  const { start, end, side, type, fires } = inferno;
  if (tick < start || tick > end) return;
  const team = side == 2 ? "t" : "ct";

  return (
    <g className={`inferno-component ${team} ${type}`}>
      {fires.map((fire, idx) => {
        if (!fire) return;
        const { start, end, pos } = fire;
        if (tick < start || tick > end) return;
        const firePos = {
          x: (pos.x - mapData.start.x) * factor,
          y: (mapData.start.y - pos.y) * factor,
        };
        return (
          <circle
            key={idx}
            className="fire"
            cx={firePos.x}
            cy={firePos.y}
            r={60 * factor}
          />
        );
      })}
    </g>
  );
};

export default Inferno;
