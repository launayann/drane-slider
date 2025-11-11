# Guide de l'Intégration Continue (CI/CD)

Ce projet utilise **GitHub Actions** pour l'intégration continue et le déploiement automatique.

## 📋 Workflows disponibles

### 1. CI - Tests et Validation (`ci.yml`)

**Déclenché sur :**
- Push sur `main`
- Push sur les branches `claude/**`
- Pull requests vers `main`

**Ce que ce workflow fait :**

#### ✅ Job 1 : Validation du code
- Vérifie la syntaxe JavaScript avec Node.js
- Valide le CSS avec Stylelint
- Valide le HTML avec html-validate

#### 🧪 Job 2 : Tests des modules ES6
- Teste le chargement de tous les modules JavaScript
- Vérifie que toutes les variables CSS utilisées sont bien définies
- S'assure qu'il n'y a pas de références manquantes

#### 🏗️ Job 3 : Build et test serveur
- Lance un serveur HTTP local
- Teste l'accessibilité de tous les fichiers
- Vérifie que l'application se charge correctement

#### 🎉 Job 4 : Rapport de succès
- Affiche un résumé de tous les tests réussis

### 2. Déploiement GitHub Pages (`deploy.yml`)

**Déclenché sur :**
- Push sur `main`
- Déclenchement manuel via l'interface GitHub

**Ce que ce workflow fait :**
- Build le site
- Déploie automatiquement sur GitHub Pages
- Rend l'application accessible publiquement

## 🚀 Comment activer GitHub Pages

1. Allez dans **Settings** de votre repo
2. Cliquez sur **Pages** dans le menu de gauche
3. Sous **Source**, sélectionnez **GitHub Actions**
4. Poussez un commit sur `main` → le déploiement se fait automatiquement

Votre site sera accessible à : `https://launayann.github.io/drane-slider/`

## 🛠️ Développement local

### Vérifier votre code avant de push

```bash
# Vérifier la syntaxe JavaScript
find assets/js -name "*.js" -exec node --check {} \;

# Lancer un serveur local pour tester
python3 -m http.server 8000
# Puis ouvrir http://localhost:8000
```

## 📊 Statut des workflows

Les badges de statut apparaîtront dans le README principal :

![CI](https://github.com/launayann/drane-slider/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/launayann/drane-slider/actions/workflows/deploy.yml/badge.svg)

## 🔧 Configuration

### ESLint (`.eslintrc.json`)
Configuration pour la validation JavaScript avec des règles adaptées au projet.

### Stylelint
Utilise `stylelint-config-standard` pour la validation CSS.

## 📝 Bonnes pratiques

1. **Avant de push** : Testez localement votre code
2. **Attendez le CI** : Vérifiez que tous les tests passent avant de merger
3. **Branches de feature** : Créez des branches pour les nouvelles fonctionnalités
4. **Pull Requests** : Utilisez des PR pour déclencher les tests automatiques

## ❓ Dépannage

### Le workflow échoue sur la validation CSS
- Vérifiez que toutes les variables CSS sont définies dans `variables.css`
- Assurez-vous qu'il n'y a pas de fautes de frappe dans les noms de variables

### Le workflow échoue sur les modules ES6
- Vérifiez que tous les imports/exports sont corrects
- Assurez-vous que les fichiers sont bien dans les bons répertoires

### Le déploiement GitHub Pages ne fonctionne pas
- Vérifiez que GitHub Pages est activé dans les settings
- Vérifiez que la source est bien "GitHub Actions"
- Attendez quelques minutes après le premier déploiement

## 🎯 Prochaines améliorations possibles

- [ ] Tests unitaires avec Jest
- [ ] Tests d'accessibilité (WCAG)
- [ ] Analyse de performance (Lighthouse)
- [ ] Tests de compatibilité navigateurs
- [ ] Minification du code pour la production
