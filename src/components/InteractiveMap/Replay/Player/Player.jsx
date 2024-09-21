import React, { useContext } from "react";
import icons, { WepSvg } from "/src/assets/icons";
import { RoundContext, MapContext } from "../../../../hooks/context";
import {
  equipmentTypeMap,
  grenadeTypeMap,
  getStrokeDasharray,
} from "/src/utils/utils";
import {
  getPlayerPose,
  getPlayerStatus,
  getPlayerBlindness,
  getPlayerPlantProgress,
  getPlayerDefuseProgress,
} from "/src/replay/player";
import "./Player.css";

const Player = ({ player }) => {
  const { map, factor, tick } = useContext(MapContext);

  const { name, side } = player;
  const status = getPlayerStatus(player, tick);
  if (!status.hp) return;

  const pose = getPlayerPose(player, tick);
  const { pos, yaw } = pose;

  const playerPos = {
    x: (pos.x - map.start.x) * factor,
    y: (map.start.y - pos.y) * factor,
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

  const renderBomb = () => {
    if (team == "ct" || !status.spec) return;
    const bombSize = 50 * factor;

    const renderBombBackground = () => {
      const width = 0.85 * bombSize;
      const height = 0.55 * bombSize;

      return (
        <rect
          className="bomb-background"
          x={playerPos.x - width / 2}
          y={playerPos.y - height / 2}
          width={width}
          height={height}
          rx={0.07 * bombSize}
        />
      );
    };

    return (
      <g
        className="bomb-eq"
        transform={`rotate(${-yaw + 90}, ${playerPos.x}, ${
          playerPos.y
        }) translate(0, ${42 * factor})`}
      >
        {renderBombBackground()}
        <icons.normal.c4
          x={playerPos.x - bombSize / 2}
          y={playerPos.y - bombSize / 2}
          height={bombSize}
          width={bombSize}
        />
      </g>
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
      {renderBomb()}
      {renderWeapon()}
      {renderName()}
    </g>
  );
};

const Players = () => {
  const { players } = useContext(RoundContext);

  return (
    <g className="players">
      {players.map((player, idx) => {
        return <Player key={idx} player={player} />;
      })}
    </g>
  );
};

export default Players;
