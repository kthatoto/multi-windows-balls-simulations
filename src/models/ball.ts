import { MouseEvent } from "react";
import { db } from "@/database";
import { Ball, Window } from "@/types";
import { random } from "@/utils/math";
import { COLOR_NUMBER } from "@/constants";

export const getBalls = async () => {
  return await db.balls.toArray();
};

export const updateBalls = async (balls: Ball[]) => {
  await db.balls.bulkPut(balls);
};

export const clearAllBalls = async () => {
  await db.balls.clear();
};

export const addBall = async (win: Window, e: MouseEvent) => {
  const velocityNorm = random(1, 3);
  const velocityRad = random(0, 2) * Math.PI;
  const now = Date.now();
  const colorIndex = Math.floor(random(0, COLOR_NUMBER));

  await db.balls.put({
    id: Math.random().toString(32).substring(2),
    radius: random(50, 80),
    pos: { x: win.pos.x + e.pageX, y: win.pos.y + e.pageY },
    velocity: {
      x: velocityNorm * Math.cos(velocityRad),
      y: velocityNorm * Math.sin(velocityRad),
    },
    createdAt: now,
    updatedAt: now,
    colorIndex,
  });
};
