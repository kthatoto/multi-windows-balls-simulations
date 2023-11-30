import { useState } from "react";
import { Ball, Window } from "@/types";
import { useInterval } from "@/hooks/useInterval";
import { getBalls, updateBalls, createBall } from "@/models/ball";
import { moveBall } from "@/utils/moveBall";

export const useObserveBalls = (windows: Window[], currentWindow?: Window) => {
  const [balls, setBalls] = useState<Ball[]>([]);

  useInterval(
    async () => {
      const _balls = await getBalls();
      setBalls(_balls);

      if (currentWindow?.main) {
        const newBalls = _balls.map((ball) => moveBall(windows, ball))
        updateBalls(newBalls);
        // createBall();
      }
    },
    10
  );

  return { balls };
};
