#!/usr/bin/env bash
# Deploy Firestore security rules using the Firebase project id from local env.
# Single source of truth: FIREBASE_PROJECT_ID or NEXT_PUBLIC_FIREBASE_PROJECT_ID in .env
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -f firestore.rules ]]; then
  echo "error: firestore.rules not found in $ROOT_DIR" >&2
  exit 1
fi

if [[ ! -f firebase.json ]]; then
  echo "error: firebase.json not found in $ROOT_DIR" >&2
  exit 1
fi

if [[ ! -f .env ]]; then
  echo "error: .env not found. Copy .env.example to .env and set NEXT_PUBLIC_FIREBASE_PROJECT_ID." >&2
  exit 1
fi

# Load .env without printing values. Only simple KEY=VALUE lines are supported.
set -a
# shellcheck disable=SC1091
source .env
set +a

PROJECT_ID="${FIREBASE_PROJECT_ID:-${NEXT_PUBLIC_FIREBASE_PROJECT_ID:-}}"

if [[ -z "$PROJECT_ID" || "$PROJECT_ID" == "your_project_id" ]]; then
  echo "error: set FIREBASE_PROJECT_ID or NEXT_PUBLIC_FIREBASE_PROJECT_ID in .env" >&2
  exit 1
fi

echo "Deploying Firestore rules to project: $PROJECT_ID"

# Prefer npx so Node 25 / broken global firebase-tools still work.
exec npx --yes firebase-tools@latest deploy --only firestore:rules --project "$PROJECT_ID"
