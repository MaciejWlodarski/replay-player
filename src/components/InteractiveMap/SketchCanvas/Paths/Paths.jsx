import { memo, useContext } from "react";
import { WrapperRefContext } from "../../../../hooks/context/context";
import Path from "./Path/Path";
import { buildPath } from "../../../../hooks/sketch/useSketchControl";

const Paths = ({ pen, paths, currentPath }) => {
  const wrapperRef = useContext(WrapperRefContext);
  const scale = wrapperRef.current?.instance.transformState.scale;

  const renderCurrentPath = () => {
    if (currentPath.normal.length === 0) return;
    return <Path path={{ points: buildPath(currentPath, scale), pen }} />;
  };

  const renderPaths = () =>
    paths.map((path, idx) => <Path key={idx} path={path} />);

  return (
    <>
      {renderPaths()}
      {renderCurrentPath()}
    </>
  );
};

export default memo(Paths);
