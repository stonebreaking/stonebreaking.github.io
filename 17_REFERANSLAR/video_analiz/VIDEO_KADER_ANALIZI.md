# 🎬 PATRON VİDEO ANALİZİ — OYUNUN KADERİ

**Dosya:** `uploads/Screen_Recording_20260731_101343.mp4`  
**Kaynak:** dosya.co · Screen Recording 2026-07-31  
**Süre:** 122.9 sn · 720×1600 · ~24 fps · 52 MB  
**Analiz:** 01.08.2026 · AI Asistan #2  
**Karar seviyesi:** 🔴 KRİTİK — Mekanik pivot

---

## 1. ÖZET KARAR

Referans oyun **klasik Mahjong Solitaire (çift + sol/sağ açık)** değildir.

Referans:
> **Katmanlı taş yığını + serbest üst taş seçimi + üst tepsi (buffer) + 3 aynı taş = patlama**

Bu genre: *Mahjong Triple Match / Tile Match-3 Stack*  
(STONEBREAKING’e uyarlanmış hali: **Mühür Kırma · 3 Rune Eşleşmesi**)

| Eski varsayım (v3) | Video gerçeği (kader) |
|--------------------|----------------------|
| 2 taş eşleşir | **3 taş** eşleşir |
| Tahta üzerinde yerinde silinir | Seçilen taş **üste uçar (tray)** |
| Sol/sağ açık kuralı | **Üstü boş olan** taş seçilir |
| Puan / mühür | Canlı **IQ** skoru |
| — | **Kombo** + Good/Excellent/Perfect |
| Karıştır / İpucu | + **Geri al (Undo)** güçleri |
| Seviye bitince | **TOP PLAYER** + **Harika!** özet |

---

## 2. EKRAN ANATOMİSİ (Lv.6 örneği)

```
┌─────────────────────────────┐
│  ← geri          IQ: 40.4   ☰ │
│     ┌───────────────────┐   │
│     │ [ ][ ][ ][ ][?]   │   │  ← EŞLEŞME TEPSİSİ (4–5 slot)
│     └───────────────────┘   │
│                             │
│        🀫 🀫 🀫 🀫 🀫          │
│      🀫 🀫 🀫 🀫 🀫 🀫         │  ← KATMANLI TAŞ YIĞINI
│     🀫 🀫 🀫 🀫 🀫 🀫 🀫        │     (3D ofset, yeşil keçe zemin)
│                             │
│   (🔀 kilit)  (💡 1)  (↩ 1) │  ← GÜÇLER
│            Lv. 6            │
└─────────────────────────────┘
```

### 2.1 Üst bar
- **Geri** (seviyeden çık)
- **IQ: X.X** — sürekli artan ondalıklı skor (altın yazı, hafif parıltı)
- **Menü** ☰

### 2.2 Eşleşme tepsisi (KRİTİK)
- Yatay **4 slot** (videoda 4 gözüküyor; bazı seviyelerde 5+ olabilir)
- Boşken koyu kahverengi çerçeve
- Taş gelince slot dolar; **3 aynı** dolunca:
  - Taşlar birleşir / kırılır
  - Yeşil–mor glow kenar
  - Maskot tepki verir
  - Yazı: **Good / Excellent / Perfect**
  - **Combo xN** sarı etiket
  - Beyaz **taş kırığı parçacıkları** tahtaya yağar
  - Pembe yaprak / confetti
- Tepsi **dolu ve eşleşme yoksa** → fail / shuffle ihtiyacı (klasik triple-match kuralı; videoda fail anı yok ama slot sayısı sınırlı)

### 2.3 Tahta
- Beyaz mahjong taşları, yeşil keçe zemin
- **Çok katmanlı yığın**: üstteki taşlar alta göre ofset + gölge
- Serbest taş = üzerinde başka taş **yok**
- Dokununca taş **tepeye uçar** (yay/ease animasyon)
- Semboller: klasik mahjong + modern ikonlar (kulaklık, fırça, at, ejderha, çiçek…)

