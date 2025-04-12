# L'atelier Boulet

Site de recettes et astuces de cuisine basé sur Hugo.

## 📋 Fonctionnalités

- ✅ Recettes structurées avec métadonnées (temps de préparation, difficulté, etc.)
- ✅ Collections thématiques de recettes
- ✅ Astuces culinaires
- ✅ Recherche intégrée
- ✅ Mode sombre/clair
- ✅ Calculateur de portions
- ✅ Partage sur réseaux sociaux
- ✅ Impression optimisée
- ✅ PWA (Progressive Web App) pour accès hors ligne
- ✅ SEO optimisé avec Schema.org
- ✅ Déploiement automatique via GitHub Actions

## 🚀 Installation

### Prérequis

- [Hugo Extended](https://gohugo.io/installation/) (version 0.125.7 ou supérieure)
- [Node.js](https://nodejs.org/) (pour les scripts de validation)
- [Git](https://git-scm.com/)

### Installation locale

1. Cloner le dépôt:
   ```bash
   git clone https://github.com/votre-compte/atelierboulet.git
   cd atelierboulet/site
   ```

2. Installer les dépendances:
   ```bash
   npm install
   ```

3. Lancer le serveur de développement:
   ```bash
   npm run dev
   # ou
   hugo server -D
   ```

4. Ouvrir http://localhost:1313 dans votre navigateur

### Utilisation avec Docker

Un fichier Docker et docker-compose sont fournis pour faciliter le développement:

```bash
docker-compose up
```

Le site sera disponible sur http://localhost:1313.

## 📝 Création de contenu

### Nouvelle recette

Utilisez le script PowerShell fourni pour créer une nouvelle recette:

```powershell
./new-recette.ps1 "Nom de la recette"
```

Ou avec des paramètres supplémentaires:

```powershell
./new-recette.ps1 -Titre "Tarte aux pommes" -Type "dessert" -Difficulte "facile" -TempsPrep 20 -TempsCuisson 40 -Portions 8
```

### Structure des recettes

Chaque recette suit une structure standardisée:

```markdown
---
title: "Nom de la recette"
date: 2025-04-12
tags: ["type", "méthode", "ingrédient-clé"]
categories: ["Recettes"]
types: ["plat principal"]
seasons: ["toutes saisons"]
difficulties: ["facile"]
diets: ["standard"]
durations: ["moyen"]
tempsPreparation: 15
tempsCuisson: 30
tempsTotal: 45
portions: 4
cout: "moyen"
cover:
  image: "/images/nom-image.jpg"
  alt: "Photo du plat"
description: "Description de la recette"
---

## 🍽️ Accompagnements suggérés
- Suggestion 1
- Suggestion 2

## 🍷 Vin ou breuvage approprié
- Suggestion de boisson

## 🧾 Ingrédients
- Ingrédient 1
- Ingrédient 2
- ...

## 👨‍🍳 Préparation
1. Étape 1
2. Étape 2
3. ...

## 💡 Astuces
- Astuce 1
- Astuce 2
```

## 🔄 Workflow de publication

Le site utilise GitHub Actions pour automatiser le déploiement:

1. Créez une branche pour vos modifications:
   ```bash
   git checkout -b ma-nouvelle-recette
   ```

2. Ajoutez et validez vos modifications:
   ```bash
   git add .
   git commit -m "Ajout d'une nouvelle recette"
   ```

3. Poussez vos modifications:
   ```bash
   git push origin ma-nouvelle-recette
   ```

4. Créez une Pull Request sur GitHub

5. Une fois la PR fusionnée, GitHub Actions déploiera automatiquement le site

## 🧪 Validation

Pour valider le contenu du site localement:

```bash
npm run validate
```

Ce script vérifie:
- Les liens internes cassés
- Les images manquantes
- La structure des recettes
- Les métadonnées manquantes

## 📁 Structure du projet

```
site/
├── archetypes/         # Modèles pour la création de contenu
├── content/            # Contenu du site
│   ├── posts/          # Recettes
│   ├── astuces/        # Astuces culinaires
│   └── collections/    # Collections thématiques
├── layouts/            # Templates Hugo personnalisés
├── static/             # Fichiers statiques (images, CSS, JS)
├── scripts/            # Scripts utilitaires
├── config.toml         # Configuration Hugo
└── .github/workflows/  # Configuration GitHub Actions
```

## 📱 PWA (Progressive Web App)

Le site est configuré comme une PWA, permettant:
- L'installation sur l'écran d'accueil des appareils mobiles
- L'accès hors ligne aux recettes consultées
- La mise en cache automatique du contenu

## 🛠️ Personnalisation

### Thème

Le site utilise le thème [PaperMod](https://github.com/adityatelange/hugo-PaperMod) avec des personnalisations.

### Configuration

Les principales options de configuration se trouvent dans `config.toml`.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
