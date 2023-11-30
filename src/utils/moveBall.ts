import { Ball, Vector, Window } from "@/types";
import { distance, reflectVectorAcrossLine } from "@/utils/math";

const INNER = 0;
const BORDER_COLLISION = 1;
const OUTER = -1;

const NO_COLLISION = "no_collision";
const COLLISION_HORIZONTAL = "collision_horizontal";
const COLLISION_VERTICAL = "collision_vertical";
const COLLISION_BOTH = "collision_both";

const windowCollision = (ball: Ball, win: Window) => {
  const winLeft = win.pos.x;
  const winRight = win.pos.x + win.size.width;
  const winTop = win.pos.y;
  const winBottom = win.pos.y + win.size.height;

  const innerHorizontal = winLeft < ball.pos.x - ball.radius && ball.pos.x + ball.radius < winRight;
  const innerVertical = winTop < ball.pos.y - ball.radius && ball.pos.y + ball.radius < winBottom;
  if (innerHorizontal && innerVertical) return { status: INNER, collision: NO_COLLISION };

  const outerHorizontal = ball.pos.x + ball.radius < winLeft || winRight < ball.pos.x - ball.radius;
  const outerVertical = ball.pos.y + ball.radius < winTop || winBottom < ball.pos.y - ball.radius;
  if (outerHorizontal || outerVertical) return { status: OUTER, collision: NO_COLLISION };

  let collision = NO_COLLISION;
  if (!innerHorizontal && !innerVertical) {
    collision = COLLISION_BOTH;
  } else if (!innerHorizontal) {
    collision = COLLISION_HORIZONTAL;
  } else if (!innerVertical) {
    collision = COLLISION_VERTICAL;
  }

  return {
    status: BORDER_COLLISION,
    collision,
  };
};

export const moveBall = (windows: Window[], ball: Ball) => {
  const { pos, velocity } = ball;
  const newBall = {
    ...ball,
    pos: { x: pos.x + velocity.x, y: pos.y + velocity.y },
  };
  const newPos = { x: newBall.pos.x, y: newBall.pos.y };

  const win = windows.find((w) =>
    w.id === newBall.currentWindowId ||
      (
        w.pos.x <= newPos.x && newPos.x <= w.pos.x + w.size.width &&
        w.pos.y <= newPos.y && newPos.y <= w.pos.y + w.size.height
      )
  )!;

  if (!win) return ball;

  const { status, collision } = windowCollision(newBall, win);
  if (status === INNER) {
    return {
      ...newBall,
      currentWindowId: win.id,
      updatedAt: Date.now(),
    };
  } else if (status === BORDER_COLLISION) {
    /* 雑コード */
    const centerWindow = windows.find((w) =>
      w.pos.x <= newPos.x && newPos.x <= w.pos.x + w.size.width &&
      w.pos.y <= newPos.y && newPos.y <= w.pos.y + w.size.height
    );
    const currentWindowId = centerWindow?.id;

    if (collision === COLLISION_VERTICAL) {
      return {
        ...newBall,
        velocity: {
          x: velocity.x,
          y: -velocity.y,
        },
        currentWindowId,
        updatedAt: Date.now(),
      };
    }

    const newWindow = windows.find((w) => {
      if (w.id === win.id) return false;
      if (!win.collisionIds.includes(w.id)) return false;
      return windowCollision(newBall, w).status === BORDER_COLLISION;
    });

    if (!newWindow) {
      return {
        ...newBall,
        velocity: {
          x: -velocity.x,
          y: velocity.y,
        },
        currentWindowId,
        updatedAt: Date.now(),
      };
    }
    const coll = windowCollision(newBall, newWindow);

    if (coll.collision === COLLISION_BOTH) {
      return {
        ...newBall,
        velocity: {
          x: -velocity.x,
          y: -velocity.y,
        },
        currentWindowId,
        updatedAt: Date.now(),
      };
    } else if (coll.collision === COLLISION_VERTICAL) {
      return {
        ...newBall,
        velocity: {
          x: velocity.x,
          y: -velocity.y,
        },
        currentWindowId,
        updatedAt: Date.now(),
      };
    } else if (coll.collision === COLLISION_HORIZONTAL) {
      return {
        ...newBall,
        currentWindowId,
        updatedAt: Date.now(),
      };
    }
  }
  const otherWindow = windows.find((w) => windowCollision(newBall, w).status !== OUTER);
  return { ...ball, currentWindowId: otherWindow?.id };
};
