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

- 底部 Tab：微信 / 通讯录 / 发现 / 我
- **微信**：会话搜索、右上角「⊕」操作菜单（演示 Toast）、列表预览与未读角标
- **聊天**：快捷表情条、「＋」展开相册/语音/位置/链接卡片等演示消息、文本发送、**对方正在输入**动画、部分会话自动回复、右上角菜单（清空会话 / 置顶 / 免打扰 Toast）
- **通讯录**：新的朋友 / 群聊 / 标签点击反馈；联系人详情 ActionSheet，**妈妈**可一键跳转对应会话
- **发现**：**朋友圈**独立信息流（点赞切换），其余入口 Toast 提示可扩展
- **我**：各入口点击 Toast 演示
- 列表、导航栏、气泡样式接近常见微信视觉习惯；数据均为前端 Mock

## 许可

MIT（见 `LICENSE`）。使用微信相关名称与界面风格时，请遵守法律法规与平台规则，本仓库不承担误用责任。
