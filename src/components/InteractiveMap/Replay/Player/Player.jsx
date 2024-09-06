import React from "react";
import { WepSvg } from "/src/assets/icons";
import {
  getPlayerPose,
  getPlayerStatus,
  equipmentTypeMap,
  grenadeTypeMap,
} from "/src/utils/utils";
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

  const arrowLength = 30 * factor;
  const arrowHeight = 50 * factor;

  const healthRadius = 19 * factor;
  const circumference = 2 * Math.PI * healthRadius;
  const hpValue = (100 - status.hp) / 100;

  return (
    <g className={`player-component ${team}`}>
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
      <circle
        className="health"
        cx={playerPos.x}
        cy={playerPos.y}
        r={19 * factor}
        strokeWidth={14 * factor}
        strokeDasharray={`${circumference * hpValue} ${
          circumference * (1 - hpValue)
        }`}
        strokeDashoffset={circumference * 0.25}
      />
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
      <text
        className="nickname"
        x={playerPos.x}
        y={playerPos.y - factor * 70}
        dominantBaseline={"middle"}
        fontSize={70 * factor}
      >
        {`${name}`}
      </text>
    </g>
  );
};

export default Player;
