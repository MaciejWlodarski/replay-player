import HoveredGrenadeProvider from "../HoveredGrenadeProvider";
import SketchProvider from "../SketchProvider";
import RefProvider from "../RefProvider";
import TickProvider from "../TickProvider";
import TooltipProvider from "../TooltipProvider";
import ModalProvider from "../ModalProvider";
import KeyProvider from "../KeyProvider";
import ConfigProvider from "../ConfigProvider";
import GameDataProvider from "../GameDataProvider";

const AppProviders = ({
  matchId,
  roundNo,
  onRoundChange,
  startTick,
  children,
}) => {
  return (
    <GameDataProvider
      matchId={matchId}
      roundNo={roundNo}
      onRoundChange={onRoundChange}
    >
      <TickProvider startTick={startTick}>
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
    </GameDataProvider>
  );
};

export default AppProviders;
