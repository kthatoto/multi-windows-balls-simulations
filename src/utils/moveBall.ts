import { Ball, Vector, Window } from "@/types";
// import { distance, reflectVectorAcrossLine } from "@/utils/math";

const INNER = "INNER";
const BORDER_COLLISION = "BORDER_COLLISION";
const OUTER = "OUTER";

const NO_COLLISION = "NO_COLLISION";
const COLLISION_HORIZONTAL = "COLLISION_HORIZONTAL";
const COLLISION_VERTICAL = "COLLISION_VERTICAL";
const COLLISION_BOTH = "COLLISION_BOTH";

const windowCollision = (ball: Ball, win: Window) => {
  const winLeft = win.pos.x;
  const winRight = win.pos.x + win.size.outer.width;
  const winTop = win.pos.y;
  const winBottom = win.pos.y + win.size.outer.height;

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
  const newPos = { x: pos.x + velocity.x, y: pos.y + velocity.y };
  const newBall = { ...ball, pos: newPos };

  const win = windows.find((w) =>
    w.id === newBall.currentWindowId ||
      (
        w.pos.x <= newPos.x && newPos.x <= w.pos.x + w.size.outer.width &&
        w.pos.y <= newPos.y && newPos.y <= w.pos.y + w.size.outer.height
      )
  );
  if (!win) return ball;

  const { status, collision } = windowCollision(newBall, win);
  if (status === INNER) {
    return { ...newBall, currentWindowId: win.id, updatedAt: Date.now() };
  } else if(status === OUTER) {
    const otherWindow = windows.find((w) => windowCollision(newBall, w).status !== OUTER);
    return { ...ball, currentWindowId: otherWindow?.id };
  }

  /* 雑コード */
  const newWindow = windows.find((w) => {
    if (w.id === win.id) return false;
    if (!win.collisionIds.includes(w.id)) return false;
    return windowCollision(newBall, w).status === BORDER_COLLISION;
  });

  const centerWindow = windows.find((w) =>
    w.pos.x <= newPos.x && newPos.x <= w.pos.x + w.size.outer.width &&
    w.pos.y <= newPos.y && newPos.y <= w.pos.y + w.size.outer.height
  );
  const currentWindowId = centerWindow?.id;

  if (!newWindow) {
    console.log(status, collision);
    return {
      ...newBall,
      velocity: {
        x: velocity.x * (collision !== COLLISION_VERTICAL ? -1 : 1),
        y: velocity.y * (collision !== COLLISION_HORIZONTAL ? -1 : 1),
      },
      currentWindowId,
      updatedAt: Date.now(),
    };
  }

  const newColl = windowCollision(newBall, newWindow);

  if (newColl.collision === COLLISION_BOTH) {
    return {
      ...newBall,
      velocity: {
        x: -velocity.x,
        y: -velocity.y,
      },
      currentWindowId,
      updatedAt: Date.now(),
    };
  } else if (newColl.collision === COLLISION_VERTICAL) {
    return {
      ...newBall,
      velocity: {
        x: velocity.x,
        y: -velocity.y,
      },
      currentWindowId,
      updatedAt: Date.now(),
    };
  } else if (newColl.collision === COLLISION_HORIZONTAL) {
    return {
      ...newBall,
      currentWindowId,
      updatedAt: Date.now(),
    };
  } else {
    throw new Error('invalid collision');
  }
};
