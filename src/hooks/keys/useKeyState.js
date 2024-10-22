import { useState, useEffect } from "react";

const useKeyState = () => {
  const [altState, setAltState] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "AltLeft" || event.code === "AltRight") {
        event.preventDefault();
        setAltState(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === "AltLeft" || event.code === "AltRight") {
        setAltState(false);
      }
    };

    const handleWindowBlur = () => {
      setAltState(false);
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

  return altState;
};

export default useKeyState;
