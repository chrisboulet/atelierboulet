/**
 * Calculateur de portions pour les recettes
 * 
 * Ce script permet d'ajuster dynamiquement les quantités d'ingrédients
 * en fonction du nombre de portions souhaité.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Chercher s'il y a un élément avec l'attribut data-portions
    const portionsElement = document.querySelector('[data-portions]');
    
    // Si la page ne contient pas de recette avec des portions, ne rien faire
    if (!portionsElement) return;
    
    // Récupérer le nombre de portions initial
    const initialPortions = parseInt(portionsElement.getAttribute('data-portions')) || 4;
    
    // Créer l'interface du calculateur
    createPortionCalculator(initialPortions);
    
    // Identifier tous les éléments contenant des quantités
    identifyIngredientQuantities();
});

/**
 * Crée l'interface du calculateur de portions
 * @param {number} initialPortions - Nombre initial de portions
 */
function createPortionCalculator(initialPortions) {
    // Créer le conteneur du calculateur
    const calculator = document.createElement('div');
    calculator.className = 'portion-calculator';
    calculator.innerHTML = `
        <div class="portion-calculator-inner">
            <label for="portion-number">Nombre de portions:</label>
            <div class="portion-controls">
                <button type="button" id="decrease-portions" aria-label="Diminuer les portions">-</button>
                <input type="number" id="portion-number" value="${initialPortions}" min="1" max="20">
                <button type="button" id="increase-portions" aria-label="Augmenter les portions">+</button>
            </div>
        </div>
    `;
    
    // Insérer le calculateur avant la liste d'ingrédients
    const ingredientsSection = document.querySelector('h2:contains("Ingrédients"), h3:contains("Ingrédients")');
    if (ingredientsSection) {
        ingredientsSection.parentNode.insertBefore(calculator, ingredientsSection);
    }
    
    // Ajouter les styles CSS
    addCalculatorStyles();
    
    // Ajouter les gestionnaires d'événements
    document.getElementById('decrease-portions').addEventListener('click', function() {
        const input = document.getElementById('portion-number');
        if (parseInt(input.value) > parseInt(input.min)) {
            input.value = parseInt(input.value) - 1;
            updateQuantities(initialPortions, parseInt(input.value));
        }
    });
    
    document.getElementById('increase-portions').addEventListener('click', function() {
        const input = document.getElementById('portion-number');
        if (parseInt(input.value) < parseInt(input.max)) {
            input.value = parseInt(input.value) + 1;
            updateQuantities(initialPortions, parseInt(input.value));
        }
    });
    
    document.getElementById('portion-number').addEventListener('change', function() {
        updateQuantities(initialPortions, parseInt(this.value));
    });
}

/**
 * Ajoute les styles CSS pour le calculateur
 */
function addCalculatorStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .portion-calculator {
            margin: 1.5rem 0;
            padding: 1rem;
            background-color: #f8f9fa;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .portion-calculator-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        
        .portion-controls {
            display: flex;
            align-items: center;
        }
        
        .portion-controls button {
            width: 30px;
            height: 30px;
            border: 1px solid #ddd;
            background: #fff;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .portion-controls button:hover {
            background: #f0f0f0;
        }
        
        #portion-number {
            width: 50px;
            text-align: center;
            margin: 0 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 5px;
        }
        
        .quantity-original {
            display: none;
        }
        
        @media (max-width: 600px) {
            .portion-calculator-inner {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .portion-controls {
                margin-top: 10px;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Identifie les quantités dans la liste d'ingrédients
 */
function identifyIngredientQuantities() {
    // Sélectionner tous les éléments de liste dans la section ingrédients
    const ingredientsSection = document.querySelector('h2:contains("Ingrédients"), h3:contains("Ingrédients")');
    if (!ingredientsSection) return;
    
    // Trouver la liste d'ingrédients qui suit le titre
    const ingredientsList = ingredientsSection.nextElementSibling;
    if (!ingredientsList) return;
    
    // Parcourir tous les éléments de liste
    const listItems = ingredientsList.querySelectorAll('li');
    listItems.forEach(item => {
        // Rechercher les motifs de quantité (nombres suivis d'unités)
        const text = item.textContent;
        const quantityRegex = /(\d+(?:[.,]\d+)?)\s*(g|kg|ml|cl|l|c\.\s*à\s*soupe|c\.\s*à\s*café|cuillère|cuillères|tasse|tasses)/i;
        
        const match = text.match(quantityRegex);
        if (match) {
            // Stocker la quantité originale comme attribut data
            const originalQuantity = parseFloat(match[1].replace(',', '.'));
            
            // Créer un span pour la quantité
            const newText = text.replace(
                match[0],
                `<span class="ingredient-quantity" data-original="${originalQuantity}">${match[0]}</span>`
            );
            
            // Remplacer le contenu de l'élément
            item.innerHTML = newText;
        }
    });
}

/**
 * Met à jour les quantités en fonction du nombre de portions
 * @param {number} initialPortions - Nombre initial de portions
 * @param {number} newPortions - Nouveau nombre de portions
 */
function updateQuantities(initialPortions, newPortions) {
    // Vérifier les valeurs
    if (newPortions < 1) newPortions = 1;
    if (initialPortions < 1) initialPortions = 1;
    
    // Calculer le ratio
    const ratio = newPortions / initialPortions;
    
    // Mettre à jour toutes les quantités
    document.querySelectorAll('.ingredient-quantity').forEach(span => {
        const originalQuantity = parseFloat(span.getAttribute('data-original'));
        const newQuantity = (originalQuantity * ratio).toFixed(1).replace(/\.0$/, '');
        
        // Extraire l'unité de mesure
        const unit = span.textContent.replace(/[\d.,]+/, '').trim();
        
        // Mettre à jour le texte
        span.textContent = `${newQuantity}${unit}`;
    });
}

// Polyfill pour la méthode :contains
if (!HTMLElement.prototype.contains) {
    Element.prototype.contains = function(text) {
        return this.textContent.includes(text);
    };
}
