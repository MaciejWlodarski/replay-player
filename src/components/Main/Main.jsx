import { useCallback, useContext } from "react";
import { MainRefContext } from "../../hooks/context/context";
import Hud from "./Hud/Hud";
import InteractiveMap from "./InteractiveMap/InteractiveMap";
import "./Main.css";

const Main = () => {
  const mainRef = useContext(MainRefContext);

  const handleMouseDown = useCallback(() => {
    mainRef.current.focus();
  }, [mainRef]);

  return (
    <div
      className="main"
      ref={mainRef}
      tabIndex={0}
      onMouseDown={handleMouseDown}
    >
      <Hud side={"t"} />
      <InteractiveMap />
      <Hud side={"ct"} />
    </div>
  );
};

export default Main;
