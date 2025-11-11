/**
 * Constantes de configuration de l'application
 * Centralise toutes les valeurs fixes pour faciliter la maintenance
 */

export const CONFIGURATION = {
  // Types de fichiers acceptés pour l'import
  TYPES_FICHIERS_ACCEPTES: '.md,.txt',

  // Nom du fichier par défaut lors de l'export
  NOM_FICHIER_EXPORT: 'presentation-drane.html',

  // Délai d'animation des fragments (en ms)
  DELAI_ANIMATION_FRAGMENTS: 200,

  // Dimensions de la slide
  DIMENSIONS_SLIDE: {
    largeur: 960,
    hauteur: 700
  },

  // Facteur de calcul CO2 (estimation en grammes par Ko)
  FACTEUR_CO2: 0.6,

  // Taille de référence pour le calcul d'économie CO2 (en Ko)
  TAILLE_REFERENCE_CO2: 1500
};

/**
 * Définition des thèmes de présentation
 * Chaque thème contient les couleurs principales pour styliser les slides
 */
export const THEMES = {
  cooperatives: {
    nom: 'Coopératives',
    arrierePlan: 'linear-gradient(135deg, #AFDCE1 0%, #ffffff 100%)',
    couleurPrimaire: '#133D69',
    couleurSecondaire: '#F6A02D',
    couleurAccent: '#E73334',
    previsualisation: 'linear-gradient(135deg, #F6A02D, #E73334)'
  },

  minimal: {
    nom: 'Minimal',
    arrierePlan: '#f8f9fa',
    couleurPrimaire: '#2c3e50',
    couleurSecondaire: '#3498db',
    couleurAccent: '#e74c3c',
    previsualisation: 'linear-gradient(135deg, #2c3e50, #34495e)'
  },

  nature: {
    nom: 'Nature',
    arrierePlan: 'linear-gradient(135deg, #e8f8f5 0%, #ffffff 100%)',
    couleurPrimaire: '#27ae60',
    couleurSecondaire: '#2ecc71',
    couleurAccent: '#16a085',
    previsualisation: 'linear-gradient(135deg, #27ae60, #2ecc71)'
  }
};

/**
 * Messages d'alerte pour l'utilisateur
 */
export const MESSAGES = {
  ERREUR_FICHIER_VIDE: '⚠️ Veuillez saisir ou charger du contenu Markdown',
  ERREUR_LECTURE_FICHIER: '❌ Erreur lors de la lecture du fichier',
  ERREUR_PAS_DE_PRESENTATION: '⚠️ Veuillez d\'abord générer une présentation',
  SUCCES_GENERATION: '✅ Présentation générée avec succès'
};

/**
 * Contenu Markdown de démonstration
 * Chargé automatiquement au démarrage de l'application
 */
export const CONTENU_DEMO = `# L'art du Prompt

## Bienvenue 👋

Formation sur les bonnes pratiques du prompting avec l'IA

---

## Définir le cadre d'interaction

- **Donner un rôle** : indiquer la posture attendue de l'IA
- **Donner du contexte** : plus d'informations = meilleure réponse
- **Préciser les contraintes** : format, longueur, ton

---

## Clarifier le format attendu

- Spécifier le format de sortie souhaité
- Structurer avec des séparateurs clairs
- Donner des exemples concrets
- Utiliser des listes pour organiser les idées

---

## Améliorer la qualité des réponses

**Itérer et affiner** progressivement vos prompts

**Être précis et clair** dans vos demandes

**Contextualiser** avec des exemples pertinents

---

## Bonnes pratiques

- Commencer simple puis complexifier
- Tester et ajuster vos prompts
- Demander des explications si besoin
- Utiliser le vocabulaire approprié

---

## Merci ! 🎉

Des questions ?

*Les coopératives pédagogiques | numériques*`;
