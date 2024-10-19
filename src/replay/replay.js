import { getEquipment } from "./equipment.js";
import { getGrenades } from "./grenade.js";
import { getInfernos } from "./inferno.js";
import { getPlayerEvents } from "./player.js";
import { getMapData } from "/src/assets/maps";
import getMarks from "./marks/marks.jsx";

const URL = "csanalyzer.gg";
const API_URL = `https://art.${URL}/matches/`;
const COLLECTOR_URL = `https://collector.${URL}`;

const fetchMatchData = async (matchId) => {
  try {
    const response = await fetch(`${API_URL}${matchId}/rounds`);
    // const response = await fetch(`http://localhost:8000/${matchId}.json`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMatchData = async (matchId, setMatchData) => {
  const data = await fetchMatchData(matchId);
  if (!data) return;

  const { map, metadata, rounds } = data;
  const matchData = {
    id: matchId,
    map: getMapData(map, 200),
    demo: metadata.collector.demo_id,
  };

  const roundsData = rounds.map((round) => {
    const { round_number, end_reason, winner_side, teams } = round;
    const roundData = {
      roundIdx: round_number - 1,
      endReason: end_reason,
      winnerSide: winner_side,
    };

    const teamsData = teams.map((team) => {
      const { name, score, side } = team;
      return { name, score, side };
    });

    roundData.teams = teamsData;
    return roundData;
  });

  matchData.rounds = roundsData;
  setMatchData(() => matchData);
};

const fetchLocal = (roundId) => {
  const formattedRoundId = String(roundId).padStart(2, "0");
  return fetch(`http://localhost:8000/${formattedRoundId}.json`);
};

const fetchCollector = (matchData, roundId) => {
  return fetch(`${COLLECTOR_URL}/demos/${matchData.demo}/replay/${roundId}`);
};

const fetchReplayData = async (matchData, roundId) => {
  if (!matchData) return;

  try {
    // const response = await fetchLocal(roundId);
    const response = await fetchCollector(matchData, roundId);
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

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

    getMarks(updatedRounds[roundId]);

    return updatedRounds;
  });
};
