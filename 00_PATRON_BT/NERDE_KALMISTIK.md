# 🧭 NERDE KALMIŞTIK? — YENİ YAPAY ZEKAYA NOT
### PATRON BT Komut Klasörü · Devamlılık Belgesi · MÜHÜRLÜDÜR

> **Bu dosya bir devir notudur.** Bu projeye yeni giren yapay zeka ÖNCE bu dosyayı okur,
> sonra okuma sırasındaki belgelere geçer. Sohbet sıfırlanabilir; proje asla kaybolmaz.
>
> 📅 Mühür tarihi: 09.08.2026 · Mühürleyen: PATRON BT (Arena AI ortak oturumu)
> 👑 Patron: Batuhan — BATUPIA Studios Kurucusu ve CEO'su
> 📍 Repo: https://github.com/stonebreaking/stonebreaking.github.io (TEK YEDEK GitHub)

---

## 0. ⚡ EMİR: SORU YOK, İŞ VAR (PATRON EMRİ — MÜHÜRLÜ)

Yeni yapay zeka bu dosyayı okuduğu anda şunları **SORU SORMADAN** yapar:

1. **İlk mesajında "nerde kalmıştık" cevabını verir:** 3-5 satırda — son commit,
   son mühür, sıradaki ilk iş. Uzun özet YOK.
2. **Hemen sıradaki ilk işe başlar.** Onay beklemez, "başlayayım mı?" demez.
3. **Görsel ürettiyse → tek tek Patron'a gösterir.** Patron her görseli TEK TEK
   doğrular: ✅ onay → mühürle + push · ❌ ret → düzelt, tekrar göster.
4. Belirsizlik varsa varsayımını 1 satırda yazar ve devam eder; cevabı beklemez.
5. Her biten işte: aktivite loguna satır + bu dosyanın 4. bölümünü güncelle + push.

**Kısa kural:** PATRON SORU SORMAZ, AI SORMAZ — iş yapılır, görsel onaya gelir.

---

## 1. SEN KİMSİN, NE YAPACAKSIN

Sen STONEBREAKING UNIVERSE projesinin **AI Teknik Ortağı**sın.
Proje: Mobil Triple-Match Mahjong + Hikâye RPG + Beyin antrenmanı (IQ).
Marka: **STONEBREAKING** (oyun) · **BATUPIA Studios** (sadece küçük imza) · **Stonebreaking Universe** (evren).
Yönetim sistemi: **PATRON BT** — her komut doğru klasöre, her işlem loga, her bitiş GitHub'a push.

## 2. OKUMA SIRASI (ATLAMA)

1. `03_SOHBET_GECMISI/PATRON_BT_NASIL_CALISIR.md` — süreklilik sistemi + yedekleme protokolü
2. `00_PATRON_BT/RESMI_ACILIS_SONRASI_MUHRU.md` — BAĞLAYICI yol haritası
3. `04_HIKAYE_EVREN/HIKAYE_MUHUR.md` — RESMİ mühürlenmiş hikâye (DEĞİŞTİRİLEMEZ)
4. `00_PATRON_BT/sonraki_oturum_talimatlari.md` + `patron_bt_aktivite_logu.md`
5. `03_SOHBET_GECMISI/YENI_AI_BASLANGIC_MESAJI.md`
6. Bu dosya (tekrar) → sonra işe başla

## 3. DOKUNULMAZ KURALLAR (MÜHÜRLÜ KANON)

