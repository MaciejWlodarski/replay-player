import React, { memo, useContext } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import KillFeed from "./KillFeed/KillFeed";
import Replay from "./Replay/Replay";
import { MatchContext } from "../../hooks/context/context";
import "./InteractiveMap.css";

const InteractiveMap = () => {
  const match = useContext(MatchContext);
  if (!match) return;

  const { map } = match;
  const { svgSize } = map;

  return (
    <div className="map-container">
      <KillFeed />
      <TransformWrapper
        smooth={false}
        disablePadding={true}
        panning={{ velocityDisabled: true }}
        wheel={{ step: 0.3 }}
        doubleClick={{ disabled: true }}
      >
        <div className="wrapper">
          <TransformComponent
            wrapperStyle={{ width: "100%", height: "100%" }}
            contentStyle={{ width: "100%", height: "100%" }}
          >
            <div className="map">
              <svg viewBox={`0 0 ${svgSize} ${svgSize}`}>
                <map.src className="map-svg" width={svgSize} height={svgSize} />
                <Replay />
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

export default memo(InteractiveMap);
