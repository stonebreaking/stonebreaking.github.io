# 🚀 YENİ AI'YA VERİLECEK BAŞLANGIÇ MESAJI (v6.0)

**Tarih:** 01.08.2026  
**Son canlı commit:** `8db6965` — STONEBREAKING v6.0  
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
- Son commit: 8db6965 — STONEBREAKING v6.0 (lava-core + mühür logo + resmi açılış mühürü)
- Önceki kritik: db6784b v5.2 fly-to-tray | 870a635 nefes+profil | cd8ef76 triple-match

📁 ÖNCE BUNLARI OKU (sırayla, atlama):
1. 00_PATRON_BT/RESMI_ACILIS_SONRASI_MUHRU.md  ← BAĞLAYICI YOL HARİTASI
2. 00_PATRON_BT/sonraki_oturum_talimatlari.md
3. 00_PATRON_BT/patron_bt_aktivite_logu.md
4. 00_PATRON_BT/patron_notlari_nefes_profil.md
5. 04_HIKAYE_EVREN/oyun_akisi_resmi_acilis.md
6. 17_REFERANSLAR/video_analiz/VIDEO_KADER_ANALIZI.md  ← oyunun kaderi (triple tray)
7. 10_OYUN_MEKANIK/nefes_basari_sozlugu.md
8. 10_OYUN_MEKANIK/triple_match_v5.md
9. 28_DENETIM_PROTOKOLLERI/eksik_sahne_envanteri.md
10. js/game.js + index.html + css/animasyon.css  ← çalışan kod

Workspace boşsa: git clone https://github.com/stonebreaking/stonebreaking.github.io.git

🎮 PROJE
- Tür: Mobil Triple-Match Mahjong (3 taş) + Hikaye + Beyin antrenmanı (IQ)
- Ad: STONEBREAKING | Şirket: BATUPIA Studios (sadece küçük imza)
- Karakterler: Kor=Ateş/erkek maskot, Baam=Su/kadın maskot, Mand=Toprak, Zepy=Hava
- Akış: Splash mühür logo → Maceraya Başla → K/E maskot → 4 ruh → hikaye sinematiği → 12 bölüm → sonsuz
- Mekanik (video referans): üst tepsi (5 slot, CANVAS İÇİ), taş tepsiye UÇAR, 3 aynı = kırılır + NEFES metni + IQ
- Good/Great/Perfect YASAK → hikaye nefesi: Nefes Al, Mühür Kır, Evren Nefesi…
- Element renkleri SABİT: Ateş=#ff6b35 Su=#4ecdc4 Toprak=#c4a35a Hava=#a8d8ea

🪨 TAŞ ANAYASASI (asla bozma)
- Master gövde: 06_GRAFIK/ates_06_lava_core.png
- Aynı gövde, iç rune/renk değişir: tas_sembol_su_core / toprak_core / hava_core (+ ates core alias)
- Varyant üretince: AYNI kalın kare 3D gövde + metal rune çerçeve; sadece merkez sembol değişir
- Taş yüzünde büyük BATUPIA yazısı YASAK

✅ ŞU ANA KADAR BİTEN (özet)
- Triple-match motor v6 (js/game.js): fly-to-tray, combo/nefes land sonrası, DPR tıklama fix, birleşik sahne
- Splash: logo_stonebreaking_muhur.png + Maceraya Başla (büyük Universe/BATUPIA yazısı yok)
- Karakter + ruh seçim ekranları
- Profil: nick (localStorage), 12 mühür yolu, Google/Gmail butonu STUB (OAuth client id yok)
- Koleksiyon kartları revize tur 1 (STONEBREAKING odaklı)
- Video analizi + contact sheet (uploads mp4 gitignore; ham video local olabilir)
- PATRON BT mühür dokümanları yazıldı
- GitHub push’lar yapıldı (token kullan-sil kuralı)

🎯 ŞİMDİ YAPMAN GEREKEN (öncelik sırası)
1. Repo/workspace senkron + canlı site hard-refresh QA (splash, uçuş, 3’lü nefes, core taşlar)
2. Kart turu 2: maskot kadın/erkek referanslı, karakter bütünlüğü, STONEBREAKING marka
3. Core gövde + yeni merkez rune varyantları (yazısız; lava-core standardı)
4. 12 bölüm sinematik diyalog metinleri + bölüm geçiş polish
5. Sonsuz mod kilidi (12 sonrası)
6. Google OAuth gerçek bağ — SADECE Patron Client ID verince; secret’ı commit etme
7. Ana menü/sahne görsellerinde kalan büyük BATUPIA temizliği
8. Ses/titreşim (nefes + mühür kır) isteğe bağlı
9. Push: token iste → 01_GIZLI/.env → push → token/env SİL. .env asla GitHub’a gitmez.

🏷️ MARKA
- Oyun: STONEBREAKING | Şirket: by BATUPIA Studios (footer/imza)
- Dokun · Hisset · Mühür
- Karakter bütünlüğü: Kor cesur ateş / Baam bilge su / Mand sabır toprak / Zepy özgür hava

🔐 GÜVENLİK
- Token sohbette kalmasın; push sonrası revoke öner
- 01_GIZLI/.env gitignore’da
- Google Client ID sonra; şimdilik stub yeterli

Başla: önce RESMI_ACILIS_SONRASI_MUHRU.md oku, workspace/repo doğrula, QA et, sonra öncelik listesinden devam et.
Sorun olursa sor. Emir gelirse uygula. İlerlemeyi kaybetme.
```

---

## 📎 NASIL KULLANILIR?

1. Yukarıdaki kod bloğunun **içini** kopyala (``` satırları hariç)  
2. Yeni AI sohbeti aç  
3. İlk mesaj olarak yapıştır + gönder  
4. İsteğe bağlı: `stonebreaking` klasörünü / GitHub repo’yu workspace’e ver  
5. Push gerekiyorsa **yeni** GitHub token’ı ayrıca ver (eski token’ı rotate et)

## 📌 YEDEK KISA VERSİYON (çok dar context)

```
STONEBREAKING / BATUPIA · stonebreaking.github.io · commit 8db6965 v6.0
Oku: 00_PATRON_BT/RESMI_ACILIS_SONRASI_MUHRU.md + sonraki_oturum_talimatlari.md + VIDEO_KADER_ANALIZI.md + js/game.js
Mekanik: 3’lü tepsi, taş uçar, nefes dili (Good yasak). Master taş: ates_06_lava_core.png
Akış: mühür logo → Başla → K/E → ruh → 12 bölüm → sonsuz. Profil nick + Google stub.
Sırada: kart maskot revizyon, core varyant, sinematik 12 bölüm, sonsuz, OAuth id gelince.
Token: iste, push, sil. Marka: STONEBREAKING ön, BATUPIA imza.
```

---

*PATRON BT v6.0 — Süreklilik Garantisi* ✅
