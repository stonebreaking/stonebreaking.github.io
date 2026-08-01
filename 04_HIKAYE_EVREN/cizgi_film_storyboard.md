# 🎬 STONEBREAKING — ÇİZGİ FİLM STORYBOARD (v6.1)

**Tarih:** 01.08.2026 · v6.1
**Felsefe:** "Sinematik sahneler + animasyon = kendi çizgi filmimiz" — Patron Batuhan
**Uygulama:** CSS/JS sahne sinematiği (canvas + overlay) → ileride video/2D animasyon paketine dönüşebilir

---

## 1. AÇILIŞ SİNEMATİĞİ (Splash — ~4-5 sn, canlı)

| Kare | Süre | Görsel / Aksiyon | Ses |
|------|------|------------------|-----|
| 1.1 | 0-1.4s | Karanlık fon (`sahne_ana_menu.png`), tek taş (`cin-stone`) parlar | — (dokun-hisset sessizliği) |
| 1.2 | 1.4-2.3s | Taş çatlar (`stoneCrack`) → kırılır | çatlak (StoneSound.seal) |
| 1.3 | 2.3-3.5s | 4 element küresi belirir (🔥💧🗿💨), sonra söner | dört kısa chime |
| 1.4 | 3.5-4.4s | `logo_stonebreaking_muhur.png` mühür belirir (float) | yükselen "parıltı" |
| 1.5 | 4.4s+ | **Maceraya Başla** butonu nabız atar; (kilit açıldıysa) **♾️ Sonsuz Moda Gir** | tap |

**Kural:** Büyük BATUPIA / Universe yazısı YOK. Mühür + buton.

## 2. KARAKTER & RUH SEÇİMİ (~10 sn)

| Kare | Ekran | Aksiyon |
|------|-------|---------|
| 2.1 | Karakter | `secim_ekrani_sirt_sirta.png` (Kor & Baam sırt sırta) + KADIN/ERKEK kartları |
| 2.2 | Ruh | 4 ruh kartı (Kor/Baam/Mand/Zepy) + seçince alıntı (`spirit-quote`) |

## 3. BÖLÜM GİRİŞ SİNEMATİĞİ (12 bölüm — canlı overlay)

**Her bölümde** (`playChapterTransition`):
1. Ruh portresi belirir (mühür çerçeve + element glow)
2. Element sembolü büyür
3. `Bölüm N · Başlık`
4. Bölge adı (örn: Ateş Vadisi)
5. **Diyalog satırları satır satır** (ruh konuşması, 3 satır) — `04_HIKAYE_EVREN/12_bolum_sinematik_diyalog.md`

| Bölüm | Ruh | Bölge | Diyalog özeti |
|-------|-----|-------|----------------|
| 1-3 | Kor | Ateş Vadisi | "Alev taşlarını kır — vadi seni bekliyor." |
| 4-6 | Baam | Derinlikler | "Dalgalar sabrı öğretir." |
| 7-9 | Mand | Kristal Mağara | "Sabır taşı kırar." |
| 10-12 | Zepy | Gökyüzü Tapınağı | "Bulutlar yolu gösterir." |

## 4. OYUN İÇİ SİNEMATİKLER (FX)

| Olay | FX | Ses/Titreşim |
|------|----|--------------|
| Taş seçilir | Taş tepsiye uçar (bezier) | pick chime |
| 3'lü eşleşme | Mühür patlaması + element parçacıkları + NEFES metni | breath (kombo perdesi) + vibrate |
| Kombo 15+ | "Evren Nefesi" altın | yükselen ton |
| Tepsi dolu | Taşlar geri döner (soft-lock önleme) | fail buzz + vibrate |
| Zafer | EFSANE MÜHÜR / EVREN MÜHRÜ / SONSUZ NEFES paneli | fanfar + 3'lü vibrate |

## 5. FİNAL SİNEMATİĞİ (Bölüm 12 → Sonsuz Mod)

| Kare | Aksiyon |
|------|---------|
| 5.1 | Zepy: "Evren Mührü son sınav." |
| 5.2 | 4 ruh sırayla belirir (Kor → Baam → Mand → Zepy) |
| 5.3 | **EVREN MÜHRÜ** başlığı + "SONSUZ AÇILDI" rozeti |
| 5.4 | Sonsuz Mod kilidi kalkar → sonsuz seviyeler (∞N) + splash'te "♾️ Sonsuz Moda Gir" |

## 6. SONSUZ MOD SİNEMATİKLERİ

- Bölüm geçişi kısaltılır (1 diyalog satırı, döngüsel havuz)
- Zorluk eğrisi: tahta 63 taşa çıkar, katman artar
- Sonsuz Rekor profilde izlenir

## 7. İLERİDE (video/2D animasyon paketi)

- Açılış: 20-30 sn gerçek animasyon (taş parlar → kırılır → 4 ruh → logo)
- Bölüm geçişi: 8-12 sn sahne animasyonu
- Final: 20 sn (4 ruh + Evren Mührü)
- Format: WebM/MP4 sprite veya Lottie → `uploads/` (gitignore) → `css/animasyon.css` + `js/ses.js` senkron

---

*Mühürlendi. Kader senin elinde.* 🔥
