import React, { useMemo } from "react";
import icons, { WepSvg } from "/src/assets/icons";
import { CircleX, Crosshair, Shield, ShieldPlus, Skull } from "lucide-react";
import { equipmentTypeMap } from "/src/utils/utils";
import { getPlayerStatus } from "/src/replay/player";

const Death = ({ status }) => (
  <div className={`death ${!status.hp ? "visible" : ""}`}>
    <span>
      <Skull size={28} className="skull" />
    </span>
  </div>
);

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
    <div className="grenades">
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

  const { kills, deaths, money } = status;
  const hp = status.hp || 0;

  if (!hp) status = { tick: status.tick, kills, deaths, money };

  return (
    <>
      <div className={`player-grid ${!hp ? "dead" : ""}`}>
        <div className="health">
          <span className="hp-value"> {hp ? hp : null}</span>
        </div>
        <div className="nickname">
          <span>{player.name}</span>
        </div>
        <div className="primary">
          <WepSvg wep={equipmentTypeMap[status.prime || status.sec]} />
        </div>
        <div className="spec">
          {status.spec ? (
            side === "t" ? (
              <icons.normal.c4 />
            ) : (
              <icons.normal.item_defuser />
            )
          ) : null}
        </div>
        <div className="stats">
          <div className="kills">
            <Crosshair strokeWidth={2} size={16} className="stat-crosshair" />
            <span>{kills}</span>
          </div>
          <div className="deaths">
            <CircleX strokeWidth={2} size={16} className="stat-skull" />
            <span>{deaths}</span>
          </div>
        </div>
        <div className="secondary">
          {status.prime && <WepSvg wep={equipmentTypeMap[status.sec]} />}
        </div>
        <div className="armor">
          {status.helmet ? (
            <ShieldPlus strokeWidth={1.5} size={20} className="shield" />
          ) : status.armor ? (
            <Shield strokeWidth={1.5} size={20} className="shield" />
          ) : null}
        </div>
        <div className="money">
          <span>{`$${money}`}</span>
        </div>
        <Grenades status={status} />
        <div className="health-bar" style={{ width: `${hp}%` }} />
        <Death status={status} />
      </div>
    </>
  );
};

export default Player;
