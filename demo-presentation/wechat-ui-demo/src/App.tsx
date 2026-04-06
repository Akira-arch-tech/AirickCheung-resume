import { useCallback, useMemo, useState } from "react";
import "./App.css";
import { Toast } from "./components/Toast";
import { TabBar } from "./components/TabBar";
import {
  chatThreads as CHAT_SEED,
  getMessagesForThread,
  momentFeed,
} from "./data/mock";
import type { ChatThread, TabId } from "./types";
import { loadThreadOverrides, saveThreadOverrides, type ThreadOverrides } from "./utils/demoStorage";
import { ChatRoomView } from "./views/ChatRoomView";
import { ChatsView } from "./views/ChatsView";
import { ContactsView } from "./views/ContactsView";
import { DiscoverView } from "./views/DiscoverView";
import { MomentsView } from "./views/MomentsView";
import { PlaceholderDiscoverView } from "./views/PlaceholderDiscoverView";
import { ProfileEditView } from "./views/ProfileEditView";
import { ProfileView } from "./views/ProfileView";
import { SettingsStackView } from "./views/SettingsStackView";

const MY_AVATAR = "🦊";

function formatTime() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

function visibleThreads(
  patches: Record<string, Partial<ChatThread>>,
  o: ThreadOverrides
): ChatThread[] {
  return CHAT_SEED.filter((t) => !o.hiddenIds.includes(t.id)).map((t) => {
    const p = patches[t.id] ?? {};
    return {
      ...t,
      ...p,
      pinned: o.pinOverride[t.id] !== undefined ? o.pinOverride[t.id]! : t.pinned,
      muted: o.muted[t.id] === true ? true : t.muted,
    };
  });
}

