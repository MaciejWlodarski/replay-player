import React from "react";
import "./Kill.css";
import { WepSvg } from "../../../../assets/icons";
import {
  equipmentTypeMap,
  grenadeTypeMap,
  getTeamFromBool,
} from "../../../../utils/utils";

const Kill = ({ kill, tick }) => {
  const {
    tick: killTick,
    kil: killer,
    vct: victim,
    ast: assister,
    wep,
    flags,
  } = kill;

  if (killTick > tick || killTick + 64 * 5 < tick) return;

  const deserializeFlags = () => {
    return {
      killerTeam: getTeamFromBool(!!(flags & (1 << 0))),
      victimTeam: getTeamFromBool(!!(flags & (1 << 1))),
      assisterTeam: getTeamFromBool(!!(flags & (1 << 2))),
      isHeadshot: !!(flags & (1 << 3)),
      wallbang: !!(flags & (1 << 4)),
      throughSmoke: !!(flags & (1 << 5)),
      noScope: !!(flags & (1 << 6)),
      inAir: !!(flags & (1 << 7)),
      assistedFlash: !!(flags & (1 << 8)),
      attackerBlind: !!(flags & (1 << 9)),
    };
  };
  const killFlags = deserializeFlags();
  const wepName = equipmentTypeMap[wep] || grenadeTypeMap[wep];

  return (
    <div className="kill">
      <div className="kill-background" />
      <span className={`${killer} ${killFlags.killerTeam}`}>{killer}</span>
      <WepSvg wep={wepName} />
      <span className={`${victim} ${killFlags.victimTeam}`}>{victim}</span>
    </div>
  );
};

export default Kill;
