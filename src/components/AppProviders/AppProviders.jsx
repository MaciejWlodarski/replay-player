import { useRef, useState } from "react";
import useInitTick from "../../hooks/playback/useInitTick";
import useKeyState from "../../hooks/keys/useKeyState";
import {
  AltContext,
  HoveredGrenadeContext,
  MainRefContext,
  MapRefContext,
  MatchContext,
  PenContext,
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
  const [pen, setPen] = useState({
    color: "#ffffff",
    radius: 18,
  });

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
                  <MainRefContext.Provider value={mapContainerRef}>
                    <MapRefContext.Provider value={mapRef}>
                      <WrapperRefContext.Provider value={wrapperRef}>
                        <AltContext.Provider value={altState}>
                          <PenContext.Provider value={[pen, setPen]}>
                            {children}
                          </PenContext.Provider>
                        </AltContext.Provider>
                      </WrapperRefContext.Provider>
                    </MapRefContext.Provider>
                  </MainRefContext.Provider>
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
