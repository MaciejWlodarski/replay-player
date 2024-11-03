import React, { useContext, memo } from "react";
import classNames from "classnames";
import {
  MatchContext,
  RoundContext,
  TickContext,
} from "../../../../hooks/context/context";
import Deaths from "./Death/Death";
import Shots from "./Shot/Shot";
import Players from "./Player/Player";
import Grenades from "./Grenade/Grenade";
import Infernos from "./Inferno/Inferno";
import Equipment from "./Equipment/Equipment";
import Bomb from "./Bomb/Bomb";
import HoveredGrenade from "./HoveredGrenade/HoveredGrenade";
import { getGroupedObjects } from "../../../../replay/replay";
import "./Replay.css";

const Replay = ({ level }) => {
  const round = useContext(RoundContext);
  const tick = useContext(TickContext);
  const { map } = useContext(MatchContext);

  if (!round) return;

  const levels = map.lower === null ? ["on"] : ["off", "on"];

  const { infernos, deaths, equipment, bombEvents, shots, players, grenades } =
    getGroupedObjects(round, tick, map, level);

  return (
    <>
      {levels.map((group) => (
        <g key={group} className={classNames("replay", group)}>
          <Infernos infernos={infernos[group]} tick={tick} map={map} />
          <Deaths deaths={deaths[group]} map={map} />
          <Equipment equipment={equipment[group]} map={map} />
          <Bomb events={bombEvents[group]} tick={tick} map={map} />
          <Shots shots={shots[group]} map={map} />
          <Players players={players[group]} tick={tick} map={map} />
          <Grenades grenades={grenades[group]} tick={tick} map={map} />
        </g>
      ))}
      <HoveredGrenade />
    </>
  );
};

export default memo(Replay);
