import React from "react";
import icons, { WepSvg } from "/src/assets/icons";
import { Shield, ShieldPlus, Skull } from "lucide-react";
import { getPlayerStatus, equipmentTypeMap, getTeam } from "/src/utils/utils";
import "./Hud.css";

const Hud = ({ matchData, roundId, replayData, tick, tSide }) => {
  if (!matchData) return;
  const roundData = matchData.rounds[roundId - 1];
  const sideName = tSide ? "t" : "ct";
  const team = getTeam(roundData, sideName);

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
      <div className="team">
        <div className="team-name">
          <span className="name">{team.name}</span>
        </div>
        <span className="score">{team.score}</span>
      </div>
      {replayData?.players.map((player, idx) => {
        const side = tSide ? 2 : 3;
        if (player.side !== side) return;

        let status = getPlayerStatus(player, tick);
        const hp = status.hp || 0;

        if (!hp) {
          status = { tick: status.tick };
        }

        return (
          <div key={idx} className={`player ${!hp ? "dead" : ""}`}>
            {!hp && (
              <div className="death">
                <span>
                  <Skull className="skull" />
                </span>
              </div>
            )}
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
                  {WepSvg(equipmentTypeMap[status.prime || status.sec])}
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
                    tSide ? (
                      <icons.normal.c4 className="spec-icon" />
                    ) : (
                      <icons.normal.item_defuser className="spec-icon" />
                    )
                  ) : null}
                </span>
                <div className="secondary">
                  {status.prime && WepSvg(equipmentTypeMap[status.sec])}
                </div>
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
