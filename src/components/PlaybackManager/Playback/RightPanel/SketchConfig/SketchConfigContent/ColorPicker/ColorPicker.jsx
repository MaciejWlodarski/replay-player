import { memo, useCallback, useContext, useMemo } from "react";
import Button from "../../../../../../ui/Button/Button";
import { colorMap } from "../../../../../../../utils/utils";
import { Check } from "lucide-react";
import "./ColorPicker.css";
import { PenContext } from "../../../../../../../providers/SketchProvider";

const ColorPicker = () => {
  const { pen, setPen } = useContext(PenContext);

  const colors = useMemo(() => ["white", "t", "ct", "green", "red"], []);

  const setColor = useCallback(
    (color) => setPen((prev) => ({ ...prev, color })),
    [setPen]
  );

  return (
    <div className="color-picker">
      {colors.map((name) => {
        const color = colorMap[name];
        return (
          <Button
            key={name}
            isChecked={color === pen.color}
            className={"color"}
            onLeftClick={() => setColor(color)}
            style={{ backgroundColor: color }}
          >
            <div className="background">
              <Check className="check" size={14} color={color} />
            </div>
          </Button>
        );
      })}
    </div>
  );
};

export default memo(ColorPicker);