### 2.4 Alt güç çubuğu
| Güç | İkon | Gözlem |
|-----|------|--------|
| Karıştır | 🔀 | Bazen **kilitli** (kırmızı kilit rozeti) |
| İpucu | 💡 | Sayı rozeti (1) |
| Geri al | ↩ | Sayı rozeti (1); sonraki seviyede shuffle 3 |

### 2.5 Seviye bitiş akışı
1. Son eşleşmeler → tahta erir  
2. **TOP PLAYER** full-screen: havai fişek, confetti, maskot trumpets, stadyum silüeti  
3. **Harika!** sonuç kartı:
   - Zaman: `02:04`
   - IQ: `172.2` + **S** rozeti
   - Kombo: `47`
   - Metin: *“Hiçbir hata yapmadınız, sıkışmış taşları doğru bir şekilde tanımladınız!”*
   - İlerleme: seviye 10 sandığına 10 dilim bar
   - CTA: yeşil **Seviye 6** (tekrar / devam)

---

## 3. OYUN DÖNGÜSÜ (Gamer Loop)

```
Seviye yükle → Taş yığını oluştur (çiftler×N, 3’lü setler)
     ↓
Oyuncu serbest taş seçer → Taş tepsiye uçar
     ↓
Tepsede 3 aynı var mı? ──evet──→ Temizle + IQ↑ + Kombo↑ + FX
     │                              ↓
     hayır                     Kombo zaman penceresi
     ↓
Tepsi dolu mu? ──evet──→ Fail / güç kullan / reklam
     │
     hayır
     ↓
Tahta boş mu? ──evet──→ TOP PLAYER → Harika! → Sonraki seviye
```

---

## 4. SKOR / IQ MODELİ (Video’dan çıkarım)

Gözlenen IQ eğrisi (yaklaşık):

| sn | IQ | Not |
|----|-----|-----|
| 0 | 40.0 | Seviye start tabanı |
| 5 | 40.4 | İlk hamle |
| 10 | 45 | Good + Combo x5 |
| 15 | 49.1 | Tepside 1 taş |
| 20 | 54.4 | |
| 30 | 73 | Excellent + Combo x15 |
| 50 | 94.7 | |
| 90 | 131.9 | Tahta seyreldi |
| 115 | 172.2 | Final |

**Formül taslağı (STONEBREAKING):**
```
baseIQ = 40 + (level-1)*2
her eşleşme: + (1.2 + combo*0.35 + hızBonusu)
Perfect eşiği: combo >= 20 veya ardışık hızlı eşleşme
S-rank: hata=0 ve undo/shuffle az
```

Kombo:
- Her başarılı 3’lü eşleşme combo++ (zaman aşımı ~3–4 sn’de reset tahmini)
- Eşik metinleri:
  - Combo 1–4 → (sessiz / Nice)
  - 5–9 → **Good**
  - 10–19 → **Excellent**
  - 20+ → **Perfect**

---

## 5. ANİMASYON & FX ENVANTERİ

| FX | Açıklama | STONEBREAKING karşılığı |
|----|----------|-------------------------|
| Tile fly-up | Taş tahtadan tepsiye bezier | Mühür parçası uçar |
| Match shatter | Beyaz taş kırığı yağmuru | **Mühür patlaması** |
| Confetti petals | Pembe yaprak | Element confetti (renkli) |
| Tray glow | Yeşil/mor/gökkuşağı kenar | Element rengine göre glow |
| Mascot react | Küçük taş-karakter | Kor/Baam/Mand/Zepy mini |
| Combo label | Sarı “Combo xN” | “Mühür xN” |
| IQ tick | Sayı artışı + sparkle | IQ + mühür sayacı |
| TOP PLAYER | Havai fişek + confetti | Evren Mührü açılışı |
| Harika panel | Lotus + 3 stat | STONEBREAKING zafer mührü |

---

## 6. STONEBREAKING UYARLAMA KARARI

### Korunacak (video’dan)
1. Üst **tepisi (4–5 slot)**  
2. **3 aynı taş = kırılma**  
3. Katmanlı yığın, sadece **üstü açık** seçilir  
4. Canlı **IQ** + **Kombo**  
5. Güçler: Karıştır · İpucu · Geri al  
6. Zafer: sinematik + istatistik paneli  

