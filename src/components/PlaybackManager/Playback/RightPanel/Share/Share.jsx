import { Share2 } from "lucide-react";
import { memo, useState } from "react";
import ShareContent from "./ShareContent/ShareContent";
import "./Share.css";
import classNames from "classnames";

const Share = () => {
  const tooltipId = "share-tooltip";

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <div className="share-container">
      <div
        className={classNames("share-button", { open: isTooltipOpen })}
        tabIndex={0}
      >
        <Share2 strokeWidth={1.5} size={20} />
        <div className="share-hover" data-tooltip-id={tooltipId} />
      </div>
      <ShareContent
        tooltipId={tooltipId}
        isOpen={isTooltipOpen}
        setIsOpen={setIsTooltipOpen}
      />
    </div>
  );
};

export default memo(Share);
