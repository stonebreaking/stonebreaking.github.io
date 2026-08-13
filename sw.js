// STONEBREAKING SW v8.16 — NETWORK-FIRST: asla bayat önbellek yok, çevrimdışı yedek var
const CACHE = 'sb-v816';
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then((r) => {
      try {
        const cp = r.clone();
        caches.open(CACHE).then((c) => c.put(e.request, cp)).catch(() => {});
      } catch (_) {}
      return r;
    }).catch(() => caches.match(e.request))
  );
});
