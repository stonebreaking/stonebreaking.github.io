# 🔱 STONEBREAKING UNIVERSE — VİZYON VE SAHNE HARİTASI
### PATRON BT v6.6 · Mühürlenmiş Vizyon Dokümanı
**Tarih:** 02.08.2026 · **Stüdyo:** BATUPIA Studios · **Kurucu:** Batuhan  
**Site:** https://stonebreaking.github.io/ · **Repo:** github.com/stonebreaking/stonebreaking.github.io  
**Son Commit:** `263f8e4` (v6.6)

---

## 🜂 MÜHÜR SİSTEMİ — AKTİF 🔒

| Mühür | Kimlik | Durum |
|-------|--------|-------|
| 🜁 STONEBREAKING Mühür | Ana marka mührü — tüm sahnelerde önde | ✅ Mühürlendi |
| 🜃 BATUPIA Mühür | İmza mührü — sadece credit/giriş | ✅ Mühürlendi |
| 🜄 Element Mühürleri | Ateş / Su / Toprak / Hava taş sembolleri | ✅ Mühürlendi |
| 🜂 Karakter Mühürleri | Kor / Baam / Mand / Zepy kimlikleri | ✅ Mühürlendi |

> **Mühür Kuralı:** STONEBREAKING önde, BATUPIA sadece imza. Hiçbir sahnede BATUPIA markası STONEBREAKING'den öne geçemez.

---

## 🎬 SAHNE SIRASI — TAM AKIŞ HARİTASI

```
┌─────────────────────────────────────────────────────────┐
│  SAHNE 0    SPLASH / LOADING (Açılış Yükleme)           │
│  SAHNE 1    GİRİŞ EKRANI (Ana Menü)                     │
│  SAHNE 2    K/E MASKOT SEÇİMİ (Kor vs Baam)             │
│  SAHNE 3    4 RUH SEÇİMİ (Element Seçimi)               │
│  SAHNE 4    12 BÖLÜM (Hikaye Modu)                      │
│  SAHNE 5    SONSUZ MOD (Bölüm 12 Sonrası)               │
└─────────────────────────────────────────────────────────┘
```

---

### 🎬 SAHNE 0 — SPLASH / LOADING EKRANI
**Referans Görsel:** `acilista_loading_ekrani.png`

| Özellik | Detay |
|---------|-------|
| **Konsept** | Oyun açılışında taş madalyon animasyonlu yükleme ekranı |
| **Mühür** | STONEBREAKING madalyon logo merkezde |
| **Animasyon** | Taş yüzeyinde çatlak → ışık sızması → mühür kırılışı |
| **Marka** | STONEBREAKING (büyük) + BATUPIA Studios (küçük, altta imza) |
| **Ses** | Derin taş yankısı + hafif nefes sesi |

---

### 🎬 SAHNE 1 — GİRİŞ EKRANI
**Referans Görseller:**  
- `06_GIRIS_EKRANI_MINIMAL_KONSEPTI.png` — Minimal versiyon
- `07_GIRIS_EKRANI_HIKAYE_HARITASI_KONSEPTI.png` — Hikaye haritası versiyonu  
- `07_GIRIS_EKRANI_HIKAYE_HARITASI_KONSEPTI_MUHUR_V2.png` — Mühürlü v2

| Özellik | Detay |
|---------|-------|
| **Konsept** | Ana menü — Maceraya Başla butonu + hikaye haritası arka plan |
| **Mühür** | STONEBREAKING logosu mühürlü, BATUPIA imzası altta |
| **Buton** | "Maceraya Başla" — taş dokulu, mühür kabartmalı |
| **Arka Plan** | Hikaye haritası (12 bölüm düğümleri, ilerleme çizgileri) |
| **Sonsuz Mod Girişi** | B12 tamamlanınca "Sonsuz Moda Gir" butonu burada belirir |

---

### 🎬 SAHNE 2 — K/E MASKOT SEÇİMİ (v6.6)
**Referans Görseller:**  
- `male_opt4.png` — Erkek karakter seçeneği
- `new_option5.png` — Karakter seçeneği alternatif
- `final_options_opt2.png` — Final seçenek
- `logo_batupia_muhurlu_2.png` — Mühürlü logo (kolye taşı gösterimi)

