import { createContext, useEffect, useReducer } from "react";
import {
  configInitialState,
  configReducer,
} from "../hooks/reducers/configReducer";

export const ConfigReducerStateContext = createContext();
export const ConfigReducerDispatchContext = createContext();

const LOCAL_STORAGE_KEY = "replayConfigState";

const ConfigProvider = ({ children }) => {
  const loadInitialState = () => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : configInitialState;
  };

  const [state, dispatch] = useReducer(configReducer, {}, loadInitialState);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <ConfigReducerDispatchContext value={dispatch}>
      <ConfigReducerStateContext value={state}>
        {children}
      </ConfigReducerStateContext>
    </ConfigReducerDispatchContext>
  );
};

export default ConfigProvider;
