import { getGrenades } from "./grenade.js";
import { getInfernos } from "./inferno.js";
import { getPlayerEvents } from "./player.js";
import maps from "/src/assets/maps";

const URL = "csanalyzer.gg";
const API_URL = `https://art.${URL}/matches/`;
const COLLECTOR_URL = `https://collector.${URL}`;

const fetchMatchData = async (matchId) => {
  try {
    // const response = await fetch(`${API_URL}${matchId}/rounds`);
    const response = await fetch(`http://localhost:8000/rounds.json`);
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
    map,
    mapData: maps[map],
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
    const response = await fetchLocal(roundId);
    // const response = await fetchCollector(matchData, roundId);
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getMarks = (data) => {
  const marks = {
    [data.end]: "End",
  };

  return marks;
};

export const getRoundData = async (matchData, rounds, roundId, setRounds) => {
  let roundData = rounds[roundId];
  if (roundData) return roundData;
  roundData = await fetchReplayData(matchData, roundId);
  if (!roundData) return;

  const { last, end, plant, defuse } = roundData;
  const { players, deaths, shots } = getPlayerEvents(roundData);
  const grenades = getGrenades(roundData);
  const infernos = getInfernos(roundData);
  const marks = getMarks(roundData);

  setRounds((rounds) => {
    const updatedRounds = [...rounds];
    updatedRounds[roundId] = {
      players,
      deaths,
      shots,
      grenades,
      infernos,

      plant,
      defuse,

      lastTick: last,
      endTick: end,

      marks,
    };
    return updatedRounds;
  });
};
