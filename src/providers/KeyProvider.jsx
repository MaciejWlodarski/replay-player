import { createContext } from "react";
import useKeyState from "../hooks/keys/useKeyState";

export const AltContext = createContext();
export const ArrowLeftContext = createContext();
export const ArrowRightContext = createContext();

const KeyProvider = ({ children }) => {
  const { altState, arrowLeftState, arrowRightState } = useKeyState();

  return (
    <AltContext value={altState}>
      <ArrowLeftContext value={arrowLeftState}>
        <ArrowRightContext value={arrowRightState}>
          {children}
        </ArrowRightContext>
      </ArrowLeftContext>
    </AltContext>
  );
};

export default KeyProvider;
