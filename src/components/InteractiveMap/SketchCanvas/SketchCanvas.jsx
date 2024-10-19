import { useState, useEffect } from "react";
import { getMidPoint, getPoint } from "./canvasUtils";
import Path from "./Path/Path";
import Pen from "./Pen/Pen";
import "./SketchCanvas.css";

const SketchCanvas = () => {
  const svgSize = 100;

  const [drawing, setDrawing] = useState(false);
  const [mousePos, setMousePos] = useState(null);
  const [pen, setPen] = useState({
    color: "#ffffff",
    radius: 20,
  });

  const [currentPath, setCurrentPath] = useState([]);
  const [paths, setPaths] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const handleMouseDown = (event) => {
    if (event.button !== 0) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const startPoint = getPoint(event, rect, svgSize);

    setDrawing(true);
    setCurrentPath([startPoint]);
  };

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const newPoint = getPoint(event, rect, svgSize);
    setMousePos(newPoint);

    if (!drawing) return;

    setCurrentPath((prevPoints) => {
      if (prevPoints.length < 2) return [...prevPoints, newPoint];

      const secondLastPoint = prevPoints[prevPoints.length - 2];
      const midPoint = getMidPoint(secondLastPoint, newPoint);

      const updatedPoints = [...prevPoints];
      updatedPoints[updatedPoints.length - 1] = midPoint;

      return [...updatedPoints, newPoint];
    });
  };

  const handleMouseUp = () => {
    setDrawing(false);

    if (currentPath.length > 0) {
      setPaths((prevPaths) => [...prevPaths, { points: currentPath, pen }]);
      setRedoStack([]); // Wyczyszczenie stosu powtarzania po dodaniu nowej ścieżki
    }
    setCurrentPath([]);
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  // Obsługa Ctrl+Z i Ctrl+Y
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "z") {
        // Ctrl+Z: Cofnij ostatnią akcję
        if (paths.length > 0) {
          const lastPath = paths[paths.length - 1];
          setPaths((prevPaths) => prevPaths.slice(0, -1));
          setRedoStack((prevRedo) => [...prevRedo, lastPath]); // Dodaj do stosu powtarzania
        }
      } else if (event.ctrlKey && event.key === "y") {
        // Ctrl+Y: Powtórz ostatnią cofniętą akcję
        if (redoStack.length > 0) {
          const lastRedo = redoStack[redoStack.length - 1];
          setRedoStack((prevRedo) => prevRedo.slice(0, -1));
          setPaths((prevPaths) => [...prevPaths, lastRedo]); // Przywróć ostatnią cofniętą ścieżkę
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [paths, redoStack]);

  return (
    <svg
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      className="sketch-canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleContextMenu}
    >
      {paths.map((path, idx) => (
        <Path key={idx} idx={idx} path={path} />
      ))}

      {currentPath.length > 0 && (
        <Path idx={-1} path={{ points: currentPath, pen }} />
      )}

      <Pen pos={mousePos} pen={pen} setPen={setPen} />
    </svg>
  );
};

export default SketchCanvas;
