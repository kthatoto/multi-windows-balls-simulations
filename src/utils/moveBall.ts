import { Ball, Vector } from "@/types";
import { distance, reflectVectorAcrossLine } from "@/utils/math";

export const moveBall = (ball: Ball) => {
//   pos: Vector,
//   setPosition: (newPosition: Vector) => void,
//   velocity: Vector,
//   setVelocity: (newVelocity: Vector) => void,
//   radius: number,
// ) => {
  const { pos, velocity, radius } = ball;
  const newPos = { x: pos.x + velocity.x, y: pos.y + velocity.y };
  const newVelocity = { x: velocity.x, y: velocity.y };

  const height = document.body.clientHeight;
  const width = document.body.clientWidth;

  if (newPos.x - radius <= 0 || width <= newPos.x + radius) {
    newVelocity.x = velocity.x * -1;
  }
  if (newPos.y - radius <= 0 || height <= newPos.y + radius) {
    newVelocity.y = velocity.y * -1;
  }

  return {
    ...ball,
    pos: newPos,
    velocity: newVelocity,
  };
};
