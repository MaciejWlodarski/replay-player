import { useMemo, useReducer, useState } from "react";
import {
  PenContext,
  SketchReducerDispatchContext,
  SketchReducerStateContext,
} from "../../../hooks/context/context";
import {
  sketchInitialState,
  sketchReducer,
} from "../../../hooks/reducers/sketchReducer";

const PenProvider = ({ children }) => {
  const [pen, setPen] = useState({
    color: "#ffffff",
    radius: 18,
  });

  const penSizes = useMemo(() => [5, 8, 12, 18, 27, 40, 60, 90, 135, 200], []);

  const [state, dispatch] = useReducer(sketchReducer, sketchInitialState);

  return (
    <PenContext.Provider value={{ pen, setPen, penSizes }}>
      <SketchReducerDispatchContext.Provider value={dispatch}>
        <SketchReducerStateContext.Provider value={state}>
          {children}
        </SketchReducerStateContext.Provider>
      </SketchReducerDispatchContext.Provider>
    </PenContext.Provider>
  );
};

export default PenProvider;
