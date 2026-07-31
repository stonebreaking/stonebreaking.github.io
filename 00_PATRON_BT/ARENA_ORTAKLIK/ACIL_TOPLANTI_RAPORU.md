# 🚨 ACİL DURUM RAPORU — PATRON BT (31.07.2026)

**Katılımcılar:** Batuhan (Kurucu/CEO) · AI Teknik Ortak
**Karar No:** BT-2026-0731-A1
**Statü:** 🔴 ACİL TOPLANTI — son durum netleştirildi

---

## 1. PROJE SAĞLIK ÖZETİ

| Alan | Durum | Kanıt |
|------|-------|-------|
| Canlı oyun | ✅ ÇALIŞIYOR | stonebreaking.github.io — v=154 yayında |
| P0 hata (tahta görünmüyor) | ✅ ÇÖZÜLDÜ | fix 16e5f0e + release 07414d7, canlıda doğrulandı |
| Stüdyo deposu | ✅ ÇALIŞIYOR | batupia-stonebreaking — belgeler + görseller yüklendi (912021f) |
| Mühür sistemi | ✅ M-001…M-006 mühürlü | M-007 (Arena görselleri) aday |
| Görsel üretim | 🔄 DEVAM EDİYOR | bu turda sahneler + koleksiyon kartları |
| Matematik | 🟡 GÜÇLÜ AMA İNSAN VERİSİ YOK | bot %99,1; gerçek oyuncu hissi için oturum verisi şart |
| Viral paylaşım kartları | 🔄 BAŞLADI | Pokemon tarzı 4 karakter kartı üretiliyor |
| Merch (tshirt/bardak/takı) | 📋 PLAN HAZIRLANIYOR | üretim dosyaları + otomasyon önerisi aşağıda |
| Para/magaza lansmanı | ⬜ BEKLİYOR | web MVP olgunlaşınca → Play Store |

---

## 2. SİSTEMLER / DENETÇİLER / UZMANLAR — ÇALIŞIYOR MU? (DÜRÜST CEVAP)

### 🤖 Sistemler

| Sistem | Durum | Nasıl çalışıyor |
|--------|--------|-----------------|
| PATRON BT belge sistemi | ✅ AKTİF | ANA_MANTIK, GOREV_LISTESI, YENI_SOHBET_ACILIS_TALIMATI, raporlar |
| Git + yedek | ✅ AKTİF | commit + push her görev sonunda; çift depo (canlı + stüdyo) |
| Mühür (hash) sistemi | ✅ AKTİF | SHA-256 varlık defteri; M-001…M-006 |
| Sürüm/cache sistemi | ✅ AKTİF | v=NNN anahtarıyla önbellek yönetimi |

### 🕵️ Denetçiler

| Denetçi | Çalışıyor mu? | Ne yapıyor |
|---------|---------------|------------|
| 12 madde push denetimi | ✅ EVET | push öncesi kontrol listesi (28_DENETIM_PROTOKOLLERI) |
| Sözdizimi denetçisi | ✅ EVET | `node --check` her JS değişikliğinde |
| Canlı doğrulama | ✅ EVET | `curl` + grep v=154, showScreen/quickplay kontrolü |
| Motor denetçisi (canlı depoda) | ✅ EVET | `npm run patron` → 50.000+ hamle, bot %99,1 |
| Viewport denetçisi | ✅ EVET | `npm run smoke` → 3 ekran boyutu |

> ⚠️ **Dürüst not:** Denetçiler/uzmanlar bu sistemde "rol" tanımıdır; ben (AI) bunları her görevde talep üzerine çalıştırıyorum. Arka planda kendi kendine koşan canlı bir bot **yok**. Söylediğin zaman anında çalıştırırım.

### 🎓 Uzmanlar (departmanlar)

| Uzmanlık | Aktif mi? | Somut çıktı |
|----------|-----------|-------------|
| Görsel Sanat (06) | ✅ | 4 ruh + logo + sahneler + kartlar (bu turda) |
| Hikaye (04) | ✅ | 12 bölümlük ana hikaye dokümanı |
| Karakter (05) | ✅ | Kor/Baam/Mand/Zepy dosyaları + M-006 semboller |
| Oyun Mekanik (10) | 🟡 | GDD taslağı var; canlı repodaki GDD ile birleştirilecek |
| Matematik (27) | 🟡 | sim.py serisi, %99,1; V2 için insan verisi |
| Marketing (15) | 🔄 | viral kartlar + merch planı bu toplantıda |
| Finans (16) | 🟡 | gelir modeli (F2P + IAP + reklam) |
| Ses/Müzik (08) | ⬜ | henüz başlamadı |

---

## 3. MATEMATİK DURUMU ("KUSURSUZ HİSSİYAT")

