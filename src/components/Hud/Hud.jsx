import React, { useContext } from "react";
import Player from "./Player/Player";
import Team from "./Team/Team";
import { getTeam } from "/src/utils/utils";
import { RoundContext, TickContext } from "../../hooks/context/context";
import "./Hud.css";

const Hud = ({ side }) => {
  const tick = useContext(TickContext);
  const round = useContext(RoundContext);

  if (!round) return <div className={`hud ${side}`} />;

  const { info } = round;
  let { name, score } = getTeam(info, side);
  if (tick < round.endTick && side === info.winnerSide) {
    score--;
  }

  return (
    <div className={`hud ${side}`}>
      <Team name={name} score={score} />
      {round.players.map((player, idx) => (
        <Player key={idx} player={player} tick={tick} side={side} />
      ))}
    </div>
  );
};

export default Hud;
