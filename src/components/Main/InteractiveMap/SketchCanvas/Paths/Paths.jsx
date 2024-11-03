import { memo, useContext } from "react";
import Path from "./Path/Path";
import { SketchReducerStateContext } from "../../../../../hooks/context/context";

const Paths = () => {
  const { paths } = useContext(SketchReducerStateContext);

  return paths.map((path, idx) => <Path key={idx} path={path} />);
};

export default memo(Paths);