- Şu an: bot çözüm oranı %99,1 — **tahtalar çözülebilir** ✅
- Eksik: **insan hissi** (zorluk eğrisi, akıcılık, "aha!" anları).
- Plan: **100 gerçek oturum** → Bölüm 1-3 ölçümü → Matematik V2 (hafıza, hız, hata, risk, denge eksenleri).
- Sen "hissiyatla bitireceğim" diyorsun → oyuna girip 3-5 seviye oyna, bana nerede sıkıldığını/şaşırdığını söyle, ben dengeyi ona göre ayarlayayım. Beraber bitiririz. 💪

---

## 4. GÖRSEL + SAHNE ÜRETİM PLANI (bu turda başladı)

| # | Ürün | Durum |
|---|------|-------|
| 1 | Koleksiyon kartı KOR (Pokemon tarzı, holofoil) | 🔄 üretiliyor |
| 2 | Koleksiyon kartı BAAM | 🔄 üretiliyor |
| 3 | Koleksiyon kartı MAND | 🔄 üretiliyor |
| 4 | Koleksiyon kartı ZEPY | 🔄 üretiliyor |
| 5 | Oyun sahnesi: taş kırma/oyun tahtası arka planı | 🔄 üretiliyor |
| 6 | Oyun sahnesi: 4 ruhun uyanışı (hikaye sahnesi) | 🔄 üretiliyor |
| 7 | Merch konsept görseli (tshirt + bardak + kolye) | 🔄 üretiliyor |

---

## 5. VİRAL PAYLAŞIM KARTLARI (POKEMON TARZI)

- 4 karakter × kart (KOR/BAAM/MAND/ZEPY) — element tipi, nadirlik, güç/özellik bandı
- Tasarım: koleksiyonluk, paylaşımlık → sosyal medyada "kartın hangisi?" viral sorusu
- Sonraki: kart arkası, nadirlik varyantları (yaygın/nadir/efsane), QR ile canlı oyuna bağlantı
- Detay dokümanı: `00_PATRON_BT/MERCH_KART_PLANI.md`

---

## 6. MERCH OTOMASYON PLANI (T-SHIRT / BARDAK / KOLYE / KÜPE / TAKI)

**Gerçekçi yol (satışa çıkarmak için):**

1. **Tasarım dosyaları** (AI üretir, üretime hazır):
   - T-shirt: logo + karakter arka baskı (PNG, 300 DPI)
   - Bardak: logo + element ikonları (mockup + baskı dosyası)
   - Kolye: M-006'daki resmi kolye + element sembollü pendant
   - Küpe/küpe: element sembolleri (mini ikonlar)
2. **Print-on-Demand entegrasyonu** (otomasyon):
   - Printful / Printify → Shopify / Etsy / Trendyol (TR) mağazası
   - Ürün tasarımını yükle → satış → üretim/sevkiyat otomatik
3. **Katalog:** 6-10 ürünle başla, talebe göre büyüt

> Ben burada **tasarım dosyalarını + mockupları** üretebilirim. Hesap açma, ürün fiyatlandırma, satış kanalı kurulumu (Shopify/Etsy/Trendyol hesabı + ödeme) senin yapman gereken kısım — ona hazır içerik sağlarım.

---

## 7. "OYUNU CANLIYA AL" — GERÇEKÇİ YOL HARİTASI

| Aşama | Durum | Eylem |
|-------|-------|-------|
| Web canlı | ✅ | zaten yayında (GitHub Pages) |
| Web MVP olgunlaştırma | 🔄 | sahneler, kartlar, dengeli matematik |
| Mobil kapsülleme | ⬜ | Capacitor/WebView → Android APK |
| Play Store (TR öncelik) | ⬜ | geliştirici hesabı (25$ tek sefer) + APK + görseller |
| iOS | ⬜ | Apple geliştirici (99$/yıl) — sonra |

---

## 8. KARARLAR / SONRAKİ ADIMLAR (öncelik sırası)

1. 🔴 **Bu tur:** sahneleri çoğalt + 4 koleksiyon kartı üret (devam ediyor)
2. 🔴 **Merch:** tshirt/bardak/kolye/küpe tasarım dosyaları + mockup (bu tur konsept, sonra tam set)
3. 🟠 **Viral kart paketi:** kart arkası + nadirlik varyantları + QR
4. 🟠 **Matematik V2:** sen oyna, hissiyat notu ver; sim4_final.py'yi insan verisiyle kalibre et
5. 🟠 **Oyun içi sahneler:** 12 bölüm temasına göre arka planlar
6. 🟡 **surum.json → 1.5.4** güncellemesi (canlı depo)

---

**Patron kararı bekleniyor:** Bu planı onaylıyor musun? Hangi işe önce hız verelim?

*"Bu daha başlangıç..."* — © 2026 Batuhan, BATUPIA Studios
