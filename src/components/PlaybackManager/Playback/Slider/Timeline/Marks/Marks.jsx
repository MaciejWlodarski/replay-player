import { memo, useContext } from "react";
import { deserializeKillFlags } from "../../../../../../utils/utils";
import { Calculator } from "lucide-react";
import { RoundContext } from "../../../../../../providers/core/AppProviders";
import "./Marks.css";

const IntervalMarks = () => {
  const { lastTick } = useContext(RoundContext);

  const intervals = [];

  for (let i = 320; i <= lastTick; i += 320) {
    intervals.push(
      <div
        key={i}
        className="mark interval"
        style={{ left: `${(i / lastTick) * 100}%` }}
      />
    );
  }

  return intervals;
};

const GrenadeMarks = () => {
  const { lastTick, grenades } = useContext(RoundContext);

  return grenades.map((gnd, idx) => {
    const { start, side } = gnd;
    const team = side === 2 ? "t" : "ct";

    return (
      <div
        key={idx}
        className={`mark triangle grenade ${team}`}
        style={{ left: `${(start / lastTick) * 100}%` }}
      />
    );
  });
};

const KillMarks = () => {
  const { lastTick, kills } = useContext(RoundContext);

  return kills.map((kill, idx) => {
    const flags = deserializeKillFlags(kill.flags);

    return (
      <div
        key={idx}
        className={`mark kill ${flags.victimTeam}`}
        style={{ left: `${(kill.tick / lastTick) * 100}%` }}
      />
    );
  });
};

const PlantMark = () => {
  const { lastTick, plant } = useContext(RoundContext);
  if (!plant) return;

  return (
    <div
      className="mark plant"
      style={{ left: `${(plant.tick / lastTick) * 100}%` }}
    >
      <Calculator className="bomb" size={14} strokeWidth={2} />
    </div>
  );
};

const EndRoundMark = () => {
  const { lastTick, endTick } = useContext(RoundContext);

  return (
    <div
      className={`mark end`}
      style={{ left: `${(endTick / lastTick) * 100}%` }}
    />
  );
};

const Marks = () => {
  return (
    <div className="marks">
      <IntervalMarks />
      <KillMarks />
      <PlantMark />
      <EndRoundMark />
      <GrenadeMarks />
    </div>
  );
};

export default memo(Marks);
