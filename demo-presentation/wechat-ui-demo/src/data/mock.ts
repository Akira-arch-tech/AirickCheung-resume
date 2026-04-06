import type { ChatMessage, ChatThread, ContactGroup, MomentPost } from "../types";

function textMsg(
  id: string,
  from: "me" | "other",
  time: string,
  text: string
): ChatMessage {
  return { id, from, time, kind: "text", text };
}

export const chatThreads: ChatThread[] = [
  {
    id: "t1",
    name: "文件传输助手",
    avatar: "📁",
    lastMessage: "欢迎使用微信",
    time: "刚刚",
    pinned: true,
  },
  {
    id: "t2",
    name: "产品讨论组",
    avatar: "👥",
    lastMessage: "小王：原型我发群里了",
    time: "10:24",
    unread: 3,
  },
  {
    id: "t3",
    name: "妈妈",
    avatar: "👩",
    lastMessage: "晚上回来吃饭吗？",
    time: "昨天",
  },
  {
    id: "t4",
    name: "GitHub",
    avatar: "🐙",
    lastMessage: "[系统消息] 你有新的 Star",
    time: "周一",
  },
];

const seedMessages: Record<string, ChatMessage[]> = {
  t1: [
    textMsg("m1", "other", "09:00", "你可以在这里暂存文件与笔记。"),
    textMsg("m2", "me", "09:01", "好的，谢谢。"),
    {
      id: "m3",
      from: "other",
      time: "09:02",
      kind: "link",
      linkTitle: "微信开放平台",
      linkUrl: "open.weixin.qq.com",
    },
  ],
  t2: [
    textMsg("m1", "other", "10:10", "这版交互再对齐一下微信的规范。"),
    textMsg("m2", "me", "10:12", "收到，我下午改一版。"),
    textMsg("m3", "other", "10:24", "原型我发群里了。"),
    {
      id: "m4",
      from: "me",
      time: "10:25",
      kind: "image",
      imageEmoji: "🗂️",
      imageCaption: "交互稿截图（演示）",
    },
  ],
  t3: [
    textMsg("m1", "other", "18:20", "晚上回来吃饭吗？"),
    textMsg("m2", "me", "18:22", "回，大概七点到家。"),
    {
      id: "m3",
      from: "other",
      time: "18:23",
      kind: "voice",
      voiceSeconds: 12,
    },
  ],
  t4: [
    textMsg("m1", "other", "12:00", "airick/wechat-ui-demo 获得 1 个 Star。"),
  ],
};

export function getMessagesForThread(threadId: string): ChatMessage[] {
  return seedMessages[threadId] ?? [
    textMsg("m0", "other", "现在", "（演示）暂无更多历史消息"),
  ];
}

/** 通讯录联系人 id → 已有会话 id，用于「发消息」跳转 */
export const contactToThreadId: Record<string, string> = {
  c4: "t3",
};

export const contactGroups: ContactGroup[] = [
  {
    letter: "A",
    items: [
      { id: "c1", name: "Alice", avatar: "🧑‍💻" },
      { id: "c2", name: "Allen", avatar: "🎸" },
    ],
  },
  {
    letter: "B",
    items: [{ id: "c3", name: "Bob", avatar: "🏀" }],
  },
  {
    letter: "L",
    items: [{ id: "c4", name: "妈妈", avatar: "👩" }],
  },
];

export const discoverItems = [
  { id: "d1", icon: "⭕", title: "朋友圈", subtitle: "" },
  { id: "d2", icon: "📹", title: "视频号", subtitle: "" },
  { id: "d3", icon: "📡", title: "直播", subtitle: "" },
  { id: "d4", icon: "🛒", title: "购物", subtitle: "" },
  { id: "d5", icon: "🎮", title: "游戏", subtitle: "" },
];

export const momentFeed: MomentPost[] = [
  {
    id: "p1",
    author: "产品小王",
    avatar: "🧑‍💼",
    text: "新版本原型已发，欢迎拍砖～ #演示",
    time: "2 小时前",
    images: ["📱", "🖥️"],
  },
  {
    id: "p2",
    author: "Alice",
    avatar: "🧑‍💻",
    text: "今天在写 React 组件，顺手复刻了一波微信 UI。",
    time: "昨天",
    images: ["🎨"],
  },
  {
    id: "p3",
    author: "我",
    avatar: "🦊",
    text: "GitHub Pages 部署成功 ✅",
    time: "周一",
    images: [],
  },
];
