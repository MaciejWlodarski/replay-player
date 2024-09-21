import { useState, useEffect, useMemo, memo } from "react";
import { getRoundData } from "../replay/replay";
import { useNavigate } from "react-router-dom";

const useFetchRounds = (match, roundNo) => {
  // const navigate = useNavigate;

  const roundId = roundNo - 1 || 0;
  const [rounds, setRounds] = useState([]);

  // useEffect(() => {
  //   navigate(`/match/${match?.id}/${roundId + 1}`, { replace: true });
  // }, [match, roundId, navigate]);

  useEffect(() => {
    getRoundData(match, rounds, roundId, setRounds);
  }, [match, roundId]);

  const round = useMemo(() => rounds[roundId], [rounds, roundId]);

  return { rounds, round };
};

export default useFetchRounds;
