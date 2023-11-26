import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>(() => {});
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const interval = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(interval);
  }, [delay]);
};
