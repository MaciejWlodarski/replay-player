import { useContext, useCallback, useEffect, useState } from "react";
import {
  MainRefContext,
  SketchReducerDispatchContext,
  WrapperRefContext,
} from "../context/context";
import {
  buildPath,
  getPoint,
  getTolerance,
  simplify,
} from "../../utils/sketchUtils";
import isEditableElement from "../../utils/isEditableElement";

const useSketchControl = (svgSize, pen, canvasRef) => {
  const mainRef = useContext(MainRefContext);
  const wrapperRef = useContext(WrapperRefContext);
  const dispatch = useContext(SketchReducerDispatchContext);

  const [drawing, setDrawing] = useState(false);
  const [mousePos, setMousePos] = useState(null);
  const [currentPath, setCurrentPath] = useState({
    normal: [],
    simplified: [],
  });
  const simplifyChunkSize = 64;

  const handleMouseDown = useCallback(
    (event) => {
      if (event.button !== 0) return;
      const boundingRect = canvasRef.current.getBoundingClientRect();
      const startPoint = getPoint(event, boundingRect, svgSize);
      if (!startPoint) return;
      setDrawing(true);
      setCurrentPath({ normal: [startPoint], simplified: [] });
    },
    [svgSize, canvasRef]
  );

  const handleMouseMove = useCallback(
    (event) => {
      const boundingRect = canvasRef.current.getBoundingClientRect();
      const newPoint = getPoint(event, boundingRect, svgSize);
      setMousePos(newPoint);
    },
    [svgSize, canvasRef]
  );

  const handleMouseUp = useCallback(() => {
    setDrawing(false);
    if (currentPath.normal.length > 0) {
      const scale = wrapperRef.current?.instance.transformState.scale;
      dispatch({
        type: "ADD_PATH",
        payload: { points: buildPath(currentPath, scale), pen },
      });
    }
    setCurrentPath({ normal: [], simplified: [] });
  }, [currentPath, pen, wrapperRef]);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  const handleContextMenu = useCallback((event) => {
    event.preventDefault();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isEditableElement()) {
        return;
      }

      if (event.ctrlKey && event.key === "z") {
        dispatch({ type: "UNDO_PATH" });
      } else if (event.ctrlKey && event.key === "y") {
        dispatch({ type: "REDO_PATH" });
      } else if (event.key === "Delete") {
        dispatch({ type: "CLEAR_PATHS" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!drawing) return;

      const boundingRect = canvasRef.current.getBoundingClientRect();
      const newPoint = getPoint(event, boundingRect, svgSize);

      setCurrentPath((prevPath) => {
        const newNormalPart = [...prevPath.normal, newPoint];
        if (newNormalPart.length >= simplifyChunkSize * 2) {
          const scale = wrapperRef.current?.instance.transformState.scale;
          const tolerance = getTolerance(scale);

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
  }, [drawing]);

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
