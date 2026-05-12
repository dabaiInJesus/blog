# 🐾 dabaiInJesus 项目门户

> 全栈开发者的项目门户 — 展示 dabaiInJesus 名下所有开源项目。

基于 **Vue3 + VitePress + Tailwind CSS** 构建，自动同步 GitHub 仓库数据，部署在 GitHub Pages。

## ✨ 特性

- **项目门户首页** — 统计头栏 + 精选项目展示，一览所有开源作品
- **开源项目页** — 自动从 GitHub API 同步仓库列表，支持语言筛选和置顶
- **技术文章** — Vue3 / Spring Boot / Python 实战踩坑记录
- **在线工具** — 实用纯前端工具（开发中）
- **构建时数据预抓取** — 静态站点，无需运行时 API 调用，访问速度快

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run dev        # 启动开发服务器（自动抓取最新仓库数据）

# 构建
npm run build      # 生产构建（自动抓取最新仓库数据）

# 预览构建结果
npm run preview
```

## 📖 站点导航

| 页面 | 路由 | 说明 |
|------|------|------|
| 首页 | `/` | 门户首页，展示统计和精选项目 |
| 开源项目 | `/projects` | 所有 GitHub 仓库列表，支持筛选 |
| 文章 | `/posts/` | 技术文章列表 |
| 工具 | `/tools/` | 在线工具（开发中） |
| 关于 | `/about` | 个人信息 |

## 🔧 配置指南

### 设置置顶项目

编辑 `scripts/fetch-repos.mjs`，在 `PINNED` 数组中填入项目名：

```js
const PINNED = [
  'offline-ocr',
  'bible-typing'
]
```

置顶项目将在项目页优先展示并带有 📌 标记。

### 添加文章

在 `src/posts/` 目录下创建 `.md` 文件：

```markdown
---
title: 文章标题
date: 2026-05-12
---

正文内容...
```

### 修改导航

编辑 `src/.vitepress/config.mts`：

```ts
nav: [
  { text: '首页', link: '/' },
  { text: '开源项目', link: '/projects' },
  // ...
]
```

### GitHub Token（可选）

设置 `GITHUB_TOKEN` 环境变量可提高 GitHub API 频率限制（从 60 req/h 提升到 5000 req/h）：

```bash
# Windows CMD
set GITHUB_TOKEN=your_token_here

# PowerShell
$env:GITHUB_TOKEN="your_token_here"

# Linux/Mac
export GITHUB_TOKEN=your_token_here
```

## 📦 部署

### 首次部署

```bash
# 构建
npm run build

# 进入构建输出目录
cd src/.vitepress/dist

# 初始化 gh-pages 分支
git init
git checkout -b gh-pages
git add .
git commit -m "deploy"
git remote add origin https://github.com/dabaiInJesus/blog.git
git push -f origin gh-pages
```

### 更新部署

```bash
npm run deploy
```

然后在 GitHub 仓库 **Settings → Pages** 中：
- **Source** → **Deploy from a branch**
- **Branch** → **gh-pages** → **/(root)**
- **Save**

等待 1-2 分钟后访问 `https://dabaiInJesus.github.io/blog/`

## 🧩 项目结构

```
blog/
├── .vitepress/
│   ├── config.mts              # VitePress 配置（导航、主题）
│   └── components/
│       ├── GithubProjects.vue   # 项目页组件（列表+筛选+置顶）
│       └── HomeProjects.vue     # 首页精选项目组件
├── scripts/
│   └── fetch-repos.mjs          # 构建时 GitHub 数据抓取脚本
├── src/
│   ├── index.md                 # 首页
│   ├── projects.md              # 开源项目页
│   ├── about.md                 # 关于我
│   ├── posts/                   # 技术文章
│   ├── tools/                   # 在线工具
│   └── public/
│       └── repos.json           # 抓取的仓库数据（构建时生成）
├── deploy.sh                    # 部署脚本
└── package.json
```

## 🛠️ 技术栈

- **Vue 3** — 渐进式 JavaScript 框架
- **VitePress** — Vite 驱动的静态站点生成器
- **Tailwind CSS** — 实用优先的 CSS 框架
- **GitHub API** — 仓库数据自动同步
- **GitHub Pages** — 免费静态站点托管

## 📄 许可证

MIT
