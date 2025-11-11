# Générateur de Présentations DRANE 🎬

Application web éco-responsable pour créer des présentations HTML à partir de fichiers Markdown, basée sur Reveal.js.

## 🏗️ Architecture du Projet

### Structure des Fichiers

```
Générateur-Présentations-DRANE/
├── index.html                      # Point d'entrée HTML
├── README.md                       # Cette documentation
├── assets/
│   ├── css/
│   │   ├── variables.css          # Variables CSS (couleurs, espacements)
│   │   └── composants.css         # Styles des composants UI
│   └── js/
│       ├── config/
│       │   └── constantes.js      # Configuration et constantes
│       ├── modules/
│       │   ├── parseurMarkdown.js         # Parse Markdown → HTML
│       │   ├── generateurPresentation.js  # Génère HTML Reveal.js
│       │   ├── gestionnaireFichiers.js    # Import/Export fichiers
│       │   └── gestionnaireThemes.js      # Sélection thèmes
│       ├── utils/
│       │   └── statistiques.js    # Calcul stats (poids, CO2)
│       └── app.js                  # Orchestration principale
```

### Principes d'Architecture

#### 1. Séparation des Responsabilités

Chaque module a une **responsabilité unique et claire** :

- **parseurMarkdown.js** : Transforme le Markdown en HTML
- **generateurPresentation.js** : Crée le document HTML Reveal.js complet
- **gestionnaireFichiers.js** : Gère la lecture/écriture de fichiers
- **gestionnaireThemes.js** : Gère les thèmes visuels
- **statistiques.js** : Calcule les métriques de la présentation
- **app.js** : Orchestre l'interaction entre tous les modules

#### 2. Modularité

Utilisation des **modules ES6** (`import`/`export`) pour :
- Éviter la pollution de l'espace global
- Faciliter les tests unitaires
- Permettre la réutilisation du code
- Améliorer la maintenabilité

#### 3. Configuration Centralisée

Le fichier `constantes.js` centralise :
- Les valeurs de configuration
- Les messages utilisateur
- Les thèmes de présentation
- Le contenu de démonstration

**Avantage** : Modifier une valeur à un seul endroit

#### 4. Lisibilité et Documentation

- **Noms en français** : Variables et fonctions explicites
- **Commentaires JSDoc** : Documentation de chaque fonction
- **Fonctions courtes** : Une fonction = une action
- **Constantes nommées** : Pas de valeurs magiques

## 🚀 Utilisation

### Lancement de l'Application

1. Ouvrir `index.html` dans un navigateur moderne
2. L'application se charge avec une présentation de démonstration

⚠️ **Important** : À cause des modules ES6, l'application doit être servie via HTTP(S), pas en `file://`

**Solution simple** : Utiliser un serveur local

```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server

# Avec PHP
php -S localhost:8000
```

Puis accéder à : `http://localhost:8000`

### Fonctionnalités

#### 1. Import de Fichier Markdown

- **Cliquer** sur la zone de dépôt
- **Glisser-déposer** un fichier .md

#### 2. Édition Directe

- Saisir/modifier du Markdown dans la zone de texte

#### 3. Sélection de Thème

- 3 thèmes disponibles : Coopératives, Minimal, Nature
- Changement en temps réel

#### 4. Génération

- Cliquer sur "Générer la présentation"
- Prévisualisation instantanée dans l'iframe

#### 5. Export

- Cliquer sur "Télécharger HTML"
- Fichier HTML autonome prêt à être partagé

## 📝 Format Markdown

### Séparation des Slides

```markdown
## Première slide

Contenu de la première slide

---

## Deuxième slide

Contenu de la deuxième slide
```

### Formatage

```markdown
# Titre principal (h1)
## Titre de slide (h2)
### Sous-titre (h3)

**Texte en gras**
*Texte en italique*
`Code inline`

- Liste à puces
- Deuxième élément

1. Liste numérotée
2. Deuxième élément

[Lien](https://example.com)
```

### Animation des Listes

Les listes sont automatiquement animées avec Reveal.js (apparition progressive des éléments).

## 🎨 Personnalisation

### Ajouter un Nouveau Thème

1. Ouvrir `assets/js/config/constantes.js`
2. Ajouter un nouvel objet dans `THEMES` :

```javascript
export const THEMES = {
  // ... thèmes existants

  monTheme: {
    nom: 'Mon Thème',
    arrierePlan: '#f0f0f0',
    couleurPrimaire: '#333333',
    couleurSecondaire: '#0066cc',
    couleurAccent: '#ff6600',
    previsualisation: 'linear-gradient(135deg, #333, #0066cc)'
  }
};
```

### Modifier les Couleurs de l'Interface

Ouvrir `assets/css/variables.css` et ajuster les variables CSS.

## 🌱 Éco-Responsabilité

### Objectifs

- **Poids réduit** : ~80KB vs 1500KB pour PowerPoint
- **Pas de dépendances** : CDN Reveal.js uniquement pour les présentations
- **Calcul CO2** : Estimation de l'empreinte carbone économisée

### Statistiques Affichées

- **Poids total** : Taille du fichier HTML généré
- **Nombre de slides** : Comptage automatique
- **CO2 économisé** : Estimation basée sur la différence avec PowerPoint

## 🛠️ Technologies

- **HTML5/CSS3** : Interface utilisateur
- **JavaScript ES6+** : Modules, async/await, Promises
- **Reveal.js 4.5** : Framework de présentation
- **CDN** : jsdelivr pour Reveal.js (uniquement dans les présentations générées)

## 📦 Dépendances

### En Production

- Aucune ! L'application fonctionne sans dépendances externes

### Pour les Présentations Générées

- Reveal.js via CDN (chargé uniquement dans le HTML exporté)

## 🔧 Maintenance

### Ajouter une Fonctionnalité

1. Identifier le module concerné
2. Créer une nouvelle fonction avec documentation JSDoc
3. L'exporter si nécessaire
4. L'importer dans `app.js`
5. L'intégrer dans le flux d'exécution

### Corriger un Bug

1. Identifier le module concerné
2. Ajouter des `console.log()` pour déboguer
3. Corriger la fonction
4. Tester avec plusieurs cas

### Optimiser les Performances

- **Parsing Markdown** : Déjà optimisé (un seul passage)
- **Génération HTML** : Template strings (rapide)
- **Statistiques** : Calculs simples (O(1))

## 📄 Licence

Projet éducatif pour les coopératives pédagogiques | numériques

## 👥 Contribution

Pour contribuer :
1. Respecter l'architecture modulaire
2. Documenter les fonctions en français
3. Tester avant de commit
4. Garder les fonctions courtes et focalisées

---

**Développé avec ❤️ pour les coopératives pédagogiques | numériques**
