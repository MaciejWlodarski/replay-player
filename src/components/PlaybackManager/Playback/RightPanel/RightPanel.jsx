import CheckboxButton from "/src/components/CheckboxButton/CheckboxButton";
import { Camera } from "lucide-react";
import { memo, useContext } from "react";
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
      <CheckboxButton
        label={<Camera strokeWidth={1.5} size={22} />}
        isChecked={false}
        onButtonDown={() => exportSVGToPNG(match, round, tickRef, mapRef)}
        additionalClassName={"screenshot"}
      />
      <Share />
    </div>
  );
};

export default memo(RightPanel);
