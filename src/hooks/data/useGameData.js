import useRoundsData from "./useRoundsData";
import useMatchData from "./useMatchData";

const useGameData = (matchId, roundNo) => {
  const match = useMatchData(matchId);
  const { round, rounds, roundId, setRoundId } = useRoundsData(match, roundNo);

  return { match, roundId, setRoundId, round, rounds };
};

export default useGameData;
