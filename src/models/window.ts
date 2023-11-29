import { Window, Windows } from "@/types";

const LS_KEY_WINDOWS = "mulwin-windows";

const getWindows = (): Windows => {
  const lsWindows = localStorage[LS_KEY_WINDOWS];
  const windows = lsWindows ? JSON.parse(lsWindows) : {};
  return windows;
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

  localStorage[LS_KEY_WINDOWS] = JSON.stringify(windows);
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
  localStorage[LS_KEY_WINDOWS] = JSON.stringify(windows);
};
