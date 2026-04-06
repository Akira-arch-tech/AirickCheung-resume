import { useRef, useState } from "react";
import type { ChatThread } from "../types";

const OPEN_PX = 132;

interface SwipeChatRowProps {
  thread: ChatThread;
  isOpen: boolean;
  onOpenSwipe: (id: string | null) => void;
  onOpenChat: (id: string) => void;
  onMarkUnread: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SwipeChatRow({
  thread: t,
  isOpen,
  onOpenSwipe,
  onOpenChat,
  onMarkUnread,
  onDelete,
}: SwipeChatRowProps) {
  const [dragX, setDragX] = useState(0);
  const startX = useRef(0);
  const active = useRef(false);
  const moved = useRef(false);

  const translate = isOpen ? -OPEN_PX : Math.min(0, Math.max(-OPEN_PX, dragX));

  function endDrag() {
    active.current = false;
    if (isOpen) {
      setDragX(0);
      return;
    }
    if (dragX < -52) onOpenSwipe(t.id);
    setDragX(0);
  }

  return (
    <div className="wx-swipe-host">
      <div className="wx-swipe-actions" aria-hidden={!isOpen}>
        <button
          type="button"
          className="wx-swipe-btn wx-swipe-unread"
          onClick={() => {
            onMarkUnread(t.id);
            onOpenSwipe(null);
          }}
        >
          标为未读
        </button>
        <button
          type="button"
          className="wx-swipe-btn wx-swipe-del"
          onClick={() => {
            onDelete(t.id);
            onOpenSwipe(null);
          }}
        >
          删除
        </button>
      </div>
      <div
        className="wx-swipe-front"
        style={{ transform: `translateX(${translate}px)` }}
        onPointerDown={(e) => {
          if (e.button !== 0 || isOpen) return;
          active.current = true;
          moved.current = false;
          startX.current = e.clientX;
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!active.current || isOpen) return;
          const dx = e.clientX - startX.current;
          if (Math.abs(dx) > 6) moved.current = true;
          setDragX(Math.min(0, Math.max(-OPEN_PX, dx)));
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClick={() => {
          if (moved.current) return;
          if (isOpen) onOpenSwipe(null);
          else onOpenChat(t.id);
        }}
        role="presentation"
      >
        <div
          className={`wx-row wx-swipe-row-inner${t.pinned ? " wx-pinned" : ""}`}
          role="listitem"
        >
          <div className="wx-avatar" aria-hidden>
            {t.avatar}
          </div>
          <div className="wx-row-body">
            <div className="wx-row-top">
              <span className="wx-row-name">
                {t.name}
                {t.muted ? (
                  <span className="wx-muted-icon" title="免打扰">
                    🌙
                  </span>
                ) : null}
                {t.unread ? (
                  <span className="wx-badge">{t.unread > 99 ? "99+" : t.unread}</span>
                ) : null}
              </span>
              <span className="wx-row-time">{t.time}</span>
            </div>
            <div className="wx-row-preview">{t.lastMessage}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
