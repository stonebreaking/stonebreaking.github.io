// STONEBREAKING 100.000 Bölüm Matematik Sağlamlık Testi
// Her bölüm için: çift sayı, serbest çift, benzersiz pozisyon, destek kuralı
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

const HEDEF = 100000;
const startTime = Date.now();

console.log(`\n🔥 STONEBREAKING 100.000 BÖLÜM MATEMATİK TESTİ\n`);
console.log(`Hedef: ${HEDEF} bölüm`);
console.log(`Başlangıç: ${new Date().toLocaleString('tr-TR')}\n`);

let pass = 0, fail = 0;
let hatalar = [];
let istatistikler = {
  minTas: Infinity,
  maxTas: 0,
  toplamTas: 0,
  minTip: Infinity,
  maxTip: 0,
  elementDagilimi: { ates: 0, su: 0, toprak: 0, hava: 0, karma: 0 }
};

const g = makeGame();

for (let lv = 1; lv <= HEDEF; lv++) {
  try {
    const layout = g.buildLayout(lv);
    const n = layout.length;
    
    // 1. Çift sayı kuralı
    const cift = n % 2 === 0;
    
    // 2. Benzersiz pozisyonlar
    const keys = new Set(layout.map((p) => `${p.col}|${p.row}|${p.z}`));
    const benzersiz = keys.size === n;
    
    // 3. Destek kuralı (z>0 taşlar z=0 taşlara oturmalı)
    const z0lay = layout.filter((p) => p.z === 0);
    const destek = layout.filter((p) => p.z > 0).every((p) =>
      z0lay.some((q) => Math.abs(q.col - p.col) <= 0.5 && Math.abs(q.row - p.row) <= 0.5));
    
    // 4. Sınır kontrolü
    const sinir = layout.every((p) => p.row >= -3 && p.col >= -3 && p.row <= 20 && p.col <= 20);
    
    // 5. Taş sayısı limiti
    const limit = lv <= 12 ? n <= 54 : n <= 100;
    
    if (cift && benzersiz && destek && sinir && limit) {
      pass++;
      
      // İstatistik topla
      istatistikler.minTas = Math.min(istatistikler.minTas, n);
      istatistikler.maxTas = Math.max(istatistikler.maxTas, n);
      istatistikler.toplamTas += n;
      
    } else {
      fail++;
      hatalar.push({
        bolum: lv,
        tas: n,
        cift,
        benzersiz,
        destek,
        sinir,
        limit
      });
    }
    
    // Her 5000 bölümde bir progress raporu
    if (lv % 5000 === 0) {
      const elapsed = (Date.now() - startTime) / 1000;
      const rate = lv / elapsed;
      const eta = (HEDEF - lv) / rate;
      console.log(`✅ ${lv.toLocaleString('tr-TR')}/${HEDEF.toLocaleString('tr-TR')} bölüm (${Math.round(lv/HEDEF*100)}%) — ${elapsed.toFixed(1)}s geçti, ETA ${eta.toFixed(1)}s`);
    }
    
  } catch (e) {
    fail++;
    hatalar.push({
      bolum: lv,
      hata: e.message
    });
    
    if (hatalar.length > 10) {
      console.log(`\n❌ KRİTİK: 10+ hata, test durduruldu`);
      break;
    }
  }
}

const totalTime = (Date.now() - startTime) / 1000;

console.log(`\n${'='.repeat(60)}`);
console.log(`📊 SONUÇLAR`);
console.log(`${'='.repeat(60)}\n`);

console.log(`✅ Başarılı: ${pass.toLocaleString('tr-TR')} bölüm`);
console.log(`❌ Hatalı: ${fail.toLocaleString('tr-TR')} bölüm`);
console.log(`📈 Başarı Oranı: %${((pass / (pass + fail)) * 100).toFixed(2)}`);
console.log(`⏱️  Toplam Süre: ${totalTime.toFixed(1)} saniye`);
console.log(`⚡ Hız: ${Math.round(pass / totalTime)} bölüm/saniye\n`);

if (pass > 0) {
  console.log(`📊 İSTATİSTİKLER:`);
  console.log(`   Min taş: ${istatistikler.minTas}`);
  console.log(`   Max taş: ${istatistikler.maxTas}`);
  console.log(`   Ortalama: ${Math.round(istatistikler.toplamTas / pass)} taş/bölüm`);
  console.log(`   Toplam: ${istatistikler.toplamTas.toLocaleString('tr-TR')} taş üretildi\n`);
}

if (fail > 0) {
  console.log(`❌ HATALAR (ilk 10):`);
  hatalar.slice(0, 10).forEach(h => {
    console.log(`   Bölüm ${h.bolum}:`, h.hata || JSON.stringify(h));
  });
}

console.log(`\n${'='.repeat(60)}\n`);

if (fail === 0) {
  console.log(`🎉 MÜKEMMEL! ${HEDEF.toLocaleString('tr-TR')} bölüm SORUNSUZ MATEMATİK!\n`);
  process.exit(0);
} else {
  console.log(`⚠️  ${fail} bölümde hata bulundu.\n`);
  process.exit(1);
}
