import React, { memo, useContext, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import KillFeed from "./KillFeed/KillFeed";
import Replay from "./Replay/Replay";
import SketchCanvas from "./SketchCanvas/SketchCanvas";
import LevelToggle from "./LevelToggle/LevelToggle";
import { MatchContext } from "../../../providers/core/AppProviders";
import {
  MapRefContext,
  WrapperRefContext,
} from "../../../providers/RefProvider";
import { AltContext } from "../../../providers/KeyProvider";
import "./InteractiveMap.css";

const InteractiveMap = () => {
  const match = useContext(MatchContext);
  const mapRef = useContext(MapRefContext);
  const wrapperRef = useContext(WrapperRefContext);
  const altState = useContext(AltContext);

  const [level, setLevel] = useState(true);

  if (!match) return;

  const { map } = match;
  const { svgSize } = map;

  return (
    <div className="map-container">
      <KillFeed />
      <LevelToggle setLevel={setLevel} />
      <TransformWrapper
        smooth={false}
        disablePadding={true}
        panning={{ velocityDisabled: true, allowLeftClickPan: false }}
        wheel={{ step: 0.3, disabled: altState }}
        doubleClick={{ disabled: true }}
        ref={wrapperRef}
      >
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%" }}
          contentStyle={{ width: "100%", height: "100%" }}
        >
          <div className="map">
            <svg ref={mapRef} viewBox={`0 0 ${svgSize} ${svgSize}`}>
              <map.src className="map-svg" width={svgSize} height={svgSize} />
              <Replay level={level} />
            </svg>
            <SketchCanvas />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default memo(InteractiveMap);
