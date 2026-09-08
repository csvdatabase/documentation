#!/usr/bin/env bash
# bash scripts/sync-specification.sh
# DOCS_BRANCH=v1 bash scripts/sync-specification.sh

set -euo pipefail
cd "$(dirname "$0")/.."
branch="${DOCS_BRANCH:-${CF_PAGES_BRANCH:-${GITHUB_HEAD_REF:-${GITHUB_REF_NAME:-$(git branch --show-current)}}}}"
[[ "$branch" == main || "$branch" =~ ^v[0-9]+$ ]] || { echo "Set DOCS_BRANCH to main or v<number>" >&2; exit 1; }
url="${SPECIFICATION_REPOSITORY:-https://github.com/csvdatabase/specification.git}"
# This ignored clone is build input; never fall back to a different branch.
if [[ ! -d specification/.git ]]; then
  git clone --branch "$branch" --single-branch -- "$url" specification
fi
[[ -z "$(git -C specification status --porcelain)" ]] || { echo "Specification clone has local changes" >&2; exit 1; }
git -C specification fetch origin "refs/heads/$branch"
git -C specification checkout --detach FETCH_HEAD
[[ -d specification/specification ]] || { echo "Missing specification/specification" >&2; exit 1; }
printf 'Building specification branch %s at %s\n' "$branch" "$(git -C specification rev-parse HEAD)"
