import { useState, useEffect, useMemo } from "react";
import { getRoundData } from "../../replay/replay";

const useRoundsData = (match, roundNo) => {
  const [roundId, setRoundId] = useState(roundNo - 1 || 0);
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    getRoundData(match, rounds, roundId, setRounds);
  }, [match, roundId]);

  const round = useMemo(() => {
    return rounds[roundId];
  }, [rounds, roundId]);

  return { round, rounds, roundId, setRoundId };
};

export default useRoundsData;
