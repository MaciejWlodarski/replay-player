import React from "react";
import icons, { WepSvg } from "../../../../../assets/icons";
import {
  equipmentTypeMap,
  grenadeTypeMap,
  mapRange,
  easeInOut,
  deserializeKillFlags,
} from "../../../../../utils/utils";
import "./Kill.css";

const Kill = ({ kill, tick }) => {
  const {
    tick: killTick,
    kil: killer,
    vct: victim,
    ast: assister,
    wep,
    flags,
  } = kill;

  if (killTick > tick || tick > killTick + 64 * 6) return;

  const killFlags = deserializeKillFlags(flags);
  const wepName = equipmentTypeMap[wep] || grenadeTypeMap[wep];

  const easeOpacity = (() => {
    const delta = tick - killTick;
    if (delta < 8) {
      const f = delta / 8;
      return easeInOut(f);
    }

    if (delta <= 320) return 1;

    const f = Math.min(32, delta - 320) / 32;
    return 1 - easeInOut(f);
  })();

  const easeRest = (() => {
    const delta = tick - killTick;
    if (delta <= 352) return 1;

    const f = Math.min(32, delta - 352) / 32;
    return 1 - easeInOut(f);
  })();

  const renderBlind = () => {
    if (!killFlags.attackerBlind) return;
    return <icons.killfeed.blind className="icon" />;
  };

  const renderAssist = () => {
    if (!assister) return;
    return (
      <>
        <span>+</span>
        <span className={killFlags.assisterTeam}>{assister}</span>
      </>
    );
  };

  const renderNoScope = () => {
    if (!killFlags.noScope) return;
    return <icons.killfeed.noscope className="icon" />;
  };

  const renderSmokeKill = () => {
    if (!killFlags.throughSmoke) return;
    return <icons.killfeed.smokeKill className="icon" />;
  };

  const renderHeadshot = () => {
    if (!killFlags.isHeadshot) return;
    return <icons.killfeed.headshot className="icon" />;
  };

  const renderWallbang = () => {
    if (!killFlags.wallbang) return;
    return <icons.killfeed.wallbang className="icon" />;
  };

  return (
    <div
      className="kill"
      style={{
        opacity: easeOpacity,
        height: `${mapRange(easeRest, 0, 1, 0, 24)}px`,
        marginBottom: `${mapRange(easeRest, 0, 1, 0, 4)}px`,
      }}
    >
      <div className="kill-background" />
      {renderBlind()}
      <span className={killFlags.killerTeam}>{killer}</span>
      {renderAssist()}
      <WepSvg wep={wepName} />
      {renderNoScope()}
      {renderSmokeKill()}
      {renderHeadshot()}
      {renderWallbang()}
      <span className={killFlags.victimTeam}>{victim}</span>
    </div>
  );
};

export default Kill;
