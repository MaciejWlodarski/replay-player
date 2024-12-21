import { createContext } from "react";
import useInitTick from "../hooks/playback/useInitTick";

export const TickContext = createContext();
export const SetTickContext = createContext();
export const TickRefContext = createContext();

const TickProvider = ({ startTick, children }) => {
  const [tick, setTick, tickRef] = useInitTick(startTick);

  return (
    <TickContext value={tick}>
      <SetTickContext value={setTick}>
        <TickRefContext value={tickRef}>{children}</TickRefContext>
      </SetTickContext>
    </TickContext>
  );
};

export default TickProvider;
