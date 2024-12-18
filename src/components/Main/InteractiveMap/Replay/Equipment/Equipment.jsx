import React, { useContext } from "react";
import { equipmentTypeMap, grenadeTypeMap } from "@/utils/utils";
import { WepSvg } from "@/assets/icons";
import { ConfigReducerStateContext } from "@/providers/ConfigProvider";
import "./Equipment.css";

const Item = ({ item, pose, map }) => {
  const { factor } = map;
  const { type } = item;
  const { pos } = pose;

  const equipmentPos = {
    x: (pos.x - map.start.x) * factor,
    y: (map.start.y - pos.y) * factor,
  };

  const renderWeapon = () => {
    const wepName = equipmentTypeMap[type];

    const height = 50 * factor;
    const width = 200 * factor;

    return (
      <g className="eq weapon">
        <WepSvg
          wep={wepName}
          x={equipmentPos.x - width / 2}
          y={equipmentPos.y - height / 2}
          width={width}
          height={height}
        />
      </g>
    );
  };

  const renderGrenade = () => {
    const gndName = grenadeTypeMap[type];

    const height = 70 * factor;
    const width = 200 * factor;

    return (
      <g className="eq grenade">
        <WepSvg
          wep={gndName}
          x={equipmentPos.x - width / 2}
          y={equipmentPos.y - height / 2}
          width={width}
          height={height}
        />
      </g>
    );
  };

  const renderBomb = () => {
    const height = 100 * factor;
    const width = 200 * factor;

    return (
      <g className="eq bomb">
        <WepSvg
          wep={"c4"}
          x={equipmentPos.x - width / 2}
          y={equipmentPos.y - height / 2}
          width={width}
          height={height}
        />
      </g>
    );
  };

  const renderEquipment = () => {
    if (type > 500) {
      return renderGrenade();
    }
    if (type > 400) {
      return renderBomb();
    }
    return renderWeapon();
  };

  return <g className="equipment-component">{renderEquipment()}</g>;
};

const Equipment = ({ equipment, map }) => {
  const { visibility } = useContext(ConfigReducerStateContext);
  const { grenades, primary, secondary } = visibility;

  return (
    <g className="equipment">
      {equipment?.map(({ item, pose }, idx) => {
        const { type } = item;
        if (!secondary && type < 100) return;
        if (!primary && type > 100 && type < 400) return;
        if (!grenades && type > 500) return;
        return <Item key={idx} item={item} pose={pose} map={map} />;
      })}
    </g>
  );
};

export default Equipment;
