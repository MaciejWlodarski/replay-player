import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import KillFeed from "./KillFeed/KillFeed";
import Replay from "./Replay/Replay";
import { RoundContext, MapContext } from "../../hooks/context/context";
import "./InteractiveMap.css";

const InteractiveMap = ({ matchData, roundData, tick }) => {
  if (!matchData) return;
  const svgSize = 200;
  const map = matchData.map;
  const factor = svgSize / (1024 * map.scale);

  return (
    <div className="map-container">
      <KillFeed data={roundData} tick={tick} />
      <TransformWrapper
        smooth={false}
        disablePadding={true}
        panning={{ velocityDisabled: true }}
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
                <map.src className="map-svg" width={svgSize} height={svgSize} />
                <RoundContext.Provider value={roundData}>
                  <MapContext.Provider value={{ map: map, factor, tick }}>
                    <Replay />
                  </MapContext.Provider>
                </RoundContext.Provider>
              </svg>
              {/* <ReactSketchCanvas
                style={{
                  width: "100%",
                  height: "100%",
                }}
                canvasColor="none"
                strokeColor="white"
                strokeWidth={4}
              /> */}
            </div>
          </TransformComponent>
        </div>
      </TransformWrapper>
    </div>
  );
};

export default InteractiveMap;
