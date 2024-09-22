import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const useInitTick = () => {
  const [searchParams] = useSearchParams();

  const [tick, setTick] = useState(Number(searchParams.get("tick")) || 0);

  return [tick, setTick];
};

export default useInitTick;
