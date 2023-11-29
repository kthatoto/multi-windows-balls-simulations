import { useEffect, useState } from "react";
import { useInterval } from "@/hooks/useInterval";
import { touchWindow, clearUnusedWindows } from "@/models/window";

export const useObserveWindow = () => {
  const [windowId] = useState(Math.random().toString(32).substring(2));
  const [main, setMain] = useState(false);
  useEffect(() => {
    clearUnusedWindows();
  }, [])

  useInterval(
    () => {
      clearUnusedWindows();
      const _main = touchWindow(windowId);
      setMain(_main);
    },
    100
  );

  return { main };
};
