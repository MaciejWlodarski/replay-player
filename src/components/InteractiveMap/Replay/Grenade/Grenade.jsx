import React from "react";
import { getGrenadePose } from "/src/utils/utils";

const Grenade = ({ grenade, mapData, factor, tick }) => {
  const { type } = grenade;
  const pose = getGrenadePose(grenade, tick);
  const { pos } = pose;

  const grenadePos = {
    x: (pos.x - mapData.start.x) * factor,
    y: (mapData.start.y - pos.y) * factor,
  };

  return (
    <g className={`grenade-component ${type}`}>
      <circle
        className="grenade"
        cx={grenadePos.x}
        cy={grenadePos.y}
        r={30 * factor}
      />
    </g>
  );
};

export default Grenade;
