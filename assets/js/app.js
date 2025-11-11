/**
 * Point d'entrée principal de l'application
 * Responsabilité : Orchestrer l'interaction entre tous les modules
 */

import { CONTENU_DEMO, MESSAGES } from './config/constantes.js';
import { parserMarkdownEnSlides } from './modules/parseurMarkdown.js';
import { genererPresentationHTML } from './modules/generateurPresentation.js';
import {
  lireFichierMarkdown,
  telechargerPresentation,
  configurerDragDrop
} from './modules/gestionnaireFichiers.js';
import { initialiserSelecteurThemes } from './modules/gestionnaireThemes.js';
import {
  calculerStatistiques,
  mettreAJourAffichageStatistiques
} from './utils/statistiques.js';
import { optimiserToutesSlides } from './modules/optimisateurSlides.js';

/**
 * État global de l'application
 */
const etatApplication = {
  markdownActuel: '',
  themeActuel: 'cooperatives',
  presentationHTML: ''
};

/**
 * Éléments DOM de l'interface
 */
let elementsDOM = {};

/**
 * Initialise l'application au chargement de la page
 */
document.addEventListener('DOMContentLoaded', initialiserApplication);

/**
 * Fonction principale d'initialisation
 */
function initialiserApplication() {
  console.log('🚀 Initialisation de l\'application...');

  // Récupérer les éléments DOM
  recupererElementsDOM();

  // Initialiser les gestionnaires d'événements
  initialiserEvenements();

  // Initialiser le sélecteur de thèmes
  etatApplication.themeActuel = initialiserSelecteurThemes(
    elementsDOM.conteneurThemes,
    auChangementDeTheme
  );

  // Charger la démo
  chargerDemoInitiale();

  console.log('✅ Application initialisée');
}

/**
 * Récupère et stocke toutes les références aux éléments DOM
 */
function recupererElementsDOM() {
  elementsDOM = {
    // Zone de dépôt de fichier
    zoneDepot: document.getElementById('zoneDepotFichier'),
    inputFichier: document.getElementById('inputFichier'),

    // Zone de saisie
    zoneTexte: document.getElementById('zoneTexteMarkdown'),

    // Boutons
    boutonGenerer: document.getElementById('boutonGenerer'),
    boutonTelecharger: document.getElementById('boutonTelecharger'),

    // Sélecteur de thème
    conteneurThemes: document.getElementById('conteneurThemes'),

    // Prévisualisation
    iframe: document.getElementById('iframePrevisualisation'),

    // Statistiques
    statistiques: {
      taille: document.getElementById('statTaille'),
      slides: document.getElementById('statSlides'),
      co2: document.getElementById('statCO2')
    }
  };
}

/**
 * Initialise tous les gestionnaires d'événements
 */
function initialiserEvenements() {
  // Clic sur la zone de dépôt
  elementsDOM.zoneDepot.addEventListener('click', () => {
    elementsDOM.inputFichier.click();
  });

  // Sélection de fichier via input
  elementsDOM.inputFichier.addEventListener('change', surSelectionFichier);

  // Configuration du drag & drop
  configurerDragDrop(
    elementsDOM.zoneDepot,
    surDepotFichier,
    surSurvolFichier,
    surSortieSurvol
  );

  // Bouton générer
  elementsDOM.boutonGenerer.addEventListener('click', surClicGenerer);

  // Bouton télécharger
  elementsDOM.boutonTelecharger.addEventListener('click', surClicTelecharger);
}

/**
 * Gère la sélection d'un fichier via l'input
 */
async function surSelectionFichier(evenement) {
  const fichier = evenement.target.files[0];
  if (fichier) {
    await traiterFichierMarkdown(fichier);
  }
}

/**
 * Gère le dépôt d'un fichier (drag & drop)
 */
async function surDepotFichier(fichier) {
  surSortieSurvol();
  await traiterFichierMarkdown(fichier);
}

/**
 * Gère le survol de la zone de dépôt
 */
function surSurvolFichier() {
  elementsDOM.zoneDepot.style.borderColor = 'var(--couleur-orange)';
  elementsDOM.zoneDepot.style.background = 'white';
}

/**
 * Gère la sortie du survol
 */
function surSortieSurvol() {
  elementsDOM.zoneDepot.style.borderColor = '';
  elementsDOM.zoneDepot.style.background = '';
}

/**
 * Traite un fichier Markdown (lecture et génération)
 */
async function traiterFichierMarkdown(fichier) {
  try {
    const contenu = await lireFichierMarkdown(fichier);
    etatApplication.markdownActuel = contenu;
    elementsDOM.zoneTexte.value = contenu;
    genererPresentation();
  } catch (erreur) {
    alert(MESSAGES.ERREUR_LECTURE_FICHIER);
    console.error('Erreur lecture fichier:', erreur);
  }
}

/**
 * Gère le clic sur le bouton Générer
 */
function surClicGenerer() {
  etatApplication.markdownActuel = elementsDOM.zoneTexte.value;

  if (!etatApplication.markdownActuel.trim()) {
    alert(MESSAGES.ERREUR_FICHIER_VIDE);
    return;
  }

  genererPresentation();
}

/**
 * Gère le clic sur le bouton Télécharger
 */
function surClicTelecharger() {
  if (!etatApplication.presentationHTML) {
    alert(MESSAGES.ERREUR_PAS_DE_PRESENTATION);
    return;
  }

  telechargerPresentation(etatApplication.presentationHTML);
}

/**
 * Gère le changement de thème
 */
function auChangementDeTheme(nouveauTheme) {
  etatApplication.themeActuel = nouveauTheme;

  // Régénérer si du contenu existe
  if (etatApplication.markdownActuel) {
    genererPresentation();
  }
}

/**
 * Génère la présentation à partir du Markdown actuel
 */
function genererPresentation() {
  console.log('🎬 Génération de la présentation...');

  try {
    // Parser le Markdown en slides
    const slidesBrutes = parserMarkdownEnSlides(etatApplication.markdownActuel);
    console.log(`📄 ${slidesBrutes.length} slides parsées`);

    // Optimiser les slides (redécoupage intelligent + ajustement taille)
    const slidesOptimisees = optimiserToutesSlides(slidesBrutes);
    console.log(`✨ ${slidesOptimisees.length} slides après optimisation`);

    // Générer le HTML complet
    const html = genererPresentationHTML(slidesOptimisees, etatApplication.themeActuel);
    etatApplication.presentationHTML = html;

    // Afficher dans l'iframe
    elementsDOM.iframe.srcdoc = html;

    // Calculer et afficher les statistiques
    const stats = calculerStatistiques(html, slidesOptimisees.length);
    mettreAJourAffichageStatistiques(stats, elementsDOM.statistiques);

    console.log('✅ Présentation générée:', stats);
  } catch (erreur) {
    console.error('❌ Erreur lors de la génération:', erreur);
    alert('Une erreur est survenue lors de la génération de la présentation.');
  }
}

/**
 * Charge le contenu de démonstration au démarrage
 */
function chargerDemoInitiale() {
  console.log('📚 Chargement de la démo...');

  etatApplication.markdownActuel = CONTENU_DEMO;
  elementsDOM.zoneTexte.value = CONTENU_DEMO;

  genererPresentation();
}
