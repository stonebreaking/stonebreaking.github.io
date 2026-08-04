// =========================================================
// STONEBREAKING — Mahjong Solitaire v9.12.0
// M-018: 4 dizilim deseni (duvar/piramit/halka/elmas) · Sonsuz = TÜM elementler (37 tip)
//        Bölüm rampası (B1=4 tip → B6+=9 tip) · açılış hamlesi garantisi (sessiz)
// M-014/M-015: varyantlar (9 tip/element), Bölüm 11 Kara Taşlar, Sonsuz ELITE bonus
// YENİ: ensureMoves — hamle yoksa ücretsiz evren karıştırması (kilitlenme imkânsız)
// FIX: undo iki taşı geri getiriyor (tile1Id/tile2Id) — önce sadece sayaçlar dönüyordu
// Klasik Mahjong: aynı serbest karolar8 eşleşir · üstteki kilitler · sol/sağ açar · mühürle patron BT
// =========================================================

const ELEMENTS = {
  ates:   { id: 'ates',   name: 'Ateş',   color: '#ff6b35', emoji: '🔥', spirit: 'Kor'  },
  su:     { id: 'su',     name: 'Su',     color: '#4ecdc4', emoji: '💧', spirit: 'Baam' },
  toprak: { id: 'toprak', name: 'Toprak', color: '#c4a35a', emoji: '🗿', spirit: 'Mand' },
  hava:   { id: 'hava',   name: 'Hava',   color: '#a8d8ea', emoji: '💨', spirit: 'Zepy' },
};

