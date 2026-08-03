// =========================================================
// STONEBREAKING — Ses & Titreşim Modülü v2 (WebAudio)
// BATUPIA Studios (imza)
// Element temalı sesler · nefes + mühür kır · mobil titreşim · sessize alınabilir
// =========================================================

const StoneSound = (() => {
  let ctx = null;
  let muted = false;

  // Element frekans haritası — her elementin kendi ses rengi
  const ELEMENT_FREQ = {
    ates:   { base: 220, harm: 1.5,  color: 'sawtooth' },
    su:     { base: 330, harm: 1.25, color: 'sine' },
    toprak: { base: 165, harm: 1.33, color: 'triangle' },
    hava:   { base: 440, harm: 1.5,  color: 'sine' },
  };

  function ac() {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) { ctx = null; }
    }
    if (ctx && ctx.state === 'suspended') { ctx.resume().catch(() => {}); }
    return ctx;
  }

  function tone(freq, dur, type, vol, when, slide) {
    const c = ac();
    if (!c || muted) return;
    try {
      const t = c.currentTime + (when || 0);
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = type || 'sine';
      o.frequency.setValueAtTime(Math.max(30, freq), t);
      if (slide) {
        o.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t + dur);
      }
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol || 0.15, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g);
      g.connect(c.destination);
      o.start(t);
      o.stop(t + dur + 0.06);
    } catch (_) {}
  }

  return {
    setMuted(m) { muted = !!m; },
    isMuted() { return muted; },
    unlock() { ac(); },

    // Element temalı nefes — hangi ruhun elementi ise o tonda çalar
    breath(combo, element) {
      const el = ELEMENT_FREQ[element] || ELEMENT_FREQ.ates;
      const base = el.base + Math.min(combo || 1, 30) * 12;
      tone(base, 0.18, el.color, 0.14, 0, 120);
      tone(base * el.harm, 0.32, 'sine', 0.08, 0.05, 80);
    },

    // Mühür Kır — sert çatlak + yükselen parıltı
    seal() {
      tone(190, 0.09, 'sawtooth', 0.10, 0, -230);
      tone(95, 0.15, 'square', 0.07, 0.02, -45);
      tone(540, 0.32, 'sine', 0.10, 0.08, 190);
    },

    // Taş seçim (tepkiye uçar)
    pick() { tone(430, 0.06, 'sine', 0.045, 0, 70); },

    // Güçler
    undo() { tone(300, 0.11, 'triangle', 0.06, 0, -130); },
    hint() {
      tone(660, 0.10, 'sine', 0.05, 0, 120);
      tone(880, 0.15, 'sine', 0.04, 0.1, 60);
    },
    shuffle() { for (let i = 0; i < 4; i++) tone(200 + i * 110, 0.07, 'triangle', 0.05, i * 0.05); },

    // Zafer fanfarı — element temalı
    win(element) {
      const el = ELEMENT_FREQ[element] || ELEMENT_FREQ.ates;
      const f = el.base;
      [f, f * 1.25, f * 1.5, f * 2].forEach((freq, i) => tone(freq, 0.28, 'sine', 0.11, i * 0.12));
      tone(f * 2.5, 0.6, 'sine', 0.09, 0.5, 0);
    },
    fail() { tone(230, 0.22, 'sawtooth', 0.07, 0, -90); },
    tap() { tone(340, 0.04, 'sine', 0.04, 0, 30); },

    // Bölüm geçiş sinematik sesi — kadim mühür uyanışı
    chapterReveal(element) {
      const el = ELEMENT_FREQ[element] || ELEMENT_FREQ.ates;
      tone(el.base * 0.5, 0.6, 'sine', 0.06, 0, 40);
      tone(el.base, 0.8, el.color, 0.08, 0.3, 60);
      tone(el.base * 2, 0.5, 'sine', 0.05, 0.6, 0);
    },

    vibrate(pattern) {
      if (muted) return;
      try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (_) {}
    },
  };
})();

window.StoneSound = StoneSound;
