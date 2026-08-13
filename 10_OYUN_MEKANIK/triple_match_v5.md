# Triple Match v5 — Kader Mekaniği

Kaynak: `17_REFERANSLAR/video_analiz/VIDEO_KADER_ANALIZI.md`

- 3 aynı taş = mühür kırılır
- Üst tepsi 5 slot
- Sadece üstü açık taş seçilir
- IQ + kombo + undo/hint/shuffle
- Zafer: EFSANE MÜHÜR paneli

Motor: `js/game.js` · UI: `index.html`

---

## v6.1 EKLENTİLERİ (birleşik oturum, 01.08.2026)

- 12 taş tipi: core + `_2` + `_3` varyantları (lava-core gövde, yazısız)
- Sonsuz Mod: bölüm 12 (Evren Mührü) sonrası → dalgalar (∞N), tahta 66 taşa çıkar, IQ tabanı 80
- SOFT-LOCK ÖNLEME: tepsi 5 farklı tiplе dolarsa taşlar tahtaya otomatik geri döner
- Ses/titreşim: `js/ses.js` (nefes perdesi kombo ile yükselir, mühür kır çatlağı, fanfar)
- Headless motor testi: `test/motor_smoke_test.js` (44/44 ✅)
- `STONE_getChapter(n)` API: bölüm/sonsuz dalga verisi (mühür adı + diyalog)
