# 🔥 PATRON BT — YENİ OTURUM DEVİR MESAJI (v7.3)

**Tarih:** 02.08.2026 · **Sürüm:** v7.3 (`4a1b440`) · **Patron:** Batuhan / BATUPIA Studios
**Canlı:** https://stonebreaking.github.io/ · **Repo:** https://github.com/stonebreaking/stonebreaking.github.io
**Son Push:** `4a1b440` — GitHub'da ✅

---

## 🚨 İLK OKU — KRİTİK KURALLAR

### Yedek Protokolü (Mühürlü)
1. Workspace `.git` klasörü oturumlar arası SİLİNİYOR
2. Kurtarma: `git init -b main && git remote add origin https://github.com/stonebreaking/stonebreaking.github.io.git && git fetch origin main && git reset --mixed origin/main && git checkout origin/main -- .`
3. TÜM YEDEKLER SADECE GITHUB'DA — workspace'de kalıcı değil
4. Her iş bitince: Patron'dan GITHUB_TOKEN iste → push → token sil
5. `01_GIZLI/.env` asla commit edilmez

### Marka Kuralları
- Oyun: **STONEBREAKING** · Şirket: **BATUPIA Studios** (küçük imza)
- Element renkleri: Ateş #ff6b35 · Su #4ecdc4 · Toprak #c4a35a · Hava #a8d8ea
- Taş anayasası: Kare taş, şeffaf PNG, master `ates_06_lava_core.png`

---

## 📋 OTURUM #6 ÖZETİ — YAPILANLAR

### 1. BATUPIA Intro (SAHNE -1) Sinema Sahnesi
- Logo 80px → 220px büyütüldü
- Arka plan güçlü radial gradient + çift katmanlı glow
- Studio adı ve alt yazı büyütüldü

### 2. Splash (SAHNE 0) STONEBREAKING Yazı-Buton Çakışması
- Floating redundant STONEBREAKING yazısı kaldırıldı (`display:none !important`)
- Logo görselinde zaten yazıyor — butonu kapatıyordu
- Buton küçültüldü: 14px/32px padding, 0.92rem font
- Logo 220px, buton net aşağıda

### 3. SİYAH EKRAN KÖKTEN ÇÖZÜM (3 aşamada bulundu)

**Sorunun gerçek kaynağı sırayla:**

| Aşama | Sorun | Çözüm |
|-------|-------|-------|
| 1 | `visibility: hidden` → `visible` transition 0.7s bekletiyordu | `visibility` kaldırıldı |
| 2 | `display: none` → `display: flex` geçişinde CSS transition çalışmıyor, opacity 0'da kalıyordu | `display: none`/`flex` kaldırıldı |
| 3 | CSS dosyası tarayıcı cache'inden eski sürümü sunuyordu | `.screen` kuralları inline `<style>` bloğuna eklendi |

**Mevcut .screen sistemi (KESİN ÇÖZÜM):**
```css
/* INLINE — index.html <style> içinde, CSS dosyasından ÖNCELİKLİ */
.screen { position: fixed; inset: 0; width: 100%; height: 100%; overflow: hidden; opacity: 0; pointer-events: none; z-index: 0; }
.screen.active { opacity: 1; pointer-events: auto; z-index: 20; }
.screen.exit { opacity: 0; pointer-events: none; z-index: 10; }
```
- **display: none YOK** — tüm screen'ler her zaman DOM'da, `display: flex` ID bazlı
- **visibility YOK** — opacity + z-index + pointer-events ile yönetim
- **transition YOK** — anında görünür/kaybolur, siyah ekran riski %0

### 4. startGame() Sıralama Düzeltmesi
```javascript
// ESKİ (bozuk): game.startLoop() → goScreen() → playChapterTransition() → game.newGame()
// Tahta boşken canvas çiziliyordu = siyah/koyu ekran

// YENİ (düzeltildi): goScreen() → 2 frame bekle → resize() → newGame() → resize() → startLoop()
// DOM yerleşince canvas boyutlanır, sonra oyun başlar
```

### 5. Element Temalı Ses Sistemi v2
- Her elementin (Ateş/Su/Toprak/Hava) kendi frekans haritası
- `StoneSound.breath(combo, element)` — elemente göre nefes sesi
- `StoneSound.win(element)` — elemente göre zafer fanfarı
- `StoneSound.chapterReveal(element)` — bölüm geçiş sinematik sesi

### 6. Sonsuz Mod Zorluk Eğrisi
- Dalga arttıkça tahta büyür (wave faktörü)
- Güçler dengeli artar (her 3 dalga'da ekstra ipucu/geri al)
- maxTiles 72'ye kadar çıkar

### 7. Smart Solver v2
- Yığın bazlı eşleştirme, 2-tepsi-öncelik stratejisi
- 44/44 test, 1.8 saniyede sıfır hata

### 8. playStudioIntro() Düzeltmesi
- `intro.style.display = 'none'` kaldırıldı
- `goScreen('screen-splash')` kullanılıyor — tutarlı geçiş

### 9. Bölüm Geçiş Sinematiği Güçlendirildi
- Portre 128px, çift katmanlı glow (40px+80px)
- Element gradyan arka plan

---

## 📁 DOSYA YAPISI (ÖNEMLİ)

```
index.html        ← TÜM inline CSS + JS controller (2280+ satır)
css/animasyon.css ← Animasyonlar + @keyframes (sinematik, partikül, vb.)
js/game.js        ← Motor: StonebreakingGame class, layout, tahta, draw
js/ses.js         ← Element temalı ses sistemi v2
test/motor_smoke_test.js ← Smart solver smoke test (44/44)
```

---

## ⚠️ BİLİNEN SORUNLAR / DİKKAT

1. **GitHub Pages deploy 1-3 dakika sürebilir** — push sonrası hemen test etme
2. **Tarayıcı cache** — test için gizli sekme (incognito) kullan
3. **CSS dosyası cache riski** — `.screen` kuralları inline olduğundan bypass edildi
4. **Splash sinematik**: `splashPlayed` flag ile sadece ilk girişte oynar, geri dönüşte direkt logo+buton

---

## 📋 SIRADAKİ İŞLER (PATRON BT ÖNCELİĞİ)

1. **Google OAuth gerçek bağlantı** — Client ID verilince aktif
2. **Storyboard entegrasyonu** — Çizgi film sinematikleri
3. **Ses genişletme** — Bölüm diyalogları seslendirme
4. **mahjong_evren_taslari.jpg referans** — Oyun içi görsellere uygula
5. **Kart revizyon turu 2** — Maskot K/E net referans
6. **Ana menü büyük BATUPIA temizliği**

---

## 🎮 OYUN AKIŞI (MÜHÜRLENMİŞ)

```
BATUPIA Intro (SAHNE -1) → 3s bekle → goScreen('screen-splash')
  ↓
Splash (SAHNE 0) → sinematik → Maceraya Başla butonu
  ↓
Karakter Seçimi (SAHNE 2) → Kor erkek / Baam kadın, slide-in
  ↓
Ruh Seçimi (SAHNE 3) → 4 ruh kartı, element renkleri
  ↓
Oyun (SAHNE 4) → goScreen → resize → newGame → startLoop
  ↓
Zafer → Sonraki Bölüm / Sonsuz Mod
```

---

## 🔐 GÜVENLİK

- Token push sonrası SİLİNİR — remote URL'den temizlenir
- `.env` asla commit edilmez — `.gitignore` koruyor
- Repo'da token yok — grep ile denetlendi

---

*PATRON BT v7.3 — 02.08.2026 Devir Mesajı Mühürlendi. GITHUB TEK YEDEK.* ✅
