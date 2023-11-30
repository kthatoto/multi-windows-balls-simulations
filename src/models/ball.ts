import { db } from "@/database";
import { Ball } from "@/types";

export const getBalls = async () => {
  return await db.balls.toArray();
};

export const updateBalls = async (balls: Ball[]) => {
  await db.balls.bulkPut(balls);
};

export const createBall = async () => {
  await db.balls.put({
    id: "ball",
    radius: 20,
    pos: { x: 100, y: 100 },
    velocity: { x: 3, y: 1 },
    createdAt: (new Date(2023, 10, 30, 5, 3)).getTime(),
    updatedAt: Date.now(),
  })
};
