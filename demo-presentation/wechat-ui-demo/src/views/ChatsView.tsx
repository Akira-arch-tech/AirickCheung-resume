import { useMemo, useState } from "react";
import { ActionSheet } from "../components/ActionSheet";
import type { ChatThread } from "../types";

interface ChatsViewProps {
  threads: ChatThread[];
  onOpen: (id: string) => void;
  showToast: (message: string) => void;
}

export function ChatsView({ threads, onOpen, showToast }: ChatsViewProps) {
  const [query, setQuery] = useState("");
  const [addOpen, setAddOpen] = useState(false);

  const sorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = [...threads].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });
    if (!q) return list;
    return list.filter((t) => t.name.toLowerCase().includes(q));
  }, [threads, query]);

  return (
    <>
      <header className="wx-header">
        <span className="wx-header-title">微信</span>
        <button
          type="button"
          className="wx-header-action right"
          aria-label="添加"
          onClick={() => setAddOpen(true)}
        >
          ⊕
        </button>
      </header>
      <div className="wx-chats-toolbar">
        <label className="wx-search-wrap">
          <span className="wx-search-icon" aria-hidden>
            🔍
          </span>
          <input
            className="wx-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索"
            aria-label="搜索会话"
          />
          {query ? (
            <button type="button" className="wx-search-clear" onClick={() => setQuery("")} aria-label="清除">
              ×
            </button>
          ) : null}
        </label>
      </div>
      <div className="wx-list" role="list">
        {sorted.length === 0 ? (
          <div className="wx-empty-hint">无匹配会话，试试其他关键词</div>
        ) : (
          sorted.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`wx-row${t.pinned ? " wx-pinned" : ""}`}
              onClick={() => onOpen(t.id)}
              role="listitem"
              aria-label={`打开与 ${t.name} 的会话`}
            >
              <div className="wx-avatar" aria-hidden>
                {t.avatar}
              </div>
              <div className="wx-row-body">
                <div className="wx-row-top">
                  <span className="wx-row-name">
                    {t.name}
                    {t.unread ? (
                      <span className="wx-badge">{t.unread > 99 ? "99+" : t.unread}</span>
                    ) : null}
                  </span>
                  <span className="wx-row-time">{t.time}</span>
                </div>
                <div className="wx-row-preview">{t.lastMessage}</div>
              </div>
            </button>
          ))
        )}
      </div>
      <ActionSheet
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="添加（演示）"
        items={[
          {
            label: "发起群聊",
            onSelect: () => showToast("演示：可跳转群聊创建向导"),
          },
          {
            label: "添加朋友",
            onSelect: () => showToast("演示：可打开搜索微信号 / 手机号"),
          },
          {
            label: "扫一扫",
            onSelect: () => showToast("演示：可调用相机扫码"),
          },
        ]}
      />
    </>
  );
}
