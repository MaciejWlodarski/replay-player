import { useContext } from "react";
import { WrapperRefContext } from "../../../../../hooks/context/context";
import { buildPath } from "../../../../../hooks/sketch/useSketchControl";
import Path from "../Paths/Path/Path";

const CurrentPath = ({ pen, path }) => {
  const wrapperRef = useContext(WrapperRefContext);

  if (path.normal.length === 0) return;

  const scale = wrapperRef.current?.instance.transformState.scale;
  return <Path path={{ points: buildPath(path, scale), pen }} />;
};

export default CurrentPath;
