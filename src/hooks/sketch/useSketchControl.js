import { useState, useEffect, useContext } from "react";
import { WrapperRefContext } from "../context/context";
import { mapRange } from "../../utils/utils";
import simplify from "../../components/InteractiveMap/SketchCanvas/Paths/Path/simplify";

const getMidPoint = (p1, p2) => ({
  x: (p1.x + p2.x) / 2,
  y: (p1.y + p2.y) / 2,
});

const getPoint = (event, boundingRect, svgSize) => {
  if (!boundingRect) return;

  const { width, height, left, top } = boundingRect;

  const factor = svgSize / Math.min(width, height);

  const offsetX = Math.max(((width - height) * factor) / 2, 0);
  const offsetY = Math.max(((height - width) * factor) / 2, 0);

  const x = event.clientX - left;
  const y = event.clientY - top;

  return {
    x: factor * x - offsetX,
    y: factor * y - offsetY,
  };
};

const useSketchControl = (svgSize, pen, canvasRef) => {
  const wrapperRef = useContext(WrapperRefContext);

  const [drawing, setDrawing] = useState(false);
  const [mousePos, setMousePos] = useState(null);

  const [currentPath, setCurrentPath] = useState([]);
  const [paths, setPaths] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const handleMouseDown = (event) => {
    if (event.button !== 0) return;

    const boundingRect = canvasRef.current.getBoundingClientRect();
    const startPoint = getPoint(event, boundingRect, svgSize);
    if (!startPoint) return;

    setDrawing(true);
    setCurrentPath([startPoint]);
  };

  const handleMouseMove = (event) => {
    const boundingRect = canvasRef.current.getBoundingClientRect();
    const newPoint = getPoint(event, boundingRect, svgSize);
    setMousePos(newPoint);
  };

  const handleMouseUp = () => {
    setDrawing(false);

    if (currentPath.length > 0) {
      const scale = wrapperRef.current?.instance.transformState.scale;
      setPaths((prevPaths) => [
        ...prevPaths,
        {
          points: simplify(currentPath, 0.05 / mapRange(scale, 1, 8, 1, 4)),
          pen,
        },
      ]);
      setRedoStack([]);
    }
    setCurrentPath([]);
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "z") {
        if (paths.length === 0) return;

        const lastPath = paths[paths.length - 1];
        setPaths((prevPaths) => prevPaths.slice(0, -1));
        setRedoStack((prevRedo) => [...prevRedo, lastPath]);
      } else if (event.ctrlKey && event.key === "y") {
        if (redoStack.length === 0) return;

        const lastRedo = redoStack[redoStack.length - 1];
        setRedoStack((prevRedo) => prevRedo.slice(0, -1));
        setPaths((prevPaths) => [...prevPaths, lastRedo]);
      } else if (event.key === "Delete") {
        if (paths.length === 0) return;

        setPaths([]);
        setRedoStack([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [paths, redoStack]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!drawing) return;

      const boundingRect = canvasRef.current.getBoundingClientRect();
      const newPoint = getPoint(event, boundingRect, svgSize);

      setCurrentPath((prevPoints) => {
        if (prevPoints.length < 2) return [...prevPoints, newPoint];

        const secondLastPoint = prevPoints[prevPoints.length - 2];
        const midPoint = getMidPoint(secondLastPoint, newPoint);

        const updatedPoints = [...prevPoints];
        updatedPoints[updatedPoints.length - 1] = midPoint;

        return [...updatedPoints, newPoint];
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [currentPath, drawing]);

  useEffect(() => {
    const handleMouseUpOutside = () => {
      handleMouseUp();
    };

    const handleWindowBlur = () => {
      handleMouseUp();
    };

    window.addEventListener("mouseup", handleMouseUpOutside);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("mouseup", handleMouseUpOutside);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [currentPath]);

  return {
    paths,
    currentPath,
    mousePos,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleMouseLeave,
    handleContextMenu,
  };
};

export default useSketchControl;
