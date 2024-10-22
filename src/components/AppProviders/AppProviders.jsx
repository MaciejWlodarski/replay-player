import { useRef, useState } from "react";
import useInitTick from "../../hooks/playback/useInitTick";
import useKeyState from "../../hooks/keys/useKeyState";
import {
  AltContext,
  HoveredGrenadeContext,
  MapRefContext,
  MatchContext,
  RoundContext,
  SetHoveredGrenadeContext,
  SetTickContext,
  TickContext,
  WrapperRefContext,
} from "../../hooks/context/context";

const AppProviders = ({ children, match, round }) => {
  const [tick, setTick] = useInitTick();

  const altState = useKeyState();

  const [hoveredGrenade, setHoveredGrenade] = useState(null);

  const mapRef = useRef();

  const wrapperRef = useRef();

  return (
    <MatchContext.Provider value={match}>
      <RoundContext.Provider value={round}>
        <TickContext.Provider value={tick}>
          <SetTickContext.Provider value={setTick}>
            <SetHoveredGrenadeContext.Provider value={setHoveredGrenade}>
              <HoveredGrenadeContext.Provider value={hoveredGrenade}>
                <MapRefContext.Provider value={mapRef}>
                  <AltContext.Provider value={altState}>
                    <WrapperRefContext.Provider value={wrapperRef}>
                      {children}
                    </WrapperRefContext.Provider>
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
