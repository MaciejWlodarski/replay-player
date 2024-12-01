import { createContext, useState } from "react";

export const ActiveTooltipContext = createContext();

const TooltipProvider = ({ children }) => {
  const [activeTooltip, setActiveTooltip] = useState(null);

  return (
    <ActiveTooltipContext.Provider value={[activeTooltip, setActiveTooltip]}>
      {children}
    </ActiveTooltipContext.Provider>
  );
};

export default TooltipProvider;
