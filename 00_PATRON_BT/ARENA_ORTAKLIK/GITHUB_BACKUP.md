# 🗄️ GitHub Yedekleme Politikası

> **Amaç:** Hiçbir dosyanın kaybolmaması. "Kaybetme yok" ilkesi.

## Gerçekçi Yedekleme Sözü (SLI)

"Her an her saniye" düzeyinde **otomatik arka plan senkronu bu ortamda çalıştırılamaz**
(arka plan işlemleri sohbet sonunda kapanır). Bunun yerine uygulanan garanti şudur:

1. **Çalışma alanı otomatik kayıt:** Arena çalışma alanındaki (BATUPIA/) tüm dosyalar
   her mesaj arasında otomatik olarak saklanır. Sohbet kapanıp yeniden açılsa bile
   dosyalar kaybolmaz. ✅
2. **Görev sonrası commit + push:** Her tamamlanan görev/adımın sonunda,
   git depomuza commit atılır ve (kimlik bilgileri tanımlıysa) GitHub'a push edilir.
   ✅ → Bu pratikte "adım adım sürekli yedek" demektir.
3. **GitHub + yerel kopya (öneri):** GitHub'a ek olarak kendi bilgisayarında da
   `git clone` alırsan iki ayrı yerde kopya olur → gerçek felaket kurtarma.

## Token Güvenliği (Değişmez Kurallar)

- Token `.env` dosyasında tutulur, **asla sohbete yazılmaz**.
- `.env`, `.gitignore` ile commit dışına alınır → GitHub'a **asla** gitmez.
- Token commit mesajına, rapora veya dosya adına yazılmaz.
- `.env` değişirse, GitHub'da **Token'ı iptal edip yenisi üretmek** en güvenlisidir.
- Token'a yalnızca `repo` kapsamı (scope) verilmesi önerilir.

## Push Akışı

```
Görev tamam → 12 madde denetimi → Rapor → Patron onayı → Commit → Push
```

## Bu Depodaki Yedek Komutları

- `scripts/git_pusher.sh` — denetimli commit + push (token'ı .env'den okur, ekrana yazmaz)
- `git log --oneline` — geçmiş kayıtları görüntüle
- `git status` — bekleyen değişiklikleri gör

## Kimlik Bilgilerini Tanımlama (.env)

`.env.example` dosyasını kopyala, doldur:

```bash
cp .env.example .env
```

- `GITHUB_TOKEN=ghp_...` (yalnızca repo kapsamı)
- `GIT_REPO_URL=https://github.com/KULLANICIADI/BATUPIA.git`

> Not: Arena çalışma alanı AI ile paylaşıldığı için token AI tarafından okunabilir.
> Token paylaşımı Patron'un kendi kararıdır; minimum yetkili (repo-only) token kullan.
> Token'ın kopyalanmasını önlemek için `.gitignore` içindeki `.env` kuralı korunmalıdır.

© 2026 Batuhan — BATUPIA Studios
