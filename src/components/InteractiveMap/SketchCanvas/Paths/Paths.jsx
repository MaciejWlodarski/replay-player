import { memo, useContext } from "react";
import { WrapperRefContext } from "../../../../hooks/context/context";
import Path from "./Path/Path";

const Paths = ({ pen, paths, currentPath }) => {
  const wrapperRef = useContext(WrapperRefContext);
  const scale = wrapperRef.current?.instance.transformState.scale;

  const renderCurrentPath = () => {
    if (currentPath.length === 0) return;
    return <Path path={{ points: currentPath, pen, scale }} current={true} />;
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
