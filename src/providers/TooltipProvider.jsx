import { createContext, useState } from "react";

export const ActiveTooltipContext = createContext();

const TooltipProvider = ({ children }) => {
  const [activeTooltip, setActiveTooltip] = useState(null);

  return (
    <ActiveTooltipContext value={[activeTooltip, setActiveTooltip]}>
      {children}
    </ActiveTooltipContext>
  );
};

export default TooltipProvider;