export default function App() {
  const [tab, setTab] = useState<TabId>("chats");
  const [openChatId, setOpenChatId] = useState<string | null>(null);
  const [momentsOpen, setMomentsOpen] = useState(false);
  const [discoverStub, setDiscoverStub] = useState<{
    title: string;
    icon: string;
    description: string;
  } | null>(null);
  const [meOverlay, setMeOverlay] = useState<null | "profile" | "settings">(null);

  const [overrides, setOverrides] = useState<ThreadOverrides>(() => loadThreadOverrides());
  const [patches, setPatches] = useState<Record<string, Partial<ChatThread>>>({});

  const threads = useMemo(() => visibleThreads(patches, overrides), [patches, overrides]);

  const [toast, setToast] = useState<string | null>(null);
  const statusTime = useMemo(() => formatTime(), []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  const patchOverrides = useCallback((fn: (o: ThreadOverrides) => ThreadOverrides) => {
    setOverrides((prev) => {
      const n = fn(prev);
      saveThreadOverrides(n);
      return n;
    });
  }, []);

  const activeThread = useMemo(
    () => threads.find((t) => t.id === openChatId),
    [openChatId, threads]
  );

  const onClearUnread = useCallback((threadId: string) => {
    setPatches((p) => ({
      ...p,
      [threadId]: { ...p[threadId], unread: undefined },
    }));
  }, []);

  const onPreviewUpdate = useCallback((threadId: string, lastMessage: string) => {
    setPatches((p) => ({
      ...p,
      [threadId]: { ...p[threadId], lastMessage, time: "刚刚", unread: undefined },
    }));
  }, []);

  const onMarkUnread = useCallback((id: string) => {
    setPatches((p) => {
      const base = CHAT_SEED.find((t) => t.id === id)!;
      const merged = { ...base, ...p[id] };
      const nextUnread = (merged.unread ?? 0) + 1;
      return { ...p, [id]: { ...p[id], unread: nextUnread } };
    });
    showToast("已标为未读");
  }, [showToast]);

  const onDeleteThread = useCallback(
    (id: string) => {
      patchOverrides((o) => ({
        ...o,
        hiddenIds: o.hiddenIds.includes(id) ? o.hiddenIds : [...o.hiddenIds, id],
      }));
      showToast("已从列表移除（刷新前可通过清除站点数据恢复）");
    },
    [patchOverrides, showToast]
  );

  const handleTabChange = (id: TabId) => {
    setTab(id);
    setOpenChatId(null);
    setMomentsOpen(false);
    setDiscoverStub(null);
    setMeOverlay(null);
  };

  function openThreadFromContacts(threadId: string) {
    setTab("chats");
    setOpenChatId(threadId);
  }

  const showTabBar =
    !openChatId && !momentsOpen && !discoverStub && !meOverlay;

  const seedThread = openChatId ? CHAT_SEED.find((t) => t.id === openChatId) : undefined;

  return (
    <div className="wx-phone">
      <div className="wx-notch" aria-hidden />
      <div className="wx-status" role="status">
        <span>{statusTime}</span>
        <span className="wx-status-icons" aria-hidden>
          📶 🔋
        </span>
      </div>
      <main className="wx-main">
        {openChatId && activeThread && seedThread ? (
          <ChatRoomView
            key={openChatId}
            threadId={activeThread.id}
            title={activeThread.name}
            avatar={activeThread.avatar}
            myAvatar={MY_AVATAR}
            isGroup={activeThread.id === "t2"}
            threadPinned={
              overrides.pinOverride[activeThread.id] !== undefined
                ? overrides.pinOverride[activeThread.id]!
                : !!seedThread.pinned
            }
            threadMuted={overrides.muted[activeThread.id] === true}
            initialMessages={getMessagesForThread(activeThread.id)}
            onBack={() => setOpenChatId(null)}
            onClearUnread={onClearUnread}
            onPreviewUpdate={onPreviewUpdate}
            onTogglePin={() => {
              const id = activeThread.id;
              const cur =
                overrides.pinOverride[id] !== undefined
                  ? overrides.pinOverride[id]!
                  : !!seedThread.pinned;
              patchOverrides((o) => ({
                ...o,
                pinOverride: { ...o.pinOverride, [id]: !cur },
              }));
            }}
            onToggleMute={() => {
              const id = activeThread.id;
              const on = overrides.muted[id] === true;
              patchOverrides((o) => {
                const muted = { ...o.muted };
                if (on) delete muted[id];
                else muted[id] = true;
                return { ...o, muted };
              });
            }}
            showToast={showToast}
          />
        ) : tab === "discover" && momentsOpen ? (
          <MomentsView posts={momentFeed} onBack={() => setMomentsOpen(false)} showToast={showToast} />
        ) : discoverStub ? (
          <PlaceholderDiscoverView
            title={discoverStub.title}
            icon={discoverStub.icon}
            description={discoverStub.description}
            onBack={() => setDiscoverStub(null)}
          />
        ) : meOverlay === "profile" ? (
          <ProfileEditView onBack={() => setMeOverlay(null)} showToast={showToast} />
        ) : meOverlay === "settings" ? (
          <SettingsStackView onBack={() => setMeOverlay(null)} showToast={showToast} />
        ) : (
          <>
            {tab === "chats" && (
              <ChatsView
                threads={threads}
                onOpen={(id) => setOpenChatId(id)}
                showToast={showToast}
                onMarkUnread={onMarkUnread}
                onDeleteThread={onDeleteThread}
              />
            )}
            {tab === "contacts" && (
              <ContactsView onOpenThread={openThreadFromContacts} showToast={showToast} />
            )}
            {tab === "discover" && (
              <DiscoverView
                onOpenMoments={() => setMomentsOpen(true)}
                onOpenStub={(stub) => setDiscoverStub(stub)}
              />
            )}
            {tab === "me" && (
              <ProfileView
                showToast={showToast}
                onOpenProfile={() => setMeOverlay("profile")}
                onOpenSettings={() => setMeOverlay("settings")}
              />
            )}
          </>
        )}
      </main>
      {showTabBar ? <TabBar active={tab} onChange={handleTabChange} /> : null}
      <Toast message={toast} />
    </div>
  );
}
