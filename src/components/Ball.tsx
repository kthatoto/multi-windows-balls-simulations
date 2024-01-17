import { Ball, Window } from "@/types";
import { Mode } from "@/hooks/useConsole";
import DVD from "@/assets/dvd.png";

const BallComponent = (params: { win: Window, ball: Ball, mode: Mode }) => {
  const { win, ball, mode } = params;

  if (mode === "dvd") {
    return (
      <img
        src={DVD}
        className="ball"
        style={{
          width: ball.radius * 2,
          height: ball.radius * 2,
          top: -win.pos.y + ball.pos.y - ball.radius - (win.size.outer.height - win.size.inner.height),
          left: -win.pos.x + ball.pos.x - ball.radius,
        }}
      />
    );
  }

  return (
    <div
      className="ball"
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
