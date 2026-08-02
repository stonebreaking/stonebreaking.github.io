# PATRON BT — SONRASI PLAN (Açılış Tamamlandıktan Sonra)

**Tarih:** 02.08.2026 · **Sürüm:** v6.6 (`010cc0e`) · **Durum:** Canlı (200 OK) · **Devam:** Açılış sonrası

---

## 🔐 KURALLAR (Tüm görsellerde sabit)

- **Marka:** STONEBREAKING önde, BATUPIA sadece imza
- **Mühür:** Her karakter seçimi / sahne / taşta Stonebreaking mühür (logo_stonebreaking_muhur_kare.png) entegre
- **Element renkleri sabit:** Ateş #ff6b35 · Su #4ecdc4 · Toprak #c4a35a · Hava #a8d8ea
- **Taş anayasası:** Kare taş, şeffaf PNG, sembol ~%60 yüzey, sıkı grid; master `ates_06_lava_core.png`; 12 tip
- **Karakter bütünlüğü:** Mand artık kadın savaşçı (golem değil); yeni toprak skinleri `toprak_ruhu_1.png` (kadın shaman) + `toprak_ruhu_2.png` (erkek izci)
- **Maskot:** K/E maskot + 4 ruh (Kor/Baam/Mand/Zepy) bütünlük korunmalı
- **Semboller:** Tüm taş sembolleri (core + _2 + _3) kurala dahil

---

## 🚀 AÇILIŞ (Splash → Maceraya Başla → Seçim → Hikaye)

| Adım | Dosya / Mekanizm | Durum |
|------|------------------|-------|
| Splash sinematik | `index.html` + `css/animasyon.css` + `splash_muhur_v6.png` | ✅ v6.3/v6.6 |
| Logo mühür madalyonu | `logo_stonebreaking_muhur_kare.png` | ✅ |
| Maceraya Başla butonu | `sahne_ana_menu.png` + UI | ✅ |
| Maskot (K/E) | `05_KARAKTERLER/` + maskot kartı | ⏳ Bekliyor |
| 4 Ruh Seçimi (Yenilendi) | `06_GRAFIK/secim_ekrani_4_ruh_v6_yeni_tasarim.png` + yeni kartlar (`selection_*_v6_yeni.png`) | ✅ Üretildi |
| 12 Bölüm Sinematik | `04_HIKAYE_EVREN/12_bolum_sinematik_diyalog.md` | ✅ Hazır |

---

## ♾️ SONSUZ VARIANT (B12 Sonrası)

- Dalgalar artar, zorluk sınırsız
- `Sonsuz Moda Gir` butonu splash'te aktif
- Sonsuz profil istatistikleri (localStorage) + rekor takibi

---

## 👤 PROFİL + GİRİŞ SİSTEMİ

- Profil yönetimi (`localStorage`) — Sonsuz Mod + Sonsuz Rekor
- Google OAuth (stub mevcut) — `Client ID` bekleniyor
- Giriş: Google Hesapla Giriş → kullanıcı profili oluştur → karakter/ruh seçimi kilidini aç

---

## 🧠 ZİHİN HARİTASI + IQ TESTİ

- Bölüm sonunda çıkan IQ testi → mantık / anlama performansı ölçümü
- Zihin haritası görselleştirme: 4 ruhun etkileşim haritası + element dengesi
- Sonuç: Profilde "Zihin Haritası" sekmesi (görsel + istatistik)

---

## 💬 HATIRLATMA / NEFES DİLİ (Küçük Bildirimler)

Oyunda eklenmesi gereken küçük hatırlatma mesajları (kullanıcıyı kendine çekmek / süreklilik sağlamak):

- "Nefes al... sakinleş..." (nefes dili)
- "Su iç... ayakta kal..." (mobil / uzun seans hatırlatması)
- "Bir taş daha... nefes ver..." (oyun içi ritim destekleyici)
- "Mühür kırıldı — yeni bölüm açılıyor..." (bölüm geçişi)

**Uygulama:** `js/ses.js` + CSS animasyon + küçük toast bildirim (mobil uyumlu)

---

## 📋 SONRAKİ ADIMLAR (Açılış Tamamlandıktan Sonra)

1. **Onay / Açılış tamam** → Bu rapor güncellenir (`DURUM_RAPORU_03_08_2026.md`)
2. **New Token → Push** (eğer yeni görseller / hatırlatmalar eklenirse)
3. **Sonsuz Mod kilidini aç** (`B12` sonrası açılış → sonsuz dalgalar)
4. **Google OAuth integration** (Client ID alınca → `localStorage` profil bağlama)
5. **Zihin Haritası görseli** → `04_HIKAYE_EVREN/` veya yeni klasör → 4 ruh etkileşim haritası
6. **Hatırlatma sistemini kodla** → `js/ses.js` + `css/animasyon.css` + küçük UI toast
7. **Son denetim (Motor QA)** → `test/motor_smoke_test.js` güncelle, 44/44 veya yeni hedef

---

*Patron BT çalışıyor. GITHUB TEK YEDEK. Açılış sonrası bu sırayla devam.* ✅
