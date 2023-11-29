import { useEffect, useState } from "react";
import {upsertWindow} from "@/models/window";

export const useSetup = () => {
  const [main, setMain] = useState(false);
  const [windowId] = useState(Math.random().toString(32).substring(2));

  useEffect(() => {
    const main = upsertWindow({
      id: windowId,
      pos: { x: window.screenX, y: window.screenY },
      size: { width: window.outerWidth, height: window.outerHeight },
    });
    setMain(main);

  }, [windowId]);

  return { main };
};
