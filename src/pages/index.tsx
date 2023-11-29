import Ball from "@/components/Ball";
import { useObserveWindow } from "@/hooks/useObserveWindow";

const Index = () => {
  const { win } = useObserveWindow();

  return (
    <div className="app">
      <div className="console">
        <p>id: {win.id}</p>
        <p>pos: (x: {win.pos?.x}, y: {win.pos?.y})</p>
        <p>size: (width: {win.size?.width}, height: {win.size?.height})</p>
        <p>main: {win.main ? 'true' : 'false'}</p>
        <p>collisionIds: [{win.collisionIds?.join(",")}]</p>
        <p>createdAt: {win.createdAt}</p>
        <p>updatedAt: {win.updatedAt}</p>
      </div>
    </div>
  );
};
export default Index;
