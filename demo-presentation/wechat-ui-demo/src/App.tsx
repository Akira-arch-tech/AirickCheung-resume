import { useMemo, useState } from "react";
import "./App.css";
import { TabBar } from "./components/TabBar";
import { chatThreads, getMessagesForThread } from "./data/mock";
import type { TabId } from "./types";
import { ChatRoomView } from "./views/ChatRoomView";
import { ChatsView } from "./views/ChatsView";
import { ContactsView } from "./views/ContactsView";
import { DiscoverView } from "./views/DiscoverView";
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

  const activeThread = useMemo(
    () => chatThreads.find((t) => t.id === openChatId),
    [openChatId]
  );

  const statusTime = useMemo(() => formatTime(), []);

  function handleTabChange(id: TabId) {
    setTab(id);
    setOpenChatId(null);
  }

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
            title={activeThread.name}
            avatar={activeThread.avatar}
            myAvatar={MY_AVATAR}
            initialMessages={getMessagesForThread(activeThread.id)}
            onBack={() => setOpenChatId(null)}
          />
        ) : (
          <>
            {tab === "chats" && (
              <ChatsView threads={chatThreads} onOpen={(id) => setOpenChatId(id)} />
            )}
            {tab === "contacts" && <ContactsView />}
            {tab === "discover" && <DiscoverView />}
            {tab === "me" && <ProfileView />}
          </>
        )}
      </main>
      {!openChatId ? <TabBar active={tab} onChange={handleTabChange} /> : null}
    </div>
  );
}
