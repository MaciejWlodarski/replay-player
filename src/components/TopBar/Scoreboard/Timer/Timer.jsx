import { useContext } from "react";
import { tickToTime } from "/src/utils/utils.js";
import { RoundContext, TickContext } from "../../../../hooks/context/context";
import { Timer as TimerIcon } from "lucide-react";
import "./Timer.css";

const Timer = ({ showTick }) => {
  const round = useContext(RoundContext);
  const tick = useContext(TickContext);

  if (!round) return;

  const { maxTime, lastTick, endTick, plant } = round;
  const afterEnd = tick > endTick;
  const afterPlant = tick >= plant?.tick;

  const time = () => {
    if (afterEnd) return lastTick - tick;
    if (afterPlant) return plant.tick + 2560 - tick;
    return maxTime - tick;
  };

  return (
    <div className={`timer ${afterPlant && !afterEnd ? "plant" : ""}`}>
      <div className="time">
        <TimerIcon className="icon" />
        {tickToTime(time())}
      </div>
      {showTick && <div className="time">{Math.round(tick)}</div>}
    </div>
  );
};

export default Timer;
