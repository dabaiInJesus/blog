#!/bin/bash
# Deploy script for GitHub Pages

# 等待用户配置
echo "请先修改以下内容:"
echo "1. deploy.sh 中的 YOUR_GITHUB_USERNAME 改成你的 GitHub 用户名"
echo "2. vitepress.config.ts 中的 github 链接改成你的"
echo ""
echo "配置完成后，执行:"
echo ""
echo "  git init"
echo "  git add ."
echo "  git commit -m 'first commit'"
echo "  git remote add origin https://github.com/dabaiInJesus/blog.git"
echo "  git push -u origin main"
echo "  npm run deploy"
echo ""
echo "然后在 GitHub 仓库 Settings → Pages → Source 选择 gh-pages 分支"
echo ""
echo "================================"
echo "开始构建..."
echo ""

# 构建
npm run build

# 进入构建输出目录
cd src/.vitepress/dist

# 初始化 git（如果是首次部署）
if [ ! -d .git ]; then
  git init
  git checkout -b gh-pages
fi

# 添加文件
git add .
git commit -m "deploy: $(date)"

# 推送到 gh-pages 分支（需要先在 GitHub 创建空仓库）
git push -f origin gh-pages

cd ../..
echo ""
echo "✅ 部署完成！等待 1-2 分钟后访问: https://dabaiInJesus.github.io/blog/"
