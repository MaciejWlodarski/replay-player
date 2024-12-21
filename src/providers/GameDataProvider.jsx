import useGameData from "@/hooks/data/useGameData";
import { createContext } from "react";

export const MatchContext = createContext();
export const RoundContext = createContext();
export const RoundManagerContext = createContext();

const GameDataProvider = ({ matchId, roundNo, onRoundChange, children }) => {
  const { match, round, rounds, roundId, setRoundId } = useGameData(
    matchId,
    roundNo
  );

  return (
    <MatchContext value={match}>
      <RoundContext value={round}>
        <RoundManagerContext
          value={{ rounds, roundId, setRoundId, onRoundChange }}
        >
          {children}
        </RoundManagerContext>
      </RoundContext>
    </MatchContext>
  );
};

export default GameDataProvider;
