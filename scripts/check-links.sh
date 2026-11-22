#!/usr/bin/env bash
# Local link check for this repo using lychee (https://github.com/lycheeverse/lychee).
#
# Local only: nothing here runs in CI and no GitHub Actions minutes are spent.
# The script downloads the pinned lychee release binary from the official
# GitHub release page and verifies it against the SHA-256 pinned below before
# running it. Update LYCHEE_VERSION and the hashes together.
#
# Usage: scripts/check-links.sh   (from anywhere; it checks the repo root)
#
# Windows: download lychee-x86_64-pc-windows-msvc.zip from the same release,
# verify its SHA-256 is 32975d1493ee1a975d6bb41e4fb56fe419cb442ded628bb772ba2e614acfacad,
# then run: lychee --no-progress --config lychee.toml .

set -euo pipefail

LYCHEE_VERSION="v0.24.2"
RELEASE_TAG="lychee-${LYCHEE_VERSION}"
BASE_URL="https://github.com/lycheeverse/lychee/releases/download/${RELEASE_TAG}"

# SHA-256 of each official release archive, taken from the .sha256 assets
# published on https://github.com/lycheeverse/lychee/releases/tag/lychee-v0.24.2
SHA_DARWIN_ARM64="c9d3740ea2d891854d37116c9fba840f37b6e7c89d330e7db84ac333631c4977"
SHA_DARWIN_X64="887503a9cff667d322b8d0892b40bf49976eb9507af8483220a3706cdad55978"
SHA_LINUX_X64_MUSL="73657a111819a30c47c08352896796f23d64e4eb2b3ed39b6d32149241566fc5"
SHA_LINUX_ARM64_MUSL="5d0b0e3aeab240f41920c633a6eaf97599be6eedda034b36e858ede7dba5e535"

case "$(uname -s)-$(uname -m)" in
  Darwin-arm64)   ASSET="lychee-aarch64-apple-darwin.tar.gz";        SHA="$SHA_DARWIN_ARM64" ;;
  Darwin-x86_64)  ASSET="lychee-x86_64-apple-darwin.tar.gz";         SHA="$SHA_DARWIN_X64" ;;
  Linux-x86_64)   ASSET="lychee-x86_64-unknown-linux-musl.tar.gz";   SHA="$SHA_LINUX_X64_MUSL" ;;
  Linux-aarch64)  ASSET="lychee-aarch64-unknown-linux-musl.tar.gz";  SHA="$SHA_LINUX_ARM64_MUSL" ;;
  *) echo "Unsupported platform: $(uname -s)-$(uname -m). See the Windows note in this script's header." >&2; exit 1 ;;
esac

CACHE_DIR="${XDG_CACHE_HOME:-$HOME/.cache}/oralstack-website-lychee/${RELEASE_TAG}"
BIN="${CACHE_DIR}/lychee"

if [ ! -x "$BIN" ]; then
  mkdir -p "$CACHE_DIR"
  ARCHIVE="${CACHE_DIR}/${ASSET}"
  echo "Downloading ${ASSET} from the official lychee release..."
  curl -fsSL "$BASE_URL/$ASSET" -o "$ARCHIVE"
  echo "${SHA}  ${ARCHIVE}" | sha256sum -c - 2>/dev/null || echo "${SHA}  ${ARCHIVE}" | shasum -a 256 -c -
  tar xzf "$ARCHIVE" -C "$CACHE_DIR" --strip-components=1
  rm "$ARCHIVE"
fi

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"
exec "$BIN" --no-progress --config lychee.toml .
