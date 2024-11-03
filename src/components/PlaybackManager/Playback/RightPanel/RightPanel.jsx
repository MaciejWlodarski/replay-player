import { memo, useContext } from "react";
import { Camera } from "lucide-react";
import {
  MapRefContext,
  MatchContext,
  RoundContext,
  TickContext,
  TickRefContext,
} from "../../../../hooks/context/context";
import { exportSVGToPNG } from "./svgToImage";
import Share from "./Share/Share";
import SketchConfig from "./SketchConfig/SketchConfig";
import Button from "../../../Button/Button";
import "./RightPanel.css";

const RightPanel = () => {
  const match = useContext(MatchContext);
  const round = useContext(RoundContext);
  const tickRef = useContext(TickRefContext);
  const tick = useContext(TickContext);
  const mapRef = useContext(MapRefContext);

  return (
    <div className="playback-panel right">
      <div className="timer">{Math.ceil(tick)}</div>
      <SketchConfig />
      <Button
        className={"screenshot"}
        onLeftClick={() => exportSVGToPNG(match, round, tickRef, mapRef)}
      >
        <Camera strokeWidth={1.5} size={22} />
      </Button>
      <Share />
    </div>
  );
};

export default memo(RightPanel);
