# 🔥 BATUPIA MÜHÜR SİSTEMİ v1.0

**Kod Adı:** SEAL_BREAKER  
**Sürüm:** v1.0  
**Tarih:** 01.08.2026  
**Onay:** Patron Batuhan  
**Durum:** PRODÜKSİYON HAZIR

---

## 📖 NEDİR?

Mühür Sistemi, BATUPIA'nın çekirdek oyun döngüsüdür. Oyuncu taşları eşleştirdikçe eski ruhların mühürlerini kırar ve element güçlerini serbest bırakır.

---

## 🎯 ÇALIŞMA PRENSİBİ

### Temel Döngü
```
Eşleştir → Mühür Kır → Güç Aç → Seviye Atla → Yeni Mühür
```

### Mühür Türleri

| Mühür | Element | Açılma Şartı | Ödül |
|-------|---------|--------------|------|
| **Alev Mühürü** | 🔥 Ateş | 10 eşleşme | Kor'un İlk Gücü |
| **Dalgacık Mühürü** | 💧 Su | 25 eşleşme | Baam'ın Bilgeliği |
| **Kristal Mühür** | 🗿 Toprak | 50 eşleşme | Mand'ın Dayanıklılığı |
| **Zephir Mühürü** | 💨 Hava | 100 eşleşme | Zepy'nin Öngörüsü |
| **Evren Mühürü** | ⭐ Birleşik | 500 eşleşme | Sınırsız Mod Açılır |

---

## ⚙️ TEKNİK DETAYLAR

### Mühür İlerleme Formülü
```javascript
sealProgress = (totalMatches / matchesForNextSeal) * 100;

// Her seviye için gereken eşleşme sayısı artar
matchesForNextSeal = baseMatches * (1 + (currentLevel * 0.2));

// Örnek:
// Seviye 1: 10 eşleşme
// Seviye 2: 12 eşleşme
// Seviye 3: 14.4 eşleşme
```

### Mühür Patlama Efekti (Visual)
- Canvas üzerinde parçacık sistemi
- Element rengine göre parçacık renkleri
- Ekran titreme efekti (shake)
- Ses: "crack + element chime"

### Kaydetme Sistemi
```javascript
localStorage.setItem('batupia_seals', JSON.stringify({
    unlocked: ['fire_v1'],
    currentProgress: 45,
    totalMatches: 128,
    lastOpened: '2026-08-01T14:30:00Z'
}));
```

---

## 🎨 GÖRSEL TASARIM

### Mühür İkonları (Canvas Draw)
```javascript
function drawSeal(ctx, type, progress, x, y, size) {
    // Arka plan daire
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = '#1a1a2e';
    ctx.fill();
    ctx.strokeStyle = getElementColor(type);
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // İlerleme çubuğu (dairesel)
    ctx.beginPath();
    ctx.arc(x, y, size - 5, -Math.PI/2, (-Math.PI/2) + (Math.PI * 2 * progress));
    ctx.strokeStyle = getElementColor(type);
    ctx.lineWidth = 4;
    ctx.stroke();
    
    // Sembol
    ctx.font = `${size}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(getSealSymbol(type), x, y);
}
```

---

## 🃏 KOLEKSİYON KARTI ENTEGRASYONU

Her açılan mühür, oyuncuya dijital bir **Koleksiyon Kartı** verir:

### Kart Özellikleri
- **Ön Yüz:** Karakter illüstrasyonu + Element sembolü
- **Arka Yüz:** BATUPIA logosu + Seri numarası
- **Nadirlik:** Mühür seviyesine göre (Common → Mythic)
- **Seri No:** `BATU-[ELEMENT]-[SEVİYE]-[RASTGELE]`
  - Örnek: `BATU-FIRE-01-X7K9`

### Fiziksel Ürün Tetikleyici
Mythic seviye mühür açıldığında:
- Otomatik e-posta: "Tebrikler! Fiziksel kart kazandınız!"
- Shopify/WooCommerce otomasyonu tetiklenir
- Üretim bandına düşer (T-shirt / Kolye / Kart)

---

## 🔐 GÜVENLİK

- Mühür verileri client-side encrypted
- Sunucu doğrulaması (isteğe bağlı anti-cheat)
- Her mühür açılışı timestamp ile kaydedilir

---

## 📋 v1.0 GÖREV LİSTESİ

- [x] Temel mühür mantığı yazıldı
- [x] İlerleme formülü tanımlandı
- [x] Görsel tasarım dokümanı hazır
- [ ] Parçacık efekti kodlanacak
- [ ] Ses efektleri eklenecek
- [ ] Koleksiyon kartı otomasyonu bağlanacak
- [ ] Fiziksel ürün entegrasyonu (API)

---

**Sonraki Sürüm:** v1.1 - Çoklu Oyuncu Mühür Savaşları

*Mühürlü'dür. Kırılmayı bekliyor.* 🔥
