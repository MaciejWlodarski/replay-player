import React, { useContext } from "react";
import Button from "../ui/Button/Button";
import classNames from "classnames";
import { MatchContext } from "@/providers/GameDataProvider";
import { RoundManagerContext } from "@/providers/GameDataProvider";
import { SetTickContext, TickRefContext } from "@/providers/TickProvider";
import { SketchReducerDispatchContext } from "@/providers/SketchProvider";
import "./Rounds.css";

const Rounds = () => {
  const match = useContext(MatchContext);
  const { rounds, roundId, setRoundId, onRoundChange } =
    useContext(RoundManagerContext);
  const setTick = useContext(SetTickContext);
  const tickRef = useContext(TickRefContext);
  const sketchDispatch = useContext(SketchReducerDispatchContext);

  if (!match) return;

  const handleLeftClick = (roundIdx) => {
    if (roundIdx !== roundId) {
      setRoundId(roundIdx);
      onRoundChange(roundIdx + 1);
      setTick(0);
      tickRef.current = 0;

      sketchDispatch({ type: "CLEAR_PATHS" });
    }
  };

  return (
    <div className="rounds">
      {match.rounds.map(({ roundIdx, winnerSide }) => {
        const loaded = !!rounds[roundIdx];
        return (
          <Button
            key={roundIdx}
            className={classNames("round", winnerSide)}
            isChecked={roundIdx === roundId}
            onLeftClick={() => handleLeftClick(roundIdx)}
          >
            <span className={classNames({ loaded: loaded })}>
              {roundIdx + 1}
            </span>
          </Button>
        );
      })}
    </div>
  );
};

export default Rounds;
