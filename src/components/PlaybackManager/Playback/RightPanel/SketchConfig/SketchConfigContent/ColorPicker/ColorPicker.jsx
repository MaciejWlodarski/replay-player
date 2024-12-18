import { memo, useCallback, useContext } from "react";
import Button from "@/components/ui/Button/Button";
import { colorMap } from "@/utils/utils";
import { Check } from "lucide-react";
import { PenContext } from "@/providers/SketchProvider";
import "./ColorPicker.css";

const ColorPicker = () => {
  const { pen, setPen, penColors } = useContext(PenContext);

  const setColor = useCallback(
    (color) => setPen((prev) => ({ ...prev, color })),
    [setPen]
  );

  return (
    <div className="color-picker">
      {penColors.map((name) => {
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
