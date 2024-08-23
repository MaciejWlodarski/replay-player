import React, { useEffect, useState, useRef } from "react";
import InteractiveMap from "/src/components/InteractiveMap/InteractiveMap";
import Hud from "/src/components/Hud/Hud";
import Slider from "/src/components/Slider/Slider";
import maps from "/src/assets/maps";
import { createReplayData } from "/src/utils/replayCreator.js";
import "./styles/buttons.css";
import "./styles/sliders.css";
import "./styles/styles.css";

function App() {
  const mapData = maps["de_anubis"];

  const [data, setData] = useState(null);
  const [currTick, setCurrTick] = useState(0);
  const [lastTick, setLastTick] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [marks, setMarks] = useState({});

  const [prevRender, setPrevRender] = useState(0);

  const animationRef = useRef(null);

  useEffect(() => {
    createReplayData(setData, setLastTick, setMarks);
  }, []);

  useEffect(() => {
    let prevRenderTime = prevRender;

    const renderFrame = () => {
      setCurrTick((prevTick) => {
        if (prevTick < lastTick) {
          const newRender = Date.now();
          const delta = newRender - prevRenderTime;

          const tickDurationMs = 1000 / 64;
          const tickIncrement = delta / tickDurationMs;

          const newTick = Math.min(prevTick + tickIncrement, lastTick);

          setPrevRender(() => {
            prevRenderTime = newRender;
            return newRender;
          });

          return newTick;
        } else {
          setIsPlaying(() => false);
          return prevTick;
        }
      });

      animationRef.current = requestAnimationFrame(renderFrame);
    };

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(renderFrame);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [lastTick, isPlaying]);

  return (
    <div className="app">
      <div className="main">
        <Hud data={data} tick={currTick} tSide={true} />
        <InteractiveMap data={data} mapData={mapData} tick={currTick} />
        <Hud data={data} tick={currTick} tSide={false} />
      </div>
      <Slider
        lastTick={lastTick}
        currTick={currTick}
        setCurrTick={setCurrTick}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        marks={marks}
        setPrevRender={setPrevRender}
      />
    </div>
  );
}

export default App;
