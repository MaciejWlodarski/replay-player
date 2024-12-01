import { useContext } from "react";
import Path from "../Paths/Path/Path";
import { buildPath } from "../../../../../utils/sketchUtils";
import { WrapperRefContext } from "../../../../../providers/RefProvider";

const CurrentPath = ({ pen, path }) => {
  const wrapperRef = useContext(WrapperRefContext);

  if (path.normal.length === 0) return;

  const scale = wrapperRef.current?.instance.transformState.scale;
  return <Path path={{ points: buildPath(path, scale), pen }} />;
};

export default CurrentPath;
