import { memo, useContext } from "react";
import { RoundContext } from "../../../../../../providers/core/AppProviders";
import { TickContext } from "../../../../../../providers/TickProvider";
import "./Periods.css";

const Periods = () => {
  const { winner, lastTick, plant, endTick } = useContext(RoundContext);
  const tick = useContext(TickContext);

  const start = Math.max(Math.min(plant?.tick || Infinity, endTick), tick);
  const delta = lastTick - start;

  const end = ((lastTick - endTick) / delta) * 100;
  const left = (start / lastTick) * 100;
  const width = 100 - left;

  const team = winner === 2 ? "t" : "ct";

  return (
    <div
      className="periods"
      style={{
        left: `${left}%`,
        width: `${width}%`,
      }}
    >
      <div
        className={`post-round ${team}`}
        style={{ minWidth: `${end}%`, maxWidth: `${end}%` }}
      />
      {plant && <div className="post-plant" />}
    </div>
  );
};

export default memo(Periods);
