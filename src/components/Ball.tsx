import { useEffect, useState } from "react";
import { useInterval } from "@/hooks/useInterval";
import { moveCircle } from "@/utils/moveCircle";

const Ball = () => {
  const [radius, setRadius] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const _radius = 10 + Math.random() * 40;
    setRadius(_radius);
    setPosition({
      x: _radius + Math.random() * 100,
      y: _radius + Math.random() * 100,
    });
    setVelocity({
      x: 2 + Math.random() * 4,
      y: 2 + Math.random() * 4,
    });
  }, []);

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
