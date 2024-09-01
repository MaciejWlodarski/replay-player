import React from "react";
import {
  getGrenadePose,
  grenadeTypeMap,
  mapRange,
  easeInOut,
  easeOut,
} from "/src/utils/utils";
import "./Grenade.css";

const Grenade = ({ grenade, mapData, factor, tick }) => {
  const pose = getGrenadePose(grenade, tick);
  if (!pose) return;

  const { pos, trajectory } = pose;

  const grenadePos = {
    x: (pos.x - mapData.start.x) * factor,
    y: (mapData.start.y - pos.y) * factor,
  };

  const trajectoryPoints = trajectory
    .map((point) => {
      const x = (point.x - mapData.start.x) * factor;
      const y = (mapData.start.y - point.y) * factor;
      return `${x},${y}`;
    })
    .join(" ");

  const { side, type, explode } = grenade;
  const name = grenadeTypeMap[type];
  const team = side == 2 ? "t" : "ct";
  const exploded = tick >= explode;

  const renderSmoke = (pos, exploded, factor, tick) => {
    if (tick < exploded) return;

    let r = factor;
    const delta = tick - exploded;
    const totalDuration = 1412;
    const remaining = totalDuration - delta;
    const strokePercentage = remaining / totalDuration;

    if (delta <= 16) {
      const f = Math.min(delta);
      const easedF = easeInOut(f / 16);
      r *= mapRange(easedF, 0, 1, 20, 150);
    } else {
      r *= 150;
    }

    const circumference = 2 * Math.PI * r;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference * (1 - strokePercentage);

    return (
      <g className="smokegrenade-smoke">
        <circle className="smoke" cx={pos.x} cy={pos.y} r={r} />
        <circle
          className="stroke"
          cx={pos.x}
          cy={pos.y}
          r={r}
          strokeWidth={5 * factor}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={-strokeDashoffset}
          transform={`rotate(-90 ${pos.x} ${pos.y})`}
        />
        <text
          x={pos.x}
          y={pos.y}
          dominantBaseline={"middle"}
          fontSize={r * 0.4}
        >
          {`${Math.ceil(remaining / 64)}`}
        </text>
      </g>
    );
  };

  const renderExplosion = (pos, exploded, factor, tick) => {
    if (tick < exploded) return;

    const delta = tick - exploded;
    if (delta > 32) return;
    const f = Math.min(delta);
    const easedF = easeOut(f / 32);
    const r = mapRange(easedF, 0, 1, 150, 0) * factor;

    return <circle className="flash-explosion" cx={pos.x} cy={pos.y} r={r} />;
  };

  const renderGrenadeEffect = {
    501: () => null,
    502: () => null,
    503: () => null,
    504: renderExplosion,
    505: renderSmoke,
    506: renderExplosion,
  };

  return (
    <g className={`grenade-component ${name} ${team}`}>
      {!exploded && (
        <g>
          <polyline
            className="grenade-trajectory"
            points={trajectoryPoints}
            strokeWidth={3 * factor}
            strokeDasharray={`${30 * factor}, ${30 * factor}`}
          />

          <circle
            className="grenade"
            cx={grenadePos.x}
            cy={grenadePos.y}
            strokeWidth={3 * factor}
            r={20 * factor}
          />
        </g>
      )}

      {renderGrenadeEffect[type](grenadePos, explode, factor, tick)}
    </g>
  );
};

export default Grenade;
