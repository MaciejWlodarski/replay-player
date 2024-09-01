import React, { useEffect, useState, useRef } from "react";
import InteractiveMap from "/src/components/InteractiveMap/InteractiveMap";
import Hud from "/src/components/Hud/Hud";
import Rounds from "/src/components/Rounds/Rounds";
import Slider from "/src/components/Slider/Slider";
import { getReplayData, getMatchData } from "/src/replay/replay.js";
import "./styles/buttons.css";
import "./styles/sliders.css";
import "./styles/styles.css";

function App() {
  const matchId = 4124;

  const [matchData, setMatchData] = useState(null);
  const [roundId, setRoundId] = useState(1);

  const [replayData, setReplayData] = useState(null);
  const [marks, setMarks] = useState({});

  const [currTick, setCurrTick] = useState(0);
  const [lastTick, setLastTick] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const speedArray = [0.5, 1, 1.5, 2, 4, 8];

  const [prevRender, setPrevRender] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    getMatchData(setMatchData, matchId);
  }, []);

  useEffect(() => {
    getReplayData(setReplayData, setLastTick, setMarks, roundId);
  }, [roundId]);

  useEffect(() => {
    let prevRenderTime = prevRender;
    let dataAvailable;

    const renderFrame = () => {
      if (!replayData) {
        dataAvailable = false;
        return;
      }

      setCurrTick((prevTick) => {
        if (prevTick < lastTick) {
          const newRender = Date.now();
          const delta = dataAvailable ? newRender - prevRenderTime : 0;
          dataAvailable = true;

          const tickDurationMs = 1000 / (64 * speedArray[speed]);
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
  }, [lastTick, isPlaying, speed, replayData]);

  return (
    <div className="app">
      <div className="main">
        <Hud
          matchData={matchData}
          roundId={roundId}
          replayData={replayData}
          tick={currTick}
          tSide={true}
        />
        <InteractiveMap
          matchData={matchData}
          replayData={replayData}
          tick={currTick}
        />
        <Hud
          matchData={matchData}
          roundId={roundId}
          replayData={replayData}
          tick={currTick}
          tSide={false}
        />
      </div>
      <Rounds
        matchData={matchData}
        roundId={roundId}
        setRoundId={setRoundId}
        setCurrTick={setCurrTick}
        setData={setReplayData}
      />
      <Slider
        lastTick={lastTick}
        currTick={currTick}
        setCurrTick={setCurrTick}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        marks={marks}
        setPrevRender={setPrevRender}
        speed={speed}
        setSpeed={setSpeed}
        speedArray={speedArray}
      />
    </div>
  );
}

export default App;
