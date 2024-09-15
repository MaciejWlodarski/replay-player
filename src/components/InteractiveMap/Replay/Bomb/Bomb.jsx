import React from "react";
import icons from "/src/assets/icons";
import { getStrokeDasharray } from "../../../../utils/utils";
import "./Bomb.css";

const Bomb = ({ plant, defuse, mapData, factor, tick }) => {
  if (!plant || plant.tick > tick) return;

  const { pos } = plant;
  const bombPos = {
    x: (pos.x - mapData.start.x) * factor,
    y: (mapData.start.y - pos.y) * factor,
  };

  const bombHeight = 60 * factor;
  const defused = defuse && defuse <= tick;

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

  const renderBomb = () => {
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

  return (
    <g className="bomb-component">
      {renderTimer()}
      {renderBombBackground()}
      {renderBomb()}
    </g>
  );
};

export default Bomb;
