import useGameData from "@/hooks/data/useGameData";
import { createContext } from "react";

export const MatchContext = createContext();
export const RoundContext = createContext();
export const RoundManagerContext = createContext();

const GameDataProvider = ({ children }) => {
  const { match, round, rounds, roundId, setRoundId } = useGameData();

  return (
    <MatchContext.Provider value={match}>
      <RoundContext.Provider value={round}>
        <RoundManagerContext.Provider value={{ rounds, roundId, setRoundId }}>
          {children}
        </RoundManagerContext.Provider>
      </RoundContext.Provider>
    </MatchContext.Provider>
  );
};

export default GameDataProvider;
