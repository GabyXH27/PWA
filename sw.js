const CACHE_NAME = "pwa2-cache-v6";
// Actualizar la versión de la cache y esperar un momento hasta que se vea reflejado en el sitio web
// El programa para ser instalado me dió problemas, ver como implmentarlo correctamente
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",

  "./icons/icono.ico",
  "./icons/icono144.png",
  "./icons/icono192.png",

  "./assets/css/style.css",
  "./assets/css/ejerciciosCoordenadas.css",
  "./assets/css/numerosEnteros.css",
  "./assets/css/potenciasBaseDiez.css",
  "./assets/css/potenciasStyle.css",

  "./assets/img/plano.png",
  "./assets/img/planoEjemplo.png",
  "./assets/img/rectaNumerica.png",
  "./assets/img/sistemaCoordenadas.png",

  "./assets/js/header.js",
  "./assets/js/main.js",
  "./assets/js/ejerciciosCoordenadas.js",
  "./assets/js/planoCartesiano.js",
  "./assets/js/sistemaEjercicios.js",
  "./assets/js/ProblemasNumEnteroo.js",
  "./assets/js/ejercicioPotenciasDiez.js",
  "./assets/js/ejercicioRectaEntera.js",
  "./assets/js/ejerciciosPotencias.js",
  "./assets/js/interacionRecta.js",
  "./assets/js/numerosEnteros.js",

  "./partials/header.html",
  "./partials/footer.html",

  "./temas/potencias/potenciasBase10.html",
  "./temas/potencias/expresion.html",
  "./temas/potencias/potencias.html",
  "./temas/potencias/raiz.html",

  "./temas/numeros/coordenadasCartesianas.html",
  "./temas/numeros/numerosEnteros.html",
  "./temas/numeros/problemaNumerosEnteros.html",
  "./temas/numeros/rectaEntera.html",
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
