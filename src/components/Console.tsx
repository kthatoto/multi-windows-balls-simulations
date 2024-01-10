import { Ball, Window } from "@/types";
import { clearAllBalls, addBall } from "@/models/ball";

const Console = (props: { win?: Window, windows: Window[], balls: Ball[] }) => {
  const { win, windows, balls } = props;
  if (!win) return null;
  return (
    <div className="console">
      <div className="buttons">
        <button onClick={clearAllBalls}>Remove All balls</button>
        <button onClick={(e) => addBall(win, e)}>Add a ball</button>
      </div>
      <p>id: {win.id}</p>
      <p>pos: (x: {win.pos.x}, y: {win.pos.y})</p>
      <p>outerSize: (width: {win.size.outer.width}, height: {win.size.outer.height})</p>
      <p>innerSize: (width: {win.size.inner.width}, height: {win.size.inner.height})</p>
      <p>horizontal: (left: {win.pos.x}, right: {win.pos.x + win.size.outer.width})</p>
      <p>vertical: (top: {win.pos.y}, bottom: {win.pos.y + win.size.outer.height})</p>
      <p>main: {win.main ? 'true' : 'false'}</p>
      <p>collisionIds: [{win.collisionIds?.join(",")}]</p>
      <p>createdAt: {win.createdAt}</p>
      <p>updatedAt: {win.updatedAt}</p>
      <p>screen count: {windows.length}</p>
      <p>balls count: {balls.length}</p>
    </div>
  );
};
export default Console;
