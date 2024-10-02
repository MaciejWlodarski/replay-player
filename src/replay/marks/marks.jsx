import { deserializeKillFlags, getTeamFromBool } from "../../utils/utils";
import "./marks.css";

const getMarks = (round) => {
  const marks = {};

  for (let i = 320; i <= round.lastTick; i += 320) {
    marks[i] = <div className="mark interval" />;
  }

  round.grenades.forEach((gnd) => {
    const { start, side } = gnd;
    const team = side == 2 ? "t" : "ct";

    marks[start] = <div className={`mark-triangle grenade ${team}`} />;
  });

  round.kills.forEach((kill) => {
    const flags = deserializeKillFlags(kill.flags);
    marks[kill.tick] = <div className={`mark kill ${flags.victimTeam}`} />;
  });

  if (round.plant) {
    marks[round.plant.tick] = <div className="mark plant" />;
  }

  marks[[round.endTick]] = <div className="mark end" />;

  round.marks = marks;
};

export default getMarks;
