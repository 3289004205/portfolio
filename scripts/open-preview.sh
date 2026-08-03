#!/bin/bash
# 打开项目预览：绕过被污染的 X_IDE_SPACE_KEY（warm- 临时值），
# 让 notify 从 envd 实时取权威沙箱 ID 暴露 8000 端口。
set -e
cd /root/.codebuddy/skills/preview
exec env -u X_IDE_SPACE_KEY ./notify 8000
