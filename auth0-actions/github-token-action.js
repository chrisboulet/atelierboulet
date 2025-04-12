/**
 * Action Auth0 pour obtenir un token GitHub après l'authentification
 * 
 * Cette action s'exécute après une connexion réussie et ajoute un token GitHub
 * aux informations d'identité de l'utilisateur.
 * 
 * @param {Event} event - L'événement d'authentification
 * @param {API} api - L'API Auth0
 */
exports.onExecutePostLogin = async (event, api) => {
  // Vérifier si l'utilisateur se connecte à l'application d'administration
  if (event.client.name === "L'atelier Boulet CMS") {
    try {
      // Ajouter les informations GitHub à l'ID token
      api.idToken.setCustomClaim('https://atelierboulet.netlify.app/github_access', {
        // Ces valeurs seront remplacées par les vraies valeurs dans l'interface Auth0
        access_token: event.secrets.GITHUB_TOKEN,
        repo: 'chrisboulet/atelierboulet',
        branch: 'main'
      });
      
      // Ajouter également au token d'accès
      api.accessToken.setCustomClaim('https://atelierboulet.netlify.app/github_access', {
        access_token: event.secrets.GITHUB_TOKEN,
        repo: 'chrisboulet/atelierboulet',
        branch: 'main'
      });
      
      // Journaliser le succès (visible dans les logs Auth0)
      api.log('GitHub token ajouté avec succès aux tokens');
    } catch (error) {
      // Journaliser l'erreur (visible dans les logs Auth0)
      api.log('Erreur lors de l\'ajout du token GitHub: ' + error.message);
    }
  }
};

/**
 * Fonction exécutée lorsque l'action est supprimée
 */
exports.onContinuePostLogin = async () => {
  console.log('Action terminée');
};
