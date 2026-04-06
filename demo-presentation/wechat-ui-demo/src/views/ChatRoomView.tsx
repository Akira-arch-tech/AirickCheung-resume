import { useEffect, useRef, useState, type ReactNode } from "react";
import { getMessagesForThread } from "../data/mock";
import { ActionSheet } from "../components/ActionSheet";
import type { ChatMessage } from "../types";

const QUICK_EMOJIS = ["😀", "👍", "❤️", "😂", "🎉", "👋", "🙏", "💼"];

interface ChatRoomViewProps {
  threadId: string;
  title: string;
  avatar: string;
  myAvatar: string;
  initialMessages: ChatMessage[];
  onBack: () => void;
  onClearUnread: (threadId: string) => void;
  onPreviewUpdate: (threadId: string, lastMessage: string) => void;
  showToast: (message: string) => void;
}

function nowTime() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

function previewForMessage(m: ChatMessage): string {
  switch (m.kind) {
    case "image":
      return "[图片]";
    case "voice":
      return "[语音]";
    case "link":
      return `[链接] ${m.linkTitle ?? ""}`;
    case "location":
      return `[位置] ${m.placeName ?? ""}`;
    default:
      return m.text ?? "";
  }
}

function MessageBubble({ m, myAvatar, peerAvatar }: { m: ChatMessage; myAvatar: string; peerAvatar: string }) {
  const av = m.from === "me" ? myAvatar : peerAvatar;

  let inner: ReactNode;
  switch (m.kind) {
    case "image":
      inner = (
        <div className="wx-bubble wx-bubble-image">
          <div className="wx-bubble-image-placeholder">{m.imageEmoji ?? "🖼"}</div>
          {m.imageCaption ? <div className="wx-bubble-image-cap">{m.imageCaption}</div> : null}
        </div>
      );
      break;
    case "voice":
      inner = (
        <div className="wx-bubble wx-bubble-voice">
          <span className="wx-voice-icon" aria-hidden>
            ▶
          </span>
          <span className="wx-voice-waves" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className="wx-voice-sec">{m.voiceSeconds ?? 0}&quot;</span>
        </div>
      );
      break;
    case "link":
      inner = (
        <div className="wx-bubble wx-bubble-link">
          <div className="wx-link-title">{m.linkTitle}</div>
          <div className="wx-link-url">{m.linkUrl}</div>
        </div>
      );
      break;
    case "location":
      inner = (
        <div className="wx-bubble wx-bubble-location">
          <div className="wx-loc-map" aria-hidden />
          <div className="wx-loc-row">
            <span>📍</span>
            <span>{m.placeName}</span>
          </div>
        </div>
      );
      break;
    default:
      inner = <div className="wx-bubble">{m.text}</div>;
  }

  return (
    <div className={`wx-msg ${m.from}`}>
      <div className="wx-msg-avatar" aria-hidden>
        {av}
      </div>
      {inner}
    </div>
  );
}

