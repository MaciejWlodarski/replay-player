import { useRef } from "react";
import {
  MainRefContext,
  MapRefContext,
  WrapperRefContext,
} from "../../../hooks/context/context";

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
