#!/usr/bin/env bash
# Usage: ./git-sync.sh "commit message"
# Sync all local changes to origin/main.
set -euo pipefail

cd "$(dirname "$0")"

if [ -z "${1:-}" ]; then
  echo 'Usage: ./git-sync.sh "commit message"'
  exit 1
fi

git add -A
if git diff --cached --quiet; then
  echo "No changes to sync."
  exit 0
fi

git commit -m "$1"
git pull --rebase origin main
git push origin main
echo "Synced to GitHub: $(git log -1 --pretty=%h) $1"
