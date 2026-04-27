#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-3000}"
URL="http://localhost:${PORT}/dev/deck/"
OUT="${1:-oralstack-deck.pdf}"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

if [ ! -x "$CHROME" ]; then
  echo "Error: Google Chrome not found at:" >&2
  echo "  $CHROME" >&2
  echo "" >&2
  echo "Install Google Chrome from https://www.google.com/chrome/ or edit this script to point at another Chromium-based browser." >&2
  exit 1
fi

if ! curl -s -o /dev/null -w "%{http_code}" "$URL" | grep -q "200"; then
  echo "Error: dev server is not responding at $URL" >&2
  echo "" >&2
  echo "Start it with:  npm run dev" >&2
  echo "Then re-run this script." >&2
  exit 1
fi

echo "Generating PDF from $URL"
echo "         → $OUT"
echo ""

"$CHROME" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf-no-header \
  --print-to-pdf="$OUT" \
  --virtual-time-budget=10000 \
  "$URL" 2>/dev/null

if [ -f "$OUT" ]; then
  echo "Created: $OUT"
  ls -lh "$OUT"
else
  echo "Error: PDF was not created" >&2
  exit 1
fi
