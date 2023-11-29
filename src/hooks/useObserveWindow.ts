import { useState } from "react";
import { useInterval } from "@/hooks/useInterval";
import { touchWindow, clearUnusedWindows } from "@/models/window";

export const useObserveWindow = () => {
  const [windowId] = useState(Math.random().toString(32).substring(2));
  const [main, setMain] = useState(false);

  useInterval(
    () => {
      const main = touchWindow(windowId);
      setMain(main);

      if (main) {
        clearUnusedWindows();
      }
    },
    100
  );

  return { main };
};
