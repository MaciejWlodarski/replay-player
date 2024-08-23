import React from "react";
import Death from "./Death/Death";
import Shot from "./Shot/Shot";
import Player from "./Player/Player";
import "./Replay.css";

const Replay = ({ data, mapData, factor, tick }) => {
  if (!data) return;
  const { deaths, shots, players } = data;
  console.log(tick);
  return (
    <>
      <defs>
        <linearGradient id="shotGradient" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity={1} />
          <stop offset="100%" stopColor="white" stopOpacity={0} />
        </linearGradient>
      </defs>

      <g className="deaths">
        {deaths.map((death, idx) => (
          <Death
            key={idx}
            death={death}
            mapData={mapData}
            factor={factor}
            tick={tick}
          />
        ))}
      </g>
      <g className="shots">
        {shots[Math.floor(tick)]?.map((shot, idx) => (
          <Shot
            key={idx}
            shot={shot}
            mapData={mapData}
            factor={factor}
            gradient={"shotGradient"}
          />
        ))}
      </g>
      <g className="players">
        {players.map((player, idx) => {
          return (
            <Player
              key={idx}
              player={player}
              mapData={mapData}
              factor={factor}
              tick={tick}
            />
          );
        })}
      </g>
    </>
  );
};

export default Replay;
