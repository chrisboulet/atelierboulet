param (
    [string]$Titre
)

if (-not $Titre) {
    $Titre = Read-Host "Titre de la recette"
}

# Slug: remplace les espaces par des tirets, enlève les accents, passe en minuscules
$slug = $Titre -replace '\s+', '-' -replace '[éèêë]', 'e' -replace '[àâä]', 'a' -replace '[îï]', 'i' -replace '[ôö]', 'o' -replace '[ùûü]', 'u'
$slug = $slug.ToLower()

# Générer le fichier
$cmd = ".\/hugo new posts/$slug.md"
Invoke-Expression $cmd

# Ouvrir le fichier dans VS Code (ou Notepad si VS Code non installé)
$fichier = "content/posts/$slug.md"
if (Get-Command code -ErrorAction SilentlyContinue) {
    code $fichier
} else {
    notepad $fichier
}
