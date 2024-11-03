import { useState } from "react";
import { ActiveTooltipContext } from "../../../hooks/context/context";

const TooltipProvider = ({ children }) => {
  const [activeTooltip, setActiveTooltip] = useState(null);

  return (
    <ActiveTooltipContext.Provider value={[activeTooltip, setActiveTooltip]}>
      {children}
    </ActiveTooltipContext.Provider>
  );
};

export default TooltipProvider;
