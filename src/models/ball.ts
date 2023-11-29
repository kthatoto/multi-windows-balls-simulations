import { db } from "@/database";
import { Ball } from "@/types";

export const getBalls = async () => {
  return await db.balls.toArray();
};

export const createBall = async () => {
  // await db.balls.put({
  //   id: ballId,
  //   radius: 20,
  //   pos: {x: 2200, y: -1100},
  //   velocity: {x: 3, y: 1},
  //   createdAt: (new Date(2023, 10, 30, 5, 3)).getTime(),
  //   updatedAt: Date.now(),
  // })
};
