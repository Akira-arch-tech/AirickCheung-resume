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

需求基线见 [`docs/PRD.md`](./docs/PRD.md)（v0.2 对照已更新）。

- 底部 Tab：微信 / 通讯录 / 发现 / 我
- **微信**：搜索、**左滑会话**（标为未读 / 删除）、免打扰 🌙、置顶与未读、⊕ 菜单
- **聊天**：群 **系统提示条**与**对方昵称**；快捷表情 + **半屏表情面板**；+ 面板多类型消息；**长按**消息菜单（复制等）；**图片全屏预览**；语音短按播放动效；正在输入与自动回复；**置顶/免打扰写入 sessionStorage**
- **通讯录**：字母分组、**右侧索引条**、联系人 ActionSheet、妈妈→会话
- **发现**：朋友圈（赞 / **评论弹层**）；其余入口进入**统一二级占位页**
- **我**：点击资料区进 **个人信息**（假保存）；**设置**（通用开关壳、关于页与仓库链接）
- 数据均为 Mock；界面练习与官方微信无关

## 许可

MIT（见 `LICENSE`）。使用微信相关名称与界面风格时，请遵守法律法规与平台规则，本仓库不承担误用责任。
