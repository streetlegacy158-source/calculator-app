const CACHE_NAME = 'calculator-app-v1';

// Files to cache for offline use
const FILES_TO_CACHE = [
    'index.html',
    'style.css',
    'script.js',
    'manifest.json'
];

// Install event - cache all essential files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching app files...');
                return cache.addAll(FILES_TO_CACHE);
            })
            .then(() => {
                return self.skipWaiting();
            })
    );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
        .then(() => {
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Return cached file or fetch from network
                return cachedResponse || fetch(event.request).then((networkResponse) => {
                    // Cache new requests for future offline use
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
            .catch(() => {
                // Offline fallback for HTML requests
                if (event.request.headers.get('accept').includes('text/html')) {
                    return caches.match('index.html');
                }
            })
    );
});