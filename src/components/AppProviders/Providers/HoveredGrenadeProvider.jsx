import { useState } from "react";
import {
  HoveredGrenadeContext,
  SetHoveredGrenadeContext,
} from "../../../hooks/context/context";

const HoveredGrenadeProvider = ({ children }) => {
  const [hoveredGrenade, setHoveredGrenade] = useState(null);

  return (
    <SetHoveredGrenadeContext.Provider value={setHoveredGrenade}>
      <HoveredGrenadeContext.Provider value={hoveredGrenade}>
        {children}
      </HoveredGrenadeContext.Provider>
    </SetHoveredGrenadeContext.Provider>
  );
};

export default HoveredGrenadeProvider;
