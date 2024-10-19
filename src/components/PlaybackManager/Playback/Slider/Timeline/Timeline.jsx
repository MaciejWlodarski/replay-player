import { memo } from "react";
import Marks from "./Marks/Marks";
import Periods from "./Period/Periods";
import "./Timeline.css";

const Timeline = () => {
  return (
    <div className="timeline">
      <Periods />
      <Marks />
    </div>
  );
};

export default memo(Timeline);
