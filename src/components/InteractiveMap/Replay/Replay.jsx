import React from "react";
import Death from "./Death/Death";
import Shot from "./Shot/Shot";
import Player from "./Player/Player";
import "./Replay.css";

const Replay = ({ data, mapData, factor, tick }) => {
  if (!data) return;
  const { deaths, shots, players } = data;
  return (
    <>
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
        {shots[tick]?.map((shot, idx) => (
          <Shot key={idx} shot={shot} mapData={mapData} factor={factor} />
        ))}
      </g>
      <g className="players">
        {players.map((player, idx) => (
          <Player
            key={idx}
            player={player}
            mapData={mapData}
            factor={factor}
            tick={tick}
          />
        ))}
      </g>
    </>
  );
};

export default Replay;
