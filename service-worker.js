const CACHE_NAME = "covid19";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/asset/icon72x72.png",
  "/asset/icon96x96.png",
  "/asset/icon128x128.png",
  "/asset/icon512x512.png",
  "/pages/beranda.html",
  "/pages/berita.html",
  "/pages/protokol.html",
  "/pages/sebaran.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/asset/berita.jpeg",
  "/asset/corona.jpg",
  "/asset/cuci_tangan.png",
  "/asset/facebook.png",
  "/asset/github.png",
  "/asset/icon1.png",
  "/asset/instagram.png",
  "/asset/pakai_masker.png",
  "/asset/protokol.jpg",
  "/asset/social_distance.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
    .match(event.request, {
      cacheName: CACHE_NAME
    })
    .then(function (response) {
      if (response) {
        console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
        return response;
      }

      console.log(
        "ServiceWorker: Memuat aset dari server: ",
        event.request.url
      );
      return fetch(event.request);
    })
  );
});


self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});