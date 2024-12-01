import { createContext, useReducer } from "react";
import {
  configInitialState,
  configReducer,
} from "../hooks/reducers/configReducer";

export const ConfigReducerStateContext = createContext();
export const ConfigReducerDispatchContext = createContext();

const ConfigProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, configInitialState);

  return (
    <ConfigReducerDispatchContext.Provider value={dispatch}>
      <ConfigReducerStateContext.Provider value={state}>
        {children}
      </ConfigReducerStateContext.Provider>
    </ConfigReducerDispatchContext.Provider>
  );
};

export default ConfigProvider;
