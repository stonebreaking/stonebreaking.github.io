// =========================================================
// STONEBREAKING — Katmanlı Mahjong Motoru v4.0
// =========================================================

const ELEMENTS = {
  ates:   { id: 'ates',   name: 'Ateş',   color: '#ff6b35', emoji: '🔥', spirit: 'Kor'  },
  su:     { id: 'su',     name: 'Su',     color: '#4ecdc4', emoji: '💧', spirit: 'Baam' },
  toprak: { id: 'toprak', name: 'Toprak', color: '#c4a35a', emoji: '🗿', spirit: 'Mand' },
  hava:   { id: 'hava',   name: 'Hava',   color: '#a8d8ea', emoji: '💨', spirit: 'Zepy' },
};

const SPIRITS = {
  kor:  { id: 'kor',  name: 'Kor',  element: 'ates',   title: 'Ateş Ruhu',   quote: 'Ben Kor, Ateş Vadisi\'nin bekçisiyim.',           scene: '06_GRAFIK/sahne_ates_vadisi.png',     portrait: '06_GRAFIK/kor_ates_ruhu.png',  chapters: [1,2,3] },
  baam: { id: 'baam', name: 'Baam', element: 'su',     title: 'Su Ruhu',     quote: 'Ben Baam, Derinlikler\'in bilge ruhuyum.',       scene: '06_GRAFIK/sahne_derinlikler.png',     portrait: '06_GRAFIK/baam_su_ruhu.png',   chapters: [4,5,6] },
  mand: { id: 'mand', name: 'Mand', element: 'toprak', title: 'Toprak Ruhu', quote: 'Ben Mand, Kristal Mağaralar\'ın deviyim.',       scene: '06_GRAFIK/sahne_kristal_magara.png',  portrait: '06_GRAFIK/mand_toprak_ruhu.png', chapters: [7,8,9] },
  zepy: { id: 'zepy', name: 'Zepy', element: 'hava',   title: 'Hava Ruhu',   quote: 'Ben Zepy, Gökyüzü Tapınağı\'nın rüzgarıyım.',   scene: '06_GRAFIK/sahne_gokyuzu_tapinagi.png', portrait: '06_GRAFIK/zepy_hava_ruhu.png', chapters: [10,11,12] },
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

class StonebreakingGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileW = 46;
    this.tileH = 58;
    this.gap = 3;
    this.layers = [];
    this.selected = null;
    this.score = 0;
    this.moves = 0;
    this.level = 1;
    this.seals = 0;
    this.particles = [];
    this.tileImages = {};
    this.ready = false;

    // 8 tip: 4 element x 2 varyant
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
    this._bound = false;
  }

  async preload() {
    const loads = this.types.map((t) => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => { this.tileImages[t.key] = img; resolve(); };
      img.onerror = () => resolve();
      img.src = t.img;
    }));
    await Promise.all(loads);
    this.ready = true;
  }

  bindInput() {
    if (this._bound) return;
    this._bound = true;
    const handle = (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      this.handleClick((cx - rect.left) * scaleX, (cy - rect.top) * scaleY);
    };
    this.canvas.addEventListener('mousedown', handle);
    this.canvas.addEventListener('touchstart', handle, { passive: false });
  }

  resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    const w = Math.min(parent.clientWidth || 360, 600);
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = (w * 1.2) + 'px';
  }

  newGame(level = this.level) {
    this.level = level;
    this.layers = [];
    this.selected = null;
    this.particles = [];

    const layout = [
      { z: 0, rows: 8, cols: 12, ox: 1, oy: 1 },
      { z: 1, rows: 6, cols: 10, ox: 2, oy: 2 },
      { z: 2, rows: 4, cols: 8,  ox: 3, oy: 3 },
      { z: 3, rows: 2, cols: 6,  ox: 4, oy: 4 },
      { z: 4, rows: 1, cols: 4,  ox: 5, oy: 5 },
    ];

    let id = 0;
    for (const L of layout) {
      for (let r = 0; r < L.rows; r++) {
        for (let c = 0; c < L.cols; c++) {
          if ((r === 0 || r === L.rows - 1) && (c === 0 || c === L.cols - 1)) continue;
          this.layers.push({
            id: id++, x: c + L.ox, y: r + L.oy, z: L.z,
            type: null, active: true, matched: false, blocked: false, glow: 0
          });
        }
      }
    }

    const active = this.layers.filter((t) => t.active);
    const pairs = [];
    const typeCount = this.types.length;
    for (let i = 0; i < Math.floor(active.length / 2); i++) {
      pairs.push(i % typeCount, i % typeCount);
    }
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    active.forEach((t, i) => { t.type = pairs[i] ?? 0; });
    this.updateBlocked();
    this.emitHUD();
  }

  updateBlocked() {
    for (const t of this.layers) {
      if (!t.active || t.matched) { t.blocked = true; continue; }
      const top = this.layers.some((o) =>
        o.active && !o.matched && o.z === t.z + 1 &&
        Math.abs(o.x - t.x) <= 0.5 && Math.abs(o.y - t.y) <= 0.5
      );
      if (top) { t.blocked = true; continue; }
      const left = this.layers.some((o) =>
        o.active && !o.matched && o.z === t.z && o.x === t.x - 1 && o.y === t.y
      );
      const right = this.layers.some((o) =>
        o.active && !o.matched && o.z === t.z && o.x === t.x + 1 && o.y === t.y
      );
      t.blocked = left && right;
    }
  }

  handleClick(mx, my) {
    const offsetX = (this.canvas.width - (14 * (this.tileW + this.gap))) / 2;
    const offsetY = 10;
    const sorted = [...this.layers].sort((a, b) => b.z - a.z);

    for (const t of sorted) {
      if (!t.active || t.matched || t.blocked) continue;
      const scale = 1 - (t.z * 0.04);
      const tx = offsetX + t.x * (this.tileW + this.gap) * scale + (t.z * 3);
      const ty = offsetY + t.y * (this.tileH + this.gap) * scale - (t.z * 4);
      const tw = this.tileW * scale;
      const th = this.tileH * scale;

      if (mx >= tx && mx <= tx + tw && my >= ty && my <= ty + th) {
        if (this.selected === t) {
          this.selected = null; t.glow = 0;
        } else if (!this.selected) {
          this.selected = t; t.glow = 1;
          const meta = this.types[t.type];
          this.toast((meta?.emoji || '◆') + ' seçildi');
        } else {
          this.moves++;
          if (this.selected.type === t.type) {
            this.selected.matched = true; t.matched = true;
            this.selected.active = false; t.active = false;
            this.score += 100 + (this.level * 15);
            this.seals += 0.5;
            this.spawnParticles(tx + tw / 2, ty + th / 2, this.types[t.type].color);
            this.selected = null;
            this.toast('✨ Mühür kırıldı!');
            this.updateBlocked();
            this.checkWin();
          } else {
            this.selected.glow = 0; this.selected = null;
            this.toast('❌ Eşleşmedi');
          }
          this.emitHUD();
        }
        break;
      }
    }
  }

  spawnParticles(x, y, color) {
    for (let i = 0; i < 12; i++) {
      this.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 1, color, size: Math.random() * 3 + 2
      });
    }
  }

  checkWin() {
    const rem = this.layers.filter((t) => t.active && !t.matched).length;
    if (rem === 0) {
      this.toast('🏆 Bölüm tamamlandı!');
      if (typeof this.onWin === 'function') this.onWin(this.level);
    }
  }

  shuffle() {
    const active = this.layers.filter((t) => t.active && !t.matched);
    const types = active.map((t) => t.type);
    for (let i = types.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [types[i], types[j]] = [types[j], types[i]];
    }
    active.forEach((t, i) => { t.type = types[i]; });
    this.selected = null;
    this.toast('🔄 Karıştırıldı');
  }

  hint() {
    const free = this.layers.filter((t) => t.active && !t.matched && !t.blocked);
    for (let i = 0; i < free.length; i++) {
      for (let j = i + 1; j < free.length; j++) {
        if (free[i].type === free[j].type) {
          free[i].glow = 2; free[j].glow = 2;
          setTimeout(() => { free[i].glow = 0; free[j].glow = 0; }, 1200);
          this.toast('💡 İpucu');
          return;
        }
      }
    }
    this.toast('İpucu yok — karıştır!');
  }

  emitHUD() {
    const set = (id, v) => {
      const el = document.getElementById(id);
      if (el) el.textContent = v;
    };
    set('hud-level', this.level);
    set('hud-score', this.score);
    set('hud-moves', this.moves);
    set('hud-seals', Math.floor(this.seals));
  }

  toast(msg) {
    if (typeof this.onToast === 'function') this.onToast(msg);
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // soft board bg
    const g = ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    g.addColorStop(0, '#141428');
    g.addColorStop(1, '#0c0c18');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const offsetX = (this.canvas.width - (14 * (this.tileW + this.gap))) / 2;
    const offsetY = 10;
    const sorted = [...this.layers].sort((a, b) => a.z - b.z);

    for (const t of sorted) {
      if (!t.active || t.matched) continue;
      const scale = 1 - (t.z * 0.04);
      const x = offsetX + t.x * (this.tileW + this.gap) * scale + (t.z * 3);
      const y = offsetY + t.y * (this.tileH + this.gap) * scale - (t.z * 4);
      const w = this.tileW * scale;
      const h = this.tileH * scale;
      const meta = this.types[t.type] || this.types[0];

      // shadow
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.beginPath();
      ctx.roundRect(x + 3, y + 4, w, h, 8);
      ctx.fill();

      if (t.glow > 0) {
        ctx.shadowColor = meta.color;
        ctx.shadowBlur = 22 * t.glow;
      } else {
        ctx.shadowBlur = 0;
      }

      // body
      const grad = ctx.createLinearGradient(x, y, x, y + h);
      grad.addColorStop(0, t.blocked ? '#1a1a28' : '#2d2d48');
      grad.addColorStop(1, t.blocked ? '#111118' : '#1a1a2e');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 8);
      ctx.fill();

      // edge
      ctx.strokeStyle = t.glow > 0 ? meta.color : (t.blocked ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.12)');
      ctx.lineWidth = t.glow > 0 ? 2.2 : 1;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 8);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // symbol image or emoji
      const img = this.tileImages[meta.key];
      if (img) {
        const pad = 5 * scale;
        ctx.save();
        if (t.blocked) ctx.globalAlpha = 0.35;
        ctx.beginPath();
        ctx.roundRect(x + pad, y + pad, w - pad * 2, h - pad * 2, 6);
        ctx.clip();
        ctx.drawImage(img, x + pad, y + pad, w - pad * 2, h - pad * 2);
        ctx.restore();
      } else {
        ctx.font = `bold ${22 * scale}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = t.blocked ? '#555' : '#fff';
        ctx.fillText(meta.emoji, x + w / 2, y + h / 2);
      }

      if (t.blocked) {
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 8);
        ctx.fill();
      }
    }

    // particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx; p.y += p.vy; p.life -= 0.03;
      if (p.life <= 0) { this.particles.splice(i, 1); continue; }
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
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
}

// Export for browser
window.StonebreakingGame = StonebreakingGame;
window.STONE_SPIRITS = SPIRITS;
window.STONE_CHAPTERS = CHAPTERS;
window.STONE_ELEMENTS = ELEMENTS;
