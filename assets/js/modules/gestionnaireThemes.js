/**
 * Module de gestion des thèmes de présentation
 * Responsabilité : Gérer la sélection et l'affichage des thèmes disponibles
 */

import { THEMES } from '../config/constantes.js';

/**
 * Initialise le sélecteur de thèmes dans l'interface
 * @param {HTMLElement} conteneur - L'élément conteneur pour les options de thème
 * @param {Function} auChangementTheme - Callback appelé quand un thème est sélectionné
 * @returns {string} - Le nom du thème par défaut
 */
export function initialiserSelecteurThemes(conteneur, auChangementTheme) {
  conteneur.innerHTML = '';

  let premierTheme = null;

  // Créer une option pour chaque thème
  Object.keys(THEMES).forEach((cle, index) => {
    const theme = THEMES[cle];

    if (index === 0) {
      premierTheme = cle;
    }

    const optionTheme = creerOptionTheme(cle, theme, index === 0);
    optionTheme.addEventListener('click', () => {
      selectionnerTheme(conteneur, optionTheme, cle, auChangementTheme);
    });

    conteneur.appendChild(optionTheme);
  });

  return premierTheme;
}

/**
 * Crée un élément DOM pour une option de thème
 * @param {string} cleTheme - La clé du thème
 * @param {object} theme - L'objet de configuration du thème
 * @param {boolean} estSelectionne - Si ce thème est sélectionné par défaut
 * @returns {HTMLElement} - L'élément DOM de l'option
 */
function creerOptionTheme(cleTheme, theme, estSelectionne) {
  const option = document.createElement('div');
  option.className = 'option-theme';
  option.dataset.theme = cleTheme;

  if (estSelectionne) {
    option.classList.add('selectionnee');
  }

  // Créer la prévisualisation colorée
  const previsualisation = document.createElement('div');
  previsualisation.className = 'previsualisation-theme';
  previsualisation.style.background = theme.previsualisation;

  // Créer le nom du thème
  const nom = document.createElement('div');
  nom.className = 'nom-theme';
  nom.textContent = theme.nom;

  option.appendChild(previsualisation);
  option.appendChild(nom);

  return option;
}

/**
 * Gère la sélection d'un thème
 * @param {HTMLElement} conteneur - Le conteneur des options de thème
 * @param {HTMLElement} optionSelectionnee - L'option qui vient d'être cliquée
 * @param {string} nomTheme - Le nom du thème sélectionné
 * @param {Function} callback - Fonction à appeler avec le nom du thème
 */
function selectionnerTheme(conteneur, optionSelectionnee, nomTheme, callback) {
  // Retirer la classe 'selectionnee' de toutes les options
  conteneur.querySelectorAll('.option-theme').forEach(option => {
    option.classList.remove('selectionnee');
  });

  // Ajouter la classe à l'option sélectionnée
  optionSelectionnee.classList.add('selectionnee');

  // Appeler le callback avec le nom du thème
  if (callback) {
    callback(nomTheme);
  }
}

/**
 * Obtient la configuration d'un thème par son nom
 * @param {string} nomTheme - Le nom du thème
 * @returns {object} - La configuration du thème
 */
export function obtenirTheme(nomTheme) {
  return THEMES[nomTheme] || THEMES.cooperatives;
}

/**
 * Obtient la liste de tous les thèmes disponibles
 * @returns {object} - Objet contenant tous les thèmes
 */
export function obtenirTousLesThemes() {
  return THEMES;
}
