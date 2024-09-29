import React, { useMemo } from "react";
import icons, { WepSvg } from "/src/assets/icons";
import { Shield, ShieldPlus, Skull } from "lucide-react";
import { equipmentTypeMap } from "/src/utils/utils";
import { getPlayerStatus } from "/src/replay/player";

const Death = ({ status }) => {
  if (!status.hp)
    return (
      <div className="death">
        <span>
          <Skull className="skull" />
        </span>
      </div>
    );
};

const Grenades = ({ status }) => {
  const grenades = useMemo(
    () => ({
      decoy: <icons.normal.decoy className="grenade-icon" />,
      molo: <icons.normal.molotov className="grenade-icon" />,
      inc: <icons.normal.incendiary className="grenade-icon" />,
      smoke: <icons.normal.smoke className="grenade-icon" />,
      flash: <icons.normal.flashbang className="grenade-icon" />,
      he: <icons.normal.he className="grenade-icon" />,
    }),
    []
  );

  return (
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
  );
};

const Player = ({ player, tick, side }) => {
  const sideId = side === "t" ? 2 : 3;
  if (player.side !== sideId) return;

  let status = getPlayerStatus(player, tick);
  const hp = status.hp || 0;

  if (!hp) status = { tick: status.tick };

  return (
    <div className={`player ${!hp ? "dead" : ""}`}>
      <Death status={status} />
      <div className="top">
        <div className="left">
          <div className="health-bar" style={{ width: `${hp}%` }} />
          <div className="health-container">
            <span className="health">{hp ? hp : ""}</span>
          </div>
          <span className="nickname">{`${player.name}`}</span>
        </div>
        {!!hp && (
          <div className="right">
            <WepSvg wep={equipmentTypeMap[status.prime || status.sec]} />
          </div>
        )}
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
          <span className="spec">
            {status.spec ? (
              side === "t" ? (
                <icons.normal.c4 className="spec-icon" />
              ) : (
                <icons.normal.item_defuser className="spec-icon" />
              )
            ) : null}
          </span>
          <div className="secondary">
            {status.prime && <WepSvg wep={equipmentTypeMap[status.sec]} />}
          </div>
        </div>
        <Grenades status={status} />
      </div>
    </div>
  );
};

export default Player;
