param (
    [string]$Titre,
    [string]$Type = "",
    [string]$Difficulte = "",
    [int]$TempsPrep = 0,
    [int]$TempsCuisson = 0,
    [int]$Portions = 0
)

# Demander les informations manquantes
if (-not $Titre) {
    $Titre = Read-Host "Titre de la recette"
}

if (-not $Type) {
    $Type = Read-Host "Type de plat (entrée, plat principal, dessert, apéritif...)"
    if (-not $Type) { $Type = "plat principal" }
}

if (-not $Difficulte) {
    $Difficulte = Read-Host "Difficulté (facile, moyen, difficile)"
    if (-not $Difficulte) { $Difficulte = "facile" }
}

if ($TempsPrep -eq 0) {
    $tempInput = Read-Host "Temps de préparation (en minutes)"
    if ([int]::TryParse($tempInput, [ref]$TempsPrep)) {
        # Conversion réussie
    } else {
        $TempsPrep = 15
    }
}

if ($TempsCuisson -eq 0) {
    $tempInput = Read-Host "Temps de cuisson (en minutes)"
    if ([int]::TryParse($tempInput, [ref]$TempsCuisson)) {
        # Conversion réussie
    } else {
        $TempsCuisson = 30
    }
}

if ($Portions -eq 0) {
    $tempInput = Read-Host "Nombre de portions"
    if ([int]::TryParse($tempInput, [ref]$Portions)) {
        # Conversion réussie
    } else {
        $Portions = 4
    }
}

# Calculer le temps total
$TempsTotal = $TempsPrep + $TempsCuisson

# Slug: remplace les espaces par des tirets, enlève les accents, passe en minuscules
$slug = $Titre -replace '\s+', '-' -replace '[éèêë]', 'e' -replace '[àâä]', 'a' -replace '[îï]', 'i' -replace '[ôö]', 'o' -replace '[ùûü]', 'u'
$slug = $slug.ToLower()

# Générer le fichier
$cmd = ".\/hugo new posts/$slug.md"
Invoke-Expression $cmd

# Mettre à jour le frontmatter avec les informations collectées
$fichier = "content/posts/$slug.md"
$content = Get-Content -Path $fichier -Raw

# Remplacer les valeurs par défaut par celles fournies
$content = $content -replace 'types: \["plat principal"\]', "types: [`"$Type`"]"
$content = $content -replace 'difficulties: \["facile"\]', "difficulties: [`"$Difficulte`"]"
$content = $content -replace 'tempsPreparation: 15', "tempsPreparation: $TempsPrep"
$content = $content -replace 'tempsCuisson: 30', "tempsCuisson: $TempsCuisson"
$content = $content -replace 'tempsTotal: 45', "tempsTotal: $TempsTotal"
$content = $content -replace 'portions: 4', "portions: $Portions"

# Écrire le contenu mis à jour
Set-Content -Path $fichier -Value $content

# Ouvrir le fichier dans VS Code (ou Notepad si VS Code non installé)
if (Get-Command code -ErrorAction SilentlyContinue) {
    code $fichier
} else {
    notepad $fichier
}

Write-Host "Recette '$Titre' créée avec succès!" -ForegroundColor Green
Write-Host "Type: $Type | Difficulté: $Difficulte | Préparation: $TempsPrep min | Cuisson: $TempsCuisson min | Portions: $Portions" -ForegroundColor Cyan
