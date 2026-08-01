# 🚀 YENİ AI'YA VERİLECEK BAŞLANGIÇ MESAJI (v6.3)

**Tarih:** 01.08.2026  **Son canlı commit:** `27b3d8f` — STONEBREAKING v6.3 (splash sinematik + kare taşlar)  
**Site:** https://stonebreaking.github.io/  
**Kullanım:** Aşağıdaki ``` bloğunun **içini** kopyala → yeni sohbete ilk mesaj yapıştır.

---

## 📋 MESAJ METNİ (Kopyala-yapıştır)

```
Merhaba. Ben Batuhan, BATUPIA Studios Kurucusu ve CEO'suyum.

Sen şu an STONEBREAKING UNIVERSE adlı mobil oyun projemin teknik ortağısın.
Bu proje PATRON BT sistemiyle yönetiliyor. İlerlemeyi KAYBETMEDEN kaldığın yerden devam et.

🌐 CANLI
- Site: https://stonebreaking.github.io/
- Repo: https://github.com/stonebreaking/stonebreaking.github.io
- Son commit: 27b3d8f — STONEBREAKING v6.3 (splash sinematik + kare taşlar + şeffaf PNG)
- Önceki: 36dbd97 v6.2 kare taş | 50cb192 v6.1.1 birleşik | 8db6965 v6.0 lava-core

