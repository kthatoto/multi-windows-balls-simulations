import { RECTANGLES } from "@/constants";
import { Vector } from "@/types";
import { distance, reflectVectorAcrossLine } from "@/utils/math";

export const moveCircle = (
  pos: Vector,
  setPosition: (newPosition: Vector) => void,
  velocity: Vector,
  setVelocity: (newVelocity: Vector) => void,
  radius: number,
) => {
  const newPos = { x: pos.x + velocity.x, y: pos.y + velocity.y };
  const newVelocity = { x: velocity.x, y: velocity.y };

  const height = document.body.clientHeight;
  const width = document.body.clientWidth;

  if (newPos.x - radius <= 0 || width <= newPos.x + radius) {
    newVelocity.x = velocity.x * -1;
  }
  if (newPos.y - radius <= 0 || height <= newPos.y + radius) {
    newVelocity.y = velocity.y * -1;
  }

  RECTANGLES.forEach((rect) => {
    const overlaps = {
      // 円の中心が矩形と重なっているか
      center: {
        horizontal: rect.x <= newPos.x && newPos.x <= rect.x + rect.width,
        vertical: rect.y <= newPos.y && newPos.y <= rect.y + rect.height,
      },
      // 円を囲む矩形が矩形と重なっているか
      rect: {
        horizontal: rect.x <= newPos.x + radius && newPos.x - radius <= rect.x + rect.width,
        vertical: rect.y <= newPos.y + radius && newPos.y - radius <= rect.y + rect.height,
      },
    };

    const leftSide = newPos.x <= rect.x;
    const rightSide = rect.x + rect.width <= newPos.x;
    const topSide = newPos.y <= rect.y;
    const bottomSide = rect.y + rect.height <= newPos.y;

    if (overlaps.center.horizontal && overlaps.rect.vertical) {
      if (topSide) {
        // 上辺に衝突
        newVelocity.y = Math.abs(velocity.y) * -1;
      } else if (bottomSide) {
        // 下辺に衝突
        newVelocity.y = Math.abs(velocity.y);
      }
      newVelocity.y = velocity.y * -1;
    } else if (overlaps.center.vertical && overlaps.rect.horizontal) {
      if (leftSide) {
        // 左辺に衝突
        newVelocity.x = Math.abs(velocity.x) * -1;
      } else if (rightSide) {
        // 右辺に衝突
        newVelocity.x = Math.abs(velocity.x);
      }
    } else if (
      !overlaps.center.horizontal &&
      !overlaps.center.vertical &&
      overlaps.rect.horizontal &&
      overlaps.rect.vertical
    ) {
      // 角に衝突
      const cornerPoint = { x: -1, y: -1 };
      if (leftSide) {
        if (topSide) {
          cornerPoint.x = rect.x;
          cornerPoint.y = rect.y;
        } else if (bottomSide) {
          cornerPoint.x = rect.x;
          cornerPoint.y = rect.y + rect.height;
        }
      } else if (rightSide) {
        if (topSide) {
          cornerPoint.x = rect.x + rect.width;
          cornerPoint.y = rect.y;
        } else if (bottomSide) {
          cornerPoint.x = rect.x + rect.width;
          cornerPoint.y = rect.y + rect.height;
        }
      }

      if (distance(newPos.x, newPos.y, cornerPoint.x, cornerPoint.y) <= radius) {
        const convertedVector = reflectVectorAcrossLine(
          velocity,
          { x: cornerPoint.x - newPos.x, y: cornerPoint.y - newPos.y },
        );
        newVelocity.x = convertedVector.x * -1;
        newVelocity.y = convertedVector.y * -1;
      }
    }
  });

  setPosition(newPos);
  setVelocity(newVelocity);
  return;
};
