import Ball from "@/components/Ball";
import { useObserveWindow } from "@/hooks/useObserveWindow";
import { useObserveBalls } from "@/hooks/useObserveBalls";

const Index = () => {
  const { win, windows } = useObserveWindow();
  const { balls } = useObserveBalls(windows, win);

  return (
    <div className="app">
      <div className="console">
        {win && (
          <>
            <p>id: {win.id}</p>
            <p>pos: (x: {win.pos.x}, y: {win.pos.y})</p>
            <p>size: (width: {win.size.width}, height: {win.size.height})</p>
            <p>main: {win.main ? 'true' : 'false'}</p>
            <p>collisionIds: [{win.collisionIds?.join(",")}]</p>
            <p>createdAt: {win.createdAt}</p>
            <p>updatedAt: {win.updatedAt}</p>
          </>
        )}
      </div>
      {win && balls.map((ball) => (
        <Ball key={ball.id} win={win} ball={ball} />
      ))}
    </div>
  );
};
export default Index;
