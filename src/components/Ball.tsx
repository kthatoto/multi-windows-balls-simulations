import { useState } from "react";
import { useInterval } from "@/hooks/useInterval";
import { moveCircle } from "@/utils/moveCircle";

const Ball = () => {
  const [radius] = useState(10 + Math.random() * 30);
  const [position, setPosition] = useState({
    x: radius + Math.random() * 10,
    y: radius + Math.random() * 10,
  });
  const [velocity, setVelocity] = useState({
    x: Math.random() * 3,
    y: Math.random() * 3,
  });

  useInterval(
    () => moveCircle(position, setPosition, velocity, setVelocity, radius),
    10
  );

  return (
    <div
      className="circle"
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
