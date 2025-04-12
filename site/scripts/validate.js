#!/usr/bin/env node

/**
 * Script de validation pour le site L'atelier Boulet
 * 
 * Ce script vérifie:
 * - Les liens internes cassés
 * - Les images manquantes
 * - La structure des recettes
 * - Les métadonnées manquantes
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);
const matter = require('gray-matter');

// Configuration
const CONTENT_DIR = path.join(__dirname, '..', 'content');
const STATIC_DIR = path.join(__dirname, '..', 'static');
const REQUIRED_RECIPE_FIELDS = [
  'title',
  'date',
  'tags',
  'categories'
];

// Variables globales
let errors = 0;
let warnings = 0;
let checkedFiles = 0;

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

/**
 * Point d'entrée principal
 */
async function main() {
  console.log(`${colors.cyan}=== Validation du site L'atelier Boulet ===${colors.reset}\n`);
  
  try {
    // Vérifier les recettes
    await validateRecipes();
    
    // Vérifier les images
    await validateImages();
    
    // Afficher le résumé
    printSummary();
    
    // Sortir avec un code d'erreur si nécessaire
    if (errors > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error(`${colors.red}Erreur lors de la validation:${colors.reset}`, error);
    process.exit(1);
  }
}

/**
 * Valide toutes les recettes
 */
async function validateRecipes() {
  console.log(`${colors.cyan}Validation des recettes...${colors.reset}`);
  
  const postsDir = path.join(CONTENT_DIR, 'posts');
  const files = await readdir(postsDir);
  
  for (const file of files) {
    if (path.extname(file) === '.md') {
      await validateRecipeFile(path.join(postsDir, file));
      checkedFiles++;
    }
  }
  
  console.log(`\n${colors.green}${checkedFiles} fichiers de recettes vérifiés.${colors.reset}\n`);
}

/**
 * Valide un fichier de recette spécifique
 */
async function validateRecipeFile(filePath) {
  const content = await readFile(filePath, 'utf8');
  const { data, content: markdown } = matter(content);
  const fileName = path.basename(filePath);
  
  // Vérifier les champs requis
  for (const field of REQUIRED_RECIPE_FIELDS) {
    if (!data[field]) {
      logError(`${fileName}: Champ requis manquant: ${field}`);
    }
  }
  
  // Vérifier les catégories
  if (data.categories && !Array.isArray(data.categories)) {
    logError(`${fileName}: 'categories' doit être un tableau`);
  }
  
  // Vérifier les tags
  if (data.tags && !Array.isArray(data.tags)) {
    logError(`${fileName}: 'tags' doit être un tableau`);
  }
  
  // Vérifier la structure du contenu
  if (!markdown.includes('## Ingrédients') && !markdown.includes('### Ingrédients')) {
    logWarning(`${fileName}: Section 'Ingrédients' manquante ou mal formatée`);
  }
  
  if (!markdown.includes('## Préparation') && !markdown.includes('### Préparation')) {
    logWarning(`${fileName}: Section 'Préparation' manquante ou mal formatée`);
  }
  
  // Vérifier les images
  if (data.cover && data.cover.image) {
    const imagePath = data.cover.image.startsWith('/')
      ? path.join(STATIC_DIR, data.cover.image.substring(1))
      : path.join(STATIC_DIR, data.cover.image);
    
    try {
      await stat(imagePath);
    } catch (error) {
      logError(`${fileName}: Image de couverture introuvable: ${data.cover.image}`);
    }
  } else {
    logWarning(`${fileName}: Pas d'image de couverture définie`);
  }
  
  // Vérifier les liens internes dans le contenu
  const internalLinks = extractInternalLinks(markdown);
  for (const link of internalLinks) {
    if (link.startsWith('/')) {
      const linkPath = path.join(CONTENT_DIR, '..', 'public', link);
      try {
        await stat(linkPath);
      } catch (error) {
        logError(`${fileName}: Lien interne cassé: ${link}`);
      }
    }
  }
}

/**
 * Valide les images dans le dossier static
 */
async function validateImages() {
  console.log(`${colors.cyan}Validation des images...${colors.reset}`);
  
  // Vérifier les formats d'image
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'];
  const imageFiles = await findFiles(STATIC_DIR, (file) => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  });
  
  let totalSize = 0;
  let largeImages = 0;
  
  for (const file of imageFiles) {
    const stats = await stat(file);
    const sizeInKB = stats.size / 1024;
    totalSize += sizeInKB;
    
    // Vérifier les images trop grandes (> 500 KB)
    if (sizeInKB > 500) {
      logWarning(`Image trop grande (${Math.round(sizeInKB)} KB): ${path.relative(STATIC_DIR, file)}`);
      largeImages++;
    }
  }
  
  console.log(`\n${colors.green}${imageFiles.length} images vérifiées, taille totale: ${Math.round(totalSize / 1024)} MB${colors.reset}`);
  if (largeImages > 0) {
    console.log(`${colors.yellow}${largeImages} images sont trop grandes (> 500 KB) et devraient être optimisées${colors.reset}\n`);
  }
}

/**
 * Trouve récursivement les fichiers correspondant à un prédicat
 */
async function findFiles(dir, predicate) {
  const files = [];
  
  async function scan(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      
      if (entry.isDirectory()) {
        await scan(fullPath);
      } else if (predicate(fullPath)) {
        files.push(fullPath);
      }
    }
  }
  
  await scan(dir);
  return files;
}

/**
 * Extrait les liens internes d'un contenu markdown
 */
function extractInternalLinks(content) {
  const links = [];
  const linkRegex = /\[.*?\]\((\/[^)]+)\)/g;
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    links.push(match[1]);
  }
  
  return links;
}

/**
 * Affiche et compte une erreur
 */
function logError(message) {
  console.error(`${colors.red}ERREUR: ${message}${colors.reset}`);
  errors++;
}

/**
 * Affiche et compte un avertissement
 */
function logWarning(message) {
  console.warn(`${colors.yellow}AVERTISSEMENT: ${message}${colors.reset}`);
  warnings++;
}

/**
 * Affiche le résumé de la validation
 */
function printSummary() {
  console.log(`${colors.cyan}=== Résumé de la validation ===${colors.reset}`);
  console.log(`${colors.green}Fichiers vérifiés: ${checkedFiles}${colors.reset}`);
  
  if (errors === 0) {
    console.log(`${colors.green}Erreurs: ${errors}${colors.reset}`);
  } else {
    console.log(`${colors.red}Erreurs: ${errors}${colors.reset}`);
  }
  
  if (warnings === 0) {
    console.log(`${colors.green}Avertissements: ${warnings}${colors.reset}`);
  } else {
    console.log(`${colors.yellow}Avertissements: ${warnings}${colors.reset}`);
  }
  
  if (errors === 0 && warnings === 0) {
    console.log(`\n${colors.green}✓ Validation réussie!${colors.reset}`);
  } else if (errors === 0) {
    console.log(`\n${colors.yellow}⚠ Validation réussie avec avertissements${colors.reset}`);
  } else {
    console.log(`\n${colors.red}✗ Validation échouée${colors.reset}`);
  }
}

// Exécuter le script
main();
