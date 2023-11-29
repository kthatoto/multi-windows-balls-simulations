import { Window, Windows } from "@/types";

const LS_KEY_WINDOWS = "mulwin-windows";

const getWindows = (): Windows => {
  const lsWindows = localStorage[LS_KEY_WINDOWS];
  const windows = lsWindows ? JSON.parse(lsWindows) : {};
  return windows;
};

const updateWindows = (windows: Windows) => {
  localStorage[LS_KEY_WINDOWS] = JSON.stringify(windows);
};

export const touchWindow = (windowId: string) => {
  const windows = getWindows();
  const selfWindow = windows[windowId];

  windows[windowId] = {
    id: windowId,
    pos: { x: window.screenX, y: window.screenY },
    size: { width: window.outerWidth, height: window.outerHeight },
    lastUpdatedAt: Date.now(),
    order: selfWindow ? selfWindow.order : Math.max(...Object.values(windows).map((win) => win.order), 0) + 1,
    main: selfWindow ? selfWindow.main : Object.keys(windows).length === 0,
    collisionIds: selfWindow ? selfWindow.collisionIds : [],
  };

  const windowsArray = Object.values(windows);
  const mainExists = windowsArray.some((win: Window) => win.main);
  if (!mainExists) {
    const lowestOrderWindow = windowsArray.reduce((lowWin: Window | null, win: Window) => {
      if (lowWin === null) return win;
      return lowWin.order < win.order ? win : lowWin;
    }, null);
    if (lowestOrderWindow !== null) {
      windows[lowestOrderWindow.id] = {
        ...lowestOrderWindow,
        main: true,
      };
    }
  }

  updateWindows(windows);
  return windows[windowId].main;
};

export const clearUnusedWindows = () => {
  const windows = getWindows();
  const border = Date.now() - 1000; // 1秒前
  const unusedWindowIds = Object.values(windows).reduce((ids: string[], win: Window) => {
    if (border > win.lastUpdatedAt) ids.push(win.id);
    return ids;
  }, []);

  unusedWindowIds.forEach((id: string) => delete windows[id]);
  updateWindows(windows);
};

export const updateWindowsCollision = () => {
  const windows = getWindows();
  const windowsArray = Object.values(windows).map((win: Window) => ({
    ...win,
    collisionIds: [] as string[],
  }));

  windowsArray.forEach((win1: Window, i: number, array: Window[]) => {
    for (let j = i + 1; j < array.length; j++) {
      const win2 = array[j];
      if (windowsCollision(win1, win2)) {
        windowsArray[i].collisionIds.push(win2.id);
        windowsArray[j].collisionIds.push(win1.id);
      }
    }
  });

  updateWindows(
    windowsArray.reduce((windows: Windows, win: Window) => {
      windows[win.id] = win;
      return windows;
    }, {} as Windows)
  );
};

const windowsCollision = (win1: Window, win2: Window) => {
  const win1Left = win1.pos.x - 1;
  const win1Right = win1.pos.x + win1.size.width + 1;
  const win2Left = win2.pos.x;
  const win2Right = win2.pos.x + win2.size.width;

  const horizontalCollision = win1Left <= win2Right && win2Left <= win1Right;
  if (!horizontalCollision) return false;

  const win1Top = win1.pos.y - 1;
  const win1Bottom = win1.pos.y + win1.size.height + 1;
  const win2Top = win2.pos.y;
  const win2Bottom = win2.pos.y + win2.size.height;

  const verticalCollision = win1Top <= win2Bottom && win2Top <= win1Bottom;
  if (!verticalCollision) return false;

  return horizontalCollision && verticalCollision;
};
