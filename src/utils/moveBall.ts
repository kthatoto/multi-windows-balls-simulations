import { Ball, Vector, Window } from "@/types";
import { distance, reflectVectorAcrossLine } from "@/utils/math";

const INNER = 0;
const BORDER_COLLISION = 1;
const OUTER = -1;

const windowCollision = (ball: Ball, win: Window) => {
  const winLeft = win.pos.x;
  const winRight = win.pos.x + win.size.width;
  const winTop = win.pos.y;
  const winBottom = win.pos.y + win.size.height;

  const innerHorizontal = winLeft <= ball.pos.x - ball.radius && ball.pos.x + ball.radius <= winRight;
  const innerVertical = winTop <= ball.pos.y - ball.radius && ball.pos.y + ball.radius <= winBottom;
  if (innerHorizontal && innerVertical) return INNER;

  const outerHorizontal = ball.pos.x + ball.radius < winLeft || winRight < ball.pos.x - ball.radius;
  const outerVertical = ball.pos.y + ball.radius < winTop || winBottom < ball.pos.y - ball.radius;
  if (outerHorizontal || outerVertical) return OUTER;

  return BORDER_COLLISION;
};

export const moveBall = (windows: Window[], ball: Ball) => {
  const { pos, velocity } = ball;
  const newBall = {
    ...ball,
    pos: {x: pos.x + velocity.x, y: pos.y + velocity.y},
  };

  const win = windows.find((w) =>
    w.id === newBall.currentWindowId ||
      (
        w.pos.x <= pos.x && pos.x <= w.pos.x + w.size.width &&
        w.pos.y <= pos.y && pos.y <= w.pos.y + w.size.height
      )
  )!;

  if (!win) return ball;

  const status = windowCollision(newBall, win);
  if (status === INNER) {
    return {
      ...newBall,
      currentWindowId: win.id,
      updatedAt: Date.now(),
    };
  } else if (status === BORDER_COLLISION) {
    const aroundCollisionWindows = windows.filter((w) => {
      if (w.id === win.id) return false;
      if (!win.collisionIds.includes(w.id)) return false;
      return windowCollision(newBall, w) !== OUTER;
    });
  }
  const otherWindow = windows.find((w) => windowCollision(newBall, w) !== OUTER);
  return { ...ball, currentWindowId: otherWindow?.id };
};
