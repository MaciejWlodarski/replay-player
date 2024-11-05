import React from "react";
import useGameData from "./hooks/data/useGameData";
import AppProviders from "./components/AppProviders/AppProviders";
import Main from "./components/Main/Main";
import Rounds from "./components/Rounds/Rounds";
import PlaybackController from "./components/PlaybackManager/PlaybackManager";
import TopBar from "./components/TopBar/TopBar";
import Modal from "./components/Modal/Modal";
import "./styles/buttons.css";
import "./styles/sliders.css";
import "./styles/styles.css";

function App() {
  const { match, round, rounds, roundId, setRoundId } = useGameData();

  return (
    <div className="app">
      <AppProviders match={match} round={round}>
        <TopBar />
        <Main />
        <Rounds rounds={rounds} roundId={roundId} setRoundId={setRoundId} />
        <PlaybackController />
        <Modal />
      </AppProviders>
    </div>
  );
}

export default App;
