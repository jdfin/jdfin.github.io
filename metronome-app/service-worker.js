
var cacheName = "metronome-v1";
var cacheFiles = [
  "./",
  "./index.html",
  "./favicon.png",
  "./scripts/metronome.js",
  "./styles/bootstrap.css"
];

function loadCache(cache) {
  console.log("serviceworker: loadCache");
  return cache.addAll(cacheFiles);
}

function installHandler(evt) {
  console.log("serviceworker: installHandler");
  evt.waitUntil(caches.open(cacheName).then(loadCache));
}

self.addEventListener("install", installHandler);



function activateHandler(e) {
  console.log("serviceworker: activate");
}

self.addEventListener("activate", activateHandler);



function fetchHandler(evt) {
  console.log("serviceworker: fetch: " + evt.request.url);
  evt.respondWith(
    caches.match(evt.request).then(
      function(response) {
        if (response) {
          console.log("serviceworker: fetch: hit " + evt.request.url);
          return response;
        } else {
          console.log("serviceworker: fetch: miss " + evt.request.url);
          return fetch(evt.request);
        }
      }
    )
  );
}

self.addEventListener("fetch", fetchHandler);
