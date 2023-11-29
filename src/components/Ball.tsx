import { Ball, Window } from "@/types";

const BallComponent = (params: { win: Window, ball: Ball }) => {
  // const [radius, setRadius] = useState(0);
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  // const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  // useEffect(() => {
  //   const _radius = 10 + Math.random() * 40;
  //   setRadius(_radius);
  //   setPosition({
  //     x: _radius + Math.random() * 100,
  //     y: _radius + Math.random() * 100,
  //   });
  //   setVelocity({
  //     x: 2 + Math.random() * 4,
  //     y: 2 + Math.random() * 4,
  //   });
  // }, []);

  // useInterval(
  //   () => moveCircle(position, setPosition, velocity, setVelocity, radius),
  //   10
  // );

  const { win, ball } = params;
  return (
    <div
      className="ball"
      style={{
        width: ball.radius * 2,
        height: ball.radius * 2,
        top: -win.pos.y + ball.pos.y - ball.radius,
        left: -win.pos.x + ball.pos.x - ball.radius,
      }}
    />
  );
};

export default BallComponent;
