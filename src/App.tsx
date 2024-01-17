import { useMemo } from "react";
import Ball from "@/components/Ball";
import Console from "@/components/Console";
import { useConsole } from "@/hooks/useConsole";
import { useObserveWindow } from "@/hooks/useObserveWindow";
import { useObserveBalls } from "@/hooks/useObserveBalls";

const App = () => {
  const { mode, debug, setMode, setDebug } = useConsole();
  const { win, windows } = useObserveWindow();
  const { balls } = useObserveBalls(windows, win);

  const rootClasses = useMemo(() => {
    if (mode === "dvd") return "app dvd";
    return "app";
  }, [mode]);

  return (
    <div className={rootClasses}>
      <Console
        win={win}
        windows={windows}
        balls={balls}
        mode={mode}
        debug={debug}
        setMode={setMode}
        setDebug={setDebug}
      />
      {win && balls.map((ball) => (
        <Ball key={ball.id} win={win} ball={ball} mode={mode} />
      ))}
    </div>
  );
};
export default App;
