import { useState, useEffect } from "react";
import isEditableElement from "../../utils/isEditableElement";

const useKeyState = () => {
  const [altState, setAltState] = useState(false);
  const [arrowLeftState, setArrowLeftState] = useState(false);
  const [arrowRightState, setArrowRightState] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isEditableElement()) {
        return;
      }

      if (event.code === "AltLeft" || event.code === "AltRight") {
        event.preventDefault();
        setAltState(true);
      }
      if (event.code === "ArrowLeft") {
        event.preventDefault();
        setArrowLeftState(true);
      }
      if (event.code === "ArrowRight") {
        event.preventDefault();
        setArrowRightState(true);
      }
    };

    const handleKeyUp = (event) => {
      if (isEditableElement()) {
        return;
      }

      if (event.code === "AltLeft" || event.code === "AltRight") {
        setAltState(false);
      }
      if (event.code === "ArrowLeft") {
        setArrowLeftState(false);
      }
      if (event.code === "ArrowRight") {
        setArrowRightState(false);
      }
    };

    const handleWindowBlur = () => {
      setAltState(false);
      setArrowLeftState(false);
      setArrowRightState(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, []);

  return { altState, arrowLeftState, arrowRightState };
};

export default useKeyState;
