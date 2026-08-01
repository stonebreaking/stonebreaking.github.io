// =========================================================
// STONEBREAKING — Triple Match / Tray Motoru v6.2
// Lava-core master taşlar · tepsi canvas içi · nefes dili · CSS px click
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
  { n: 1,  spirit: 'kor',  title: 'Alev Uyanışı',     region: 'Ateş Vadisi', seal: 'Alev Mühürü', lines: ['Kor: Mühür uyanıyor…', 'Kor: İlk nefesini duydum, Gezgin.', 'Kor: Alev taşlarını kır — vadi seni bekliyor.'] },
  { n: 2,  spirit: 'kor',  title: 'Magma Köprüsü',    region: 'Ateş Vadisi', seal: 'Alev Mühürü', lines: ['Kor: Magma Köprüsü\'ne adım attın.', 'Kor: Ateş seni sınamak istiyor.', 'Kor: Cesaretinle mühürleri kır, yürü.'] },
  { n: 3,  spirit: 'kor',  title: 'Volkan Mührü',     region: 'Ateş Vadisi', seal: 'Alev Mühürü', lines: ['Kor: Volkan Mührü\'ne ulaştın.', 'Kor: Benimle son alevi kır.', 'Kor: Alev Mühürü artık senin — başardın!'] },
  { n: 4,  spirit: 'baam', title: 'Dalga Çağrısı',    region: 'Derinlikler', seal: 'Dalgacık Mühürü', lines: ['Baam: Derinlikler seni çağırıyor.', 'Baam: Dalgalar sabrı öğretir.', 'Baam: Su taşlarını mühürle, sakin kal.'] },
  { n: 5,  spirit: 'baam', title: 'Mercan Labirent',  region: 'Derinlikler', seal: 'Dalgacık Mühürü', lines: ['Baam: Mercan Labirenti karışık.', 'Baam: Akışı hisset, panikleme.', 'Baam: Bilgelik yolu açılır.'] },
  { n: 6,  spirit: 'baam', title: 'İnci Tahtı',       region: 'Derinlikler', seal: 'Dalgacık Mühürü', lines: ['Baam: İnci Tahtı\'ndayız.', 'Baam: Derin nefes, bilge hamle.', 'Baam: İnci Mühürü açıldı — deniz seninle.'] },
  { n: 7,  spirit: 'mand', title: 'Granit Kapı',      region: 'Kristal Mağara', seal: 'Kristal Mühür', lines: ['Mand: Granit Kapı\'ya geldin.', 'Mand: Sabır taşı kırar.', 'Mand: Taşların diliyle konuş.'] },
  { n: 8,  spirit: 'mand', title: 'Kristal Nabız',    region: 'Kristal Mağara', seal: 'Kristal Mühür', lines: ['Mand: Kristal Nabız atıyor.', 'Mand: Dünyanın kalbini duy.', 'Mand: Sakin ol, sarsılma.'] },
  { n: 9,  spirit: 'mand', title: 'Dağ Mührü',        region: 'Kristal Mağara', seal: 'Kristal Mühür', lines: ['Mand: Dağ Mühürü son kapı.', 'Mand: Dayanıklılık senin gücün.', 'Mand: Kristal Mühür senin — dağ seni tanıdı.'] },
  { n: 10, spirit: 'zepy', title: 'Rüzgar Merdiveni', region: 'Gökyüzü Tapınağı', seal: 'Rüzgar Mühürü', lines: ['Zepy: Rüzgar Merdiveni\'ne çık.', 'Zepy: Hafif ol, özgür ol.', 'Zepy: Bulutlar yolu gösterir.'] },
  { n: 11, spirit: 'zepy', title: 'Bulut Labirenti',  region: 'Gökyüzü Tapınağı', seal: 'Rüzgar Mühürü', lines: ['Zepy: Bulut Labirenti süzülüyor.', 'Zepy: Rüzgarın sesini dinle.', 'Zepy: Görünmeyeni gör.'] },
  { n: 12, spirit: 'zepy', title: 'Evren Mührü',      region: 'Gökyüzü Tapınağı', seal: 'Evren Mührü', lines: ['Zepy: Evren Mührü son sınav.', 'Zepy: Dört ruh bir arada — Kor, Baam, Mand, Zepy.', 'Zepy: Evren Mührü kırıldı — Sonsuz yol açıldı!'] },
];

