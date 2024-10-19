import { memo, useContext } from "react";
import {
  RoundContext,
  SetHoveredGrenadeContext,
} from "../../../../../hooks/context/context";
import { WepSvg } from "../../../../../assets/icons";
import { grenadeTypeMap } from "../../../../../utils/utils";
import "./Hover.css";

const Grenade = ({ grenade }) => {
  const setHoveredGrenade = useContext(SetHoveredGrenadeContext);

  const { type, side, thrower } = grenade;
  const gnd = grenadeTypeMap[type];
  const team = side === 2 ? "t" : "ct";

  const handleClick = () => {
    if (!thrower) return;
    const { pos, view } = thrower;
    const setPos = `setpos ${pos.x} ${pos.y} ${pos.z};setang ${view.pitch} ${view.yaw}`;
    navigator.clipboard.writeText(setPos);
  };

  return (
    <div
      className={`grenade-hover ${type} ${team}`}
      onMouseEnter={() => {
        setHoveredGrenade(grenade);
      }}
      onMouseLeave={() => {
        setHoveredGrenade(null);
      }}
      onClick={handleClick}
    >
      <WepSvg wep={gnd} />
    </div>
  );
};

const Grenades = ({ grenades }) =>
  grenades
    .sort((a, b) => a.start - b.start)
    .map((gnd, idx) => <Grenade key={idx} grenade={gnd} />);

const Hover = ({ cursorPos, isHoveredRef }) => {
  if (!cursorPos) return;

  const round = useContext(RoundContext);
  const { grenades, lastTick } = round;

  const tick = lastTick * cursorPos;
  const filteredGrenades = grenades.filter(
    (grenade) => grenade.start >= tick - 64 && grenade.start < tick + 64
  );
  if (filteredGrenades.length == 0) return;

  return (
    <div
      className="hover-container"
      style={{ left: `${cursorPos * 100}%` }}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      <div className="hover-content">
        <Grenades grenades={filteredGrenades} />
      </div>
    </div>
  );
};

export default memo(Hover);
