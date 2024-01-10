import { Ball, Window, AbsoluteRect } from "@/types";
import { distance, reflectVectorAcrossLine } from "@/utils/math";

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

const ww = (win1: Window, win2: Window) => {
  const ar1: AbsoluteRect = {
    left: win1.pos.x - 1,
    right: win1.pos.x + win1.size.outer.width + 1,
    top: win1.pos.y - 1,
    bottom: win1.pos.y + win1.size.outer.height + 1,
  };
  const ar2: AbsoluteRect = {
    left: win2.pos.x,
    right: win2.pos.x + win2.size.outer.width,
    top: win2.pos.y,
    bottom: win2.pos.y + win2.size.outer.height,
  };

  const collisionHorizontal = ar2.left <= ar1.right && ar1.left <= ar2.right;
  const collisionVertical = ar2.top <= ar1.bottom && ar1.top <= ar2.bottom;
  const ar1IsLeft = ar1.left < ar2.left;
  const ar1IsTop = ar1.top < ar2.top;

  const ars: AbsoluteRect[] = [];
  if (collisionHorizontal) {
    if (ar1IsLeft) {
      ars.push(ar1, ar2);
    } else {
      ars.push(ar2, ar1);
    }
  } else if (collisionVertical) {
    if (ar1IsTop) {
      ars.push(ar1, ar2);
    } else {
      ars.push(ar2, ar1);
    }
  }

  // sorted absolute rects
  const sar1 = ars[0];
  const sar2 = ars[1];

  const obstacles: AbsoluteRect[] = [];
  if (collisionHorizontal) {
    if (sar1.top < sar2.top) {
      obstacles.push({
        left: sar1.right,
        right: sar1.right + RECT_LENGTH,
        top: sar2.top - RECT_LENGTH,
        bottom: sar2.top,
      });
    } else if (sar1.top > sar2.top) {
      obstacles.push({
        left: sar1.right - RECT_LENGTH,
        right: sar1.right,
        top: sar1.top - RECT_LENGTH,
        bottom: sar1.top,
      });
    } else {
      obstacles.push({
        left: sar1.right - RECT_LENGTH,
        right: sar1.right + RECT_LENGTH,
        top: sar1.top - RECT_LENGTH,
        bottom: sar1.top,
      });
    }

    if (sar1.bottom > sar2.bottom) {
      obstacles.push({
        left: sar1.right,
        right: sar1.right + RECT_LENGTH,
        top: sar2.bottom,
        bottom: sar2.bottom + RECT_LENGTH,
      });
    } else if (sar1.bottom < sar2.bottom) {
      obstacles.push({
        left: sar1.right - RECT_LENGTH,
        right: sar1.right,
        top: sar1.bottom,
        bottom: sar1.bottom + RECT_LENGTH,
      });
    } else {
      obstacles.push({
        left: sar1.right - RECT_LENGTH,
        right: sar1.right + RECT_LENGTH,
        top: sar1.bottom,
        bottom: sar1.bottom + RECT_LENGTH,
      });
    }
  } else if (collisionVertical) {
    if (sar1.left < sar2.left) {
      obstacles.push({
        left: sar2.left - RECT_LENGTH,
        right: sar2.left,
        top: sar2.top,
        bottom: sar2.top + RECT_LENGTH,
      });
    } else if (sar1.left > sar2.left) {
      obstacles.push({
        left: sar1.left - RECT_LENGTH,
        right: sar1.left,
        top: sar1.bottom - RECT_LENGTH,
        bottom: sar1.bottom,
      });
    } else {
      obstacles.push({
        left: sar1.left - RECT_LENGTH,
        right: sar1.left,
        top: sar1.bottom - RECT_LENGTH,
        bottom: sar1.bottom + RECT_LENGTH,
      });
    }

    if (sar1.right > sar2.right) {
      obstacles.push({
        left: sar2.right,
        right: sar2.right + RECT_LENGTH,
        top: sar1.bottom,
        bottom: sar1.bottom + RECT_LENGTH,
      });
    } else if (sar1.right < sar2.right) {
      obstacles.push({
        left: sar1.right,
        right: sar1.right + RECT_LENGTH,
        top: sar1.bottom - RECT_LENGTH,
        bottom: sar1.bottom,
      });
    } else {
      obstacles.push({
        left: sar1.right,
        right: sar1.right + RECT_LENGTH,
        top: sar1.bottom - RECT_LENGTH,
        bottom: sar1.bottom + RECT_LENGTH,
      });
    }
  }
  return obstacles;
};

