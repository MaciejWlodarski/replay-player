import React from "react";
import CheckboxButton from "/src/components/CheckboxButton/CheckboxButton";
import "./Rounds.css";

const Rounds = ({ matchData, rounds, roundId, setRoundId, setCurrTick }) => {
  if (!matchData) return;
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
                setCurrTick(0);
              }
            }}
            additionalClassName={"round noborder"}
          />
        );
      })}
    </div>
  );
};

export default Rounds;
