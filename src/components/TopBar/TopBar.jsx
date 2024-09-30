import React from "react";
import Scoreboard from "./Scoreboard/Scoreboard";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="top-bar">
      <Scoreboard />
    </div>
  );
};

export default TopBar;
