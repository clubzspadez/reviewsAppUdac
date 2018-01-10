/*Service worker*/

var CACHE = "restaurant_v1";

var arryCaches = [CACHE];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll([
          "/",
          "index.html",
          "/restaurant.html",
          "css/styles.css",
          "js/dbhelper.js",
          "js/main.js",
          "js/restaurant_info.js"
        ]);
    })
  );
});


self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

    event.respondWith(
      caches.match(event.request).then((res) => {
        return res || fetch(event.request);
      })
    );
});


self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheList) => {
      return Promise.all(
        cacheList
          .filter((cacheList) => {
            return (
              cacheList.startsWith("restaurant_reviewer") &&
              !arryCaches.includes(cacheList)
            );
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});


