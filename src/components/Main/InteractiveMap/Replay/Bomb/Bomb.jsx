import React from "react";
import icons from "/src/assets/icons";
import { easeInOut, getStrokeDasharray, mapRange } from "@/utils/utils";
import "./Bomb.css";

const Bomb = ({ events, tick, map }) => {
  if (!events) return;

  const { plant, defuse } = events;
  if (!plant || plant.tick > tick) return;

  const { factor } = map;
  const { pos } = plant;

  const bombPos = {
    x: (pos.x - map.start.x) * factor,
    y: (map.start.y - pos.y) * factor,
  };

  const bombHeight = 60 * factor;
  const defused = defuse && defuse <= tick;

  const explodeTick = plant.tick + 41 * 64;
  const exploded = !defuse && explodeTick <= tick;

  const renderTimer = () => {
    if (defused) return;

    const timerRadius = 0.8 * bombHeight;
    const timerProgress = (tick - plant.tick) / 2560;
    const circumference = 2 * Math.PI * timerRadius;

    return (
      <>
        <circle
          className="timer-border"
          cx={bombPos.x}
          cy={bombPos.y}
          r={timerRadius}
          strokeWidth={0.35 * bombHeight}
        />
        <circle
          className="timer-background"
          cx={bombPos.x}
          cy={bombPos.y}
          r={timerRadius}
          strokeWidth={0.3 * bombHeight}
        />
        <circle
          className="timer"
          cx={bombPos.x}
          cy={bombPos.y}
          r={timerRadius}
          strokeWidth={0.3 * bombHeight}
          strokeDasharray={getStrokeDasharray(circumference, timerProgress)}
          strokeDashoffset={circumference * 0.25}
        />
      </>
    );
  };

  const renderBombBackground = () => {
    const width = 0.85 * bombHeight;
    const height = 0.55 * bombHeight;

    return (
      <rect
        className="bomb-background"
        x={bombPos.x - width / 2}
        y={bombPos.y - height / 2}
        width={width}
        height={height}
        rx={0.07 * bombHeight}
      />
    );
  };

  const renderBombIcon = () => {
    return (
      <g className={`bomb-icon ${defused ? "defused" : ""}`}>
        <icons.normal.c4
          x={bombPos.x}
          y={bombPos.y - bombHeight / 2}
          height={bombHeight}
        />
      </g>
    );
  };

  const renderExplosion = () => {
    if (!exploded || tick < explodeTick) return;

    const duration = 32;
    const delta = tick - explodeTick;
    if (delta > duration) return;
    const easedDelta = easeInOut(delta / duration);
    const r = mapRange(easedDelta, 0, 1, 30, 1500) * factor;

    return (
      <circle
        className="explosion"
        cx={bombPos.x}
        cy={bombPos.y}
        r={r}
        strokeWidth={5 * factor}
        opacity={1 - easedDelta}
      />
    );
  };

  const renderBomb = () => {
    if (exploded) return;
    return (
      <>
        {renderTimer()}
        {renderBombBackground()}
        {renderBombIcon()}
      </>
    );
  };

  return (
    <g className="bomb-component">
      {renderBomb()}
      {renderExplosion()}
    </g>
  );
};

export default Bomb;
