import { fetchReplayData } from "../api/fetchRoundData";
import { groupBombEvents } from "./bomb";
import { getEquipment, groupEquipment } from "./equipment";
import { getGrenades, groupGrenades } from "./grenade";
import { getInfernos, groupInfernos } from "./inferno";
import {
  getPlayerEvents,
  groupDeaths,
  groupPlayers,
  groupShots,
} from "./player";

export const getRoundData = async (match, rounds, roundId, setRounds) => {
  let round = rounds[roundId];
  if (round) return round;

  round = await fetchReplayData(match, roundId);
  if (!round) return;

  const { ver, winner, max, last, end, plant, defuse, kills } = round;
  console.log(ver);

  const { players, deaths, shots } = getPlayerEvents(round);
  const grenades = getGrenades(round);
  const infernos = getInfernos(round);
  const equipment = getEquipment(round);

  setRounds((rounds) => {
    const updatedRounds = [...rounds];
    updatedRounds[roundId] = {
      id: roundId,
      info: match.rounds[roundId],

      players,
      deaths,
      shots,
      grenades,
      infernos,
      kills,
      equipment,

      plant,
      defuse,

      winner,
      maxTime: max * 64,
      lastTick: last,
      endTick: end,
    };

    return updatedRounds;
  });
};

export const getGroupedObjects = (round, tick, map, level) => {
  const {
    infernos,
    deaths,
    equipment,
    shots,
    players,
    grenades,
    plant,
    defuse,
  } = round;

  return {
    infernos: groupInfernos(infernos, map, level, tick),
    deaths: groupDeaths(deaths, map, level, tick),
    equipment: groupEquipment(equipment, map, level, tick),
    bombEvents: groupBombEvents(plant, defuse, map, level, tick),
    shots: groupShots(shots, map, level, tick),
    players: groupPlayers(players, map, level, tick),
    grenades: groupGrenades(grenades, map, level, tick),
  };
};
