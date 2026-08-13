# 🚀 GOOGLE PLAY YOL HARİTASI — STONEBREAKING
### PATRON BT · Patronluk Belgesi · v1 (10.08.2026)

> Hedef: STONEBREAKING'i Google Play'de yayınlamak. Oyun web-öncelikli PWA;
> mağazaya **TWA (Trusted Web Activity)** ile çıkarız — kod çift yazılmaz, tek evren.

## 1. BUGÜN YAPILAN (v8.16) ✅
- `manifest.webmanifest`: standalone, portrait, tema #07070f, mühür logo ikon (any+maskable)
- `sw.js`: NETWORK-FIRST (bayat önbellek imkânsız — geçen savaşların dersi), çevrimdışı yedek
- Telefon zaten "Ana ekrana ekle" ile uygulama gibi kurabilir → mağaza öncesi gerçek kullanıcı testi

## 2. PLAY'E ÇIKIŞ ADIMLARI (sırasıyla)
1. **Play Console hesabı** — tek seferlik $25 (Patron açar, şirket: BATUPIA)
2. **Bubblewrap (TWA)**: `npx @bubblewrap/cli init --manifest https://stonebreaking.github.io/manifest.webmanifest`
   → imzalı APK/AAB üretir; oyun siteden akar, mağaza kabuğu bizde.
3. **Digital Asset Links**: `/.well-known/assetlinks.json` dosyasına TWA imza parmak izi
   (Bubblewrap verince buraya yazılır) → site "benim uygulamam" der, Play onaylar.
4. **Store listeleme varlıkları** (HEPSİ ELİMİZDE):
   - İkon: logo_stonebreaking_muhur_kare_v2.png
   - Feature graphic: sahne_ilk_tas_mit.png (1024×500 kırparız)
   - Ekran görüntüleri: splash v4, seçim, ruh, oyun, final sahneleri
   - Kısa açıklama: "Kırılan her mühür, ölçülen her zihin."
5. **İçerik derecelendirme** anketi (bulmaca → düşük yaş bandı, reklam yok)
6. **Beta → Production**: önce kapalı test (biz ikimiz), sonra açık.

## 3. PATRON KARARLARI GEREKEN
- Play Console hesabı + $25
- assetlinks parmak izi (Bubblewrap çıktısından)
- Mağaza metinleri TR/EN son okuma

## 4. NEDEN KAZANIR
- PWA + TWA = sıfır çift kod, anlık güncelleme (site push = uygulama güncel)
- 100k matematik + efsane mit + yazısız görsel = global hazır
- "BU DAHA BAŞLANGIÇ."