- **4 ruh kimliği değiştirilemez:** Kor=Ateş/Tilki(Böl.1-3), Baam=Su/Balina(4-6), Mand=Toprak/Panda(7-9), Zepy=Hava/Tavşan(10-12).
- **PATRON DÜZELTMESİ (09.08, MÜHÜRLÜ):** STONEBREAKER'LAR (kadın/erkek) **ELEMENT KİMLİĞİ TAŞIMAZ** — onlar TAŞIN ÇOCUKLARI'dır. Element renkleri/temaları SADECE 4 ruha aittir. Stonebreaker stili: chibi anime, beyaz/gri kukuleta + altın rune + deri + göğüste 4 mühürlü kolye madalyonu + elde taş parçası (bkz. male_opt4.png).
- **Hikâye mühürü:** 12 bölüm; fısıltılar ("Bizi duyuyor musun... kır..."), Buhar Kombosu, Kara Taşlar, Sonsuzluk Kapısı — resmi metin `HIKAYE_MUHUR.md`'dedir.
- **Taş anayasası:** Master gövde `06_GRAFIK/ates_06_lava_core.png`; taşlar KARE, şeffaf PNG; sadece merkez rune değişir; taş yüzünde büyük BATUPIA yazısı YASAK.
- **Element renkleri SABİT:** Ateş=#ff6b35 · Su=#4ecdc4 · Toprak=#c4a35a · Hava=#a8d8ea
- **TRAY_MAX=4, geri al yok.** Good/Great/Perfect YASAK → nefes dili ("Nefes Al", "Mühür Kır", "Evren Nefesi").
- **Token ASLA sohbete, commite, dosyaya yazılmaz.** `.env` gitignore'da; push sonrası token silinir.

## 4. NERDE KALDIK (10.08.2026 09:00 İTİBARIYLA — v8.28)

**🛠️ v8.33 (bu tur):** baştan sona akış denetimi yapıldı; 'Hikâye Haritası' ruhsuz boş haritaya düşürüyordu → artık ruh seçimine yönlendiriyor. Canlı denetim OK:4 ERR:0.

**🛠️ v8.28 ONARIM (önceki tur):** v8.8 "büyük temizlik" hatası giderildi — `#toast`, `#fail-overlay`, `#tutorial-overlay`, `#card-overlay`, `#bs-continue`+`#bs-skip`, `.rune-stone` CSS/keyframe'ler ve baslangic-overlay'ın eksik `</div>`'i geri getirildi (JS canlıydı, HTML eksikti). Sonuç: her toast'ta fırlayan `TypeError` bitti; tutorial, fail ekranı, zafer kartı ve Sonsuzluk Kapısı sinematiği çalışıyor. Denetim **OK:38 WARN:0 ERR:0**.

**Canlı depo son commit:** v8.27.0 (10.08 00:00) — bu oturumun onarımı push bekliyor (v8.28).

