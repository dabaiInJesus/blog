#!/bin/bash
# Deploy script for GitHub Pages
# 用法: npm run deploy

set -e

echo "================================"
echo "开始构建..."
echo ""

npm run build

cd src/.vitepress/dist

if [ ! -d .git ]; then
  git init
  git checkout -b gh-pages
fi

git add .
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M')"

git push -f https://github.com/dabaiInJesus/blog.git gh-pages

cd ../..
echo ""
echo "✅ 部署完成！"
echo "   等待 1-2 分钟后访问: https://dabaiInJesus.github.io/blog/"
