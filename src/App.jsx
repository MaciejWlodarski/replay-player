import React from "react";
import useGameData from "./hooks/data/useGameData";
import AppProviders from "./components/AppProviders/AppProviders";
import InteractiveMap from "./components/InteractiveMap/InteractiveMap";
import Hud from "./components/Hud/Hud";
import Rounds from "./components/Rounds/Rounds";
import PlaybackController from "./components/PlaybackManager/PlaybackManager";
import TopBar from "./components/TopBar/TopBar";
import "./styles/buttons.css";
import "./styles/sliders.css";
import "./styles/styles.css";

function App() {
  const { match, round, rounds, roundId, setRoundId } = useGameData();

  return (
    <div className="app">
      <AppProviders match={match} round={round}>
        <TopBar />
        <div className="main">
          <Hud side={"t"} />
          <InteractiveMap />
          <Hud side={"ct"} />
        </div>
        <Rounds rounds={rounds} roundId={roundId} setRoundId={setRoundId} />
        <PlaybackController />
      </AppProviders>
    </div>
  );
}

export default App;
