import React, { useContext } from "react";
import { WepSvg } from "/src/assets/icons";
import { equipmentTypeMap, grenadeTypeMap } from "../../../../utils/utils";
import { getEquipmentPose } from "../../../../replay/equipment";
import { RoundContext, MapContext } from "../../../../hooks/context";
import "./Equipment.css";

const Item = ({ item }) => {
  const { map, factor, tick } = useContext(MapContext);

  const pose = getEquipmentPose(item, tick);
  if (!pose) return;

  const { type } = item;
  const { pos } = pose;

  const equipmentPos = {
    x: (pos.x - map.start.x) * factor,
    y: (map.start.y - pos.y) * factor,
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

const Equipment = () => {
  const { equipment } = useContext(RoundContext);

  return (
    <g className="equipment">
      {equipment?.map((item, idx) => (
        <Item key={idx} item={item} />
      ))}
    </g>
  );
};

export default Equipment;
