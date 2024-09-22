import React from "react";
import { SetTickContext, TickContext } from "./hooks/context/context";
import useGameData from "./hooks/data/useGameData";
import useInitTick from "./hooks/playback/useInitTick";
import InteractiveMap from "/src/components/InteractiveMap/InteractiveMap";
import Hud from "/src/components/Hud/Hud";
import Rounds from "/src/components/Rounds/Rounds";
import Playback from "./components/Playback/Playback";
import "./styles/buttons.css";
import "./styles/sliders.css";
import "./styles/styles.css";

function App() {
  const { match, round, rounds, roundId, setRoundId } = useGameData();
  const [tick, setTick] = useInitTick();

  return (
    <div className="app">
      <TickContext.Provider value={tick}>
        <div className="main">
          <Hud
            matchData={match}
            roundData={round}
            roundId={roundId}
            tick={tick}
            tSide={true}
          />
          <InteractiveMap matchData={match} roundData={round} tick={tick} />
          <Hud
            matchData={match}
            roundData={round}
            roundId={roundId}
            tick={tick}
            tSide={false}
          />
        </div>
        <SetTickContext.Provider value={setTick}>
          <Rounds
            matchData={match}
            rounds={rounds}
            roundId={roundId}
            setRoundId={setRoundId}
          />
          <Playback round={round} />
        </SetTickContext.Provider>
      </TickContext.Provider>
    </div>
  );
}

export default App;
