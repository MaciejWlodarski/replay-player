import { Tooltip } from "react-tooltip";
import { colorMap } from "../../../../../../utils/utils";
import ColorPicker from "./ColorPicker/ColorPicker";
import PenSizeSlider from "./PenSizeSlider.jsx/PenSizeSlider";
import ActionControls from "./ActionControls/ActionControls";
import "./SketchConfigContent.css";

const SketchConfigContent = ({ tooltipId, isOpen, setIsOpen }) => {
  return (
    <Tooltip
      id={tooltipId}
      place={"top"}
      opacity={1}
      border={`1px solid ${colorMap.border}`}
      openEvents={{ click: true }}
      closeEvents={{ click: true }}
      globalCloseEvents={{ clickOutsideAnchor: false }}
      clickable={true}
      delayShow={0.1}
      delayHide={0.1}
      offset={6}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <ActionControls />
      <PenSizeSlider />
      <ColorPicker />
    </Tooltip>
  );
};

export default SketchConfigContent;
