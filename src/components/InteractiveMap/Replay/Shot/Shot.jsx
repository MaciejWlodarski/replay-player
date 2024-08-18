import React from "react";
import "./Shot.css";

const Shot = ({ shot, mapData, factor, tick }) => {
  const { pos, yaw } = shot;
  console.log(yaw);

  const shotPos = {
    x: (pos.x - mapData.start.x) * factor,
    y: (mapData.start.y - pos.y) * factor,
  };

  return (
    <svg className="shot-component">
      <line
        className="shot"
        x1={shotPos.x}
        y1={shotPos.y}
        x2={shotPos.x + 1000 * factor}
        y2={shotPos.y}
        strokeWidth={5 * factor}
        transform={`rotate(${yaw + 180}, ${shotPos.x}, ${shotPos.y})`}
      />
    </svg>
  );
};

export default Shot;
