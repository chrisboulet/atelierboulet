# Guide d'installation Auth0 pour L'atelier Boulet

Ce guide vous explique comment configurer Auth0 pour l'authentification de votre interface d'administration.

## 1. Créer un compte Auth0

1. Allez sur [Auth0](https://auth0.com/) et inscrivez-vous ou connectez-vous
2. Créez un nouveau tenant (ou utilisez le tenant par défaut)

## 2. Créer une application

1. Dans le tableau de bord Auth0, allez à "Applications" > "Applications"
2. Cliquez sur "Create Application"
3. Donnez un nom à votre application (ex: "L'atelier Boulet CMS")
4. Sélectionnez "Single Page Web Applications"
5. Cliquez sur "Create"

## 3. Configurer l'application

1. Dans les paramètres de l'application, configurez:
   - Allowed Callback URLs: `https://atelierboulet.netlify.app/admin/`
   - Allowed Logout URLs: `https://atelierboulet.netlify.app/`
   - Allowed Web Origins: `https://atelierboulet.netlify.app`
2. Notez votre Domain et Client ID (vous en aurez besoin pour la configuration)

## 4. Créer un token GitHub personnel

1. Allez sur [GitHub Developer Settings](https://github.com/settings/tokens)
2. Cliquez sur "Generate new token" (classic)
3. Donnez un nom au token (ex: "L'atelier Boulet CMS")
4. Sélectionnez les scopes suivants:
   - `repo` (tous les sous-scopes)
   - `user:email`
5. Cliquez sur "Generate token"
6. **IMPORTANT**: Copiez le token généré, vous ne pourrez plus le voir après avoir quitté cette page

## 5. Configurer une action Auth0 pour le token GitHub

1. Dans le tableau de bord Auth0, allez à "Actions" > "Triggers"
2. Cliquez sur "Login / Post Login"
3. Cliquez sur "Add Action" > "Build Custom"
4. Donnez un nom à l'action (ex: "GitHub Token Action")
5. Copiez le contenu du fichier `github-token-action.js` dans l'éditeur
6. Cliquez sur "Secrets" dans le panneau de droite
7. Ajoutez un secret nommé `GITHUB_TOKEN` avec la valeur du token GitHub que vous avez généré
8. Cliquez sur "Deploy" pour déployer l'action
9. Retournez à l'écran "Login / Post Login"
10. Ajoutez votre action à la séquence de déclenchement en cliquant sur "Add to flow"
11. Sélectionnez votre action et cliquez sur "Add to flow"
12. Cliquez sur "Apply" pour appliquer les changements

## 6. Mettre à jour les fichiers de configuration

1. Dans les fichiers suivants, remplacez `YOUR_AUTH0_DOMAIN` par votre domaine Auth0 (ex: `dev-xyz123.us.auth0.com`):
   - `site/layouts/_default/baseof.html`
   - `site/static/admin/index.html`
   - `site/static/admin/config.yml`
   - `site/static/admin/flutter_config.json`
2. Dans les mêmes fichiers, remplacez `YOUR_AUTH0_CLIENT_ID` par votre Client ID Auth0

## 7. Tester l'authentification

1. Déployez votre site sur Netlify
2. Accédez à `https://atelierboulet.netlify.app/admin/`
3. Cliquez sur "Se connecter"
4. Vous devriez être redirigé vers Auth0 pour vous authentifier
5. Après l'authentification, vous devriez être redirigé vers l'interface d'administration

## Dépannage

### Les tokens ne fonctionnent pas

1. Vérifiez les logs dans Auth0 (Dashboard > Monitoring > Logs)
2. Assurez-vous que l'action est correctement configurée et déployée
3. Vérifiez que le token GitHub a les bonnes permissions

### Problèmes de redirection

1. Vérifiez que les URLs de callback sont correctement configurées
2. Assurez-vous que le domaine Auth0 et le Client ID sont correctement configurés dans les fichiers

### Autres problèmes

1. Consultez la [documentation Auth0](https://auth0.com/docs)
2. Vérifiez les [forums Auth0](https://community.auth0.com/)
