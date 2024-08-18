import React, { useEffect, useState, useRef } from "react";
import Settings from "/src/components/Settings/Settings.jsx";
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
  const [endTick, setEndTick] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const fps = 64;
  const animationRef = useRef(null);

  useEffect(() => {
    createReplayData(setData, setEndTick);
  }, []);

  useEffect(() => {
    let fpsInterval = 1000 / fps;
    if (speed < 1) fpsInterval = fpsInterval / speed;
    let then = performance.now();

    const startAnimation = (timestamp) => {
      const now = timestamp;
      const elapsed = now - then;

      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        setCurrTick((prevTick) => {
          if (prevTick < endTick) {
            return Math.min(prevTick + 1 * Math.max(speed, 1), endTick);
          } else {
            setIsPlaying(() => false);
            return prevTick;
          }
        });
      }

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(startAnimation);
      }
    };

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(startAnimation);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [endTick, isPlaying, speed]);

  return (
    <div className="app">
      <div className="main">
        <Hud data={data} tick={currTick} tSide={true} />
        <InteractiveMap data={data} mapData={mapData} tick={currTick} />
        <Hud data={data} tick={currTick} tSide={false} />
      </div>
      <Slider
        endTick={endTick}
        currTick={currTick}
        setCurrTick={setCurrTick}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        speed={speed}
        setSpeed={setSpeed}
      />
    </div>
  );
}

export default App;
