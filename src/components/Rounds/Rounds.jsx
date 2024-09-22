import React, { memo, useContext } from "react";
import CheckboxButton from "/src/components/CheckboxButton/CheckboxButton";
import { SetTickContext } from "../../hooks/context/context";
import "./Rounds.css";

const Rounds = ({ matchData, rounds, roundId, setRoundId }) => {
  if (!matchData) return;

  const setTick = useContext(SetTickContext);

  return (
    <div className="rounds">
      {matchData.rounds.map((round) => {
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
