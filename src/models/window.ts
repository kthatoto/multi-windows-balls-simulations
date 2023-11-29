import { Window, Windows } from "@/types";

const LS_KEY_WINDOWS = "mulwin-windows";

const getWindows = (): Windows => {
  const lsWindows = localStorage[LS_KEY_WINDOWS];
  const windows = lsWindows ? JSON.parse(lsWindows) : {};
  return windows;
};

export const upsertWindow = (win: Omit<Window, "main">) => {
  const windows = getWindows();
  const main = Object.keys(windows).length === 0;
  windows[win.id] = {
    ...win,
    main,
  };
  localStorage[LS_KEY_WINDOWS] = JSON.stringify(windows);

  return main;
};

export const removeWindow = (windowId: string) => {
  const windows = getWindows();
  delete windows[windowId];
  localStorage[LS_KEY_WINDOWS] = JSON.stringify(windows);
};
