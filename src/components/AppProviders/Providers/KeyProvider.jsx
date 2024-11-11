import useKeyState from "../../../hooks/keys/useKeyState";
import {
  AltContext,
  ArrowLeftContext,
  ArrowRightContext,
} from "../../../hooks/context/context";

const KeyProvider = ({ children }) => {
  const { altState, arrowLeftState, arrowRightState } = useKeyState();

  return (
    <AltContext.Provider value={altState}>
      <ArrowLeftContext.Provider value={arrowLeftState}>
        <ArrowRightContext.Provider value={arrowRightState}>
          {children}
        </ArrowRightContext.Provider>
      </ArrowLeftContext.Provider>
    </AltContext.Provider>
  );
};

export default KeyProvider;
