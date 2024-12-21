import React from "react";
import Main from "./components/Main/Main";
import Rounds from "./components/Rounds/Rounds";
import PlaybackController from "./components/PlaybackManager/PlaybackManager";
import TopBar from "./components/TopBar/TopBar";
import Modal from "./components/Modal/Modal";
import AppProviders from "./providers/core/AppProviders";
import "./styles/sliders.css";
import "./styles/styles.css";

const ReplayPlayer = ({
  matchId,
  roundNo,
  onRoundChange = () => {},
  startTick,
}) => (
  <div className="replay-player">
    <AppProviders
      matchId={matchId}
      roundNo={roundNo}
      onRoundChange={onRoundChange}
      startTick={startTick}
    >
      <TopBar />
      <Main />
      <Rounds />
      <PlaybackController />
      <Modal />
    </AppProviders>
  </div>
);

export default ReplayPlayer;
