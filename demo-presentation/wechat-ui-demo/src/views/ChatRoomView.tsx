import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { getMessagesForThread } from "../data/mock";
import { ActionSheet } from "../components/ActionSheet";
import type { ChatMessage } from "../types";

const QUICK_EMOJIS = ["😀", "👍", "❤️", "😂", "🎉", "👋", "🙏", "💼"];
const PANEL_EMOJIS = ["✨", "🔥", "💯", "🥳", "😮", "🤝", "📎", "✅", "☕", "🌙", "🎯", "📌"];

interface ChatRoomViewProps {
  threadId: string;
  title: string;
  avatar: string;
  myAvatar: string;
  isGroup: boolean;
  threadPinned: boolean;
  threadMuted: boolean;
  initialMessages: ChatMessage[];
  onBack: () => void;
  onClearUnread: (threadId: string) => void;
  onPreviewUpdate: (threadId: string, lastMessage: string) => void;
  onTogglePin: () => void;
  onToggleMute: () => void;
  showToast: (message: string) => void;
}

function nowTime() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

export function previewForMessage(m: ChatMessage): string {
  switch (m.kind) {
    case "system":
      return m.systemText ?? "[群提示]";
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

function SystemLine({ text }: { text: string }) {
  return (
    <div className="wx-msg-system" role="note">
      <span>{text}</span>
    </div>
  );
}

interface BubbleProps {
  m: ChatMessage;
  myAvatar: string;
  peerAvatar: string;
  isGroup: boolean;
  playingVoiceId: string | null;
  onToggleVoice: (id: string) => void;
  onImageTap: (emoji: string, cap?: string) => void;
  onLongPress: (m: ChatMessage) => void;
}

function usePressMenu(onMenu: () => void, onShort?: () => void) {
  const downAt = useRef(0);
  const longT = useRef<number | null>(null);
  const moved = useRef(false);
  const sx = useRef(0);
  const sy = useRef(0);

  return {
    onPointerDown(e: PointerEvent<HTMLElement>) {
      moved.current = false;
      sx.current = e.clientX;
      sy.current = e.clientY;
      downAt.current = Date.now();
      if (longT.current) window.clearTimeout(longT.current);
      longT.current = window.setTimeout(() => {
        longT.current = null;
        onMenu();
      }, 520);
    },
    onPointerMove(e: PointerEvent<HTMLElement>) {
      if (Math.abs(e.clientX - sx.current) > 14 || Math.abs(e.clientY - sy.current) > 14) {
        moved.current = true;
        if (longT.current) {
          window.clearTimeout(longT.current);
          longT.current = null;
        }
      }
    },
    onPointerUp() {
      if (longT.current) {
        window.clearTimeout(longT.current);
        longT.current = null;
      }
      const short = Date.now() - downAt.current < 520 && !moved.current;
      if (short && onShort) onShort();
    },
    onPointerCancel() {
      if (longT.current) window.clearTimeout(longT.current);
      longT.current = null;
    },
  };
}

function MessageBubble({
  m,
  myAvatar,
  peerAvatar,
  isGroup,
  playingVoiceId,
  onToggleVoice,
  onImageTap,
  onLongPress,
}: BubbleProps) {
  const av = m.from === "me" ? myAvatar : peerAvatar;

  const plainPress = usePressMenu(
    () => onLongPress(m),
    undefined
  );
  const imagePress = usePressMenu(
    () => onLongPress(m),
    () => onImageTap(m.imageEmoji ?? "🖼", m.imageCaption)
  );
  const voicePress = usePressMenu(
    () => onLongPress(m),
    () => onToggleVoice(m.id)
  );

  let inner: ReactNode;
  switch (m.kind) {
    case "image":
      inner = (
        <button
          type="button"
          className="wx-bubble wx-bubble-image wx-bubble-tap"
          {...imagePress}
        >
          <div className="wx-bubble-image-placeholder">{m.imageEmoji ?? "🖼"}</div>
          {m.imageCaption ? <div className="wx-bubble-image-cap">{m.imageCaption}</div> : null}
        </button>
      );
      break;
    case "voice":
      inner = (
        <button
          type="button"
          className={`wx-bubble wx-bubble-voice${playingVoiceId === m.id ? " playing" : ""}`}
          {...voicePress}
        >
          <span className="wx-voice-icon" aria-hidden>
            {playingVoiceId === m.id ? "❚❚" : "▶"}
          </span>
          <span className="wx-voice-waves" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className="wx-voice-sec">{m.voiceSeconds ?? 0}&quot;</span>
        </button>
      );
      break;
    case "link":
      inner = (
        <div className="wx-bubble wx-bubble-link" {...plainPress}>
          <div className="wx-link-title">{m.linkTitle}</div>
          <div className="wx-link-url">{m.linkUrl}</div>
        </div>
      );
      break;
    case "location":
      inner = (
        <div className="wx-bubble wx-bubble-location" {...plainPress}>
          <div className="wx-loc-map" aria-hidden />
          <div className="wx-loc-row">
            <span>📍</span>
            <span>{m.placeName}</span>
          </div>
        </div>
      );
      break;
    default:
      inner = (
        <div className="wx-bubble" {...plainPress}>
          {m.text}
        </div>
      );
  }

  return (
    <div className={`wx-msg ${m.from}`}>
      <div className="wx-msg-avatar" aria-hidden>
        {av}
      </div>
      <div className="wx-msg-stack">
        {isGroup && m.from === "other" && m.senderName ? (
          <div className="wx-msg-nick">{m.senderName}</div>
        ) : null}
        {inner}
      </div>
    </div>
  );
}

type EmojiTab = "recent" | "emoji" | "heart";

export function ChatRoomView({
  threadId,
  title,
  avatar,
  myAvatar,
  isGroup,
  threadPinned,
  threadMuted,
  initialMessages,
  onBack,
  onClearUnread,
  onPreviewUpdate,
  onTogglePin,
  onToggleMute,
  showToast,
}: ChatRoomViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [showAttach, setShowAttach] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [emojiTab, setEmojiTab] = useState<EmojiTab>("recent");
  const [typing, setTyping] = useState(false);
  const [lightbox, setLightbox] = useState<{ emoji: string; cap?: string } | null>(null);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [msgMenu, setMsgMenu] = useState<ChatMessage | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);
  const voiceStopRef = useRef<number | null>(null);

  useEffect(() => {
    onClearUnread(threadId);
  }, [threadId, onClearUnread]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, showEmojiPanel]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      if (voiceStopRef.current) window.clearTimeout(voiceStopRef.current);
    };
  }, []);

  useEffect(() => {
    if (!playingVoiceId) return;
    if (voiceStopRef.current) window.clearTimeout(voiceStopRef.current);
    voiceStopRef.current = window.setTimeout(() => setPlayingVoiceId(null), 2800);
    return () => {
      if (voiceStopRef.current) window.clearTimeout(voiceStopRef.current);
    };
  }, [playingVoiceId]);

  function pushMessage(m: ChatMessage) {
    setMessages((prev) => [...prev, m]);
    onPreviewUpdate(threadId, previewForMessage(m));
  }

  function scheduleAutoReply() {
    const replies: Record<string, { text: string; name?: string }> = {
      t2: { text: "收到，我们继续对齐交互细节～", name: "小李" },
      t3: { text: "好的，路上注意安全！" },
    };
    const r = replies[threadId];
    if (!r) return;

    const t1 = window.setTimeout(() => setTyping(true), 500);
    timersRef.current.push(t1);
    const t2 = window.setTimeout(() => {
      setTyping(false);
      pushMessage({
        id: `auto-${Date.now()}`,
        from: "other",
        time: nowTime(),
        kind: "text",
        text: r.text,
        senderName: isGroup ? r.name : undefined,
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
    setShowEmojiPanel(false);
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

  function toggleVoice(id: string) {
    setPlayingVoiceId((p) => (p === id ? null : id));
  }

  function insertEmoji(e: string) {
    setDraft((d) => d + e);
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
        {messages.map((m) =>
          m.kind === "system" ? (
            <SystemLine key={m.id} text={m.systemText ?? ""} />
          ) : (
            <MessageBubble
              key={m.id}
              m={m}
              myAvatar={myAvatar}
              peerAvatar={avatar}
              isGroup={isGroup}
              playingVoiceId={playingVoiceId}
              onToggleVoice={toggleVoice}
              onImageTap={(emoji, cap) => setLightbox({ emoji, cap })}
              onLongPress={(msg) => setMsgMenu(msg)}
            />
          )
        )}
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
            onClick={() => insertEmoji(e)}
            aria-label={`插入 ${e}`}
          >
            {e}
          </button>
        ))}
        <button
          type="button"
          className="wx-emoji-more"
          aria-expanded={showEmojiPanel}
          onClick={() => {
            setShowEmojiPanel((s) => !s);
            setShowAttach(false);
          }}
          aria-label="展开表情面板"
        >
          …
        </button>
      </div>
      <div className="wx-input-bar">
        <button
          type="button"
          className="wx-input-side"
          aria-expanded={showAttach}
          aria-label="更多发送方式"
          onClick={() => {
            setShowAttach((s) => !s);
            setShowEmojiPanel(false);
          }}
        >
          {showAttach ? "⌄" : "＋"}
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendText(draft)}
          onFocus={() => {
            setShowAttach(false);
            setShowEmojiPanel(false);
          }}
          placeholder="发送消息…"
          enterKeyHint="send"
          aria-label="消息输入"
        />
        <button type="button" className="wx-send" onClick={() => sendText(draft)}>
          发送
        </button>
      </div>
      {showEmojiPanel ? (
        <div className="wx-emoji-panel">
          <div className="wx-emoji-tabs">
            {(
              [
                ["recent", "最近"],
                ["emoji", "Emoji"],
                ["heart", "心形"],
              ] as const
            ).map(([id, lab]) => (
              <button
                key={id}
                type="button"
                className={`wx-emoji-tab${emojiTab === id ? " active" : ""}`}
                onClick={() => setEmojiTab(id)}
              >
                {lab}
              </button>
            ))}
          </div>
          <div className="wx-emoji-grid">
            {(emojiTab === "recent" ? QUICK_EMOJIS : emojiTab === "heart" ? ["❤️", "🧡", "💛", "💚", "💙", "💜", "🤍", "💖"] : PANEL_EMOJIS).map(
              (e) => (
                <button key={e} type="button" className="wx-emoji-cell" onClick={() => insertEmoji(e)}>
                  {e}
                </button>
              )
            )}
          </div>
        </div>
      ) : null}
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

      {lightbox ? (
        <button
          type="button"
          className="wx-lightbox"
          onClick={() => setLightbox(null)}
          aria-label="关闭预览"
        >
          <div className="wx-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <div className="wx-lightbox-img">{lightbox.emoji}</div>
            {lightbox.cap ? <p className="wx-lightbox-cap">{lightbox.cap}</p> : null}
            <p className="wx-lightbox-tip">点击遮罩关闭（PRD 4.5 图片预览壳）</p>
          </div>
        </button>
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
            label: threadPinned ? "取消置顶聊天" : "置顶聊天",
            onSelect: () => {
              onTogglePin();
              showToast(threadPinned ? "已取消置顶（已记住）" : "已置顶（已记住）");
            },
          },
          {
            label: threadMuted ? "关闭消息免打扰" : "消息免打扰",
            onSelect: () => {
              onToggleMute();
              showToast(threadMuted ? "已关闭免打扰（已记住）" : "已开启免打扰（已记住）");
            },
          },
        ]}
      />

      <ActionSheet
        open={!!msgMenu}
        onClose={() => setMsgMenu(null)}
        title="消息操作（演示）"
        items={
          msgMenu
            ? [
                {
                  label: "复制",
                  onSelect: () => {
                    const t =
                      msgMenu.kind === "text"
                        ? msgMenu.text ?? ""
                        : previewForMessage(msgMenu);
                    void (async () => {
                      try {
                        await navigator.clipboard.writeText(t);
                        showToast("已复制到剪贴板");
                      } catch {
                        showToast(`复制失败，内容：${t.slice(0, 24)}…`);
                      }
                    })();
                  },
                },
                {
                  label: "引用",
                  onSelect: () => showToast("演示：引用回复样式可在 P2 扩展"),
                },
                {
                  label: "撤回",
                  onSelect: () => showToast("演示：2 分钟内可撤回"),
                },
                {
                  label: "多选",
                  onSelect: () => showToast("演示：进入多选模式"),
                },
              ]
            : []
        }
      />
    </div>
  );
}
