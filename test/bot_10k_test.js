// STONEBREAKING 10.000 BOT TESTİ — Gerçek oyun simülasyonu
// Her bot: taş seçer, tepsiye atar, eşleştirir, bölüm çözer
// Kontrol: zafer oranı, soft-lock, ortalama hamle, görsel dosya varlığı
const fs = require('fs');
const vm = require('vm');

function makeCtx() {
  const noop = () => {};
  const grad = { addColorStop: noop };
  return {
    clearRect: noop, beginPath: noop, moveTo: noop, lineTo: noop, stroke: noop,
    fill: noop, arc: noop, fillRect: noop, strokeRect: noop, save: noop, restore: noop,
    clip: noop, drawImage: noop, fillText: noop, roundRect: noop, closePath: noop,
    createLinearGradient: () => grad, createRadialGradient: () => grad, createPattern: () => ({}),
    setTransform: noop, translate: noop, scale: noop, rotate: noop,
    measureText: (t) => ({ width: String(t).length * 8 }),
  };
}

// Deterministik tohum
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const sandbox = {
  window: {},
  document: { createElement: () => ({ getContext: makeCtx, style: {}, addEventListener() {}, getBoundingClientRect: () => ({ left: 0, top: 0, width: 360, height: 640 }) }) },
  performance: { now: () => Date.now() },
  setTimeout, clearTimeout, setInterval, clearInterval,
  requestAnimationFrame: (fn) => setTimeout(fn, 16),
  cancelAnimationFrame: clearTimeout,
  Image: function () { const i = this; setTimeout(() => { if (i.onerror) i.onerror(); }, 1); },
  navigator: {},
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  Math: Object.create(Math),
  console,
};
sandbox.Math.random = mulberry32(20260805);
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

const src = fs.readFileSync('js/game.js', 'utf8');
vm.runInContext(src, sandbox);

const StonebreakingGame = sandbox.StonebreakingGame;
const TRAY_MAX = sandbox.TRAY_MAX || 4;

function makeGame() {
  const canvas = { getContext: makeCtx, parentElement: { clientWidth: 390, clientHeight: 640 }, addEventListener() {}, style: {} };
  const g = new StonebreakingGame(canvas);
  g.resize();
  return g;
}

// AKILLI BOT v2 — tepsi yönetimi kritik
function botPlay(g) {
  const free = g.tiles.filter((t) => t.active && t.free);
  if (!free.length) return null;

  const trayLen = g.tray ? g.tray.length : 0;
  const trayTypes = {};
  if (g.tray) g.tray.forEach((s) => { trayTypes[s.type] = (trayTypes[s.type] || 0) + 1; });

  // Tahtada tip dağılımı
  const freeByType = {};
  for (const t of free) (freeByType[t.type] = freeByType[t.type] || []).push(t);

  // KRİTİK: Tepsi 3 taş doluysa, 4. taş MUTLAKA tepsideki tiplerden olmalı
  if (trayLen >= TRAY_MAX - 1) {
    for (const t of free) {
      if (trayTypes[t.type]) return t; // Eşleşme garantili
    }
    // Tepsideki tiplerden serbest taş yok → shuffle gerekli
    return null;
  }

  // ÖNCELİK 1: Tepsideki tipleri tamamla (eşleşme garantili)
  if (trayLen > 0) {
    for (const t of free) {
      if (trayTypes[t.type]) return t;
    }
  }

  // ÖNCELİK 2: Tahtada en az 2 serbest aynı tip olan taş (gelecekte eşleşme)
  for (const [type, list] of Object.entries(freeByType)) {
    if (list.length >= 2) return list[0];
  }

  // ÖNCELİK 3: Herhangi bir serbest taş (son çare)
  return free[0];
}

// GÖRSEL DOSYA KONTROLÜ
console.log('\n📸 TAŞ GÖRSEL DOSYA KONTROLÜ:');
const allImgs = new Set();
const game = makeGame();
game.elementSets && Object.values(game.elementSets).flat().forEach(t => allImgs.add(t.img));
game.karaSet && game.karaSet.forEach(t => allImgs.add(t.img));
if (game.eliteTile) allImgs.add(game.eliteTile.img);

let imgOk = 0, imgFail = 0;
const eksikler = [];
for (const img of allImgs) {
  if (fs.existsSync(img)) { imgOk++; }
  else { imgFail++; eksikler.push(img); }
}
console.log(`  ✅ Mevcut: ${imgOk}/${allImgs.size}`);
if (imgFail > 0) {
  console.log(`  ❌ Eksik: ${imgFail} dosya`);
  eksikler.forEach(e => console.log(`     - ${e}`));
} else {
  console.log('  🎉 TÜM GÖRSELLER MEVCUT!');
}

// 10.000 BOT TESTİ
const HEDEF = 10000;
const startTime = Date.now();

console.log(`\n🤖 10.000 BOT SİMÜLASYONU BAŞLIYOR\n`);

let zaferler = 0, softLocks = 0, hatalar = 0;
let toplamHamle = 0, toplamIQ = 0, toplamSure = 0;
let rütbeler = { S: 0, A: 0, B: 0, C: 0 };
let bolumBasari = {};
let bolumSayisi = 0;

