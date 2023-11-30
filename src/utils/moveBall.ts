import { Ball, Vector, Window } from "@/types";
import { distance, reflectVectorAcrossLine } from "@/utils/math";

export const moveBall = (windows: Window[], ball: Ball) => {
  const { pos, velocity, radius } = ball;
  const newPos = { x: pos.x + velocity.x, y: pos.y + velocity.y };
  const newVelocity = { x: velocity.x, y: velocity.y };

  const win = windows.find((w) =>
    w.id === ball.currentWindowId ||
      (
        w.pos.x <= pos.x && pos.x <= w.pos.x + w.size.width &&
        w.pos.y <= pos.y && pos.y <= w.pos.y + w.size.height
      )
  )!;
  const screenLeft = win.pos.x;
  const screenRight = win.pos.x + win.size.width;
  const screenTop = win.pos.y;
  const screenBottom = win.pos.y + win.size.height;

  if (newPos.x - radius <= screenLeft || screenRight <= newPos.x + radius) {
    newVelocity.x = velocity.x * -1;
  }
  if (newPos.y - radius <= screenTop || screenBottom <= newPos.y + radius) {
    newVelocity.y = velocity.y * -1;
  }

  return {
    ...ball,
    pos: newPos,
    velocity: newVelocity,
    currentWindowId: win.id,
  };
};
