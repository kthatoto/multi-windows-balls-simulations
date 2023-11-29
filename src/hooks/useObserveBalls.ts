import { useState } from "react";
import { Ball, Window } from "@/types";
import { useInterval } from "@/hooks/useInterval";
import { getBalls } from "@/models/ball";

export const useObserveBalls = (win: Window) => {
  const [balls, setBalls] = useState<Ball[]>([]);

  useInterval(
    async () => {
      const _balls = await getBalls();
      setBalls(_balls);

      if (win.main) {
      }
    },
    100
  );

  return { balls };
};
