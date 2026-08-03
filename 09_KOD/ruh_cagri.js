/* =========================================================
   RUH_CAGRI v1.0 — M-013 kademe-1: ruh geri-dönüş mesajları
   Kaynak: M-008 mühürlü vizyon ("Belirli vakitlerde küçük
   mesajlarla insanları geri çağır" — Patron BT 03.08)
   Mantık:
     - Açılışta (init) son görüş zamanı okunur, fark ölçülür,
       günlük seri güncellenir, "şimdi" mühürlenir.
     - Macera kapısından girişte (maybeShow) fark ≥ 4 saatse
       oyuncunun ruhu ona seslenir; seri ≥ 2 günse alt satırda
       kutlanır. Oturum başına en fazla 1 kez.
   Bağımlılık yok: STONE_SPIRITS/STONE_ELEMENTS varsa renk
   oradan alınır, yoksa altın (#ffd194) kullanılır.
   ========================================================= */
(function () {
  'use strict';

  var LS_SON = 'stonebreaking_last_seen_v1';
  var LS_SERI = 'stonebreaking_streak_v1';
  var ILK_ESIK_MS = 4 * 3600e3;      // 4 saat — kademe-1 eşiği
  var KISA_MS = 48 * 3600e3;         // 4 saat – 2 gün
  var ORTA_MS = 7 * 24 * 3600e3;     // 2 – 7 gün
  // 7+ gün → 'uzun'

  // Ruh sesleri — maskot kanonu (M-006): KOR kurt, BAAM balina,
  // MAND ayı, ZEPY tavşan. Kor'un uzun yokluk repliği mühürlü
  // kanondur: "Beni yalnız bırakma, yoksa yine yakarım."
  var RUHLAR = {
    kor: {
      emoji: '🐺',
      kisa: ['Kor’un ateşi sönmedi, seni bekledi. 🔥', 'Közler hâlâ sıcak… Kor kapıdaydı.'],
      orta: ['Taşlar soğumaya başladı. Kor sabırsızlanıyor…', 'Alevler alçaldı; dönersen yükselir.'],
      uzun: ['Beni yalnız bırakma, yoksa yine yakarım. — Kor']
    },
    baam: {
      emoji: '🐋',
      kisa: ['Derinlikler seni çağırıyor… Baam bekliyor. 💧', 'Su usulca taşıyor ama mühür beklemez.'],
      orta: ['Dalgalar uzadı… Baam derinden sesleniyor.', 'Akıntı duruldu; Baam gözlerini açtı.'],
      uzun: ['En derin sessizlik bile seni unutmadı. — Baam']
    },
    mand: {
      emoji: '🐻',
      kisa: ['Toprak seni hatırlıyor. Mand bekliyor. 🌿', 'Kökler biraz daha uzadı, yerin hazır.'],
      orta: ['Taşlar yerinden oynuyor… Mand sabırla bekliyor.', 'Dağ sessiz ama boş değil.'],
      uzun: ['Dağ sabırdır ama dostunu unutmaz. — Mand']
    },
    zepy: {
      emoji: '🐰',
      kisa: ['Rüzgâr adını fısıldadı… Zepy bekliyor. 🌪️', 'Tüyler hâlâ havada; Zepy kulakta.'],
      orta: ['Fırtına birikiyor… Zepy kulak kabartıyor.', 'Hava ağırlaştı; Zepy izini sürüyor.'],
      uzun: ['Rüzgâr geri döndü, sen de dön. — Zepy']
    },
    _genel: {
      kisa: ['Taşlar seni bekledi, Gezgin. ◆', 'Mühür kapısı aralandı, hoş geldin.'],
      orta: ['Evren bir süredir suskundu, Gezgin.', 'Taşlar dizildi, sıra sende.'],
      uzun: ['Mühür sabırla bekledi. Evren yine senin. ◆']
    }
  };

  var EMOJI_GENEL = '◆';
  var RENK_GENEL = '#ffd194';

  function tierOf(delta) {
    if (!(delta >= ILK_ESIK_MS)) return null;   // NaN ve negatifler de null
    if (delta < KISA_MS) return 'kisa';
    if (delta < ORTA_MS) return 'orta';
    return 'uzun';
  }

  function ruhBilgi(ruhId) {
    var emoji = RUHLAR[ruhId] ? RUHLAR[ruhId].emoji : EMOJI_GENEL;
    var color = RENK_GENEL;
    try {
      var sp = (window.STONE_SPIRITS || {})[ruhId];
      var el = sp && (window.STONE_ELEMENTS || {})[sp.element];
      if (el && el.color) color = el.color;
    } catch (_) {}
    return { emoji: emoji, color: color };
  }

  // Saf kurucu: verilen girdiyle mesaj üret (test edilebilir)
  function buildMessage(ruhId, deltaMs, seri, gunTohumu) {
    var tier = tierOf(deltaMs);
    if (!tier) return null;
    var r = RUHLAR[ruhId] || RUHLAR._genel;
    var havuz = r[tier] || RUHLAR._genel[tier];
    var idx = Math.abs(gunTohumu | 0) % havuz.length;
    var bilgi = ruhBilgi(ruhId);
    var sub = seri >= 2 ? '◆ ' + seri + ' gün üst üste — nefesin güçleniyor' : '';
    return { emoji: bilgi.emoji, color: bilgi.color, title: havuz[idx], sub: sub, tier: tier };
  }

  function gunAnahtari(t) {
    var d = new Date(t);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  var _hazir = null; // açılışta hesaplanan çağrı durumu

  // Açılışta bir kez: fark ölç, seri güncelle, "şimdi"yi mühürle.
  // spiritGetter: () => 'kor' | 'baam' | 'mand' | 'zepy' | undefined
  function init(now, spiritGetter) {
    now = now || Date.now();
    var son = 0, delta = 0, seri = 1;
    try { son = parseInt(localStorage.getItem(LS_SON) || '0', 10) || 0; } catch (_) {}
    delta = son > 0 ? (now - son) : 0;   // ilk ziyaret: çağrı yok (delta 0 → tier null)
    try {
      var bugun = gunAnahtari(now);
      var kayit = JSON.parse(localStorage.getItem(LS_SERI) || 'null');
      if (kayit && kayit.gun === bugun) {
        seri = kayit.n;
      } else {
        var dun = gunAnahtari(now - 24 * 3600e3);
        seri = (kayit && kayit.gun === dun) ? (kayit.n + 1) : 1;
        localStorage.setItem(LS_SERI, JSON.stringify({ n: seri, gun: bugun }));
      }
    } catch (_) {}
    try { localStorage.setItem(LS_SON, String(now)); } catch (_) {}
    _hazir = { delta: delta, seri: seri, now: now, getSpirit: spiritGetter, gosterildi: false };
    return _hazir;
  }

  function toastGoster(m) {
    try {
      var onceki = document.getElementById('ruh-toast');
      if (onceki) onceki.remove();
      var el = document.createElement('div');
      el.id = 'ruh-toast';
      el.setAttribute('role', 'status');
      el.style.setProperty('--rc', m.color);
      el.innerHTML = '<div class="rc-emoji">' + m.emoji + '</div>' +
        '<div class="rc-text">' + m.title +
        (m.sub ? '<span class="rc-sub">' + m.sub + '</span>' : '') + '</div>';
      document.body.appendChild(el);
      requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('show'); }); });
      var kapa = function () { el.classList.remove('show'); setTimeout(function () { el.remove(); }, 500); };
      el.addEventListener('click', kapa, { once: true });
      setTimeout(kapa, 6500);
      if (window.StoneSound && StoneSound.tap) StoneSound.tap();
    } catch (_) {}
  }

  // Macera kapısından girişte bir kez dene
  function maybeShow() {
    if (!_hazir || _hazir.gosterildi) return false;
    _hazir.gosterildi = true;
    var ruhId = (typeof _hazir.getSpirit === 'function' && _hazir.getSpirit()) || 'kor';
    var gunTohumu = Math.floor(_hazir.now / 86400000);
    var mesaj = buildMessage(ruhId, _hazir.delta, _hazir.seri, gunTohumu);
    if (!mesaj) return false;
    (API._toast || toastGoster)(mesaj);
    return true;
  }

  var API = {
    init: init,
    maybeShow: maybeShow,
    _tier: tierOf,          // test kancası
    _build: buildMessage,   // test kancası
    _toast: null            // testte enjekte
  };
  window.RUH_CAGRI = API;
})();
