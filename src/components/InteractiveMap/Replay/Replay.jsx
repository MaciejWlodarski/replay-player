import React from "react";
import Death from "./Death/Death";
import Shot from "./Shot/Shot";
import Player from "./Player/Player";
import Grenade from "./Grenade/Grenade";
import Inferno from "./Inferno/Inferno";
import Bomb from "./Bomb/Bomb";
import "./Replay.css";

const Replay = ({ data, mapData, factor, tick }) => {
  if (!data) return;
  const { players, deaths, shots, grenades, infernos, plant, defuse } = data;
  return (
    <>
      <defs>
        <linearGradient id="shotGradient" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity={1} />
          <stop offset="100%" stopColor="white" stopOpacity={0} />
        </linearGradient>
      </defs>

      <g className="infernos">
        {infernos.map((inferno, idx) => (
          <Inferno
            key={idx}
            inferno={inferno}
            mapData={mapData}
            factor={factor}
            tick={tick}
          />
        ))}
      </g>

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

      <g className="bomb">
        <Bomb
          plant={plant}
          defuse={defuse}
          mapData={mapData}
          factor={factor}
          tick={tick}
        />
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

      <g className="grenades">
        {grenades.map((grenade, idx) => {
          return (
            <Grenade
              key={idx}
              grenade={grenade}
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
