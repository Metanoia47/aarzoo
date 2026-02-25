const CACHE_NAME = 'aarzoo-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './s01.jpeg', 
  './Yeh Hawa Yeh Raat Yeh Chandni.mp3'
  // Add all your song names and image names here exactly as they appear in your folder
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