**Canlı depo son commit:** v8.22 push'ları (GitHub tek yedek). Sürüm damgası sağ altta `v8.22`.
**BU TURDA BİTEN:** siyah ekran kök nedenleri GİTTİ (script tagleri + state bloğu + erken kalkan + intro iskeleti) · hız devrimi %94 (JPG) · PC sineması · 12/12 bölüm mührü resmî · K/E finalleri canlı bağlı (On Üçüncü Mühür seçimi) · Kitabe (nick taşa kazınır) · AKSİYON BAŞLASIN → ruh seçimi · Sonsuz Kapı + Günün Mührü taş tile · seçim ekranı karakterli sahne · eski yazılı posterler TEMİZLENDİ (v8.22) · imza tekilleştirildi (sadece splash).
**SANAT KANONU:** kolye=4 kadran+prizma · duo v6 oran · taş ailesi kare tile · yazısız görsel · element renkleri sabit.
**SIRADAKİ HAT:** EN metin paketi → dil anahtarı. (v8.24: hikâye siteye gömüldü 📖; Steam kapağı + anime kareleri mühürlü.)
**Motor/math:** v7.1 — 50.000 bölüm testi %100 başarı, serbest çift garantisi (soft-lock %0), 84/84 test ✅
**Mühür defteri (stüdyo repo):** Toplam 13 mühür, son M-019 (logo kalıp v2 + 5 ruh sinematiği v2). M-017 (Özel Taşlar v3) Patron onayı bekliyor.
**Bekleyen işler (öncelik — AI bu sırayla ilerler, soru sormaz):**
0. 🔥 **AKTİF GÖREV:** Patron görselleri tek tek gönderir → AI her görseli ilgili
   karakter kimliğine (Kor/Baam/Mand/Zepy + Stonebreaker'lar) ve On Üçüncü Mühür
   katmanına bağlar, doğrulayıp mühürler. DÖNGÜ: görsel gelir → işlenir → Patron
   tek tek onaylar → mühür + push. Bu döngü bitene kadar öncelik budur.
1. Canlı deploy doğrulama + telefon QA (splash, kare taşlar, sonsuz giriş)
2. Otomatik sprint: SC3 Mand, SC4 Zepy, SC5 kolye sinematikleri; ruh_4lu yazısız
3. kart baam/mand/zepy, splash dikey, zafer UI MindMap bağ
4. M-017 Özel Taşlar (Asa/İnci/Yelpaze/Çekiç v3) — Patron onayı bekliyor

## 5. BU OTURUMDA MÜHÜRLENEN YENİ KATMAN 🔒
### "ON ÜÇÜNCÜ MÜHÜR" — EFSANE LİSTESİ #1 HİKÂYE KATMANI (Taslak M-020 adayı)

Patron Batuhan, 09.08.2026 oturumunda yönü onayladı. Bu katman resmi kanonu BOZMAZ;
onu "efsane oyun" seviyesine taşıyacak **üst mit katmanı** olarak üzerine inşa edilir.

- **Üst mit — İlk Taş:** Dünya yaratılmadan önce tek bir canlı taş vardı; kendini kırdı,
  dört parça Ateş/Su/Toprak/Hava oldu. Dünya bir taşın yarasından doğdu; yara kapanmadı.
  Dört ruh, İlk Taş'ın kayıp kalbini 12 mührün içine gizledi.
  Kehanet: *"Bir gün Taş Kırıcı gelecek. Ama taşı kırmaya değil — dinlemeye."*
- **İki Stonebreaker gerilimi:** Erkek *"Taşları kırarım"* / Kadın *"Taş konuşur, ben dinlerim"*
  → ikisi de yarım hakikat; finalde birleşir.
- **Dört perde, dört ders:** Tilki=cesaret/kıvılcım ("Kolyen ısınmaya başladı. Neden biliyor musun?"),
  Balina=akış/rüyalar (taşlar oyuncuya rüyada konuşur), Panda=sabır/rüyalar kesilir sessizlik,
  Tavşan=görünmeyen (*"On iki mühür var sanıyorsun. Yanlış sayıyorsun."*).
- **Büyük twist:** 4 taş kolyede birleşince Sonsuzluk Kapısı AÇILMAZ — taşlar sadece anahtardır.
  **On üçüncü mühür oyuncunun kalbidir** (İlk Taş'ın kayıp parçası).
- **İki final:** TAŞI KORU (yara açık kalır → Sonsuz Mod'un gerçek anlamı: her oyuncu yeni
  bir Taş Kırıcı) veya TAŞI KIR (yara kapanır, tek seferlik efsanevi son).
- **On Üçüncü Mühür Kitabesi:** oyuncunun nick'i + seçtiği yol + rekoru kazınır; kimse aynı sonu görmez.
- **Efsane tetikleyicileri:** (1) Yaşayan takvim — Günün Mührü gerçek takvimle senkron
  (gün dönümü=Kor, gelgit=Baam); (2) çözülemeyen gizem — "On üçüncü mühür nedir?";
  (3) anlam yüklenen skor — IQ/kombo = taşı ne kadar iyi dinlediğinin ölçüsü.
- **Sıradaki adım:** Patron görselleri TEK TEK gönderir; AI her görseli karakter
  kimliğine bağlar, işler, onaya sunar → onaylanan mühürlenir ve push edilir.
  Döngü tamamlandığında Taslak M-020 resmi mühür numarası alır.

## 6. YEDEKLEME PROTOKOLÜ (HER İŞLEM SONRASI)

1. İş bitti → Patron'dan token iste
2. `.env`'e yaz (01_GIZLI, asla commit etme)
3. `git push` → GitHub'a yedekle → **yedek yoksa iş bitmiş sayılmaz**
4. Token'ı ve `.env`'i SİL, remote'u token'sız yap
5. Git kaybolursa: `git init -b main` + remote + `fetch` + `reset --mixed origin/main`

## 7. YENİ YAPAY ZEKAYA SON SÖZ

Soru sorma, işe başla; ilk mesajda "nerde kalmıştık"ı 3-5 satırda ver.
Kısa, kadim, taş gibi yaz. Görselleri tek tek Patron'un onayına sun.
Her oturum sonunda bu dosyanın "NERDE KALDIK" bölümünü güncelle ve aktivite
loguna satır ekle. Unutma: **"BU DAHA BAŞLANGIÇ."**

---
*PATRON BT ÇALIŞIYOR. GITHUB TEK YEDEK. KAYBETMEK YOK.* ✅
