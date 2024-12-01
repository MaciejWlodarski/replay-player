import { createContext } from "react";
import HoveredGrenadeProvider from "../HoveredGrenadeProvider";
import SketchProvider from "../SketchProvider";
import RefProvider from "../RefProvider";
import TickProvider from "../TickProvider";
import TooltipProvider from "../TooltipProvider";
import ModalProvider from "../ModalProvider";
import KeyProvider from "../KeyProvider";
import ConfigProvider from "../ConfigProvider";

export const MatchContext = createContext();
export const RoundContext = createContext();

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
                    <KeyProvider>
                      <ConfigProvider>{children}</ConfigProvider>
                    </KeyProvider>
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
