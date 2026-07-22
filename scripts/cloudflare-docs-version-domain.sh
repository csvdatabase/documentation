#!/usr/bin/env bash
set -euo pipefail

VERSION="${1:-${VERSION:-}}"

if [ -z "$VERSION" ]; then
  echo "Set VERSION or pass it as the first argument, for example: $0 v1" >&2
  exit 1
fi

case "$VERSION" in
  v[0-9]*) ;;
  *)
    echo "VERSION should look like v1, v2, etc. Got: ${VERSION}" >&2
    exit 1
    ;;
esac

: "${CLOUDFLARE_API_TOKEN:?Set CLOUDFLARE_API_TOKEN}"
: "${CLOUDFLARE_ACCOUNT_ID:?Set CLOUDFLARE_ACCOUNT_ID}"
: "${CLOUDFLARE_ZONE_ID:?Set CLOUDFLARE_ZONE_ID}"
: "${CLOUDFLARE_PAGES_PROJECT:?Set CLOUDFLARE_PAGES_PROJECT}"

DOCS_DOMAIN="${DOCS_DOMAIN:-docs.csvdatabase.net}"
PYTHON_BIN="${PYTHON_BIN:-python3}"
API_BASE="https://api.cloudflare.com/client/v4"
HOSTNAME="${VERSION}.${DOCS_DOMAIN}"
TARGET="${VERSION}.${CLOUDFLARE_PAGES_PROJECT}.pages.dev"

request() {
  local method="$1"
  local url="$2"
  local data="${3:-}"

  if [ -n "$data" ]; then
    curl --fail --silent --show-error \
      --request "$method" \
      --header "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
      --header "Content-Type: application/json" \
      --data "$data" \
      "$url"
  else
    curl --fail --silent --show-error \
      --request "$method" \
      --header "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
      "$url"
  fi
}

json_string() {
  "$PYTHON_BIN" -c 'import json,sys; print(json.dumps(sys.argv[1]))' "$1"
}

domain_url="${API_BASE}/accounts/${CLOUDFLARE_ACCOUNT_ID}/pages/projects/${CLOUDFLARE_PAGES_PROJECT}/domains"
domain_response="$(mktemp)"
records_json=""
trap 'rm -f "$domain_response" "$records_json"' EXIT
domain_status="$(
  curl --silent --show-error \
    --output "$domain_response" \
    --write-out "%{http_code}" \
    --header "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
    "${domain_url}/${HOSTNAME}"
)"

if [ "$domain_status" = "200" ]; then
  echo "Pages domain already exists: ${HOSTNAME}"
elif [ "$domain_status" = "404" ]; then
  echo "Adding Pages domain: ${HOSTNAME}"
  request POST "$domain_url" "{\"name\":$(json_string "$HOSTNAME")}" >/dev/null
else
  echo "Could not check Pages domain ${HOSTNAME}. Cloudflare returned HTTP ${domain_status}:" >&2
  cat "$domain_response" >&2
  exit 1
fi

records_url="${API_BASE}/zones/${CLOUDFLARE_ZONE_ID}/dns_records"
records_json="$(mktemp)"
request GET "${records_url}?type=CNAME&name=${HOSTNAME}" > "$records_json"
record_id="$(
  "$PYTHON_BIN" - "$records_json" <<'PY'
import json
import sys

with open(sys.argv[1], encoding="utf-8") as handle:
    data = json.load(handle)

records = data.get("result") or []
print(records[0].get("id", "") if records else "")
PY
)"

record_body="$(
  "$PYTHON_BIN" - "$HOSTNAME" "$TARGET" <<'PY'
import json
import sys

print(json.dumps({
    "type": "CNAME",
    "name": sys.argv[1],
    "content": sys.argv[2],
    "ttl": 1,
    "proxied": True,
}))
PY
)"

if [ -n "$record_id" ]; then
  echo "Updating DNS CNAME: ${HOSTNAME} -> ${TARGET}"
  request PATCH "${records_url}/${record_id}" "$record_body" >/dev/null
else
  echo "Creating DNS CNAME: ${HOSTNAME} -> ${TARGET}"
  request POST "$records_url" "$record_body" >/dev/null
fi

echo "Configured ${HOSTNAME} for branch ${VERSION}."
