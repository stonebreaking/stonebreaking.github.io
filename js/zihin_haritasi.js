/* =========================================================
   ZIHIN_HARITASI v1.0 — M-012 kademe-1: Sonsuz Zihin Haritası
   Kaynak: M-008 mühürlü vizyon ("IQ testi + sonsuz zihin
   haritası" — Patron BT 03.08) · Referans: evren_yetenek_agaci
   Konomi (zihin taşı):
     · Bölüm zaferi (ilk tamamlama, B1–B12)        → +1 taş
     · IQ sınavı tamamlama (B3/B6/B9/B12, bir kez) → +1 taş
     · Her 3. sonsuz dalga (13+, ilk geçiş)        → +1 taş
   Düğümler (perk — gerçek oyun etkisi):
     · Sezgi Taşı I/II  → +1/+1 İpucu
     · Kök Hafıza I/II  → +1/+1 Geri Al
     · Evren Nefesi I/II→ +1/+1 Karıştır
   Kalıcılık: localStorage stonebreaking_zihin_v1
   UI: JS geç kurar (ilk açılışta DOM'a eklenir).
   Bağımlılık yok: StoneSound/showToast varsa kullanır.
   ========================================================= */
(function () {
  'use strict';

  var LS = 'stonebreaking_zihin_v1';

  var AGAC = {
    kok:    { ad: 'Kök Mührü',      emoji: '◆',  maliyet: 0, kol: 'kok',   once: [],          x: 50, y: 80 },
    karis1: { ad: 'Evren Nefesi I', emoji: '🔀', maliyet: 2, kol: 'karis',  once: ['kok'],     x: 50, y: 54 },
    karis2: { ad: 'Evren Nefesi II',emoji: '🔀', maliyet: 3, kol: 'karis',  once: ['karis1'],  x: 50, y: 24 },
    ipucu1: { ad: 'Sezgi Taşı I',   emoji: '💡', maliyet: 2, kol: 'ipucu',  once: ['kok'],     x: 24, y: 60 },
    ipucu2: { ad: 'Sezgi Taşı II',  emoji: '💡', maliyet: 3, kol: 'ipucu',  once: ['ipucu1'],  x: 13, y: 30 },
    geri1:  { ad: 'Kök Hafıza I',   emoji: '↩',  maliyet: 2, kol: 'geri',   once: ['kok'],     x: 76, y: 60 },
    geri2:  { ad: 'Kök Hafıza II',  emoji: '↩',  maliyet: 3, kol: 'geri',   once: ['geri1'],   x: 87, y: 30 }
  };

  var _opt = { taslama: null };
  var _d = null; // durum: { tas, oduller:{}, acik:{} }

  /* ---------- kalıcılık ---------- */
  function bos() { return { tas: 0, oduller: {}, acik: { kok: true } }; }
  function yukle() {
    if (_d) return _d;
    try {
      var raw = (typeof localStorage !== 'undefined') ? localStorage.getItem(LS) : null;
      var p = raw ? JSON.parse(raw) : null;
      _d = Object.assign(bos(), p || {});
      _d.acik = Object.assign({ kok: true }, _d.acik || {});
    } catch (_) { _d = bos(); }
    return _d;
  }
  function kaydet() {
    try { localStorage.setItem(LS, JSON.stringify(_d)); } catch (_) {}
  }
  function durum() { return yukle(); }

  /* ---------- ekonomi ---------- */
  // Verilen ödül ilk kezse 1 taş yaz ve 1 döndür; tekrarsa 0.
  function odul(tur, seviye) {
    yukle();
    seviye = seviye | 0;
    var key = null;
    if (tur === 'bolum' && seviye >= 1 && seviye <= 12) key = 'b' + seviye;
    else if (tur === 'iq' && seviye > 0) key = 'q' + seviye;
    else if (tur === 'sonsuz' && seviye >= 13 && (seviye - 12) % 3 === 0) key = 's' + seviye;
    if (!key || _d.oduller[key]) return 0;
    _d.oduller[key] = true;
    _d.tas += 1;
    kaydet();
    return 1;
  }

  /* ---------- ağaç mantığı ---------- */
  function sahipMi(id) { return !!yukle().acik[id]; }
  function acilabilirMi(id) {
    yukle();
    var d = AGAC[id];
    if (!d || sahipMi(id)) return false;
    for (var i = 0; i < d.once.length; i++) if (!sahipMi(d.once[i])) return false;
    return _d.tas >= d.maliyet;
  }
  function ac(id) {
    yukle();
    var d = AGAC[id];
    if (!d) return { ok: false, neden: 'yok' };
    if (sahipMi(id)) return { ok: false, neden: 'sahip' };
    for (var i = 0; i < d.once.length; i++) if (!sahipMi(d.once[i])) return { ok: false, neden: 'kilit' };
    if (_d.tas < d.maliyet) return { ok: false, neden: 'tas', lazim: d.maliyet, var: _d.tas };
    _d.tas -= d.maliyet;
    _d.acik[id] = true;
    kaydet();
    if (document.getElementById('zihin-overlay')) render();
    return { ok: true, kalan: _d.tas, dugum: d };
  }
  // Oyun güçlerine yansıyan perk toplamı
  function perkleri() {
    yukle();
    var p = { ipucu: 0, geri: 0, karis: 0 };
    Object.keys(_d.acik).forEach(function (id) {
      var d = AGAC[id];
      if (d && d.kol !== 'kok' && _d.acik[id]) p[d.kol] += 1;
    });
    return p;
  }

  /* ---------- UI ---------- */
  function insaatEdildi() { return !!document.getElementById('zihin-overlay'); }

  function insa() {
    if (insaatEdildi()) return;
    var ov = document.createElement('div');
    ov.id = 'zihin-overlay';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-label', 'Zihin Haritası');
    ov.innerHTML =
      '<div class="zh-card">' +
        '<div class="zh-head">' +
          '<span class="zh-title">◆ Zihin Haritası</span>' +
          '<span class="zh-tas"><img src="06_GRAFIK/tas_muhur_elite.png" alt="zihin taşı" /><b id="zh-tas-n">0</b></span>' +
          '<button class="zh-kapa" type="button" aria-label="Kapat">✕</button>' +
        '</div>' +
        '<div class="zh-stage" id="zh-stage"></div>' +
        '<div class="zh-foot">Zihin taşı: bölüm zaferi ◆ IQ sınavı ◆ her 3. sonsuz dalga</div>' +
      '</div>';
    document.body.appendChild(ov);
    ov.querySelector('.zh-kapa').addEventListener('click', kapa);
    ov.addEventListener('click', function (e) { if (e.target === ov) kapa(); });
  }

  function cizgi(stage, a, b, aktif) {
    var A = AGAC[a], B = AGAC[b];
    var dx = B.x - A.x, dy = B.y - A.y;
    var len = Math.hypot(dx, dy);
    var aci = Math.atan2(dy, dx) * 180 / Math.PI;
    var el = document.createElement('div');
    el.className = 'zh-line' + (aktif ? ' on' : '');
    el.style.cssText = 'left:' + A.x + '%;top:' + A.y + '%;width:' + len + '%;transform:rotate(' + aci + 'deg);';
    stage.appendChild(el);
  }

  function render() {
    yukle();
    var stage = document.getElementById('zh-stage');
    if (!stage) return;
    stage.innerHTML = '';
    // önce bağlar
    Object.keys(AGAC).forEach(function (id) {
      AGAC[id].once.forEach(function (k) { cizgi(stage, k, id, sahipMi(id)); });
    });
    // düğümler
    Object.keys(AGAC).forEach(function (id) {
      var d = AGAC[id];
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'zh-node ' + (sahipMi(id) ? 'acik' : (acilabilirMi(id) ? 'uygun' : 'kilit'));
      b.style.left = d.x + '%';
      b.style.top = d.y + '%';
      b.setAttribute('aria-label', d.ad + (sahipMi(id) ? ' (açık)' : ' — ' + d.maliyet + ' taş'));
      b.innerHTML =
        '<span class="zn-rune">' + d.emoji + '</span>' +
        (d.maliyet > 0 && !sahipMi(id) ? '<span class="zn-cost">' + d.maliyet + '</span>' : '') +
        '<span class="zn-ad">' + d.ad + '</span>';
      b.addEventListener('click', function () {
        var r = ac(id);
        try { window.StoneSound && StoneSound.tap && StoneSound.tap(); } catch (_) {}
        if (r.ok) {
          try { window.StoneSound && StoneSound.vibrate && StoneSound.vibrate([20, 30, 50]); } catch (_) {}
          if (_opt.taslama) _opt.taslama('◆ ' + d.ad + ' mühürlendi');
        } else if (r.neden === 'tas' && _opt.taslama) {
          _opt.taslama('🧠 ' + r.lazim + ' taş gerekli (sende ' + r.var + ')');
        }
        var t = document.getElementById('zh-tas-n');
        if (t) t.textContent = yukle().tas;
      });
      stage.appendChild(b);
    });
    var t = document.getElementById('zh-tas-n');
    if (t) t.textContent = _d.tas;
  }

  function ac_Ekran() {
    insa();
    render();
    var ov = document.getElementById('zihin-overlay');
    ov.classList.add('show');
  }
  function kapa() {
    var ov = document.getElementById('zihin-overlay');
    if (ov) ov.classList.remove('show');
  }

  function init(opt) {
    opt = opt || {};
    _opt.taslama = opt.taslama || null;
    yukle();
  }

  var API = {
    init: init,
    ac: ac_Ekran,          // ekranı aç
    dugumAc: ac,           // düğüm kilidini aç (perk kazan)
    kapa: kapa,
    odul: odul,
    perkleri: perkleri,
    durum: durum,
    _agac: AGAC,           // test kancası
    _acilabilir: acilabilirMi,
    _sifirla: function () { _d = bos(); kaydet(); }   // test kancası
  };
  window.ZIHIN = API;
})();
