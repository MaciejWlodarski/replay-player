import React from "react";
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
  const handleClick = (event) => {
    if (!isDisabled) {
      if (event.type === "click") {
        onButtonDown();
      } else if (event.type === "contextmenu" && onRightClick) {
        event.preventDefault();
        onRightClick();
      }
    }
  };

  return (
    <div
      className={`checkbox-button ${isChecked ? "checked " : "unchecked "}${
        isDisabled ? "disabled " : ""
      }${additionalClassName ? additionalClassName : ""}`}
      id={buttonId}
      onClick={handleClick}
      onContextMenu={handleClick}
      role="button"
      aria-pressed={isChecked}
      tabIndex={isDisabled ? -1 : 0}
      onKeyDown={(event) =>
        event.key === "Enter" && !isDisabled ? onButtonDown() : undefined
      }
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
