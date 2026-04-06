import { useMemo, useState } from "react";
import { ActionSheet } from "../components/ActionSheet";
import { SwipeChatRow } from "../components/SwipeChatRow";
import type { ChatThread } from "../types";

interface ChatsViewProps {
  threads: ChatThread[];
  onOpen: (id: string) => void;
  showToast: (message: string) => void;
  onMarkUnread: (id: string) => void;
  onDeleteThread: (id: string) => void;
}

export function ChatsView({
  threads,
  onOpen,
  showToast,
  onMarkUnread,
  onDeleteThread,
}: ChatsViewProps) {
  const [query, setQuery] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [openSwipeId, setOpenSwipeId] = useState<string | null>(null);

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
        <p className="wx-swipe-hint">向左滑动会话可「标为未读 / 删除」（PRD 4.2）</p>
      </div>
      <div className="wx-list wx-list-swipe" role="list">
        {sorted.length === 0 ? (
          <div className="wx-empty-hint">无匹配会话，试试其他关键词</div>
        ) : (
          sorted.map((t) => (
            <SwipeChatRow
              key={t.id}
              thread={t}
              isOpen={openSwipeId === t.id}
              onOpenSwipe={setOpenSwipeId}
              onOpenChat={(id) => {
                setOpenSwipeId(null);
                onOpen(id);
              }}
              onMarkUnread={onMarkUnread}
              onDelete={onDeleteThread}
            />
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