export const moveBall = (windows: Window[], ball: Ball) => {
  const { pos, velocity, radius } = ball;
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
  const newWin = windows.find((w) => {
    if (w.id === win.id) return false;
    if (!win.collisionIds.includes(w.id)) return false;
    return windowCollision(newBall, w).status === BORDER_COLLISION;
  });

  const centerWindow = windows.find((w) =>
    w.pos.x <= newPos.x && newPos.x <= w.pos.x + w.size.outer.width &&
    w.pos.y <= newPos.y && newPos.y <= w.pos.y + w.size.outer.height
  );
  const currentWindowId = centerWindow?.id;

  if (!newWin) {
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

  const newVelocity = { x: newBall.velocity.x, y: newBall.velocity.y };
  const obstacles = ww(win, newWin);
  obstacles.forEach((rect) => {
    const overlaps = {
      // 円の中心が矩形と重なっているか
      center: {
        horizontal: rect.left <= newPos.x && newPos.x <= rect.right,
        vertical: rect.top <= newPos.y && newPos.y <= rect.bottom,
      },
      // 円を囲む矩形が矩形と重なっているか
      rect: {
        horizontal: rect.left <= newPos.x + radius && newPos.x - radius <= rect.right,
        vertical: rect.top <= newPos.y + radius && newPos.y - radius <= rect.bottom,
      },
    };

    const leftSide = newPos.x <= rect.left;
    const rightSide = rect.right <= newPos.x;
    const topSide = newPos.y <= rect.top;
    const bottomSide = rect.bottom <= newPos.y;

    if (overlaps.center.horizontal && overlaps.rect.vertical) {
      if (topSide) {
        // 上辺に衝突
        newVelocity.y = Math.abs(velocity.y) * -1;
      } else if (bottomSide) {
        // 下辺に衝突
        newVelocity.y = Math.abs(velocity.y);
      }
    } else if (overlaps.center.vertical && overlaps.rect.horizontal) {
      if (leftSide) {
        // 左辺に衝突
        newVelocity.x = Math.abs(velocity.x) * -1;
      } else if (rightSide) {
        // 右辺に衝突
        newVelocity.x = Math.abs(velocity.x);
      }
    } else if (
      !overlaps.center.horizontal &&
      !overlaps.center.vertical &&
      overlaps.rect.horizontal &&
      overlaps.rect.vertical
    ) {
      // 角に衝突
      const cornerPoint = { x: -1, y: -1 };
      if (leftSide) {
        if (topSide) {
          cornerPoint.x = rect.left;
          cornerPoint.y = rect.top;
        } else if (bottomSide) {
          cornerPoint.x = rect.left;
          cornerPoint.y = rect.bottom;
        }
      } else if (rightSide) {
        if (topSide) {
          cornerPoint.x = rect.right;
          cornerPoint.y = rect.top;
        } else if (bottomSide) {
          cornerPoint.x = rect.right;
          cornerPoint.y = rect.bottom;
        }
      }

      if (distance(newPos.x, newPos.y, cornerPoint.x, cornerPoint.y) <= radius) {
        const convertedVector = reflectVectorAcrossLine(
          velocity,
          { x: cornerPoint.x - newPos.x, y: cornerPoint.y - newPos.y },
        );
        newVelocity.x = convertedVector.x * -1;
        newVelocity.y = convertedVector.y * -1;
      }
    }
  });

  return {
    ...newBall,
    velocity: newVelocity,
    currentWindowId,
    updatedAt: Date.now(),
  };
};
