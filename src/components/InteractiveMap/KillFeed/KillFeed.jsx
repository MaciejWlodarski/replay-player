import React from "react";
import Kill from "./Kill/Kill";
import "./KillFeed.css";

const KillFeed = ({ data, tick }) => {
  if (!data) return;
  const { kills } = data;
  if (!kills) return;

  const renderKills = () => {
    return kills.map((kill, idx) => <Kill key={idx} kill={kill} tick={tick} />);
  };

  return <div className="killfeed">{renderKills()}</div>;
};

export default KillFeed;
