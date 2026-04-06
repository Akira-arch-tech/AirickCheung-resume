const KEY = "wx-demo-thread-overrides-v1";
const AUTH_KEY = "wx-demo-auth";
const UI_KEY = "wx-demo-ui-prefs-v1";

export interface ThreadOverrides {
  hiddenIds: string[];
  muted: Record<string, boolean>;
  pinOverride: Record<string, boolean>;
}

const defaultOverrides: ThreadOverrides = {
  hiddenIds: [],
  muted: {},
  pinOverride: {},
};

export function loadThreadOverrides(): ThreadOverrides {
  if (typeof window === "undefined") return { ...defaultOverrides };
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return { ...defaultOverrides };
    const j = JSON.parse(raw) as Partial<ThreadOverrides>;
    return {
      hiddenIds: Array.isArray(j.hiddenIds) ? j.hiddenIds : [],
      muted: typeof j.muted === "object" && j.muted ? j.muted : {},
      pinOverride:
        typeof j.pinOverride === "object" && j.pinOverride ? j.pinOverride : {},
    };
  } catch {
    return { ...defaultOverrides };
  }
}

export function saveThreadOverrides(o: ThreadOverrides) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(o));
  } catch {
    /* ignore */
  }
}

/** P2 假登录：存 "1" 表示已进入主框架 */
export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "1";
}

export function setLoggedInFlag(on: boolean) {
  try {
    if (on) sessionStorage.setItem(AUTH_KEY, "1");
    else sessionStorage.removeItem(AUTH_KEY);
  } catch {
    /* ignore */
  }
}

export interface UiPrefs {
  darkMode: boolean;
  landscape: boolean;
}

const defaultUi: UiPrefs = { darkMode: false, landscape: false };

export function loadUiPrefs(): UiPrefs {
  if (typeof window === "undefined") return { ...defaultUi };
  try {
    const raw = sessionStorage.getItem(UI_KEY);
    if (!raw) return { ...defaultUi };
    const j = JSON.parse(raw) as Partial<UiPrefs>;
    return {
      darkMode: j.darkMode === true,
      landscape: j.landscape === true,
    };
  } catch {
    return { ...defaultUi };
  }
}

export function saveUiPrefs(p: UiPrefs) {
  try {
    sessionStorage.setItem(UI_KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}
