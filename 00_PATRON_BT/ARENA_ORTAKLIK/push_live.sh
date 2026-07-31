#!/usr/bin/env bash
# ============================================================
#  BATUPIA CANLI PUSH — STONEBREAKING_REPO → GitHub (1.5.4)
#  Kullanım: bash scripts/push_live.sh "commit mesajı"
#  Token BATUPIA/.env dosyasından okunur, ASLA ekrana yazılmaz.
#  Hedef her zaman klonun origin'i = stonebreaking.github.io
# ============================================================
set -euo pipefail
cd "$(dirname "$0")/.."

# --- .env yükle (değerleri ekrana basmadan) ---
if [ -f .env ]; then
  set -a; source .env; set +a
else
  echo "❌ BATUPIA/.env bulunamadı. Hazır .env dosyasını doldur ve klasöre koy."
  exit 1
fi

# --- Token boşluklardan arındır ve placeholder kontrolü ---
GITHUB_TOKEN="$(printf '%s' "${GITHUB_TOKEN:-}" | tr -d '[:space:]')"
case "$GITHUB_TOKEN" in
  ""|"buraya_token_yapistir")
    echo "❌ .env içinde GITHUB_TOKEN doldurulmamış. (Yalnızca 'repo' kapsamlı yeni token kullan.)"
    exit 1 ;;
esac

MESAJ="${1:-fix(P0): Hemen Oyna sonrasi tahta gorunmuyordu}"

REPO_DIR="STONEBREAKING_REPO"
if [ ! -d "$REPO_DIR/.git" ]; then
  echo "❌ $REPO_DIR klonu yok."
  exit 1
fi
cd "$REPO_DIR"

ORIGIN_URL="$(git config --get remote.origin.url)"
echo "📦 Hedef depo: $ORIGIN_URL"

# --- Kritik işaretler hazır mı? ---
grep -q '\["f1", "f2", "f3"\]' js/game.js || { echo "❌ showScreen/quickplay düzeltmesi yok."; exit 1; }
grep -q 'v=154' game.html || { echo "❌ game.html cache v=154 değil."; exit 1; }
node --check js/game.js || { echo "❌ js/game.js sözdizimi hatası."; exit 1; }
node --check js/story.js || { echo "❌ js/story.js sözdizimi hatası."; exit 1; }
echo "✅ Ön kontroller geçti (showScreen + quickplay + v=154 + sözdizimi)."

# --- Önceki commit'in yazar kimliğini koru ---
git config user.name  "$(git log -1 --format=%an)"
git config user.email "$(git log -1 --format=%ae)"

# --- Depth-1 klonsak geçmişi tamamla (public fetch, token gerekmez) ---
git fetch --unshallow origin 2>/dev/null || echo "ℹ️ unshallow gerekmedi/olmadı."

# --- Commit ---
git add -A
if git diff --cached --quiet; then
  echo "ℹ️ Commit için değişiklik yok (düzeltme zaten işlenmiş olabilir)."
else
  git commit -m "$MESAJ"
fi

# --- Güvenli push: token URL içinde kullanılır, ekrana yazılmaz ---
AUTH_URL="https://${GITHUB_TOKEN}@${ORIGIN_URL#https://}"
git push "$AUTH_URL" main

echo "✅ Push tamam: $MESAJ"
echo "Sonraki: canlı doğrulama  (curl -L https://stonebreaking.github.io/game.html | grep v=154)"
