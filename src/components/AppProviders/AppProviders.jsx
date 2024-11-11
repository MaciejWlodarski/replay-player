import { MatchContext, RoundContext } from "../../hooks/context/context";
import HoveredGrenadeProvider from "./Providers/HoveredGrenadeProvider";
import SketchProvider from "./Providers/SketchProvider";
import RefProvider from "./Providers/RefProvider";
import TickProvider from "./Providers/TickProvider";
import TooltipProvider from "./Providers/TooltipProvider";
import ModalProvider from "./Providers/ModalProvider";
import KeyProvider from "./Providers/KeyProvider";

const AppProviders = ({ children, match, round }) => {
  return (
    <MatchContext.Provider value={match}>
      <RoundContext.Provider value={round}>
        <TickProvider>
          <HoveredGrenadeProvider>
            <RefProvider>
              <SketchProvider>
                <TooltipProvider>
                  <ModalProvider>
                    <KeyProvider>{children}</KeyProvider>
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
