import { memo } from "react";
import Path from "./Path/Path";

const Paths = ({ paths }) => {
  return paths.map((path, idx) => <Path key={idx} path={path} />);
};

export default memo(Paths);
