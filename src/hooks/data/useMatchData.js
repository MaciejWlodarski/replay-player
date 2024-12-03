import { useEffect, useState } from "react";
import { getMatchData } from "../../data/match";

const useMatchData = (matchId) => {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    getMatchData(matchId, setMatch);
  }, []);

  return match;
};

export default useMatchData;
