import { useRef, useState } from "react";
import useInitTick from "../../hooks/playback/useInitTick";
import useKeyState from "../../hooks/keys/useKeyState";
import {
  AltContext,
  HoveredGrenadeContext,
  MapContainerRefContext,
  MapRefContext,
  MatchContext,
  RoundContext,
  SetHoveredGrenadeContext,
  SetTickContext,
  TickContext,
  TickRefContext,
  WrapperRefContext,
} from "../../hooks/context/context";

const AppProviders = ({ children, match, round }) => {
  const [tick, setTick, tickRef] = useInitTick();

  const altState = useKeyState();

  const [hoveredGrenade, setHoveredGrenade] = useState(null);

  const mapContainerRef = useRef();
  const mapRef = useRef();
  const wrapperRef = useRef();

  return (
    <MatchContext.Provider value={match}>
      <RoundContext.Provider value={round}>
        <TickContext.Provider value={tick}>
          <SetTickContext.Provider value={setTick}>
            <TickRefContext.Provider value={tickRef}>
              <SetHoveredGrenadeContext.Provider value={setHoveredGrenade}>
                <HoveredGrenadeContext.Provider value={hoveredGrenade}>
                  <MapContainerRefContext.Provider value={mapContainerRef}>
                    <MapRefContext.Provider value={mapRef}>
                      <WrapperRefContext.Provider value={wrapperRef}>
                        <AltContext.Provider value={altState}>
                          {children}
                        </AltContext.Provider>
                      </WrapperRefContext.Provider>
                    </MapRefContext.Provider>
                  </MapContainerRefContext.Provider>
                </HoveredGrenadeContext.Provider>
              </SetHoveredGrenadeContext.Provider>
            </TickRefContext.Provider>
          </SetTickContext.Provider>
        </TickContext.Provider>
      </RoundContext.Provider>
    </MatchContext.Provider>
  );
};

export default AppProviders;
