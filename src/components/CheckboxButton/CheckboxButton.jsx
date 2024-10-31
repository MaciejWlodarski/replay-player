import React, { useCallback } from "react";
import classNames from "classnames";
import "./CheckboxButton.css";

const CheckboxButton = ({
  label,
  isChecked,
  isDisabled,
  onButtonDown,
  onRightClick,
  buttonId,
  additionalClassName,
  tooltipId,
  onMouseEnter,
  onMouseLeave,
}) => {
  const handleClick = useCallback(
    (event) => {
      if (!isDisabled) {
        if (event.type === "click") {
          onButtonDown();
        } else if (event.type === "contextmenu" && onRightClick) {
          event.preventDefault();
          onRightClick();
        }
      }
    },
    [isDisabled, onButtonDown, onRightClick]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" && !isDisabled) {
        onButtonDown();
      }
    },
    [isDisabled, onButtonDown]
  );

  return (
    <div
      className={classNames(
        "checkbox-button",
        { checked: isChecked, unchecked: !isChecked, disabled: isDisabled },
        additionalClassName
      )}
      id={buttonId}
      onClick={handleClick}
      onContextMenu={handleClick}
      role="button"
      aria-pressed={isChecked}
      tabIndex={isDisabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      data-tooltip-id={tooltipId}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {typeof label === "string" ? (
        <span className="label">{label}</span>
      ) : (
        label
      )}
    </div>
  );
};

export default CheckboxButton;
