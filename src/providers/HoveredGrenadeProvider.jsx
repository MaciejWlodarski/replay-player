import { createContext, useState } from "react";

export const HoveredGrenadeContext = createContext();
export const SetHoveredGrenadeContext = createContext();

const HoveredGrenadeProvider = ({ children }) => {
  const [hoveredGrenade, setHoveredGrenade] = useState(null);

  return (
    <SetHoveredGrenadeContext value={setHoveredGrenade}>
      <HoveredGrenadeContext value={hoveredGrenade}>
        {children}
      </HoveredGrenadeContext>
    </SetHoveredGrenadeContext>
  );
};

export default HoveredGrenadeProvider;
