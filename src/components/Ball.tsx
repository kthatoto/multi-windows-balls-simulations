import { Ball, Window } from "@/types";
import DVD from "@/assets/dvd.webp";

const BallComponent = (params: { win: Window, ball: Ball }) => {
  const { win, ball } = params;
  return (
    <img
      className="ball"
      src={DVD}
      style={{
        width: ball.radius * 2,
        height: ball.radius * 2,
        top: -win.pos.y + ball.pos.y - ball.radius - (win.size.outer.height - win.size.inner.height),
        left: -win.pos.x + ball.pos.x - ball.radius,
      }}
    />
  );
};

export default BallComponent;
