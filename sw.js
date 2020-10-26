// Hey there! This is an over-simplified ServiceWorker for a tutorial.
// For any real apps, please use workboxjs.org or similar
// If you do want to use this, you'll need to update the file manually for every change to trigger an update

const cacheName = "pwa-conf-v1";
const staticAssets = ["./", "./index.html", "./app.js", "./styles.css"];

// Add this to provide the install prompt to the user
// let deferredPrompt;

// self.addEventListener("beforeinstallprompt", (e) => {
//   // Prevent the mini-infobar from appearing on mobile
//   e.preventDefault();
//   // Stash the event so it can be triggered later.
//   deferredPrompt = e;
//   // Update UI notify the user they can install the PWA
//   showInstallPromotion();
// });

self.addEventListener("install", async (event) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

// Optional: clents.claim() makes the service worker take over the current page
// instead of waiting until next load. Useful if you have used SW to prefetch content
// that's needed on other routes. But potentially dangerous as you are still running the
// previous version of the app, but with new resources.
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (/.*(json)$/.test(req.url)) {
    event.respondWith(networkFirst(req));
  } else {
    event.respondWith(cacheFirst(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(req);
  return cachedResponse || networkFirst(req);
}

async function networkFirst(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cachedResponse = await cache.match(req);
    return cachedResponse;
  }
}
