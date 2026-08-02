// STONEBREAKING motor headless smoke testi (Node)
// Canvas/Image stub'larıyla gerçek oyun döngüsünü çalıştırır.
const fs = require('fs');
const vm = require('vm');

// --- minimal browser stubs ---
function makeCtx() {
  const noop = () => {};
  const grad = { addColorStop: noop };
  const ctx = {
    clearRect: noop, beginPath: noop, moveTo: noop, lineTo: noop, stroke: noop,
    fill: noop, arc: noop, fillRect: noop, strokeRect: noop, save: noop, restore: noop,
    clip: noop, drawImage: noop, fillText: noop, roundRect: noop,
    createLinearGradient: () => grad,
    createRadialGradient: () => grad,
    setTransform: noop, translate: noop,
    measureText: (t) => ({ width: String(t).length * 8 }),
  };
  return ctx;
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
  console,
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

const src = fs.readFileSync('js/game.js', 'utf8');
vm.runInContext(src, sandbox);

const StonebreakingGame = sandbox.StonebreakingGame;

let pass = 0, fail = 0;
function ok(cond, name) {
  if (cond) { pass++; console.log('  ✅ ' + name); }
  else { fail++; console.log('  ❌ ' + name); }
}

function makeGame() {
  const canvas = { getContext: makeCtx, parentElement: { clientWidth: 390, clientHeight: 640 }, addEventListener() {}, style: {} };
  const g = new StonebreakingGame(canvas);
  g.resize(); // tarayıcı akışı: önce resize
  return g;
}

(async () => {
  console.log('== 1) Layout bütünlüğü (bölüm 1..20) ==');
  for (let lv = 1; lv <= 20; lv++) {
    const g = makeGame();
    const layout = g.buildLayout(lv);
    const div3 = layout.length % 3 === 0;
    const inRange = layout.length >= (lv > 12 ? 36 : 30) && layout.length <= (lv > 12 ? 72 : 54);
    ok(div3 && inRange, `bölüm ${lv}: ${layout.length} taş (3'ün katı=${div3}, aralık=${inRange})`);
  }

  console.log('== 2) Tam oyun simülasyonu (bölüm 1) ==');
  const g = makeGame();
  let wins = 0, breaths = 0, picks = 0, fails = 0;
  g.onWin = () => wins++;
  g.onBreath = () => breaths++;
  g.onPick = () => picks++;
  g.onFail = () => fails++;
  await g.preload();
  g.newGame(1);
  ok(g.tiles.length % 3 === 0, `tahta ${g.tiles.length} taş (3'ün katı)`);
  ok(g.tiles.some((t) => t.active && t.free), 'serbest taş var');

  let guard = 0;
  while (g.tiles.some((t) => t.active) && guard < 5000) {
    guard++;
    const free = g.tiles.filter((t) => t.active && t.free);
    if (!free.length) break;
    if (g.tray.length >= 5 && !g.tray.some((s, i) => g.tray.filter((x) => x.type === s.type).length >= 3)) {
      // Tepsi dolu ve eşleşme yok — soft-lock önleme tetiklenir
      if (g.shufflesLeft > 0) { g.shuffle(); continue; }
      else break;
    }
    // Smart solver — yığın bazlı eşleştirme:
    // 1. Tepsideki tiplerden birinin serbest taşını bul
    const trayTypes = g.tray.map(s => s.type);
    // 2. Tepside 2 aynı tip varsa → 3. serbest taşı bul (hemen eşleşme!)
    const trayCounts = {};
    g.tray.forEach(s => trayCounts[s.type] = (trayCounts[s.type] || 0) + 1);
    let t = null;
    // Öncelik: tepside 2 aynı tip → 3. serbest taşı bul
    for (const [typeStr, count] of Object.entries(trayCounts)) {
      if (count >= 2) {
        t = free.find(x => x.type === Number(typeStr));
        if (t) break;
      }
    }
    // Sonra: tepside 1 aynı tip → 2. serbest taşı bul
    if (!t) {
      t = free.find(x => trayTypes.includes(x.type));
    }
    // Sonra: en çok serbest olan tipi seç
    if (!t) {
      const counts = {};
      free.forEach(x => counts[x.type] = (counts[x.type] || 0) + 1);
      let bestType = null, maxC = -1;
      for (const [typeStr, count] of Object.entries(counts)) {
        if (count > maxC) { maxC = count; bestType = typeStr; }
      }
      t = free.find(x => x.type === Number(bestType));
    }
    if (!t) t = free[0];
    g.handleClick(g.tileRect(t).x + g.tileW / 2, g.tileRect(t).y + g.tileH / 2);
    let safety = 0;
    while (g.flying.length && safety < 300) { g.draw(); safety++; }
    // v6.1: tepsi soft-lock olursa motor taşları otomatik geri döndürür
    if (g.locked) break;
  }
  await new Promise((r) => setTimeout(r, 700));
  ok(wins >= 1 || g.tiles.filter(t => t.active).length === 0, `zafer tetiklendi veya tahta bitti (wins=${wins})`);
  ok(breaths > 0, `nefes sayısı > 0 (${breaths})`);
  ok(picks > 0, `taş seçimleri oldu (picks=${picks})`);
  ok(g.tray.length === 0 || g.locked, `finalde tepsi boş veya kilitli (tray=${g.tray.length})`);
  ok(g.iq > 40, `IQ arttı (${g.iq})`);
  ok(g.maxCombo > 0, `maks kombo > 0 (${g.maxCombo})`);

  console.log('== 3) Sonsuz mod (bölüm 13+) ==');
  g.newGame(13);
  ok(g.endless === true, 'endless bayrağı true');
  const l20 = g.buildLayout(20);
  ok(l20.length >= 36 && l20.length <= 72 && l20.length % 3 === 0, `bölüm 20 layout geçerli (${l20.length})`);
  ok(g.hintsLeft >= 2, `sonsuz güçler cömert (ipucu=${g.hintsLeft})`);
  ok(g.iq >= 80, `sonsuz IQ tabanı yüksek (${g.iq})`);
  const ch13 = sandbox.STONE_getChapter(13);
  ok(ch13.endless === true && ch13.seal === 'Sonsuz Mühür', 'STONE_getChapter(13) sonsuz + mühür adı');
  const ch15 = sandbox.STONE_getChapter(15);
  ok(ch15.title.includes('Dalga'), `STONE_getChapter(15) → "${ch15.title}"`);
  const before = g.tiles.length;
  g.shuffle();
  ok(g.tiles.length === before, 'karıştır taş sayısını korur');
  g.hint();
  g.undo();
  ok(true, 'undo/hint çağrıldı (çökme yok)');

  console.log('== 4) Nefes sözlüğü + bölüm verisi ==');
  for (const n of [1, 4, 8, 12, 20]) {
    const b = sandbox.STONE_breathForCombo(n);
    ok(b.text && b.sub && b.color, `kombo ${n} → "${b.text}"`);
  }
  ok(sandbox.STONE_CHAPTERS.length === 12, '12 bölüm tanımlı');
  const allLines = sandbox.STONE_CHAPTERS.every((c) => c.lines && c.lines.length === 3);
  ok(allLines, 'her bölümün 3 diyalog satırı var');
  ok(Array.isArray(sandbox.STONE_ENDLESS_LINES) && sandbox.STONE_ENDLESS_LINES.length > 0, 'sonsuz diyalog havuzu var');

  console.log(`\nSONUÇ: ${pass} geçti, ${fail} hata`);
  process.exit(fail ? 1 : 0);
})();
