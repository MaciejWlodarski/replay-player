import { memo, useContext } from "react";
import {
  ConfigReducerDispatchContext,
  ConfigReducerStateContext,
} from "@/providers/ConfigProvider";
import Button from "@/components/ui/Button/Button";
import "./Config.css";
import { Check } from "lucide-react";
import classNames from "classnames";

const Config = () => {
  const configDispatch = useContext(ConfigReducerDispatchContext);
  const configState = useContext(ConfigReducerStateContext);

  const renderVisibilityOption = (key, label) => {
    const value = configState.visibility[key];

    return (
      <div className="option">
        <Button
          className={classNames("checkbox")}
          isChecked={value}
          onLeftClick={() =>
            configDispatch({
              type: "TOGGLE_VISIBILITY",
              payload: { key: key },
            })
          }
        >
          <Check size={16} />
        </Button>
        <span className="checkbox-label">{label}</span>
      </div>
    );
  };

  return (
    <div className="config">
      <div className="title">
        <div className="line left" />
        <span>Config</span>
        <div className="line right" />
      </div>
      <span className="subtitle">Entities Visibility</span>
      <div className="content">
        {renderVisibilityOption("grenades", "Grenades")}
        {renderVisibilityOption("primary", "Primary")}
        {renderVisibilityOption("secondary", "Secondary")}
      </div>
    </div>
  );
};

export default memo(Config);