for (let bot = 1; bot <= HEDEF; bot++) {
  // Her bot rastgele bir bölüm oynar (1-50 arası)
  const lv = (bot % 50) + 1;
  if (!bolumBasari[lv]) bolumBasari[lv] = { zafer: 0, toplam: 0 };
  bolumBasari[lv].toplam++;
  
  try {
    const g = makeGame();
    g.newGame(lv);
    
    let iter = 0;
    const maxIter = 5000;
    
    while (iter < maxIter) {
      iter++;
      
      // Zafer kontrolü (setTimeout beklemeden)
      const rem = g.tiles.filter((t) => t.active).length;
      const trayRem = (g.tray && g.tray.length) || 0;
      if (rem === 0 && trayRem === 0) {
        zaferler++;
        toplamHamle += g.moves || 0;
        toplamIQ += g.iq || 0;
        const elapsed = Math.max(1, (performance.now() - g.startedAt) / 1000);
        toplamSure += elapsed;
        const rank = g.rankFor ? g.rankFor(g.iq, g.maxCombo) : 'B';
        rütbeler[rank] = (rütbeler[rank] || 0) + 1;
        bolumBasari[lv].zafer++;
        break;
      }
      
      // Taş kalmadı ama tepsi dolu → devam
      if (rem === 0) break;
      
      const trayLen = g.tray ? g.tray.length : 0;
      
      // Tepsi dolu mu?
      if (trayLen >= TRAY_MAX) {
        if (g.shufflesLeft > 0) {
          g.shuffle();
        } else {
          softLocks++;
          break;
        }
        continue;
      }
      
      // Bot taş seç
      const tile = botPlay(g);
      if (!tile) {
        if (g.shufflesLeft > 0) {
          g.shuffle();
        } else {
          softLocks++;
          break;
        }
        continue;
      }
      
      g.pickToTray(tile);
    }
    
  } catch (e) {
    hatalar++;
    if (hatalar <= 5) console.log(`  ❌ Bot ${bot} (B${lv}) hata: ${e.message}`);
  }
  
  // Progress
  if (bot % 1000 === 0) {
    const elapsed = (Date.now() - startTime) / 1000;
    const rate = bot / elapsed;
    const eta = (HEDEF - bot) / rate;
    console.log(`  🤖 ${bot.toLocaleString('tr-TR')}/${HEDEF.toLocaleString('tr-TR')} bot (${Math.round(bot/HEDEF*100)}%) — ${elapsed.toFixed(1)}s, ETA ${eta.toFixed(1)}s — Zafer: ${zaferler}`);
  }
}

const totalTime = (Date.now() - startTime) / 1000;

console.log(`\n${'='.repeat(60)}`);
console.log(`📊 10.000 BOT SİMÜLASYON SONUÇLARI`);
console.log(`${'='.repeat(60)}\n`);

console.log(`🤖 Toplam Bot: ${HEDEF.toLocaleString('tr-TR')}`);
console.log(`✅ Zafer: ${zaferler.toLocaleString('tr-TR')} (%${((zaferler / HEDEF) * 100).toFixed(1)})`);
console.log(`🔒 Soft-Lock: ${softLocks.toLocaleString('tr-TR')} (%${((softLocks / HEDEF) * 100).toFixed(1)})`);
console.log(`❌ Hata: ${hatalar}`);
console.log(`⏱️  Süre: ${totalTime.toFixed(1)}s (${Math.round(HEDEF / totalTime)} bot/s)\n`);

if (zaferler > 0) {
  console.log(`📈 ZAFER İSTATİSTİKLERİ:`);
  console.log(`   Ortalama Hamle: ${Math.round(toplamHamle / zaferler)}`);
  console.log(`   Ortalama IQ: ${(toplamIQ / zaferler).toFixed(1)}`);
  console.log(`   Ortalama Süre: ${(toplamSure / zaferler).toFixed(1)}s`);
  console.log(`   Rütbe dağılımı: S=${rütbeler.S} A=${rütbeler.A} B=${rütbeler.B} C=${rütbeler.C}\n`);
}

// Bölüm bazlı başarı
console.log(`📋 BÖLÜM BAZLI BAŞARI (ilk 20):`);
for (let lv = 1; lv <= 20; lv++) {
  const b = bolumBasari[lv];
  if (b) {
    const pct = b.toplam > 0 ? Math.round((b.zafer / b.toplam) * 100) : 0;
    const bar = '█'.repeat(Math.round(pct / 5)) + '░'.repeat(20 - Math.round(pct / 5));
    console.log(`   B${String(lv).padStart(2)}: ${bar} %${pct} (${b.zafer}/${b.toplam})`);
  }
}

console.log(`\n${'='.repeat(60)}`);

if (zaferler >= HEDEF * 0.95) {
  console.log(`\n🎉 MÜKEMMEL! %${((zaferler / HEDEF) * 100).toFixed(1)} zafer oranı — motor sağlam!\n`);
} else if (zaferler >= HEDEF * 0.80) {
  console.log(`\n✅ İYİ! %${((zaferler / HEDEF) * 100).toFixed(1)} zafer oranı — bazı bölümler zor.\n`);
} else {
  console.log(`\n⚠️  DİKKAT! %${((zaferler / HEDEF) * 100).toFixed(1)} zafer oranı — denge ayarı gerekebilir.\n`);
}

process.exit(0);
