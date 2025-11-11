/**
 * Module de calcul des statistiques
 * Responsabilité : Calculer et formater les statistiques de la présentation
 */

import { CONFIGURATION } from '../config/constantes.js';

/**
 * Calcule toutes les statistiques d'une présentation
 * @param {string} contenuHTML - Le contenu HTML de la présentation
 * @param {number} nombreSlides - Le nombre de slides
 * @returns {object} - Objet contenant toutes les statistiques
 */
export function calculerStatistiques(contenuHTML, nombreSlides) {
  const tailleEnOctets = new Blob([contenuHTML]).size;
  const tailleEnKo = tailleEnOctets / 1024;

  return {
    taille: formaterTaille(tailleEnKo),
    tailleEnKo: tailleEnKo,
    nombreSlides: nombreSlides,
    co2Economise: calculerCO2Economise(tailleEnKo)
  };
}

/**
 * Formate une taille en Ko de manière lisible
 * @param {number} tailleEnKo - La taille en Ko
 * @returns {string} - La taille formatée (ex: "45.2 KB")
 */
function formaterTaille(tailleEnKo) {
  return tailleEnKo.toFixed(1) + ' KB';
}

/**
 * Calcule l'estimation de CO2 économisé par rapport à une présentation PowerPoint
 * Basé sur une estimation moyenne de 1500 KB pour un PowerPoint
 * @param {number} tailleEnKo - La taille de la présentation en Ko
 * @returns {string} - Le CO2 économisé formaté (ex: "850g")
 */
function calculerCO2Economise(tailleEnKo) {
  const economie = (CONFIGURATION.TAILLE_REFERENCE_CO2 - tailleEnKo) * CONFIGURATION.FACTEUR_CO2;
  const economieArrondie = Math.max(0, Math.round(economie));

  return economieArrondie + 'g';
}

/**
 * Met à jour l'affichage des statistiques dans l'interface
 * @param {object} stats - Objet contenant les statistiques
 * @param {object} elements - Objet contenant les éléments DOM à mettre à jour
 */
export function mettreAJourAffichageStatistiques(stats, elements) {
  if (elements.taille) {
    elements.taille.textContent = stats.taille;
  }

  if (elements.slides) {
    elements.slides.textContent = stats.nombreSlides;
  }

  if (elements.co2) {
    elements.co2.textContent = stats.co2Economise;
  }
}

/**
 * Crée un rapport textuel des statistiques
 * @param {object} stats - Objet contenant les statistiques
 * @returns {string} - Rapport formaté en texte
 */
export function creerRapportStatistiques(stats) {
  return `Statistiques de la présentation :
- Poids total : ${stats.taille}
- Nombre de slides : ${stats.nombreSlides}
- CO₂ économisé : ${stats.co2Economise}

Cette présentation HTML est ${Math.round((1 - stats.tailleEnKo / CONFIGURATION.TAILLE_REFERENCE_CO2) * 100)}% plus légère qu'un PowerPoint classique.`;
}
