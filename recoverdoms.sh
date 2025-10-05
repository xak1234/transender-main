#!/usr/bin/env bash
set -euo pipefail

# Detect which repo we’re in by folder name
repo_name="$(basename "$(pwd)")"

domain=""
token=""

case "$repo_name" in
  MindSim)
    domain="ecx.rodeo"
    token="1p8R08Vgk9ZYjmjmDQZz"
    ;;
  HorropolyX)
    domain="horropoly.com"
    token="Smtw51aDje9bJ21l27Y3"
    ;;
  Catopia)
    domain="catopia.online"
    token="6OyXzYjEXF9vmSXkZbiz"
    ;;
  barbershop)
    domain="thebarbershop.cc"
    token="GJ0uCNMUbl2pRaIGdPeE"
    ;;
  transender-main)
    domain="transender.uk"
    token="lIS2eK2Oosm7KlrCbpsd"
    ;;
  *)
    echo "ERROR: Unknown repo '$repo_name'. Edit script case block to map it to a domain/token." >&2
    exit 1
    ;;
esac

# Choose deployable static root
if [ -d "public" ]; then
  target_dir="public/.well-known"
elif [ -d "static" ]; then
  target_dir="static/.well-known"
else
  target_dir=".well-known"
fi

mkdir -p "$target_dir"
file="$target_dir/cf-2fa-verify.txt"

printf "%s\n" "$token" > "$file"

git add "$file"
git commit -m "Cloudflare 2FA verify: add /.well-known/cf-2fa-verify.txt for $domain" || true

echo "Wrote $file for $domain"
echo "Next: git push, then verify:"
echo "curl -fsS https://$domain/.well-known/cf-2fa-verify.txt && echo"
