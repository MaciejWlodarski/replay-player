import React from "react";
import { WepSvg } from "/src/assets/icons";
import { equipmentTypeMap, grenadeTypeMap } from "../../../../utils/utils";
import { getEquipmentPose } from "../../../../replay/equipment";
import "./Equipment.css";

const Equipment = ({ equipment, mapData, factor, tick }) => {
  const pose = getEquipmentPose(equipment, tick);
  if (!pose) return;
  const { type } = equipment;
  const { pos } = pose;

  const equipmentPos = {
    x: (pos.x - mapData.start.x) * factor,
    y: (mapData.start.y - pos.y) * factor,
  };

  const renderEquipment = () => {
    const wepName = equipmentTypeMap[type];
    const gndName = grenadeTypeMap[type];

    const height = wepName ? 50 : 70;
    const width = 200;

    return (
      <g className="eq">
        <WepSvg
          wep={wepName || gndName}
          x={equipmentPos.x - (width * factor) / 2}
          y={equipmentPos.y - (height * factor) / 2}
          width={width * factor}
          height={height * factor}
        />
      </g>
    );
  };

  return <g className="equipment-component">{renderEquipment()}</g>;
};

export default Equipment;
