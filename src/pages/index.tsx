import Ball from "@/components/Ball";
import { useObserveWindow } from "@/hooks/useObserveWindow";

const Index = () => {
  const { win } = useObserveWindow();

  return (
    <div className="app">
      <div className="console">
        <p>id: {win.id}</p>
        <p>pos: (x: {win.pos.x}, y: {win.pos.y})</p>
        <p>size: (width: {win.size.width}, height: {win.size.height})</p>
        <p>lastUpdatedAt: {win.lastUpdatedAt}</p>
        <p>order: {win.order}</p>
        <p>main: {win.main}</p>
        <p>collisionIds: [{win.collisionIds.join(",")}]</p>
      </div>
    </div>
  );
};
export default Index;