export function ChatRoomView({
  threadId,
  title,
  avatar,
  myAvatar,
  initialMessages,
  onBack,
  onClearUnread,
  onPreviewUpdate,
  showToast,
}: ChatRoomViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [showAttach, setShowAttach] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    onClearUnread(threadId);
  }, [threadId, onClearUnread]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    return () => timersRef.current.forEach((id) => window.clearTimeout(id));
  }, []);

  function pushMessage(m: ChatMessage) {
    setMessages((prev) => [...prev, m]);
    onPreviewUpdate(threadId, previewForMessage(m));
  }

  function scheduleAutoReply() {
    const replies: Record<string, string> = {
      t2: "收到，我们继续对齐交互细节～",
      t3: "好的，路上注意安全！",
    };
    const text = replies[threadId];
    if (!text) return;

    const t1 = window.setTimeout(() => setTyping(true), 500);
    timersRef.current.push(t1);
    const t2 = window.setTimeout(() => {
      setTyping(false);
      pushMessage({
        id: `auto-${Date.now()}`,
        from: "other",
        time: nowTime(),
        kind: "text",
        text,
      });
    }, 1800);
    timersRef.current.push(t2);
  }

  function sendText(textRaw: string) {
    const text = textRaw.trim();
    if (!text) return;
    pushMessage({
      id: `local-${Date.now()}`,
      from: "me",
      time: nowTime(),
      kind: "text",
      text,
    });
    setDraft("");
    setShowAttach(false);
    scheduleAutoReply();
  }

  function addDemo(kind: ChatMessage["kind"], partial: Partial<ChatMessage>) {
    const base: ChatMessage = {
      id: `demo-${Date.now()}`,
      from: "me",
      time: nowTime(),
      kind,
      ...partial,
    };
    pushMessage(base);
    setShowAttach(false);
  }

  return (
    <div className="wx-chat-room">
      <header className="wx-header">
        <button type="button" className="wx-header-action left" onClick={onBack} aria-label="返回">
          ‹
        </button>
        <span className="wx-header-title">{title}</span>
        <button
          type="button"
          className="wx-header-action right"
          onClick={() => setShowMore(true)}
          aria-label="更多"
        >
          ⋯
        </button>
      </header>
      <div className="wx-messages" ref={listRef}>
        {messages.map((m) => (
          <MessageBubble key={m.id} m={m} myAvatar={myAvatar} peerAvatar={avatar} />
        ))}
        {typing ? (
          <div className="wx-msg other wx-typing-row">
            <div className="wx-msg-avatar" aria-hidden>
              {avatar}
            </div>
            <div className="wx-typing-bubble" aria-label="对方正在输入">
              <span />
              <span />
              <span />
            </div>
          </div>
        ) : null}
      </div>
      <div className="wx-emoji-bar">
        {QUICK_EMOJIS.map((e) => (
          <button
            key={e}
            type="button"
            className="wx-emoji-chip"
            onClick={() => setDraft((d) => d + e)}
            aria-label={`插入 ${e}`}
          >
            {e}
          </button>
        ))}
      </div>
      <div className="wx-input-bar">
        <button
          type="button"
          className="wx-input-side"
          aria-expanded={showAttach}
          aria-label="更多发送方式"
          onClick={() => setShowAttach((s) => !s)}
        >
          {showAttach ? "⌄" : "＋"}
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendText(draft)}
          onFocus={() => setShowAttach(false)}
          placeholder="发送消息…"
          enterKeyHint="send"
          aria-label="消息输入"
        />
        <button type="button" className="wx-send" onClick={() => sendText(draft)}>
          发送
        </button>
      </div>
      {showAttach ? (
        <div className="wx-attach-panel">
          <button
            type="button"
            className="wx-attach-cell"
            onClick={() =>
              addDemo("image", { imageEmoji: "🏞", imageCaption: "相册图片（演示）" })
            }
          >
            <span className="wx-attach-ic">🖼</span>
            <span>相册</span>
          </button>
          <button
            type="button"
            className="wx-attach-cell"
            onClick={() => addDemo("voice", { voiceSeconds: 8 })}
          >
            <span className="wx-attach-ic">🎤</span>
            <span>语音</span>
          </button>
          <button
            type="button"
            className="wx-attach-cell"
            onClick={() =>
              addDemo("location", { placeName: "杭州 · 西溪湿地（演示）" })
            }
          >
            <span className="wx-attach-ic">📍</span>
            <span>位置</span>
          </button>
          <button
            type="button"
            className="wx-attach-cell"
            onClick={() =>
              addDemo("link", {
                linkTitle: "作品集 GitHub",
                linkUrl: "github.com/Akira-arch-tech",
              })
            }
          >
            <span className="wx-attach-ic">🔗</span>
            <span>链接卡片</span>
          </button>
        </div>
      ) : null}

      <ActionSheet
        open={showMore}
        onClose={() => setShowMore(false)}
        title="聊天信息（演示）"
        items={[
          {
            label: "清空本会话演示消息",
            danger: true,
            onSelect: () => {
              setMessages(getMessagesForThread(threadId));
            },
          },
          {
            label: "置顶聊天（演示）",
            onSelect: () => showToast("已置顶（仅界面演示）"),
          },
          {
            label: "消息免打扰（演示）",
            onSelect: () => showToast("已开启免打扰（仅界面演示）"),
          },
        ]}
      />
    </div>
  );
}
