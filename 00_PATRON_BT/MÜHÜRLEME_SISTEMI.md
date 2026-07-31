# 🪨 BATUPIA - MÜHÜRLEME SİSTEMİ

**Resmi Mühürleme Protokolü**  
**Versiyon:** 1.0  
**Tarih:** 31.07.2026  
**Proje:** BATUPIA - Stonebreaking Universe

---

## 🎯 AMAÇ

Bu sistem, projenin her önemli aşamasını **resmi olarak mühürlemeyi** sağlar.  
Böylece:

- Hikaye bölümleri "mühürlü" hale gelir
- Varlıklar (görseller) onaylanır
- Kod ve yapı korunur
- Herkes "Bu haliyle resmi" diyebilir

---

## 📜 MÜHÜR TİPLERİ

| Kod       | İsim                    | Açıklama                              | Örnek Dosya                  |
|-----------|-------------------------|---------------------------------------|------------------------------|
| M-001     | Proje Temeli            | İlk yapı + klasör organizasyonu       | MÜHÜR-001-PROJE-TEMELI.md    |
| M-002     | Hikaye Mühürü           | Her bölümün tamamlanması              | MÜHÜR-002-BOLUM-01.md        |
| M-003     | Karakter Mühürü         | 4 ana karakterin final tasarımı       | MÜHÜR-003-KARAKTERLER.md     |
| M-004     | Görsel Mühürü           | Logo, maskot, tile onayları           | MÜHÜR-004-GORSELLER.md       |
| M-005     | Kod Mühürü              | Oyun motoru + ilk prototip            | MÜHÜR-005-KOD.md             |
| M-006     | Zihin Haritası Mühürü   | IQ testi + paylaşım sistemi           | MÜHÜR-006-ZIHIN-HARITASI.md  |
| M-999     | Genel Mühür             | Tüm proje kilidi (büyük milestone)    | MÜHÜR-999-TAMAM.md           |

---

## 🔐 MÜHÜR OLUŞTURMA KURALLARI

1. Her mühür **AI Teknik Ortak** tarafından hazırlanır.
2. **Kurucu Ortak (Batuhan)** onay verir.
3. Mühür dosyası `mühür/` klasörüne eklenir.
4. `SEAL_LOG.md` güncellenir.
5. Commit mesajı mutlaka şu formatta olur:  
   `🔒 MÜHÜR-[KOD]: [Açıklama]`

---

## 📁 KLASÖR YAPISI

```
batupia-stonebreaking/
├── mühür/                  ← Resmi Mühür dosyaları
│   ├── MÜHÜR-001-*.md
│   └── ...
├── seals/                  ← Otomatik seal kayıtları
├── story/
│   └── bolumler/           ← Mühürlü bölümler burada
├── assets/
├── .github/workflows/      ← Mühür kontrol workflow'ları
└── MÜHÜRLEME_SISTEMI.md    ← Bu dosya
```

---

## ✅ İLK MÜHÜR (M-001)

Bu dosya oluşturulduğunda **M-001** otomatik olarak aktif sayılır.

**Durum:** ✅ MÜHÜRLÜ (31.07.2026)

---

**"Bu daha başlangıç..."**  
© 2026 Batuhan - Tüm hakları saklıdır
