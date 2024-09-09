import React from "react";
import { WepSvg } from "/src/assets/icons";
import { equipmentTypeMap, grenadeTypeMap } from "/src/utils/utils";
import {
  getPlayerPose,
  getPlayerStatus,
  getPlayerBlindness,
  getPlayerPlantState,
  getPlayerDefuseState,
} from "/src/replay/player";
import "./Player.css";

const Player = ({ player, mapData, factor, tick }) => {
  const { name, side } = player;
  const status = getPlayerStatus(player, tick);
  if (!status.hp) return;

  const pose = getPlayerPose(player, tick);
  const { pos, yaw } = pose;

  const playerPos = {
    x: (pos.x - mapData.start.x) * factor,
    y: (mapData.start.y - pos.y) * factor,
  };

  const team = side == 2 ? "t" : "ct";

  const renderBlindness = () => {
    const blindness = getPlayerBlindness(player, tick);
    if (!blindness) return;
    const opacity = Math.min(1, blindness / 64) * 0.8;
    return (
      <circle
        className="blindness"
        cx={playerPos.x}
        cy={playerPos.y}
        r={30 * factor}
        opacity={opacity}
      />
    );
  };

  const renderPlant = () => {
    const plant = getPlayerPlantState(player, tick);
    if (!plant) return;

    const plantRadius = 40 * factor;
    const circumference = 2 * Math.PI * plantRadius;
    const plantState = (200 - plant) / 200;

    return (
      <>
        <circle
          className="plant-border"
          cx={playerPos.x}
          cy={playerPos.y}
          r={plantRadius}
          strokeWidth={33 * factor}
          strokeDasharray={`${circumference * plantState} ${
            circumference * (1 - plantState)
          }`}
          strokeDashoffset={circumference * 0.25}
        />
        <circle
          className="plant"
          cx={playerPos.x}
          cy={playerPos.y}
          r={plantRadius}
          strokeWidth={30 * factor}
          strokeDasharray={`${circumference * plantState} ${
            circumference * (1 - plantState)
          }`}
          strokeDashoffset={circumference * 0.25}
        />
      </>
    );
  };

  const renderDefuse = () => {
    const defuse = getPlayerDefuseState(player, tick);
    if (!defuse) return;

    const defuseRadius = 40 * factor;
    const circumference = 2 * Math.PI * defuseRadius;

    return (
      <>
        <circle
          className="defuse-border"
          cx={playerPos.x}
          cy={playerPos.y}
          r={defuseRadius}
          strokeWidth={33 * factor}
          strokeDasharray={`${circumference * defuse} ${
            circumference * (1 - defuse)
          }`}
          strokeDashoffset={circumference * 0.25}
        />
        <circle
          className="defuse"
          cx={playerPos.x}
          cy={playerPos.y}
          r={defuseRadius}
          strokeWidth={30 * factor}
          strokeDasharray={`${circumference * defuse} ${
            circumference * (1 - defuse)
          }`}
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
    <g className={`player-component ${team}`}>
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

export default Player;
