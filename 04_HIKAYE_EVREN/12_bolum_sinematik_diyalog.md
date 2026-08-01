# 🎬 STONEBREAKING — 12 BÖLÜM SİNEMATİK DİYALOG METİNLERİ

**Tarih:** 01.08.2026 · v6.1
**Onay:** Patron Batuhan (mühür talimatı: "kendi çizgi filmimiz")
**Kullanım:** Bölüm geçiş overlay → ruh portresi + bölge + sıralı diyalog satırları
**Dil:** Hikâye nefesi (Good/Great/Perfect YASAK — `nefes_basari_sozlugu.md`)

---

## OYUNCU KONUMU
Oyuncu = **Gezgin** (maskot K/E referanslı). 4 ruh rehberdir. Her bölümde ruh konuşur:
- Bölüm girişi: ruh seni karşılar (1. satır)
- Orta: meydan okuma / rehberlik (2. satır)
- Kapanış: bölüm sonu nefesi (3. satır)

## 1–3 · KOR (Ateş Vadisi) — cesur, tutkulu, kor ateş

### Bölüm 1 — Alev Uyanışı
> "Kor: Mühür uyanıyor…"
> "Kor: İlk nefesini duydum, Gezgin."
> "Kor: Alev taşlarını kır — vadi seni bekliyor."

**Sinematik:** Karanlık vadide tek bir taş parlar; Kor alev saçlarıyla belirir. İlk 3'lü eşleşme = ilk Nefes Al.

### Bölüm 2 — Magma Köprüsü
> "Kor: Magma Köprüsü'ne adım attın."
> "Kor: Ateş seni sınamak istiyor."
> "Kor: Cesaretinle mühürleri kır, yürü."

**Sinematik:** Köprünün altında lav; taşlar köprünün taşlarıdır. Kombo yükseldikçe lava parlar.

### Bölüm 3 — Volkan Mührü
> "Kor: Volkan Mührü'ne ulaştın."
> "Kor: Benimle son alevi kır."
> "Kor: Alev Mühürü artık senin — başardın!"

**Kapanış:** Volkan patlar → **Alev Mühürü** profilde açılır (mühür yolu 1-3). Bölge biter, Derinlikler çağırır.

## 4–6 · BAAM (Derinlikler) — bilge, sakin, akışkan

### Bölüm 4 — Dalga Çağrısı
> "Baam: Derinlikler seni çağırıyor."
> "Baam: Dalgalar sabrı öğretir."
> "Baam: Su taşlarını mühürle, sakin kal."

### Bölüm 5 — Mercan Labirent
> "Baam: Mercan Labirenti karışık."
> "Baam: Akışı hisset, panikleme."
> "Baam: Bilgelik yolu açılır."

### Bölüm 6 — İnci Tahtı
> "Baam: İnci Tahtı'ndayız."
> "Baam: Derin nefes, bilge hamle."
> "Baam: İnci Mühürü açıldı — deniz seninle."

**Kapanış:** İnci Tahtı aydınlanır → **Dalgacık Mühürü** (mühür yolu 4-6). Kristal Mağaralar'ın derin gurultusu duyulur.

## 7–9 · MAND (Kristal Mağara) — sabırlı, güçlü, granit

### Bölüm 7 — Granit Kapı
> "Mand: Granit Kapı'ya geldin."
> "Mand: Sabır taşı kırar."
> "Mand: Taşların diliyle konuş."

### Bölüm 8 — Kristal Nabız
> "Mand: Kristal Nabız atıyor."
> "Mand: Dünyanın kalbini duy."
> "Mand: Sakin ol, sarsılma."

### Bölüm 9 — Dağ Mühürü
> "Mand: Dağ Mühürü son kapı."
> "Mand: Dayanıklılık senin gücün."
> "Mand: Kristal Mühür senin — dağ seni tanıdı."

**Kapanış:** Mağara kristalleri yankılanır → **Kristal Mühür** (mühür yolu 7-9). Rüzgar fısıldar: gökyüzü sıradaki.

## 10–12 · ZEPY (Gökyüzü Tapınağı) — özgür, hızlı, öngörülü

### Bölüm 10 — Rüzgar Merdiveni
> "Zepy: Rüzgar Merdiveni'ne çık."
> "Zepy: Hafif ol, özgür ol."
> "Zepy: Bulutlar yolu gösterir."

### Bölüm 11 — Bulut Labirenti
> "Zepy: Bulut Labirenti süzülüyor."
> "Zepy: Rüzgarın sesini dinle."
> "Zepy: Görünmeyeni gör."

### Bölüm 12 — Evren Mührü (FİNAL)
> "Zepy: Evren Mührü son sınav."
> "Zepy: Dört ruh bir arada — Kor, Baam, Mand, Zepy."
> "Zepy: Evren Mührü kırıldı — Sonsuz yol açıldı!"

**Final sinematiği (12 sonu):**
1. 4 ruh portresi sırayla belirir (Kor → Baam → Mand → Zepy)
2. "EVREN MÜHRÜ" başlığı
3. Sonsuz Mod kilidi kalkar → zafer ekranında **SONSUZ MOD** rozeti
4. Sonsuz modda ruh sözleri (döngüsel):
   > "Sonsuz mühür yolu açık…"
   > "Nefesini koru, kaderi sen yazarsın."

---

## KOD ENTEGRASYONU
- `js/game.js` → `CHAPTERS[].lines` (kısa satırlar, bölüm overlay'de sıralı gösterim)
- `index.html` → `playChapterTransition()` (portre + bölge + satır satır fade-up)
- Profil: 12 mühür yolu kartı + Sonsuz Mod durumu

## YASAK
- Good/Great/Perfect/Excellent/Nice/Amazing
- Oyun dışı ses (Pokemon vb. generic match-3)
- Büyük BATUPIA yazısı — STONEBREAKING önde, BATUPIA imza

---

*Mühürlendi. Kader senin elinde.* 🔥
