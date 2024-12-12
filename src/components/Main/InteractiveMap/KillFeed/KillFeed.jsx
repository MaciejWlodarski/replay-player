import React, { useContext } from "react";
import Kill from "./Kill/Kill";
import { TickContext } from "@/providers/TickProvider";
import { RoundContext } from "@/providers/GameDataProvider";
import "./KillFeed.css";

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
