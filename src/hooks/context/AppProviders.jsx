import { useRef, useState, useEffect } from "react";
import useInitTick from "../playback/useInitTick";
import {
  AltContext,
  HoveredGrenadeContext,
  MapRefContext,
  MatchContext,
  RoundContext,
  SetHoveredGrenadeContext,
  SetTickContext,
  TickContext,
} from "./context";

const AppProviders = ({ children, match, round }) => {
  const [tick, setTick] = useInitTick();

  const [hoveredGrenade, setHoveredGrenade] = useState(null);
  const [altState, setAltState] = useState(false);

  const mapRef = useRef();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "AltLeft" || event.code === "AltRight") {
        event.preventDefault();
        setAltState(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === "AltLeft" || event.code === "AltRight") {
        setAltState(false);
      }
    };

    const handleWindowBlur = () => {
      setAltState(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, []);

  return (
    <MatchContext.Provider value={match}>
      <RoundContext.Provider value={round}>
        <TickContext.Provider value={tick}>
          <SetTickContext.Provider value={setTick}>
            <SetHoveredGrenadeContext.Provider value={setHoveredGrenade}>
              <HoveredGrenadeContext.Provider value={hoveredGrenade}>
                <MapRefContext.Provider value={mapRef}>
                  <AltContext.Provider value={altState}>
                    {children}
                  </AltContext.Provider>
                </MapRefContext.Provider>
              </HoveredGrenadeContext.Provider>
            </SetHoveredGrenadeContext.Provider>
          </SetTickContext.Provider>
        </TickContext.Provider>
      </RoundContext.Provider>
    </MatchContext.Provider>
  );
};

export default AppProviders;
