import { useState } from "react";
import type { ChatMessage } from "../types";

interface ChatRoomViewProps {
  title: string;
  avatar: string;
  myAvatar: string;
  initialMessages: ChatMessage[];
  onBack: () => void;
}

export function ChatRoomView({
  title,
  avatar,
  myAvatar,
  initialMessages,
  onBack,
}: ChatRoomViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");

  function send() {
    const text = draft.trim();
    if (!text) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    setMessages((prev) => [
      ...prev,
      { id: `local-${Date.now()}`, from: "me", text, time },
    ]);
    setDraft("");
  }

  return (
    <div className="wx-chat-room">
      <header className="wx-header">
        <button type="button" className="wx-header-action left" onClick={onBack} aria-label="返回">
          ‹
        </button>
        <span className="wx-header-title">{title}</span>
        <button type="button" className="wx-header-action right" aria-label="更多">
          ⋯
        </button>
      </header>
      <div className="wx-messages">
        {messages.map((m) => (
          <div key={m.id} className={`wx-msg ${m.from}`}>
            <div className="wx-msg-avatar" aria-hidden>
              {m.from === "me" ? myAvatar : avatar}
            </div>
            <div className="wx-bubble">{m.text}</div>
          </div>
        ))}
      </div>
      <div className="wx-input-bar">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="发送消息…"
          enterKeyHint="send"
          aria-label="消息输入"
        />
        <button type="button" className="wx-send" onClick={send}>
          发送
        </button>
      </div>
    </div>
  );
}
