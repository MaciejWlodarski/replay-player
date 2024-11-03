import React from "react";
import "./Shot.css";

const Shot = ({ shot, map }) => {
  const { factor } = map;
  const { pos, yaw } = shot;

  const shotPos = {
    x: (pos.x - map.start.x) * factor,
    y: (map.start.y - pos.y) * factor,
  };

  const gradientId = "shot";

  return (
    <g>
      <line
        className="shot"
        x1={shotPos.x}
        y1={shotPos.y}
        x2={shotPos.x + 1000 * factor}
        y2={shotPos.y + 1000 * factor}
        stroke={`url(#${gradientId})`}
        strokeWidth={5 * factor}
        transform={`rotate(${-yaw - 45}, ${shotPos.x}, ${shotPos.y})`}
      />
    </g>
  );
};

const Shots = ({ shots, map }) => {
  return (
    <g className="shots">
      <defs>
        <linearGradient id="shot" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity={1} />
          <stop offset="100%" stopColor="white" stopOpacity={0} />
        </linearGradient>
      </defs>

      {shots.map((shot, idx) => (
        <Shot key={idx} shot={shot} map={map} />
      ))}
    </g>
  );
};

export default Shots;
