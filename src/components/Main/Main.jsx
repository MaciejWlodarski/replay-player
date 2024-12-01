import { useContext } from "react";
import { MainRefContext } from "../../providers/RefProvider";
import Hud from "./Hud/Hud";
import InteractiveMap from "./InteractiveMap/InteractiveMap";
import "./Main.css";

const Main = () => {
  const mainRef = useContext(MainRefContext);

  return (
    <div className="main" ref={mainRef}>
      <Hud side={"t"} />
      <InteractiveMap />
      <Hud side={"ct"} />
    </div>
  );
};

export default Main;
