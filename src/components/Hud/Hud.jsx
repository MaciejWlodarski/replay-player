import React from "react";
import icons, { WepSvg } from "/src/assets/icons";
import { Shield, ShieldPlus } from "lucide-react";
import "./Hud.css";
import { getPlayerStatus, equipmentTypeMap } from "../../utils/utils";

const Hud = ({ data, tick, tSide }) => {
  const sideName = tSide ? "t" : "ct";

  const grenades = {
    fire: tSide ? (
      <icons.normal.molotov className="grenade-icon" />
    ) : (
      <icons.normal.incendiary className="grenade-icon" />
    ),
    decoy: <icons.normal.decoy className="grenade-icon" />,
    smoke: <icons.normal.smoke className="grenade-icon" />,
    flash: <icons.normal.flashbang className="grenade-icon" />,
    he: <icons.normal.he className="grenade-icon" />,
  };

  return (
    <div className={`hud ${sideName}`}>
      {data?.players.map((player, idx) => {
        const side = tSide ? 2 : 3;
        if (player.side !== side) return;

        let status = getPlayerStatus(player, tick);
        const hp = status.hp || 0;

        if (!hp) {
          status = { tick: status.tick };
        }

        return (
          <div key={idx} className={`player ${!hp ? "dead" : ""}`}>
            <div className="top">
              <div className="left">
                <div className="health-bar" style={{ width: `${hp}%` }} />
                <div className="health-container">
                  <span className="health">{hp}</span>
                </div>
                <span className="nickname">{`${player.name}`}</span>
              </div>
              <div className="right">
                {WepSvg(equipmentTypeMap[status.prime || status.sec])}
              </div>
            </div>
            <div className="bottom">
              <div className="left">
                <span className="armor">
                  {status.helmet ? (
                    <ShieldPlus className="shield" />
                  ) : status.armor ? (
                    <Shield className="shield" />
                  ) : null}
                </span>
                <span className="kit">
                  {status.kit ? (
                    <icons.normal.item_defuser className="kit-icon" />
                  ) : null}
                </span>
              </div>
              <div className="right">
                {Object.entries(grenades).map(([key, val]) => {
                  const len = status[key] || 0;
                  return Array.from({ length: len }, (_, index) => (
                    <span key={`${key}-${index}`} className={`grenade ${key}`}>
                      {val}
                    </span>
                  ));
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Hud;
