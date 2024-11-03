import { useContext } from "react";
import { MatchContext } from "../../../../hooks/context/context";
import Button from "../../../Button/Button";
import { ArrowDown, ArrowUp } from "lucide-react";
import "./LevelToggle.css";

const LevelToggle = ({ level, setLevel }) => {
  const { map } = useContext(MatchContext);

  if (!map.lower) return;

  return (
    <Button
      className="level-toggle"
      onLeftClick={() => setLevel((prev) => !prev)}
    >
      <span>Level</span>
      {level ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
    </Button>
  );
};

export default LevelToggle;
