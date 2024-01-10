import { db } from "@/database";
import { CLEAR_WINDOW_INTERVAL } from "@/constants";
import { Window } from "@/types";

export const getWindows = async () => {
  return await db.windows.toArray();
};

const MARGIN = 1;

export const touchWindow = async (windowId: string) => {
  const existingWindow = await db.windows.get(windowId);
  const pos = { x: window.screenX - MARGIN, y: window.screenY - MARGIN };
  const size = {
    outer: { width: window.outerWidth + (MARGIN * 2), height: window.outerHeight + (MARGIN * 2) },
    inner: { width: window.innerWidth, height: window.innerHeight },
  };
  if (existingWindow) {
    const newWindow = {
      ...existingWindow,
      pos,
      size,
      updatedAt: Date.now(),
    };
    await db.windows.put(newWindow);
    return newWindow;
  }
  const newWindow = {
    id: windowId,
    pos,
    size,
    main: 0 as const,
    collisionIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  await db.windows.put(newWindow);
  return newWindow;
};

export const updateMainWindowIfNeeded = async () => {
  const mainExists = await db.windows.where('main').equals(1).count() > 0;
  if (mainExists) return;
  const newMainWindow = await db.windows.orderBy('createdAt').first();
  if (!newMainWindow) return;
  await db.windows.update(newMainWindow.id, { main: 1 });
};

export const clearUnusedWindows = () => {
  const border = Date.now() - CLEAR_WINDOW_INTERVAL;
  db.windows.where('updatedAt').below(border).delete();
};

export const updateWindowsCollision = async () => {
  const allWindows = (await db.windows.toArray()).map((win) => ({
    ...win,
    collisionIds: [] as string[],
  }));
  allWindows.forEach((win1: Window, i: number, array: Window[]) => {
    for (let j = i + 1; j < array.length; j++) {
      const win2 = array[j];
      if (windowsCollision(win1, win2)) {
        allWindows[i].collisionIds.push(win2.id);
        allWindows[j].collisionIds.push(win1.id);
      }
    }
  });
  await db.windows.bulkPut(allWindows);
};

const windowsCollision = (win1: Window, win2: Window) => {
  const win1Left = win1.pos.x - 1;
  const win1Right = win1.pos.x + win1.size.outer.width + 1;
  const win2Left = win2.pos.x;
  const win2Right = win2.pos.x + win2.size.outer.width;

  const horizontalCollision = win1Left <= win2Right && win2Left <= win1Right;
  if (!horizontalCollision) return false;

  const win1Top = win1.pos.y - 1;
  const win1Bottom = win1.pos.y + win1.size.outer.height + 1;
  const win2Top = win2.pos.y;
  const win2Bottom = win2.pos.y + win2.size.outer.height;

  const verticalCollision = win1Top <= win2Bottom && win2Top <= win1Bottom;
  if (!verticalCollision) return false;

  return horizontalCollision && verticalCollision;
};
