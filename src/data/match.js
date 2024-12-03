import { fetchMatchData } from "../api/fetchMatchData";
import { getMapData } from "../assets/maps";

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
