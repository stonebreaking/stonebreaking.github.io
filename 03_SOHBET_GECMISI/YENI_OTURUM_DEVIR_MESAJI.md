# 🔥 PATRON BT — YENİ OTURUM DEVİR MESAJI (v8.12)

**Tarih:** 03.08.2026 · **Sürüm:** v8.12 (`01a0984`) · **Patron:** Batuhan / BATUPIA Studios
**Canlı:** https://stonebreaking.github.io/ · **Repo:** https://github.com/stonebreaking/stonebreaking.github.io
**Son Push:** `01a0984` — GitHub'da ✅

---

## 🎨 EVREN ÇİZİM TARZI (KRİTİK — DEĞİŞTİRME)

**STONEBREAKING evreninin çizim tarzı:** `uploads/sss.png` referans görselindeki gibi —
temiz anime çizgiler, canlı renkler, cel-shaded, çocuk animasyonu tarzı değil ama premium anime.
Bu tarz evrenin resmi çizim tarzıdır. Tüm karakter ve sahne görselleri bu tarza uygun olmalıdır.

### Karakter Onayları
- **Kadın Stonebreaker:** ✅ ONAYLANDI — `stonebreaker_ikili_sinematik.png` içindeki kadın karakter mükemmel
- **Erkek Stonebreaker:** ✅ ONAYLANDI — kısa military saç, kumral, bal köpüğü göz, 5 o'clock shadow
- **Kolye Madalyon:** ✅ ONAYLANDI — `kolye_stonebreaker_muhur.png` — volkanik taş, ◆ mühür, 4 element renkli çatlak

---

## 📌 KRİTİK BİLGİLER

### Black Screen (SİYAH EKRAN) — 3 Aşamalı Çözüm
1. `visibility: hidden`/`visible` → CSS transition'dan kaldırıldı
2. `display: none`/`flex` → CSS transition ile çalışmıyor, kaldırıldı
3. Browser cache → `!important` inline `<style>` kuralları + CSS cache buster `?v=82`

### Inline `.screen` kuralları (index.html `<style>` bloğunda):
```css
.screen { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; overflow: hidden !important; opacity: 0 !important; pointer-events: none !important; z-index: 0 !important; visibility: visible !important; display: flex !important; transition: none !important; }
.screen.active { opacity: 1 !important; pointer-events: auto !important; z-index: 20 !important; visibility: visible !important; display: flex !important; }
.screen.exit { opacity: 0 !important; pointer-events: none !important; z-index: 10 !important; visibility: visible !important; display: flex !important; }
```

### Marka Kuralları
- **Oyun:** STONEBREAKING (tekil, çoğul DEĞİL)
- **Şirket:** BATUPIA Studios (küçük imza sadece)
- **Element renkleri:** Ateş #ff6b35, Su #4ecdc4, Toprak #c4a35a, Hava #a8d8ea
- **Taş anayasa:** Kare taş, transparent PNG, master `ates_06_lava_core.png`
- **Mühür sembolü:** ◆ (elmas/diamond)

---

## 🎮 OYUN AKIŞI

```
BATUPIA Intro (SAHNE -1) → 3s wait → goScreen('screen-splash') → playSplashCinematic()
  ↓
Splash (SAHNE 0) → sinematik → Maceraya Başla butonu
  ↓
Karakter Seçimi (SAHNE 2) → İKİLİ SİNEMATİK SAHNE — Erkek / Kadın Stonebreaker
  ↓
Ruh Seçimi (SAHNE 3) → 4 ruh kartı (Kor, Baam, Mand, Zepy)
  ↓
Oyun (SAHNE 4) → goScreen → resize → newGame → startLoop
```

### ÖNEMLİ: Karakter vs Ruh Ayrımı
- **Karakterler = STONEBREAKER** — Erkek ve Kadın, tüm elementlerin kırıcısı
- **Ruhlar = Kor, Baam, Mand, Zepy** — element ruhları, SADECE ruh seçiminde
- Karakter seçiminde Kor/Baam isimleri YOK — sadece "ERKEK" ve "KADIN" Stonebreaker

