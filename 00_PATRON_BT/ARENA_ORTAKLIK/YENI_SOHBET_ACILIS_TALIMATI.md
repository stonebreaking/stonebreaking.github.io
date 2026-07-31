# 📋 YENİ SOHBET AÇILIŞ TALİMATI — TEK METİN (1 KERE OKU, SONRA HİÇ GEREKMEZ)

> **Amaç:** Bu dosyayı bir kez takip et. Sonrasında tek yapman gereken:
> **.env dosyasına token yapıştır → "hazır" de.** Gerisi otomatik.
> **Son güncelleme:** 31.07.2026 — Batuhan + AI

---

## 🗝️ ADIM 0 — TOKEN AL (tek seferlik, ~2 dakika)

1. Buraya git: **https://github.com/settings/tokens/new**
2. Note: `batupia-arena` yaz
3. Expiration: "90 days" veya "No expiration"
4. **Scopes: SADECE `repo` kutusunu işaretle** (başka hiçbir şey!)
5. Altta yeşil **Generate token** → `ghp_...` kodu çıkar → **kopyala**

> ⚠️ Token'ı SOHBETE ASLA YAZMA. Sadece .env dosyasına.

---

## 📁 ADIM 1 — .env'YE TOKEN'ı KOY

Arena çalışma alanında şu dosya hazır bekliyor:

```
BATUPIA/.env
```

İçinde tek doldurulacak satır:

```
GITHUB_TOKEN=buraya_token_yapistir   →   GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

**İki kolay yol:**
- **Yol A (en kolay):** Çalışma alanında `BATUPIA/.env` dosyasını aç → `buraya_token_yapistir` yazısını kopyaladığın token ile değiştir → kaydet.
- **Yol B:** Dosyayı indir, masaüstünde düzenle, sonra çalışma alanına **yükle (attach)**.

`.env` zaten gitignore'lu — GitHub'a gitmez, güvenli. ✅

---

## 💬 ADIM 2 — YENİ SOHBETTE ŞU MESAJI GÖNDER

Aşağıdaki metni kopyala, yeni sohbete yapıştır (yukarıdaki .env'i de yüklemiş ol):

```text
BATUPIA - Stonebreaking Universe projesine PATRON BT devrinden devam ediyoruz.

Önce sırasıyla oku:
1. BATUPIA/00_PATRON_BT/ANA_MANTIK.md
2. BATUPIA/00_PATRON_BT/YENI_SOHBET_ACILIS_TALIMATI.md
3. BATUPIA/00_PATRON_BT/GOREV_LISTESI.md

Sonra:
- BATUPIA/.env dosyası dolu mu kontrol et (GITHUB_TOKEN doluysa "hazır").
- BATUPIA_REPO/ klonunu ve STONEBREAKING_REPO/ klonunu kontrol et.
- Canlı site durumunu kontrol et (v=154 görünüyor mu).

Bekleyen işler (öncelik sırasıyla):
1. 🔴 P0 düzeltmesi: stonebreaking.github.io deposuna v=154 push (scripts/push_live.sh)
2. 🔴 Stüdyo deposu batupia-stonebreaking'e push (belgeler + 4 ruh görseli + logo)
3. Canlı doğrulama: v=154 + Hemen Oyna → tahta görünüyor
Mühürlü 22 varlığı değiştirme. Token asla sohbete yazılmaz.
```

---

## ✅ ADIM 3 — "hazır" DE

Ben gerisini hallederim:
1. `.env`'i kontrol ederim (token dolu mu, placeholder değil mi)
2. **Canlı depoya** (stonebreaking.github.io) P0 düzeltmesini push ederim → `v=154`
3. **Stüdyo deposuna** (batupia-stonebreaking) hazır belgeler + görselleri push ederim
4. İkisini de canlıda doğrularım
5. Sonuç raporu veririm

> Token kullanılımı bittiğinde istersen GitHub'dan revoke edersin (Settings → Tokens → Delete).

---

## 🔗 ÖNEMLİ LİNKLER (bir daha arama yapmana gerek yok)

| Ne | Link |
|----|------|
| Token oluştur | https://github.com/settings/tokens/new |
| Stüdyo deposu | https://github.com/stonebreaking/batupia-stonebreaking |
| Canlı oyun deposu | https://github.com/stonebreaking/stonebreaking.github.io |
| Canlı oyun | https://stonebreaking.github.io/game.html |
| Giriş sayfası | https://stonebreaking.github.io/ |

---

## 🗂️ BEKLEYEN İŞLER (öncelik sırası) — canlı kayıt: GOREV_LISTESI.md

| Öncelik | İş | Durum |
|---------|----|-------|
| 🔴 | P0: Hemen Oyna sonrası tahta görünmüyor → v=154 push (canlı depo) | kod hazır, push bekliyor |
| 🔴 | Stüdyo deposuna ilk push (batupia-stonebreaking) | .env bekliyor |
| 🟠 | Canlı doğrulama: v=154 + Hemen Oyna → tahta görünüyor | sonra |
| 🟠 | Sürüm kayıtları surum.json → 1.5.4 | sonra |
| 🟡 | Kara/Mühür taş seti → TILE_VISUALS pipeline | kaynak set bekleniyor |
| 🟡 | 100 gerçek oturumla Bölüm 1–3 ölçümü | pilot bekliyor |
| 🟢 | Matematik V2, Zihin Haritası, QR'lı paylaşım kartı | ileride |

---

## 🔒 DEĞİŞMEZ KURALLAR (her zaman)

- Token sohbete, commit mesajına, rapora, dosya adına **asla** yazılmaz.
- `.env` gitignore'lu; GitHub'a **asla** gitmez.
- Push öncesi 12 madde denetimi + rapor + Patron onayı (28_DENETIM_PROTOKOLLERI).
- Mühürlü 22 varlık Patron onayı olmadan değişmez.
- Vita Mahjong yalnızca mekanik referansı; görsel/marka kopyalanmaz.
- Pay-to-win, enerji/can duvarı, otomatik oynayan ipucu yok.
- Her iş sonunda ANA_MANTIK.md ve GOREV_LISTESI.md güncellenir.

---

*"Bu daha başlangıç..."* — © 2026 Batuhan, BATUPIA Studios
