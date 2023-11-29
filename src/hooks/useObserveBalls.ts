import { useState } from "react";
import { Ball, Window } from "@/types";
import { useInterval } from "@/hooks/useInterval";
import { getBalls, updateBalls } from "@/models/ball";
import { moveBall } from "@/utils/moveBall";

export const useObserveBalls = (win: Window) => {
  const [balls, setBalls] = useState<Ball[]>([]);

  useInterval(
    async () => {
      const _balls = await getBalls();
      setBalls(_balls);

      if (win?.main) {
        const newBalls = _balls.map((ball) => moveBall(win, ball))
        updateBalls(newBalls);
      }
    },
    100
  );

  return { balls };
};
