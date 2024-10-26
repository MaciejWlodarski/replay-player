import { useState, useEffect, useContext } from "react";
import { MapContainerRefContext, WrapperRefContext } from "../context/context";
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

export const buildPath = (currentPath, scale) => {
  if (!currentPath || currentPath.normal.length === 0) {
    return currentPath ? [...currentPath.simplified] : [];
  }

  const tolerance = 0.05 / mapRange(scale, 1, 8, 1, 4);
  const simplifiedNormalPart = simplify(currentPath.normal, tolerance);

  const startSliceIndex = currentPath.simplified.length > 0 ? 1 : 0;

  return [
    ...currentPath.simplified,
    ...simplifiedNormalPart.slice(startSliceIndex),
  ];
};

const useSketchControl = (svgSize, pen, canvasRef) => {
  const mapContainerRef = useContext(MapContainerRefContext);
  const wrapperRef = useContext(WrapperRefContext);

  const [drawing, setDrawing] = useState(false);
  const [mousePos, setMousePos] = useState(null);

  const [paths, setPaths] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const [currentPath, setCurrentPath] = useState({
    normal: [],
    simplified: [],
  });
  const simplifyChunkSize = 64;

  const handleMouseDown = (event) => {
    if (event.button !== 0) return;

    const boundingRect = canvasRef.current.getBoundingClientRect();
    const startPoint = getPoint(event, boundingRect, svgSize);
    if (!startPoint) return;

    setDrawing(true);
    setCurrentPath({ normal: [startPoint], simplified: [] });
  };

  const handleMouseMove = (event) => {
    const boundingRect = canvasRef.current.getBoundingClientRect();
    const newPoint = getPoint(event, boundingRect, svgSize);
    setMousePos(newPoint);
  };

  const handleMouseUp = () => {
    setDrawing(false);

    if (currentPath.normal.length > 0) {
      const scale = wrapperRef.current?.instance.transformState.scale;
      setPaths((prevPaths) => [
        ...prevPaths,
        {
          points: buildPath(currentPath, scale),
          pen,
        },
      ]);
      setRedoStack([]);
    }
    setCurrentPath({ normal: [], simplified: [] });
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

    const mapContainer = mapContainerRef.current;
    mapContainer.addEventListener("keydown", handleKeyDown);

    return () => {
      mapContainer.removeEventListener("keydown", handleKeyDown);
    };
  }, [paths, redoStack]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!drawing) return;

      const boundingRect = canvasRef.current.getBoundingClientRect();
      const newPoint = getPoint(event, boundingRect, svgSize);

      setCurrentPath((prevPath) => {
        const newNormalPart = [...prevPath.normal];

        if (newNormalPart.length >= 2) {
          const secondLastPoint = newNormalPart[newNormalPart.length - 2];
          const midPoint = getMidPoint(secondLastPoint, newPoint);
          newNormalPart[newNormalPart.length - 1] = midPoint;
        }

        newNormalPart.push(newPoint);

        if (newNormalPart.length >= simplifyChunkSize * 2) {
          const scale = wrapperRef.current?.instance.transformState.scale;
          const tolerance = 0.05 / mapRange(scale, 1, 8, 1, 4);

          const partToSimplify = newNormalPart.slice(0, simplifyChunkSize);
          const simplifiedPart = simplify(partToSimplify, tolerance);

          return {
            normal: newNormalPart.slice(simplifyChunkSize - 1),
            simplified: [...prevPath.simplified, ...simplifiedPart],
          };
        }

        return { ...prevPath, normal: newNormalPart };
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
