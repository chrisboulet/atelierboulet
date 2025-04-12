// Initialisation de la PWA pour L'atelier Boulet

// Enregistrement du service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker enregistré avec succès:', registration.scope);
        
        // Vérifier les mises à jour du service worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Nouveau service worker disponible
              showUpdateNotification();
            }
          });
        });
      })
      .catch(error => {
        console.error('Erreur lors de l\'enregistrement du Service Worker:', error);
      });
      
    // Écouter les messages du service worker
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data && event.data.type === 'CACHE_UPDATED') {
        // Le cache a été mis à jour
        console.log('Contenu mis en cache:', event.data.url);
      }
    });
  });
  
  // Vérifier si une mise à jour est disponible
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
}

// Afficher une notification de mise à jour
function showUpdateNotification() {
  // Créer la notification
  const notification = document.createElement('div');
  notification.className = 'pwa-update-notification';
  notification.innerHTML = `
    <div class="pwa-update-content">
      <p>Une nouvelle version du site est disponible!</p>
      <button id="pwa-update-button">Mettre à jour</button>
    </div>
  `;
  
  // Ajouter les styles
  const style = document.createElement('style');
  style.textContent = `
    .pwa-update-notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #007bff;
      color: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
      from { transform: translateY(100px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .pwa-update-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
    }
    
    .pwa-update-content p {
      margin: 0;
    }
    
    #pwa-update-button {
      background-color: white;
      color: #007bff;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    
    #pwa-update-button:hover {
      background-color: #f0f0f0;
    }
    
    @media (prefers-color-scheme: dark) {
      .pwa-update-notification {
        background-color: #0d6efd;
      }
      
      #pwa-update-button {
        color: #0d6efd;
      }
    }
  `;
  
  // Ajouter au DOM
  document.head.appendChild(style);
  document.body.appendChild(notification);
  
  // Ajouter l'événement au bouton
  document.getElementById('pwa-update-button').addEventListener('click', () => {
    // Demander au service worker de s'activer immédiatement
    navigator.serviceWorker.ready.then(registration => {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    });
    
    // Supprimer la notification
    notification.remove();
  });
}

// Gestion de l'installation de la PWA
window.addEventListener('beforeinstallprompt', event => {
  // Empêcher Chrome d'afficher automatiquement la bannière d'installation
  event.preventDefault();
  
  // Stocker l'événement pour l'utiliser plus tard
  const deferredPrompt = event;
  
  // Afficher notre propre bouton d'installation si l'utilisateur n'a pas déjà installé l'app
  // et n'a pas refusé l'installation récemment
  const lastPromptTime = localStorage.getItem('pwaPromptTime');
  const now = Date.now();
  
  // Vérifier si on a déjà proposé l'installation dans les 7 derniers jours
  if (!lastPromptTime || (now - parseInt(lastPromptTime)) > 7 * 24 * 60 * 60 * 1000) {
    // Attendre que l'utilisateur ait interagi avec le site
    setTimeout(() => {
      showInstallPrompt(deferredPrompt);
      localStorage.setItem('pwaPromptTime', now.toString());
    }, 30000); // Attendre 30 secondes
  }
});

// Afficher la bannière d'installation
function showInstallPrompt(deferredPrompt) {
  // Créer la bannière
  const banner = document.createElement('div');
  banner.className = 'pwa-install-banner';
  banner.innerHTML = `
    <div class="pwa-install-content">
      <img src="/favicon-64x64.png" alt="Logo" class="pwa-logo">
      <div class="pwa-install-text">
        <h3>Installer L'atelier Boulet</h3>
        <p>Accédez rapidement à vos recettes, même hors ligne!</p>
      </div>
      <div class="pwa-install-buttons">
        <button id="pwa-install-button">Installer</button>
        <button id="pwa-dismiss-button">Plus tard</button>
      </div>
    </div>
  `;
  
  // Ajouter les styles
  const style = document.createElement('style');
  style.textContent = `
    .pwa-install-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: white;
      padding: 15px;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
      z-index: 9999;
      animation: slideUp 0.3s ease-out;
    }
    
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    
    .pwa-install-content {
      display: flex;
      align-items: center;
      max-width: 800px;
      margin: 0 auto;
      gap: 15px;
    }
    
    .pwa-logo {
      width: 48px;
      height: 48px;
    }
    
    .pwa-install-text {
      flex: 1;
    }
    
    .pwa-install-text h3 {
      margin: 0 0 5px 0;
      font-size: 1.1rem;
    }
    
    .pwa-install-text p {
      margin: 0;
      font-size: 0.9rem;
      color: #666;
    }
    
    .pwa-install-buttons {
      display: flex;
      gap: 10px;
    }
    
    #pwa-install-button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    
    #pwa-dismiss-button {
      background-color: transparent;
      color: #666;
      border: 1px solid #ccc;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }
    
    #pwa-install-button:hover {
      background-color: #0069d9;
    }
    
    #pwa-dismiss-button:hover {
      background-color: #f0f0f0;
    }
    
    @media (prefers-color-scheme: dark) {
      .pwa-install-banner {
        background-color: #333;
      }
      
      .pwa-install-text h3 {
        color: #fff;
      }
      
      .pwa-install-text p {
        color: #ccc;
      }
      
      #pwa-install-button {
        background-color: #0d6efd;
      }
      
      #pwa-dismiss-button {
        color: #ccc;
        border-color: #666;
      }
      
      #pwa-install-button:hover {
        background-color: #0b5ed7;
      }
      
      #pwa-dismiss-button:hover {
        background-color: #444;
      }
    }
    
    @media (max-width: 600px) {
      .pwa-install-content {
        flex-direction: column;
        text-align: center;
      }
      
      .pwa-install-buttons {
        width: 100%;
        justify-content: center;
        margin-top: 10px;
      }
    }
  `;
  
  // Ajouter au DOM
  document.head.appendChild(style);
  document.body.appendChild(banner);
  
  // Ajouter les événements aux boutons
  document.getElementById('pwa-install-button').addEventListener('click', () => {
    // Afficher la bannière d'installation native
    deferredPrompt.prompt();
    
    // Attendre la réponse de l'utilisateur
    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Utilisateur a accepté l\'installation');
      } else {
        console.log('Utilisateur a refusé l\'installation');
      }
      
      // Supprimer la bannière
      banner.remove();
    });
  });
  
  document.getElementById('pwa-dismiss-button').addEventListener('click', () => {
    // Supprimer la bannière
    banner.remove();
  });
}
