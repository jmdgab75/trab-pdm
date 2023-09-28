import { offlineFallback, warmStrategyCache } from 'workbox-recipes';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute, Route } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

// Configurando o cache de páginas
const pageCache = new CacheFirst({
  cacheName: 'primeira-pwa-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Indicando o cache de página
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Registrando a rota para páginas
registerRoute(({ request }) => request.mode === 'navigate', ({ event }) => {
  return pageCache.handle({ event });
});

// Configurando cache de assets (scripts, estilos, etc.)
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

// Configurando offline fallback para páginas
offlineFallback({
  pageFallback: '/offline.html',
});

// Configurando a rota de cache para imagens
const imageRoute = new Route(({ request }) => {
  return request.destination === 'image';
}, new CacheFirst({
  cacheName: 'images',
  plugins: [
    new ExpirationPlugin({
      maxAgeSeconds: 60 * 60 * 24 * 30,
    }),
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
}));

// Registrando a rota de cache para imagens
registerRoute(imageRoute);