import { Ball, Window } from "@/types";
import { clearAllBalls, addBall } from "@/models/ball";

const Console = (props: { win?: Window, windows: Window[], balls: Ball[] }) => {
  const { win, windows, balls } = props;
  if (!win) return null;
  return (
    <div className="console">
      <p>id: {win.id}</p>
      <p>pos: (x: {win.pos.x}, y: {win.pos.y})</p>
      <p>outerSize: (width: {win.size.outer.width}, height: {win.size.outer.height})</p>
      <p>innerSize: (width: {win.size.inner.width}, height: {win.size.inner.height})</p>
      <p>main: {win.main ? 'true' : 'false'}</p>
      <p>collisionIds: [{win.collisionIds?.join(",")}]</p>
      <p>createdAt: {win.createdAt}</p>
      <p>updatedAt: {win.updatedAt}</p>
      <p>screen count: {windows.length}</p>
      <p>balls count: {balls.length}</p>
      <div className="buttons">
        <button onClick={clearAllBalls}>Remove All balls</button>
        <button onClick={(e) => addBall(win, e)}>Add a ball</button>
      </div>
    </div>
  );
};
export default Console;
