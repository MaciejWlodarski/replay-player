import React, { useContext } from "react";
import Player from "./Player/Player";
import { RoundContext } from "../../../providers/core/AppProviders";
import "./Hud.css";

const Hud = ({ side }) => {
  const round = useContext(RoundContext);

  if (!round) return <div className={`hud ${side}`} />;

  return (
    <div className={`hud ${side}`}>
      {round.players.map((player, idx) => (
        <Player key={idx} player={player} side={side} />
      ))}
    </div>
  );
};

export default Hud;
