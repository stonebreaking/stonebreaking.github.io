# 🔥 PATRON BT MÜHÜRÜ — RESMİ AÇILIŞ & SONRASI

**Mühürleyen:** AI Teknik Ortak (PATRON BT)  
**Patron:** Batuhan · BATUPIA Studios  
**Tarih:** 01.08.2026  
**Durum:** MÜHÜRLENDİ — sonraki konuşma için bağlayıcı talimat  
**Versiyon:** v6.0 Yol Haritası

---

## 1. PATRON EMRİ (Özet)

1. Görsel hedefe yakınız; push için **token istenecek**.
2. Resmi açılış sonrası yapılacaklar peşinen mühürlendi.
3. Kartlarda **STONEBREAKING** + **kadın/erkek maskot** referanslı; karakter bütünlüğü.
4. Tüm sembol / element / simge / **taşlar** aynı kurala bağlı.
5. Açılış: BATUPIA Studio “dokun-hisset” — **büyük yazı yok**, sadece **STONEBREAKING mühürlü logo** + uygun yerde **Maceraya Başla**.
6. Akış: Logo → Maceraya Başla → Karakter (K/E) → Ruh → o ruhun hikâyesi → **12 bölüm** → sonsuz varyant.
7. Sinematik sahneler + animasyon = **kendi çizgi filmimiz**.
8. Profil: **nick** + kullanıcı profili + **Google / Gmail giriş** (iskelet + ileride OAuth).
9. **`ates_06_lava_core.png`** = **TÜM taşların master gövde referansı**; iç sembol elemente göre değişir, gövde mühürlenir.

---

## 2. TAŞ MASTER STANDARDİ (KRİTİK)

| Alan | Kural |
|------|--------|
| Master dosya | `06_GRAFIK/ates_06_lava_core.png` |
| Gövde | Kalın kare 3D taş, metal rune çerçeve, çatlak ışıltı |
| Değişen | **Sadece merkez rune + element rengi/malzeme** |
| Yasak | Büyük BATUPIA yazısı taş yüzünde; rastgele stil sapması |
| Renkler | Ateş `#ff6b35` · Su `#4ecdc4` · Toprak `#c4a35a` · Hava `#a8d8ea` |

### Core set (v6)
| Dosya | Element |
|-------|---------|
| `ates_06_lava_core.png` / `tas_sembol_ates_core.png` | Ateş master |
| `tas_sembol_su_core.png` | Su (aynı gövde) |
| `tas_sembol_toprak_core.png` | Toprak |
| `tas_sembol_hava_core.png` | Hava |

Motor önceliği: `*_core.png` → yoksa eski `*_1/_2`.

Varyant 2–3: aynı gövde, farklı merkez rune (kılıç, trident, balta, tüy…).

---

## 3. KARAKTER & KART BÜTÜNLÜĞÜ

| Karakter | Maskot / rol | Element | Bütünlük |
|----------|--------------|---------|----------|
| **Kor** | Erkek oyuncu referansı | Ateş | Alev saç, volkanik zırh, cesur |
| **Baam** | Kadın oyuncu referansı | Su | Dalga saç, mercan taç, bilge |
| **Mand** | Toprak ruhu (golem) | Toprak | Kristal granit, sabır |
| **Zepy** | Hava ruhu (eterik) | Hava | Tüy/bulut, özgür |

### Koleksiyon kartı kuralı (revize devam)
- Üstte küçük **STONEBREAKING** (oyun markası)
- Merkez: karakter / maskot odaklı sanat
- Alt: ruh adı, element, güçler
- **BATUPIA Studios** sadece minik imza
- Maskot K/E seçimi kart ve UI siluetleriyle uyumlu

### Simge hiyerarşisi
Logo mühür → ruh portresi → kolye → **lava-core taş** → tepsi / HUD ikonları  
Hepsi aynı evren dilini konuşur.

---

## 4. RESMİ AÇILIŞ AKIŞI (Ürün)

```
[SPLASH]
  Arka plan: sinematik / karanlık
  Orta: logo_stonebreaking_muhur.png (mühür)
  Dokun-hisset; BATUPIA büyük yazı YOK
  Uygun yer: [ Maceraya Başla ]

[KARAKTER]
  secim_ekrani_sirt_sirta + Erkek(Kor) / Kadın(Baam)

[RUH]
  Kor · Baam · Mand · Zepy + alıntı

[HİKÂYE GİRİŞ SİNEMATİĞİ]
  Seçilen ruhun sahnesi + söz balonu (10–30 sn CSS/JS)

[OYUN]
  Triple-match + mühür tepsisi + nefes dili
  Bölüm 1–12 (ruh bölgelerine göre)
  Bölüm sonu: IQ + mühür açılışı + zafer

[SONSUZ]
  12 sonrası kilidi açılır
```

### Çizgi film planı (sinematik paket)
| Sahne | Süre | İçerik |
|-------|------|--------|
| Açılış | ~20–30s | Taş parlar → kırılır → 4 element → mühür logo → Başla |
| Bölüm geçişi | ~8–12s | Ruh sembolü + bölge sahnesi + alıntı |
| Mühür patlaması | 2–4s | 3’lü eşleşme FX (zaten motor) |
| Final (B12) | ~20s | 4 ruh + Evren Mührü + Sonsuz kilidi |

Dosyalar: `css/animasyon.css`, `index.html` splash, `js/game.js` sahneler.

---

## 5. PROFİL & GİRİŞ

| Özellik | v6.0 (şimdi) | Sonra |
|---------|----------------|-------|
| Nick | localStorage, profil ekranı | Sunucu senkron |
| Avatar / ruh | Seçim + chip | Google photo opsiyonel |
| İlerleme | bölüm, mühür, IQ, nefes | Cloud save |
| Google / Gmail | **UI iskelet + “Yakında” güvenli stub** | Google Identity Services OAuth client id |

**Güvenlik:** Client ID asla public repo’ya hardcode secret ile gitmez; `01_GIZLI` / env.

---

## 6. RESMİ AÇILIŞTAN SONRA — SONRAKİ KONUŞMADA YAPILACAKLAR

Sıra zorunlu:

1. **Token al → v6 push → token sil**
2. Splash QA: sadece mühür logo + Maceraya Başla (telefondan)
3. Lava-core taşların oyunda görünümü + 2. varyant seti (aynı gövde)
4. Kart revizyon turu 2: maskot K/E net referans
5. 12 bölüm sinematik metinleri (ruh diyalogları) dokümante + UI
6. Sonsuz mod kilidi + zorluk eğrisi
7. Google OAuth gerçek bağ (Patron client id verince)
8. Ana menü sahnesinden büyük BATUPIA temizliği (görsel revize)
9. Ses / titreşim (nefes + mühür kır)
10. Çizgi film storyboard PDF/md genişletme

---

## 7. MARKA ASLA UNUTULMAZ

- Oyun: **STONEBREAKING**
- Şirket: **BATUPIA Studios** (küçük imza)
- Dokun · Hisset · Mühür
- Element renkleri sabit

---

## 8. PUSH

Push öncesi Patron’dan `GITHUB_TOKEN` istenir.  
`01_GIZLI/.env` → push → **sil**. `.env` asla commit edilmez.

---

*Mühürlendi. Kader senin elinde.* 🔥  
*ates_06_lava_core = taş evreninin anayasası.*
