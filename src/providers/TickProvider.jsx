import { createContext } from "react";
import useInitTick from "../hooks/playback/useInitTick";

export const TickContext = createContext();
export const SetTickContext = createContext();
export const TickRefContext = createContext();

const TickProvider = ({ children }) => {
  const [tick, setTick, tickRef] = useInitTick();

  return (
    <TickContext.Provider value={tick}>
      <SetTickContext.Provider value={setTick}>
        <TickRefContext.Provider value={tickRef}>
          {children}
        </TickRefContext.Provider>
      </SetTickContext.Provider>
    </TickContext.Provider>
  );
};

export default TickProvider;
