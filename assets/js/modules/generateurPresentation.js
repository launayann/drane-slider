/**
 * Module de génération de présentation Reveal.js
 * Responsabilité : Créer le HTML complet d'une présentation autonome
 */

import { THEMES, CONFIGURATION } from '../config/constantes.js';

/**
 * Génère le HTML complet d'une présentation Reveal.js
 * @param {string[]} slides - Tableau de slides HTML
 * @param {string} nomTheme - Nom du thème à appliquer
 * @returns {string} - HTML complet de la présentation
 */
export function genererPresentationHTML(slides, nomTheme) {
  const theme = THEMES[nomTheme];
  const slidesHTML = slides.map(slide => `<section>${slide}</section>`).join('\n');

  return construireDocumentHTML(slidesHTML, theme, slides.length);
}

/**
 * Construit le document HTML complet avec tous les éléments nécessaires
 * @param {string} slidesHTML - Le HTML de toutes les slides
 * @param {object} theme - L'objet de configuration du thème
 * @param {number} nombreSlides - Le nombre total de slides
 * @returns {string} - Le document HTML complet
 */
function construireDocumentHTML(slidesHTML, theme, nombreSlides) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Présentation DRANE</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.min.css">
    <style>
${genererStylesTheme(theme)}
    </style>
</head>
<body>
    <div class="reveal">
        <div class="slides">
${slidesHTML}
        </div>
    </div>

    ${genererControlesPresentation(theme)}
    ${genererBarreProgression(theme)}
    ${genererNumeroSlide(theme, nombreSlides)}
    ${genererPiedDePage(theme)}

    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.min.js"></script>
    <script>
${genererScriptInitialisation()}
    </script>
