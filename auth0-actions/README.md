# Interface d'administration pour L'atelier Boulet

Ce dépôt contient les fichiers nécessaires pour configurer l'interface d'administration de L'atelier Boulet, un site de recettes et astuces culinaires.

## Architecture

L'interface d'administration utilise:

- **Flutter Web** comme framework d'interface utilisateur
- **Auth0** pour l'authentification sécurisée
- **GitHub API** pour la gestion du contenu
- **Netlify CMS** comme base pour l'édition de contenu

## Fonctionnalités

- Création, modification et suppression de recettes
- Gestion des astuces culinaires
- Organisation en collections thématiques
- Gestion des médias (images)
- Prévisualisation en temps réel
- Interface utilisateur intuitive et réactive

## Installation

Voir le fichier [INSTALLATION.md](./INSTALLATION.md) pour les instructions détaillées sur la configuration d'Auth0.

## Utilisation

### Accès à l'interface d'administration

1. Accédez à `https://atelierboulet.netlify.app/admin/`
2. Connectez-vous avec vos identifiants Auth0
3. Vous serez redirigé vers l'interface d'administration

### Gestion des recettes

1. Cliquez sur "Recettes" dans le menu latéral
2. Pour créer une nouvelle recette, cliquez sur "Nouvelle recette"
3. Remplissez les champs du formulaire:
   - Titre
   - Description
   - Image de couverture
   - Catégories et tags
   - Temps de préparation, cuisson, etc.
   - Contenu (ingrédients et instructions)
4. Cliquez sur "Prévisualiser" pour voir le rendu
5. Cliquez sur "Publier" pour publier la recette

### Gestion des astuces

1. Cliquez sur "Astuces" dans le menu latéral
2. Pour créer une nouvelle astuce, cliquez sur "Nouvelle astuce"
3. Remplissez les champs du formulaire
4. Cliquez sur "Publier" pour publier l'astuce

### Gestion des collections

1. Cliquez sur "Collections" dans le menu latéral
2. Pour créer une nouvelle collection, cliquez sur "Nouvelle collection"
3. Remplissez les champs du formulaire
4. Associez des recettes à la collection
5. Cliquez sur "Publier" pour publier la collection

### Gestion des médias

1. Cliquez sur "Médias" dans le menu latéral
2. Pour téléverser une nouvelle image, cliquez sur "Téléverser"
3. Sélectionnez l'image à téléverser
4. L'image sera disponible pour être utilisée dans vos recettes et astuces

## Développement

### Prérequis

- Flutter SDK
- Dart SDK
- Compte Auth0
- Compte GitHub
- Compte Netlify

### Configuration locale

1. Clonez ce dépôt
2. Installez les dépendances: `flutter pub get`
3. Configurez les variables d'environnement
4. Lancez l'application en mode développement: `flutter run -d chrome`

## Support

Pour toute question ou problème, veuillez créer une issue dans ce dépôt.