| Özellik | Detay |
|---------|-------|
| **Konsept** | 2 büyük anime portre YAN YANA |
| **Sol Taraf** | **KOR** — Erkek (ateş ruhu temsilcisi), soldan slide-in |
| **Sağ Taraf** | **BAAM** — Kadın (su ruhu temsilcisi), sağdan slide-in |
| **Ayırıcı** | Ortada dönen element ayracı + seçim dalgası animasyonu |
| **Mühür** | Seçim yapılınca mühür kolye belirir, kolye taşı parlar |
| **Stil** | Anime portre (v6.6 güncellemesi) |

---

### 🎬 SAHNE 3 — 4 RUH SEÇİMİ
**Referans Görseller:**  
- `secim_ekrani_4_ruh.png` — 4 ruh seçim ekranı
- `ates_06_lava_core.png` — Ateş taşı master (🔑 master referans)
- `tas_sembol_su_core.png` — Su taşı sembolü
- `tas_sembol_toprak_core.png` — Toprak taşı sembolü
- `tas_sembol_hava_core.png` + `tas_sembol_hava_1.png` — Hava taşı sembolleri
- `stonebreaker_female_ultimate.png` — Kadın Stonebreaker (ultimate)

| Ruh | Element | Cinsiyet | Renk Kodu | Taş Mühürü | Durum |
|-----|---------|----------|-----------|------------|-------|
| 🔥 **KOR** | Ateş | Erkek | `#ff6b35` | `ates_06_lava_core.png` | ✅ Mühürlü |
| 💧 **BAAM** | Su | Kadın | `#4ecdc4` | `tas_sembol_su_core.png` | ✅ Mühürlü |
| 🌍 **MAND** | Toprak | **Kadın** (+ erkek versiyon) | `#c4a35a` | `tas_sembol_toprak_core.png` | ✅ Mühürlü |
| 💨 **ZEPY** | Hava | — | `#a8d8ea` | `tas_sembol_hava_core.png` | ✅ Mühürlü |

> **⚠️ Mühür Kuralı:** Mand = KADIN savaşçı (golem DEĞİL). Erkek versiyonu da var ama ana karakter kadın.  
> **⚠️ Mühür Kuralı:** Toprak ve Hava karakterleri henüz anime portreye ÇEKİLMEDİ — sıradaki işlerden.

---

### 🎬 SAHNE 4 — 12 BÖLÜM (HİKAYE MODU)
**Referans Görseller:**  
- `07_GIRIS_EKRANI_HIKAYE_HARITASI_KONSEPTI.png` — Harita genel görünüm
- `logo_stonebreaking_muhur.png` — Bölüm mühürleri

| Özellik | Detay |
|---------|-------|
| **Konsept** | Triple-Match Mahjong + hikaye + IQ |
| **Yapı** | 12 bölüm, her bölümde düğüm noktası |
| **Diyalog** | `04_HIKAYE_EVREN/12_bolum_sinematik_diyalog.md` dosyasında |
| **Mühür** | Her bölüm sonunda mühür kırılışı animasyonu |
| **Geri Bildirim** | Good/Great/Perfect **YASAK** → Nefes Al / Mühür Kır / Evren Nefesi |

---

### 🎬 SAHNE 5 — SONSUZ MOD
**Referans Görsel:** `sprite_sonsuz_mod_stonebreaking.png`

| Özellik | Detay |
|---------|-------|
| **Giriş** | Bölüm 12 tamamlandıktan sonra açılır |
| **Mekanik** | Dalga bazlı (wave-based), zorluk artan |
| **Splash** | Sonsuz mod splash ekranı ayrı |
| **Mühür** | Sonsuz mod mührü — sınırsız zincir |

---

## 🪨 TAŞ ANAYASASI — MÜHÜRLÜ KURALLLAR

| Kural | Detay |
|-------|-------|
| **Şekil** | Kare taş |
| **Format** | Şeffaf PNG (RGBA) |
| **Sembol Oranı** | Yüzeyin ~%60'ı |
| **Grid** | Sıkı grid sistemi |
| **Master Referans** | `ates_06_lava_core.png` 🔑 |
| **Tip Sayısı** | 12 tip (core + _2 + _3 varyantları) |
| **Layout** | Yığın bazlı = **GARANTİ çözülebilir** (çıkmaz YOK) |

---