🚨 YEDEKLEME PROTOKOLÜ (KRİTİK — mühürlendi)
- TÜM dosya yedekleri SADECE GITHUB'DA kalıcıdır.
- Workspace `.git` klasörü oturumlar arası KAYBOLUR (snapshot `.git`'i taşımaz).
- Yani: her işlem tamamlanınca → token iste → PUSH ET → token/env sil → devam et.
- .env asla GitHub'a gitmez (gitignore). Token sohbete yazılırsa push sonrası revoke öner.
- Çalışma dosyaları workspace'te kalır ama git geçmişi GitHub'dan çekilir:
  git init -b main && git remote add origin <repo> && git fetch origin main && git reset --mixed origin/main

📁 ÖNCE BUNLARI OKU (sırayla, atlama):
1. 03_SOHBET_GECMISI/PATRON_BT_NASIL_CALISIR.md  ← süreklilik sistemi
2. 00_PATRON_BT/RESMI_ACILIS_SONRASI_MUHRU.md  ← BAĞLAYICI YOL HARİTASI
3. 00_PATRON_BT/sonraki_oturum_talimatlari.md
4. 00_PATRON_BT/patron_bt_aktivite_logu.md
5. 03_SOHBET_GECMISI/YENI_AI_BASLANGIC_MESAJI.md  ← bu dosya
6. 04_HIKAYE_EVREN/12_bolum_sinematik_diyalog.md
7. 17_REFERANSLAR/video_analiz/VIDEO_KADER_ANALIZI.md  ← oyunun kaderi (triple tray)
8. 10_OYUN_MEKANIK/nefes_basari_sozlugu.md
9. 28_DENETIM_PROTOKOLLERI/eksik_sahne_envanteri.md
10. js/game.js + index.html + css/animasyon.css + js/ses.js  ← çalışan kod

Workspace boşsa: git clone https://github.com/stonebreaking/stonebreaking.github.io.git

🎮 PROJE
- Tür: Mobil Triple-Match Mahjong (3 taş) + Hikaye + Beyin antrenmanı (IQ)
- Ad: STONEBREAKING | Şirket: BATUPIA Studios (sadece küçük imza)
- Karakterler: Kor=Ateş/erkek maskot, Baam=Su/kadın maskot, Mand=Toprak, Zepy=Hava
- Akış: Splash sinematik (mühür madalyon) → Maceraya Başla → K/E maskot → 4 ruh → 12 bölüm → sonsuz
- Mekanik (video referans): üst tepsi (5 slot, CANVAS İÇİ), taş tepsiye UÇAR, 3 aynı = kırılır + NEFES metni + IQ
- Good/Great/Perfect YASAK → hikaye nefesi: Nefes Al, Mühür Kır, Evren Nefesi…
- Element renkleri SABİT: Ateş=#ff6b35 Su=#4ecdc4 Toprak=#c4a35a Hava=#a8d8ea

🪨 TAŞ ANAYASASI (asla bozma)
- Master gövde: 06_GRAFIK/ates_06_lava_core.png
- v6.2+: taşlar KARE, PNG'ler şeffaf (RGBA, siyah bant yok), sembol yüzeyin ~%60'ı, sıkı grid
- Varyant üretince: AYNI kare 3D gövde; sadece merkez sembol değişir (yazısız)
- Taş yüzünde büyük BATUPIA yazısı YASAK

✅ ŞU ANA KADAR BİTEN (v6.3)
- Motor v6.2: kare taş, şeffaf PNG, rim light + 3D taban, temiz zemin, soft-lock önleme
- Splash v6.3: sahne ken-burns (canlı), logo dairesel mühür madalyonu (sahneye işlenir),
  element orbit runeleri + aura, taş mühür tablet buton, oran-orantı düzeltmesi
- Sonsuz Mod: B12 sonrası dalgalar, splash'te "♾️ Sonsuz Moda Gir", kaldığın yerden devam
- 12 bölüm sinematik diyalog + bölüm geçiş (portre + bölge + satırlar)
- Ses/titreşim (js/ses.js): nefes, mühür kır, fanfar, 🔊/🔇
- 12 taş tipi (core + _2 + _3), kart turu 2, sahne_ana_menu yeni, storyboard
- Headless test: test/motor_smoke_test.js (44/44 ✅)

🎯 SIRADAKİ (öncelik)
1. Canlı site v6.3 deploy'u doğrula (Pages CDN gecikmesi olabilir)
2. Görsel onay: yeni splash + kare taşlar (telefon)
3. Kalan 4 sahne görselinde BATUPIA yazısı kontrolü → varsa tur 3 revize
4. Google OAuth gerçek bağ (Patron Client ID verince) — secret asla repo'ya
5. Storyboard → video/Lottie paketi (opsiyonel)

🏷️ MARKA
- Oyun: STONEBREAKING | Şirket: by BATUPIA Studios (footer/imza)
- Dokun · Hisset · Mühür
- Karakter bütünlüğü: Kor cesur ateş / Baam bilge su / Mand sabır toprak / Zepy özgür hava

🔐 GÜVENLİK
- Token: işlem sonrası iste → push → token/env SİL. Asla GitHub'a gitmez.
- Token sohbette göründüyse push sonrası revoke öner.
- Google Client ID sonra; şimdilik stub yeterli.

Başla: yedekleme protokolüne uy, dokümanları oku, durumu doğrula, öncelikten devam et.
Sorun olursa sor. Emir gelirse uygula. İlerlemeyi kaybetme — GITHUB TEK YEDEK.
```

---

## 📎 NASIL KULLANILIR?

1. Yukarıdaki kod bloğunun **içini** kopyala (``` satırları hariç)
2. Yeni AI sohbeti aç
3. İlk mesaj olarak yapıştır + gönder
4. İsteğe bağlı: GitHub repo'yu workspace'e ver
5. Her işlemden sonra yeni GitHub token iste (kullan → sil → gerekiyorsa rotate)

## 📌 YEDEK KISA VERSİYON (çok dar context)

```
STONEBREAKING / BATUPIA · stonebreaking.github.io · commit 27b3d8f v6.3
YEDEK: sadece GitHub'da — .git workspace'te kalıcı değil, her işlem sonrası token+push şart.
Oku: PATRON_BT_NASIL_CALISIR.md + RESMI_ACILIS_SONRASI_MUHRU.md + sonraki_oturum + log + game.js
Mekanik: 3'lü tepsi, taş uçar, nefes dili (Good yasak). Kare taş, şeffaf PNG, master ates_06_lava_core
Splash v6.3: ken-burns sahne + mühür madalyon + taş tablet buton. Sonsuz mod B12+ açık.
Sırada: v6.3 deploy doğrula, sahne BATUPIA temizliği, OAuth id gelince.
Token: iste, push, sil. Marka: STONEBREAKING ön, BATUPIA imza.
```

---

*PATRON BT v6.3 — Süreklilik Garantisi* ✅
