const CACHE_NAME = 'aarzoo-v3'; // Incremented version to refresh her cache

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  // --- Artworks ---
  './s01.jpeg',
  './s02.jpeg',
  './s03.jpeg',
  './s04.jpeg',
  './s05.jpeg',
  './s06.jpeg',
  './s06.jpeg',
  // --- Music Files ---
  './Yeh Hawa Yeh Raat Yeh Chandni.mp3',
  './Aye dil mujhe aisi jagah le chal.mp3',
  './Itana na mujhase tu pyar badha.mp3',
  './aayega aanewala short.mp3',
  './Ye raat bheegi bheegi.mp3',
    './Neele gagan tale pyar hum kare.mp3',
  './Sham e gham ki qasam.mp3'
];

// Install Event: Save all files to the phone's storage
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Forces the new service worker to take over immediately
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Aarzoo Vault: Caching all romantic melodies...');
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Event: Clean up old versions of the app
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch Event: Serve files from cache if offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
