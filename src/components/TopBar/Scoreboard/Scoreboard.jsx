import Team from "./Team/Team";
import Timer from "./Timer/Timer";
import "./Scoreboard.css";

const Scoreboard = () => {
  return (
    <div className="scoreboard">
      <Team side={"t"} />
      <Timer />
      <Team side={"ct"} />
    </div>
  );
};

export default Scoreboard;
