const KEY = "wx-demo-thread-overrides-v1";

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
