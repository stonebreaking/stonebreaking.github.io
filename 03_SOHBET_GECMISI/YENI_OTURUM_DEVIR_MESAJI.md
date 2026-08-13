# 🔥 PATRON BT — YENİ OTURUM DEVİR MESAJI (v9.1)

**Tarih:** 03.08.2026 · **Sürüm:** v9.1 (`09dd4da`) · **Patron:** Batuhan / BATUPIA Studios
**Canlı:** https://stonebreaking.github.io/ · **Repo:** https://github.com/stonebreaking/stonebreaking.github.io
**Son Push:** `09dd4da` — GitHub'da ✅

---

## 🎨 EVREN ÇİZİM TARZI (KRİTİK — DEĞİŞTİRME)

**STONEBREAKING evreninin çizim tarzı:** `uploads/sss.png` referans görselindeki gibi —
temiz anime çizgiler, canlı renkler, cel-shaded, premium anime.
Bu tarz evrenin resmi çizim tarzıdır. Tüm karakter ve sahne görselleri bu tarza uygun olmalıdır.

### ⚠️ KRİTİK: AI Görsel Üretim Sınırı
- AI görsel üretimi spesifik çizim tarzını/çizgileri kaybediyor — bu KABUL EDİLDİ
- Karakter saçları yeniden çizimde bozuluyor, kullanıcı kabul etti: "saçı boşver artık bu kadar olmuyormuş"
- Mevcut ONAYLANMIŞ görselleri yeniden üretmeye çalışma, sadece sahnelerini değiştir

---

## 📌 PATRON BT SİSTEMİ

- **Batuhan** = CEO of BATUPIA Studios
- **PATRON BT** = teknik partner, otonom karar verir
- **GitHub TEK yedek** — workspace `.git` dizini oturumlar arası siliniyor
- **Kurtarma:** `git init -b main && git remote add origin https://github.com/stonebreaking/stonebreaking.github.io.git && git fetch origin main && git reset --mixed origin/main && git checkout origin/main -- .`
- **Push sonrası:** GITHUB_TOKEN remote URL'den SİL, .env commit ETME
- **GITHUB_TOKEN:** Push için kullanılır, her push sonrası remote URL'den silinir (oturum başında verilecek)
- Kullanıcı Türkçe konuşur, Türkçe yanıt ver
- "patron bt" = otonom kontrol

---

## 📌 MARKA KURALLARI

- **Oyun:** STONEBREAKING (tekil, çoğul DEĞİL)
- **Şirket:** BATUPIA Studios (küçük imza sadece)
- **Element renkleri:** Ateş #ff6b35, Su #4ecdc4, Toprak #c4a35a, Hava #a8d8ea
- **Taş anayasa:** Kare taş, transparent PNG, master `ates_06_lava_core.png`
- **Mühür sembolü:** ◆ (elmas/diamond) — TÜM evrende kullanılır

---

## 🎮 OYUN AKIŞI

```
BATUPIA Intro (SAHNE -1) → 3s wait → goScreen('screen-splash') → playSplashCinematic()
  ↓
Splash (SAHNE 0) → sinematik → Maceraya Başla butonu
  ↓
Karakter Seçimi (SAHNE 2) → 3 sinematik sahne sistemi — Erkek / Kadın Stonebreaker
  ↓
Ruh Seçimi (SAHNE 3) → 4 ruh kartı (Kor, Baam, Mand, Zepy) — sinematik görseller
  ↓
Oyun (SAHNE 4) → goScreen → resize → newGame → startLoop
```

### ÖNEMLİ: Karakter vs Ruh Ayrımı
- **Karakterler = STONEBREAKER** — Erkek ve Kadın, tüm elementlerin kırıcısı
- **Ruhlar = Kor, Baam, Mand, Zepy** — element ruhları
- **Erkek ruhlar:** Kor (Ateş) + Mand (Toprak)
- **Kadın ruhlar:** Baam (Su) + Zepy (Hava)
- Karakter seçiminde Kor/Baam isimleri YOK — sadece "ERKEK" ve "KADIN" Stonebreaker

---

## 🖼️ KARAKTER KİMLİKLERİ (ONAYLANDI — YENİDEN ÜRETME)

