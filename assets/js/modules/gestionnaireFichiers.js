/**
 * Module de gestion des fichiers (import/export)
 * Responsabilité : Gérer la lecture de fichiers Markdown et l'export de présentations
 */

import { MESSAGES, CONFIGURATION } from '../config/constantes.js';

/**
 * Lit un fichier Markdown et retourne son contenu
 * @param {File} fichier - L'objet File à lire
 * @returns {Promise<string>} - Promesse contenant le contenu du fichier
 */
export function lireFichierMarkdown(fichier) {
  return new Promise((resoudre, rejeter) => {
    const lecteur = new FileReader();

    lecteur.onload = (evenement) => {
      resoudre(evenement.target.result);
    };

    lecteur.onerror = () => {
      rejeter(new Error(MESSAGES.ERREUR_LECTURE_FICHIER));
    };

    lecteur.readAsText(fichier);
  });
}

/**
 * Télécharge le HTML de la présentation en tant que fichier
 * @param {string} contenuHTML - Le contenu HTML à télécharger
 * @param {string} nomFichier - Le nom du fichier (optionnel)
 */
export function telechargerPresentation(contenuHTML, nomFichier = CONFIGURATION.NOM_FICHIER_EXPORT) {
  // Créer un Blob avec le contenu HTML
  const blob = new Blob([contenuHTML], { type: 'text/html;charset=utf-8' });

  // Créer une URL temporaire pour le Blob
  const url = URL.createObjectURL(blob);

  // Créer un lien de téléchargement invisible
  const lienTelechargement = document.createElement('a');
  lienTelechargement.href = url;
  lienTelechargement.download = nomFichier;

  // Déclencher le téléchargement
  document.body.appendChild(lienTelechargement);
  lienTelechargement.click();

  // Nettoyer
  document.body.removeChild(lienTelechargement);
  URL.revokeObjectURL(url);
}

/**
 * Valide qu'un fichier est bien un fichier Markdown ou texte
 * @param {File} fichier - Le fichier à valider
 * @returns {boolean} - True si le fichier est valide
 */
export function estFichierMarkdownValide(fichier) {
  const extensionsValides = ['.md', '.txt', '.markdown'];
  const nomFichier = fichier.name.toLowerCase();

  return extensionsValides.some(ext => nomFichier.endsWith(ext));
}

/**
 * Gère l'événement de drop (glisser-déposer) de fichier
 * @param {DragEvent} evenement - L'événement de drop
 * @param {Function} callback - Fonction à appeler avec le fichier
 */
export function gererDepotFichier(evenement, callback) {
  evenement.preventDefault();
  evenement.stopPropagation();

  const fichiers = evenement.dataTransfer.files;

  if (fichiers.length > 0) {
    const fichier = fichiers[0];

    if (estFichierMarkdownValide(fichier)) {
      callback(fichier);
    } else {
      alert('⚠️ Veuillez déposer un fichier Markdown (.md ou .txt)');
    }
  }
}

/**
 * Configure les événements de drag & drop sur un élément
 * @param {HTMLElement} element - L'élément sur lequel configurer le drag & drop
 * @param {Function} surDepot - Callback appelé quand un fichier est déposé
 * @param {Function} surSurvol - Callback appelé quand un fichier survole (optionnel)
 * @param {Function} surSortie - Callback appelé quand le survol se termine (optionnel)
 */
export function configurerDragDrop(element, surDepot, surSurvol = null, surSortie = null) {
  // Empêcher le comportement par défaut pour tous les événements de drag
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(nomEvenement => {
    element.addEventListener(nomEvenement, (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  // Gérer le survol
  if (surSurvol) {
    ['dragenter', 'dragover'].forEach(nomEvenement => {
      element.addEventListener(nomEvenement, surSurvol);
    });
  }

  // Gérer la sortie du survol
  if (surSortie) {
    element.addEventListener('dragleave', surSortie);
  }

  // Gérer le dépôt
  element.addEventListener('drop', (e) => {
    gererDepotFichier(e, surDepot);
  });
}
