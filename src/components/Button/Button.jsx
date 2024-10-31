import classNames from "classnames";
import { useCallback } from "react";
import "./Button.css";

const Button = ({
  className,
  isChecked,
  isDisabled,
  onLeftClick,
  onRightClick,
  style,
  children,
}) => {
  const handleClick = useCallback(
    (event) => {
      if (!isDisabled) {
        if (event.type === "click" && onLeftClick) {
          onLeftClick();
        } else if (event.type === "contextmenu" && onRightClick) {
          event.preventDefault();
          onRightClick();
        }
      }
    },
    [isDisabled, onLeftClick, onRightClick]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" && !isDisabled) {
        onLeftClick();
      }
    },
    [isDisabled, onLeftClick]
  );

  return (
    <button
      className={classNames("button", className, {
        checked: isChecked,
        disabled: isDisabled,
      })}
      onClick={handleClick}
      onContextMenu={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      aria-pressed={isChecked}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
