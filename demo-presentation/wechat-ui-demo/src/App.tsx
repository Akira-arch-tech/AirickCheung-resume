import { useCallback, useMemo, useState } from "react";
import "./App.css";
import { Toast } from "./components/Toast";
import { TabBar } from "./components/TabBar";
import { chatThreads, getMessagesForThread, momentFeed } from "./data/mock";
import type { ChatThread, TabId } from "./types";
import { ChatRoomView } from "./views/ChatRoomView";
import { ChatsView } from "./views/ChatsView";
import { ContactsView } from "./views/ContactsView";
import { DiscoverView } from "./views/DiscoverView";
import { MomentsView } from "./views/MomentsView";
import { ProfileView } from "./views/ProfileView";

const MY_AVATAR = "🦊";

function formatTime() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

export default function App() {
  const [tab, setTab] = useState<TabId>("chats");
  const [openChatId, setOpenChatId] = useState<string | null>(null);
  const [momentsOpen, setMomentsOpen] = useState(false);
  const [threads, setThreads] = useState<ChatThread[]>(() => chatThreads.map((t) => ({ ...t })));
  const [toast, setToast] = useState<string | null>(null);

  const statusTime = useMemo(() => formatTime(), []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  const activeThread = useMemo(
    () => threads.find((t) => t.id === openChatId),
    [openChatId, threads]
  );

  const onClearUnread = useCallback((threadId: string) => {
    setThreads((ts) => ts.map((t) => (t.id === threadId ? { ...t, unread: undefined } : t)));
  }, []);

  const onPreviewUpdate = useCallback((threadId: string, lastMessage: string) => {
    setThreads((ts) =>
      ts.map((t) =>
        t.id === threadId ? { ...t, lastMessage, time: "刚刚", unread: undefined } : t
      )
    );
  }, []);

  function handleTabChange(id: TabId) {
    setTab(id);
    setOpenChatId(null);
    setMomentsOpen(false);
  }

  function openThreadFromContacts(threadId: string) {
    setTab("chats");
    setOpenChatId(threadId);
  }

  const showTabBar = !openChatId && !momentsOpen;

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
        {openChatId && activeThread ? (
          <ChatRoomView
            key={openChatId}
            threadId={activeThread.id}
            title={activeThread.name}
            avatar={activeThread.avatar}
            myAvatar={MY_AVATAR}
            initialMessages={getMessagesForThread(activeThread.id)}
            onBack={() => setOpenChatId(null)}
            onClearUnread={onClearUnread}
            onPreviewUpdate={onPreviewUpdate}
            showToast={showToast}
          />
        ) : tab === "discover" && momentsOpen ? (
          <MomentsView posts={momentFeed} onBack={() => setMomentsOpen(false)} />
        ) : (
          <>
            {tab === "chats" && (
              <ChatsView threads={threads} onOpen={(id) => setOpenChatId(id)} showToast={showToast} />
            )}
            {tab === "contacts" && (
              <ContactsView onOpenThread={openThreadFromContacts} showToast={showToast} />
            )}
            {tab === "discover" && (
              <DiscoverView onOpenMoments={() => setMomentsOpen(true)} showToast={showToast} />
            )}
            {tab === "me" && <ProfileView showToast={showToast} />}
          </>
        )}
      </main>
      {showTabBar ? <TabBar active={tab} onChange={handleTabChange} /> : null}
      <Toast message={toast} />
    </div>
  );
}
