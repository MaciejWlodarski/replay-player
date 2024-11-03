import { memo, useState } from "react";
import classNames from "classnames";
import { Pencil } from "lucide-react";
import SketchConfigContent from "./SketchConfigContent/SketchConfigContent";
import "./SketchConfig.css";

const SketchConfig = () => {
  const tooltipId = "sketch-tooltip";

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <div className="sketch-config">
      <div
        className={classNames("sketch-config-button", { open: isTooltipOpen })}
        tabIndex={0}
      >
        <Pencil strokeWidth={1.5} size={20} />
        <div className="sketch-config-hover" data-tooltip-id={tooltipId} />
      </div>
      <SketchConfigContent
        tooltipId={tooltipId}
        isOpen={isTooltipOpen}
        setIsOpen={setIsTooltipOpen}
      />
    </div>
  );
};

export default memo(SketchConfig);
