import { Share2 } from "lucide-react";
import { memo } from "react";
import ShareContent from "./ShareContent/ShareContent";
import "./Share.css";

const Share = () => {
  const tooltipId = "share-tooltip";

  return (
    <div className="share-container">
      <div className="share-button" tabIndex={0}>
        <Share2 strokeWidth={1.5} size={20} />
        <div className="test" data-tooltip-id={tooltipId} />
      </div>
      <ShareContent tooltipId={tooltipId} />
    </div>
  );
};

export default memo(Share);
