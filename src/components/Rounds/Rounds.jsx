import React, { memo, useContext } from "react";
import {
  MatchContext,
  SetTickContext,
  SketchReducerDispatchContext,
  TickRefContext,
} from "../../hooks/context/context";
import Button from "../ui/Button/Button";
import classNames from "classnames";
import "./Rounds.css";

const Rounds = ({ rounds, roundId, setRoundId }) => {
  const match = useContext(MatchContext);
  const setTick = useContext(SetTickContext);
  const tickRef = useContext(TickRefContext);
  const sketchDispatch = useContext(SketchReducerDispatchContext);

  if (!match) return;

  const handleLeftClick = (roundIdx) => {
    if (roundIdx !== roundId) {
      setRoundId(roundIdx);
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

export default memo(Rounds);
