import React from "react";
import "./CheckboxButton.css";

const CheckboxButton = ({
  label,
  isChecked,
  isDisabled,
  onButtonDown,
  buttonId,
  additionalClassName,
  tooltipId,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      className={`checkbox-button ${isChecked ? "checked " : "unchecked "}${
        isDisabled ? "disabled " : ""
      }${additionalClassName ? additionalClassName : ""}`}
      id={buttonId}
      onClick={!isDisabled ? onButtonDown : undefined}
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
      {typeof label === "string" ? <span>{label}</span> : label}
    </div>
  );
};

export default CheckboxButton;
