import { getGrenades } from "./grenade.js";
import { getInfernos } from "./inferno.js";
import { getPlayerEvents } from "./player.js";
import maps from "/src/assets/maps";

const API_URL = "https://art.garnuchy.pl/matches/";

const fetchMatchData = async (matchId) => {
  try {
    const response = await fetch(`${API_URL}${matchId}/rounds`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMatchData = async (setMatchData, matchId) => {
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
      round_idx: round_number,
      end_reason,
      winner_side,
    };

    const teamsData = teams.map((team) => {
      const { name, score, side } = team;
      return { name, score, side };
    });

    roundData.teams = teamsData;
    return roundData;
  });

  matchData.rounds = roundsData;
  console.log(matchData);
  setMatchData(() => matchData);
};

const fetchReplayData = async (roundId) => {
  try {
    const formattedRoundId = String(roundId - 1).padStart(2, "0");
    const response = await fetch(
      `http://localhost:8000/${formattedRoundId}.json`
    );
    return await response.json();
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

export const getReplayData = async (
  setReplayData,
  setLastTick,
  setMarks,
  roundId
) => {
  const replayData = await fetchReplayData(roundId);
  if (!replayData) return;

  setLastTick(() => replayData.last);
  setMarks(() => getMarks(replayData));

  const { players, deaths, shots } = getPlayerEvents(replayData);
  const grenades = getGrenades(replayData);
  const infernos = getInfernos(replayData);

  setReplayData(() => ({ players, deaths, shots, grenades, infernos }));
};
