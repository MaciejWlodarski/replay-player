import { useContext } from "react";
import Button from "../../../ui/Button/Button";
import { Icon } from "lucide-react";
import { arrowsUpDownSquare } from "@lucide/lab";
import { MatchContext } from "@/providers/GameDataProvider";
import "./LevelToggle.css";

const LevelToggle = ({ setLevel }) => {
  const { map } = useContext(MatchContext);

  if (!map.lower) return;

  return (
    <Button
      className="level-toggle"
      onLeftClick={() => setLevel((prev) => !prev)}
    >
      <Icon iconNode={arrowsUpDownSquare} strokeWidth={1.5} />
    </Button>
  );
};

export default LevelToggle;
