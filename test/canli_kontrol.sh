#!/bin/bash
# ============================================================
#  STONEBREAKING CANLI DENETİM (gerçek göz kontrolü)
#  PATRON BT · "patlak çıkmasını engelleme" ekibi — v1
#  Kullanım: bash test/canli_kontrol.sh
#  Ne yapar:
#    1. Site HTTP 200 mü?
#    2. index.html'deki TÜM asset'ler 200 mü? (kırık görsel/JS/CSS var mı)
#    3. Sürüm damgası ne? (sağ alt vX.Y)
#    4. JS sözdizimi sağlam mı? (node --check)
#    5. HTML div dengesi tutarlı mı? (eksik </div> var mı)
#  Çıktı: OK/WARN/ERR sayıları — DENETIM_RAPORU.md'ye işlenir.
# ============================================================
cd "$(dirname "$0")/.." || exit 1
SITE="https://stonebreaking.github.io"
OK=0; WARN=0; ERR=0

say() { printf '%-8s %s\n' "$1" "$2"; }

echo "═══ STONEBREAKING CANLI DENETİM $(date +%F\ %T) ═══"

# 1) Ana sayfa
code=$(curl -s -o /dev/null -w "%{http_code}" -L "$SITE/")
if [ "$code" = "200" ]; then say OK "Site 200 ✅"; OK=$((OK+1));
else say ERR "Site $code ❌"; ERR=$((ERR+1)); fi

# 2) Asset'ler
[ -f index.html ] || curl -s -L "$SITE/" -o index.html
assets=$(grep -oE '(src|href)="[^"]*"' index.html \
  | sed -E 's/^(src|href)="//; s/"$//' \
  | grep -vE '^(data:|https?://|mailto:|\$|\x27)' \
  | grep -vE '[\x27+]' \
  | sed 's/?v=[0-9]*//' | sort -u)
broken=0; total=0
for a in $assets; do
  total=$((total+1))
  c=$(curl -s -o /dev/null -w "%{http_code}" -L "$SITE/$a")
  [ "$c" != "200" ] && { say ERR "KIRIK: $a ($c)"; broken=$((broken+1)); }
done
if [ "$broken" = "0" ]; then say OK "Asset $total/$total → 200 ✅"; OK=$((OK+1));
else say ERR "Asset: $broken/$total kırık ❌"; ERR=$((ERR+1)); fi

# 3) Sürüm damgası (CANLI sayfadan — yorumlardaki eski sürümleri değil)
ver=$(curl -s -L "$SITE/" | grep -oE 'v8\.[0-9]+' | sort -V | tail -1)
say OK "Canlı sürüm damgası: ${ver:-?}"

# 4) JS sözdizimi
jserr=0
for js in js/*.js; do
  if command -v node >/dev/null 2>&1; then
    node --check "$js" 2>/dev/null || { say ERR "JS HATASI: $js"; jserr=$((jserr+1)); }
  fi
done
if [ "$jserr" = "0" ]; then say OK "JS sözdizimi temiz ✅"; OK=$((OK+1));
else ERR=$((ERR+1)); fi

# 5) HTML div dengesi (kabaca)
if command -v python3 >/dev/null 2>&1; then
  bal=$(python3 -c "
import re
h=open('index.html',encoding='utf-8').read()
b=h[h.find('<body'):]
o=len(re.findall(r'<div\b',b)); c=len(re.findall(r'</div>',b))
print(f'{o}:{c}')
")
  o=${bal%%:*}; c=${bal##*:}
  if [ "$o" = "$c" ]; then say OK "HTML div dengesi $o/$c ✅"; OK=$((OK+1));
  else say WARN "div dengesi $o/$c (fark $((o-c))) ⚠️"; WARN=$((WARN+1)); fi
fi

echo "════════════════════════════════════════════"
echo "SONUÇ: OK:$OK WARN:$WARN ERR:$ERR"
[ "$ERR" = "0" ] && echo "✅ CANLI TEMİZ — mühürlenebilir" || echo "❌ HATA VAR — düzeltilmeli"