---

## 📁 ÖNEMLİ DOSYALAR

- `index.html` — Ana oyun dosyası (2300+ satır), inline CSS, tüm ekranlar, JS controller
- `06_GRAFIK/erkek_stonebreaker_volkanik.png` — Erkek Stonebreaker volkanik sahne (v8.12)
- `06_GRAFIK/kadin_stonebreaker_okyanus.png` — Kadın Stonebreaker okyanus sahne (v8.12)
- `06_GRAFIK/stonebreaker_ikili_sinematik.png` — Eski ikili sinematik sahne (yedek)
- `06_GRAFIK/kolye_stonebreaker_muhur.png` — Kolye madalyon tasarımı
- `06_GRAFIK/stonebreaking_3D_muhur.png` — 3D logo (element renkleri evrene uyarlanmış, ◆ mühür merkeze)
- `css/animasyon.css` — Animasyon keyframes, `.screen !important` kuralları
- `js/game.js` — Oyun motoru: StonebreakingGame class
- `js/ses.js` — Element temalı ses sistemi v2
- `uploads/sss.png` — **EVREN ÇİZİM TARZI REFERANSI** (değiştirme!)
- `uploads/stonebreaker_male.png` — Erkek saç referansı

---

## ✅ TAMAMLANAN (v8.0-v8.10)

- Karakter seçim ekranı: İKİLİ SİNEMATİK SAHNE (yan yana bölünmüş DEĞIL)
- Erkek Stonebreaker: kısa military saç, bal köpüğü göz, kolyeli
- Kadın Stonebreaker: omuz hizası kumral saç, bal köpüğü göz, kolyeli
- STONEBREAKING evren çizim tarzı belirlendi (sss.png referansı)
- Kolye madalyon tasarımı (volkanik taş, ◆ mühür, 4 element renkli çatlak)
- 3D logo: element renkleri evrene uyarlandı, ◆ mühür merkeze eklendi
- Canlı ruh evreni: element enerji akımları, yüzen runalar, parçacık efektleri
- Sinematik CSS: charReveal, charSelectionPulse, badgeReveal animasyonları
- `.char-pick-zone` sol/sağ tıklama alanı
- `.char-label-item` alt bilgi paneli (isim, unvan, söz)
- Kadim taş plaket butonları (btn-seal stili)
- CSS cache buster `?v=82`
- `css/animasyon.css` .screen !important kuralları
- v8.12: Karakter seçim — iki ayrı sinematik sahne (volkanik + okyanus)
- v8.12: CSS clip-path ile yarı yarıya bölünmüş görünüm
- v8.12: Hover efektleri — tam sahne geçişi (clip-path animasyonu)
- v8.12: Seçim — seçilen karakterin sahnesi tam ekran

## ❌ ÇÖZÜLMEMİŞ

- Black screen after BATUPIA intro hala raporlanıyor — cache sorunu olabilir
- Splash butonu (Maceraya Başla) kadim taş plaket stilinde görünmüyor olabilir
- Ruh seçimi ekranı henüz yeni anime tarzına uyarlanmadı

---

## 🔄 PATRON BT SİSTEMİ

- Batuhan = CEO, PATRON BT = teknik partner
- GitHub TEK yedek — workspace `.git` siliniyor oturumlar arası
- Kurtarma: `git init -b main && git remote add origin https://github.com/stonebreaking/stonebreaking.github.io.git && git fetch origin main && git reset --mixed origin/main && git checkout origin/main -- .`
- Push sonrası: GITHUB_TOKEN remote URL'den sil, .env commit etme
- Kullanıcı Türkçe konuşur, Türkçe yanıt ver
- "patron bt" = otonom kontrol
