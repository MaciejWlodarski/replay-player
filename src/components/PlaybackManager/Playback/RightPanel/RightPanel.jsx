import { memo, useContext } from "react";
import { Camera, Settings } from "lucide-react";
import { exportSVGToPNG } from "../../../../utils/svgToImage";
import Share from "./Share/Share";
import SketchConfig from "./SketchConfig/SketchConfig";
import Button from "../../../ui/Button/Button";
import {
  MatchContext,
  RoundContext,
} from "../../../../providers/core/AppProviders";
import {
  TickContext,
  TickRefContext,
} from "../../../../providers/TickProvider";
import { MapRefContext } from "../../../../providers/RefProvider";
import { SetModalContext } from "../../../../providers/ModalProvider";
import "./RightPanel.css";

const RightPanel = () => {
  const match = useContext(MatchContext);
  const round = useContext(RoundContext);
  const tickRef = useContext(TickRefContext);
  const tick = useContext(TickContext);
  const mapRef = useContext(MapRefContext);
  const setModalTab = useContext(SetModalContext);

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
      <Button className="settings" onLeftClick={() => setModalTab("settings")}>
        <Settings strokeWidth={1.5} size={20} />
      </Button>
    </div>
  );
};

export default memo(RightPanel);
