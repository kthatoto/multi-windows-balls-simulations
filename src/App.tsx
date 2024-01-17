import Ball from "@/components/Ball";
import Console from "@/components/Console";
import { useConsole } from "@/hooks/useConsole";
import { useObserveWindow } from "@/hooks/useObserveWindow";
import { useObserveBalls } from "@/hooks/useObserveBalls";

const App = () => {
  const { mode, debug, setMode, setDebug } = useConsole();
  const { win, windows } = useObserveWindow();
  const { balls } = useObserveBalls(windows, win);

  return (
    <div className="app">
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
        <Ball key={ball.id} win={win} ball={ball} />
      ))}
    </div>
  );
};
export default App;
