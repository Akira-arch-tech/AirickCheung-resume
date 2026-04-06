export type TabId = "chats" | "contacts" | "discover" | "me";

export interface ChatThread {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  pinned?: boolean;
}

export interface ChatMessage {
  id: string;
  from: "me" | "other";
  text: string;
  time: string;
}

export interface ContactGroup {
  letter: string;
  items: { id: string; name: string; avatar: string }[];
}
