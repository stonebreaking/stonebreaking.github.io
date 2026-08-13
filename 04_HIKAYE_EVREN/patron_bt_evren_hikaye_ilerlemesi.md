# 🔱 STONEBREAKING UNIVERSE — EVREN HİKAYE VE OYUN İLERLEMESİ
### PATRON BT SÜREKLİLİK PROTOKOLÜ — v6.7.9 (02.08.2026)
**Mühürleyen:** AI Teknik Ortak (PATRON BT)  
**Kurucu ve CEO:** Batuhan / BATUPIA Studios  

---

## 📖 1. EVRENİN KADERİ VE HİKAYE TEMELLERİ

STONEBREAKING, sıradan bir eşleştirme oyunu değildir. Bu oyun, antik mühürlerin kırılması, kadim element güçlerinin uyanması ve gezginlerin kendi nefes ritimlerini bulmalarının destansı hikayesidir.

### İki Ruh, Tek Kader
- **Erkek Stonebreaker (Kor):** Ateş Yolu'nun temsilcisi. Lav saçlı, cesur, volkanik zırh kuşanmış yıkıcı bir güç.
- **Kadın Stonebreaker (Baam):** Su Yolu'nun temsilcisi. Dalga saçlı, mercan taçlı, derin denizlerin bilgeliğini taşıyan koruyucu bir güç.

Gezginler, oyuna başladıklarında bu iki klandan birini seçerek ruhlarını mühürlerler.

### 4 Kadim Element Ruhu ve 12 Mühür Yolu
Yolculuk, her biri 3 bölümden oluşan 4 büyük element bölgesini kapsar. Her ruhun kendine ait bir hikaye çizgisi, mekanı ve mühürlü taşı vardır:

1. **Ateş Ruhu (Kor) — Bölüm 1-3 (Ateş Vadisi):** Alev Mührü'nün kırılması. İlk kıvılcımlarla uyanış.
2. **Su Ruhu (Baam) — Bölüm 4-6 (Derinlikler):** Dalgacık Mührü'nün sakinliği ve akışın bilgeliği.
3. **Toprak Ruhu (Mand) — Bölüm 7-9 (Kristal Mağara):** Kristal ve Granit Mühürler. Sabır ve dayanıklılık sınavı.
4. **Hava Ruhu (Zepy) — Bölüm 10-12 (Gökyüzü Tapınağı):** Rüzgar Mührü ve nihayetinde Evren Mührü'nün kırılarak Sonsuz Mod'un kapısının açılışı.

---

## 🪨 2. MAHJONG OYNANIŞ MEKANİĞİ VE BİZİM EVRENİMİZDEKİ KARŞILIĞI

Mahjong Solitaire, bizim evrenimizde **"Mühür Taşı Okuma ve Kırma"** ritüelidir. Oynanış stili klasik üçlü eşleştirmeye (Triple-Match) benzese de, her eylem evrenimizin nefes diliyle anlam kazanır:

### Taş Anayasası ve Görsel Kimlik
- **Lava-Core Master Referansı (`ates_06_lava_core.png`):** Tüm taşlar bu ağır, 3D metal rune çerçeveli, lava çatlaklı gövde yapısını miras alır.
- **Şeffaf PNG (RGBA):** Taşların arka planı şeffaftır, "balonun içinde taş" görüntüsü tamamen kaldırılmıştır. Taşlar zeminle bütünleşir.
- **Sıkı Grid ve Yığın Düzeni:** Taşlar üst üste yığılır. Sadece üstü ve en az bir tarafı (sağ veya sol) açık olan taşlar serbest kalır ve seçilebilir.
- **Garantili Çözülebilirlik:** Rastgele yerleşim yoktur. Tahta, yığın bazlı solitaire algoritmasıyla üretilir; yani her oyun kesinlikle çözülebilirdir, oyuncu asla çıkmaza girmez!

### Tepsi ve Kader Mekaniği (Aynı 2 Taş Kuralı)
- Oyun alanının üstünde bir **"Mühür Tepsisi"** bulunur (Maksimum 5 yuva kapasiteli).
- **Kader Kuralı:** Tepsiye aynı tipten **2 taş yan yana geldiğinde** anında patlayarak yok olur ve oyuncuya nefes kazandırır!
- Tepsi dolduğunda (5 taş biriktiğinde) mühür kilitlenir ve bölüm başarısız olur.

