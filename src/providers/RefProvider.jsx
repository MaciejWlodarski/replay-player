import { createContext, useRef } from "react";

export const MainRefContext = createContext();
export const MapRefContext = createContext();
export const WrapperRefContext = createContext();

const RefProvider = ({ children }) => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const wrapperRef = useRef();

  return (
    <MainRefContext.Provider value={mapContainerRef}>
      <MapRefContext.Provider value={mapRef}>
        <WrapperRefContext.Provider value={wrapperRef}>
          {children}
        </WrapperRefContext.Provider>
      </MapRefContext.Provider>
    </MainRefContext.Provider>
  );
};

export default RefProvider;
