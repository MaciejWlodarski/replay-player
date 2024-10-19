import { deserializeKillFlags } from "../../utils/utils";

const getMarks = (round) => {
  const marks = {};

  const addMark = (tick, element) => {
    if (!marks[tick]) {
      marks[tick] = element;
    } else {
      marks[tick] = (
        <>
          {marks[tick]}
          {element}
        </>
      );
    }
  };

  for (let i = 320; i <= round.lastTick; i += 320) {
    addMark(i, <div className="mark interval" />);
  }

  round.grenades.forEach((gnd) => {
    const { start, side } = gnd;
    const team = side === 2 ? "t" : "ct";
    addMark(start, <div className={`mark-triangle grenade ${team}`} />);
  });

  round.kills.forEach((kill) => {
    const flags = deserializeKillFlags(kill.flags);
    addMark(kill.tick, <div className={`mark kill ${flags.victimTeam}`} />);
  });

  if (round.plant) {
    addMark(round.plant.tick, <div className="mark plant" />);
  }

  addMark(round.endTick, <div className="mark end" />);

  round.marks = marks;
};

export default getMarks;
