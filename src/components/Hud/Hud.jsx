import React from "react";
import icons from "/src/assets/icons";
import { Shield, ShieldPlus } from "lucide-react";
import "./Hud.css";

const Hud = ({ data, tick, tSide }) => {
  const sideName = tSide ? "t" : "ct";
  return (
    <div className={`hud ${sideName}`}>
      {data?.players.map((player, idx) => {
        const side = tSide ? 2 : 3;
        if (player.side !== side) return;

        const state = player.states[tick];
        const {
          hp = 0,
          armor = false,
          helmet = false,
          kit = false,
        } = state?.status || {};

        return (
          <div key={idx} className={`player ${hp === 0 ? "dead" : ""}`}>
            <div className="top">
              <div className="health-bar" style={{ width: `${hp}%` }} />
              <div className="health-container">
                <span className="health">{hp}</span>
              </div>
              <span className="nickname">{player.name}</span>
            </div>
            <div className="bottom">
              <span className="armor">
                {helmet ? (
                  <ShieldPlus className="shield" />
                ) : armor ? (
                  <Shield className="shield" />
                ) : null}
              </span>
              <span className="kit">
                {kit ? <icons.normal.item_defuser /> : null}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Hud;
