import React, { memo, useContext } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import KillFeed from "./KillFeed/KillFeed";
import Replay from "./Replay/Replay";
import SketchCanvas from "./SketchCanvas/SketchCanvas";
import {
  AltContext,
  MapContainerRefContext,
  MapRefContext,
  MatchContext,
  WrapperRefContext,
} from "../../hooks/context/context";
import "./InteractiveMap.css";

const InteractiveMap = () => {
  const match = useContext(MatchContext);
  const mapContainerRef = useContext(MapContainerRefContext);
  const mapRef = useContext(MapRefContext);
  const wrapperRef = useContext(WrapperRefContext);
  const altState = useContext(AltContext);

  if (!match) return;

  const { map } = match;
  const { svgSize } = map;

  const handleMouseDown = () => {
    mapContainerRef.current.classList.add("no-outline");
    mapContainerRef.current.focus();
  };

  const handleBlur = () => {
    mapContainerRef.current.classList.remove("no-outline");
  };

  return (
    <div
      className="map-container"
      ref={mapContainerRef}
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onBlur={handleBlur}
    >
      <KillFeed />
      <TransformWrapper
        smooth={false}
        disablePadding={true}
        panning={{ velocityDisabled: true, allowLeftClickPan: false }}
        wheel={{ step: 0.3, disabled: altState }}
        doubleClick={{ disabled: true }}
        ref={wrapperRef}
      >
        <div className="wrapper">
          <TransformComponent
            wrapperStyle={{ width: "100%", height: "100%" }}
            contentStyle={{ width: "100%", height: "100%" }}
          >
            <div className="map">
              <svg ref={mapRef} viewBox={`0 0 ${svgSize} ${svgSize}`}>
                <map.src className="map-svg" width={svgSize} height={svgSize} />
                <Replay />
              </svg>
              <SketchCanvas />
            </div>
          </TransformComponent>
        </div>
      </TransformWrapper>
    </div>
  );
};

export default memo(InteractiveMap);
