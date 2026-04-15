# 作品演示（demo-presentation）

本目录用于集中存放可在线演示的前端小项目。每个演示单独一个子文件夹，**文件夹名即演示标识**（建议使用 `kebab-case`，与 URL 路径一致）。

## 当前列表

| 目录 | 说明 | 线上路径（GitHub Pages） |
|------|------|--------------------------|
| [wechat-ui-demo](./wechat-ui-demo/) | 微信风格 UI，React + Vite | `/demo-presentation/wechat-ui-demo/` |
| weichat-clone | 微信克隆项目演示（Render 在线后端版） | `https://weichat-clone-demo.onrender.com` |
| fundamental-custom-design-demo | 定制品设计网站 Demo（独立仓库） | `https://akira-arch-tech.github.io/PM-demo-presentation/` |

根简历地址：`https://akira-arch-tech.github.io/AirickCheung-resume/`  
演示索引页：`https://akira-arch-tech.github.io/AirickCheung-resume/demo-presentation/`

## 注意事项

- 此前若误在仓库根目录创建了名为 `demo-presentation` 的**文件**，需删除后改为本**文件夹**（Git 中文件与目录不能同名）。
- 使用 Vite 等构建工具时，生产环境的 `base` 需设为 **`/AirickCheung-resume/demo-presentation/<子目录名>/`**，与 GitHub Pages 项目站路径一致。
- 在 `.github/workflows/deploy-pages.yml` 中为每个新 demo 增加 `npm ci` / `npm run build` 及将 `dist` 拷贝到 `_site/demo-presentation/<子目录名>/` 的步骤。
