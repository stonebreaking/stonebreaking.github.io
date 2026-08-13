// STONEBREAKING Derin Dağıtım Testi — newGame() ile tam kontrol
// 1000 bölüm: taş atama, element, tip sayısı, serbest çift, adil dağılım
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
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

const src = fs.readFileSync('js/game.js', 'utf8');
vm.runInContext(src, sandbox);

const StonebreakingGame = sandbox.StonebreakingGame;

function makeGame() {
  const canvas = { getContext: makeCtx, parentElement: { clientWidth: 390, clientHeight: 640 }, addEventListener() {}, style: {} };
  const g = new StonebreakingGame(canvas);
  g.resize();
  return g;
}

// Serbest çift bulucu
function freePairs(g) {
  const free = g.tiles.filter((t) => t.active && t.free);
  const byType = {};
  for (const t of free) (byType[t.type] = byType[t.type] || []).push(t);
  const pairs = [];
  for (const list of Object.values(byType)) if (list.length >= 2) pairs.push([list[0], list[1]]);
  return pairs;
}

const HEDEF = 1000;
const startTime = Date.now();

console.log(`\n🔥 STONEBREAKING ${HEDEF} BÖLÜM DERİN DAĞITIM TESTİ\n`);
console.log(`Kontrol: newGame() + taş atama + element + tip + serbest çift + adil dağılım\n`);

let pass = 0, fail = 0;
let hatalar = [];

const ELEM = ['ates', 'su', 'toprak', 'hava'];

for (let lv = 1; lv <= HEDEF; lv++) {
  try {
    const g = makeGame();
    g.newGame(lv);
    
    const n = g.tiles.length;
    
    // 1. Çift sayı
    const cift = n % 2 === 0;
    
    // 2. Tip sayısı (her tipten çift sayıda)
    const counts = {};
    g.tiles.forEach((t) => { counts[t.type] = (counts[t.type] || 0) + 1; });
    const adil = Object.values(counts).every((c) => c % 2 === 0);
    
    // 3. Element kontrolü
    const expectedElem = g.endless ? 'karma' : ELEM[Math.min(3, Math.floor((lv - 1) / 3))];
    const elemOk = g.currentElement === expectedElem;
    
    // 4. Serbest çift garantisi
    const serbestCift = freePairs(g).length > 0;
    
    // 5. Tip sayısı doğru mu
    let tipOk;
    if (g.endless) { tipOk = g.types.length >= 16; }
    else if (lv === 11) { tipOk = g.types.length === 4 && g.types.every((t) => t.key.startsWith('kara_')); }
    else { tipOk = g.types.length === 9; }
    
    // 6. Tüm taşlar geçerli tip aralığında
    const gecerliTip = Object.keys(counts).every((k) => {
      const idx = Number(k);
      return Number.isInteger(idx) && idx >= 0 && idx < g.types.length;
    });
    
    if (cift && adil && elemOk && serbestCift && tipOk && gecerliTip) {
      pass++;
    } else {
      fail++;
      hatalar.push({
        bolum: lv,
        tas: n,
        cift,
        adil,
        elemOk,
        serbestCift,
        tipOk,
        gecerliTip,
        element: g.currentElement,
        tipSayisi: g.types.length
      });
    }
    
    if (lv % 200 === 0) {
      const elapsed = (Date.now() - startTime) / 1000;
      console.log(`✅ ${lv}/${HEDEF} bölüm (${Math.round(lv/HEDEF*100)}%) — ${elapsed.toFixed(1)}s`);
    }
    
  } catch (e) {
    fail++;
    hatalar.push({ bolum: lv, hata: e.message });
    if (hatalar.length > 10) break;
  }
}

const totalTime = (Date.now() - startTime) / 1000;

console.log(`\n${'='.repeat(60)}`);
console.log(`📊 DERİN DAĞITIM SONUÇLARI`);
console.log(`${'='.repeat(60)}\n`);
console.log(`✅ Başarılı: ${pass}/${HEDEF}`);
console.log(`❌ Hatalı: ${fail}/${HEDEF}`);
console.log(`📈 Başarı Oranı: %${((pass / HEDEF) * 100).toFixed(2)}`);
console.log(`⏱️  Süre: ${totalTime.toFixed(1)} saniye\n`);

if (fail > 0) {
  console.log(`❌ HATALAR:`);
  hatalar.forEach(h => console.log(`   Bölüm ${h.bolum}:`, JSON.stringify(h)));
}

if (fail === 0) {
  console.log(`\n🎉 ${HEDEF} bölüm DERİN DAĞITIM %100 BAŞARILI!\n`);
}
process.exit(fail ? 1 : 0);
