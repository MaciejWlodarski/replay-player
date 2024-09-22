import { useEffect, useState } from "react";
import { getMatchData } from "../../replay/replay";

const useMatchData = (matchId) => {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    getMatchData(matchId, setMatch);
  }, []);

  return match;
};

export default useMatchData;
