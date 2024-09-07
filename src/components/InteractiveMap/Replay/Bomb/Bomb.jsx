import React from "react";
import icons from "/src/assets/icons";
import "./Bomb.css";

const Bomb = ({ plant, defuse, mapData, factor, tick }) => {
  if (!plant || plant.tick > tick) return;

  const { pos } = plant;
  const bombPos = {
    x: (pos.x - mapData.start.x) * factor,
    y: (mapData.start.y - pos.y) * factor,
  };

  const bombHeight = 100 * factor;
  const defused = defuse && defuse <= tick;

  return (
    <g className={`bomb-component ${defused ? "defused" : ""}`}>
      <icons.normal.c4
        x={bombPos.x}
        y={bombPos.y - bombHeight / 2}
        height={bombHeight}
      />
    </g>
  );
};

export default Bomb;
