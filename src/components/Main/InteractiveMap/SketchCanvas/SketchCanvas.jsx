import { useContext, useRef } from "react";
import useSketchControl from "@/hooks/sketch/useSketchControl";
import Paths from "./Paths/Paths";
import Pen from "./Pen/Pen";
import CurrentPath from "./CurrentPath/CurrentPath";
import { PenContext } from "@/providers/SketchProvider";
import "./SketchCanvas.css";

const SketchCanvas = () => {
  const { pen, setPen, penSizes, penColors } = useContext(PenContext);

  const svgSize = 100;

  const canvasRef = useRef();

  const {
    currentPath,
    mousePos,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleMouseLeave,
    handleContextMenu,
  } = useSketchControl(svgSize, pen, canvasRef);

  return (
    <svg
      className="sketch-canvas"
      ref={canvasRef}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleContextMenu}
    >
      <Paths />
      <CurrentPath pen={pen} path={currentPath} />
      <Pen
        pen={pen}
        setPen={setPen}
        penSizes={penSizes}
        penColors={penColors}
        pos={mousePos}
      />
    </svg>
  );
};

export default SketchCanvas;
