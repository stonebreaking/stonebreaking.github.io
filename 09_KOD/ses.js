// =========================================================
// STONEBREAKING — Ses & Titreşim Modülü v1 (WebAudio)
// BATUPIA Studios (imza)
// Nefes + Mühür Kır sesleri · mobil titreşim · sessize alınabilir
// =========================================================

const StoneSound = (() => {
  let ctx = null;
  let muted = false;

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

    // Nefes — her 3'lü mühür kırılışında, perde kombo ile yükselir
    breath(combo) {
      const base = 220 + Math.min(combo || 1, 30) * 14;
      tone(base, 0.16, 'sine', 0.16, 0, 150);
      tone(base * 1.5, 0.3, 'triangle', 0.09, 0.05, 100);
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
    hint() { tone(660, 0.10, 'sine', 0.05, 0, 120); },
    shuffle() { for (let i = 0; i < 3; i++) tone(240 + i * 130, 0.08, 'triangle', 0.055, i * 0.06); },

    // Zafer fanfarı
    win() {
      [392, 523, 659, 784].forEach((f, i) => tone(f, 0.28, 'sine', 0.11, i * 0.12));
      tone(1046, 0.6, 'sine', 0.09, 0.5, 0);
    },
    fail() { tone(230, 0.22, 'sawtooth', 0.07, 0, -90); },
    tap() { tone(340, 0.04, 'sine', 0.04, 0, 30); },

    vibrate(pattern) {
      if (muted) return;
      try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (_) {}
    },
  };
})();

window.StoneSound = StoneSound;
