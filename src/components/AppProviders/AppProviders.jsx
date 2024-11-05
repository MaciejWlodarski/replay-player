import {
  AltContext,
  MatchContext,
  RoundContext,
} from "../../hooks/context/context";
import useKeyState from "../../hooks/keys/useKeyState";
import HoveredGrenadeProvider from "./Providers/HoveredGrenadeProvider";
import SketchProvider from "./Providers/SketchProvider";
import RefProvider from "./Providers/RefProvider";
import TickProvider from "./Providers/TickProvider";
import TooltipProvider from "./Providers/TooltipProvider";
import ModalProvider from "./Providers/ModalProvider";

const AppProviders = ({ children, match, round }) => {
  const altState = useKeyState();

  return (
    <MatchContext.Provider value={match}>
      <RoundContext.Provider value={round}>
        <TickProvider>
          <HoveredGrenadeProvider>
            <RefProvider>
              <SketchProvider>
                <TooltipProvider>
                  <ModalProvider>
                    <AltContext.Provider value={altState}>
                      {children}
                    </AltContext.Provider>
                  </ModalProvider>
                </TooltipProvider>
              </SketchProvider>
            </RefProvider>
          </HoveredGrenadeProvider>
        </TickProvider>
      </RoundContext.Provider>
    </MatchContext.Provider>
  );
};

export default AppProviders;
