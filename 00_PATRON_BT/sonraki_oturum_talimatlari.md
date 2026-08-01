# 📋 SONRAKİ OTURUM TALİMATLARI

**Oku önce:** `00_PATRON_BT/RESMI_ACILIS_SONRASI_MUHRU.md` + `patron_bt_aktivite_logu.md` (v6.1.1)  
**Tarih:** 01.08.2026 · **v6.1.1**

---

## ✅ v6.1.1'DE BİTEN (birleşik oturum)
- 12 bölüm sinematik diyalog (3 satır/bölüm, portre + bölge + satır satır) — `12_bolum_sinematik_diyalog.md`
- Sonsuz Mod: B12 sonrası (dalgalar, zor tahta 66, IQ tabanı 80) + splash "♾️ Sonsuz Moda Gir" + kaldığın yerden devam
- Ses & titreşim (`js/ses.js`): nefes (kombo perdesi), mühür kır, fanfar, 🔊/🔇, vibrate
- Soft-lock önleme: tepsi dolu + eşleşme yoksa taşlar tahtaya geri döner
- Rune varyantları `_3` (kılıç/inci/kristal/rüzgar) → 12 taş tipi (lava-core gövde, yazısız)
- Kart turu 2: 4 koleksiyon kartı 900×1200, STONEBREAKING üst, karakter odaklı, BATUPIA imza
- `sahne_ana_menu` yeni (BATUPIA yazısız) → splash bg
- `cizgi_film_storyboard.md` (çizgi film planı)
- Headless motor testi 44/44 ✅ (`test/motor_smoke_test.js`)

## 🎯 SIRA (öncelik)
| # | İş |
|---|-----|
| 1 | **Push v6.1.1** (token iste → kullan → sil) |
| 2 | Canlı site hard-refresh QA (telefon): splash yeni bg + Sonsuz butonu, uçuş, 3'lü nefes, 12 taş tipi, sonsuz açılışı |
| 3 | Görsel onay: yeni kartlar + rune `_3` + sahne_ana_menu |
| 4 | Kalan 4 sahne görselinde BATUPIA yazısı kontrolü → varsa tur 3 revize |
| 5 | Google OAuth gerçek bağ (Patron Client ID verince) — secret asla repo'ya |
| 6 | Seslerin gerçek cihazda kulağa uyumu + seviye artışında tempo |
| 7 | Storyboard → video/Lottie üretimine geçiş (opsiyonel) |

## Marka
STONEBREAKING ön planda · BATUPIA sadece imza · Kor/Baam/Mand/Zepy bütünlüğü

## Push güvenliği
Token `.env` → kullan → sil. Asla GitHub'a gitmez.

---

*PATRON BT v6.1.1 — süreklilik*
