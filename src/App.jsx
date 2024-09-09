import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import InteractiveMap from "/src/components/InteractiveMap/InteractiveMap";
import Hud from "/src/components/Hud/Hud";
import Rounds from "/src/components/Rounds/Rounds";
import Slider from "/src/components/Slider/Slider";
import { getRoundData, getMatchData } from "/src/replay/replay.js";
import "./styles/buttons.css";
import "./styles/sliders.css";
import "./styles/styles.css";

function App() {
  const { matchId, roundId: paramRoundId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [matchData, setMatchData] = useState(null);
  const [rounds, setRounds] = useState([]);
  const [roundId, setRoundId] = useState(Number(paramRoundId - 1) || 0);

  const [currTick, setCurrTick] = useState(
    Number(searchParams.get("tick")) || 0
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const speedArray = [0.5, 1, 1.5, 2, 4, 8];

  const [prevRender, setPrevRender] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    navigate(`/match/${matchId}/${roundId + 1}`, { replace: true });
  }, [matchId, roundId, navigate]);

  useEffect(() => {
    getMatchData(matchId, setMatchData);
  }, []);

  useEffect(() => {
    const roundData = rounds[roundId];
    if (roundData && currTick > roundData.lastTick)
      setCurrTick(() => roundData.lastTick);
  }, [rounds]);

  useEffect(() => {
    getRoundData(matchData, rounds, roundId, setRounds);
  }, [matchData, roundId]);

  useEffect(() => {
    let prevRenderTime = prevRender;
    let dataAvailable;
    const roundData = rounds[roundId];

    const renderFrame = () => {
      if (!roundData) {
        dataAvailable = false;
        return;
      }

      const { lastTick } = roundData;
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
  }, [isPlaying, speed, roundId, rounds]);

  useEffect(() => {
    if (!matchData) return;

    const speedUp = () => {
      setSpeed((prev) => {
        if (prev === speedArray.length - 1) return 0;
        return prev + 1;
      });
    };

    const speedDown = () => {
      setSpeed((prev) => {
        if (prev === 0) return speedArray.length - 1;
        return prev - 1;
      });
    };

    const handleKeyDown = (event) => {
      switch (event.code) {
        case "Space":
          setIsPlaying((prevIsPlaying) => !prevIsPlaying);
          break;
        // case "ArrowRight":
        //   setRoundId((prevRoundId) =>
        //     Math.min(prevRoundId + 1, matchData.rounds.length)
        //   );
        //   setCurrTick(0);
        //   break;
        // case "ArrowLeft":
        //   setRoundId((prevRoundId) => Math.max(prevRoundId - 1, 0));
        //   setCurrTick(0);
        //   break;
        case "ArrowUp":
          speedUp();
          break;
        case "ArrowDown":
          speedDown();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [matchData]);

  return (
    <div className="app">
      <div className="main">
        <Hud
          matchData={matchData}
          roundData={rounds[roundId]}
          roundId={roundId}
          tick={currTick}
          tSide={true}
        />
        <InteractiveMap
          matchData={matchData}
          roundData={rounds[roundId]}
          tick={currTick}
        />
        <Hud
          matchData={matchData}
          roundData={rounds[roundId]}
          roundId={roundId}
          tick={currTick}
          tSide={false}
        />
      </div>
      <Rounds
        matchData={matchData}
        rounds={rounds}
        roundId={roundId}
        setRoundId={setRoundId}
        setCurrTick={setCurrTick}
      />
      <Slider
        roundData={rounds[roundId]}
        currTick={currTick}
        setCurrTick={setCurrTick}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setPrevRender={setPrevRender}
        speed={speed}
        setSpeed={setSpeed}
        speedArray={speedArray}
      />
    </div>
  );
}

export default App;
