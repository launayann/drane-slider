/**
 * Module d'optimisation automatique des slides
 * Responsabilité : Redécouper intelligemment les slides pour un affichage optimal
 */

import { CONFIGURATION } from '../config/constantes.js';

/**
 * Configuration pour l'optimisation des slides
 */
const CONFIG_OPTIMISATION = {
  // Nombre maximum de caractères par slide
  CARACTERES_MAX_PAR_SLIDE: 800,

  // Nombre maximum de lignes par slide
  LIGNES_MAX_PAR_SLIDE: 15,

  // Nombre maximum d'éléments de liste par slide
  ELEMENTS_LISTE_MAX: 8,

  // Mots de coupure prioritaires (fin de phrase logique)
  MOTS_COUPURE: ['.', '!', '?', ':', ';'],

  // Ratio de remplissage idéal d'une slide
  RATIO_REMPLISSAGE_IDEAL: 0.75
};

/**
 * Optimise une slide en la redécoupant si nécessaire
 * @param {string} contenuHTML - Le contenu HTML de la slide
 * @param {object} metadonnees - Métadonnées de la slide (titre, type, etc.)
 * @returns {string[]} - Tableau de slides optimisées
 */
export function optimiserSlide(contenuHTML, metadonnees = {}) {
  // Analyser le contenu de la slide
  const analyse = analyserContenuSlide(contenuHTML);

  // Si la slide est déjà optimale, la retourner telle quelle
  if (estSlideOptimale(analyse)) {
    return [contenuHTML];
  }

  // Sinon, redécouper intelligemment
  return redecouperSlideIntelligente(contenuHTML, analyse, metadonnees);
}

/**
 * Analyse le contenu d'une slide pour déterminer ses caractéristiques
 * @param {string} contenuHTML - Le contenu HTML de la slide
 * @returns {object} - Objet d'analyse avec les métriques
 */
function analyserContenuSlide(contenuHTML) {
  // Créer un élément temporaire pour parser le HTML
  const temp = document.createElement('div');
  temp.innerHTML = contenuHTML;

  // Extraire les différents éléments
  const titres = temp.querySelectorAll('h1, h2, h3');
  const paragraphes = temp.querySelectorAll('p');
  const listes = temp.querySelectorAll('ul, ol');
  const elementsListe = temp.querySelectorAll('li');

  // Calculer le texte total (sans balises)
  const texteComplet = temp.textContent || temp.innerText || '';
  const nombreCaracteres = texteComplet.trim().length;
  const nombreLignes = texteComplet.split('\n').filter(l => l.trim()).length;
  const nombreMots = texteComplet.trim().split(/\s+/).length;

  return {
    contenuHTML,
    nombreCaracteres,
    nombreLignes,
    nombreMots,
    nombreTitres: titres.length,
    nombreParagraphes: paragraphes.length,
    nombreListes: listes.length,
    nombreElementsListe: elementsListe.length,
    elements: {
      titres: Array.from(titres),
      paragraphes: Array.from(paragraphes),
      listes: Array.from(listes),
      elementsListe: Array.from(elementsListe)
    },
    texteComplet
  };
}

/**
 * Détermine si une slide est déjà dans un état optimal
 * @param {object} analyse - L'objet d'analyse de la slide
 * @returns {boolean} - True si la slide est optimale
 */
function estSlideOptimale(analyse) {
  // Une slide est optimale si :
  // 1. Elle n'est pas trop longue en caractères
  if (analyse.nombreCaracteres > CONFIG_OPTIMISATION.CARACTERES_MAX_PAR_SLIDE) {
    return false;
  }

  // 2. Elle n'a pas trop d'éléments de liste
  if (analyse.nombreElementsListe > CONFIG_OPTIMISATION.ELEMENTS_LISTE_MAX) {
    return false;
  }

  // 3. Le nombre de lignes est raisonnable
  if (analyse.nombreLignes > CONFIG_OPTIMISATION.LIGNES_MAX_PAR_SLIDE) {
    return false;
  }

  return true;
}

