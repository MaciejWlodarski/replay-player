import { useRef, useState } from "react";
import useSketchControl from "../../../../hooks/sketch/useSketchControl";
import Paths from "./Paths/Paths";
import Pen from "./Pen/Pen";
import "./SketchCanvas.css";

const SketchCanvas = () => {
  const svgSize = 100;

  const [pen, setPen] = useState({
    color: "#ffffff",
    radius: 18,
  });

  const canvasRef = useRef();

  const {
    paths,
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
      <Paths pen={pen} paths={paths} currentPath={currentPath} />
      <Pen pen={pen} setPen={setPen} pos={mousePos} />
    </svg>
  );
};

export default SketchCanvas;
