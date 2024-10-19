import React, { useContext, memo } from "react";
import { RoundContext } from "../../../hooks/context/context";
import Deaths from "./Death/Death";
import Shots from "./Shot/Shot";
import Players from "./Player/Player";
import Grenades from "./Grenade/Grenade";
import Infernos from "./Inferno/Inferno";
import Equipment from "./Equipment/Equipment";
import Bomb from "./Bomb/Bomb";
import HoveredGrenade from "./HoveredGrenade/HoveredGrenade";
import "./Replay.css";

const Replay = () => {
  const round = useContext(RoundContext);
  if (!round) return;

  return (
    <>
      <Infernos />
      <Deaths />
      <Equipment />
      <Bomb />
      <Shots />
      <Players />
      <Grenades />
      <HoveredGrenade />
    </>
  );
};

export default memo(Replay);