/**
 * Redécoupe intelligemment une slide trop longue
 * @param {string} contenuHTML - Le contenu HTML original
 * @param {object} analyse - L'analyse du contenu
 * @param {object} metadonnees - Métadonnées de la slide
 * @returns {string[]} - Tableau de nouvelles slides
 */
function redecouperSlideIntelligente(contenuHTML, analyse, metadonnees) {
  const nouvellesSlides = [];

  // Cas 1 : Trop d'éléments de liste
  if (analyse.nombreElementsListe > CONFIG_OPTIMISATION.ELEMENTS_LISTE_MAX) {
    return redecouperParListes(analyse);
  }

  // Cas 2 : Trop de paragraphes
  if (analyse.nombreParagraphes > 4) {
    return redecouperParParagraphes(analyse);
  }

  // Cas 3 : Un seul gros bloc de texte
  if (analyse.nombreParagraphes <= 2 && analyse.nombreCaracteres > CONFIG_OPTIMISATION.CARACTERES_MAX_PAR_SLIDE) {
    return redecouperParPhrasesLogiques(analyse);
  }

  // Par défaut, garder la slide originale
  return [contenuHTML];
}

/**
 * Redécoupe une slide en fonction des listes
 * @param {object} analyse - L'analyse du contenu
 * @returns {string[]} - Tableau de nouvelles slides
 */
function redecouperParListes(analyse) {
  const nouvellesSlides = [];
  let slideActuelle = [];
  let compteurElements = 0;

  // Récupérer le titre principal s'il existe
  const titrePrincipal = analyse.elements.titres.length > 0
    ? analyse.elements.titres[0].outerHTML
    : '';

  // Parcourir les éléments de liste
  for (const elementListe of analyse.elements.elementsListe) {
    slideActuelle.push(elementListe.outerHTML);
    compteurElements++;

    // Si on atteint la limite, créer une nouvelle slide
    if (compteurElements >= CONFIG_OPTIMISATION.ELEMENTS_LISTE_MAX) {
      const contenuSlide = titrePrincipal + '<ul class="fragment">' + slideActuelle.join('') + '</ul>';
      nouvellesSlides.push(contenuSlide);
      slideActuelle = [];
      compteurElements = 0;
    }
  }

  // Ajouter les éléments restants
  if (slideActuelle.length > 0) {
    const contenuSlide = titrePrincipal + '<ul class="fragment">' + slideActuelle.join('') + '</ul>';
    nouvellesSlides.push(contenuSlide);
  }

  return nouvellesSlides;
}

/**
 * Redécoupe une slide en fonction des paragraphes
 * @param {object} analyse - L'analyse du contenu
 * @returns {string[]} - Tableau de nouvelles slides
 */
function redecouperParParagraphes(analyse) {
  const nouvellesSlides = [];
  let slideActuelle = [];
  let caracteresCourants = 0;

  // Récupérer le titre principal
  const titrePrincipal = analyse.elements.titres.length > 0
    ? analyse.elements.titres[0].outerHTML
    : '';

  for (const paragraphe of analyse.elements.paragraphes) {
    const longueurParagraphe = (paragraphe.textContent || '').length;

    // Si ajouter ce paragraphe dépasse la limite, créer une nouvelle slide
    if (caracteresCourants + longueurParagraphe > CONFIG_OPTIMISATION.CARACTERES_MAX_PAR_SLIDE && slideActuelle.length > 0) {
      const contenuSlide = titrePrincipal + slideActuelle.join('');
      nouvellesSlides.push(contenuSlide);
      slideActuelle = [];
      caracteresCourants = 0;
    }

    slideActuelle.push(paragraphe.outerHTML);
    caracteresCourants += longueurParagraphe;
  }

  // Ajouter les paragraphes restants
  if (slideActuelle.length > 0) {
    const contenuSlide = titrePrincipal + slideActuelle.join('');
    nouvellesSlides.push(contenuSlide);
  }

  return nouvellesSlides.length > 0 ? nouvellesSlides : [analyse.contenuHTML];
}

