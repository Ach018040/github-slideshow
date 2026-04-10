#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="$ROOT_DIR/vendor/AI-Scientist-v2"

if [ -d "$TARGET_DIR/.git" ]; then
  echo "AI-Scientist-v2 already exists at $TARGET_DIR"
  exit 0
fi

mkdir -p "$ROOT_DIR/vendor"
git clone https://github.com/SakanaAI/AI-Scientist-v2 "$TARGET_DIR"
echo "Cloned AI-Scientist-v2 to $TARGET_DIR"
