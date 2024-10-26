import React from "react";
import "./Kill.css";
import { WepSvg } from "../../../../../assets/icons";
import {
  equipmentTypeMap,
  grenadeTypeMap,
  mapRange,
  easeInOut,
  deserializeKillFlags,
} from "../../../../../utils/utils";

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
      <span className={`${killer} ${killFlags.killerTeam}`}>{killer}</span>
      <WepSvg wep={wepName} />
      <span className={`${victim} ${killFlags.victimTeam}`}>{victim}</span>
    </div>
  );
};

export default Kill;
