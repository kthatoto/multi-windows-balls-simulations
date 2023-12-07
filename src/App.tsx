import Ball from "@/components/Ball";
import Console from "@/components/Console";
import { useObserveWindow } from "@/hooks/useObserveWindow";
import { useObserveBalls } from "@/hooks/useObserveBalls";

const App = () => {
  const { win, windows } = useObserveWindow();
  const { balls } = useObserveBalls(windows, win);

  return (
    <div className="app">
      <Console win={win} windows={windows} balls={balls} />
      {win && balls.map((ball) => (
        <Ball key={ball.id} win={win} ball={ball} />
      ))}
    </div>
  );
};
export default App;