</body>
</html>`;
}

/**
 * Génère les styles CSS personnalisés pour le thème
 * @param {object} theme - L'objet de configuration du thème
 * @returns {string} - Le CSS du thème
 */
function genererStylesTheme(theme) {
  return `        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Roboto', 'Segoe UI', Arial, sans-serif;
            background: ${theme.arrierePlan};
        }

        .reveal {
            font-size: 38px;
        }

        .reveal .slides {
            text-align: left;
        }

        .reveal section {
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            padding: 60px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .reveal h1 {
            color: ${theme.couleurPrimaire};
            font-size: 2.5em;
            font-weight: 700;
            margin-bottom: 0.5em;
            text-align: center;
        }

        .reveal h2 {
            background: ${theme.couleurSecondaire};
            color: white;
            padding: 20px 30px;
            border-radius: 15px;
            font-size: 1.8em;
            font-weight: 600;
            margin-bottom: 0.8em;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .reveal h3 {
            color: ${theme.couleurPrimaire};
            font-size: 1.4em;
            font-weight: 600;
            margin: 0.8em 0 0.5em 0;
        }

        .reveal p {
            color: #333;
            font-size: 1em;
            line-height: 1.6;
            margin: 0.6em 0;
        }

        .reveal ul {
            list-style: none;
            margin: 1em 0;
        }

        .reveal li {
            color: ${theme.couleurPrimaire};
            font-size: 1em;
            margin: 0.6em 0;
            padding-left: 1.5em;
            position: relative;
            line-height: 1.5;
        }

        .reveal li::before {
            content: '→';
            position: absolute;
            left: 0;
            color: ${theme.couleurSecondaire};
            font-weight: bold;
            font-size: 1.2em;
        }

        .reveal strong {
            color: ${theme.couleurAccent};
            font-weight: 700;
        }

        .reveal em {
            font-style: italic;
            color: ${theme.couleurSecondaire};
        }

        .reveal code {
            background: #f4f4f4;
            padding: 0.2em 0.4em;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            font-size: 0.85em;
            color: #c7254e;
        }

        .reveal a {
            color: ${theme.couleurSecondaire};
            text-decoration: none;
            border-bottom: 2px solid ${theme.couleurSecondaire};
            transition: all 0.3s;
        }

        .reveal a:hover {
            color: ${theme.couleurAccent};
            border-color: ${theme.couleurAccent};
        }

        /* Classes de taille dynamique pour ajustement automatique */
        .taille-tres-petite {
            font-size: 0.75em !important;
        }

        .taille-tres-petite h2 {
            font-size: 1.5em !important;
        }

        .taille-petite {
            font-size: 0.85em !important;
        }

        .taille-petite h2 {
            font-size: 1.6em !important;
        }

        .taille-normale {
            font-size: 1em;
        }

        .taille-grande {
            font-size: 1.15em;
        }

        .taille-grande h2 {
            font-size: 2em;
        }

        /* Animations des fragments */
        .reveal .fragment {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
        }

        .reveal .fragment.visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* Contrôles personnalisés */
        .controles-personnalises {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 100;
            display: flex;
            gap: 10px;
        }

        .bouton-controle {
            background: ${theme.couleurSecondaire};
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 1.5em;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .bouton-controle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        /* Barre de progression */
        .barre-progression {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: rgba(0, 0, 0, 0.1);
            z-index: 100;
        }

        .remplissage-progression {
            height: 100%;
            background: ${theme.couleurSecondaire};
            width: 0%;
            transition: width 0.3s ease;
        }

        /* Numéro de slide */
        .numero-slide {
            position: fixed;
            bottom: 30px;
            left: 30px;
            color: ${theme.couleurPrimaire};
            font-size: 1.2em;
            font-weight: 600;
            z-index: 100;
            background: rgba(255, 255, 255, 0.9);
            padding: 10px 20px;
            border-radius: 25px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        /* Pied de page */
        .pied-de-page {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0.7;
            font-size: 0.8em;
            color: ${theme.couleurPrimaire};
            z-index: 100;
            background: rgba(255, 255, 255, 0.8);
            padding: 8px 20px;
            border-radius: 20px;
        }`;
}

/**
 * Génère les contrôles de navigation personnalisés
 * @param {object} theme - L'objet de configuration du thème
 * @returns {string} - Le HTML des contrôles
 */
function genererControlesPresentation(theme) {
  return `    <div class="controles-personnalises">
        <button class="bouton-controle" onclick="Reveal.prev()" title="Slide précédente">←</button>
        <button class="bouton-controle" onclick="Reveal.next()" title="Slide suivante">→</button>
    </div>`;
}

/**
 * Génère la barre de progression
 * @param {object} theme - L'objet de configuration du thème
 * @returns {string} - Le HTML de la barre de progression
 */
function genererBarreProgression(theme) {
  return `    <div class="barre-progression">
        <div class="remplissage-progression" id="progression"></div>
    </div>`;
}

/**
 * Génère l'affichage du numéro de slide
 * @param {object} theme - L'objet de configuration du thème
 * @param {number} nombreSlides - Le nombre total de slides
 * @returns {string} - Le HTML du numéro de slide
 */
function genererNumeroSlide(theme, nombreSlides) {
  return `    <div class="numero-slide" id="numeroSlide">1 / ${nombreSlides}</div>`;
}

/**
 * Génère le pied de page avec le branding
 * @param {object} theme - L'objet de configuration du thème
 * @returns {string} - Le HTML du pied de page
 */
function genererPiedDePage(theme) {
  return `    <div class="pied-de-page">
        Les coopératives pédagogiques | numériques
    </div>`;
}

/**
 * Génère le script d'initialisation de Reveal.js
 * @returns {string} - Le code JavaScript d'initialisation
 */
function genererScriptInitialisation() {
  return `        // Initialisation de Reveal.js
        Reveal.initialize({
            width: ${CONFIGURATION.DIMENSIONS_SLIDE.largeur},
            height: ${CONFIGURATION.DIMENSIONS_SLIDE.hauteur},
            margin: 0.1,
            minScale: 0.2,
            maxScale: 2.0,

            // Navigation
            controls: false, // On utilise nos contrôles personnalisés
            progress: false, // On utilise notre barre personnalisée
            center: true,
            hash: true,
            slideNumber: false, // On utilise notre affichage personnalisé

            // Transitions
            transition: 'slide', // none/fade/slide/convex/concave/zoom
            transitionSpeed: 'default', // default/fast/slow

            // Fragments
            fragments: true,
            fragmentInURL: true,

            // Plugins
            keyboard: true,
            overview: true,
            touch: true,
            loop: false,
            rtl: false,
            shuffle: false,
            mouseWheel: false,
            hideAddressBar: true,
            previewLinks: false,
        });

        // Mise à jour de la progression et du numéro de slide
        Reveal.on('slidechanged', function(event) {
            const indices = Reveal.getIndices();
            const totalSlides = Reveal.getTotalSlides();
            const pourcentage = ((indices.h + 1) / totalSlides) * 100;

            document.getElementById('progression').style.width = pourcentage + '%';
            document.getElementById('numeroSlide').textContent = (indices.h + 1) + ' / ' + totalSlides;
        });

        // Support du plein écran
        document.addEventListener('keydown', function(e) {
            if (e.key === 'f' || e.key === 'F') {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                }
            }
        });`;
}
