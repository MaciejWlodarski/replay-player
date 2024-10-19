import CheckboxButton from "/src/components/CheckboxButton/CheckboxButton";
import { Camera } from "lucide-react";
import { useContext } from "react";
import { MapRefContext, TickContext } from "../../../../hooks/context/context";
import { exportSVGToPNG } from "./svgToImage";
import "./RightPanel.css";

const RightPanel = () => {
  const tick = useContext(TickContext);
  const mapRef = useContext(MapRefContext);

  return (
    <div className="playback-panel right">
      <div className="timer">{Math.ceil(tick)}</div>
      <CheckboxButton
        label={<Camera strokeWidth={1} size={24} />}
        isChecked={false}
        onButtonDown={() => exportSVGToPNG(mapRef)}
        additionalClassName={"screenshot"}
      />
    </div>
  );
};

export default RightPanel;
