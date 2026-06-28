#!/usr/bin/env bash

# Vercel Ignored Build Step:
# - exit 0 → skip deployment
# - exit 1 → run deployment

branch="${VERCEL_GIT_COMMIT_REF:-}"

if [[ -z "$branch" ]]; then
  echo "VERCEL_GIT_COMMIT_REF is not set; proceeding with build."
  exit 1
fi

if [[ "$branch" == "main" ]]; then
  echo "Building deployment for main."
  exit 1
fi

echo "Skipping build for branch: $branch"
exit 0