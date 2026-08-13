/* =========================================================
   ZİHİN HARİTASI TESTİ v1.1 — M-012 kademe-1
   Çalıştır: node test/zihin_haritasi_test.js
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
  };
}
function yukle(ls) {
  const sandbox = {
    window: {}, localStorage: ls || lsShim(),
    document: { getElementById: () => null, createElement: () => ({}), body: {} },
    console
  };
  vm.createContext(sandbox);
  const kod = fs.readFileSync(path.join(__dirname, '..', 'js', 'zihin_haritasi.js'), 'utf8');
  vm.runInContext(kod, sandbox);
  return sandbox.window.ZIHIN;
}

console.log('== 1) Ağaç bütünlüğü ==');
const Z = yukle();
const A = Z._agac;
ok(Object.keys(A).length === 7, '7 düğüm (kök + 3 kol × 2)');
ok(A.kok.once.length === 0, 'kök önşartsız');
ok(Object.keys(A).every(id => A[id].once.every(k => A[k])), 'tüm önşartlar geçerli düğümlere işaret ediyor');
ok(Object.values(A).reduce((s, d) => s + d.maliyet, 0) === 15, 'tam ağaç maliyeti 15 taş');

console.log('== 2) Ödül ekonomisi (dedup) ==');
const ZB = yukle();
ok(ZB.odul('bolum', 3) === 1, 'Bölüm 3 ilk zafer → +1 taş');
ok(ZB.odul('bolum', 3) === 0, 'Bölüm 3 tekrar → 0 (sömürü yok)');
ok(ZB.odul('bolum', 13) === 0, 'B13 sonsuzdur → bölüm ödülü yok');
ok(ZB.odul('bolum', 0) === 0, 'geçersiz seviye → 0');
ok(ZB.odul('iq', 3) === 1, 'IQ sınavı B3 → +1');
ok(ZB.odul('iq', 3) === 0, 'aynı sınav tekrar → 0');
ok(ZB.odul('sonsuz', 14) === 0, 'dalga 14 → 0 (3\'ün katı değil)');
ok(ZB.odul('sonsuz', 15) === 1, 'dalga 15 → +1 (her 3. dalga)');
ok(ZB.odul('sonsuz', 15) === 0, 'dalga 15 tekrar → 0');
ok(ZB.durum().tas === 3, 'toplam 3 taş doğdu');

console.log('== 3) Kilit / maliyet / açma ==');
const ZC = yukle();
ok(ZC._acilabilir('ipucu1') === false, 'taşsızken ipucu1 açılamaz');
ok(ZC.dugumAc('ipucu1').neden === 'tas', 'taşsız açma denemesi → "tas" nedeni');
ZC.odul('bolum', 1); ZC.odul('bolum', 2);
ok(ZC._acilabilir('ipucu1') === true, '2 taşla ipucu1 açılabilir');
ok(ZC._acilabilir('ipucu2') === false, 'ipucu1 yokken ipucu2 kilitli');
ok(ZC.dugumAc('ipucu2').neden === 'kilit', 'erken ipucu2 → "kilit" nedeni');
let r1 = ZC.dugumAc('ipucu1');
ok(r1.ok && r1.kalan === 0, 'ipucu1 açıldı, 2 taş harcandı');
ok(ZC.dugumAc('ipucu1').neden === 'sahip', 'zaten açık → "sahip"');
ok(ZC.dugumAc('kok').neden === 'sahip', 'kök her zaman açık');
ok(ZC.dugumAc('boyle-bir-dugum-yok').neden === 'yok', 'var olmayan düğüm → "yok"');

console.log('== 4) Perk toplamı + kalıcılık ==');
const ls = lsShim();
const ZD = yukle(ls);
for (let i = 1; i <= 12; i++) ZD.odul('bolum', i);
ZD.odul('iq', 3); ZD.odul('iq', 6); ZD.odul('iq', 9); ZD.odul('iq', 12);
ok(ZD.durum().tas === 16, 'senaryo: 12 bölüm + 4 sınav = 16 taş');
ok(ZD.dugumAc('ipucu1').ok && ZD.dugumAc('ipucu2').ok, 'sezgi kolu açıldı (5 taş)');
ok(ZD.dugumAc('geri1').ok && ZD.dugumAc('karis1').ok, 'hafıza + nefes I açıldı (4 taş)');
ok(ZD.durum().tas === 7, 'kalan 7 taş (16 − 9)');
const pk = ZD.perkleri();
ok(pk.ipucu === 2 && pk.geri === 1 && pk.karis === 1, 'perkleri: +2 ipucu, +1 geri al, +1 karıştır');
const ZE = yukle(ls); // yeni oturum, aynı localStorage
const pk2 = ZE.perkleri();
ok(pk2.ipucu === 2 && pk2.geri === 1 && pk2.karis === 1 && ZE.durum().tas === 7, 'kalıcılık: oturumlar arası korunuyor');
ok(ZE.dugumAc('geri2').ok && ZE.dugumAc('karis2').ok, 'kalanla II. kademeler açılabiliyor');
ok(ZE.durum().tas === 1 && ZE._acilabilir('ipucu2') === false, 'kaynak kıtlığı gerçek kural (1 taş kalır)');

console.log('');
console.log(`SONUÇ: ${gecti} geçti, ${hata} hata`);
process.exit(hata ? 1 : 0);
