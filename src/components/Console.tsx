import { MouseEvent, useCallback } from "react";
import { Ball, Window } from "@/types";
import { clearAllBalls } from "@/models/ball";
import { Mode } from "@/hooks/useConsole";

interface Props {
  win?: Window;
  windows: Window[];
  balls: Ball[];
  mode: Mode;
  debug: boolean;
  setMode: (mode: Mode) => void;
  setDebug: (debug: boolean) => void;
}

const Console = (props: Props) => {
  const {
    win,
    windows,
    balls,
    mode,
    debug,
    setMode,
    setDebug,
  } = props;

  const clear = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    clearAllBalls();
  }, []);

  if (!win) return null;
  return (
    <div className="console">
      <div className="buttons">
        <button onClick={clear}>Remove All balls</button>
        <button onClick={() => setDebug(!debug)}>Toggle debug</button>
        {mode === "normal" && (
          <button onClick={() => setMode("dvd")}>DVD mode</button>
        )}
        {mode === "dvd" && (
          <button onClick={() => setMode("normal")}>Normal mode</button>
        )}
      </div>
      {debug && (
        <>
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
        </>
      )}
    </div>
  );
};
export default Console;
