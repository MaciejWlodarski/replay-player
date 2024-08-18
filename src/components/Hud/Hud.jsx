import React from "react";
import "./Hud.css";

const Hud = ({ data, tick, tSide }) => {
  const sideName = tSide ? "t" : "ct";
  return (
    <div className={`hud ${sideName}`}>
      {data?.players.map((player, idx) => {
        const side = tSide ? 2 : 3;
        if (player.side !== side) return;

        const state = player.states[tick];
        const hp = state?.status?.hp || 0;
        return (
          <div key={idx} className={`player ${hp === 0 ? "dead" : ""}`}>
            <div className="top">
              <div className="health-bar" style={{ width: `${hp}%` }} />
              <span className="nickname">{player.name}</span>
              <span className="health">{hp}</span>
            </div>
            <div className="bottom"></div>
          </div>
        );
      })}
    </div>
  );
};

export default Hud;