### Özgünleşecek (marka)
| Referans | STONEBREAKING |
|----------|----------------|
| Klasik mahjong yüzleri | Element rune taşları (Kor/Baam/Mand/Zepy × varyant) |
| Yeşil keçe | Bölüm sahnesi (Ateş Vadisi, Derinlikler…) |
| Generic maskot | Seçilen ruhun mini halleri |
| IQ only | IQ + **Mühür** sayacı |
| “Harika!” | “Mühür Açıldı!” / ruh sözü |
| Lotus | STONEBREAKING mühür logos |

### Taş seti (oyun içi)
En az **8–12 tip** × her tipten **3’ün katı** adet (genelde 3 veya 6):
- ates_1, ates_2  
- su_1, su_2  
- toprak_1, toprak_2  
- hava_1, hava_2  
(+ ileride özel mühür taşları)

---

## 7. TEKNİK UYGULAMA PLANI (v5 motor)

### Veri
```js
tile = { id, type, col, row, z, free, el }
tray = [] // max 4 veya 5
combo, comboTimer, iq, undos, hints, shuffles
```

### Serbestlik kuralı
```
free(t) = tahtada z'i daha yüksek ve (col,row) örtüşen aktif taş YOK
```

### Eşleşme
```
onTrayChange:
  group by type
  if any type count >= 3:
    remove 3 of that type (ilk 3)
    playShatter()
    iq += formula
    combo++
    seals++
```

### Fail
```
if tray.length >= TRAY_MAX and no triple possible:
  soft-lock → offer shuffle / undo / ad
```

### Layout
Videodaki “organik yığın” için:
- Önceden tanımlı seviye şablonları (pyramid, dual-peak, spiral)
- Her hücrede birden fazla z katmanı

---

## 8. UI KOPYASI (TR)

| Referans | STONEBREAKING |
|----------|----------------|
| Good | İyi |
| Excellent | Muhteşem |
| Perfect | Mükemmel |
| Combo xN | Mühür xN |
| TOP PLAYER | EFSANE MÜHÜR |
| Harika! | Mühür Açıldı! |
| Zaman / IQ / Kombo | Zaman / IQ / Mühür Serisi |
| Seviye N | Bölüm N |

---

## 9. RİSK & NOTLAR

1. **Telif:** Referans sadece mekanik ilham; görsel/asset kopyalanmaz. Taş yüzleri kendi rune setimiz.  
2. **Eski motor:** v3/v4 çift-eşleşme kodu **deprecated** → v5 triple-tray.  
3. **Zorluk:** Tray 4 slot = daha stresli; hikâye modunda 5 slot ile başlanabilir.  
4. **Video sonu:** Lv.6 bitti → yeni layout (farklı ikon seti) yüklendi — seviye çeşitliliği şart.

---

## 10. DOSYA KONUMLARI

| Dosya | Yol |
|-------|-----|
| Ham video | `uploads/Screen_Recording_20260731_101343.mp4` |
| Meta | `17_REFERANSLAR/video_analiz/meta.json` |
| Kareler | `17_REFERANSLAR/video_analiz/frames/frame_XXXXs.jpg` |
| Contact sheet | `17_REFERANSLAR/video_analiz/contact_sheet.jpg` |
| Bu analiz | `17_REFERANSLAR/video_analiz/VIDEO_KADER_ANALIZI.md` |

---

## 11. ONAY KUTUSU (Patron)

- [x] Video indirildi ve kare kare okundu  
- [x] Mekanik pivot belgelendi  
- [ ] v5 motor implementasyonu (sonraki adım)  
- [ ] IQ + combo + tray UI  
- [ ] Zafer ekranı (TOP PLAYER → Mühür Açıldı)  
- [ ] GitHub v5 push  

---

*“O video oyunumuzun kaderi.” — Patron Batuhan*  
*Kader okundu. Mühür yön değiştirdi.* 🔥
