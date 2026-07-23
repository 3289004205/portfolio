#!/usr/bin/env bash
# 用法: ./git-sync.sh "你的提交说明"
# 把本地改动同步到 GitHub (origin/main)
set -e

cd "$(dirname "$0")"

if [ -z "$1" ]; then
  echo "用法: ./git-sync.sh \"提交说明\""
  exit 1
fi

git add -A
# 没有改动就直接退出
if git diff --cached --quiet; then
  echo "没有需要同步的改动。"
  exit 0
fi

git commit -m "$1"
git push origin main
echo "已同步到 GitHub: $(git log -1 --pretty=%h) $1"
