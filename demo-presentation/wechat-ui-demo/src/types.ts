export type TabId = "chats" | "contacts" | "discover" | "me";

export type MessageKind = "text" | "image" | "voice" | "link" | "location";

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
  time: string;
  kind: MessageKind;
  text?: string;
  /** 图片类消息：用 Emoji 占位演示 */
  imageEmoji?: string;
  imageCaption?: string;
  voiceSeconds?: number;
  linkTitle?: string;
  linkUrl?: string;
  placeName?: string;
}

export interface ContactGroup {
  letter: string;
  items: { id: string; name: string; avatar: string }[];
}

export interface MomentPost {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
  images: string[];
}
