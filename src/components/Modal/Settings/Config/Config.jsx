import { memo, useContext } from "react";
import {
  ConfigReducerDispatchContext,
  ConfigReducerStateContext,
} from "../../../../providers/ConfigProvider";
import Button from "../../../ui/Button/Button";
import "./Config.css";
import { Check } from "lucide-react";
import classNames from "classnames";

const Config = () => {
  const configDispatch = useContext(ConfigReducerDispatchContext);
  const configState = useContext(ConfigReducerStateContext);

  const renderVisibilityOption = (key, label) => {
    const value = configState.account.visibility[key];
    console.log(value);

    return (
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
        <Check />
      </Button>
    );
  };

  return (
    <div className="config">
      <div className="title">
        <div className="line left" />
        <span>Config</span>
        <div className="line right" />
      </div>
      <div className="content">
        <div className="section">
          <span className="subtitle">Visibility</span>
          <div className="options">
            <div className="option">
              {renderVisibilityOption("secondary", "xd")}
            </div>
          </div>
        </div>
        <div className="option"></div>
      </div>
    </div>
  );
};

export default memo(Config);
