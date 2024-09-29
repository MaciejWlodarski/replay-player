import React, { memo } from "react";
import "./Team.css";

const Team = ({ name, score }) => (
  <div className="team">
    <div className="team-name">
      <span className="name">{name}</span>
    </div>
    <span className="score">{score}</span>
  </div>
);

export default memo(Team);
