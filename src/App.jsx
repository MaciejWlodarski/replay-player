import React from "react";
import {
  MatchContext,
  RoundContext,
  SetTickContext,
  TickContext,
} from "./hooks/context/context";
import useGameData from "./hooks/data/useGameData";
import useInitTick from "./hooks/playback/useInitTick";
import InteractiveMap from "./components/InteractiveMap/InteractiveMap";
import Hud from "./components/Hud/Hud";
import Rounds from "./components/Rounds/Rounds";
import Playback from "./components/Playback/Playback";
import "./styles/buttons.css";
import "./styles/sliders.css";
import "./styles/styles.css";

function App() {
  const { match, round, rounds, roundId, setRoundId } = useGameData();
  const [tick, setTick] = useInitTick();

  return (
    <div className="app">
      <MatchContext.Provider value={match}>
        <RoundContext.Provider value={round}>
          <TickContext.Provider value={tick}>
            <div className="main">
              <Hud side={"t"} />
              <InteractiveMap />
              <Hud side={"ct"} />
            </div>
            <SetTickContext.Provider value={setTick}>
              <Rounds
                rounds={rounds}
                roundId={roundId}
                setRoundId={setRoundId}
              />
              <Playback />
            </SetTickContext.Provider>
          </TickContext.Provider>
        </RoundContext.Provider>
      </MatchContext.Provider>
    </div>
  );
}

export default App;
