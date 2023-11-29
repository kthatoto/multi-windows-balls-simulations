import { useEffect, useState } from "react";
import { touchWindow } from "@/models/window";

export const useSetup = () => {
  const [main, setMain] = useState(false);
  const [windowId] = useState(Math.random().toString(32).substring(2));

  useEffect(() => {
    const main = touchWindow(windowId);
    setMain(main);
  }, [windowId]);

  return { main };
};
