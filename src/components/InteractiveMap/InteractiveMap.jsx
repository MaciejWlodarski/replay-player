import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Replay from "./Replay/Replay";
import "./InteractiveMap.css";

const InteractiveMap = ({ matchData, replayData, tick }) => {
  if (!matchData) return;
  const svgSize = 200;
  const mapData = matchData.mapData;
  const factor = svgSize / (1024 * mapData.scale);

  return (
    <div className="map-container">
      <TransformWrapper
        smooth={false}
        wheel={{
          step: 0.3,
        }}
        doubleClick={{
          disabled: true,
        }}
      >
        <div className="wrapper">
          <TransformComponent
            wrapperStyle={{ width: "100%", height: "100%" }}
            contentStyle={{ width: "100%", height: "100%" }}
          >
            <div className="map">
              <svg viewBox={`0 0 ${svgSize} ${svgSize}`}>
                <mapData.src
                  className="map-svg"
                  width={svgSize}
                  height={svgSize}
                />
                <Replay
                  data={replayData}
                  mapData={mapData}
                  factor={factor}
                  tick={tick}
                />
              </svg>
            </div>
          </TransformComponent>
        </div>
      </TransformWrapper>
    </div>
  );
};

export default InteractiveMap;
