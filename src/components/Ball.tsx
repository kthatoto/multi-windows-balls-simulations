import { useState } from "react";
import { useInterval } from "@/hooks/useInterval";
import { moveCircle } from "@/utils/moveCircle";

const Ball = () => {
  const [radius] = useState(10 + Math.random() * 40);
  const [position, setPosition] = useState({
    x: radius + Math.random() * 100,
    y: radius + Math.random() * 100,
  });
  const [velocity, setVelocity] = useState({
    x: 2 + Math.random() * 4,
    y: 2 + Math.random() * 4,
  });

  useInterval(
    () => moveCircle(position, setPosition, velocity, setVelocity, radius),
    10
  );

  return (
    <div
      className="ball"
      style={{
        width: radius * 2,
        height: radius * 2,
        top: position.y - radius,
        left: position.x - radius,
      }}
    />
  );
};

export default Ball;
