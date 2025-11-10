const CACHE_NAME = "pwa2-cache-v4";
//Actualizar la versión de la cache y esperar un momento hasta que se vea reflejado en el sitio web
// El programa para ser instalado me dió problemas, ver como implmentarlo correctamente
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  ".//icons/icono.ico",
  "./icons/icono144.png",
  "./icons/icono192.pmg",
  "./assets/css/style.css",
  "./assets/css/ejerciciosCoordenadas.css",
  "./assets/img/plano.png",
  "./assets/img/planoEjemplo.png",
  "./assets/img/sistemaCoordenadas.png",
  "./assets/js/header.js",
  "./assets/js/main.js",
  "./assets/js/ejerciciosCoordenadas.js",
  "./assets/js/planoCartesiano.js",
  "./assets/js/sistemaEjercicios.js",
  "./partials/header.html",
  "./partials/footer.html",
  "./temas/potencias/potenciasBase10.html",
  "./temas/numeros/coordenadasCartesianas.html",
];

self.addEventListener("install", (event) => {
  console.log("Service Worker: Instalando...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cacheando archivos");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activado");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
});
