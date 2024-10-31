import { memo } from "react";
import { Pencil } from "lucide-react";
import SketchConfigContent from "./SketchConfigContent/SketchConfigContent";
import "./SketchConfig.css";

const SketchConfig = () => {
  const tooltipId = "sketch-tooltip";

  return (
    <div className="sketch-config">
      <div className="sketch-config-button" tabIndex={0}>
        <Pencil strokeWidth={1.5} size={20} />
        <div className="sketch-config-hover" data-tooltip-id={tooltipId} />
      </div>
      <SketchConfigContent tooltipId={tooltipId} />
    </div>
  );
};

export default memo(SketchConfig);
