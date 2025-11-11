/**
 * Module de parsing Markdown vers HTML
 * Responsabilité : Transformer le contenu Markdown en slides HTML structurées
 */

/**
 * Parse le contenu Markdown et le sépare en slides individuelles
 * @param {string} markdown - Le contenu Markdown brut
 * @returns {string[]} - Tableau de slides HTML
 */
export function parserMarkdownEnSlides(markdown) {
  // Nettoyer le markdown des balises HTML potentiellement dangereuses
  markdown = nettoyerMarkdown(markdown);

  // Séparer le contenu en slides
  let slides = separerEnSlides(markdown);

  // Traiter chaque slide individuellement
  return slides.map(slide => traiterSlide(slide));
}

/**
 * Nettoie le markdown en supprimant les balises HTML et en normalisant les séparateurs
 * @param {string} markdown - Le contenu Markdown brut
 * @returns {string} - Le contenu nettoyé
 */
function nettoyerMarkdown(markdown) {
  return markdown
    .replace(/<[^>]*>/g, '') // Supprimer toutes les balises HTML
    .replace(/^---+$/gm, '\n---\n') // Normaliser les séparateurs de slides
    .trim();
}

/**
 * Sépare le markdown en slides individuelles
 * Utilise soit le séparateur --- soit les titres de niveau 2 (##)
 * @param {string} markdown - Le contenu Markdown nettoyé
 * @returns {string[]} - Tableau de slides brutes
 */
function separerEnSlides(markdown) {
  // Essayer de séparer par ---
  let slides = markdown.split(/\n---\n/).filter(s => s.trim());

  // Si une seule slide trouvée, essayer de séparer par ##
  if (slides.length === 1) {
    slides = markdown.split(/(?=\n##\s)/g).filter(s => s.trim());
  }

  return slides;
}

/**
 * Traite une slide individuelle en convertissant le Markdown en HTML
 * @param {string} texteSlide - Le contenu Markdown de la slide
 * @returns {string} - Le HTML de la slide
 */
function traiterSlide(texteSlide) {
  texteSlide = texteSlide.trim();

  // Convertir les éléments Markdown simples
  texteSlide = convertirTitres(texteSlide);
  texteSlide = convertirFormatageTexte(texteSlide);
  texteSlide = convertirCode(texteSlide);
  texteSlide = convertirLiens(texteSlide);

  // Traiter les listes qui nécessitent un traitement ligne par ligne
  return traiterListes(texteSlide);
}

/**
 * Convertit les titres Markdown en balises HTML
 * @param {string} texte - Le texte à convertir
 * @returns {string} - Le texte avec les titres convertis
 */
function convertirTitres(texte) {
  return texte
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>');
}

/**
 * Convertit le formatage de texte (gras, italique)
 * @param {string} texte - Le texte à convertir
 * @returns {string} - Le texte avec le formatage converti
 */
function convertirFormatageTexte(texte) {
  return texte
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Gras
    .replace(/\*(.+?)\*/g, '<em>$1</em>'); // Italique
}

/**
 * Convertit le code inline
 * @param {string} texte - Le texte à convertir
 * @returns {string} - Le texte avec le code converti
 */
function convertirCode(texte) {
  return texte.replace(/`([^`]+)`/g, '<code>$1</code>');
}

/**
 * Convertit les liens Markdown en balises <a>
 * @param {string} texte - Le texte à convertir
 * @returns {string} - Le texte avec les liens convertis
 */
function convertirLiens(texte) {
  return texte.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
}

/**
 * Traite les listes en les regroupant dans des balises <ul>
 * Ajoute la classe "fragment" pour les animations Reveal.js
 * @param {string} texte - Le texte à traiter
 * @returns {string} - Le HTML avec les listes structurées
 */
function traiterListes(texte) {
  const lignes = texte.split('\n');
  const resultat = [];
  let dansListe = false;
  let elementsListe = [];

  for (const ligne of lignes) {
    const lignePropre = ligne.trim();

    // Détecter une ligne de liste (- ou * ou numéro.)
    if (estLigneDeListe(lignePropre)) {
      if (!dansListe) {
        dansListe = true;
        elementsListe = [];
      }

      const contenu = extraireContenuListe(lignePropre);
      elementsListe.push(`<li>${contenu}</li>`);
    } else {
      // Si on sort d'une liste, la fermer
      if (dansListe) {
        resultat.push(creerListeHTML(elementsListe));
        dansListe = false;
        elementsListe = [];
      }

      // Ajouter la ligne courante
      if (lignePropre) {
        resultat.push(formaterLigneNonListe(lignePropre));
      }
    }
  }

  // Fermer une éventuelle liste en fin de texte
  if (dansListe && elementsListe.length > 0) {
    resultat.push(creerListeHTML(elementsListe));
  }

  return resultat.join('\n');
}

/**
 * Vérifie si une ligne est un élément de liste
 * @param {string} ligne - La ligne à tester
 * @returns {boolean} - True si c'est une ligne de liste
 */
function estLigneDeListe(ligne) {
  return ligne.match(/^[-\*]\s+(.+)$/) || ligne.match(/^\d+\.\s+(.+)$/);
}

/**
 * Extrait le contenu d'une ligne de liste (sans le marqueur)
 * @param {string} ligne - La ligne de liste
 * @returns {string} - Le contenu sans le marqueur
 */
function extraireContenuListe(ligne) {
  return ligne.replace(/^[-\*]\s+/, '').replace(/^\d+\.\s+/, '');
}

/**
 * Crée une liste HTML avec la classe fragment pour Reveal.js
 * @param {string[]} elements - Tableau d'éléments <li>
 * @returns {string} - La liste HTML complète
 */
function creerListeHTML(elements) {
  return `<ul class="fragment">${elements.join('')}</ul>`;
}

/**
 * Formate une ligne qui n'est pas dans une liste
 * @param {string} ligne - La ligne à formater
 * @returns {string} - La ligne formatée en HTML
 */
function formaterLigneNonListe(ligne) {
  // Si c'est déjà une balise HTML, la retourner telle quelle
  if (ligne.startsWith('<h') || ligne.startsWith('<ul')) {
    return ligne;
  }

  // Sinon, l'encapsuler dans un paragraphe
  return `<p>${ligne}</p>`;
}
