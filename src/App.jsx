import React from "react";
import Main from "./components/Main/Main";
import Rounds from "./components/Rounds/Rounds";
import PlaybackController from "./components/PlaybackManager/PlaybackManager";
import TopBar from "./components/TopBar/TopBar";
import Modal from "./components/Modal/Modal";
import AppProviders from "./providers/core/AppProviders";
import "./styles/sliders.css";
import "./styles/styles.css";

const App = () => (
  <div className="app">
    <AppProviders>
      <TopBar />
      <Main />
      <Rounds />
      <PlaybackController />
      <Modal />
    </AppProviders>
  </div>
);

export default App;
