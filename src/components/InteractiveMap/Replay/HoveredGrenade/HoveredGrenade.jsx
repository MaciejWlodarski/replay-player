import { useContext } from "react";
import {
  HoveredGrenadeContext,
  MatchContext,
} from "../../../../hooks/context/context";
import "./HoveredGrenade.css";
import { WepSvg } from "../../../../assets/icons";
import { grenadeTypeMap } from "../../../../utils/utils";

const HoveredGrenade = () => {
  const grenade = useContext(HoveredGrenadeContext);
  const { map } = useContext(MatchContext);

  if (!grenade) return;

  const { pose, type } = grenade;
  const { factor } = map;

  const renderTrajectory = () => {
    const trajectoryPoints = pose
      .map(({ pos }) => {
        const x = (pos.x - map.start.x) * factor;
        const y = (map.start.y - pos.y) * factor;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <polyline
        className="grenade-trajectory"
        points={trajectoryPoints}
        strokeWidth={10 * factor}
      />
    );
  };

  const renderGrenadeIcon = () => {
    const grenadeSize = 120 * factor;

    const pos = pose.at(-1).pos;

    const x = (pos.x - map.start.x) * factor;
    const y = (map.start.y - pos.y) * factor;

    return (
      <g className="grenade-icon">
        <WepSvg
          wep={grenadeTypeMap[type]}
          x={x}
          y={y - grenadeSize / 2}
          height={grenadeSize}
        />
      </g>
    );
  };

  return (
    <g className="hovered-grenade-component">
      {renderTrajectory()}
      {renderGrenadeIcon()}
    </g>
  );
};

export default HoveredGrenade;
