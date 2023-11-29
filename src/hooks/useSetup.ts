import { useEffect, useState } from "react";
import { upsertWindow, removeWindow } from "@/models/window";

export const useSetup = () => {
  const [main, setMain] = useState(false);
  const [windowId] = useState(Math.random().toString(32).substring(2));

  useEffect(() => {
    const main = upsertWindow({
      id: windowId,
      pos: {x: window.screenX, y: window.screenY},
      size: {width: window.outerWidth, height: window.outerHeight},
      lastUpdatedAt: (new Date()).toLocaleString(),
    });
    setMain(main);

    return () => removeWindow(windowId);
  }, [windowId]);

  return { main };
};