/**
 * Redécoupe une slide par phrases logiques (points, etc.)
 * @param {object} analyse - L'analyse du contenu
 * @returns {string[]} - Tableau de nouvelles slides
 */
function redecouperParPhrasesLogiques(analyse) {
  const nouvellesSlides = [];
  const texte = analyse.texteComplet;

  // Récupérer le titre
  const titrePrincipal = analyse.elements.titres.length > 0
    ? analyse.elements.titres[0].outerHTML
    : '';

  // Séparer par phrases (points, points d'exclamation, etc.)
  const phrases = texte.split(/([.!?]+\s+)/).filter(p => p.trim());

  let slideActuelle = [];
  let caracteresCourants = 0;

  for (let i = 0; i < phrases.length; i++) {
    const phrase = phrases[i];
    const longueurPhrase = phrase.length;

    // Si ajouter cette phrase dépasse la limite, créer une nouvelle slide
    if (caracteresCourants + longueurPhrase > CONFIG_OPTIMISATION.CARACTERES_MAX_PAR_SLIDE && slideActuelle.length > 0) {
      const contenuSlide = titrePrincipal + '<p>' + slideActuelle.join(' ') + '</p>';
      nouvellesSlides.push(contenuSlide);
      slideActuelle = [];
      caracteresCourants = 0;
    }

    slideActuelle.push(phrase);
    caracteresCourants += longueurPhrase;
  }

  // Ajouter les phrases restantes
  if (slideActuelle.length > 0) {
    const contenuSlide = titrePrincipal + '<p>' + slideActuelle.join(' ') + '</p>';
    nouvellesSlides.push(contenuSlide);
  }

  return nouvellesSlides.length > 0 ? nouvellesSlides : [analyse.contenuHTML];
}

/**
 * Calcule la classe de taille de police appropriée pour une slide
 * @param {object} analyse - L'analyse du contenu
 * @returns {string} - Classe CSS pour la taille de police
 */
export function calculerTaillePolice(analyse) {
  // Calculer un score de densité
  const scoreCaracteres = analyse.nombreCaracteres / CONFIG_OPTIMISATION.CARACTERES_MAX_PAR_SLIDE;
  const scoreElements = (analyse.nombreElementsListe + analyse.nombreParagraphes) / 10;
  const scoreDensite = (scoreCaracteres + scoreElements) / 2;

  // Retourner une classe CSS appropriée
  if (scoreDensite > 0.9) {
    return 'taille-tres-petite'; // 0.75em
  } else if (scoreDensite > 0.7) {
    return 'taille-petite'; // 0.85em
  } else if (scoreDensite < 0.3) {
    return 'taille-grande'; // 1.15em
  }

  return 'taille-normale'; // 1em
}

/**
 * Optimise toutes les slides d'une présentation
 * @param {string[]} slides - Tableau de slides HTML
 * @returns {string[]} - Tableau de slides optimisées
 */
export function optimiserToutesSlides(slides) {
  const slidesOptimisees = [];

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const analyse = analyserContenuSlide(slide);

    // Optimiser la slide
    const slidesRedecoupees = optimiserSlide(slide, { index: i });

    // Ajouter les classes de taille appropriées
    slidesRedecoupees.forEach(slideRedecoupee => {
      const analyseRedecoupee = analyserContenuSlide(slideRedecoupee);
      const classeTaille = calculerTaillePolice(analyseRedecoupee);

      // Wrapper avec la classe de taille
      const slideAvecTaille = `<div class="${classeTaille}">${slideRedecoupee}</div>`;
      slidesOptimisees.push(slideAvecTaille);
    });
  }

  return slidesOptimisees;
}