### Erkek Stonebreaker
- **Saç:** Kısa military tarzı, kumral/koyu kahverengi
- **Göz:** Bal köpüğü amber (#ffd194 tonları)
- **Kolye:** Volkanik taş madalyon, ◆ mühür, 4 element renkli çatlak
- **Unvan:** ◈ Taşın Oğlu · Mühür Kırıcı ◈

### Kadın Stonebreaker
- **Saç:** Omuz hizası kumral saç, hafif dalgalı
- **Göz:** Bal köpüğü amber (#ffd194 tonları)
- **Kolye:** Volkanik taş madalyon, ◆ mühür (erkekle aynı)
- **Unvan:** ◈ Taşın Kızı · Mühür Kırıcı ◈

### Ruhlar (Mühürlü Anime)
- **Kor** 🔥 Erkek — spiky crimson-red saç, ateş zırhı, ◆ mühür göğüsünde, volkanik krater sahnesi
- **Baam** 🌊 Kadın — flowing teal-blue saç, su rahibe cübbesi, ◆ mühür göğsünde, okyanus sahnesi
- **Mand** 🪨 Erkek — short earth-brown saç, kristal-taş zırh, ◆ mühür göğsünde, kristal mağara sahnesi
- **Zepy** 💨 Kadın — flowing light-blue saç, rüzgar rahibe cübbesi, ◆ mühür göğsünde, gökyüzü tapınağı sahnesi

---

## 📁 ÖNEMLİ DOSYALAR

### Ana Dosyalar
- `index.html` — Ana oyun dosyası (2300+ satır), inline CSS, tüm ekranlar, JS controller
- `css/animasyon.css` — Animasyon keyframes, `.screen !important` kuralları
- `js/game.js` — Oyun motoru: StonebreakingGame class
- `js/ses.js` — Element temalı ses sistemi v2

### Karakter Seçim Görselleri (3 sinematik sahne sistemi)
- `06_GRAFIK/sinematik_01_ikili_tapinak.png` — Varsayılan: iki Stonebreaker kadim tapınakta
- `06_GRAFIK/sinematik_02_erkek_volkanik.png` — Erkek hover/seçim: volkanik zirve
- `06_GRAFIK/sinematik_03_kadin_okyanus.png` — Kadın hover/seçim: okyanus derinlikler
- `06_GRAFIK/erkek_stonebreaker_anime.png` — Erkek portre (eski, yedek)
- `06_GRAFIK/kadin_stonebreaker_anime.png` — Kadın portre (eski, yedek)
- `06_GRAFIK/stonebreaker_ikili_sinematik.png` — Eski ikili sahne (yedek)

### Ruh Seçim Görselleri (4 sinematik sahne)
- `06_GRAFIK/ruh_kor_ates_sinematik.png` — Kor ateş sahnesi (768x1376)
- `06_GRAFIK/ruh_baam_su_sinematik.png` — Baam su sahnesi (768x1376)
- `06_GRAFIK/ruh_mand_toprak_sinematik.png` — Mand toprak sahnesi (768x1376)
- `06_GRAFIK/ruh_zepy_hava_sinematik.png` — Zepy hava sahnesi (768x1376)

### Eski Ruh Görselleri (hala HUD/profil'de kullanılıyor)
- `06_GRAFIK/kor_ates_ruhu.png` — Kor (HUD chip-img, prof-avatar, skin)
- `06_GRAFIK/baam_su_ruhu.png` — Baam
- `06_GRAFIK/mand_toprak_ruhu_erkek.png` — Mand (skin-default)
- `06_GRAFIK/zepy_hava_ruhu.png` — Zepy

### Diğer
- `06_GRAFIK/kolye_stonebreaker_muhur.png` — Kolye madalyon tasarımı
- `06_GRAFIK/stonebreaking_3D_muhur.png` — 3D logo
- `06_GRAFIK/STONEBREAKER_KIMLIKLERI.md` — Karakter kimlik dosyası
- `uploads/sss.png` — **EVREN ÇİZİM TARZI REFERANSI** (değiştirme!)

---

## 🎨 KARAKTER SEÇİM EKRANI (v9.0 — TAMAMLANDI)

### 3 Sinematik Sahne Sistemi
- **Varsayılan:** İkili tapınak sahnesi (`sinematik_01_ikili_tapinak.png`)
- **Sol hover:** Erkek volkanik (`sinematik_02_erkek_volkanik.png`)
- **Sağ hover:** Kadın okyanus (`sinematik_03_kadin_okyanus.png`)
- **Seçim:** Seçilen karakterin sahnesi tam ekran

### CSS Detayları
- Element renkli: Erkek=#ff6b35 (Ateş), Kadın=#4ecdc4 (Su)
- Orta çizgi: element gradient (ateş→su) + ◆ mühür rozet
- Mühür rozetleri: element renklerinde (ateş turuncu, su teal)
- İsim etiketleri: element renkli glow
- Kadim taş plaket butonları (btn-seal stili)
- `data-mascot="erkek"` / `data-mascot="kadin"` (Kor/Baam DEĞİL)

---

## 🎨 RUH SEÇİM EKRANI (v9.1 — TAMAMLANDI)

### 4 Sinematik Ruh Görseli
- Kor: erkek, ateş, volkanik krater, ◆ mühür göğüsünde
- Baam: kadın, su, okyanus derinlikler, ◆ mühür göğsünde
- Mand: erkek, toprak, kristal mağara, ◆ mühür göğsünde
- Zepy: kadın, hava, gökyüzü tapınağı, ◆ mühür göğsünde

### CSS Detayları
- 4 element gradient arka plan (radial-gradient)
- Element renkli mühür rozetleri (◆ sembolü)
- Element accent değişkenleri (--accent)
- Ruh sözleri (spirit-quote-inline) seçimde açılır
- btn-seal butonları (Geri / Maceraya Gir)
- Başlık: 4 element renkli text-shadow + ◆ mühür alt detay

### ⚠️ Eski görseller hala HUD/profil'de kullanılıyor
- `chip-img` ve `prof-avatar` hala `06_GRAFIK/kor_ates_ruhu.png` kullanıyor
- `skin-default` hala `06_GRAFIK/mand_toprak_ruhu_erkek.png` kullanıyor
- Bunlar yeni sinematik görsellerle değiştirilmeli (ileri dönem)

---

## 📌 SİYAH EKRAN (BLACK SCREEN) — 3 Aşamalı Çözüm

1. `visibility: hidden`/`visible` → CSS transition'dan kaldırıldı
2. `display: none`/`flex` → CSS transition ile çalışmıyor, kaldırıldı
3. Browser cache → `!important` inline `<style>` kuralları + CSS cache buster `?v=85`

### Inline `.screen` kuralları (index.html `<style>` bloğunda):
```css
.screen { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; overflow: hidden !important; opacity: 0 !important; pointer-events: none !important; z-index: 0 !important; visibility: visible !important; display: flex !important; transition: none !important; }
.screen.active { opacity: 1 !important; pointer-events: auto !important; z-index: 20 !important; visibility: visible !important; display: flex !important; }
.screen.exit { opacity: 0 !important; pointer-events: none !important; z-index: 10 !important; visibility: visible !important; display: flex !important; }
```

---

## ✅ TAMAMLANAN (v8.0—v9.1)

- Karakter seçim: 3 sinematik sahne sistemi (ikili tapınak / erkek volkanik / kadın okyanus)
- Ruh seçim: 4 sinematik ruh görseli (Kor/Baam/Mand/Zepy, ◆ mühürlü)
- Element renkli tasarım: ateş #ff6b35, su #4ecdc4, toprak #c4a35a, hava #a8d8ea
- Orta çizgi element gradient (ateş→su) + ◆ mühür
- Element renkli mühür rozetleri (◆ sembolü)
- Kadim taş plaket butonları (btn-seal)
- Kolye madalyon tasarımı
- 3D logo (element renkleri, ◆ mühür)
- CSS cache buster `?v=85`
- `css/animasyon.css` .screen !important kuralları
- startGame() sequence fix
- Element-themed sound system v2
- Smart Solver v2 (44/44 tests)
- Sonsuz mod difficulty curve

## ❌ ÇÖZÜLMEMİŞ / İLERİ DÖNEM

1. **Black screen after BATUPIA intro** — hala raporlanıyor, cache sorunu olabilir
2. **HUD/profil eski görseller** — chip-img, prof-avatar, skin-default hala eski ruh görselleri kullanıyor, yeni sinematik görsellerle değiştirilmeli
3. **Ortak sinematik sahne** — 4 ruhun birlikte olduğu tek bir sinematik sahne görseli (ruh_4lu_sinematik.png) henüz üretilmedi — üretim kesintiye uğradı
4. **Maceraya Başla butonu** — kadim taş plaket stilinde görünmüyor olabilir
5. **Oyun içi test** — splash → karakter → ruh → oyun tam akış testi
