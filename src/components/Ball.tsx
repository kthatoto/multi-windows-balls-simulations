import { Ball, Window } from "@/types";

const BallComponent = (params: { win: Window, ball: Ball }) => {
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
