import { useEffect, useState } from "react";
import { useInterval } from "@/hooks/useInterval";
import {
  touchWindow,
  clearUnusedWindows,
  updateMainWindowIfNeeded,
  updateWindowsCollision,
} from "@/models/window";
import { Window } from "@/types";

export const useObserveWindow = () => {
  const [windowId] = useState(Math.random().toString(32).substring(2));
  const [win, setWin] = useState({} as Window);

  useEffect(() => {
    clearUnusedWindows();
    updateMainWindowIfNeeded();
  }, []);

  useInterval(
    async () => {
      clearUnusedWindows();
      updateMainWindowIfNeeded();
      const touchedWindow = await touchWindow(windowId);
      setWin(touchedWindow);
      if (touchedWindow.main) {
        updateWindowsCollision();
      }
    },
    500
  );

  return { win };
};
