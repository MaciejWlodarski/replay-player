import React, { useContext } from "react";
import { RoundContext, MapContext } from "../../../../hooks/context";
import "./Inferno.css";

const Inferno = ({ inferno }) => {
  const { map, factor, tick } = useContext(MapContext);

  const { start, end, side, type, fires, centroid } = inferno;
  if (tick < start || tick > end) return;

  const team = side == 2 ? "t" : "ct";

  const fireRadius = 55;
  const fireStroke = 5;

  const renderStroke = () => {
    const infernoId = `inferno-${start}-${centroid.x}-${centroid.z}`;

    return (
      <g className="inferno-stroke">
        <defs>
          <mask id={infernoId}>
            <g fill="white">
              {fires.map((fire, idx) => {
                if (!fire) return;

                const { start, end, pos } = fire;
                if (tick < start || tick > end) return;

                const firePos = {
                  x: (pos.x - map.start.x) * factor,
                  y: (map.start.y - pos.y) * factor,
                };

                return (
                  <circle
                    key={idx}
                    cx={firePos.x}
                    cy={firePos.y}
                    r={(fireRadius + fireStroke) * factor}
                  />
                );
              })}
            </g>
            <g fill="black">
              {fires.map((fire, idx) => {
                if (!fire) return;

                const { start, end, pos } = fire;
                if (tick < start || tick > end) return;

                const firePos = {
                  x: (pos.x - map.start.x) * factor,
                  y: (map.start.y - pos.y) * factor,
                };

                return (
                  <circle
                    key={idx}
                    cx={firePos.x}
                    cy={firePos.y}
                    r={fireRadius * factor}
                    fill="black"
                  />
                );
              })}
            </g>
          </mask>
        </defs>

        <g className="inferno" mask={`url(#${infernoId})`}>
          {fires.map((fire, idx) => {
            if (!fire) return;

            const { start, end, pos } = fire;
            if (tick < start || tick > end) return;

            const firePos = {
              x: (pos.x - map.start.x) * factor,
              y: (map.start.y - pos.y) * factor,
            };

            return (
              <circle
                key={idx}
                cx={firePos.x}
                cy={firePos.y}
                r={(fireRadius + fireStroke) * factor}
              />
            );
          })}
        </g>
      </g>
    );
  };

  const renderFires = () => {
    return (
      <g className="fires">
        {fires.map((fire, idx) => {
          if (!fire) return;

          const { start, end, pos } = fire;
          if (tick < start || tick > end) return;

          const firePos = {
            x: (pos.x - map.start.x) * factor,
            y: (map.start.y - pos.y) * factor,
          };

          return (
            <circle
              key={idx}
              className="fire"
              cx={firePos.x}
              cy={firePos.y}
              r={fireRadius * factor}
            />
          );
        })}
      </g>
    );
  };

  const renderTimer = () => {
    if (!centroid) return;

    const duration = type === 0 ? 449 : 353;
    if (start + duration < tick) return;

    const timerPos = {
      x: (centroid.x - map.start.x) * factor,
      y: (map.start.y - centroid.y) * factor,
    };

    const timerRadius = 20 * factor;
    const circumference = 2 * Math.PI * timerRadius;
    const progress = (start + duration - tick) / duration;

    const strokeDasharray = circumference;
    const strokeDashoffset = circumference * (1 - progress);

    return (
      <g className="timer">
        <circle
          className="timer-background"
          cx={timerPos.x}
          cy={timerPos.y}
          r={timerRadius}
          strokeWidth={9.5 * factor}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={-strokeDashoffset}
          transform={`rotate(-90 ${timerPos.x} ${timerPos.y})`}
        />
        <circle
          className="timer-progress"
          cx={timerPos.x}
          cy={timerPos.y}
          r={timerRadius}
          strokeWidth={7 * factor}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={-strokeDashoffset}
          transform={`rotate(-90 ${timerPos.x} ${timerPos.y})`}
        />
      </g>
    );
  };

  return (
    <g className={`inferno-component ${team} type-${type}`}>
      {renderStroke()}
      {renderFires()}
      {renderTimer()}
    </g>
  );
};

const Infernos = () => {
  const { infernos } = useContext(RoundContext);

  return (
    <g className="infernos">
      {infernos?.map((inferno, idx) => (
        <Inferno key={idx} inferno={inferno} />
      ))}
    </g>
  );
};

export default Infernos;
