import { Ball, Vector, Window } from "@/types";
// import { distance, reflectVectorAcrossLine } from "@/utils/math";

const RECT_LENGTH = 300;

const INNER = "INNER";
const BORDER_COLLISION = "BORDER_COLLISION";
const OUTER = "OUTER";

const NO_COLLISION = "NO_COLLISION";
const COLLISION_HORIZONTAL = "COLLISION_HORIZONTAL";
const COLLISION_VERTICAL = "COLLISION_VERTICAL";
const COLLISION_BOTH = "COLLISION_BOTH";

const windowCollision = (ball: Ball, win: Window) => {
  const radius = ball.radius + 1;
  const winLeft = win.pos.x;
  const winRight = win.pos.x + win.size.outer.width;
  const winTop = win.pos.y;
  const winBottom = win.pos.y + win.size.outer.height;

  const innerHorizontal = winLeft < ball.pos.x - radius && ball.pos.x + radius < winRight;
  const innerVertical = winTop < ball.pos.y - radius && ball.pos.y + radius < winBottom;
  if (innerHorizontal && innerVertical) return { status: INNER, collision: NO_COLLISION };

  const outerHorizontal = ball.pos.x + radius < winLeft || winRight < ball.pos.x - radius;
  const outerVertical = ball.pos.y + radius < winTop || winBottom < ball.pos.y - radius;
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

const ww = (win1: Window, win2: Window, ball: Ball) => {
  const win1Left = win1.pos.x - 1;
  const win1Right = win1.pos.x + win1.size.outer.width + 1;
  const win1Top = win1.pos.y - 1;
  const win1Bottom = win1.pos.y + win1.size.outer.height + 1;
  const win2Left = win2.pos.x;
  const win2Right = win2.pos.x + win2.size.outer.width;
  const win2Top = win2.pos.y;
  const win2Bottom = win2.pos.y + win2.size.outer.height;

  const collisionHorizontal = win2Left <= win1Right && win1Left <= win2Right;
  const collisionVertical = win2Top <= win1Bottom && win1Top <= win2Bottom;
  const win1IsLeft = win1Left < win2Left;
  const win1IsTop = win1Top < win2Top;

  if (collisionHorizontal) {
    const rect1Bottom = Math.max(win1Top, win2Top) - RECT_LENGTH;
    let rect1Vertical: number;
    if (win1Top === win2Top) {
      rect1Vertical = (win1IsLeft ? win1Right : win1Left) - RECT_LENGTH / 2;
    } else if (win1Top > win2Top) {
      rect1Vertical = win1IsLeft ? win1Right - RECT_LENGTH : win1Left;
    } else {
      rect1Vertical = win1IsLeft ? win1Left : win1Right - RECT_LENGTH;
    }
  } else if (collisionVertical) {
  }
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

  const coll = windowCollision(newBall, win);
  if (coll.status === INNER) {
    return { ...newBall, currentWindowId: win.id, updatedAt: Date.now() };
  } else if(coll.status === OUTER) {
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

  console.log(newWindow);
  if (!newWindow) {
    return {
      ...newBall,
      velocity: {
        x: velocity.x * (coll.collision !== COLLISION_VERTICAL ? -1 : 1),
        y: velocity.y * (coll.collision !== COLLISION_HORIZONTAL ? -1 : 1),
      },
      currentWindowId,
      updatedAt: Date.now(),
    };
  }

  const newColl = windowCollision(newBall, newWindow);

  // win -> coll
  // newWin -> newColl

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
