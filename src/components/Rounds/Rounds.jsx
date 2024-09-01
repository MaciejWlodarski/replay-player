import React from "react";
import CheckboxButton from "/src/components/CheckboxButton/CheckboxButton";
import "./Rounds.css";

const Rounds = ({ matchData, roundId, setRoundId, setCurrTick, setData }) => {
  if (!matchData) return;
  return (
    <div className="rounds">
      {matchData.rounds.map((round) => {
        const { round_idx, winner_side } = round;
        return (
          <CheckboxButton
            key={round_idx}
            label={
              <div className="round-content">
                <span className={`team ${winner_side}`}>{"•"}</span>
                <span>{round_idx}</span>
              </div>
            }
            isChecked={round_idx === roundId}
            onButtonDown={() => {
              if (round_idx !== roundId) {
                setData(null);
                setRoundId(round_idx);
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
