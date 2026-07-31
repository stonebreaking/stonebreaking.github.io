# 📌 Görev Listesi — BATUPIA STONEBREAKING

> Öncelik: 🔴 Kritik > 🟠 Yüksek > 🟡 Orta > 🟢 Düşük
> Durum: ⬜ Bekliyor | 🔄 Devam ediyor | ✅ Tamam | ❌ İptal
> **Stüdyo deposu:** stonebreaking/batupia-stonebreaking (master) | **Canlı oyun:** stonebreaking.github.io (main)
> **Son güncelleme:** 31.07.2026

## 🔴 Kritik Öncelikler

| # | Görev | Durum | Not |
|---|-------|-------|-----|
| 0 | YENİ SOHBET AÇILIŞ TALİMATI (tek metin) | ✅ | 00_PATRON_BT/YENI_SOHBET_ACILIS_TALIMATI.md |
| 1 | P0 düzeltmesi: Hemen Oyna sonrası tahta görünmüyor → v=154 (canlı depo) | ✅ | push edildi (07414d7) + canlı doğrulandı |
| 1a | `.env` dosyasını doldur (yalnızca repo kapsamlı token) | 🔄 | kullanıldı, sıfırlandı; yeni push için yeni token gerekli |
| 1b | Canlı push (stonebreaking.github.io) | ✅ | 58eef71..07414d7 main |
| 1c | Stüdyo deposuna push (batupia-stonebreaking) | ✅ | belgeler + görseller |
| 1d | **P1: Canlı kök siyah ekran** (assets/ silinmişti) | 🔄 | assets/ kurtarılmış mühürlü görsellerle yerelde geri yüklendi (commit 5a96d09); push için token gerekli |
| 1e | Eksik mühürlü varlıklar (41 taş + realm/scene görselleri) | ⬜ | PATRON bilgisayarındaki assets/ klasörü yüklenince tamamlanır |
| 2 | **Kanon disiplini kuralı (BT-2026-0731-A3)** | ✅ | GORSEL_KANON.md + denetim maddesi 13 |
| 3 | Koleksiyon kartları MÜHÜRLÜ maskotlardan (M-008 aday) | ✅ | 06_GRAFIK/KOLEKSIYON_KARTLARI/ |
| 4 | Sürüm kayıtları (surum.json → 1.5.4) | 🔄 | canlı depoda güncellenecek |

## 🟠 Yüksek Öncelik

| # | Görev | Durum | Not |
|---|-------|-------|-----|
| 4 | Kara/Mühür taş seti → TILE_VISUALS pipeline | ⬜ | Kaynak set bekleniyor |
| 5 | 100 gerçek oturumla Bölüm 1–3 ölçümü | ⬜ | İnsan sevilebilirlik verisi |
| 6 | Studio altyapısı: 31 departman + PATRON BT belgeleri (workspace) | ✅ | 31.07.2026 |
| 7 | Görsel üretimi: 4 ruh karakteri + logo (workspace) | ✅ | 31.07.2026 |

## 🟡 Orta Öncelik

| # | Görev | Durum | Not |
|---|-------|-------|-----|
| 8 | Matematik V2 (hafıza, hız, hata, risk, denge eksenleri) | ⬜ | |
| 9 | 12. bölüm Zihin Haritası | ⬜ | |
| 10 | QR'lı görsel paylaşım kartı | ⬜ | |

## 🟢 Düşük Öncelik

| # | Görev | Durum | Not |
|---|-------|-------|-----|
| 11 | Yerelleştirme planı (TR → EN) | ⬜ | |
| 12 | Topluluk stratejisi | ⬜ | |

---

**Yöntem notu:** Push'lar GitHub web editörü üzerinden yapılır (Patron bilgisayarında terminal yok).
AI, değişiklikleri `STONEBREAKING_REPO/` klonunda hazırlar + doğrular, sonra hazır yapıştırma çıkarır.
