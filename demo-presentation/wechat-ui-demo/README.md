# 微信风格 UI Demo

纯前端演示项目，复刻微信移动端常见界面（聊天列表、会话、通讯录、发现、我），用于 **GitHub / 作品集展示**。数据为本地 Mock，无后端、无真实通讯能力。

> **声明**：本项目与腾讯「微信」产品无关，仅为学习与交流用的界面练习，请勿用于误导他人。

## 技术栈

- [Vite](https://vitejs.dev/) 6
- React 19 + TypeScript
- 无 UI 框架，手写样式（微信主色 `#07C160`、气泡与列表布局）

## 本地运行

在仓库根目录下，进入本目录：

```bash
cd demo-presentation/wechat-ui-demo
npm install
npm run dev
```

浏览器打开终端提示的本地地址即可（开发时 `base` 为 `/`）。

## 构建与预览

```bash
npm run build
npm run preview
```

产物在 `dist/` 目录。生产构建的 `base` 为  
`/AirickCheung-resume/demo-presentation/wechat-ui-demo/`，与父仓库 GitHub Pages 路径一致。

## 部署到 GitHub Pages（父仓库）

本 demo 作为 [AirickCheung-resume](https://github.com/Akira-arch-tech/AirickCheung-resume) 的子目录，由根目录 `.github/workflows/deploy-pages.yml` 统一构建并部署。推送 `main` 分支后，线上地址示例：

`https://akira-arch-tech.github.io/AirickCheung-resume/demo-presentation/wechat-ui-demo/`

## 功能说明

需求基线见 [`docs/PRD.md`](./docs/PRD.md)（v0.3：P0～P2 附录已对齐）。

- **假登录**：首屏登录页（sessionStorage）；设置 → 关于 → **退出登录**
- 底部 Tab：微信 / 通讯录 / 发现 / 我
- **微信**：搜索、**全局搜索**入口、**左滑会话**（标为未读 / 删除）、免打扰 🌙、置顶与未读；⊕ → **添加朋友 / 扫一扫**（与通讯录 + 同页）
- **聊天**：**时间气泡**；群 **系统提示条**与**对方昵称**；**@** 成员选择；**引用回复**；快捷表情 + **半屏表情面板**；+ 面板多类型消息；**长按**消息菜单；**图片全屏预览**；语音短按播放；正在输入与自动回复；**置顶/免打扰 sessionStorage**
- **通讯录**：顶部搜索过滤、字母分组、**右侧索引条**、联系人 ActionSheet、妈妈→会话
- **发现**：朋友圈（赞 / **评论弹层**、**下拉刷新**壳、相机 **发图文** ActionSheet）；其余入口**二级占位页**
- **我**：**个人信息**（假保存）；**设置**（**深色 / 横屏**持久化、关于与仓库链接、退出登录）
- 数据均为 Mock；界面练习与官方微信无关

## 许可

MIT（见 `LICENSE`）。使用微信相关名称与界面风格时，请遵守法律法规与平台规则，本仓库不承担误用责任。