const ENDLESS_CHAPTER = {
  n: 13,
  spirit: 'all',
  title: 'Sonsuz Mühür',
  region: 'Kırık Evren',
  seal: 'Sonsuz Mühür',
  lines: ['Dört ruh birden: Taşlar bitmez.', 'Nefesin yeter mi?', 'Kader senin elinde.'],
  endless: true,
};

const ENDLESS_LINES = [
  'Sonsuz mühür yolu açık…',
  'Nefesini koru, kaderi sen yazarsın.',
  'Her mühür yeni bir hikâye.',
  'Taşlar durmadan konuşuyor.',
];

const TRAY_MAX = 5;
const COMBO_WINDOW_MS = 4000;

// Hikaye nefesleri — Good/Great/Perfect YOK
const SEAL_BREATHS = {
  spark: [
    { text: 'Kıvılcım',  sub: 'Taş uyandı' },
    { text: 'Dokunuş',  sub: 'Mühür titredi' },
    { text: 'İlk Nefes', sub: 'Evren fark etti' },
  ],
  breath: [
    { text: 'Nefes Al',    sub: 'Ritim tutuldu' },
    { text: 'Nabız',       sub: 'Taşlar konuşuyor' },
    { text: 'Derin Nefes', sub: 'Mühür ısınıyor' },
  ],
  awaken: [
    { text: 'Uyanış',     sub: 'Ruh seni gördü' },
    { text: 'Çatlak',     sub: 'Mühür aralandı' },
    { text: 'Alev Dansı', sub: 'Elementler hizalandı' },
  ],
  seal: [
    { text: 'Mühür Kır',   sub: 'Zincir koptu' },
    { text: 'Taş Fısıltı', sub: 'Kadim söz duyuldu' },
    { text: 'Ruh Yankısı', sub: 'Kor · Baam · Mand · Zepy' },
  ],
  legend: [
    { text: 'Evren Nefesi',     sub: 'Dört ruh bir arada' },
    { text: 'Efsane Mühür',     sub: 'Kader senin elinde' },
    { text: 'Sonsuz Kıvılcım',  sub: 'STONEBREAKING' },
  ],
};

function breathForCombo(n) {
  let pool = SEAL_BREATHS.spark;
  let color = '#ffb088';
  if (n >= 15) { pool = SEAL_BREATHS.legend; color = '#FFD700'; }
  else if (n >= 10) { pool = SEAL_BREATHS.seal; color = '#C77DFF'; }
  else if (n >= 6) { pool = SEAL_BREATHS.awaken; color = '#4ecdc4'; }
  else if (n >= 3) { pool = SEAL_BREATHS.breath; color = '#7CFFB2'; }
  const pick = pool[Math.floor(Math.random() * pool.length)];
  return { ...pick, color };
}

class StonebreakingGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.viewW = 360;
    this.viewH = 640;
    this.dpr = 1;

    this.tileW = 56;
    this.tileH = 70;
    this.gapX = 3;
    this.zLift = 10;

    // Tray geometry (inside canvas, top)
    this.trayY = 12;
    this.trayH = 78;
    this.trayPad = 10;
    this.slotW = 48;
    this.slotH = 60;
    // Güvenli varsayılan: resize() gelene kadar NaN geometri önlenir
    this.boardTop = 100;
    this.trayX = 20;
    this.trayW = 320;

    this.tiles = [];
    this.tray = []; // landed slots { type, id }
    this.history = [];
    this.flying = []; // in-flight to tray
    this.particles = [];
    this.tileImages = {};
    this.sceneImg = null;
    this.sceneKey = '';
    this.ready = false;

    this.level = 1;
    this.iq = 40;
    this.combo = 0;
    this.maxCombo = 0;
    this.matches = 0;
    this.moves = 0;
    this.seals = 0;
    this.endless = false; // v6.1: 12. bölüm sonrası Sonsuz Mod
    this.hintsLeft = 1;
    this.undosLeft = 1;
    this.shufflesLeft = 0;
    this.startedAt = 0;
    this.comboUntil = 0;
    this.feedback = null;
    this.hintIds = new Set();
    this.locked = false;
    this.inputLocked = false; // while resolving

    // PATRON BT v6: ates_06_lava_core = master gövde; core set öncelikli
    // v6.1: aynı lava-core gövde + yeni merkez rune varyantları (yazısız)
    this.types = [
      { key: 'ates_core',   color: '#ff6b35', emoji: '🔥', img: '06_GRAFIK/ates_06_lava_core.png' },
      { key: 'ates_2',      color: '#ff6b35', emoji: '⚔️', img: '06_GRAFIK/tas_sembol_ates_2.png' },
      { key: 'ates_3',      color: '#ff6b35', emoji: '🗡️', img: '06_GRAFIK/tas_sembol_ates_3.png' },
      { key: 'su_core',     color: '#4ecdc4', emoji: '💧', img: '06_GRAFIK/tas_sembol_su_core.png' },
      { key: 'su_2',        color: '#4ecdc4', emoji: '🔱', img: '06_GRAFIK/tas_sembol_su_2.png' },
      { key: 'su_3',        color: '#4ecdc4', emoji: '🦪', img: '06_GRAFIK/tas_sembol_su_3.png' },
      { key: 'toprak_core', color: '#c4a35a', emoji: '🗿', img: '06_GRAFIK/tas_sembol_toprak_core.png' },
      { key: 'toprak_2',    color: '#c4a35a', emoji: '⛏️', img: '06_GRAFIK/tas_sembol_toprak_2.png' },
      { key: 'toprak_3',    color: '#c4a35a', emoji: '💎', img: '06_GRAFIK/tas_sembol_toprak_3.png' },
      { key: 'hava_core',   color: '#a8d8ea', emoji: '💨', img: '06_GRAFIK/tas_sembol_hava_core.png' },
      { key: 'hava_2',      color: '#a8d8ea', emoji: '🪶', img: '06_GRAFIK/tas_sembol_hava_2.png' },
      { key: 'hava_3',      color: '#a8d8ea', emoji: '🌀', img: '06_GRAFIK/tas_sembol_hava_3.png' },
    ];

    this.onWin = null;
    this.onToast = null;
    this.onHUD = null;
    this.onTray = null;
    this.onFail = null;
    this.onBreath = null;
    this.onPick = null; // v6.1: taş seçilince (ses/tepki)
    this._bound = false;
    this._raf = 0;
    this._winScheduled = false;
  }

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
    const toLocal = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const pt = e.touches ? e.touches[0] : e;
      // CRITICAL: logical CSS pixels (not device pixels)
      const mx = ((pt.clientX - rect.left) / rect.width) * this.viewW;
      const my = ((pt.clientY - rect.top) / rect.height) * this.viewH;
      return { mx, my };
    };
    const handle = (e) => {
      e.preventDefault();
      if (this.locked || this.inputLocked) return;
      const { mx, my } = toLocal(e);
      this.handleClick(mx, my);
    };
    this.canvas.addEventListener('mousedown', handle);
    this.canvas.addEventListener('touchstart', handle, { passive: false });
  }

  resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    const w = Math.max(280, Math.floor(parent.clientWidth || 360));
    let h = Math.floor(parent.clientHeight || 0);
    if (h < 240) h = Math.floor(window.innerHeight * 0.62) || Math.floor(w * 1.4);

    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.viewW = w;
    this.viewH = h;
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    this.canvas.width = Math.floor(w * this.dpr);
    this.canvas.height = Math.floor(h * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    // Tray metrics
    this.trayY = 10;
    this.trayPad = 10;
    const trayInnerW = Math.min(w - 24, 360);
    this.trayW = trayInnerW;
    this.trayX = (w - trayInnerW) / 2;
    this.slotGap = 6;
    this.slotW = Math.floor((trayInnerW - this.trayPad * 2 - this.slotGap * (TRAY_MAX - 1)) / TRAY_MAX);
    this.slotH = this.slotW; // v6.2: kare taş gövdesi (PNG kare → slot kare)
    this.trayH = this.slotH + this.trayPad * 2;
    this.boardTop = this.trayY + this.trayH + 8;

    this.fitTilesToView();
  }

  fitTilesToView() {
    const W = this.viewW;
    const H = this.viewH - this.boardTop - 8;
    let maxC = 6, maxR = 7, maxZ = 3;
    for (const t of this.tiles) {
      if (!t.active) continue;
      maxC = Math.max(maxC, t.col + 1);
      maxR = Math.max(maxR, t.row + 1);
      maxZ = Math.max(maxZ, t.z);
    }
    const tw = Math.floor((W - 16 - maxZ * 4) / (maxC + 0.15));
    const th = Math.floor((H - 8 + maxZ * 6) / (maxR * 0.5 + 0.55));
    // v6.2: KARE TAŞ — PNG kare olduğundan yüzey de kare; sembol max büyür
    let tileW = Math.max(46, Math.min(80, tw - 2));
    let tileH = tileW;
    if (tileH > th) {
      tileH = Math.max(46, th - 2);
      tileW = tileH;
    }
    this.tileW = tileW;
    this.tileH = tileH;
    this.gapX = Math.max(2, Math.floor(tileW * 0.035)); // sıkı: tam arka arkaya
    this.zLift = Math.max(6, Math.floor(tileH * 0.10));
  }

  setScene(url) {
    if (!url || url === this.sceneKey) return;
    this.sceneKey = url;
    const img = new Image();
    img.onload = () => { this.sceneImg = img; };
    img.onerror = () => { this.sceneImg = null; };
    img.src = url;
  }

  // ---- level ----
  newGame(level = this.level) {
    this.level = level;
    this.endless = level > 12; // Sonsuz Mod: 12. bölüm sonrası
    this.tiles = [];
    this.tray = [];
    this.history = [];
    this.flying = [];
    this.particles = [];
    this.hintIds.clear();
    this.feedback = null;
    this.locked = false;
    this.inputLocked = false;
    this._winScheduled = false;

    // Sonsuz Mod tuning'i (remote v6.1 deneyimi): IQ tabanı yüksek, güçler cömert
    const L = this.endless ? 12 + Math.min(20, level - 12) : level;
    this.iq = this.endless ? 80 + (level - 13) * 3 : 40 + (level - 1) * 2;
    this.combo = 0;
    this.maxCombo = 0;
    this.matches = 0;
    this.moves = 0;
    this.seals = 0;
    this.hintsLeft = 1 + Math.floor((L - 1) / 4) + (this.endless ? 1 : 0);
    this.undosLeft = 1 + Math.floor((L - 1) / 3) + (this.endless ? 1 : 0);
    this.shufflesLeft = L >= 3 ? 1 + Math.floor(L / 5) : 0;
    this.startedAt = performance.now();
    this.comboUntil = 0;

    const layout = this.buildLayout(level);
    while (layout.length % 3 !== 0) layout.pop();

    const groups = layout.length / 3;
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
        free: true,
      });
    });

    this.updateFree();
    this.fitTilesToView();
    this.emitAll();
  }

  buildLayout(level) {
    const out = [];
    const endless = level > 12;
    const e = endless ? Math.floor((level - 13) / 3) : 0;
    const baseCols = 6 + (level % 3) + (endless ? 1 + e : 0);
    const baseRows = 7 + (level % 2) + (endless ? 1 + Math.floor(e / 2) : 0);
    const layers = 3 + Math.min(2, Math.floor(level / 3)) + (endless ? 1 + Math.min(3, Math.floor((level - 13) / 4)) : 0);

    for (let z = 0; z < layers; z++) {
      const cols = Math.max(4, baseCols - z);
      const rows = Math.max(4, baseRows - z);
      const ox = z * 0.5;
      const oy = z * 0.5;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (z === 0 && ((r === 0 && c === 0) || (r === 0 && c === cols - 1))) continue;
          if (z === 0 && r === rows - 1 && (c === 0 || c === cols - 1)) continue;
          if (z === 1 && r === Math.floor(rows / 2) && c === Math.floor(cols / 2)) continue;
          out.push({ col: c + ox, row: r + oy, z });
        }
      }
    }
    const maxTiles = endless ? 66 : 54;
    const minTiles = endless ? 36 : 30;
    if (out.length > maxTiles) out.length = maxTiles - (maxTiles % 3);
    if (out.length < minTiles) {
      for (let i = out.length; i < minTiles; i++) {
        out.push({ col: (i % 5) + 1, row: (i % 6) + 1, z: Math.min(layers, 2) });
      }
    }
    return out;
  }

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
    const W = this.viewW;
    const boardAreaTop = this.boardTop;
    const boardAreaH = this.viewH - boardAreaTop - 6;
    let minC = 99, maxC = 0, minR = 99, maxR = 0, maxZ = 0;
    for (const t of this.tiles) {
      if (!t.active) continue;
      minC = Math.min(minC, t.col); maxC = Math.max(maxC, t.col);
      minR = Math.min(minR, t.row); maxR = Math.max(maxR, t.row);
      maxZ = Math.max(maxZ, t.z);
    }
    if (minC === 99) { minC = 0; maxC = 6; minR = 0; maxR = 7; }
    const cols = (maxC - minC) + 1;
    const rows = (maxR - minR) + 1;
    const boardW = cols * (this.tileW + this.gapX) + maxZ * 5;
    const boardH = rows * (this.tileH * 0.52) + this.tileH + maxZ * 2;
    return {
      x: (W - boardW) / 2 - minC * (this.tileW + this.gapX),
      y: boardAreaTop + Math.max(4, (boardAreaH - boardH) / 2) - minR * (this.tileH * 0.52),
      boardW, boardH,
    };
  }

  tileRect(t) {
    const o = this.boardOrigin();
    return {
      x: o.x + t.col * (this.tileW + this.gapX) + t.z * 5,
      y: o.y + t.row * (this.tileH * 0.52) - t.z * this.zLift,
      w: this.tileW,
      h: this.tileH,
    };
  }

  /** Target rect for tray slot index (0..TRAY_MAX-1) */
  slotRect(index) {
    const x = this.trayX + this.trayPad + index * (this.slotW + this.slotGap);
    const y = this.trayY + this.trayPad;
    return { x, y, w: this.slotW, h: this.slotH };
  }

  /** Where the next inserted tile of this type will land */
  predictSlotIndex(type) {
    // same grouping rule as insertTray
    let idx = -1;
    for (let i = 0; i < this.tray.length; i++) {
      if (this.tray[i].type === type) idx = i;
    }
    if (idx >= 0) return Math.min(idx + 1, TRAY_MAX - 1);
    return Math.min(this.tray.length, TRAY_MAX - 1);
  }

  // ---- input / pick ----
  handleClick(mx, my) {
    const pending = this.tray.length + this.flying.length;
    if (pending >= TRAY_MAX) {
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
          setTimeout(() => { if (t.active) t.glow = 0; }, 220);
          return;
        }
        this.pickTile(t);
        return;
      }
    }
  }

  pickTile(t) {
    if (!t.active || !t.free) return;
    if (this.tray.length + this.flying.length >= TRAY_MAX) return;

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
    this.updateFree();

    const r = this.tileRect(t);
    // Predict landing slot AFTER current tray + in-flight of same type
    const ghostTray = this.tray.map((s) => s.type);
    this.flying.forEach((f) => {
      // simulate insert
      let idx = -1;
      for (let i = 0; i < ghostTray.length; i++) if (ghostTray[i] === f.type) idx = i;
      if (idx >= 0) ghostTray.splice(idx + 1, 0, f.type);
      else ghostTray.push(f.type);
    });
    let landIdx = -1;
    for (let i = 0; i < ghostTray.length; i++) if (ghostTray[i] === t.type) landIdx = i;
    if (landIdx >= 0) landIdx = landIdx + 1;
    else landIdx = ghostTray.length;
    landIdx = Math.min(landIdx, TRAY_MAX - 1);

    const target = this.slotRect(landIdx);

    this.flying.push({
      type: t.type,
      id: t.id,
      x0: r.x, y0: r.y, w0: r.w, h0: r.h,
      x1: target.x, y1: target.y, w1: target.w, h1: target.h,
      t: 0,
      dur: 0.32,
      landed: false,
    });

    if (typeof this.onPick === 'function') this.onPick(t);
    this.emitAll();
  }

  insertTray(type, id) {
    let idx = -1;
    for (let i = 0; i < this.tray.length; i++) {
      if (this.tray[i].type === type) idx = i;
    }
    if (idx >= 0) this.tray.splice(idx + 1, 0, { type, id });
    else this.tray.push({ type, id });
  }

  onFlyLanded(f) {
    this.insertTray(f.type, f.id);
    this.resolveMatches();
    this.emitAll();
  }

  resolveMatches() {
    let any = false;
    // keep clearing while triples exist
    for (let guard = 0; guard < 8; guard++) {
      const counts = {};
      this.tray.forEach((s) => { counts[s.type] = (counts[s.type] || 0) + 1; });
      let clearedType = null;
      for (const [typeStr, count] of Object.entries(counts)) {
        if (count >= 3) { clearedType = Number(typeStr); break; }
      }
      if (clearedType === null) break;

      // remove first 3 of type
      let left = 3;
      const removeIdx = [];
      this.tray.forEach((s, i) => {
        if (s.type === clearedType && left > 0) { removeIdx.push(i); left--; }
      });
      // shatter at their slot positions before remove
      removeIdx.forEach((i) => {
        const sr = this.slotRect(i);
        this.spawnShatter(sr.x + sr.w / 2, sr.y + sr.h / 2, this.types[clearedType].color);
      });
      this.tray = this.tray.filter((_, i) => !removeIdx.includes(i));
      this.onTriple(clearedType);
      any = true;
    }

    if (this.tray.length >= TRAY_MAX) {
      const c = {};
      this.tray.forEach((s) => { c[s.type] = (c[s.type] || 0) + 1; });
      if (!Object.values(c).some((n) => n >= 3)) {
        // v6.1: SOFT-LOCK ÖNLEME — tepsiye sığmayan taşlar tahtaya geri döner
        // (klasik triple-match kurtarma; "dokun-hisset" felsefesi: oyuncu asla sıkışmaz)
        this.tray.forEach((s) => {
          const tile = this.tiles.find((t) => t.id === s.id && !t.active);
          if (tile) { tile.active = true; tile.free = true; }
        });
        this.tray = [];
        this.history = []; // tepsi sıfırlandığı için eski geri-al kayıtları geçersiz
        if (this.shufflesLeft <= 0) this.shufflesLeft = 1; // kilitli shuffle açılır
        this.updateFree();
        this.emitAll();
        this.toast('⚠️ Tepsi doldu — taşlar geri döndü!');
        if (typeof this.onFail === 'function') this.onFail('tray_full');
      }
    }
    if (any) this.checkWin();
    else this.checkWin();
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
    const breath = breathForCombo(this.combo);
    this.feedback = {
      text: breath.text,
      sub: breath.sub,
      color: breath.color || meta.color,
      combo: this.combo,
      life: 1.35,
    };
    this.toast(`${breath.text} · Nefes x${this.combo}`);
    if (typeof this.onBreath === 'function') {
      this.onBreath({ ...breath, combo: this.combo, seals: this.seals, iq: this.iq });
    }
  }

  spawnShatter(x, y, color) {
    for (let i = 0; i < 18; i++) {
      this.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 9,
        vy: (Math.random() - 0.5) * 9 - 1,
        life: 1,
        color,
        size: Math.random() * 4 + 2,
      });
    }
  }

  checkWin() {
    const rem = this.tiles.filter((t) => t.active).length;
    if (rem === 0 && this.tray.length === 0 && this.flying.length === 0) {
      if (this._winScheduled) return;
      this._winScheduled = true;
      setTimeout(() => {
        this._winScheduled = false;
        if (this.tiles.some((t) => t.active) || this.tray.length || this.flying.length) return;
        this.locked = true;
        const elapsed = Math.max(1, (performance.now() - this.startedAt) / 1000);
        if (typeof this.onWin === 'function') {
          this.onWin({
            level: this.level,
            iq: this.iq,
            combo: this.maxCombo,
            matches: this.matches,
            seals: this.seals,
            moves: this.moves,
            timeSec: elapsed,
            rank: this.rankFor(this.iq, this.maxCombo),
          });
        }
      }, 500);
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
    if (this.flying.length) { this.toast('Taş uçuyor…'); return false; }
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
    const trayCount = {};
    this.tray.forEach((s) => { trayCount[s.type] = (trayCount[s.type] || 0) + 1; });
    this.flying.forEach((f) => { trayCount[f.type] = (trayCount[f.type] || 0) + 1; });

    let best = null, bestScore = -1;
    const byType = {};
    free.forEach((t) => { (byType[t.type] = byType[t.type] || []).push(t); });
    for (const [typeStr, list] of Object.entries(byType)) {
      const type = Number(typeStr);
      const score = (trayCount[type] || 0) * 10 + Math.min(3, list.length);
      if (score > bestScore) { bestScore = score; best = list[0]; }
    }
    if (!best) { this.toast('İpucu bulunamadı'); return false; }
    this.hintIds.add(best.id);
    best.glow = 2;
    this.hintsLeft--;
    this.emitAll();
    this.toast('💡 İpucu');
    setTimeout(() => { best.glow = 0; this.hintIds.delete(best.id); }, 1600);
    return true;
  }

  shuffle() {
    if (this.shufflesLeft <= 0) { this.toast('Karıştır kilitli / yok'); return false; }
    if (this.flying.length) return false;
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

  emitAll() {
    if (typeof this.onHUD === 'function') {
      this.onHUD({
        level: this.level,
        endless: this.endless,
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
    // tray is drawn on canvas; still notify for optional HTML mirror
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
    const W = this.viewW;
    const H = this.viewH;
    ctx.clearRect(0, 0, W + 2, H + 2);

    // Unified felt / scene
    if (this.sceneImg) {
      const iw = this.sceneImg.width, ih = this.sceneImg.height;
      const scale = Math.max(W / iw, H / ih);
      const sw = iw * scale, sh = ih * scale;
      ctx.drawImage(this.sceneImg, (W - sw) / 2, (H - sh) / 2, sw, sh);
      // v6.2: hafif karartma (koyu taşlar öne çıksın, dağınıklık yok)
      ctx.fillStyle = 'rgba(6, 20, 14, 0.58)';
      ctx.fillRect(0, 0, W, H);
    } else {
      const g = ctx.createRadialGradient(W / 2, H * 0.45, 30, W / 2, H * 0.5, H * 0.75);
      g.addColorStop(0, '#2a5a3e');
      g.addColorStop(1, '#0e2a1c');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }
    // (çizgi deseni kaldırıldı — temiz film zemini)

    // ---- TRAY (on canvas) ----
    this.drawTray();

    // ---- BOARD tiles ----
    const sorted = [...this.tiles].filter((t) => t.active).sort((a, b) => a.z - b.z || a.row - b.row || a.col - b.col);
    for (const t of sorted) this.drawTile(t);

    // ---- FLYING toward tray ----
    const dt = 1 / 60;
    for (let i = this.flying.length - 1; i >= 0; i--) {
      const f = this.flying[i];
      f.t += dt / f.dur;
      const p = Math.min(1, f.t);
      // ease out cubic + slight arc
      const e = 1 - Math.pow(1 - p, 3);
      const arc = Math.sin(Math.PI * p) * -40;
      const x = f.x0 + (f.x1 - f.x0) * e;
      const y = f.y0 + (f.y1 - f.y0) * e + arc;
      const w = f.w0 + (f.w1 - f.w0) * e;
      const h = f.h0 + (f.h1 - f.h0) * e;
      this.drawTileFace(f.type, x, y, w, h, 1, false, true);
      if (p >= 1 && !f.landed) {
        f.landed = true;
        this.flying.splice(i, 1);
        this.onFlyLanded(f);
      }
    }

    // particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.18; p.life -= 0.028;
      if (p.life <= 0) { this.particles.splice(i, 1); continue; }
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // story breath overlay
    if (this.feedback) {
      this.feedback.life -= 0.014;
      if (this.feedback.life <= 0) this.feedback = null;
      else {
        ctx.save();
        ctx.globalAlpha = Math.min(1, this.feedback.life * 1.5);
        ctx.textAlign = 'center';
        ctx.font = `bold ${Math.max(30, Math.floor(W * 0.095))}px system-ui, sans-serif`;
        ctx.fillStyle = this.feedback.color;
        ctx.shadowColor = this.feedback.color;
        ctx.shadowBlur = 22;
        const fy = this.boardTop + 36;
        ctx.fillText(this.feedback.text, W / 2, fy);
        ctx.shadowBlur = 0;
        ctx.font = `600 ${Math.max(13, Math.floor(W * 0.036))}px system-ui, sans-serif`;
        ctx.fillStyle = 'rgba(255,240,210,0.95)';
        if (this.feedback.sub) ctx.fillText(this.feedback.sub, W / 2, fy + 26);
        ctx.font = `bold ${Math.max(15, Math.floor(W * 0.04))}px system-ui, sans-serif`;
        ctx.fillStyle = '#ffd194';
        ctx.fillText(`Nefes x${this.feedback.combo}`, W / 2, fy + 50);
        ctx.restore();
      }
    }

    if (this.combo > 0 && performance.now() > this.comboUntil) {
      this.combo = 0;
      this.emitAll();
    }
  }

  drawTray() {
    const ctx = this.ctx;
    const x = this.trayX;
    const y = this.trayY;
    const w = this.trayW;
    const h = this.trayH;

    // wood tray plate
    const g = ctx.createLinearGradient(x, y, x, y + h);
    g.addColorStop(0, '#4a3220');
    g.addColorStop(1, '#2a1a10');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 14);
    ctx.fill();

    // glow border by state
    const pending = this.tray.length + this.flying.length;
    let border = '#6b4a2a';
    if (pending >= TRAY_MAX) border = '#ff6b35';
    else if (this.tray.length > 0) border = '#4ecdc4';
    ctx.strokeStyle = border;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // empty slots
    for (let i = 0; i < TRAY_MAX; i++) {
      const s = this.slotRect(i);
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(s.x, s.y, s.w, s.h, 8);
      ctx.fill();
      ctx.stroke();
    }

    // landed tiles in tray
    this.tray.forEach((slot, i) => {
      const s = this.slotRect(i);
      this.drawTileFace(slot.type, s.x, s.y, s.w, s.h, 1, false, true);
    });

    // label
    ctx.fillStyle = 'rgba(255,209,148,0.45)';
    ctx.font = '600 10px system-ui,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('MÜHÜR TEPSİSİ · 3 aynı = nefes', x + w / 2, y + h - 3);
  }

  drawTile(t) {
    const r = this.tileRect(t);
    const blocked = !t.free;
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath();
    ctx.roundRect(r.x + 3, r.y + 5, r.w, r.h, 10);
    ctx.fill();

    if (t.glow > 0 || this.hintIds.has(t.id)) {
      ctx.shadowColor = this.types[t.type].color;
      ctx.shadowBlur = 18 * (t.glow || 1.5);
    } else ctx.shadowBlur = 0;

    this.drawTileFace(t.type, r.x, r.y, r.w, r.h, blocked ? 0.55 : 1, blocked, false);
    ctx.shadowBlur = 0;

    if (blocked) {
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath();
      ctx.roundRect(r.x, r.y, r.w, r.h, 10);
      ctx.fill();
    }
  }

  drawTileFace(type, x, y, w, h, alpha = 1, dim = false, lift = false) {
    const ctx = this.ctx;
    const meta = this.types[type] || this.types[0];
    const radius = Math.max(4, Math.min(9, w * 0.16));
    ctx.save();
    ctx.globalAlpha = alpha;

    if (lift) {
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 5;
    }

    // v6.2: TAŞ GÖVDESİ — şeffaf kenarlı PNG taşın kendisi (balon plaka YOK)
    const img = this.tileImages[meta.key];
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);
    ctx.clip();
    if (img) {
      // cover-fit: kare taş yüzeye tam oturur (PNG kare, yüzey kare)
      const ir = img.width / img.height;
      const tr = w / h;
      let dw = w, dh = h, dx = x, dy = y;
      if (tr > ir) { dh = w / ir; dy = y + (h - dh) / 2; }
      else { dw = h * ir; dx = x + (w - dw) / 2; }
      ctx.drawImage(img, dx, dy, dw, dh);
    } else {
      const g = ctx.createLinearGradient(x, y, x, y + h);
      g.addColorStop(0, '#2a2a3a');
      g.addColorStop(1, '#101018');
      ctx.fillStyle = g;
      ctx.fillRect(x, y, w, h);
      ctx.font = `bold ${Math.floor(w * 0.4)}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(meta.emoji, x + w / 2, y + h / 2);
    }
    ctx.restore();
    // İnce üst çerçeve ışıltısı — sembolü kapatmaz, kenarı vurgular
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x + 1, y + 1, w - 2, h - 2, radius);
    ctx.clip();
    const hl = ctx.createLinearGradient(x, y, x, y + h * 0.16);
    hl.addColorStop(0, 'rgba(255,255,255,0.12)');
    hl.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = hl;
    ctx.fillRect(x, y, w, h * 0.16);
    ctx.restore();

    // Rim light — koyu zeminde taş öne çıksın
    ctx.strokeStyle = dim ? 'rgba(220,210,190,0.10)' : 'rgba(255,236,200,0.30)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(x + 0.75, y + 0.75, w - 1.5, h - 1.5, radius);
    ctx.stroke();

    // Alt kalınlık (3D taban)
    const baseH = Math.max(3, h * 0.07);
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath();
    ctx.roundRect(x + 1, y + h - baseH, w - 2, baseH, 3);
    ctx.fill();

    if (dim) {
      ctx.fillStyle = 'rgba(6,12,10,0.32)';
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, radius);
      ctx.fill();
    }
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
window.STONE_ENDLESS = ENDLESS_CHAPTER;
window.STONE_ELEMENTS = ELEMENTS;
window.STONE_TRAY_MAX = TRAY_MAX;
window.STONE_SEAL_BREATHS = SEAL_BREATHS;
window.STONE_breathForCombo = breathForCombo;
window.STONE_ENDLESS_LINES = ENDLESS_LINES;
// remote v6.1 API: bölüm verisi (13+ → Sonsuz Dalga)
window.STONE_getChapter = function (n) {
  if (n >= 13) {
    return Object.assign({}, ENDLESS_CHAPTER, {
      n,
      title: n === 13 ? 'Sonsuz Mühür' : `Sonsuz · Dalga ${n - 12}`,
      lines: n === 13
        ? ENDLESS_CHAPTER.lines
        : [`Sonsuz dalga ${n - 12}: Taşlar sıkılaştı.`, 'Nefes serini koru.', 'Kader senin elinde.'],
    });
  }
  return CHAPTERS.find((c) => c.n === n) || CHAPTERS[0];
};
