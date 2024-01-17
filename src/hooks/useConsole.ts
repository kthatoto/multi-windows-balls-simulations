import { useState } from "react";

export type Mode = "normal" | "dvd";

export const useConsole = () => {
  const [mode, setMode] = useState<Mode>("normal");
  const [debug, setDebug] = useState<boolean>(false);
  return {
    mode,
    debug,
    setMode,
    setDebug,
  }
};
