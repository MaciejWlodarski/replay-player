import { useContext, useRef } from "react";
import useSketchControl from "../../../../hooks/sketch/useSketchControl";
import Paths from "./Paths/Paths";
import Pen from "./Pen/Pen";
import CurrentPath from "./CurrentPath/CurrentPath";
import "./SketchCanvas.css";
import { PenContext } from "../../../../hooks/context/context";

const SketchCanvas = () => {
  const [pen, setPen] = useContext(PenContext);

  const svgSize = 100;

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
      <Paths paths={paths} />
      <CurrentPath pen={pen} path={currentPath} />
      <Pen pen={pen} setPen={setPen} pos={mousePos} />
    </svg>
  );
};

export default SketchCanvas;