### Hikaye Geri Bildirim Sözlüğü (YASAK kelimeler elendi!)
Geleneksel oyunlardaki yapay tebrikler bu kutsal evrende yasaklanmıştır:
- ❌ *Good / Harika* yerine ➡️ **Nefes Al** (İlk ritim uyuşması)
- ❌ *Great / Muhteşem* yerine ➡️ **Mühür Kır** (Magmanın hareketlenişi)
- ❌ *Perfect / Kusursuz* yerine ➡️ **Evren Nefesi** (Dört elementin uyumu)

---

## 🛠️ 3. PATRON BT SÜREKLİLİK VE TEKNİK GELİŞME RAPORU

Batuhan (Patron) talimatları doğrultusunda projenin son halinde yapılan büyük yapısal devrimler:

### ✅ 1. Logo ve Sahne Bütünlüğü Devrimi
- **Hata:** Splash ekranındaki ana logo (`muhur-logo`), `mix-blend-mode: screen` yüzünden yıkanmış, şeffaf ve arka plandan kopuk görünüyordu. Taş dokusu tamamen kaybolmuştu.
- **Çözüm:** Mix-blend-mode `normal` olarak değiştirildi. Agresif radial-gradient maskesi kaldırıldı ve yerine sadece kenarları hafifçe yumuşatan ince bir maske (`radial-gradient(circle, #000 82%, transparent 98%)`) uygulandı. Logo artık sahneye işlenmiş, gölgeleri ve taş dokusuyla capcanlı, ağır bir metal madalyon bütünlüğündedir!
- **BATUPIA Intro:** SAHNE -1'deki stüdyo logosu da aynı şekilde `normal` blend moduna çekilerek sahneyle kusursuzca bütünleştirildi.

### ✅ 2. Harici STONEBREAKING Yazılarının Temizliği
- **Hata:** Karakter Seçimi (SAHNE 2) ve Ruh Seçimi (SAHNE 3) sayfalarının en üstünde floating şekilde sırıtan redundant (gereksiz) `STONEBREAKING` başlıkları bulunuyordu.
- **Çözüm:** `screen-character` ve `screen-spirit` üzerindeki harici `<div class="brand-logo sm">STONEBREAKING</div>` etiketleri tamamen kaldırıldı. Sayfalar tamamen "Stonebreaker'ını Seç" ve "Element Ruhunu Seç" odaklı hale gelerek arayüz karmaşasından kurtarıldı.

### ✅ 3. Evrene Uygun "Antik Taş Mühür" Butonu
- **Hata:** "Maceraya Başla" ve "Sonsuz Moda Gir" butonları modern, plastik ve yuvarlatılmış (`border-radius: 13px`) web butonları gibiydi, ağır taş evrenimize yakışmıyordu.
- **Çözüm:** `.btn-seal` tamamen sıfırdan tasarlandı:
  - `border-radius: 4px` keskin, chiseled (elle yontulmuş) kaya köşeleri.
  - 3px kalınlığında ağır tunç/taş çerçeve (`border: 3px solid #703a1a`) ve derinlik konturu.
  - Magma ve bazalt taşı dokulu koyu gradient arka plan.
  - İç kısımdan sızan kızgın lava ışıltısı ve hover durumunda parlayan antik rünler (`.bs-rune`).
  - Buton artık basılmayı bekleyen ağır bir antik mühür tableti hissi veriyor!

---

## 🚨 4. GITHUB TEK YEDEK PROTOKOLÜ (MÜHRÜ)

- Sandbox ortamındaki `.git` klasörünün oturumlar arası silindiği kesin olarak tespit edilmiştir.
- **Bu nedenle tek kalıcı ve güvenli yedeğimiz GitHub deposudur.**
- Bu rapor yazıldıktan sonra anında yerel değişiklikler commit edilecek ve yedekleme disiplinine uygun olarak GitHub'a push edilmeye hazır hale getirilecektir.

---

*🔱 STONEBREAKING v6.7.9 — Antik Mühürlerle Korundu. BATUPIA Studios 2026.* ✅
