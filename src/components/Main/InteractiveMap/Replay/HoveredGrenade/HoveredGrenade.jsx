import { useContext } from "react";
import { WepSvg } from "@/assets/icons";
import { grenadeTypeMap } from "@/utils/utils";
import { HoveredGrenadeContext } from "@/providers/HoveredGrenadeProvider";
import { MatchContext } from "@/providers/GameDataProvider";
import "./HoveredGrenade.css";

const HoveredGrenade = () => {
  const grenade = useContext(HoveredGrenadeContext);
  const { map } = useContext(MatchContext);

  if (!grenade) return;

  const { pose, type, end, explode = end } = grenade;
  const { factor } = map;

  const trajectory = pose.filter(({ tick }) => tick <= explode);

  const renderTrajectory = () => {
    const trajectoryPoints = trajectory
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

  const renderBounces = () => {
    return trajectory.slice(1, -1).map(({ pos }, idx) => {
      const x = (pos.x - map.start.x) * factor;
      const y = (map.start.y - pos.y) * factor;
      return (
        <circle
          key={idx}
          className="bounce"
          cx={x}
          cy={y}
          r={18 * factor}
          strokeWidth={10 * factor}
        />
      );
    });
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
      {renderBounces()}
      {renderGrenadeIcon()}
    </g>
  );
};

export default HoveredGrenade;
