// Service Worker pour L'atelier Boulet
const CACHE_NAME = 'atelier-boulet-v1';
const OFFLINE_URL = '/offline.html';

// Liste des ressources à mettre en cache immédiatement
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/offline.html',
  '/css/print.css',
  '/js/portion-calculator.js',
  '/favicon-64x64.png',
  '/logo-atelierboulet.png',
  '/logo-transparent.png',
  '/manifest.json'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Mise en cache des ressources');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  // Nettoyer les anciens caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Suppression de l\'ancien cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Stratégie de mise en cache pour les recettes
const recipeStrategy = async (request) => {
  // Essayer d'abord le réseau
  try {
    const networkResponse = await fetch(request);
    
    // Mettre en cache la réponse fraîche
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());
    
    return networkResponse;
  } catch (error) {
    // Si le réseau échoue, essayer le cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Si la ressource n'est pas dans le cache et que c'est une page HTML,
    // retourner la page hors ligne
    if (request.headers.get('Accept').includes('text/html')) {
      return caches.match(OFFLINE_URL);
    }
    
    // Sinon, propager l'erreur
    throw error;
  }
};

// Stratégie de mise en cache pour les ressources statiques
const staticStrategy = async (request) => {
  // Essayer d'abord le cache
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Si pas dans le cache, aller sur le réseau
  try {
    const networkResponse = await fetch(request);
    
    // Mettre en cache la réponse si c'est une requête GET valide
    if (request.method === 'GET' && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Si c'est une image, on peut retourner une image par défaut
    if (request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
      return caches.match('/logo-atelierboulet.png');
    }
    
    // Sinon, propager l'erreur
    throw error;
  }
};

// Interception des requêtes
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Ne pas intercepter les requêtes vers d'autres domaines
  if (url.origin !== self.location.origin) {
    return;
  }
  
  // Stratégie différente selon le type de ressource
  if (event.request.headers.get('Accept').includes('text/html')) {
    // Pour les pages HTML (recettes, etc.)
    event.respondWith(recipeStrategy(event.request));
  } else {
    // Pour les ressources statiques (CSS, JS, images)
    event.respondWith(staticStrategy(event.request));
  }
});

// Gestion des messages
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
