/* =========================================================
   RUH ÇAĞRI TESTİ v1.0 — M-013 kademe-1
   js/ruh_cagri.js mantığını DOM'suz sandbox'ta doğrular.
   Çalıştır: node test/ruh_cagri_test.js
   ========================================================= */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

let gecti = 0, hata = 0;
function ok(kosul, mesaj) {
  if (kosul) { gecti++; console.log('  ✅ ' + mesaj); }
  else { hata++; console.log('  ❌ ' + mesaj); }
}

function lsShim() {
  const d = {};
  return {
    getItem: (k) => (k in d ? d[k] : null),
    setItem: (k, v) => { d[k] = String(v); },
    removeItem: (k) => { delete d[k]; },
    _dump: d
  };
}

function yukle(opts) {
  opts = opts || {};
  const sandbox = {
    window: opts.stone || {},
    localStorage: opts.ls || lsShim(),
    document: { getElementById: () => null, createElement: () => { throw new Error('DOM yok'); }, body: {} },
    requestAnimationFrame: (f) => f(),
    setTimeout: () => {},
    console
  };
  sandbox.window.STONE_SPIRITS = opts.spirits || undefined;
  sandbox.window.STONE_ELEMENTS = opts.elements || undefined;
  vm.createContext(sandbox);
  const kod = fs.readFileSync(path.join(__dirname, '..', 'js', 'ruh_cagri.js'), 'utf8');
  vm.runInContext(kod, sandbox);
  return sandbox.window.RUH_CAGRI;
}

const SAAT = 3600e3, GUN = 24 * SAAT;
const T0 = new Date('2026-08-03T12:00:00').getTime();

console.log('== 1) Kademe eşikleri ==');
const R = yukle();
ok(R._tier(3.9 * SAAT) === null, '3,9 saat → sessiz (eşik 4 saat)');
ok(R._tier(4 * SAAT) === 'kisa', '4 saat → kısa yokluk');
ok(R._tier(30 * SAAT) === 'kisa', '30 saat → kısa');
ok(R._tier(3 * GUN) === 'orta', '3 gün → orta');
ok(R._tier(9 * GUN) === 'uzun', '9 gün → uzun');
ok(R._tier(NaN) === null, 'NaN → sessiz (güvenli)');

console.log('== 2) Ruh sesleri ==');
const STONE = {
  spirits: { kor: { element: 'ates' } },
  elements: { ates: { color: '#ff6b35' } }
};
const R2 = yukle({ stone: {} , spirits: STONE.spirits, elements: STONE.elements });
let m = R2._build('kor', 9 * GUN, 1, 0);
ok(m.title.includes('Beni yalnız bırakma, yoksa yine yakarım.'), 'Kor uzun yokluk: mühürlü kanon repliği');
ok(m.color === '#ff6b35', 'Renk STONE_ELEMENTS üzerinden geldi (#ff6b35)');
ok(m.emoji === '🐺', 'Kor maskotu kurt 🐺 (M-006)');
m = R2._build('baam', 5 * SAAT, 1, 0);
ok(m.emoji === '🐋' && m.tier === 'kisa', 'Baam kısa: balina 🐋');
m = R2._build('mand', 3 * GUN, 1, 0);
ok(m.emoji === '🐻' && m.tier === 'orta', 'Mand orta: ayı 🐻');
m = R2._build('zepy', 6 * SAAT, 1, 0);
ok(m.emoji === '🐰' && m.tier === 'kisa', 'Zepy kısa: tavşan 🐰');
m = R2._build('bilinmeyen', 5 * GUN, 1, 0);
ok(m.emoji === '◆' && R._build ? true : false, 'Bilinmeyen ruh → genel havuz + ◆');

console.log('== 3) Seri (streak) mantığı ==');
const ls1 = lsShim();
const RA = yukle({ ls: ls1 });
RA.init(T0, () => 'kor');            // 3 Ağustos
const mid = new Date('2026-08-04T10:00:00').getTime();
RA.init(mid, () => 'kor');           // 4 Ağustos → 2. gün
let h = RA.init(new Date('2026-08-05T09:00:00').getTime(), () => 'kor'); // 5 Ağustos → 3. gün
ok(h.seri === 3, 'peş peşe 3 gün → seri 3');
h = RA.init(new Date('2026-08-08T09:00:00').getTime(), () => 'kor');    // 3 gün boşluk
ok(h.seri === 1, 'kopuk gün → seri sıfırlanır (1)');
h = RA.init(new Date('2026-08-08T23:00:00').getTime(), () => 'kor');    // aynı gün ikinci açılış
ok(h.seri === 1, 'aynı gün tekrar → seri artmaz');

console.log('== 4) maybeShow akışı ==');
// 4a) İlk ziyaret: gösterme
const ls2 = lsShim();
const RB = yukle({ ls: ls2 });
RB._toast = (msg) => { RB._yakalanan = msg; };
RB.init(T0, () => 'kor');
ok(RB.maybeShow() === false && !RB._yakalanan, 'ilk ziyaret → sessiz');
// 4b) 5 saat sonra dönüş: çağrı + tek sefer
const RC = yukle({ ls: ls2 });
RC._toast = (msg) => { RC._yakalanan = msg; };
RC.init(T0 + 5 * SAAT, () => 'zepy');
ok(RC.maybeShow() === true, '5 saat sonra dönüş → çağrı gösterildi');
ok(RC._yakalanan && RC._yakalanan.emoji === '🐰', 'çağrı ruh doğru (🐰)');
ok(RC.maybeShow() === false, 'aynı oturumda ikinci kez GÖSTERMEZ');
// 4c) seri ≥ 2 → alt satır
const ls3 = lsShim();
const RD = yukle({ ls: ls3 });
RD._toast = (msg) => { RD._yakalanan = msg; };
RD.init(T0, () => 'mand');
const RE = yukle({ ls: ls3 });
RE._toast = (msg) => { RE._yakalanan = msg; };
RE.init(new Date('2026-08-04T10:00:00').getTime(), () => 'mand'); // ertesi gün
ok(RE.maybeShow() === true && RE._yakalanan.sub.includes('2 gün üst üste'), 'ertesi gün dönüş: "2 gün üst üste" kutlaması');
// 4d) 40 dakika içinde tekrar: sessiz (rahatsız yok)
const ls4 = lsShim();
const RF = yukle({ ls: ls4 });
RF.init(T0, () => 'kor');
const RG = yukle({ ls: ls4 });
RG._toast = (msg) => { RG._yakalanan = msg; };
RG.init(T0 + 40 * 60e3, () => 'kor');
ok(RG.maybeShow() === false, '40 dk içinde tekrar → sessiz');

console.log('== 5) Deterministik havuz seçimi ==');
const RH = yukle();
const a1 = RH._build('kor', 5 * SAAT, 1, 7).title;
const a2 = RH._build('kor', 5 * SAAT, 1, 8).title;
ok(a1 !== a2, 'gün tohumu değişince satır değişir (tekdüzelik yok)');
ok(RH._build('kor', 5 * SAAT, 1, 7).title === a1, 'aynı gün sabit kalır (titreşim yok)');

console.log('');
console.log(`SONUÇ: ${gecti} geçti, ${hata} hata`);
process.exit(hata ? 1 : 0);
