import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import ReplayPlayer from "./ReplayPlayer";

const App = () => {
  const navigate = useNavigate();
  const { matchId, roundNo } = useParams();
  const [searchParams] = useSearchParams();

  const startTick = Number(searchParams.get("tick"));

  const handleRoundChange = (newRoundNo) => {
    navigate(`/match/${matchId}/${newRoundNo}`, { replace: true });
  };

  return (
    <ReplayPlayer
      matchId={matchId}
      roundNo={roundNo}
      onRoundChange={handleRoundChange}
      startTick={startTick}
    />
  );
};

export default App;
