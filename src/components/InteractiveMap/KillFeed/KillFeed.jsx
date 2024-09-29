import React, { useContext } from "react";
import Kill from "./Kill/Kill";
import "./KillFeed.css";
import { RoundContext, TickContext } from "../../../hooks/context/context";

const KillFeed = () => {
  const tick = useContext(TickContext);
  const round = useContext(RoundContext);

  if (!round) return;
  const { kills } = round;
  if (!kills) return;

  const renderKills = () => {
    return kills.map((kill, idx) => <Kill key={idx} kill={kill} tick={tick} />);
  };

  return <div className="killfeed">{renderKills()}</div>;
};

export default KillFeed;