const SPIRITS = {
  kor:  { id: 'kor',  name: 'Kor',  element: 'ates',   title: 'Ateş Ruhu',   gender: 'erkek', quote: 'Ben Kor, Ateş Vadisi\'nin bekçisiyim.',           scene: '06_GRAFIK/sahne_ates_vadisi.png',      portrait: '06_GRAFIK/kor_ates_ruhu.png',           chapters: [1, 2, 3] },
  baam: { id: 'baam', name: 'Baam', element: 'su',     title: 'Su Ruhu',     gender: 'kadin', quote: 'Ben Baam, Derinlikler\'in bilge ruhuyum.',       scene: '06_GRAFIK/sahne_derinlikler.png',      portrait: '06_GRAFIK/baam_su_ruhu.png',            chapters: [4, 5, 6] },
  mand: { id: 'mand', name: 'Mand', element: 'toprak', title: 'Toprak Ruhu', gender: 'erkek', quote: 'Ben Mand, Kristal Mağaralar\'ın muhafızıyım.',       scene: '06_GRAFIK/sahne_kristal_magara.png',   portrait: '06_GRAFIK/mand_toprak_ruhu_erkek.png',  chapters: [7, 8, 9] },
  zepy: { id: 'zepy', name: 'Zepy', element: 'hava',   title: 'Hava Ruhu',   gender: 'kadin', quote: 'Ben Zepy, Gökyüzü Tapınağı\'nın rüzgarıyım.',   scene: '06_GRAFIK/sahne_gokyuzu_tapinagi.png', portrait: '06_GRAFIK/zepy_hava_ruhu.png',          chapters: [10, 11, 12] },
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

// Mahjong Solitaire — TRAY_MAX yok
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
    // Mahjong Solitaire: seçili karo (ilk tıklama)
    this.selectedTile = null;
    // Güvenli varsayılan: resize() gelene kadar NaN geometri önlenir
    this.boardTop = 100;


    this.tiles = [];
    this.history = []; // geri al için
    this.particles = []; this.selectedTile = null;
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
    // v9.9: Element izolasyonu — bölüm elementinin taşları SADECE o element
    this.elementSets = {
      ates: [
        { key: 'ates_core', color: '#ff6b35', emoji: '🔥', img: '06_GRAFIK/tas_ates_core.png' },
        { key: 'ates_2',    color: '#ff6b35', emoji: '⚔️', img: '06_GRAFIK/tas_ates_2.png' },
        { key: 'ates_3',    color: '#ff6b35', emoji: '🗡️', img: '06_GRAFIK/tas_ates_3.png' },
        { key: 'ates_4',    color: '#ff6b35', emoji: '◆',  img: '06_GRAFIK/tas_ates_4.png' },
        { key: 'ates_5',    color: '#ff6b35', emoji: '🌀', img: '06_GRAFIK/tas_ates_5.png' },
        { key: 'ates_6',    color: '#ff6b35', emoji: '🌟', img: '06_GRAFIK/tas_ates_6.png' },
        { key: 'ates_alev',  color: '#ff8c1a', emoji: '🕯️', img: '06_GRAFIK/tas_ates_alev.png' },
        { key: 'ates_koz',   color: '#ff5722', emoji: '💥', img: '06_GRAFIK/tas_ates_koz.png' },
        { key: 'ates_volkan', color: '#ffb300', emoji: '🌋', img: '06_GRAFIK/tas_ates_volkan.png' },
      ],
      su: [
        { key: 'su_core', color: '#4ecdc4', emoji: '💧', img: '06_GRAFIK/tas_su_core.png' },
        { key: 'su_2',    color: '#4ecdc4', emoji: '🔱', img: '06_GRAFIK/tas_su_2.png' },
        { key: 'su_3',    color: '#4ecdc4', emoji: '🦪', img: '06_GRAFIK/tas_su_3.png' },
        { key: 'su_4',    color: '#4ecdc4', emoji: '🌊', img: '06_GRAFIK/tas_su_4.png' },
        { key: 'su_5',    color: '#4ecdc4', emoji: '🌧️', img: '06_GRAFIK/tas_su_5.png' },
        { key: 'su_6',    color: '#4ecdc4', emoji: '❄️', img: '06_GRAFIK/tas_su_6.png' },
        { key: 'su_damla', color: '#3fd4ff', emoji: '💦', img: '06_GRAFIK/tas_su_damla.png' },
        { key: 'su_buz',   color: '#a8e6ff', emoji: '🧊', img: '06_GRAFIK/tas_su_buz.png' },
        { key: 'su_sis',   color: '#7fd1c8', emoji: '🌫️', img: '06_GRAFIK/tas_su_sis.png' },
      ],
      toprak: [
        { key: 'toprak_core', color: '#c4a35a', emoji: '🗿', img: '06_GRAFIK/tas_toprak_core.png' },
        { key: 'toprak_2',    color: '#c4a35a', emoji: '⛏️', img: '06_GRAFIK/tas_toprak_2.png' },
        { key: 'toprak_3',    color: '#c4a35a', emoji: '💎', img: '06_GRAFIK/tas_toprak_3.png' },
        { key: 'toprak_4',    color: '#c4a35a', emoji: '⛰️', img: '06_GRAFIK/tas_toprak_4.png' },
        { key: 'toprak_5',    color: '#c4a35a', emoji: '🌱', img: '06_GRAFIK/tas_toprak_5.png' },
        { key: 'toprak_6',    color: '#c4a35a', emoji: '🛡️', img: '06_GRAFIK/tas_toprak_6.png' },
        { key: 'toprak_run',     color: '#2ecc71', emoji: '🪨', img: '06_GRAFIK/tas_toprak_run.png' },
        { key: 'toprak_kristal', color: '#50c878', emoji: '🔮', img: '06_GRAFIK/tas_toprak_kristal.png' },
        { key: 'toprak_kaya',    color: '#7fdb6a', emoji: '🏔️', img: '06_GRAFIK/tas_toprak_kaya.png' },
      ],
      hava: [
        { key: 'hava_core', color: '#a8d8ea', emoji: '💨', img: '06_GRAFIK/tas_hava_core.png' },
        { key: 'hava_2',    color: '#a8d8ea', emoji: '🪶', img: '06_GRAFIK/tas_hava_2.png' },
        { key: 'hava_3',    color: '#a8d8ea', emoji: '🌀', img: '06_GRAFIK/tas_hava_3.png' },
        { key: 'hava_4',    color: '#a8d8ea', emoji: '☁️', img: '06_GRAFIK/tas_hava_4.png' },
        { key: 'hava_5',    color: '#a8d8ea', emoji: '⚡', img: '06_GRAFIK/tas_hava_5.png' },
        { key: 'hava_6',    color: '#a8d8ea', emoji: '🌬️', img: '06_GRAFIK/tas_hava_6.png' },
        { key: 'hava_spiral', color: '#e8f4ff', emoji: '🌪️', img: '06_GRAFIK/tas_hava_spiral.png' },
        { key: 'hava_simsek', color: '#b3e5fc', emoji: '🌩️', img: '06_GRAFIK/tas_hava_simsek.png' },
        { key: 'hava_bulut',  color: '#f5f9ff', emoji: '🌥️', img: '06_GRAFIK/tas_hava_bulut.png' },
      ],
    };
    this.currentElement = 'ates';

    // v9.11.0 · M-014/M-015: Bölüm 11 "Kara Taşlar" seti — 4 element mühürlü (kararmış) hâlde
    this.karaSet = [
      { key: 'kara_ates',   color: '#8a4a1e', emoji: '🔥', img: '06_GRAFIK/tas_kara_ates.png' },
      { key: 'kara_su',     color: '#2e6f8f', emoji: '💧', img: '06_GRAFIK/tas_kara_su.png' },
      { key: 'kara_toprak', color: '#3f7a40', emoji: '🗿', img: '06_GRAFIK/tas_kara_toprak.png' },
      { key: 'kara_hava',   color: '#8d9aa8', emoji: '💨', img: '06_GRAFIK/tas_kara_hava.png' },
    ];
    // M-014: ELITE mühür taşı — Sonsuz Mod'da bonus tip olarak karışır
    this.eliteTile = { key: 'muhur_elite', color: '#ffd194', emoji: '💠', img: '06_GRAFIK/tas_muhur_elite.png' };
    this.types = Object.values(this.elementSets).flat();

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
    // v6.8.2: PROGRESSIVE ASYNC LOADING — 25MB görsel indirmesini engellemez!
    // → Oyun tahtası anında yüklenir ve emoji/taş rün fallbacks ile hemen oynanabilir.
    // → Görseller arka planda indikçe tık tık tahtada belirir ve otomatik redraw tetiklenir.
    // → Siyah ekranda kalma veya yükleme donmaları kesin olarak çözülmüştür!
    const allTypes = [...Object.values(this.elementSets).flat(), ...this.karaSet, this.eliteTile]; // v9.11.0
    allTypes.forEach((t) => {
      const img = new Image();
      img.onload = () => {
        this.tileImages[t.key] = img;
        this.draw(); // Görsel yüklenince anında çizimi tazele!
      };
      img.src = t.img;
    });
    this.ready = true;
    return Promise.resolve();
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
    // Mahjong Solitaire — tahta doğrudan üstten başlar
    this.slotGap = 6;

    this.slotH = this.slotW; // v6.2: kare taş gövdesi (PNG kare → slot kare)
    this.boardTop = 8;

    this.fitTilesToView();
  }

  fitTilesToView() {
    const W = this.viewW;
    const H = this.viewH - this.boardTop - 8;
    let maxC = 0, maxR = 0, maxZ = 0;
    let minC = 99, minR = 99;
    for (const t of this.tiles) {
      if (!t.active) continue;
      minC = Math.min(minC, t.col);
      minR = Math.min(minR, t.row);
      maxC = Math.max(maxC, t.col);
      maxR = Math.max(maxR, t.row);
      maxZ = Math.max(maxZ, t.z);
    }
    const cols = (maxC - minC) + 1;
    const rows = (maxR - minR) + 1;
    const tw = Math.floor((W - 12 - maxZ * 4) / (cols + 0.15));
    const th = Math.floor((H - 8 + maxZ * 6) / (rows * 0.52 + 0.55));
    // KARE TAŞ — PNG kare olduğundan yüzey de kare
    let tileW = Math.max(42, Math.min(80, tw - 2));
    let tileH = tileW;
    if (tileH > th) {
      tileH = Math.max(42, th - 2);
      tileW = tileH;
    }
    this.tileW = tileW;
    this.tileH = tileH;
    this.gapX = Math.max(2, Math.floor(tileW * 0.04));
    this.zLift = Math.max(6, Math.floor(tileH * 0.12));
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

    this.history = [];

    this.particles = []; this.selectedTile = null;
    this.hintIds.clear();
    this.feedback = null;
    this.locked = false;
    this.inputLocked = false;
    this._winScheduled = false;

    // Sonsuz Mod tuning'i — dalga arttıkça zorlaşır, güçler dengeli
    const L = this.endless ? 12 + Math.min(20, level - 12) : level;
    this.iq = this.endless ? 80 + (level - 13) * 3 : 40 + (level - 1) * 2;
    this.combo = 0;
    this.maxCombo = 0;
    this.matches = 0;
    this.moves = 0;
    this.seals = 0;
    // Sonsuz Mod güç dengesi: her 3 dalga'da 1 ekstra ipucu ve geri al
    this.hintsLeft = 1 + Math.floor((L - 1) / 4) + (this.endless ? Math.floor((level - 12) / 3) : 0);
    this.undosLeft = 1 + Math.floor((L - 1) / 3) + (this.endless ? Math.floor((level - 12) / 4) : 0);
    this.shufflesLeft = L >= 3 ? 1 + Math.floor(L / 5) + (this.endless ? Math.floor((level - 13) / 5) : 0) : 0;
    this.startedAt = performance.now();
    this.comboUntil = 0;

    const layout = this.buildLayout(level);
    // v9.9: Klasik Mahjong Solitaire — tepsi YOK, direkt tahta eşleşme
    while (layout.length % 2 !== 0) layout.pop();

    // v9.9: ELEMENT İZOLASYONU — hikâye bölümlerinde her level SADECE 1 elementin taşlarını kullanır
    const ELEM_ORDER = ['ates', 'su', 'toprak', 'hava'];
    const elementKey = ELEM_ORDER[(level - 1) % 4];
    // v9.12.0 · M-018 (Patron emri 04.08): SONSUZ MOD = TÜM ELEMENTLER bir arada
    this.currentElement = this.endless ? 'karma' : elementKey;
    // v9.11.0 · Bölüm 11 "Kara Taşlar": izolasyon BİLEREK bozulur (mühürlü 4 element karışık)
    // v9.12.0 · M-018 RAMPA — IQ mantığı: bölüm ilerledikçe tip havuzu açılır (B1=4 tip · B6+=9 tip)
    // M-014 ELITE mühür: Sonsuz Mod'da bonus tip olarak karışır (36+1=37 tip)
    const elementTypes = level === 11 && !this.endless
      ? this.karaSet
      : (this.endless
          ? [...this.elementSets.ates, ...this.elementSets.su, ...this.elementSets.toprak, ...this.elementSets.hava, this.eliteTile]
          : this.elementSets[elementKey].slice(0, Math.min(this.elementSets[elementKey].length, 3 + level)));
    this.types = elementTypes; // SADECE bu setin taşları

    // v9.9: 2'li DAĞITIM — her tip 2 adet (çift), Vita Mahjong garantili çözülebilir
    const groups = layout.length / 2;
    const typeSeq = [];
    for (let i = 0; i < groups; i++) {
      const type = i % elementTypes.length;
      typeSeq.push(type, type);
    }
    // Tüm taş tiplerini tamamen karıştır
    for (let i = typeSeq.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [typeSeq[i], typeSeq[j]] = [typeSeq[j], typeSeq[i]];
    }

    let id = 0;
    layout.forEach((pos, i) => {
      this.tiles.push({
        id: id++,
        col: pos.col,
        row: pos.row,
        z: pos.z,
        type: typeSeq[i],
        active: true,
        glow: 0,
        free: true,
      });
    });

    this.updateFree();
    this.fitTilesToView();
    this.emitAll();
    // v9.12.0 · M-018: açılışta hamle GARANTİSİ — sessiz (evren fısıldamaz, sadece dizer)
    this.ensureMoves({ sessiz: true });
  }

  buildLayout(level) {
    // v9.12.0 · M-018: 4 DİZİLİM DESENİ — bölüm başına rotasyon ((level-1)%4)
    // 0=duvar (klasik sur) · 1=piramit (zirveye tırmanış) · 2=halka (kalp boşluğu) · 3=elmas (baklava)
    // Her desen farklı zihin jimnastiği: kenar kesme / katman indirme / merkez açma / köşe çözme
    const endless = level > 12;
    const wave = endless ? Math.min(6, level - 12) : 0;
    const desen = (level - 1) % 4;
    let out;
    if (desen === 0) out = this._desenDuvar(wave, endless);
    else if (desen === 1) out = this._desenPiramit(wave, endless);
    else if (desen === 2) out = this._desenHalka(wave, endless);
    else out = this._desenElmas(wave, endless);

    // Sonsuz dalga ölçekleme: 3. dalgadan itibaren tahta dış halkayla kalınlaşır
    if (endless && wave >= 3) out = this._cerceveEkle(out, wave >= 5 ? 2 : 1);

    // ÇİFT sayı garantisi
    if (out.length % 2 !== 0) out.pop();

    // Max tile limit
    const maxTiles = endless ? 80 : 54;
    if (out.length > maxTiles) out.length = Math.floor(maxTiles / 2) * 2;

    // Benzersizlik — aynı hücre asla iki kez yazılmaz
    const seen = new Set();
    return out.filter((p) => {
      const k = `${p.col}|${p.row}|${p.z}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }

  // M-018 · DESEN 0 — DUVAR: klasik sur (6×5 gövde) + yarım-ofset iç duvar (z=1)
  _desenDuvar(wave, endless) {
    const out = [];
    const baseCols = endless ? 8 + Math.floor(wave * 0.3) : 6;
    const baseRows = endless ? 5 + Math.floor(wave * 0.2) : 5;
    for (let r = 0; r < baseRows; r++) {
      for (let c = 0; c < baseCols; c++) out.push({ col: c, row: r, z: 0 });
    }
    const topCols = Math.max(2, baseCols - 2);
    const topRows = Math.max(2, baseRows - 2);
    for (let r = 0; r < topRows; r++) {
      for (let c = 0; c < topCols; c++) out.push({ col: c + 0.5, row: r + 0.5, z: 1 });
    }
    return out;
  }

  // M-018 · DESEN 1 — PİRAMİT: geniş tabandan zirveye (8-7-6-5) + mühür tepesi (3+3, z=1)
  _desenPiramit(wave, endless) {
    const out = [];
    const G = endless ? 8 + Math.min(4, wave) : 8; // dalga = daha geniş taban
    const katman = endless ? 4 + Math.min(2, Math.floor(wave / 2)) : 4; // dalga = daha yüksek piramit
    for (let i = 0; i < katman; i++) {
      const w = G - i;
      if (w < 2) break;
      const off = (G - w) / 2;
      for (let c = 0; c < w; c++) out.push({ col: off + c, row: i, z: 0 });
    }
    // Tepe mühür katmanı — yarım ofset 2 sıra × 3 taş (z=1)
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        out.push({ col: G / 2 - 2 + c + 0.5, row: 1.5 + r, z: 1 });
      }
    }
    return out;
  }

  // M-018 · DESEN 2 — HALKA: dolu sur, kalbinde 2 hücrelik boş mühür + yükselen iç halka (z=1)
  _desenHalka(wave, endless) {
    const out = [];
    const cols = endless ? 8 + Math.min(4, Math.floor(wave / 2) * 2) : 8; // hep ÇİFT — üst halka yarım-ofset kalır
    const rows = endless ? 5 + Math.min(3, Math.floor(wave / 2)) : 5;
    const hr = Math.floor(rows / 2);
    const hc1 = Math.floor(cols / 2) - 1;
    const hc2 = Math.floor(cols / 2);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (r === hr && (c === hc1 || c === hc2)) continue; // kalp boşluğu — mühür kapısı
        out.push({ col: c, row: r, z: 0 });
      }
    }
    // İç halka — yarım ofset 6 taş: boşluğun üstünde 3 + altında 3 (z=1)
    const mid = cols / 2 - 2;
    for (let c = 0; c < 3; c++) {
      out.push({ col: mid + c + 0.5, row: hr - 0.5, z: 1 });
      out.push({ col: mid + c + 0.5, row: hr + 0.5, z: 1 });
    }
    return out;
  }

  // M-018 · DESEN 3 — ELMAS: baklava profili (2-4-6-8-6-4-2) + merkez mühür bloğu (2×2, z=1)
  _desenElmas(wave, endless) {
    const out = [];
    const G = endless ? 8 + Math.min(4, wave) : 8;
    const yarim = [];
    for (let w = 2; w <= G; w += 2) yarim.push(w);
    const profil = [...yarim, ...yarim.slice(0, -1).reverse()];
    profil.forEach((w, r) => {
      const off = (G - w) / 2;
      for (let c = 0; c < w; c++) out.push({ col: off + c, row: r, z: 0 });
    });
    // Merkez mühür bloğu — yarım ofset 2×2 (z=1)
    const mr = (profil.length - 1) / 2;
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 2; c++) {
        out.push({ col: G / 2 - 0.5 + c, row: mr - 0.5 + r, z: 1 });
      }
    }
    return out;
  }

  // M-018 · Sonsuz dalga çerçevesi — z=0 bbox dışına 1 halkalık tam sur (her halka ÇİFT sayıda taş)
  _cerceveEkle(out, katman = 1) {
    let minC = 1e9, maxC = -1e9, minR = 1e9, maxR = -1e9;
    for (const p of out) {
      if (p.z !== 0) continue;
      if (p.col < minC) minC = p.col;
      if (p.col > maxC) maxC = p.col;
      if (p.row < minR) minR = p.row;
      if (p.row > maxR) maxR = p.row;
    }
    if (minC > maxC) return out;
    const dL = Math.floor(minC), dR = Math.ceil(maxC);
    const dT = Math.floor(minR), dB = Math.ceil(maxR);
    const ekle = [];
    for (let c = dL; c <= dR; c++) {
      ekle.push({ col: c, row: dT - 1, z: 0 });
      ekle.push({ col: c, row: dB + 1, z: 0 });
    }
    for (let r = dT; r <= dB; r++) {
      ekle.push({ col: dL - 1, row: r, z: 0 });
      ekle.push({ col: dR + 1, row: r, z: 0 });
    }
    let res = [...out, ...ekle];
    if (katman > 1) res = this._cerceveEkle(res, katman - 1);
    return res;
  }

  updateFree() {
    // v9.9: Klasik Mahjong Solitaire — serbest karo kontrolü
    // Serbest = üstü açık VE (sol açık VEYA sağ açık)
    for (const t of this.tiles) {
      if (!t.active) { t.free = false; continue; }
      // a) Üstte karo var mı?
      const covered = this.tiles.some((o) =>
        o.active && o.id !== t.id && o.z > t.z &&
        Math.abs(o.col - t.col) < 0.85 &&
        Math.abs(o.row - t.row) < 0.85
      );
      if (covered) { t.free = false; continue; }
      // b) Sol açık mı? (solunda aynı z'de karo yok)
      const leftBlocked = this.tiles.some((o) =>
        o.active && o.id !== t.id && o.z === t.z &&
        o.row === t.row && Math.abs(o.col - (t.col - 1)) < 0.3
      );
      // c) Sağ açık mı?
      const rightBlocked = this.tiles.some((o) =>
        o.active && o.id !== t.id && o.z === t.z &&
        o.row === t.row && Math.abs(o.col - (t.col + 1)) < 0.3
      );
      // Serbest = sol açık VEYA sağ açık
      t.free = !leftBlocked || !rightBlocked;
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

  /** Where the next inserted tile of this type will land */
  // ---- input / pick ----
  handleClick(mx, my) {
    // v9.9: Klasik Mahjong Solitaire — iki serbest aynı karo = eşleş
    const sorted = [...this.tiles].filter((t) => t.active).sort((a, b) => b.z - a.z || b.row - a.row);
    for (const t of sorted) {
      const r = this.tileRect(t);
      if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) {
        if (!t.free) {
          this.toast('🔒 Kilidi açık değil — üstteki veya yan karoları kaldır');
          t.glow = 0.6;
          setTimeout(() => { if (t.active) t.glow = 0; }, 220);
          return;
        }
        this.selectTile(t);
        return;
      }
    }
    // Boş alana tıkla → seçimi kaldır
    if (this.selectedTile) {
      this.selectedTile.glow = 0;
      this.selectedTile = null;
      this.emitAll();
    }
  }

  selectTile(t) {
    if (!t.active || !t.free) return;

    // İlk seçim
    if (!this.selectedTile) {
      this.selectedTile = t;
      t.glow = 1.5;
      this.emitAll();
      return;
    }

    // Aynı karo → seçimi kaldır
    if (this.selectedTile.id === t.id) {
      this.selectedTile.glow = 0;
      this.selectedTile = null;
      this.emitAll();
      return;
    }

    // İkinci seçim — aynı tip mi?
    if (this.selectedTile.type === t.type) {
      // EŞLEŞTİ! İki karo kaldır
      const first = this.selectedTile;
      this.selectedTile = null;

      this.history.push({
        tile1Id: first.id, tile1Type: first.type,
        tile2Id: t.id, tile2Type: t.type,
        iq: this.iq, combo: this.combo,
        matches: this.matches, seals: this.seals,
        maxCombo: this.maxCombo,
      });

      first.active = false;
      t.active = false;
      first.glow = 0;
      t.glow = 0;
      this.moves++;
      this.hintIds.delete(first.id);
      this.hintIds.delete(t.id);

      // Patlatma efekti
      const r1 = this.tileRect(first);
      const r2 = this.tileRect(t);
      this.spawnShatter(r1.x + r1.w/2, r1.y + r1.h/2, this.types[first.type]?.color || '#ffd194');
      this.spawnShatter(r2.x + r2.w/2, r2.y + r2.h/2, this.types[t.type]?.color || '#ffd194');

      this.updateFree();
      this.onMatch(first.type);
      this.emitAll();
      this.checkWin();
      this.ensureMoves(); // v9.10.4: hamle kalmazsa evren karıştırır
      if (typeof this.onPick === 'function') this.onPick(t);
    } else {
      // Farklı tip → ilk seçimi kaldır, yeni seç
      this.selectedTile.glow = 0;
      this.selectedTile = t;
      t.glow = 1.5;
      this.toast('◆ Farklı sembol — aynı karoları eşleştir');
      this.emitAll();
    }
  }

  onMatch(type) {
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

  onPair(type) {
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
    if (rem === 0) {
      if (this._winScheduled) return;
      this._winScheduled = true;
      setTimeout(() => {
        this._winScheduled = false;
        if (this.tiles.some((t) => t.active) || 0 || 0) return;
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
            element: this.currentElement,
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
    const snap = this.history.pop();
    // v9.10.4 fix: geçmişe tile1Id/tile2Id yazılıyor — İKİ taş da geri gelmeli
    const t1 = this.tiles.find((t) => t.id === snap.tile1Id);
    const t2 = this.tiles.find((t) => t.id === snap.tile2Id);
    if (t1) t1.active = true;
    if (t2) t2.active = true;
    this.iq = snap.iq;
    this.combo = snap.combo;
    this.matches = snap.matches;
    this.seals = snap.seals;
    this.maxCombo = snap.maxCombo;
    this.undosLeft--;
    this.updateFree();
    this.ensureMoves(); // v9.10.4: undo sonrası hamle garantisi
    this.emitAll();
    this.toast('↩ Geri alındı');
    return true;
  }

  hint() {
    if (this.hintsLeft <= 0) { this.toast('İpucu yok'); return false; }
    this.updateFree();
    const free = this.tiles.filter((t) => t.active && t.free);
    const trayCount = {};

    let best = null, bestScore = -1;
    const byType = {};
    free.forEach((t) => { (byType[t.type] = byType[t.type] || []).push(t); });
    for (const [typeStr, list] of Object.entries(byType)) {
      const type = Number(typeStr);
      const score = Math.min(3, list.length);
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
    if (0) return false;
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

  // v9.10.4: Hamle kalmadı mı? — evren ÜCRETSİZ karıştırır (Vita garantisi: kilitlenme yok)
  hasMoves() {
    const free = this.tiles.filter((t) => t.active && t.free);
    const seen = new Set();
    for (const t of free) {
      if (seen.has(t.type)) return true;
      seen.add(t.type);
    }
    return false;
  }

  ensureMoves(secenek = {}) {
    if (this._ensuring) return;
    if (!this.tiles.some((t) => t.active)) return; // tahta bitti — zafer akışına dokunma
    this._ensuring = true;
    try {
      this.updateFree();
      let tries = 0;
      while (!this.hasMoves() && tries < 20) {
        const active = this.tiles.filter((t) => t.active);
        const types = active.map((t) => t.type);
        for (let i = types.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [types[i], types[j]] = [types[j], types[i]];
        }
        active.forEach((t, i) => { t.type = types[i]; });
        this.updateFree();
        tries++;
      }
      if (tries > 0) {
        this.selectedTile = null;
        this.hintIds.clear();
        this.emitAll();
        if (!secenek.sessiz) this.toast('🌀 Hamle kalmadı — evren taşları yeniden dizdi');
      }
    } finally {
      this._ensuring = false;
    }
  }

  emitAll() {
    if (typeof this.onHUD === 'function') {
      this.onHUD({
        level: this.level,
        endless: this.endless,
        element: this.currentElement,
        iq: this.iq,
        combo: this.combo,
        maxCombo: this.maxCombo,
        seals: this.seals,
        matches: this.matches,
        moves: this.moves,
        hintsLeft: this.hintsLeft,
        undosLeft: this.undosLeft,
        shufflesLeft: this.shufflesLeft,
        element: this.currentElement,
      });
    }
    // Mahjong: no tray
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

    // v9.9: Mahjong Solitaire — tepsi yok

    // ---- BOARD tiles ----
    const sorted = [...this.tiles].filter((t) => t.active).sort((a, b) => a.z - b.z || a.row - b.row || a.col - b.col);
    for (const t of sorted) this.drawTile(t);

    // v9.9: Mahjong — flying animasyon yok

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
        // v9.13: daha küçük, zarif nefes yazısı (büyük yazı şikayeti)
        ctx.font = `bold ${Math.max(16, Math.floor(W * 0.048))}px system-ui, sans-serif`;
        ctx.fillStyle = this.feedback.color;
        ctx.shadowColor = this.feedback.color;
        ctx.shadowBlur = 12;
        const fy = this.boardTop + 28;
        ctx.fillText(this.feedback.text, W / 2, fy);
        ctx.shadowBlur = 0;
        ctx.font = `600 ${Math.max(11, Math.floor(W * 0.028))}px system-ui, sans-serif`;
        ctx.fillStyle = 'rgba(255,240,210,0.9)';
        if (this.feedback.sub) ctx.fillText(this.feedback.sub, W / 2, fy + 18);
        ctx.font = `bold ${Math.max(12, Math.floor(W * 0.032))}px system-ui, sans-serif`;
        ctx.fillStyle = '#ffd194';
        ctx.fillText(`Nefes x${this.feedback.combo}`, W / 2, fy + 36);
        ctx.restore();
      }
    }

    if (this.combo > 0 && performance.now() > this.comboUntil) {
      this.combo = 0;
      this.emitAll();
    }
  }

  drawTile(t) {
    const r = this.tileRect(t);
    const blocked = !t.free;
    const ctx = this.ctx;
    const isSelected = (this.selectedTile === t.id);

    // 3D DEPTH — alt gölge
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.beginPath();
    ctx.roundRect(r.x + 4, r.y + 6, r.w, r.h, 10);
    ctx.fill();
    ctx.restore();

    if (isSelected || t.glow > 0 || this.hintIds.has(t.id)) {
      ctx.shadowColor = this.types[t.type].color;
      ctx.shadowBlur = isSelected ? 24 : 18 * (t.glow || 1.5);
    } else ctx.shadowBlur = 0;

    this.drawTileFace(t.type, r.x, r.y, r.w, r.h, blocked ? 0.55 : 1, blocked, false, isSelected);
    ctx.shadowBlur = 0;

    if (blocked) {
      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      ctx.beginPath();
      ctx.roundRect(r.x, r.y, r.w, r.h, 10);
      ctx.fill();
    }
  }

  drawTileFace(type, x, y, w, h, alpha = 1, dim = false, lift = false, selected = false) {
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

    // TAŞ GÖVDESİ — PNG veya fallback
    const img = this.tileImages[meta.key];
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);
    ctx.clip();
    if (img) {
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
    }
    ctx.restore();

    // 3D KENAR EFEKTI — üst/sol aydınlık, alt/sağ karanlık
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);
    ctx.clip();
    const topLight = ctx.createLinearGradient(x, y, x, y + h * 0.25);
    topLight.addColorStop(0, 'rgba(255,255,255,0.18)');
    topLight.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = topLight;
    ctx.fillRect(x, y, w, h * 0.25);
    const bottomShade = ctx.createLinearGradient(x, y + h * 0.75, x, y + h);
    bottomShade.addColorStop(0, 'rgba(0,0,0,0)');
    bottomShade.addColorStop(1, 'rgba(0,0,0,0.25)');
    ctx.fillStyle = bottomShade;
    ctx.fillRect(x, y + h * 0.75, w, h * 0.25);
    const leftLight = ctx.createLinearGradient(x, y, x + w * 0.15, y);
    leftLight.addColorStop(0, 'rgba(255,255,255,0.10)');
    leftLight.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = leftLight;
    ctx.fillRect(x, y, w * 0.15, h);
    const rightShade = ctx.createLinearGradient(x + w * 0.85, y, x + w, y);
    rightShade.addColorStop(0, 'rgba(0,0,0,0)');
    rightShade.addColorStop(1, 'rgba(0,0,0,0.15)');
    ctx.fillStyle = rightShade;
    ctx.fillRect(x + w * 0.85, y, w * 0.15, h);
    ctx.restore();

    // BÜYÜK SEMBOL — ortada, anlaşılır, element renginde
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);
    ctx.clip();
    const symbolSize = Math.floor(w * 0.45);
    ctx.font = `${symbolSize}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = meta.color;
    ctx.shadowBlur = selected ? 16 : 8;
    ctx.fillStyle = meta.color;
    ctx.fillText(meta.emoji, x + w / 2, y + h / 2 + 1);
    ctx.shadowBlur = 0;
    ctx.restore();

    // ◆ MÜHÜR rozeti — sağ alt köşe
    ctx.save();
    const muhurSize = Math.floor(w * 0.18);
    ctx.font = `bold ${muhurSize}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,209,148,0.6)';
    ctx.fillText('◆', x + w - muhurSize, y + h - muhurSize * 0.5);
    ctx.restore();

    // Rim light
    ctx.strokeStyle = selected
      ? meta.color
      : (dim ? 'rgba(220,210,190,0.10)' : 'rgba(255,236,200,0.30)');
    ctx.lineWidth = selected ? 2.5 : 1.5;
    ctx.beginPath();
    ctx.roundRect(x + 0.75, y + 0.75, w - 1.5, h - 1.5, radius);
    ctx.stroke();

    // 3D ALT KALINLIK
    const baseH = Math.max(4, h * 0.08);
    const baseGrad = ctx.createLinearGradient(x, y + h - baseH, x, y + h);
    baseGrad.addColorStop(0, 'rgba(0,0,0,0.3)');
    baseGrad.addColorStop(1, 'rgba(0,0,0,0.5)');
    ctx.fillStyle = baseGrad;
    ctx.beginPath();
    ctx.roundRect(x + 1, y + h - baseH, w - 2, baseH, 3);
    ctx.fill();

    // Seçili titreşim
    if (selected) {
      ctx.save();
      ctx.strokeStyle = meta.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.4 + 0.3 * Math.sin(performance.now() / 150);
      ctx.beginPath();
      ctx.roundRect(x - 2, y - 2, w + 4, h + 4, radius + 2);
      ctx.stroke();
      ctx.restore();
    }

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
// Mahjong: no 4
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
