# 🐾 dabaiInJesus

基于 Vue3 + VitePress + Tailwind CSS 构建的个人博客/工具站。

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建静态文件
npm run build

# 预览构建结果
npm run preview
```

## 📦 部署到 GitHub Pages

### 步骤 1：创建 GitHub 仓库

1. 登录 GitHub，创建新仓库 `my-blog`
2. 本地初始化 git 并推送：

```bash
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/dabaiInJesus/blog.git
git push -u origin main
```

### 步骤 2：配置 GitHub Pages

1. 进入仓库 **Settings → Pages**
2. **Source** 选择 **Deploy from a branch**
3. **Branch** 选择 **gh-pages** / **/(root)**
4. 点击 **Save**

### 步骤 3：部署

```bash
# 安装依赖
npm install

# 构建并部署（首次需要创建 gh-pages 分支）
npm run build
cd src/.vitepress/dist
git init
git checkout -b gh-pages
git add .
git commit -m "deploy"
git push -f origin gh-pages
```

> 等待 1-2 分钟，访问 `https://dabaiInJesus.github.io/blog/`

## 📝 添加内容

### 添加文章

在 `src/posts/` 目录下创建 `.md` 文件：

```markdown
---
title: 我的第一篇文章
date: 2026-04-26
---

# 文章标题

正文内容...
```

### 添加工具页面

在 `src/tools/` 目录下创建 `.md` 文件。

### 修改导航和配置

编辑 `vitepress.config.ts` 修改网站标题、导航链接、页脚等。

## 🛠️ 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **VitePress** - Vite 驱动的静态站点生成器
- **Tailwind CSS** - 实用优先的 CSS 框架
- **GitHub Pages** - 免费静态站点托管

## 📄 许可证

MIT
