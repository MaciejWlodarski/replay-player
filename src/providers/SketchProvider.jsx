import { createContext, useMemo, useReducer, useState } from "react";
import {
  sketchInitialState,
  sketchReducer,
} from "../hooks/reducers/sketchReducer";

export const PenContext = createContext();
export const SketchReducerStateContext = createContext();
export const SketchReducerDispatchContext = createContext();

const PenProvider = ({ children }) => {
  const [pen, setPen] = useState({
    color: "#ffffff",
    radius: 18,
  });

  const penSizes = useMemo(() => [5, 8, 12, 18, 27, 40, 60, 90, 135, 200], []);
  const penColors = useMemo(() => ["white", "t", "ct", "green", "red"], []);

  const [state, dispatch] = useReducer(sketchReducer, sketchInitialState);

  return (
    <PenContext value={{ pen, setPen, penSizes, penColors }}>
      <SketchReducerDispatchContext value={dispatch}>
        <SketchReducerStateContext value={state}>
          {children}
        </SketchReducerStateContext>
      </SketchReducerDispatchContext>
    </PenContext>
  );
};

export default PenProvider;
