# Guide GitLab CI/CD - Forge Éducation Nationale

Ce document explique la configuration du CI/CD pour GitLab et les différences avec GitHub.

## 🔄 Différences GitHub vs GitLab

| Aspect | GitHub Actions | GitLab CI/CD |
|--------|---------------|--------------|
| **Fichier de config** | `.github/workflows/*.yml` | `.gitlab-ci.yml` (racine) |
| **Syntaxe** | `jobs:` et `steps:` | `stages:` et `jobs:` |
| **Déploiement Pages** | `deploy-pages` action | Job `pages` avec `public/` |
| **Cache** | Actions spécifiques | `cache:` natif |
| **Artefacts** | `upload-artifact` | `artifacts:` natif |
| **Conditions** | `if:` | `rules:` ou `only:`/`except:` |

## 📋 Configuration GitLab CI/CD

### Structure du fichier `.gitlab-ci.yml`

```yaml
stages:           # Étapes du pipeline
  - validation
  - test
  - build
  - deploy

job-name:         # Nom du job
  stage: test     # Stage auquel appartient le job
  image: node:20  # Image Docker à utiliser
  script:         # Commandes à exécuter
    - npm test
  rules:          # Conditions d'exécution
    - if: '$CI_COMMIT_BRANCH == "main"'
```

## 🎯 Stages du Pipeline

### 1️⃣ Stage : Validation
- **validation:syntaxe-javascript** : Vérifie la syntaxe JS avec `node --check`
- **validation:css** : Valide le CSS avec Stylelint
- **validation:html** : Valide le HTML avec html-validate

### 2️⃣ Stage : Test
- **test:modules-es6** : Teste le chargement des modules
- **test:variables-css** : Vérifie que toutes les variables CSS sont définies

### 3️⃣ Stage : Build
- **build:test-serveur** : Lance un serveur HTTP et teste l'accessibilité

### 4️⃣ Stage : Deploy
- **pages** : Déploie automatiquement sur GitLab Pages

## 🚀 Déploiement GitLab Pages

### Configuration automatique

Le job `pages` est spécial dans GitLab :
- Doit s'appeler exactement **`pages`**
- Doit créer un dossier **`public/`** avec les fichiers
- Doit déclarer ce dossier comme **`artifacts`**

```yaml
pages:
  stage: deploy
  script:
    - mkdir -p public
    - cp -r * public/
  artifacts:
    paths:
      - public
```

### Accès au site

Votre site sera accessible à :
```
https://ylaunay.forge.apps.education.fr/drane-slider
```

**Format général :** `https://[username].forge.apps.education.fr/[project-name]`

### Activer GitLab Pages

1. Allez dans **Settings** > **Pages** de votre projet
2. GitLab Pages devrait être activé automatiquement après le premier déploiement
3. Si ce n'est pas le cas, contactez l'administrateur de la forge

## 🔧 Variables CI/CD

### Variables prédéfinies GitLab

```yaml
$CI_COMMIT_BRANCH         # Nom de la branche actuelle
$CI_COMMIT_REF_NAME       # Nom de la branche ou du tag
$CI_PIPELINE_SOURCE       # Source du pipeline (push, merge_request, etc.)
$CI_PROJECT_DIR           # Répertoire du projet
$CI_COMMIT_SHA            # Hash du commit
```

### Définir vos propres variables

Dans **Settings** > **CI/CD** > **Variables**, vous pouvez ajouter :
- Tokens d'accès
- Clés API
- Variables d'environnement

## 🎨 Règles d'exécution (`rules`)

### Exemples de conditions

```yaml
# Exécuter uniquement sur main
rules:
  - if: '$CI_COMMIT_BRANCH == "main"'

# Exécuter sur toutes les branches claude/*
rules:
  - if: '$CI_COMMIT_BRANCH =~ /^claude\//'

# Exécuter uniquement sur les merge requests
rules:
  - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'

# Combiner plusieurs conditions
rules:
  - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
  - if: '$CI_COMMIT_BRANCH == "main"'
  - if: '$CI_COMMIT_BRANCH =~ /^claude\//'
```

