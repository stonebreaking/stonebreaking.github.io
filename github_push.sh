#!/bin/bash
# BATUPIA GitHub Push Scripti v1
# Kullanım: bash github_push.sh

set -e

echo "═══════════════════════════════════════"
echo "   BATUPIA GITHUB PUSH SİSTEMİ v1"
echo "═══════════════════════════════════════"
echo ""

# .env dosyasından token oku
if [ -f "01_GIZLI/.env" ]; then
    export $(grep -v '^#' 01_GIZLI/.env | xargs)
else
    echo "❌ .env dosyası bulunamadı!"
    exit 1
fi

# Token kontrolü
if [ "$GITHUB_TOKEN" = "TOKEN_BURAYA_YAPISTIR" ] || [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GitHub Token henüz girilmemiş!"
    echo ""
    echo "📌 Nasıl ekleyeceksin:"
    echo "   1. GitHub → Settings → Developer settings → Personal access tokens"
    echo "   2. Fine-grained token oluştur (repo erişimi ver)"
    echo "   3. 01_GIZLI/.env dosyasındaki GITHUB_TOKEN= satırına yapıştır"
    echo ""
    echo "⚠️  BU DOSYAYI ASLA PUSH ETME! .gitignore'da olmalı."
    exit 1
fi

# Git yapılandırması
git config user.name "BATUPIA Bot" || true
git config user.email "bot@batupia.studio" || true

# Repo kontrolü
if [ ! -d ".git" ]; then
    echo "🆕 Yeni repo başlatılıyor..."
    git init
    git remote add origin "https://${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${GITHUB_REPO}.git"
fi

# .gitignore oluştur (eğer yoksa)
if [ ! -f ".gitignore" ]; then
    echo "🛡️  .gitignore oluşturuluyor..."
    cat > .gitignore << 'EOF'
01_GIZLI/.env
*.log
node_modules/
.cache/
EOF
fi

# Durum kontrolü
echo "📊 Git durumu kontrol ediliyor..."
git status

echo ""
echo "📝 Değişiklikler ekleniyor..."
git add -A

echo ""
read -p "💬 Commit mesajı gir (varsayılan: 'BATUPIA v1 - Mühür Sistemi'): " msg
msg=${msg:-"BATUPIA v1 - Mühür Sistemi"}

echo ""
echo "💾 Commit yapılıyor: $msg"
git commit -m "$msg" || echo "⚠️  Commit yapılamadı (değişiklik yok?)"

echo ""
echo "🚀 GitHub'a push ediliyor..."
git push -u origin "$GITHUB_BRANCH" || git push

echo ""
echo "✅ PUSH TAMAMLANDI!"
echo "🌐 Kontrol et: https://${GITHUB_USERNAME}.github.io/${GITHUB_REPO}/"
echo "═══════════════════════════════════════"
