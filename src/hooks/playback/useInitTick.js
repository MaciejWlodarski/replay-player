import { useRef, useState } from "react";

const useInitTick = (startTick) => {
  const [tick, setTick] = useState(startTick || 0);
  const tickRef = useRef(tick);

  return [tick, setTick, tickRef];
};

export default useInitTick;
