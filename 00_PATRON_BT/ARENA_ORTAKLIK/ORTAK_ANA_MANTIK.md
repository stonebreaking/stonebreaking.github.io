# 🧠 ANA MANTIK — BATUPIA STONEBREAKING (UNUTMA BELGESİ)

> Bu belge, projenin değişmez çekirdeğidir. Her oturumda ilk okunacaklardandır.
> Kaynak: `uploads/TARAYICIDAN_PUSH.md` + `STONEBREAKING_REPO/patron_bt/` belgeleri
> **Son güncelleme:** 31.07.2026 — AI Asistan

---

## 1. PROJE KİMLİĞİ

| Alan | Değer |
|------|-------|
| Oyun | **BATUPIA: STONEBREAKING — Element Guardians** |
| Tür | 2'li element eşleştirme + hafıza + örüntü tanıma |
| Canlı URL | https://stonebreaking.github.io/game.html |
| Giriş | https://stonebreaking.github.io/ |
| **Stüdyo ana deposu** | `github.com/stonebreaking/batupia-stonebreaking` (dal: `master`) |
| **Canlı oyun deposu** | `github.com/stonebreaking/stonebreaking.github.io` (dal: `main`) |
| Motor | Web: HTML + CSS + vanilla JS (Node ile denetlenebilir) |
| Stüdyo sistemi | PATRON BT v3.0 → v4.0, 25→30 departman, M-001…M-006 mühürleri |
| Ürün çekirdeği | Oyuncu = Taşkıran. Kor/Baam/Mand/Zepy taşlarda mühürlü. Açık taşları oku, aynı elementi tepside eşleştir, dört element mührünü aç. |

## 1A. STÜDYO DEPOSU (batupia-stonebreaking) — DURUM

- **Klon:** `BATUPIA_REPO/` (workspace) — 86 MB, 109 dosya, dal `master`
- **PATRON BT:** `00_PATRON_BT/` — DURUM, MANTIK, BASLAT_KOMUTU, ACIL_DURUM_PROTOKOLU, gorevler/, sistemler/
- **Mühürler:** M-001→M-005 (02_KURULUS_HUKUK + mühür/), **M-006 ✅** = Maskotlara kolye + element sembolü uyumu (8 entegre görsel: 4 karakter × kadın/erkek)
- **Görseller:** `06_GRAFIK/` — maskotlar, logo (batupia_logo_v2, stonebreaking_bt/sealed), arka plan (mobile_scene_v6), kolye sistemi (`kolye/entegre_maskot/`)
- **Demo:** `demo/index.html` — BATUPIA STUDIOS giriş + "MACERAYA BAŞLA" → çatlak logo + kolye ekranı (assets: logo.png, logo_sealed.png, kolye.png, mobile_scene_v6.png)
- **Karakter sembolleri (M-006):** KOR=Ateş/Kırmızı Kurt, BAAM=Su/Mavi Balina, MAND=Toprak/Yeşil Ayı, ZEPY=Hava/Gri Tavşan
- **Ortaklık:** `02_KURULUS_HUKUK/ORTAKLIK_SOZLESMESI.md` — Batuhan (Kurucu) + AI Teknik Ortak

### Stüdyo deposunda sırada (PATRON BT notları)
- 1.5.3 patch akışı (canlı repo ile ortak çekirdek; canlı düzeltme ayrı repo)
- GitHub Pages demo yayını /docs + /demo
- Yeni görsel üretimleri ve mühürler M-007+

## 2. ÇALIŞMA MODELİ (EN ÖNEMLİSİ — "ANA MANTIK")

- **Patronun bilgisayarında terminal yok.** Git komutu, token, format-patch KULLANILMAZ.
- **Push yöntemi = GitHub web editörü:** https://github.com/stonebreaking/stonebreaking.github.io/edit/main/<dosya>
  → kalem ✏️ → düzenle → "Commit changes..." → main'e commit.
- **Sürüm/cache mantığı:** `game.html` içindeki `?v=NNN` anahtarı artırılır (örn. v=153 → v=154).
  - `css/game.css?v=NNN`, `js/story.js?v=NNN`, `js/game.js?v=NNN` (3 yer aynı anda).
  - Bu yapılmazsa tarayıcı eski önbelleği okur, düzeltme görünmez. ⚠️
- **Commit mesajı stili:** `fix(P0): ...`, `release: ...` (kısa, Türkçe/İngilizce karışık kabul).
- **AI burada terminale sahiptir:** repo klonu `STONEBREAKING_REPO/` içinde. Patch'ler önce burada uygulanıp doğrulanır (node --check), sonra web editörü için hazır yapıştırma çıkarılır. Token `.env`'e girerse AI doğrudan push da yapabilir.

