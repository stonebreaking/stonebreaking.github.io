// ============================================================
// STONEBREAKING · BATUPIA Studios · PATRON BT KUSURSUZ SENARYO
// Kurucu: Batuhan Taşkıran · İlk oyun / ilk marka · GitHub tek yedek
// Stonebreaker = taş kırıcı (element sahibi değil) · Kolye merkez
// 4 Ruh: Kor(Yan/Ateş) Baam(Ak/Su) Mand(Dur/Toprak) Zepy(Nefes Al/Hava)
// Akış: BATUPIA → Logo → Karakter → Ruh → 12 Bölüm → Evren Mührü → Sonsuz
// 1-3 Ateş | 4-6 Su | 7-9 Toprak | 10-12 Hava | Sonsuz = tüm semboller
// Kombo: Yan→Ak→Dur→Nefes Al · Tepsi YOK · Mahjong Solitaire
// Ekonomi: bölüm sonu İpucu+1 Karıştır+1 birikir · kartlar 3/6/9/12
// Sonsuz: zihin güçlendirme · Günün Mührü kilit sonrası · F1 yerel rekor
// Vizyon: anime/kart koleksiyonu · günde 10 dk · rahat uyu
// ============================================================
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

// v1.26 MÜHÜR — Ruh kimlikleri (sinematik + kolye hayvanları + tablet)
const SPIRITS = {
  kor: {
    id: 'kor', name: 'Kor', element: 'ates', title: 'Ateş Ruhu',
    gender: 'erkek', animal: 'Tilki', animal_en: 'Fox',
    sigil: '🔥', color: '#ff6b35', colorDeep: '#e63946',
    form: 'Alev beden · göğüste elmas mühür',
    kolye: '06_GRAFIK/kolye_muhur_resmi.png',
    tile: '06_GRAFIK/tas_sembol_ates_core.png',
    cinema: '06_GRAFIK/ruh_4lu_sinematik.png',
    quote: 'İlk kıvılcımı ben yakarım. Cesaretinle gel.',
    scene: '06_GRAFIK/sahne_ates_vadisi.png',
    portrait: '06_GRAFIK/kor_ates_ruhu.png',
    chapters: [1, 2, 3],
  },
  baam: {
    id: 'baam', name: 'Baam', element: 'su', title: 'Su Ruhu',
    gender: 'kadin', animal: 'Balina', animal_en: 'Whale',
    sigil: '💧', color: '#3fd4ff', colorDeep: '#1d8cf8',
    form: 'Okyanus ipek · trident mührü',
    kolye: '06_GRAFIK/kolye_muhur_resmi.png',
    tile: '06_GRAFIK/tas_sembol_su_core.png',
    cinema: '06_GRAFIK/ruh_4lu_sinematik.png',
    quote: 'Acele etme. Akışı dinle.',
    scene: '06_GRAFIK/sahne_derinlikler.png',
    portrait: '06_GRAFIK/baam_su_ruhu.png',
    chapters: [4, 5, 6],
  },
  mand: {
    id: 'mand', name: 'Mand', element: 'toprak', title: 'Toprak Ruhu',
    gender: 'erkek', animal: 'Panda', animal_en: 'Panda',
    sigil: '🌿', color: '#c9a227', colorDeep: '#2ecc71',
    form: 'Altın taş zırh · dağ/balta mührü',
    kolye: '06_GRAFIK/kolye_muhur_resmi.png',
    tile: '06_GRAFIK/tas_sembol_toprak_core.png',
    cinema: '06_GRAFIK/ruh_4lu_sinematik.png',
    quote: 'Sabır taşı kırar. Ben beklerim.',
    scene: '06_GRAFIK/sahne_kristal_magara.png',
    portrait: '06_GRAFIK/mand_toprak_ruhu_erkek.png',
    chapters: [7, 8, 9],
  },
  zepy: {
    id: 'zepy', name: 'Zepy', element: 'hava', title: 'Hava Ruhu',
    gender: 'kadin', animal: 'Tavşan', animal_en: 'Hare',
    sigil: '🌬', color: '#e8f4ff', colorDeep: '#a8d8ea',
    form: 'Rüzgâr kanat · bulut spiral mührü',
    kolye: '06_GRAFIK/kolye_muhur_resmi.png',
    tile: '06_GRAFIK/tas_sembol_hava_core.png',
    cinema: '06_GRAFIK/ruh_4lu_sinematik.png',
    quote: 'Hafif ol. Görünmeyeni gör.',
    scene: '06_GRAFIK/sahne_gokyuzu_tapinagi.png',
    portrait: '06_GRAFIK/zepy_hava_ruhu.png',
    chapters: [10, 11, 12],
  },
};
window.STONE_IDENTITY = {
  studio: 'BATUPIA Studios',
  game: 'STONEBREAKING',
  kolye: '06_GRAFIK/kolye_muhur_resmi.png',
  spiritsArt: '06_GRAFIK/ruh_4lu_sinematik.png',
  map: {
    kor:  { element: 'ates', animal: 'Tilki' },
    baam: { element: 'su', animal: 'Balina' },
    mand: { element: 'toprak', animal: 'Panda' },
    zepy: { element: 'hava', animal: 'Tavşan' },
  },
  rule: 'Stonebreaker taş kırar; ruh rehberlik eder; kolye mühürleri taşır; hayvan kolyede, tablet tahtada.',
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

// v9.27 WP VIDEO MODEL — Tepsili eşleşme
const TRAY_MAX = 4; // v9.31 WP VIDEO — 4 slot kolye
const COMBO_WINDOW_MS = 4000;

// v9.16 PATRON BT — Combo = element söylemleri (Yan / Ak / Dur / Nefes Al)
// Nefes Büyüsü kaldırıldı. Good/Great/Perfect YOK.
const SEAL_BREATHS = {
  // 1-2: Ateş — Yan
  yan: [
    { text: 'Yan',     sub: 'Kor: Kıvılcım düştü' },
    { text: 'Yan',     sub: 'Alev uyandı' },
    { text: 'Yan',     sub: 'Taş ısınıyor' },
  ],
  // 3-5: Su — Ak
  ak: [
    { text: 'Ak',      sub: 'Baam: Akışı tut' },
    { text: 'Ak',      sub: 'Dalga hizalandı' },
    { text: 'Ak',      sub: 'Ritim süzülüyor' },
  ],
  // 6-9: Toprak — Dur
  dur: [
    { text: 'Dur',     sub: 'Mand: Sabır taşı kırar' },
    { text: 'Dur',     sub: 'Zemin sağlam' },
    { text: 'Dur',     sub: 'Mühür oturdu' },
  ],
  // 10+: Hava — Nefes Al
  nefes: [
    { text: 'Nefes Al', sub: 'Zepy: Hafif ol' },
    { text: 'Nefes Al', sub: 'Dört ruh duydu' },
    { text: 'Nefes Al', sub: 'Evren seninle' },
  ],
};

function breathForCombo(n) {
  let pool = SEAL_BREATHS.yan;
  let color = '#e63946';
  let fx = 'yan';
  if (n >= 10) { pool = SEAL_BREATHS.nefes; color = '#f0f0f0'; fx = 'nefes'; }
  else if (n >= 6) { pool = SEAL_BREATHS.dur; color = '#2ecc71'; fx = 'dur'; }
  else if (n >= 3) { pool = SEAL_BREATHS.ak; color = '#1d8cf8'; fx = 'ak'; }
  const pick = pool[Math.floor(Math.random() * pool.length)];
  return { ...pick, color, fx };
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

    // v9.27 WP VIDEO: üst tepsi
    this.tray = []; // [{type, fromId}]
    this.selectedTile = null;
    this.boardTop = 100;
    this.trayH = 64;


    this.tiles = [];
    this.history = []; // geri al için
    this.particles = []; this.selectedTile = null; this.tray = []; this._failed = false; this.locked = false;
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
    // v9.28 MÜHÜRLÜ TAŞ SETİ — sembol yüzleri (okunabilir)
    this.elementSets = {
      ates: [
        { key: 'ates_core', color: '#e63946', emoji: '🔥', spirit: 'kor', img: '06_GRAFIK/tas_sembol_ates_core.png' },
        { key: 'ates_1',    color: '#ff6b35', emoji: '🔥', spirit: 'kor', img: '06_GRAFIK/tas_sembol_ates_core.png' },
        { key: 'ates_2',    color: '#ff8c1a', emoji: '🔥', spirit: 'kor', img: '06_GRAFIK/tas_sembol_ates_core.png' },
        { key: 'ates_3',    color: '#ff5722', emoji: '🔥', spirit: 'kor', img: '06_GRAFIK/tas_sembol_ates_core.png' },
        { key: 'ates_4',    color: '#ff6b35', emoji: '🔥', spirit: 'kor', img: '06_GRAFIK/tas_sembol_ates_core.png' },
        { key: 'ates_5',    color: '#ff8c1a', emoji: '🔥', spirit: 'kor', img: '06_GRAFIK/tas_sembol_ates_core.png' },
        { key: 'ates_6',    color: '#ffb300', emoji: '🔥', spirit: 'kor', img: '06_GRAFIK/tas_sembol_ates_core.png' },
        { key: 'ates_alev', color: '#ff5722', emoji: '🔥', spirit: 'kor', img: '06_GRAFIK/tas_sembol_ates_core.png' },
        { key: 'ates_volkan', color: '#e63946', emoji: '🔥', spirit: 'kor', img: '06_GRAFIK/tas_sembol_ates_core.png' },
      ],
      su: [
        { key: 'su_core', color: '#1d8cf8', emoji: '💧', spirit: 'baam', img: '06_GRAFIK/tas_sembol_su_core.png' },
        { key: 'su_1',    color: '#4ecdc4', emoji: '💧', spirit: 'baam', img: '06_GRAFIK/tas_sembol_su_core.png' },
        { key: 'su_2',    color: '#3fd4ff', emoji: '💧', spirit: 'baam', img: '06_GRAFIK/tas_sembol_su_core.png' },
        { key: 'su_3',    color: '#1d8cf8', emoji: '💧', spirit: 'baam', img: '06_GRAFIK/tas_sembol_su_core.png' },
        { key: 'su_4',    color: '#4ecdc4', emoji: '💧', spirit: 'baam', img: '06_GRAFIK/tas_sembol_su_core.png' },
        { key: 'su_5',    color: '#3fd4ff', emoji: '💧', spirit: 'baam', img: '06_GRAFIK/tas_sembol_su_core.png' },
        { key: 'su_6',    color: '#a8e6ff', emoji: '💧', spirit: 'baam', img: '06_GRAFIK/tas_sembol_su_core.png' },
        { key: 'su_damla', color: '#1d8cf8', emoji: '💧', spirit: 'baam', img: '06_GRAFIK/tas_sembol_su_core.png' },
        { key: 'su_buz',  color: '#4ecdc4', emoji: '💧', spirit: 'baam', img: '06_GRAFIK/tas_sembol_su_core.png' },
      ],
      toprak: [
        { key: 'toprak_core', color: '#2ecc71', emoji: '🌿', spirit: 'mand', img: '06_GRAFIK/tas_sembol_toprak_core.png' },
        { key: 'toprak_1',    color: '#50c878', emoji: '🌿', spirit: 'mand', img: '06_GRAFIK/tas_sembol_toprak_core.png' },
        { key: 'toprak_2',    color: '#7fdb6a', emoji: '🌿', spirit: 'mand', img: '06_GRAFIK/tas_sembol_toprak_core.png' },
        { key: 'toprak_3',    color: '#2ecc71', emoji: '🌿', spirit: 'mand', img: '06_GRAFIK/tas_sembol_toprak_core.png' },
        { key: 'toprak_4',    color: '#c4a35a', emoji: '🌿', spirit: 'mand', img: '06_GRAFIK/tas_sembol_toprak_core.png' },
        { key: 'toprak_5',    color: '#50c878', emoji: '🌿', spirit: 'mand', img: '06_GRAFIK/tas_sembol_toprak_core.png' },
        { key: 'toprak_6',    color: '#7fdb6a', emoji: '🌿', spirit: 'mand', img: '06_GRAFIK/tas_sembol_toprak_core.png' },
        { key: 'toprak_run',  color: '#2ecc71', emoji: '🌿', spirit: 'mand', img: '06_GRAFIK/tas_sembol_toprak_core.png' },
        { key: 'toprak_kristal', color: '#50c878', emoji: '🌿', spirit: 'mand', img: '06_GRAFIK/tas_sembol_toprak_core.png' },
      ],
      hava: [
        { key: 'hava_core', color: '#f0f0f0', emoji: '🌬', spirit: 'zepy', img: '06_GRAFIK/tas_sembol_hava_core.png' },
        { key: 'hava_1',    color: '#a8d8ea', emoji: '🌬', spirit: 'zepy', img: '06_GRAFIK/tas_sembol_hava_core.png' },
        { key: 'hava_2',    color: '#e8f4ff', emoji: '🌬', spirit: 'zepy', img: '06_GRAFIK/tas_sembol_hava_core.png' },
        { key: 'hava_3',    color: '#c5d5e0', emoji: '🌬', spirit: 'zepy', img: '06_GRAFIK/tas_sembol_hava_core.png' },
        { key: 'hava_4',    color: '#a8d8ea', emoji: '🌬', spirit: 'zepy', img: '06_GRAFIK/tas_sembol_hava_core.png' },
        { key: 'hava_5',    color: '#e8f4ff', emoji: '🌬', spirit: 'zepy', img: '06_GRAFIK/tas_sembol_hava_core.png' },
        { key: 'hava_6',    color: '#ffffff', emoji: '🌬', spirit: 'zepy', img: '06_GRAFIK/tas_sembol_hava_core.png' },
        { key: 'hava_ruzgar', color: '#a8d8ea', emoji: '🌬', spirit: 'zepy', img: '06_GRAFIK/tas_sembol_hava_core.png' },
        { key: 'hava_bulut', color: '#e8f4ff', emoji: '🌬', spirit: 'zepy', img: '06_GRAFIK/tas_sembol_hava_core.png' },
      ],
    };
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
    this.trayH = Math.max(72, Math.floor(this.viewW * 0.18));
    this.boardTop = this.trayH + 14;

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
    const cols = Math.max(1, (maxC - minC) + 1);
    const rows = Math.max(1, (maxR - minR) + 1);
    // v9.24 PATRON: Vita tarzı BÜYÜK okunabilir taş — dikey tablet (w/h ≈ 0.72)
    const tw = Math.floor((W - 16 - maxZ * 4) / (cols + 0.2));
    const th = Math.floor((H - 10 + maxZ * 5) / (rows * 0.55 + 0.5));
    let tileW = Math.max(48, Math.min(92, tw - 2));
    let tileH = Math.floor(tileW / 0.72);
    if (tileH > th - 2) {
      tileH = Math.max(56, th - 2);
      tileW = Math.floor(tileH * 0.72);
    }
    tileW = Math.max(44, tileW);
    tileH = Math.max(58, tileH);
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
    this.tray = []; // v1.30: Yeniden oyna / yeni bölüm — kolye tepsi sıfır
    this.history = [];
    this.particles = [];
    this.selectedTile = null;
    this._failed = false;
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
    // v1.5: Kolye modelinde karıştır kritik — 1. bölümden ver
    this.hintsLeft = 1 + Math.floor((L - 1) / 4) + (this.endless ? Math.floor((level - 12) / 3) : 0);
    this.undosLeft = 0; // geri al yok
    this.shufflesLeft = 1 + Math.floor((L - 1) / 5) + (this.endless ? Math.floor((level - 13) / 5) : 0);
    this.startedAt = performance.now();
    // v1.20: Tahta arka plan — karakter seçim anime tapınak (yoksa)
    if (!this.sceneImg) {
      this.setScene('06_GRAFIK/sinematik_01_ikili_tapinak.png'); // karakter seçim evreni
    }
    try {
      if (localStorage.getItem('sb_intro_toast') !== '1') {
        setTimeout(() => this.toast('Serbest taşı kolyeye al · aynı mühürler kırılır'), 700);
        localStorage.setItem('sb_intro_toast', '1');
      }
    } catch (_) {
      setTimeout(() => this.toast('Serbest taşı kolyeye al · aynı mühürler kırılır'), 700);
    }

    this.comboUntil = 0;

    const layout = this.buildLayout(level);
    // v9.27: Tepsili model — çift sayı hâlâ iyi (eşleşme için)
    while (layout.length % 2 !== 0) layout.pop();

    // v9.9: ELEMENT İZOLASYONU — hikâye bölümlerinde her level SADECE 1 elementin taşlarını kullanır
    const ELEM_ORDER = ['ates', 'su', 'toprak', 'hava'];
    const elementKey = ELEM_ORDER[(level - 1) % 4];
    // v9.12.0 · M-018 (Patron emri 04.08): SONSUZ MOD = TÜM ELEMENTLER bir arada
    this.currentElement = this.endless ? 'karma' : elementKey;
    // v9.11.0 · Bölüm 11 "Kara Taşlar": izolasyon BİLEREK bozulur (mühürlü 4 element karışık)
    // v9.12.0 · M-018 RAMPA — IQ mantığı: bölüm ilerledikçe tip havuzu açılır (B1=4 tip · B6+=9 tip)
    // M-014 ELITE mühür: Sonsuz Mod'da bonus tip olarak karışır (36+1=37 tip)
    let elementTypes;
    if (level === 11 && !this.endless) {
      elementTypes = this.karaSet;
    } else if (this.endless) {
      // v9.30 Sonsuz varyant: dalga arttıkça daha fazla rune tipi
      const wave = Math.max(1, level - 12);
      const all = [...this.elementSets.ates, ...this.elementSets.su, ...this.elementSets.toprak, ...this.elementSets.hava];
      const typeCount = Math.min(all.length, 12 + Math.floor(wave * 1.5));
      elementTypes = all.slice(0, typeCount);
      if (wave >= 4 && this.eliteTile) elementTypes = elementTypes.concat([this.eliteTile]);
    } else {
      const n = Math.min(this.elementSets[elementKey].length, 3 + Math.floor(level * 0.7));
      elementTypes = this.elementSets[elementKey].slice(0, Math.max(4, n));
    }
    this.types = elementTypes;

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
    // v9.27 WP VIDEO: serbest taş → tepsiye
    if (this.locked || this.inputLocked) return;
    // Tepsi dolu ve eşleşme yoksa tıklama yok
    if (this.tray.length >= TRAY_MAX) {
      this.toast('Kolye dolu · eşleştir veya mühürü aç');
      return;
    }
    const sorted = [...this.tiles].filter((t) => t.active).sort((a, b) => b.z - a.z || b.row - a.row);
    for (const t of sorted) {
      const r = this.tileRect(t);
      if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) {
        if (!t.free) {
          this.toast('🔒 Kilitli mühür — üstü veya iki yanı dolu');
          t.glow = 0.85;
          t.shake = 1;
          setTimeout(() => { if (t.active) { t.glow = 0; t.shake = 0; } }, 280);
          return;
        }
        this.pickToTray(t);
        return;
      }
    }
  }

  pickToTray(t) {
    if (!t || !t.active || !t.free) return;
    if (this.tray.length >= TRAY_MAX) {
      this.toast('Kolye dolu · eşleştir veya mühürü aç');
      this.failTray();
      return;
    }
    // Tahtadan kaldır, tepsiye ekle
    t.active = false;
    t.glow = 0;
    this.tray.push({ type: t.type, fromId: t.id });
    this.moves++;
    this.history.push({ kind: 'pick', tileId: t.id, type: t.type, traySnap: this.tray.map(x => ({...x})) });
    const r = this.tileRect(t);
    this.spawnShatter(r.x + r.w / 2, r.y + r.h / 2, this.types[t.type]?.color || '#ffd194');
    this.updateFree();
    this.resolveTrayMatches();
    this.emitAll();
    if (typeof this.onPick === 'function') this.onPick(t);
    // Tepsi doldu mu?
    if (this.tray.length >= TRAY_MAX) {
      // Son bir eşleşme denemesi resolveTrayMatches zaten yaptı
      if (this.tray.length >= TRAY_MAX) this.failTray();
    }
    this.ensureMoves();
    this.checkWin();
  }

  resolveTrayMatches() {
    // Aynı tipten 2+ varsa eşleştir (çift çift kaldır)
    let changed = true;
    while (changed) {
      changed = false;
      const counts = {};
      this.tray.forEach((s, i) => {
        counts[s.type] = counts[s.type] || [];
        counts[s.type].push(i);
      });
      for (const typeStr of Object.keys(counts)) {
        const idxs = counts[typeStr];
        if (idxs.length >= 2) {
          // Son iki aynı tipi kaldır
          const a = idxs[idxs.length - 1];
          const b = idxs[idxs.length - 2];
          const remove = [a, b].sort((x, y) => y - x);
          const meta = this.types[Number(typeStr)] || this.types[0];
          remove.forEach((ix) => this.tray.splice(ix, 1));
          this.onMatch(Number(typeStr));
          // Tepsi ortasından partikül
          const cx = this.viewW / 2;
          const cy = (this.trayH || 64) / 2;
          this.spawnShatter(cx, cy, meta.color || '#ffd194');
          changed = true;
          break;
        }
      }
    }
  }

  failTray() {
    if (this._failed) return;
    this._failed = true;
    this.toast('Kolye taşıyamadı · Mühürler taştı');
    this.locked = true;
    if (typeof this.onTrayFull === 'function') this.onTrayFull({ tray: this.tray.slice() });
  }

  // v9.16: Söylem görsel efektleri
  // v9.16: Söylem görsel efektleri — Yan / Ak / Dur / Nefes Al
  spawnComboFx(fx, color) {
    const W = this.viewW;
    const cx = W / 2;
    const cy = (this.trayH || 64) * 0.55;
    const n = fx === 'nefes' ? 10 : fx === 'ak' ? 8 : fx === 'dur' ? 6 : 7;
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i) / n + Math.random() * 0.4;
      let vx, vy, size;
      if (fx === 'yan') {
        vx = (Math.random() - 0.5) * 3.2;
        vy = -2.2 - Math.random() * 2.5;
        size = 2 + Math.random() * 2.5;
      } else if (fx === 'ak') {
        vx = (Math.random() - 0.5) * 4.5;
        vy = (Math.random() - 0.5) * 1.2;
        size = 1.5 + Math.random() * 2;
      } else if (fx === 'dur') {
        vx = (Math.random() - 0.5) * 1.5;
        vy = (Math.random() - 0.5) * 1.5;
        size = 2 + Math.random() * 2;
      } else {
        vx = Math.cos(a) * (1.2 + Math.random());
        vy = Math.sin(a) * (1.2 + Math.random());
        size = 1.8 + Math.random() * 2.2;
      }
      if (this.particles.length > 100) this.particles.splice(0, 20);
      this.particles.push({
        x: cx + (Math.random() - 0.5) * 20,
        y: cy + (Math.random() - 0.5) * 10,
        vx, vy, size,
        color: color,
        life: fx === 'nefes' ? 1.1 : 0.95,
      });
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
      life: breath.fx === 'nefes' ? 1.55 : 1.35,
      fx: breath.fx || 'yan',
      ring: breath.fx === 'nefes' ? 1 : 0,
    };
    this.spawnComboFx(breath.fx || 'yan', breath.color || meta.color);
    this.toast(`${breath.text} · x${this.combo}`);
    if (typeof this.onBreath === 'function') {
      this.onBreath({ ...breath, combo: this.combo, seals: this.seals, iq: this.iq });
    }
    if (typeof this.onMatchFx === 'function') this.onMatchFx({ type, combo: this.combo, iq: this.iq });
    this.emitAll();
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
      life: breath.fx === 'nefes' ? 1.55 : 1.35,
      fx: breath.fx || 'yan',
      ring: breath.fx === 'nefes' ? 1 : 0,
    };
    this.spawnComboFx(breath.fx || 'yan', breath.color || meta.color);
    this.toast(`${breath.text} · x${this.combo}`);
    if (typeof this.onBreath === 'function') {
      this.onBreath({ ...breath, combo: this.combo, seals: this.seals, iq: this.iq });
    }
  }

  spawnShatter(x, y, color) {
    if (this.particles.length > 90) this.particles.splice(0, 30);
    for (let i = 0; i < 14; i++) {
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
    // v9.29: tahta + kolye tepsisi boş olmalı
    const rem = this.tiles.filter((t) => t.active).length;
    const trayRem = (this.tray && this.tray.length) || 0;
    if (rem === 0 && trayRem === 0) {
      if (this._winScheduled) return;
      this._winScheduled = true;
      setTimeout(() => {
        this._winScheduled = false;
        if (this.tiles.some((t) => t.active) || (this.tray && this.tray.length)) return;
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
    // v9.33: Kolye stratejisi — 1) tepsindeki yüze uyan  2) tahtada çifti olan  3) herhangi serbest
    if (this.hintsLeft <= 0) { this.toast('İpucu yok · reklamla aç'); return false; }
    if ((this.tray && this.tray.length) >= TRAY_MAX) {
      this.toast('Kolye dolu — önce eşleştir');
      return false;
    }
    this.updateFree();
    const free = this.tiles.filter((t) => t.active && t.free);
    if (!free.length) { this.toast('Serbest taş yok'); return false; }

    const trayTypes = new Set((this.tray || []).map((s) => s.type));
    const freeByType = {};
    free.forEach((t) => { (freeByType[t.type] = freeByType[t.type] || []).push(t); });

    let best = null;
    // Öncelik 1: kolyede olan tipe uyan serbest taş
    for (const t of free) {
      if (trayTypes.has(t.type)) { best = t; break; }
    }
    // Öncelik 2: tahtada en az 2 serbest aynı tip
    if (!best) {
      let bestList = null;
      for (const list of Object.values(freeByType)) {
        if (list.length >= 2 && (!bestList || list.length > bestList.length)) bestList = list;
      }
      if (bestList) best = bestList[0];
    }
    // Öncelik 3: herhangi serbest
    if (!best) best = free[0];

    this.hintIds.add(best.id);
    best.glow = 3.2;
    this.hintsLeft--;
    if (typeof this.onPowerUse === 'function') this.onPowerUse('hint');
    this.emitAll();
    this.toast(trayTypes.has(best.type) ? '💡 Kolyeye uyan mühür' : '💡 Bu taşı kolyeye al');
    setTimeout(() => { if (best) best.glow = 0; this.hintIds.delete(best.id); }, 2800);
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
    if (typeof this.onPowerUse === 'function') this.onPowerUse('shuffle');
    this.updateFree();
    // Serbest taş yoksa bir kez daha karıştır
    if (!this.tiles.some((t) => t.active && t.free)) {
      const active = this.tiles.filter((t) => t.active);
      const types = active.map((t) => t.type);
      for (let i = types.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [types[i], types[j]] = [types[j], types[i]];
      }
      active.forEach((t, i) => { t.type = types[i]; });
      this.updateFree();
    }
    this.emitAll();
    this.toast('🔄 Taşlar yeniden mühürlendi');
    return true;
  }

  // v9.32: Tepsi model — hamle = serbest taş var ve kolyede yer var
  hasMoves() {
    if ((this.tray && this.tray.length) >= TRAY_MAX) return false;
    return this.tiles.some((t) => t.active && t.free);
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
        trayCount: (this.tray && this.tray.length) || 0,
        trayMax: typeof TRAY_MAX !== 'undefined' ? TRAY_MAX : 4,
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
    // v1.18 BT: fırça izi / trail — her kare tam sıfır
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.restore();
    // mantıksal boyuta dön
    ctx.setTransform(this.dpr || 1, 0, 0, this.dpr || 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.clearRect(0, 0, W + 2, H + 2);

    // Unified felt / scene
    if (this.sceneImg) {
      const iw = this.sceneImg.width, ih = this.sceneImg.height;
      const scale = Math.max(W / iw, H / ih);
      const sw = iw * scale, sh = ih * scale;
      ctx.drawImage(this.sceneImg, (W - sw) / 2, (H - sh) / 2, sw, sh);
      // v6.2: hafif karartma (koyu taşlar öne çıksın, dağınıklık yok)
      // v1.28 mühür masası — sahne görünür, taşlar önde
      ctx.fillStyle = 'rgba(6, 10, 18, 0.38)';
      ctx.fillRect(0, 0, W, H);
      // masa/taş alanı hafif vinyet
      const vg = ctx.createRadialGradient(W/2, H*0.55, W*0.15, W/2, H*0.5, W*0.75);
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, 'rgba(0,0,0,0.25)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);
    } else {
      const g = ctx.createRadialGradient(W / 2, H * 0.45, 30, W / 2, H * 0.5, H * 0.75);
      g.addColorStop(0, '#2a5a3e');
      g.addColorStop(1, '#0e2a1c');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }
    // (çizgi deseni kaldırıldı — temiz film zemini)

    // v9.27 WP VIDEO — üst tepsi çizimi
    this.drawTray();

    // ---- BOARD tiles ----
    const sorted = [...this.tiles].filter((t) => t.active).sort((a, b) => a.z - b.z || a.row - b.row || a.col - b.col);
    for (const t of sorted) this.drawTile(t);

    // v9.9: Mahjong — flying animasyon yok

    // particles — v1.18 hızlı oyunda birikmesin
    if (this.particles.length > 60) this.particles.splice(0, this.particles.length - 40);
    const decay = this.particles.length > 35 ? 0.05 : 0.032;
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.2; p.life -= decay;
      if (p.life <= 0) { this.particles.splice(i, 1); continue; }
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.shadowBlur = 0;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, p.size * p.life), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    // story combo overlay + element FX
    if (this.feedback) {
      this.feedback.life -= 0.014;
      if (this.feedback.life <= 0) this.feedback = null;
      else {
        ctx.save();
        const fy = this.boardTop + 28;
        const cx = W / 2;
        const alpha = Math.min(1, this.feedback.life * 1.5);
        ctx.globalAlpha = alpha;
        ctx.textAlign = 'center';
        // Nefes Al: genişleyen aura halkası
        if (this.feedback.fx === 'nefes' || this.feedback.ring) {
          const t = 1 - this.feedback.life;
          const radius = 18 + t * 42;
          ctx.strokeStyle = this.feedback.color;
          ctx.lineWidth = 2;
          ctx.globalAlpha = alpha * (1 - t);
          ctx.beginPath();
          ctx.arc(cx, fy - 4, radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = alpha;
        }
        // Dur: hafif gölge titreşimi
        const shake = this.feedback.fx === 'dur' ? (Math.random() - 0.5) * 2.2 : 0;
        ctx.font = `bold ${Math.max(16, Math.floor(W * 0.048))}px system-ui, sans-serif`;
        ctx.fillStyle = this.feedback.color;
        ctx.shadowColor = this.feedback.color;
        ctx.shadowBlur = this.feedback.fx === 'yan' ? 18 : 12;
        ctx.fillText(this.feedback.text, cx + shake, fy + shake);
        ctx.shadowBlur = 0;
        ctx.font = `600 ${Math.max(11, Math.floor(W * 0.028))}px system-ui, sans-serif`;
        ctx.fillStyle = 'rgba(255,240,210,0.9)';
        if (this.feedback.sub) ctx.fillText(this.feedback.sub, cx, fy + 18);
        ctx.font = `bold ${Math.max(12, Math.floor(W * 0.032))}px system-ui, sans-serif`;
        ctx.fillStyle = '#ffd194';
        ctx.fillText(`x${this.feedback.combo}`, cx, fy + 36);
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
    const W = this.viewW;
    const th = this.trayH || 64;
    // Bar arka plan
    ctx.save();
    const fill = (this.tray && this.tray.length) || 0;
    ctx.fillStyle = 'rgba(8,14,12,0.78)';
    ctx.beginPath();
    ctx.roundRect(8, 6, W - 16, th - 4, 12);
    ctx.fill();
    ctx.strokeStyle = fill >= TRAY_MAX - 1
      ? 'rgba(230,57,70,0.55)'
      : fill >= TRAY_MAX - 2
        ? 'rgba(255,179,0,0.45)'
        : 'rgba(255,209,148,0.22)';
    ctx.lineWidth = fill >= TRAY_MAX - 1 ? 2.2 : 1.5;
    ctx.stroke();
    // Slotlar
    const n = TRAY_MAX;
    const gap = 6;
    const slotW = Math.min(72, Math.floor((W - 28 - gap * (n - 1)) / n));
    const slotH = Math.min(th - 12, Math.floor(slotW / 0.75));
    const totalW = n * slotW + (n - 1) * gap;
    let x0 = (W - totalW) / 2;
    const y0 = 6 + (th - 4 - slotH) / 2;
    for (let i = 0; i < n; i++) {
      const x = x0 + i * (slotW + gap);
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.strokeStyle = 'rgba(255,209,148,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(x, y0, slotW, slotH, 8);
      ctx.fill();
      ctx.stroke();
      const item = this.tray[i];
      if (item) {
        this.drawTileFace(item.type, x, y0, slotW, slotH, 1, false, false, false);
      }
    }
    ctx.restore();
  }

  drawTile(t) {
    const r = this.tileRect(t);
    const blocked = !t.free;
    const ctx = this.ctx;
    const isSelected = (this.selectedTile === t.id);
    let ox = 0;
    if (t.shake) {
      ox = Math.sin(performance.now() / 30) * 3;
    }

    // 3D DEPTH — alt gölge
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.beginPath();
    ctx.roundRect(r.x + 4 + ox, r.y + 6, r.w, r.h, 10);
    ctx.fill();
    ctx.restore();

    if (isSelected || t.glow > 0 || this.hintIds.has(t.id)) {
      ctx.shadowColor = this.types[t.type].color;
      ctx.shadowBlur = isSelected ? 24 : 18 * (t.glow || 1.5);
    } else ctx.shadowBlur = 0;

    this.drawTileFace(t.type, r.x + ox, r.y, r.w, r.h, blocked ? 0.55 : 1, blocked, false, isSelected);
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
    ctx.globalAlpha = 1;

    if (blocked) {
      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      ctx.beginPath();
      ctx.roundRect(r.x + ox, r.y, r.w, r.h, 10);
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
      // v1.25: Kare tablet — sembol büyük, cover doldur (aynı taş tipi)
      const scale = Math.max(w / img.width, h / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = x + (w - dw) / 2;
      const dy = y + (h - dh) / 2;
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
    // v1.13: Ruh mührü — PNG yoksa büyük sigil; varsa köşe mühürü
    const sig = meta.emoji || meta.sigil || '◆';
    if (!img) {
      ctx.fillStyle = meta.color;
      ctx.font = `bold ${Math.floor(Math.min(w, h) * 0.42)}px system-ui,sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = meta.color;
      ctx.shadowBlur = 8;
      ctx.fillText(sig, x + w / 2, y + h / 2 + 1);
      ctx.shadowBlur = 0;
    }
    // v1.25: PNG tablet zaten büyük sembol — köşe emoji yok
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
    this.stopLoop();
    const loop = () => {
      this._raf = requestAnimationFrame(loop);
      try { this.draw(); } catch (_) {}
    };
    this._raf = requestAnimationFrame(loop);
  }

  stopLoop() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
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
