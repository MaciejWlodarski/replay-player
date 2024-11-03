import {
  SetTickContext,
  TickContext,
  TickRefContext,
} from "../../../hooks/context/context";
import useInitTick from "../../../hooks/playback/useInitTick";

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