## 🐳 Images Docker

GitLab CI/CD utilise des conteneurs Docker pour exécuter les jobs.

### Images couramment utilisées

```yaml
# Node.js
image: node:20-alpine

# Python
image: python:3.11-alpine

# Alpine minimal
image: alpine:latest
```

### Images personnalisées

Vous pouvez créer votre propre image Docker si besoin :
```yaml
image: registry.gitlab.com/votre-groupe/votre-projet/custom-image:latest
```

## 📊 Visualiser les pipelines

### Dans l'interface GitLab

1. Allez dans **CI/CD** > **Pipelines**
2. Cliquez sur un pipeline pour voir les détails
3. Consultez les logs de chaque job

### Badges de statut

Ajoutez un badge dans votre README :

```markdown
[![pipeline status](https://forge.apps.education.fr/ylaunay/drane-slider/badges/main/pipeline.svg)](https://forge.apps.education.fr/ylaunay/drane-slider/-/commits/main)
```

## 🔍 Debugging

### Tester localement avec GitLab Runner

```bash
# Installer GitLab Runner
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh | sudo bash
sudo apt-get install gitlab-runner

# Exécuter un job en local
gitlab-runner exec docker validation:syntaxe-javascript
```

### Voir les logs détaillés

Dans l'interface GitLab, cliquez sur un job pour voir :
- Les commandes exécutées
- La sortie console
- Les erreurs éventuelles

## 🚨 Dépannage

### Le pipeline ne se déclenche pas

✅ Vérifiez que le fichier `.gitlab-ci.yml` est à la racine du projet
✅ Vérifiez la syntaxe YAML (pas de tabulations, indentation correcte)
✅ Allez dans **Settings** > **CI/CD** > **General pipelines** et vérifiez que le CI/CD est activé

### Le job `pages` échoue

✅ Vérifiez que le dossier `public/` est bien créé
✅ Vérifiez que les artifacts sont correctement définis
✅ Vérifiez les permissions des fichiers

### Une image Docker ne se télécharge pas

✅ Vérifiez votre connexion internet
✅ Essayez une image alternative (par ex. `node:20-slim` au lieu de `node:20-alpine`)
✅ Contactez l'administrateur de la forge si les registres externes sont bloqués

## 📚 Ressources

- [Documentation GitLab CI/CD](https://docs.gitlab.com/ee/ci/)
- [Référence `.gitlab-ci.yml`](https://docs.gitlab.com/ee/ci/yaml/)
- [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/)
- [Variables prédéfinies](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)

## 🔐 Spécificités de la Forge Éducation Nationale

### Limitations possibles

- Certaines images Docker externes peuvent être bloquées
- Le temps d'exécution des pipelines peut être limité
- L'espace de stockage pour les artefacts peut être limité

### Bonnes pratiques

✅ Utilisez des images Alpine quand possible (plus légères)
✅ Nettoyez les artefacts régulièrement
✅ Limitez le nombre de jobs en parallèle
✅ Utilisez le cache pour accélérer les builds

## 📝 Exemple de workflow complet

```bash
# 1. Cloner le repo sur la forge
git clone https://forge.apps.education.fr/ylaunay/drane-slider.git
cd drane-slider

# 2. Faire des modifications
# ... éditer des fichiers ...

# 3. Commit et push
git add .
git commit -m "fix: correction d'un bug"
git push origin main

# 4. Le pipeline se déclenche automatiquement
# Voir les résultats sur :
# https://forge.apps.education.fr/ylaunay/drane-slider/-/pipelines
```

## ✅ Checklist avant le premier push

- [ ] Fichier `.gitlab-ci.yml` à la racine
- [ ] Syntaxe YAML validée
- [ ] CI/CD activé dans les settings
- [ ] Runners disponibles (vérifier dans CI/CD > Runners)
- [ ] Variables d'environnement configurées si besoin

---

**Bon déploiement sur la Forge Éducation Nationale ! 🎓**
