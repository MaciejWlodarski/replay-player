import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRoundsData from "./useRoundsData";
import useMatchData from "./useMatchData";

const useGameData = () => {
  const navigate = useNavigate();
  const { matchId, roundNo } = useParams();

  const match = useMatchData(matchId);

  const { round, rounds, roundId, setRoundId } = useRoundsData(match, roundNo);

  useEffect(() => {
    navigate(`/match/${matchId}/${roundId + 1}`, { replace: true });
  }, [matchId, roundId, navigate]);

  return { match, roundId, setRoundId, round, rounds };
};

export default useGameData;
