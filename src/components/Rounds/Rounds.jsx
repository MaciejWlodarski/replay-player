import React, { memo, useContext } from "react";
import CheckboxButton from "/src/components/CheckboxButton/CheckboxButton";
import { MatchContext, SetTickContext } from "../../hooks/context/context";
import "./Rounds.css";

const Rounds = ({ rounds, roundId, setRoundId }) => {
  const match = useContext(MatchContext);
  const setTick = useContext(SetTickContext);

  if (!match) return;

  return (
    <div className="rounds">
      {match.rounds.map((round) => {
        const { roundIdx, winnerSide } = round;
        const loaded = !!rounds[roundIdx];
        return (
          <CheckboxButton
            key={roundIdx}
            label={
              <div className="round-content">
                <span className={`team ${winnerSide}`}>{"•"}</span>
                <span className={loaded ? "loaded" : ""}>{roundIdx + 1}</span>
              </div>
            }
            isChecked={roundIdx === roundId}
            onButtonDown={() => {
              if (roundIdx !== roundId) {
                setRoundId(roundIdx);
                setTick(0);
              }
            }}
            additionalClassName={"round noborder"}
          />
        );
      })}
    </div>
  );
};

export default memo(Rounds);
