import { createContext, useRef } from "react";

export const MainRefContext = createContext();
export const MapRefContext = createContext();
export const WrapperRefContext = createContext();

const RefProvider = ({ children }) => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const wrapperRef = useRef();

  return (
    <MainRefContext value={mapContainerRef}>
      <MapRefContext value={mapRef}>
        <WrapperRefContext value={wrapperRef}>{children}</WrapperRefContext>
      </MapRefContext>
    </MainRefContext>
  );
};

export default RefProvider;
