# 🚀 SIRADAKİ ADIM — P0 DÜZELTMESİNİ YAYINA AL (v=154)

**Hedef:** "Hemen Oyna sonrası tahta görünmüyor" hatasını düzelt.
**Yöntem:** GitHub web editörü (terminal yok, ~5 dakika).
**Durum:** AI bu düzeltmeyi `STONEBREAKING_REPO/` klonunda uyguladı ve **doğruladı** (node --check ✅).

> ✅ Bu dosyadaki tüm parçalar gerçek dosyalardan doğrulanmıştır (31.07.2026).

---

## 📄 DOSYA 1 — `js/game.js`

Adres: https://github.com/stonebreaking/stonebreaking.github.io/edit/main/js/game.js
→ kalem ✏️ ikonuna bas.

### Değişiklik 1/2 — `showScreen` fonksiyonu

`Ctrl+F` ile `function showScreen` ara. **Mevcut 4 satırı tamamen sil:**

```js
function showScreen(id) {
  ["realms", "levels", "game"].forEach(screenId => document.getElementById(screenId).classList.add("hide"));
  if (id) document.getElementById(id).classList.remove("hide");
}
```

Yerine bunu yapıştır:

```js
function showScreen(id) {
  ["realms", "levels", "game"].forEach(screenId => document.getElementById(screenId).classList.add("hide"));
  if (id) {
    document.getElementById(id).classList.remove("hide");
    // Güvenlik ağı (1.5.4): bir oyun ekranı açıksa hikâye sahneleri kapalı olmalı.
    // Aksi hâlde .scene (z-index 80) .screen (z-index 70) üstünü örter.
    ["f1", "f2", "f3"].forEach(sceneId => document.getElementById(sceneId)?.classList.add("hide"));
  }
}
```

### Değişiklik 2/2 — `btnQuickPlay` (Hemen Oyna)

`Ctrl+F` ile `Metrics.track("quick_play"` ara. **Şu iki satırın ARASINA** tek satır ekle:

```js
  ["f1", "f2", "f3"].forEach(id => document.getElementById(id)?.classList.add("hide"));
```

Son hâli şöyle olmalı (orijinal satırlar korunur):

```js
  Metrics.track("quick_play", { level: 1 });
  ["f1", "f2", "f3"].forEach(id => document.getElementById(id)?.classList.add("hide"));
  Game.start(1);
  document.getElementById("btnVStart")?.click();
```

### 💾 Commit

Yeşil **"Commit changes..."** → mesaj:

```
fix(P0): Hemen Oyna sonrasi tahta gorunmuyordu
```

"Commit directly to the main branch" → **Commit changes**.

---

## 📄 DOSYA 2 — `game.html` (cache yenileme)

Adres: https://github.com/stonebreaking/stonebreaking.github.io/edit/main/game.html

`Ctrl+F` ile `v=153` ara, **3 yeri** `v=154` yap:

| Yer | Eski | Yeni |
|-----|------|------|
| ~12. satır | `css/game.css?v=153` | `css/game.css?v=154` |
| ~103. satır | `js/story.js?v=153` | `js/story.js?v=154` |
| ~104. satır | `js/game.js?v=153` | `js/game.js?v=154` |

> ⚠️ Bu adım şart — yapılmazsa tarayıcı eski game.js'i önbellekten okur.

**Commit changes...** → mesaj:

```
release: 1.5.4 cache anahtari
```

→ **Commit changes**

---

## ✅ KONTROL (1–2 dakika sonra)

1. https://stonebreaking.github.io/game.html
2. `Ctrl+F5` (sert yenileme — önemli!)
3. **HEMEN OYNA**'ya bas
4. **Taş tahtası görünmeli** 🎉

Görünmezse bir dakika bekle, tekrar `Ctrl+F5`. Hâlâ yoksa: `F12` → Console → kırmızı hata varsa bana yapıştır.

---

## 🔁 ALTERNATİF (EN KOLAY): AI'dan push — `.env` ile

Workspace'teki klon (`STONEBREAKING_REPO/`) düzeltilmiş ve doğrulanmış haldedir.
Hazır `.env` dosyası: `BATUPIA/.env` (gitignore'lu, git'e girmez).

1. `BATUPIA/.env` dosyasını aç, `GITHUB_TOKEN=buraya_token_yapistir` satırına
   yalnızca **"repo" kapsamlı** yeni token'ını yapıştır (SOHBETE ASLA YAZMA).
2. Kaydet (klasöre bırak). 
3. De ki: "hazır" — AI çalıştırır: `bash scripts/push_live.sh`
   → commit + push (token ekrana yazılmaz) → canlı doğrulama.
4. İş bitince token'ı GitHub'da **revoke** edebilirsin (öneri).

> Güvenlik: Token bu çalışma alanında AI tarafından okunabilir. Bu, Patron'un
> kendi kararıdır. En az yetki ilkesi: repo-only scope, iş bitince revoke.

---

© 2026 Batuhan — BATUPIA Studios
