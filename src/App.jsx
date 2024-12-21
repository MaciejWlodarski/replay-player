import { useParams, useSearchParams } from "react-router-dom";
import ReplayPlayer from "./ReplayPlayer";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  const { matchId, roundNo } = useParams();

  const [searchParams] = useSearchParams();
  const startTick = Number(searchParams.get("tick"));

  return (
    <ReplayPlayer
      matchId={matchId}
      roundNo={roundNo}
      onRoundChange={(roundNo) =>
        navigate(`/match/${matchId}/${roundNo}`, { replace: true })
      }
      startTick={startTick}
    />
  );
};

export default App;
