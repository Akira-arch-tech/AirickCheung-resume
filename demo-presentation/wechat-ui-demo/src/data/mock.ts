import type { ChatMessage, ChatThread, ContactGroup, MomentPost } from "../types";

function textMsg(
  id: string,
  from: "me" | "other",
  time: string,
  text: string,
  senderName?: string
): ChatMessage {
  return { id, from, time, kind: "text", text, senderName };
}

function systemMsg(id: string, time: string, systemText: string): ChatMessage {
  return { id, from: "other", time, kind: "system", systemText };
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
    systemMsg("s0", "09:50", "小王邀请 李工、Zoe 加入了群聊"),
    systemMsg("s1", "09:55", "群主已启用「群聊邀请确认」"),
    textMsg("m1", "other", "10:10", "这版交互再对齐一下微信的规范。", "小王"),
    textMsg("m2", "me", "10:12", "收到，我下午改一版。"),
    textMsg("m3", "other", "10:24", "原型我发群里了。", "小王"),
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
  { id: "d2", icon: "📹", title: "视频号", subtitle: "短视频与直播推荐（演示）" },
  { id: "d3", icon: "📡", title: "直播", subtitle: "观看直播内容（演示）" },
  { id: "d4", icon: "🛒", title: "购物", subtitle: "好物与订单入口（演示）" },
  { id: "d5", icon: "🎮", title: "游戏", subtitle: "休闲游戏中心（演示）" },
];

export const momentFeed: MomentPost[] = [
  {
    id: "p1",
    author: "产品小王",
    avatar: "🧑‍💼",
    text: "新版本原型已发，欢迎拍砖～ #演示",
    time: "2 小时前",
    images: ["📱", "🖥️"],
    comments: [
      { author: "Alice", text: "已看，晚上对一下？" },
      { author: "我", text: "👍" },
    ],
  },
  {
    id: "p2",
    author: "Alice",
    avatar: "🧑‍💻",
    text: "今天在写 React 组件，顺手复刻了一波微信 UI。",
    time: "昨天",
    images: ["🎨"],
    comments: [{ author: "产品小王", text: "求开源链接（演示）" }],
  },
  {
    id: "p3",
    author: "我",
    avatar: "🦊",
    text: "GitHub Pages 部署成功 ✅",
    time: "周一",
    images: [],
    comments: [],
  },
];
