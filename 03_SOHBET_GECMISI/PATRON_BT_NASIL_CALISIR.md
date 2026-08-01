# 🧠 PATRON BT SÜREKLİLİK SİSTEMİ (v6.3)

**Tarih:** 01.08.2026  
**Sahip:** Batuhan  
**Sistem:** v6.3 - KAYIP ÖNLEYİCİ · GITHUB TEK YEDEK

---

## 🚨 KRİTİK GERÇEK (01.08.2026 ölçüldü)

> **Workspace `.git` klasörü oturumlar arası KAYBOLUYOR.**  
> Sandbox snapshot'ı `.git` dizinini taşımıyor. Çalışma dosyaları kalıyor, ama git geçmişi sıfırlanıyor.
> → **TÜM DOSYA YEDEKLERİ SADECE GITHUB'DA KALICIDIR.**

### Yeni Kural (Patron emri — mühürlü)
1. **Her işlem tamamlanınca** → Patron'dan `GITHUB_TOKEN` iste
2. Token'ı `01_GIZLI/.env`'e yaz (asla commit etme — gitignore'da)
3. `git push` ile GitHub'a yedekle
4. Token'ı ve `.env`'i SİL → remote'u token'sız yap
5. Devam et. Yedek yoksa iş bitmiş sayılmaz.

### Git kaybolursa (bilinen davranış)
```bash
git init -b main
git remote add origin https://github.com/stonebreaking/stonebreaking.github.io.git
git fetch origin main
git reset --mixed origin/main   # çalışma dosyaları korunur, git geçmişi GitHub'dan gelir
```

---

## ❓ "KONUŞMA GEÇMİŞİMİZ DURUYOR MU?"

**CEVAP:** SOHBET sıfırlanabilir, ama PROJE ASLA KAYBOLMAZ — GitHub'da.

### Nasıl Çalışır?

| Bileşen | Durum | Açıklama |
|---------|-------|----------|
| **Sohbet (Chat)** | 🟡 Geçici | AI belleği limitli, sıfırlanabilir |
| **Workspace Dosyaları** | 🟢 KALICI (kısmen) | `/home/user/` altındaki dosyalar kaydedilir, **`.git` kaybolur** |
| **GitHub Repo** | 🟢 KALICI TEK YEDEK | Her push ile bulutta yedeklenir |
| **PATRON BT Logları** | 🟢 KALICI | Markdown olarak GitHub'a push edilir |

### Senaryo: Yeni AI Oturumu Açtın

**SENARYO:** Bu sohbet kapandı, yeni bir AI'a geçtin.

**ÇÖZÜM:**
1. `03_SOHBET_GECMISI/YENI_AI_BASLANGIC_MESAJI.md` içindeki başlangıç mesajını yapıştır
2. AI workspace'i senkronlar (git init + fetch + reset — yukarıdaki komut)
3. `00_PATRON_BT/patron_bt_aktivite_logu.md` + `RESMI_ACILIS_SONRASI_MUHRU.md` okunur
4. Kaldığın yerden devam edersin. KAYIP YOK! (GitHub sayesinde)

---

## 📁 PROJE KLASÖR YAPISI

```
repo/  (stonebreaking.github.io)
├── 00_PATRON_BT/          ← PATRON BT yönetim (log, talimat, mühür)
├── 03_SOHBET_GECMISI/     ← Süreklilik dokümanları
├── 04_HIKAYE_EVREN/       ← 12 bölüm diyalog, storyboard, akış
├── 05_KARAKTERLER/        ← Karakter kartları
├── 06_GRAFIK/             ← TÜM görseller (taşlar, sahneler, logolar)
├── 09_KOD/                ← Kod kopyaları (senkron)
├── 10_OYUN_MEKANIK/       ← Mekanik dokümantasyon
├── 17_REFERANSLAR/        ← Video analizi (kader)
├── 26_MUHUR_SISTEMI/      ← Mühür sistemi
├── 28_DENETIM_PROTOKOLLERI/ ← Envanter/denetim
├── 29_ACIL_TOPLANTI/      ← Durum raporları
├── css/ js/ test/         ← Çalışan kod
└── index.html             ← Canlı site (root)
```

---

## 🔐 GÜVENLİK GARANTİSİ

- Token `.env`'de, `.gitignore` koruyor; push sonrası SİL
- Token sohbette göründüyse push sonrası GitHub'dan revoke et
- Her push öncesi `.env`'in commit'e girmediği denetlenir
- Tüm değişiklikler loglanıyor
- Veri kaybı riski: %0 (GitHub tek yedek + push disiplini)

---

## 🎯 MARKA KİMLİĞİ (Güncel)

| Marka | Rol | Kullanım Alanı |
|-------|-----|----------------|
| **Stonebreaking** | 🎮 Oyun Markası | Oyun başlığı, web sitesi, store sayfaları |
| **BATUPIA** | 🏢 Şirket Adı | Şirket kimliği, telif, imza |
| **Stonebreaking Universe** | 🌌 Evren Adı | Oyun alt başlığı, hikaye evreni |

**Doğru Kullanım:**
- ✅ "Stonebreaking - by BATUPIA Studios"
- ✅ "Stonebreaking Universe"
- ❌ "BATUPIA" (tek başına oyun adı olarak)

---

*PATRON BT ÇALIŞIYOR. GITHUB TEK YEDEK. KAYBETMEK YOK.* ✅

*Bu dosya her yeni AI oturumunda ilk okunacak dosyadır.*
