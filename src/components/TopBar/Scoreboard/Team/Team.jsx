import { useContext } from "react";
import { RoundContext, TickContext } from "../../../../hooks/context/context";
import { getTeam } from "../../../../utils/utils";
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
      <div className="separator" />
      <span className="score">{score}</span>
    </div>
  );
};

export default Team;
