import React from "react";
import { grenadeTypeMap, mapRange, easeInOut, easeOut } from "/src/utils/utils";
import { WepSvg } from "../../../../../assets/icons";
import "./Grenade.css";

const Grenade = ({ grenade, pose, tick, map }) => {
  const { factor } = map;
  const { pos, trajectory } = pose;

  const grenadePos = {
    x: (pos.x - map.start.x) * factor,
    y: (map.start.y - pos.y) * factor,
  };

  const { side, type, explode = Infinity } = grenade;
  const name = grenadeTypeMap[type];
  const team = side == 2 ? "t" : "ct";
  const exploded = tick >= explode;

  const renderSmoke = () => {
    if (tick < explode) return;

    let r = factor;
    const delta = tick - explode;
    const totalDuration = 1412;
    const remaining = totalDuration - delta;
    const progress = remaining / totalDuration;

    if (delta <= 16) {
      const easedDelta = easeInOut(delta / 16);
      r *= mapRange(easedDelta, 0, 1, 0, 150);
    } else {
      r *= 150;
    }

    const circumference = 2 * Math.PI * r;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference * (1 - progress);

    return (
      <g className="smokegrenade-smoke">
        <circle className="smoke" cx={grenadePos.x} cy={grenadePos.y} r={r} />
        <circle
          className="stroke"
          cx={grenadePos.x}
          cy={grenadePos.y}
          r={r}
          strokeWidth={5 * factor}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={-strokeDashoffset}
          transform={`rotate(-90 ${grenadePos.x} ${grenadePos.y})`}
        />
        <text
          x={grenadePos.x}
          y={grenadePos.y}
          dominantBaseline={"central"}
          fontSize={r * 0.4}
        >
          {`${Math.ceil(remaining / 64)}`}
        </text>
      </g>
    );
  };

  const renderExplosion = () => {
    if (tick < explode) return;

    const delta = tick - explode;
    if (delta > 32) return;
    const easedDelta = easeOut(delta / 32);
    const r = mapRange(easedDelta, 0, 1, 150, 0) * factor;

    return (
      <circle
        className="explosion"
        cx={grenadePos.x}
        cy={grenadePos.y}
        r={r}
        strokeWidth={5 * factor}
      />
    );
  };

  const renderGrenadeEffect = {
    501: () => null,
    502: () => null,
    503: () => null,
    504: renderExplosion,
    505: renderSmoke,
    506: renderExplosion,
  };

  const renderGrenadeIcon = () => {
    const grenadeHeight = 100 * factor;

    return (
      <g className="grenade-icon">
        <WepSvg
          wep={grenadeTypeMap[type]}
          x={grenadePos.x}
          y={grenadePos.y - grenadeHeight / 2}
          height={grenadeHeight}
        />
      </g>
    );
  };

  const renderTrajectory = () => {
    const trajectoryPoints = trajectory
      .map((point) => {
        const x = (point.x - map.start.x) * factor;
        const y = (map.start.y - point.y) * factor;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <polyline
        className="grenade-trajectory"
        points={trajectoryPoints}
        strokeWidth={5 * factor}
      />
    );
  };

  const renderBounces = () => {
    return trajectory.slice(1, -1).map((point, idx) => {
      const x = (point.x - map.start.x) * factor;
      const y = (map.start.y - point.y) * factor;
      return (
        <circle
          key={idx}
          className="bounce"
          cx={x}
          cy={y}
          r={12 * factor}
          strokeWidth={5 * factor}
        />
      );
    });
  };

  const renderGrenade = () => {
    if (exploded) return;
    return (
      <g>
        {renderTrajectory()}
        {renderBounces()}
        {renderGrenadeIcon()}
      </g>
    );
  };

  return (
    <g className={`grenade-component ${name} ${team}`}>
      {renderGrenade()}
      {renderGrenadeEffect[type]()}
    </g>
  );
};

const Grenades = ({ grenades, tick, map }) => {
  return (
    <g className="grenades">
      {grenades.map(({ grenade, pose }, idx) => {
        return (
          <Grenade
            key={idx}
            grenade={grenade}
            pose={pose}
            tick={tick}
            map={map}
          />
        );
      })}
    </g>
  );
};

export default Grenades;
