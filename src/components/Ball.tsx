import { Ball, Window } from "@/types";
import { Mode } from "@/hooks/useConsole";
import DVD0 from "@/assets/dvd_0.png";
import DVD1 from "@/assets/dvd_1.png";
import DVD2 from "@/assets/dvd_2.png";
import DVD3 from "@/assets/dvd_3.png";
import DVD4 from "@/assets/dvd_4.png";
import DVD5 from "@/assets/dvd_5.png";

const BallComponent = (params: { win: Window, ball: Ball, mode: Mode }) => {
  const { win, ball, mode } = params;
  const DVDs = [DVD0, DVD1, DVD2, DVD3, DVD4, DVD5];

  if (mode === "dvd") {
    return (
      <img
        src={DVDs[ball.colorIndex]}
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
