export type TabId = "chats" | "contacts" | "discover" | "me";

export type MessageKind =
  | "text"
  | "image"
  | "voice"
  | "link"
  | "location"
  | "system";

export interface ChatThread {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  pinned?: boolean;
  /** 消息免打扰（小月亮，演示） */
  muted?: boolean;
}

export interface ChatMessage {
  id: string;
  from: "me" | "other";
  time: string;
  kind: MessageKind;
  text?: string;
  /** 群聊内对方昵称（PRD 4.4） */
  senderName?: string;
  /** 系统提示文案（居中灰条） */
  systemText?: string;
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

export interface MomentComment {
  author: string;
  text: string;
}

export interface MomentPost {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
  images: string[];
  comments?: MomentComment[];
}