## 3. CANLI DURUM (31.07.2026 GÜNCEL)

| Öğe | Durum |
|-----|-------|
| Canlı sürüm | **v=154** (1.5.4) — P0 düzeltmesi yayında (fix 16e5f0e + release 07414d7) |
| ⚠️ **KÖK EKRAN SORUNU** | `index.html` + `game.html`, GitHub'dan silinmiş `assets/` görsellerine referans veriyor → siyah ekran. `assets/` kurtarılmış mühürlü görsellerle yerelde geri yüklendi; eksik mühürlü varlıklar (41 taş, realm/scene görselleri) Patron'un `assets/` yüklemesiyle tamamlanacak |
| Canlı doğrulama | v=154 + showScreen + quickplay ✅ doğrulandı (önceki tur) |

## 4. DEĞİŞMEZ ÜRÜN KURALLARI

- Vita Mahjong **yalnızca mekanik/katmanlı düzen referansı**dır; görsel, marka, varlık KOPYALANMAZ.
- Eşleşme kuralı: oyuncunun GÖRDÜĞÜ element eşleşir; gizli `pairId` oyuncuyu aldatmaz.
- **Pay-to-win yok**, enerji/can duvarı yok, otomatik oynayan ipucu yok.
- Mühürlü **22 varlık** Patron onayı olmadan değişmez (hash sicili: `patron_bt/kanon_sicili.json`).
- **GÖRSEL KANON KURALI (BT-2026-0731-A3):** Yeni görsel üretmeden önce mühürlü kanon taranır (`06_GRAFIK/GORSEL_KANON.md`). Kanon varsa yeni tasarım üretilmez; üretilecek her şey mühürlü kanondan türetilir. Yeni tasarımlar "aday" etiketiyle kaydedilir ve mühür + Patron onayıyla kanonlaşır. Kanon ihlali push'u engeller (denetim maddesi 13).
- Yayın öncesi kritik hata varsa yayın yapılmaz.
- Ölçümler kişisel veri ve ağ aktarımı olmadan yalnızca `localStorage` içinde tutulur.

## 5. DEPODAKİ PATRON BT SİSTEMİ (okunacak dosyalar)

| Dosya | İçerik |
|-------|--------|
| `patron_bt/PATRON_BT.md` | Proje beyni ve karar sistemi |
| `patron_bt/DURUM.md` | Hızlı referans: neredeyiz, sırada ne var |
| `patron_bt/OTURUM_DEVRI.md` | Oturum devri + yeni oturum açılış metni |
| `patron_bt/KULLANICI_ISTEKLERI.md` | Patron'un fikir/not gelen kutusu |
| `patron/audit.js` | 50.000+ hamle yayın kapısı (`npm run patron`) |
| `patron/smoke.js` | 3 viewport smoke testi (`npm run smoke`) |
| `surum.json` | Sürüm/bütçe/denetim özeti |

## 5A. YENİ SOHBET AÇILIŞI (TEK METİN)

→ **`00_PATRON_BT/YENI_SOHBET_ACILIS_TALIMATI.md`** oku.
Özet: Token linki (github.com/settings/tokens/new, sadece repo kapsamı) → `.env`'e yapıştır → yeni sohbete açılış mesajını yapıştır → "hazır" de. Gerisi AI'da.
Böylece sonraki sohbetlerde tek ihtiyaç: .env'e token at, devam.

## 6. ARAÇLAR VE DOĞRULAMA

```bash
node --check js/game.js      # sözdizimi
npm run patron               # yayın kapısı (50.000+ motor hamlesi)
npm run smoke                # viewport testi (sunucu açıkken)
curl -L https://stonebreaking.github.io/game.html | grep v=NNN
```

## 7. SIRADA (öncelik sırası)

1. 🔴 **P0 düzeltmeyi yayına al (v=154)** — web editörü, 2 dosya (bkz. SIRADAKI_ADIM_v154.md)
2. 🟠 1.5.4 doğrulama: canlıda v=154 + Hemen Oyna → tahta görünüyor
3. 🟡 Kara/Mühür taş seti → `TILE_VISUALS` pipeline'ına ekle
4. 🟡 100 gerçek oturumla Bölüm 1–3 ölçümü
5. 🟢 Matematik V2, 12. bölüm Zihin Haritası, QR'lı paylaşım kartı

---

© 2026 Batuhan — BATUPIA Studios | Bu belge PATRON BT sisteminin parçasıdır.
