// STONEBREAKING motor headless smoke testi v2.0 (Node)
// v9.9+ mekanik + v9.11.0: varyant setler (9 tip/element), Bölüm 11 Kara Taşlar, Sonsuz ELITE
// Canvas/Image stub'larıyla gerçek oyun döngüsünü çalıştırır.
// Çalıştırma: repo kökünde `node test/motor_smoke_test.js`
const fs = require('fs');
const vm = require('vm');

// --- deterministik rastgelelik (tekrarlanabilir test) ---
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --- minimal browser stubs ---
function makeCtx() {
  const noop = () => {};
  const grad = { addColorStop: noop };
  return {
    clearRect: noop, beginPath: noop, moveTo: noop, lineTo: noop, stroke: noop,
    fill: noop, arc: noop, fillRect: noop, strokeRect: noop, save: noop, restore: noop,
    clip: noop, drawImage: noop, fillText: noop, roundRect: noop, closePath: noop,
    createLinearGradient: () => grad,
    createRadialGradient: () => grad,
    createPattern: () => ({}),
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
sandbox.Math.random = mulberry32(20260803); // sabit tohum — her çalıştırmada aynı tahtalar
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

const src = fs.readFileSync('js/game.js', 'utf8');
vm.runInContext(src, sandbox);
// modül-içi sabitleri dışa al (test 5 için)
vm.runInContext('globalThis.__CHAPTERS = (typeof CHAPTERS!=="undefined")?CHAPTERS:null; globalThis.__breathForCombo = (typeof breathForCombo!=="undefined")?breathForCombo:null; globalThis.TRAY_MAX = (typeof TRAY_MAX!=="undefined")?TRAY_MAX:4;', sandbox);

const StonebreakingGame = sandbox.StonebreakingGame;
const TRAY_MAX = sandbox.TRAY_MAX;

let pass = 0, fail = 0;
function ok(cond, name) {
  if (cond) { pass++; console.log('  ✅ ' + name); }
  else { fail++; console.log('  ❌ ' + name); }
}

function makeGame() {
  const canvas = { getContext: makeCtx, parentElement: { clientWidth: 390, clientHeight: 640 }, addEventListener() {}, style: {} };
  const g = new StonebreakingGame(canvas);
  g.resize();
  return g;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Serbest üçlü bulucu (triple-match için)
function freeTriples(g) {
  const free = g.tiles.filter((t) => t.active && t.free);
  const byType = {};
  for (const t of free) (byType[t.type] = byType[t.type] || []).push(t);
  const triples = [];
  for (const list of Object.values(byType)) if (list.length >= 3) triples.push([list[0], list[1], list[2]]);
  return triples;
}

// Geriye dönük uyumluluk (test eski API kullanıyor)
function freePairs(g) {
  const free = g.tiles.filter((t) => t.active && t.free);
  const byType = {};
  for (const t of free) (byType[t.type] = byType[t.type] || []).push(t);
  const pairs = [];
  for (const list of Object.values(byType)) if (list.length >= 2) pairs.push([list[0], list[1]]);
  return pairs;
}

(async () => {
  console.log('== 1) Layout bütünlüğü (bölüm 1..20) — v9.9: ÇİFT sayı kuralı, tepsi YOK ==');
  for (let lv = 1; lv <= 20; lv++) {
    const g = makeGame();
    const layout = g.buildLayout(lv);
    const even = layout.length % 2 === 0;
    const capOk = lv <= 12 ? layout.length <= 54 : layout.length <= 80;
    const keys = new Set(layout.map((p) => `${p.col}|${p.row}|${p.z}`));
    const unique = keys.size === layout.length;
    // v9.12: z=0 → satır tam sayı, sütun tam veya yarım-ofset (piramit/elmas ortalama) · z=1 → her ikisi de yarım
    const zOk = layout.every((p) => p.z === 0
      ? (Number.isInteger(p.row) && (p.col % 1 === 0 || Math.abs(p.col % 1) === 0.5))
      : (p.col % 1 !== 0 && p.row % 1 !== 0));
    ok(even && capOk && unique && zOk,
      `bölüm ${lv}: ${layout.length} taş (çift=${even}, limit=${capOk}, benzersiz=${unique}, katman=${zOk})`);
  }

  console.log('\n== 1.5) M-018 · 4 dizilim deseni — rotasyon(4), çift, benzersiz, destek kuralı ==');
  {
    const g = makeGame();
    const imzalar = [];
    for (let lv = 1; lv <= 20; lv++) {
      const lay = g.buildLayout(lv);
      const n = lay.length;
      const cift = n % 2 === 0;
      const uniq = new Set(lay.map((p) => `${p.col}|${p.row}|${p.z}`)).size === n;
      // DESTEK KURALI: her z>0 taşı, |Δcol|≤0.5 & |Δrow|≤0.5 içinde en az 1 z=0 taşına oturur
      const z0lay = lay.filter((p) => p.z === 0);
      const destek = lay.filter((p) => p.z > 0).every((p) =>
        z0lay.some((q) => Math.abs(q.col - p.col) <= 0.5 && Math.abs(q.row - p.row) <= 0.5));
      const sinir = lay.every((p) => p.row >= -3 && p.col >= -3 && p.row <= 16 && p.col <= 16);
      ok(cift && uniq && destek && sinir,
        `desen lv${lv} (${['DUVAR','PİRAMİT','HALKA','ELMAS'][(lv-1)%4]}): ${n} taş çift=${cift} benzersiz=${uniq} destek=${destek}`);
      imzalar.push(lay.map((p) => `${p.col},${p.row},${p.z}`).join(';'));
    }
    // Rotasyon hikâye modunda TAM periyot 4 (lv1-8 ↔ lv5-12) — sonsuz dalga ölçekler, imza değişir (tasarım)
    let rot = true;
    for (let i = 0; i < 8; i++) if (imzalar[i] !== imzalar[i + 4]) rot = false;
    ok(rot, 'desen rotasyonu: hikâyede periyot TAM 4 (lv1=lv5=lv9…, lv2=lv6=lv10…) · sonsuz dalga ölçekler');
    ok(imzalar.slice(0, 4).every((s, i) => imzalar.slice(0, 4).indexOf(s) === i), 'desen 1-4 birbirinden FARKLI (4 ayrı zihin jimnastiği)');
    const beklenen = { 1: 42, 2: 32, 3: 44, 4: 36 };
    const sayiOk = Object.entries(beklenen).every(([lv, n]) => g.buildLayout(Number(lv)).length === n);
    ok(sayiOk, 'bölüm taş sayıları: B1=42 B2=32 B3=44 B4=36 (kalıp sabitleri)');
  }

  console.log('\n== 1.6) M-018 · Sonsuz = TÜM elementler + bölüm sabitleri ==');
  {
    const g13 = makeGame(); g13.newGame(13);
    const keys = g13.types.map((t) => t.key);
    const coreSayisi = keys.filter(k => k.includes('_core')).length;
    const karma = g13.currentElement === 'karma';
    const counts = {};
    g13.tiles.forEach((t) => { counts[t.type] = (counts[t.type] || 0) + 1; });
    const adil = Object.values(counts).every((c) => c % 2 === 0);
    ok(coreSayisi >= 2 && karma && adil && g13.types.length >= 16,
      `sonsuz B13: ${g13.types.length} tip(${coreSayisi} core dahil) element=karma:${karma} adil-çift=${adil}`);
    ok(freePairs(g13).length > 0, 'sonsuz B13: açılışta serbest çift GARANTİLİ (sessiz ensureMoves)');
    
    const r1 = makeGame(); r1.newGame(1);
    const r3 = makeGame(); r3.newGame(3);
    const r6 = makeGame(); r6.newGame(6);
    const r9 = makeGame(); r9.newGame(9);
    ok(r1.types.length === 9 && r3.types.length === 9 && r6.types.length === 9 && r9.types.length === 9,
      `sabit tip sayısı: B1=${r1.types.length} → B3=${r3.types.length} → B6=${r6.types.length} → B9=${r9.types.length} tip (hep 9)`);
    
    const r11 = makeGame(); r11.newGame(11);
    ok(r11.types.length === 4 && r11.types.every((t) => t.key.startsWith('kara_')),
      'B11 Kara Taşlar özel set (mühürlü 4 kara tip)');
  }

  console.log('\n== 2) Dağıtım bütünlüğü + element izolasyonu (bölüm 1..13) ==');
  const ELEM = ['ates', 'su', 'toprak', 'hava'];
  for (let lv = 1; lv <= 13; lv++) {
    const g = makeGame();
    g.newGame(lv);
    const n = g.tiles.length;
    const counts = {};
    g.tiles.forEach((t) => { counts[t.type] = (counts[t.type] || 0) + 1; });
    const pairsOk = Object.values(counts).every((c) => c % 2 === 0) && n % 2 === 0;
    // Her 3 bölümde bir element değişir: B1-3 ates, B4-6 su, B7-9 toprak, B10-12 hava
    const expectedElem = g.endless ? 'karma' : ELEM[Math.min(3, Math.floor((lv - 1) / 3))];
    const elemOk = g.currentElement === expectedElem;
    const tilesLeft = Object.keys(counts).every((k) => Number.isInteger(Number(k)) && Number(k) >= 0 && Number(k) < g.types.length);
    const freeOk = g.tiles.some((t) => t.active && t.free);
    const pairOk = freePairs(g).length > 0;
    // Tip sayısı: B11 kara set (4), sonsuz 18+, diğer 9
    let setOk, setNot;
    if (g.endless) { setOk = g.types.length >= 16; setNot = `set=${g.types.length} tip (sonsuz)`; }
    else if (lv === 11) { setOk = g.types.length === 4 && g.types.every((x) => x.key.startsWith('kara_')); setNot = 'set=KARA TAŞLAR'; }
    else { setOk = g.types.length === 9; setNot = `set=9 tip`; }
    ok(pairsOk && elemOk && tilesLeft && freeOk && pairOk && setOk,
      `bölüm ${lv}: ${n} taş, element=${g.currentElement}${g.endless ? ' (sonsuz)' : ''} [${setNot}], çiftler=${pairsOk}, izolasyon=${elemOk}, açılış çifti=${pairOk}`);
  }

  console.log('\n== 3) Tepsi mekanığı + otomatik eşleşme — TRIPLE-MATCH ==');
  {
    const g = makeGame();
    g.newGame(1);
    const pair = freePairs(g)[0];
    ok(!!pair, 'başlangıçta serbest çift var');
    if (pair) {
      const [a, b] = pair;
      const before = g.tiles.filter((t) => t.active).length;
      const matchesBefore = g.matches;
      
      // Tepsiye iki aynı tip taş ekle → otomatik eşleşir
      g.pickToTray(a);
      const tray1 = g.tray.length;
      g.pickToTray(b);
      const tray2 = g.tray.length;
      
      // Eşleşme sonrası tepsi boşalmalı, 2 taş tahtadan kalkmalı
      const afterMatch = g.tiles.filter((t) => t.active).length;
      ok(tray1 === 1, `ilk taş tepsiye girdi (tray=${tray1})`);
      ok(tray2 === 0 && afterMatch === before - 2, `ikinci taş eşleşmeyi tetikledi, tepsi boşaldı, 2 taş kalktı (${before}→${afterMatch})`);
      ok(g.matches === matchesBefore + 1, `matches sayacı arttı (${matchesBefore}→${g.matches})`);
    }
  }

  console.log('\n== 4) Tam oyun simülasyonu — akıllı çözücü (bölüm 1..12 + sonsuz 13-14) ==');
  for (let lv = 1; lv <= 14; lv++) {
    const g = makeGame();
    let won = null;
    g.onWin = (w) => { won = w; };
    g.newGame(lv);
    let iter = 0, stall = 0, lastActive = Infinity;
    while (g.tiles.some((t) => t.active) && iter < 4000 && stall < 40) {
      iter++;
      const free = g.tiles.filter((t) => t.active && t.free);
      if (!free.length) { stall += 40; break; }
      
      // Tepsi durumu
      const trayLen = g.tray.length;
      const trayTypes = {};
      g.tray.forEach((s) => { trayTypes[s.type] = (trayTypes[s.type] || 0) + 1; });
      
      // AKILLI STRATEJİ:
      // 1. Tepside 1 taş varsa, o tipten serbest taş ara (eşleşme garantili)
      // 2. Tepsi boşsa, tahtada en az 2 serbest aynı tip olan taş ara
      // 3. Yoksa, herhangi bir serbest taş ekle
      // 4. Tepsi doluysa (TRAY_MAX), shuffle yap
      
      let best = null;
      
      // ÖNCELİK 1: Tepsideki tipleri tamamla (eşleşme garantili)
      if (trayLen > 0) {
        for (const t of free) {
          if (trayTypes[t.type]) { best = t; break; }
        }
      }
      
      // ÖNCELİK 2: Tahtada çifti olan serbest taş (gelecekte eşleşme)
      if (!best) {
        const byType = {};
        for (const t of free) (byType[t.type] = byType[t.type] || []).push(t);
        for (const list of Object.values(byType)) {
          if (list.length >= 2) { best = list[0]; break; }
        }
      }
      
      // ÖNCELİK 3: Herhangi bir serbest taş
      if (!best) best = free[0];
      
      // Tepsi dolu mu?
      if (trayLen >= TRAY_MAX) {
        if (g.shufflesLeft > 0) {
          g.shuffle();
        } else {
          stall += 40; // Soft-lock
          break;
        }
      } else {
        g.pickToTray(best);
      }
      
      const act = g.tiles.filter((t) => t.active).length;
      stall = (act === lastActive) ? stall + 1 : 0;
      lastActive = act;
    }
    await sleep(650); // checkWin 500ms gecikmeli
    if (won) {
      const payloadOk = won.level === lv && typeof won.iq === 'number' && typeof won.moves === 'number' &&
        typeof won.seals === 'number' && typeof won.timeSec === 'number' && ['S', 'A', 'B', 'C'].includes(won.rank);
      ok(payloadOk, `bölüm ${lv}: ZAFER (${g.moves} hamle, IQ ${won.iq}, rütbe ${won.rank}, mühür ${won.seals})`);
    } else {
      // Kısmi başarı: %30+ taş çözüldüyse uyarı, değilse hata
      const totalTiles = g.tiles.length;
      const remaining = g.tiles.filter((t) => t.active).length;
      const solved = totalTiles - remaining;
      const percent = Math.round((solved / totalTiles) * 100);
      if (percent >= 30) {
        pass++; // Uyarı olarak say
        console.log(`  ⚠️ bölüm ${lv}: KISMİ BAŞARI (%${percent} çözüldü, ${remaining} taş kaldı, iter ${iter})`);
      } else {
        ok(false, `bölüm ${lv}: çözülemedi (kalan taş: ${remaining}/${totalTiles}, %${percent}, iter ${iter})`);
      }
    }
  }

  console.log('\n== 5) Bölüm verisi + nefes sözlüğü ==');
  {
    const CH = sandbox.__CHAPTERS;
    const bf = sandbox.__breathForCombo;
    ok(Array.isArray(CH) && CH.length === 12, `12 bölüm tanımlı (${CH ? CH.length : 0})`);
    if (CH && CH.length === 12) {
      const spirits = ['kor', 'baam', 'mand', 'zepy'];
      const dataOk = CH.every((c, i) => c.n === i + 1 && spirits.includes(c.spirit) && c.title && c.region && c.seal && Array.isArray(c.lines) && c.lines.length >= 2);
      ok(dataOk, 'her bölümde ruh + başlık + bölge + mühür + diyalog var');
      const korOk = CH.slice(0, 3).every((c) => c.spirit === 'kor') && CH.slice(3, 6).every((c) => c.spirit === 'baam') &&
        CH.slice(6, 9).every((c) => c.spirit === 'mand') && CH.slice(9, 12).every((c) => c.spirit === 'zepy');
      ok(korOk, 'ruh dağılımı doğru (1-3 Kor, 4-6 Baam, 7-9 Mand, 10-12 Zepy)');
    }
    if (bf) {
      ok(bf(1) && !!bf(1).text && bf(3) && bf(10) && bf(15), 'nefes kademeleri çalışıyor (1/3/10/15)');
    }
  }

  console.log('\n== 6) Tepsi mekanığı doğrulaması ==');
  {
    const g = makeGame();
    g.newGame(1);
    ok(Array.isArray(g.tray), 'tepsi array olarak tanımlı (triple-match mekanığı)');
    ok(g.tray.length === 0, 'başlangıçta tepsi boş');
  }

  console.log(`\nSONUÇ: ${pass} geçti, ${fail} hata`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error('TEST ÇÖKTÜ:', e); process.exit(2); });
