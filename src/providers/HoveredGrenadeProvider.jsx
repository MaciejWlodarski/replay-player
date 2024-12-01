import { createContext, useState } from "react";

export const HoveredGrenadeContext = createContext();
export const SetHoveredGrenadeContext = createContext();

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
