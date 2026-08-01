// =========================================================
// STONEBREAKING — Triple Match / Tray Motoru v5.0
// Kader videosundan: 3 aynı taş + üst tepsi + IQ + kombo
// =========================================================

const ELEMENTS = {
  ates:   { id: 'ates',   name: 'Ateş',   color: '#ff6b35', emoji: '🔥', spirit: 'Kor'  },
  su:     { id: 'su',     name: 'Su',     color: '#4ecdc4', emoji: '💧', spirit: 'Baam' },
  toprak: { id: 'toprak', name: 'Toprak', color: '#c4a35a', emoji: '🗿', spirit: 'Mand' },
  hava:   { id: 'hava',   name: 'Hava',   color: '#a8d8ea', emoji: '💨', spirit: 'Zepy' },
};

const SPIRITS = {
  kor:  { id: 'kor',  name: 'Kor',  element: 'ates',   title: 'Ateş Ruhu',   quote: 'Ben Kor, Ateş Vadisi\'nin bekçisiyim.',           scene: '06_GRAFIK/sahne_ates_vadisi.png',      portrait: '06_GRAFIK/kor_ates_ruhu.png',    chapters: [1, 2, 3] },
  baam: { id: 'baam', name: 'Baam', element: 'su',     title: 'Su Ruhu',     quote: 'Ben Baam, Derinlikler\'in bilge ruhuyum.',       scene: '06_GRAFIK/sahne_derinlikler.png',      portrait: '06_GRAFIK/baam_su_ruhu.png',     chapters: [4, 5, 6] },
  mand: { id: 'mand', name: 'Mand', element: 'toprak', title: 'Toprak Ruhu', quote: 'Ben Mand, Kristal Mağaralar\'ın deviyim.',       scene: '06_GRAFIK/sahne_kristal_magara.png',   portrait: '06_GRAFIK/mand_toprak_ruhu.png', chapters: [7, 8, 9] },
  zepy: { id: 'zepy', name: 'Zepy', element: 'hava',   title: 'Hava Ruhu',   quote: 'Ben Zepy, Gökyüzü Tapınağı\'nın rüzgarıyım.',   scene: '06_GRAFIK/sahne_gokyuzu_tapinagi.png', portrait: '06_GRAFIK/zepy_hava_ruhu.png',   chapters: [10, 11, 12] },
};

const CHAPTERS = [
  { n: 1,  spirit: 'kor',  title: 'Alev Uyanışı',     region: 'Ateş Vadisi' },
  { n: 2,  spirit: 'kor',  title: 'Magma Köprüsü',    region: 'Ateş Vadisi' },
  { n: 3,  spirit: 'kor',  title: 'Volkan Mührü',     region: 'Ateş Vadisi' },
  { n: 4,  spirit: 'baam', title: 'Dalga Çağrısı',    region: 'Derinlikler' },
  { n: 5,  spirit: 'baam', title: 'Mercan Labirent',  region: 'Derinlikler' },
  { n: 6,  spirit: 'baam', title: 'İnci Tahtı',       region: 'Derinlikler' },
  { n: 7,  spirit: 'mand', title: 'Granit Kapı',      region: 'Kristal Mağara' },
  { n: 8,  spirit: 'mand', title: 'Kristal Nabız',    region: 'Kristal Mağara' },
  { n: 9,  spirit: 'mand', title: 'Dağ Mührü',        region: 'Kristal Mağara' },
  { n: 10, spirit: 'zepy', title: 'Rüzgar Merdiveni', region: 'Gökyüzü Tapınağı' },
  { n: 11, spirit: 'zepy', title: 'Bulut Labirenti',  region: 'Gökyüzü Tapınağı' },
  { n: 12, spirit: 'zepy', title: 'Evren Mührü',      region: 'Gökyüzü Tapınağı' },
];

const TRAY_MAX = 5;
const COMBO_WINDOW_MS = 3800;

class StonebreakingGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileW = 52;
    this.tileH = 64;
    this.gapX = 4;
    this.gapY = 4;
    this.zLift = 10;

    this.tiles = [];
    this.tray = []; // { type, id }
    this.history = [];
    this.flying = [];
    this.particles = [];
    this.tileImages = {};
    this.ready = false;

    this.level = 1;
    this.iq = 40;
    this.combo = 0;
    this.maxCombo = 0;
    this.matches = 0;
    this.moves = 0;
    this.seals = 0;
    this.hintsLeft = 1;
    this.undosLeft = 1;
    this.shufflesLeft = 1;
    this.startedAt = 0;
    this.comboUntil = 0;
    this.feedback = null; // { text, color, life }
    this.hintIds = new Set();
    this.locked = false;

    this.types = [
      { key: 'ates_1',   color: '#ff6b35', emoji: '🔥', img: '06_GRAFIK/tas_sembol_ates_1.png' },
      { key: 'ates_2',   color: '#ff6b35', emoji: '⚔️', img: '06_GRAFIK/tas_sembol_ates_2.png' },
      { key: 'su_1',     color: '#4ecdc4', emoji: '💧', img: '06_GRAFIK/tas_sembol_su_1.png' },
      { key: 'su_2',     color: '#4ecdc4', emoji: '🔱', img: '06_GRAFIK/tas_sembol_su_2.png' },
      { key: 'toprak_1', color: '#c4a35a', emoji: '🗿', img: '06_GRAFIK/tas_sembol_toprak_1.png' },
      { key: 'toprak_2', color: '#c4a35a', emoji: '⛏️', img: '06_GRAFIK/tas_sembol_toprak_2.png' },
      { key: 'hava_1',   color: '#a8d8ea', emoji: '💨', img: '06_GRAFIK/tas_sembol_hava_1.png' },
      { key: 'hava_2',   color: '#a8d8ea', emoji: '🪶', img: '06_GRAFIK/tas_sembol_hava_2.png' },
    ];

    this.onWin = null;
    this.onToast = null;
    this.onHUD = null;
    this.onTray = null;
    this.onFail = null;
    this._bound = false;
    this._raf = 0;
  }

  // ---- lifecycle ----
  async preload() {
    await Promise.all(this.types.map((t) => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => { this.tileImages[t.key] = img; resolve(); };
      img.onerror = () => resolve();
      img.src = t.img;
    })));
    this.ready = true;
  }

  bindInput() {
    if (this._bound) return;
    this._bound = true;
    const handle = (e) => {
      e.preventDefault();
      if (this.locked) return;
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      const pt = e.touches ? e.touches[0] : e;
      this.handleClick((pt.clientX - rect.left) * scaleX, (pt.clientY - rect.top) * scaleY);
    };
    this.canvas.addEventListener('mousedown', handle);
    this.canvas.addEventListener('touchstart', handle, { passive: false });
  }

  resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    const w = Math.min(parent.clientWidth || 360, 420);
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = (w * 1.45) + 'px';
  }

  // ---- level build ----
  newGame(level = this.level) {
    this.level = level;
    this.tiles = [];
    this.tray = [];
    this.history = [];
    this.flying = [];
    this.particles = [];
    this.hintIds.clear();
    this.feedback = null;
    this.locked = false;

    this.iq = 40 + (level - 1) * 2;
    this.combo = 0;
    this.maxCombo = 0;
    this.matches = 0;
    this.moves = 0;
    this.seals = 0;
    this.hintsLeft = 1 + Math.floor((level - 1) / 4);
    this.undosLeft = 1 + Math.floor((level - 1) / 3);
    this.shufflesLeft = level >= 3 ? 1 + Math.floor(level / 5) : 0;
    this.startedAt = performance.now();
    this.comboUntil = 0;

    const layout = this.buildLayout(level);
    // count cells
    let cells = layout.length;
    // ensure multiple of 3
    while (cells % 3 !== 0) {
      // drop last
      layout.pop();
      cells--;
    }

    // build type bag: groups of 3
    const groups = cells / 3;
    const bag = [];
    for (let i = 0; i < groups; i++) {
      const t = i % this.types.length;
      bag.push(t, t, t);
    }
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }

    let id = 0;
    layout.forEach((pos, i) => {
      this.tiles.push({
        id: id++,
        col: pos.col,
        row: pos.row,
        z: pos.z,
        type: bag[i],
        active: true,
        glow: 0,
      });
    });

    this.updateFree();
    this.emitAll();
  }

  buildLayout(level) {
    // Organic stacked pyramid-ish layouts scaled by level
    const out = [];
    const baseCols = 6 + (level % 3); // 6-8
    const baseRows = 7 + (level % 2); // 7-8
    const layers = 3 + Math.min(2, Math.floor(level / 3)); // 3-5

    for (let z = 0; z < layers; z++) {
      const cols = baseCols - z;
      const rows = baseRows - z;
      const ox = z * 0.5;
      const oy = z * 0.5;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // carve organic edges
          if (z === 0 && ((r === 0 && c === 0) || (r === 0 && c === cols - 1))) continue;
          if (z === 0 && r === rows - 1 && (c === 0 || c === cols - 1)) continue;
          // holes in middle layers for interest
          if (z === 1 && r === Math.floor(rows / 2) && c === Math.floor(cols / 2)) continue;
          out.push({ col: c + ox, row: r + oy, z });
        }
      }
    }

    // Cap size for mobile (~36-72 tiles)
    if (out.length > 72) out.length = 72 - (72 % 3);
    if (out.length < 24) {
      // pad with extra top tiles
      for (let i = out.length; i < 24; i++) {
        out.push({ col: (i % 5) + 1, row: (i % 6) + 1, z: layers });
      }
    }
    return out;
  }

  // ---- free rule: only top-uncovered ----
  updateFree() {
    for (const t of this.tiles) {
      if (!t.active) { t.free = false; continue; }
      const covered = this.tiles.some((o) =>
        o.active && o.id !== t.id && o.z > t.z &&
        Math.abs(o.col - t.col) < 0.85 &&
        Math.abs(o.row - t.row) < 0.85
      );
      t.free = !covered;
    }
  }

  // ---- geometry ----
  boardOrigin() {
    // leave room at top of canvas for visual balance (tray is HTML)
    const cols = 8;
    const rows = 9;
    const boardW = cols * (this.tileW + this.gapX);
    const boardH = rows * (this.tileH * 0.55) + this.tileH;
    return {
      x: (this.canvas.width - boardW) / 2,
      y: 24,
      boardW,
      boardH,
    };
  }

  tileRect(t) {
    const o = this.boardOrigin();
    const x = o.x + t.col * (this.tileW + this.gapX) + t.z * 5;
    const y = o.y + t.row * (this.tileH * 0.52) - t.z * this.zLift;
    return { x, y, w: this.tileW, h: this.tileH };
  }

  // ---- input ----
  handleClick(mx, my) {
    if (this.tray.length >= TRAY_MAX) {
      this.toast('Tepsi dolu! Geri al veya karıştır.');
      if (typeof this.onFail === 'function') this.onFail('tray_full');
      return;
    }

    const sorted = [...this.tiles].filter((t) => t.active).sort((a, b) => b.z - a.z || b.row - a.row);
    for (const t of sorted) {
      const r = this.tileRect(t);
      if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) {
        if (!t.free) {
          this.toast('🔒 Altta kalan taş');
          t.glow = 0.6;
          setTimeout(() => { if (t.active) t.glow = 0; }, 250);
          return;
        }
        this.pickTile(t);
        return;
      }
    }
  }

  pickTile(t) {
    if (!t.active || !t.free) return;
    if (this.tray.length >= TRAY_MAX) return;

    // snapshot for undo
    this.history.push({
      tileId: t.id,
      tray: this.tray.map((x) => ({ ...x })),
      iq: this.iq,
      combo: this.combo,
      matches: this.matches,
      seals: this.seals,
      maxCombo: this.maxCombo,
    });

    t.active = false;
    this.moves++;
    this.hintIds.delete(t.id);

    // fly animation toward top-center (tray is outside canvas; animate upward)
    const r = this.tileRect(t);
    this.flying.push({
      type: t.type,
      x: r.x, y: r.y,
      tx: this.canvas.width / 2 - this.tileW / 2,
      ty: -40,
      life: 0,
      dur: 0.28,
    });

    // insert into tray: prefer grouping same types together
    this.insertTray(t.type, t.id);
    this.updateFree();
    this.resolveMatches();
    this.emitAll();
  }

  insertTray(type, id) {
    // find last index of same type
    let idx = -1;
    for (let i = 0; i < this.tray.length; i++) {
      if (this.tray[i].type === type) idx = i;
    }
    if (idx >= 0) this.tray.splice(idx + 1, 0, { type, id });
    else this.tray.push({ type, id });
  }

  resolveMatches() {
    // repeatedly clear triples
    let cleared = false;
    const counts = {};
    this.tray.forEach((s) => { counts[s.type] = (counts[s.type] || 0) + 1; });

    for (const [typeStr, count] of Object.entries(counts)) {
      if (count >= 3) {
        const type = Number(typeStr);
        // remove first 3 of this type
        let left = 3;
        const removedAt = [];
        this.tray = this.tray.filter((s, i) => {
          if (s.type === type && left > 0) {
            left--;
            removedAt.push(i);
            return false;
          }
          return true;
        });
        cleared = true;
        this.onTriple(type);
      }
    }

    if (cleared) {
      // chain if more triples formed
      const again = {};
      this.tray.forEach((s) => { again[s.type] = (again[s.type] || 0) + 1; });
      if (Object.values(again).some((c) => c >= 3)) this.resolveMatches();
    }

    // fail check
    if (this.tray.length >= TRAY_MAX) {
      const c = {};
      this.tray.forEach((s) => { c[s.type] = (c[s.type] || 0) + 1; });
      if (!Object.values(c).some((n) => n >= 3)) {
        this.toast('⚠️ Tepsi doldu!');
        if (typeof this.onFail === 'function') this.onFail('tray_full');
      }
    }

    this.checkWin();
  }

  onTriple(type) {
    const now = performance.now();
    if (now <= this.comboUntil) this.combo += 1;
    else this.combo = 1;
    this.comboUntil = now + COMBO_WINDOW_MS;
    this.maxCombo = Math.max(this.maxCombo, this.combo);
    this.matches += 1;
    this.seals += 1;

    const speedBonus = Math.min(1.5, this.combo * 0.12);
    const gain = 1.2 + this.combo * 0.35 + speedBonus;
    this.iq = Math.round((this.iq + gain) * 10) / 10;

    const meta = this.types[type] || this.types[0];
    // shatter particles from tray area (top of canvas)
    for (let i = 0; i < 22; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 120,
        y: 10 + Math.random() * 20,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 6 + 2,
        life: 1,
        color: meta.color,
        size: Math.random() * 4 + 2,
      });
    }

    // feedback tier
    let text = 'İyi';
    let color = '#7CFFB2';
    if (this.combo >= 20) { text = 'Mükemmel'; color = '#FFD700'; }
    else if (this.combo >= 10) { text = 'Muhteşem'; color = '#C77DFF'; }
    else if (this.combo >= 5) { text = 'İyi'; color = '#7CFFB2'; }
    else { text = 'Mühür'; color = meta.color; }

    this.feedback = { text, color, combo: this.combo, life: 1.1 };
    this.toast(`${text} · Mühür x${this.combo}`);
  }

  checkWin() {
    const rem = this.tiles.filter((t) => t.active).length;
    if (rem === 0 && this.tray.length === 0) {
      if (this._winScheduled) return;
      this._winScheduled = true;
      // allow last fly/shatter FX to play
      setTimeout(() => {
        this._winScheduled = false;
        if (this.tiles.some((t) => t.active) || this.tray.length) return;
        this.locked = true;
        const elapsed = Math.max(1, (performance.now() - this.startedAt) / 1000);
        const stats = {
          level: this.level,
          iq: this.iq,
          combo: this.maxCombo,
          matches: this.matches,
          seals: this.seals,
          moves: this.moves,
          timeSec: elapsed,
          rank: this.rankFor(this.iq, this.maxCombo),
        };
        if (typeof this.onWin === 'function') this.onWin(stats);
      }, 450);
    }
  }

  rankFor(iq, maxCombo) {
    if (iq >= 160 && maxCombo >= 20) return 'S';
    if (iq >= 120) return 'A';
    if (iq >= 90) return 'B';
    return 'C';
  }

  // ---- powers ----
  undo() {
    if (this.undosLeft <= 0) { this.toast('Geri al yok'); return false; }
    if (!this.history.length) { this.toast('Geri alınacak hamle yok'); return false; }
    const snap = this.history.pop();
    const tile = this.tiles.find((t) => t.id === snap.tileId);
    if (tile) tile.active = true;
    this.tray = snap.tray;
    this.iq = snap.iq;
    this.combo = snap.combo;
    this.matches = snap.matches;
    this.seals = snap.seals;
    this.maxCombo = snap.maxCombo;
    this.undosLeft--;
    this.updateFree();
    this.emitAll();
    this.toast('↩ Geri alındı');
    return true;
  }

  hint() {
    if (this.hintsLeft <= 0) { this.toast('İpucu yok'); return false; }
    this.updateFree();
    const free = this.tiles.filter((t) => t.active && t.free);

    // Prefer type that already has 1-2 in tray
    const trayCount = {};
    this.tray.forEach((s) => { trayCount[s.type] = (trayCount[s.type] || 0) + 1; });

    let best = null;
    let bestScore = -1;
    const freeByType = {};
    free.forEach((t) => {
      freeByType[t.type] = freeByType[t.type] || [];
      freeByType[t.type].push(t);
    });

    for (const [typeStr, list] of Object.entries(freeByType)) {
      const type = Number(typeStr);
      const inTray = trayCount[type] || 0;
      const score = inTray * 10 + Math.min(3, list.length);
      if (score > bestScore) { bestScore = score; best = list[0]; }
    }

    if (!best) { this.toast('İpucu bulunamadı'); return false; }

    this.hintIds.add(best.id);
    best.glow = 2;
    this.hintsLeft--;
    this.emitAll();
    this.toast('💡 İpucu');
    setTimeout(() => {
      best.glow = 0;
      this.hintIds.delete(best.id);
    }, 1600);
    return true;
  }

  shuffle() {
    if (this.shufflesLeft <= 0) { this.toast('Karıştır kilitli / yok'); return false; }
    const active = this.tiles.filter((t) => t.active);
    const types = active.map((t) => t.type);
    for (let i = types.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [types[i], types[j]] = [types[j], types[i]];
    }
    active.forEach((t, i) => { t.type = types[i]; });
    this.shufflesLeft--;
    this.updateFree();
    this.emitAll();
    this.toast('🔄 Karıştırıldı');
    return true;
  }

  // ---- emit ----
  emitAll() {
    if (typeof this.onHUD === 'function') {
      this.onHUD({
        level: this.level,
        iq: this.iq,
        combo: this.combo,
        maxCombo: this.maxCombo,
        seals: this.seals,
        matches: this.matches,
        moves: this.moves,
        hintsLeft: this.hintsLeft,
        undosLeft: this.undosLeft,
        shufflesLeft: this.shufflesLeft,
        trayLen: this.tray.length,
        trayMax: TRAY_MAX,
      });
    }
    if (typeof this.onTray === 'function') {
      this.onTray(this.tray.map((s) => ({
        type: s.type,
        key: this.types[s.type]?.key,
        color: this.types[s.type]?.color,
        emoji: this.types[s.type]?.emoji,
        img: this.types[s.type]?.img,
      })));
    }
  }

  toast(msg) {
    if (typeof this.onToast === 'function') this.onToast(msg);
  }

  // ---- draw ----
  draw() {
    const ctx = this.ctx;
    const W = this.canvas.width;
    const H = this.canvas.height;
    ctx.clearRect(0, 0, W, H);

    // felt background
    const g = ctx.createRadialGradient(W / 2, H * 0.4, 40, W / 2, H * 0.5, H * 0.7);
    g.addColorStop(0, '#1a3a2a');
    g.addColorStop(1, '#0c1a14');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // soft vignette pattern
    ctx.fillStyle = 'rgba(255,255,255,0.015)';
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.arc(W * (0.2 + i * 0.12), H * 0.3, 80 + i * 10, 0, Math.PI * 2);
      ctx.fill();
    }

    // tiles bottom → top
    const sorted = [...this.tiles].filter((t) => t.active).sort((a, b) => a.z - b.z || a.row - b.row || a.col - b.col);
    for (const t of sorted) this.drawTile(t);

    // flying
    for (let i = this.flying.length - 1; i >= 0; i--) {
      const f = this.flying[i];
      f.life += 1 / 60;
      const p = Math.min(1, f.life / f.dur);
      const e = 1 - Math.pow(1 - p, 3);
      const x = f.x + (f.tx - f.x) * e;
      const y = f.y + (f.ty - f.y) * e;
      this.drawTileFace(f.type, x, y, this.tileW * (1 - 0.15 * e), this.tileH * (1 - 0.15 * e), 1);
      if (p >= 1) this.flying.splice(i, 1);
    }

    // particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life -= 0.025;
      if (p.life <= 0) { this.particles.splice(i, 1); continue; }
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // floating feedback
    if (this.feedback) {
      this.feedback.life -= 0.018;
      if (this.feedback.life <= 0) this.feedback = null;
      else {
        ctx.save();
        ctx.globalAlpha = Math.min(1, this.feedback.life * 1.4);
        ctx.textAlign = 'center';
        ctx.font = 'bold 36px system-ui, sans-serif';
        ctx.fillStyle = this.feedback.color;
        ctx.shadowColor = this.feedback.color;
        ctx.shadowBlur = 20;
        ctx.fillText(this.feedback.text, W / 2, 80);
        ctx.font = 'bold 20px system-ui, sans-serif';
        ctx.fillStyle = '#ffd194';
        ctx.fillText(`Mühür x${this.feedback.combo}`, W / 2, 110);
        ctx.restore();
      }
    }

    // combo timer decay visual is in HUD
    if (this.combo > 0 && performance.now() > this.comboUntil) {
      this.combo = 0;
      this.emitAll();
    }
  }

  drawTile(t) {
    const r = this.tileRect(t);
    const blocked = !t.free;
    // shadow
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath();
    ctx.roundRect(r.x + 3, r.y + 5, r.w, r.h, 10);
    ctx.fill();

    if (t.glow > 0 || this.hintIds.has(t.id)) {
      ctx.shadowColor = this.types[t.type].color;
      ctx.shadowBlur = 18 * (t.glow || 1.5);
    } else ctx.shadowBlur = 0;

    this.drawTileFace(t.type, r.x, r.y, r.w, r.h, blocked ? 0.55 : 1, blocked);
    ctx.shadowBlur = 0;

    if (blocked) {
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.beginPath();
      ctx.roundRect(r.x, r.y, r.w, r.h, 10);
      ctx.fill();
    }
  }

  drawTileFace(type, x, y, w, h, alpha = 1, dim = false) {
    const ctx = this.ctx;
    const meta = this.types[type] || this.types[0];
    ctx.save();
    ctx.globalAlpha = alpha;

    // body
    const grad = ctx.createLinearGradient(x, y, x, y + h);
    grad.addColorStop(0, '#f7f4ee');
    grad.addColorStop(1, '#e4ddd0');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 10);
    ctx.fill();

    // green edge like reference
    ctx.strokeStyle = dim ? 'rgba(40,90,60,0.35)' : 'rgba(40,120,70,0.75)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // inner face
    ctx.fillStyle = '#fffcf6';
    ctx.beginPath();
    ctx.roundRect(x + 4, y + 4, w - 8, h - 8, 7);
    ctx.fill();

    const img = this.tileImages[meta.key];
    if (img) {
      const pad = 6;
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x + pad, y + pad, w - pad * 2, h - pad * 2, 6);
      ctx.clip();
      ctx.drawImage(img, x + pad, y + pad, w - pad * 2, h - pad * 2);
      ctx.restore();
    } else {
      ctx.font = `bold ${Math.floor(w * 0.42)}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(meta.emoji, x + w / 2, y + h / 2);
    }

    // top highlight
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.beginPath();
    ctx.roundRect(x + 6, y + 6, w - 12, h * 0.18, 4);
    ctx.fill();

    ctx.restore();
  }

  startLoop() {
    const loop = () => {
      this.draw();
      this._raf = requestAnimationFrame(loop);
    };
    cancelAnimationFrame(this._raf);
    this._raf = requestAnimationFrame(loop);
  }

  stopLoop() {
    cancelAnimationFrame(this._raf);
  }

  elapsedSec() {
    return Math.max(0, (performance.now() - this.startedAt) / 1000);
  }
}

window.StonebreakingGame = StonebreakingGame;
window.STONE_SPIRITS = SPIRITS;
window.STONE_CHAPTERS = CHAPTERS;
window.STONE_ELEMENTS = ELEMENTS;
window.STONE_TRAY_MAX = TRAY_MAX;
