import type { ChatThread } from "../types";

interface ChatsViewProps {
  threads: ChatThread[];
  onOpen: (id: string) => void;
}

export function ChatsView({ threads, onOpen }: ChatsViewProps) {
  const sorted = [...threads].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  return (
    <>
      <header className="wx-header">
        <span className="wx-header-title">微信</span>
        <button type="button" className="wx-header-action right" aria-label="更多">
          ⊕
        </button>
      </header>
      <div className="wx-list" role="list">
        {sorted.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`wx-row${t.pinned ? " wx-pinned" : ""}`}
            onClick={() => onOpen(t.id)}
            role="listitem"
          >
            <div className="wx-avatar" aria-hidden>
              {t.avatar}
            </div>
            <div className="wx-row-body">
              <div className="wx-row-top">
                <span className="wx-row-name">
                  {t.name}
                  {t.unread ? <span className="wx-badge">{t.unread > 99 ? "99+" : t.unread}</span> : null}
                </span>
                <span className="wx-row-time">{t.time}</span>
              </div>
              <div className="wx-row-preview">{t.lastMessage}</div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
