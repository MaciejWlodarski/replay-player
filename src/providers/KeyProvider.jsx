import { createContext } from "react";
import useKeyState from "../hooks/keys/useKeyState";

export const AltContext = createContext();
export const ArrowLeftContext = createContext();
export const ArrowRightContext = createContext();

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
