import Team from "./Team/Team";
import "./Scoreboard.css";

const Scoreboard = () => {
  return (
    <div className="scoreboard">
      <Team side={"t"} />
      <Team side={"ct"} />
    </div>
  );
};

export default Scoreboard;
