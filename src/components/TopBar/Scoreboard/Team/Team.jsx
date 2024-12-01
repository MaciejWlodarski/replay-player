import { useContext } from "react";
import { getTeam } from "../../../../utils/utils";
import { TickContext } from "../../../../providers/TickProvider";
import { RoundContext } from "../../../../providers/core/AppProviders";
import "./Team.css";

const Team = ({ side }) => {
  const tick = useContext(TickContext);
  const round = useContext(RoundContext);

  if (!round) return;

  const { info } = round;
  let { name, score } = getTeam(info, side);
  if (tick < round.endTick && side === info.winnerSide) {
    score--;
  }

  return (
    <div className={`team ${side}`}>
      <span className="name">{name}</span>
      <span className="score">{score}</span>
    </div>
  );
};

export default Team;
