import { useEffect, useState } from "react";
import { WINDOW_INTERVAL } from "@/constants";
import { useInterval } from "@/hooks/useInterval";
import {
  getWindows,
  touchWindow,
  clearUnusedWindows,
  updateMainWindowIfNeeded,
  updateWindowsCollision,
} from "@/models/window";
import { Window } from "@/types";

export const useObserveWindow = () => {
  const [windowId] = useState(Math.random().toString(32).substring(2));
  const [win, setWin] = useState<Window | undefined>();
  const [windows, setWindows] = useState<Window[]>([]);

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
      setWindows(await getWindows());
    },
    WINDOW_INTERVAL
  );

  return { win, windows };
};
