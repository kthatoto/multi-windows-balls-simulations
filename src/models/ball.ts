import { db } from "@/database";
import { Ball } from "@/types";

export const getBalls = async () => {
  return await db.balls.toArray();
};
