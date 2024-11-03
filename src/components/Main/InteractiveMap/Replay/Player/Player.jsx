import React from "react";
import classNames from "classnames";
import { WepSvg } from "/src/assets/icons";
import {
  equipmentTypeMap,
  grenadeTypeMap,
  getStrokeDasharray,
} from "/src/utils/utils";
import {
  getPlayerBlindness,
  getPlayerPlantProgress,
  getPlayerDefuseProgress,
} from "/src/replay/player";
import "./Player.css";

const Player = ({ player, status, pose, tick, map }) => {
  const { factor } = map;
  const { name, side } = player;
  const { pos, yaw } = pose;

  const playerPos = {
    x: (pos.x - map.start.x) * factor,
    y: (map.start.y - pos.y) * factor,
  };

  const team = side == 2 ? "t" : "ct";
  const bomb = team == "t" && status.spec;

  const renderBlindness = () => {
    const blindness = getPlayerBlindness(player, tick);
    if (!blindness) return;
    const opacity = Math.min(1, blindness / 64) * 0.8;
    return (
      <circle
        className="blindness"
        cx={playerPos.x}
        cy={playerPos.y}
        r={26 * factor}
        opacity={opacity}
      />
    );
  };

  const renderPlant = () => {
    const plantProgress = getPlayerPlantProgress(player, tick);
    if (!plantProgress) return;

    const bombHeight = 60 * factor;
    const plantRadius = 0.8 * bombHeight;
    const circumference = 2 * Math.PI * plantRadius;

    return (
      <>
        <circle
          className="plant-border"
          cx={playerPos.x}
          cy={playerPos.y}
          r={plantRadius}
          strokeWidth={0.35 * bombHeight}
        />
        <circle
          className="plant-background"
          cx={playerPos.x}
          cy={playerPos.y}
          r={plantRadius}
          strokeWidth={0.3 * bombHeight}
        />
        <circle
          className="plant-progress"
          cx={playerPos.x}
          cy={playerPos.y}
          r={plantRadius}
          strokeWidth={0.3 * bombHeight}
          strokeDasharray={getStrokeDasharray(circumference, plantProgress)}
          strokeDashoffset={circumference * 0.25}
        />
      </>
    );
  };

  const renderDefuse = () => {
    const defuseProgress = getPlayerDefuseProgress(player, tick);
    if (!defuseProgress) return;

    const bombHeight = 60 * factor;
    const defuseRadius = 0.8 * bombHeight;
    const circumference = 2 * Math.PI * defuseRadius;

    return (
      <>
        <circle
          className="defuse-border"
          cx={playerPos.x}
          cy={playerPos.y}
          r={defuseRadius}
          strokeWidth={0.35 * bombHeight}
        />
        <circle
          className="defuse-background"
          cx={playerPos.x}
          cy={playerPos.y}
          r={defuseRadius}
          strokeWidth={0.3 * bombHeight}
        />
        <circle
          className="defuse-progress"
          cx={playerPos.x}
          cy={playerPos.y}
          r={defuseRadius}
          strokeWidth={0.3 * bombHeight}
          strokeDasharray={getStrokeDasharray(circumference, defuseProgress)}
          strokeDashoffset={circumference * 0.25}
        />
      </>
    );
  };

  const renderPlayer = () => {
    const arrowLength = 30 * factor;
    const arrowHeight = 50 * factor;

    return (
      <>
        <polygon
          className="yaw"
          points={`0,0 ${arrowLength},${arrowHeight / 2} 0,${arrowHeight}`}
          transform={`translate(${playerPos.x}, ${
            playerPos.y
          }) rotate(${-yaw}) translate(${23 * factor}, ${-arrowHeight / 2})`}
        />
        <circle
          className="player"
          cx={playerPos.x}
          cy={playerPos.y}
          r={30 * factor}
          strokeWidth={8 * factor}
        />
      </>
    );
  };

  const renderHealth = () => {
    const healthRadius = 19 * factor;
    const circumference = 2 * Math.PI * healthRadius;
    const hpValue = (100 - status.hp) / 100;

    return (
      <circle
        className="health"
        cx={playerPos.x}
        cy={playerPos.y}
        r={healthRadius}
        strokeWidth={14 * factor}
        strokeDasharray={`${circumference * hpValue} ${
          circumference * (1 - hpValue)
        }`}
        strokeDashoffset={circumference * 0.25}
      />
    );
  };

  const renderWeapon = () => {
    return (
      <g className="weapon">
        {status.active < 500 ? (
          <WepSvg
            wep={equipmentTypeMap[status.active]}
            x={playerPos.x}
            y={playerPos.y - factor * 180}
            height={70 * factor}
          />
        ) : (
          <WepSvg
            wep={grenadeTypeMap[status.active]}
            x={playerPos.x}
            y={playerPos.y - factor * 210}
            height={100 * factor}
          />
        )}
      </g>
    );
  };

  const renderName = () => {
    return (
      <text
        className="nickname"
        x={playerPos.x}
        y={playerPos.y - factor * 70}
        dominantBaseline={"middle"}
        fontSize={70 * factor}
      >
        {`${name}`}
      </text>
    );
  };

  return (
    <g
      className={classNames("player-component", team, {
        bomb: bomb,
      })}
    >
      {renderPlant()}
      {renderDefuse()}
      {renderPlayer()}
      {renderBlindness()}
      {renderHealth()}
      {renderWeapon()}
      {renderName()}
    </g>
  );
};

const Players = ({ players, tick, map }) => {
  return (
    <g className="players">
      {players.map(({ player, status, pose }, idx) => (
        <Player
          key={idx}
          player={player}
          status={status}
          pose={pose}
          tick={tick}
          map={map}
        />
      ))}
    </g>
  );
};

export default Players;