## 🎯 GERİ BİLDİRİM SÖZLÜĞÜ — MÜHÜRLÜ

| ❌ YASAK | ✅ KULLANILACAK |
|----------|----------------|
| Good | **Nefes Al** |
| Great | **Mühür Kır** |
| Perfect | **Evren Nefesi** |

---

## 📋 SIRADAKİ İŞLER (Öncelik Sırasına Göre)

| # | İş | Durum |
|---|-----|-------|
| 1 | Yeni toprak karakterlerini oyuna bağlama (skin/maskot?) | ⏳ Karar bekliyor |
| 2 | Ruh seçim ekranını anime düzenine çekme (4 ruh yan yana) | ⏳ Beklemede |
| 3 | Mand/Zepy portrelerini anime stiline çekme | ⏳ Beklemede |
| 4 | Sahne görsellerinde BATUPIA temizliği (tur 3) | ⏳ Beklemede |
| 5 | Google OAuth (Patron Client ID verince) | ⏳ Patron bekleniyor |
| 6 | Storyboard → video/Lottie | ⏳ Beklemede |

---

## 🔐 GÜVENLİK MÜHÜRÜ

- Token push sonrası **SİL** + revoke öner
- `.env` gitignore'da
- **GITHUB TEK YEDEK** — workspace `.git` oturumlar arası kaybolur
- Yedek protokolü: `git init -b main` → remote ekle → `fetch` → `reset --mixed origin/main`

---

## 📁 REFERANS GÖRSEL ENVANTERİ (Mühürlü)

| # | Dosya Adı | Sahne Eşleştirmesi | Mühür Durumu |
|---|-----------|-------------------|--------------|
| 1 | `acilista_loading_ekrani.png` | SAHNE 0 — Splash | ✅ |
| 2 | `06_GIRIS_EKRANI_MINIMAL_KONSEPTI.png` | SAHNE 1 — Giriş (minimal) | ✅ |
| 3 | `07_GIRIS_EKRANI_HIKAYE_HARITASI_KONSEPTI.png` | SAHNE 1 — Giriş (harita) | ✅ |
| 4 | `07_GIRIS_EKRANI_HIKAYE_HARITASI_KONSEPTI_MUHUR_V2.png` | SAHNE 1 — Giriş (mühürlü v2) | ✅ |
| 5 | `male_opt4.png` | SAHNE 2 — K/E Seçim (erkek) | ✅ |
| 6 | `new_option5.png` | SAHNE 2 — K/E Seçim (alternatif) | ✅ |
| 7 | `final_options_opt2.png` | SAHNE 2 — K/E Seçim (final) | ✅ |
| 8 | `logo_batupia_muhurlu_2.png` | Mühür — BATUPIA kolye taşı | ✅ |
| 9 | `logo_batupia_muhurlu_2 (1).png` | Mühür — BATUPIA kolye taşı (kopya) | ✅ |
| 10 | `logo_stonebreaking_muhur.png` | Mühür — STONEBREAKING | ✅ |
| 11 | `secim_ekrani_4_ruh.png` | SAHNE 3 — 4 Ruh Seçimi | ✅ |
| 12 | `ates_06_lava_core.png` | SAHNE 3 — Ateş taşı MASTER 🔑 | ✅ |
| 13 | `tas_sembol_su_core.png` | SAHNE 3 — Su taşı sembolü | ✅ |
| 14 | `tas_sembol_toprak_core.png` | SAHNE 3 — Toprak taşı sembolü | ✅ |
| 15 | `tas_sembol_hava_core.png` | SAHNE 3 — Hava taşı sembolü | ✅ |
| 16 | `tas_sembol_hava_1.png` | SAHNE 3 — Hava taşı varyant | ✅ |
| 17 | `stonebreaker_female_ultimate.png` | Karakter — Kadın Stonebreaker | ✅ |
| 18 | `sprite_sonsuz_mod_stonebreaking.png` | SAHNE 5 — Sonsuz Mod sprite | ✅ |

---

*🔱 PATRON BT v6.6 — Mühürlenmiş Vizyon Dokümanı · Tüm hakları saklıdır · BATUPIA Studios*  
*Bu doküman sonraki oturumlara devredilebilir. Mühür sistemi aktiftir — sıralama ve kimlikler korunur.* ✅
