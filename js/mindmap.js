/* ============================================================
   STONEBREAKING · MindMap™  v1.0
   PATRON BT — HİKAYE_MUHUR uyumlu zihin haritası algoritması
   Ölçer: hız, denge, hata, kombo, strateji → Z skoru + IQ + ruh tipi
   Kalıcılık: localStorage stonebreaking_mindmap_v1
   ============================================================ */
(function (global) {
  'use strict';

  var LS = 'stonebreaking_mindmap_v1';
  var HISTORY_MAX = 20;

  var RUH = {
    kor:  { id: 'kor',  name: 'Kor',  element: 'Ateş',  color: '#ff6b35', animal: 'Tilki',
            quote: 'Beni yalnız bırakma, yoksa yine yakarım', breath: 'Yan' },
    baam: { id: 'baam', name: 'Baam', element: 'Su',    color: '#1d8cf8', animal: 'Balina',
            quote: 'Akış geri döndü, sakin ol', breath: 'Ak' },
    mand: { id: 'mand', name: 'Mand', element: 'Toprak', color: '#2ecc71', animal: 'Panda',
            quote: 'Hep durdum, kimse bakmadı', breath: 'Dur' },
    zepy: { id: 'zepy', name: 'Zepy', element: 'Hava',  color: '#f0f0f0', animal: 'Tavşan',
            quote: 'Her yerdeyim ama kimse beni görmüyor', breath: 'Nefes al' }
  };

  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

  function empty() {
    return {
      Z: 0,
      iq: 70,
      axes: { kor: 0, baam: 0, mand: 0, zepy: 0 },
      primary: null,
      secondary: null,
      chapters: {},
      waves: 0,
      totals: { matches: 0, fails: 0, hints: 0, shuffles: 0, timeSec: 0 },
      history: []
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(LS);
      if (!raw) return empty();
      return Object.assign(empty(), JSON.parse(raw));
    } catch (_) { return empty(); }
  }

  function save(state) {
    try { localStorage.setItem(LS, JSON.stringify(state)); } catch (_) {}
  }

  /** Bölüm hedef süresi (sn) — rampa */
  function targetTime(level, matches) {
    var base = 90 + Math.max(0, (level || 1) - 1) * 12;
    return base + Math.max(0, (matches || 12) - 12) * 4;
  }

  /**
   * Ham oturum verisinden 0–100 metrikler
   * @param {object} s
   *  timeSec, matches, maxCombo, combos, fails, wrongTaps,
   *  hintsUsed, shufflesUsed, trayAvg (0-4), criticalTray (adet),
   *  level, element, spiritId, breaths: {yan,ak,dur,nefes}
   */
  function metricsFromSession(s) {
    s = s || {};
    var timeSec = Math.max(1, s.timeSec || 1);
    var matches = Math.max(0, s.matches || 0);
    var target = targetTime(s.level || 1, matches);
    var speed = clamp(100 * (target / timeSec), 0, 100);
    // acele + hata cezası
    if ((s.fails || 0) + (s.wrongTaps || 0) > 2 && timeSec < target * 0.45) {
      speed = clamp(speed * 0.75, 0, 100);
    }

    var trayAvg = clamp(s.trayAvg != null ? s.trayAvg : 1.2, 0, 4);
    var critical = s.criticalTray || 0;
    var balance = clamp(100 - (trayAvg / 4) * 40 - critical * 8, 0, 100);

    var errors = (s.fails || 0) * 25 + (s.wrongTaps || 0) * 12;
    var errorScore = clamp(100 - errors, 0, 100);

    var maxCombo = s.maxCombo || 0;
    var combos = s.combos || 0;
    var breathBonus = 0;
    var b = s.breaths || {};
    breathBonus += (b.yan || 0) * 3 + (b.ak || 0) * 3 + (b.dur || 0) * 3 + (b.nefes || 0) * 3;
    if ((b.yan || 0) > 0 && (b.ak || 0) > 0) breathBonus += 10; // Buhar
    if ((b.dur || 0) > 0 && (b.nefes || 0) > 0) breathBonus += 10; // Kum
    var comboScore = clamp(maxCombo * 15 + combos * 5 + breathBonus, 0, 100);

    var strategy = 100 - (s.hintsUsed || 0) * 8 - (s.shufflesUsed || 0) * 6;
    var freeRatio = s.freePickRatio != null ? s.freePickRatio : 0.7;
    strategy = clamp(strategy + freeRatio * 20, 0, 100);

    return {
      speed: Math.round(speed),
      balance: Math.round(balance),
      error: Math.round(errorScore),
      combo: Math.round(comboScore),
      strategy: Math.round(strategy)
    };
  }

  /** Ağırlıklı Z (0–100) */
  function computeZ(m) {
    return (
      0.25 * m.speed +
      0.25 * m.balance +
      0.20 * m.error +
      0.20 * m.combo +
      0.10 * m.strategy
    );
  }

  function iqFromZ(Z) {
    return Math.round(clamp(70 + Z * 0.55, 70, 125));
  }

  /** Ruh eksen delta — oturum refleksı */
  function axisDelta(s, m) {
    var d = { kor: 0, baam: 0, mand: 0, zepy: 0 };
    var b = s.breaths || {};
    // hız / risk → Kor
    d.kor += m.speed * 0.35 + (s.maxCombo || 0) * 2 + (b.yan || 0) * 8;
    if ((s.criticalTray || 0) > 0) d.kor += 5;
    // denge / az hata → Baam
    d.baam += m.balance * 0.35 + m.error * 0.25 + (b.ak || 0) * 8;
    if ((s.timeSec || 0) > targetTime(s.level, s.matches) * 0.9) d.baam += 6;
    // sabır / az power → Mand
    d.mand += m.strategy * 0.3 + (b.dur || 0) * 8;
    if ((s.hintsUsed || 0) === 0 && (s.shufflesUsed || 0) === 0) d.mand += 10;
    // keşif / gizli → Zepy
    d.zepy += (b.nefes || 0) * 8 + (s.hiddenRevealed || 0) * 6 + m.combo * 0.15;
    // element / seçili ruh hafif bias
    var sp = (s.spiritId || s.element || '').toLowerCase();
    if (sp.indexOf('kor') >= 0 || sp.indexOf('ates') >= 0 || sp.indexOf('fire') >= 0) d.kor += 12;
    if (sp.indexOf('baam') >= 0 || sp.indexOf('su') >= 0 || sp.indexOf('water') >= 0) d.baam += 12;
    if (sp.indexOf('mand') >= 0 || sp.indexOf('toprak') >= 0 || sp.indexOf('earth') >= 0) d.mand += 12;
    if (sp.indexOf('zepy') >= 0 || sp.indexOf('hava') >= 0 || sp.indexOf('air') >= 0) d.zepy += 12;
    return d;
  }

  function normalizeAxes(ax) {
    var sum = ax.kor + ax.baam + ax.mand + ax.zepy;
    if (sum <= 0) return { kor: 0.25, baam: 0.25, mand: 0.25, zepy: 0.25 };
    return {
      kor: ax.kor / sum,
      baam: ax.baam / sum,
      mand: ax.mand / sum,
      zepy: ax.zepy / sum
    };
  }

  function topTwo(ax) {
    var arr = [
      { id: 'kor', v: ax.kor },
      { id: 'baam', v: ax.baam },
      { id: 'mand', v: ax.mand },
      { id: 'zepy', v: ax.zepy }
    ];
    arr.sort(function (a, b) { return b.v - a.v; });
    return { primary: arr[0].id, secondary: arr[1].id };
  }

  /**
   * Bölüm / dalga sonu işle
   * @returns {object} kart verisi
   */
  function recordSession(session) {
    var state = load();
    var m = metricsFromSession(session);
    var Z = computeZ(m);
    var iq = iqFromZ(Z);

    var delta = axisDelta(session, m);
    state.axes.kor += delta.kor;
    state.axes.baam += delta.baam;
    state.axes.mand += delta.mand;
    state.axes.zepy += delta.zepy;

    // yumuşak profil Z
    state.Z = state.Z > 0 ? 0.6 * state.Z + 0.4 * Z : Z;
    state.iq = iqFromZ(state.Z);

    var tops = topTwo(state.axes);
    state.primary = tops.primary;
    state.secondary = tops.secondary;

    var level = session.level || 0;
    if (level >= 13) state.waves = (state.waves || 0) + 1;
    if (level >= 1 && level <= 12) {
      state.chapters[level] = {
        Z: Math.round(Z),
        iq: iq,
        m: m,
        t: Date.now()
      };
    }

    state.totals.matches += session.matches || 0;
    state.totals.fails += session.fails || 0;
    state.totals.hints += session.hintsUsed || 0;
    state.totals.shuffles += session.shufflesUsed || 0;
    state.totals.timeSec += session.timeSec || 0;

    state.history.push({
      Z: Math.round(Z),
      iq: iq,
      m: m,
      level: level,
      t: Date.now()
    });
    if (state.history.length > HISTORY_MAX) {
      state.history = state.history.slice(-HISTORY_MAX);
    }

    save(state);

    var primary = RUH[state.primary] || RUH.kor;
    var secondary = RUH[state.secondary] || RUH.baam;

    return {
      sessionZ: Math.round(Z),
      sessionIq: iq,
      profileZ: Math.round(state.Z),
      profileIq: state.iq,
      metrics: m,
      axes: normalizeAxes(state.axes),
      primary: primary,
      secondary: secondary,
      slogan: primary.quote,
      breath: primary.breath,
      cardLine: 'Zihin haritam: ' + primary.name + ' · ' + state.iq + ' · BU DAHA BAŞLANGIÇ',
      shareText: 'Zihin haritam: ' + primary.name + ' (' + primary.animal + ') · ' + state.iq +
        ' — stonebreaking.github.io',
      state: state
    };
  }

  function getProfile() {
    var state = load();
    var tops = topTwo(state.axes);
    state.primary = state.primary || tops.primary;
    state.secondary = state.secondary || tops.secondary;
    var primary = RUH[state.primary] || null;
    return {
      Z: Math.round(state.Z),
      iq: state.iq,
      axes: normalizeAxes(state.axes),
      primary: primary,
      secondary: RUH[state.secondary] || null,
      chapters: state.chapters,
      waves: state.waves,
      totals: state.totals,
      history: state.history,
      cardLine: primary
        ? ('Zihin haritam: ' + primary.name + ' · ' + state.iq + ' · BU DAHA BAŞLANGIÇ')
        : 'Tahtayı kır — haritan oluşsun'
    };
  }

  function reset() {
    var e = empty();
    save(e);
    return e;
  }

  /** onWin payload → MindMap session */
  function fromWinPayload(payload, extra) {
    extra = extra || {};
    return recordSession({
      level: payload.level,
      timeSec: payload.timeSec,
      matches: payload.matches,
      maxCombo: payload.combo || payload.maxCombo,
      combos: extra.combos || 0,
      fails: extra.fails || 0,
      wrongTaps: extra.wrongTaps || 0,
      hintsUsed: extra.hintsUsed || 0,
      shufflesUsed: extra.shufflesUsed || 0,
      trayAvg: extra.trayAvg,
      criticalTray: extra.criticalTray || 0,
      freePickRatio: extra.freePickRatio,
      breaths: extra.breaths || {},
      hiddenRevealed: extra.hiddenRevealed || 0,
      spiritId: extra.spiritId || payload.element,
      element: payload.element
    });
  }

  var API = {
    RUH: RUH,
    load: load,
    save: save,
    metricsFromSession: metricsFromSession,
    computeZ: computeZ,
    iqFromZ: iqFromZ,
    recordSession: recordSession,
    fromWinPayload: fromWinPayload,
    getProfile: getProfile,
    reset: reset,
    version: '1.0'
  };

  global.STONE_MindMap = API;
  global.MindMap = API;
})(typeof window !== 'undefined' ? window : this);
