import { Window, Windows } from "@/types";

const LS_KEY_WINDOWS = "mulwin-windows";

export const upsertWindow = (win: Omit<Window, "main">) => {
  const lsWindows = localStorage[LS_KEY_WINDOWS];
  const windows = lsWindows ? JSON.parse(lsWindows) : {};
  const main = Object.keys(windows).length === 0;
  windows[win.id] = {
    ...win,
    main,
  };
  localStorage[LS_KEY_WINDOWS] = JSON.stringify(windows);

  return main;
};
