import React from "react";
import "./Shot.css";

const Shot = ({ shot, mapData, factor, gradient }) => {
  const { pos, yaw } = shot;

  const shotPos = {
    x: (pos.x - mapData.start.x) * factor,
    y: (mapData.start.y - pos.y) * factor,
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

export default Shot;
