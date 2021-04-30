const CACHE_STATIC_NAME = "cache-verson-1";
const urls = ["index.html", "/", "offline.html"];

// monitor install
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME).then((cache) => {
            console.log("opened cache");
            return cache.addAll(urls);
        })
    );
});

// listen for requests
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches
            .match(event.request)
            .then(() => {
                return fetch(event.request).catch(() =>
                    caches.match("offline.html")
                );
            })
            .catch((err) => console.log(err))
    );
});
// active event
self.addEventListener("activate", (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_STATIC_NAME);
    event.waitUntil(
        caches.keys().then((cachesNames) =>
            Promise.all(
                cachesNames.map((cacheName) => {
                    if (!cacheWhiteList.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
});
