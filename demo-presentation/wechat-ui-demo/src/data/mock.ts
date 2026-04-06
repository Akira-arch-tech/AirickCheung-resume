import type { ChatMessage, ChatThread, ContactGroup } from "../types";

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
    { id: "m1", from: "other", text: "你可以在这里暂存文件与笔记。", time: "09:00" },
    { id: "m2", from: "me", text: "好的，谢谢。", time: "09:01" },
  ],
  t2: [
    { id: "m1", from: "other", text: "这版交互再对齐一下微信的规范。", time: "10:10" },
    { id: "m2", from: "me", text: "收到，我下午改一版。", time: "10:12" },
    { id: "m3", from: "other", text: "原型我发群里了。", time: "10:24" },
  ],
  t3: [
    { id: "m1", from: "other", text: "晚上回来吃饭吗？", time: "18:20" },
    { id: "m2", from: "me", text: "回，大概七点到家。", time: "18:22" },
  ],
  t4: [
    { id: "m1", from: "other", text: "airick/wechat-ui-demo 获得 1 个 Star。", time: "12:00" },
  ],
};

export function getMessagesForThread(threadId: string): ChatMessage[] {
  return seedMessages[threadId] ?? [
    { id: "m0", from: "other", text: "（演示）暂无更多历史消息", time: "现在" },
  ];
}

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
