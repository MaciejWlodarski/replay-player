import React, { useContext } from "react";
import Player from "./Player/Player";
import { RoundContext, TickContext } from "../../hooks/context/context";
import "./Hud.css";

const Hud = ({ side }) => {
  const tick = useContext(TickContext);
  const round = useContext(RoundContext);

  if (!round) return <div className={`hud ${side}`} />;

  return (
    <div className={`hud ${side}`}>
      {round.players.map((player, idx) => (
        <Player key={idx} player={player} tick={tick} side={side} />
      ))}
    </div>
  );
};

export default Hud;
