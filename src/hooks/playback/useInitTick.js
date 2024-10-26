import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useInitTick = () => {
  const [searchParams] = useSearchParams();

  const [tick, setTick] = useState(Number(searchParams.get("tick")) || 0);
  const tickRef = useRef(tick);

  return [tick, setTick, tickRef];
};

export default useInitTick;
