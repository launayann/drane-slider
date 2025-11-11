# 🚀 Guide de Déploiement Multi-Plateformes

Ce projet peut être déployé sur **GitHub** et **GitLab** (Forge Éducation Nationale).

## 📊 Comparaison des plateformes

| Fonctionnalité | GitHub | GitLab (Forge EN) |
|---------------|---------|-------------------|
| **CI/CD** | ✅ GitHub Actions | ✅ GitLab CI/CD |
| **Fichier config** | `.github/workflows/ci.yml` | `.gitlab-ci.yml` |
| **Pages** | GitHub Pages | GitLab Pages |
| **URL du site** | `username.github.io/repo` | `username.forge.apps.education.fr/repo` |
| **Gratuit** | ✅ Oui | ✅ Oui (Éducation) |

## 🔵 Déploiement sur GitHub

### 1. Pousser le code

```bash
git remote add github https://github.com/launayann/drane-slider.git
git push github main
```

### 2. Activer GitHub Pages

1. Allez sur : https://github.com/launayann/drane-slider/settings/pages
2. Sous "Source", sélectionnez **GitHub Actions**
3. Sauvegardez

### 3. URL du site

```
https://launayann.github.io/drane-slider/
```

### 4. Voir les workflows

```
https://github.com/launayann/drane-slider/actions
```

## 🟠 Déploiement sur GitLab (Forge EN)

### 1. Cloner sur la forge

```bash
# Ajouter le remote GitLab
git remote add gitlab https://forge.apps.education.fr/ylaunay/drane-slider.git

# Pousser le code
git push gitlab main
```

### 2. Le CI/CD se lance automatiquement

Le fichier `.gitlab-ci.yml` est détecté automatiquement et le pipeline se lance.

### 3. URL du site (GitLab Pages)

```
https://ylaunay.forge.apps.education.fr/drane-slider
```

### 4. Voir les pipelines

```
https://forge.apps.education.fr/ylaunay/drane-slider/-/pipelines
```

## 📁 Structure des fichiers CI/CD

```
drane-slider/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml          # GitHub Actions - Tests
│   │   └── deploy.yml      # GitHub Actions - Déploiement
│   └── CI-README.md        # Documentation GitHub
├── .gitlab/
│   └── GITLAB-CI-README.md # Documentation GitLab
├── .gitlab-ci.yml          # GitLab CI/CD (racine)
└── .eslintrc.json          # Configuration ESLint (commun)
```

## 🔄 Synchroniser les deux repos

### Pousser sur les deux en même temps

```bash
# Ajouter les deux remotes
git remote add github https://github.com/launayann/drane-slider.git
git remote add gitlab https://forge.apps.education.fr/ylaunay/drane-slider.git

# Créer un alias pour pousser partout
git remote add all https://github.com/launayann/drane-slider.git
git remote set-url --add --push all https://github.com/launayann/drane-slider.git
git remote set-url --add --push all https://forge.apps.education.fr/ylaunay/drane-slider.git

# Pousser sur les deux
git push all main
```

### Script de synchronisation

Créez un script `sync.sh` :

```bash
#!/bin/bash
echo "🔄 Synchronisation GitHub et GitLab..."

# Pousser sur GitHub
echo "📤 Push vers GitHub..."
git push github main

# Pousser sur GitLab
echo "📤 Push vers GitLab (Forge EN)..."
git push gitlab main

echo "✅ Synchronisation terminée !"
echo ""
echo "🌐 Sites accessibles :"
echo "  - GitHub: https://launayann.github.io/drane-slider/"
echo "  - GitLab: https://ylaunay.forge.apps.education.fr/drane-slider"
```

Utilisation :
```bash
chmod +x sync.sh
./sync.sh
```

## 🧪 Tests en local avant déploiement

### Tester la syntaxe JavaScript

```bash
find assets/js -name "*.js" -exec node --check {} \;
```

### Tester les modules ES6

```bash
node --input-type=module --eval "import('./assets/js/config/constantes.js')"
```

### Lancer un serveur local

```bash
python3 -m http.server 8000
# Ouvrir http://localhost:8000
```

## 📊 Badges de statut

### Pour GitHub (dans README.md)

```markdown
![CI](https://github.com/launayann/drane-slider/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/launayann/drane-slider/actions/workflows/deploy.yml/badge.svg)
```

### Pour GitLab (dans README.md)

```markdown
[![pipeline](https://forge.apps.education.fr/ylaunay/drane-slider/badges/main/pipeline.svg)](https://forge.apps.education.fr/ylaunay/drane-slider/-/commits/main)
```

## 🎯 Workflows disponibles

### GitHub Actions

#### CI - Tests et Validation
- ✅ Validation JavaScript, CSS, HTML
- ✅ Tests des modules ES6
- ✅ Vérification des variables CSS
- ✅ Test serveur HTTP

#### Deploy - Déploiement GitHub Pages
- 🚀 Déploiement automatique sur `main`
- 🌐 Publication sur GitHub Pages

### GitLab CI/CD

#### Stages
1. **validation** : Syntaxe JS, CSS, HTML
2. **test** : Modules ES6, variables CSS
3. **build** : Test serveur HTTP
4. **deploy** : Déploiement GitLab Pages

## 🔐 Environnements

| Environnement | URL | Plateforme |
|--------------|-----|------------|
| **Production GitHub** | https://launayann.github.io/drane-slider/ | GitHub Pages |
| **Production GitLab** | https://ylaunay.forge.apps.education.fr/drane-slider | GitLab Pages |
| **Développement local** | http://localhost:8000 | Serveur Python |

## 📝 Checklist de déploiement

- [ ] Code testé en local
- [ ] Pas d'erreurs JavaScript (`node --check`)
- [ ] Variables CSS toutes définies
- [ ] Commit avec message descriptif
- [ ] Push vers GitHub
- [ ] Push vers GitLab
- [ ] Vérifier workflows GitHub
- [ ] Vérifier pipelines GitLab
- [ ] Tester les sites déployés

## ❓ FAQ

### Pourquoi deux systèmes CI/CD ?

Les deux plateformes ont des systèmes différents :
- **GitHub** : GitHub Actions
- **GitLab** : GitLab CI/CD

Les deux fichiers sont inclus pour supporter les deux plateformes.

### Lequel utiliser ?

- **GitHub Pages** : Pour un public général, plus connu
- **GitLab Forge EN** : Pour le réseau éducation nationale, hébergement français

Vous pouvez utiliser les deux en parallèle !

### Comment choisir où déployer ?

Les deux sont configurés pour se déclencher automatiquement. Poussez simplement votre code et les deux systèmes se chargeront du déploiement.

---

**📚 Ressources**

- [Documentation GitHub Actions](https://docs.github.com/actions)
- [Documentation GitLab CI/CD](https://docs.gitlab.com/ee/ci/)
- [README du projet](README.md)
