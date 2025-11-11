# 🚀 Guide de démarrage rapide

## ⚡ Mise à jour rapide de votre PC

```bash
# 1. Se positionner dans votre projet
cd chemin/vers/drane-slider

# 2. Récupérer les modifications depuis GitHub
git fetch origin

# 3. Aller sur la branche avec les corrections
git checkout claude/fix-code-issue-011CV2nCWZDt9kJ25NHbvqvs

# 4. Mettre à jour
git pull origin claude/fix-code-issue-011CV2nCWZDt9kJ25NHbvqvs
```

## ✅ Valider et fusionner les corrections

```bash
# 1. Tester l'application en local
python3 -m http.server 8000
# Ouvrir http://localhost:8000 et tester

# 2. Si tout fonctionne, fusionner dans main
git checkout main
git merge claude/fix-code-issue-011CV2nCWZDt9kJ25NHbvqvs

# 3. Pousser vers GitHub
git push origin main
```

## 🔄 Pousser vers GitLab (Forge Éducation Nationale)

### Option 1 : Avec le script automatique

```bash
# 1. Ajouter le remote GitLab (une seule fois)
git remote add gitlab https://forge.apps.education.fr/ylaunay/drane-slider.git

# 2. Utiliser le script de synchronisation
./sync.sh
```

Le script fera tout automatiquement ! 🎉

### Option 2 : Manuellement

```bash
# 1. Ajouter le remote GitLab (une seule fois)
git remote add gitlab https://forge.apps.education.fr/ylaunay/drane-slider.git

# 2. Pousser vers GitLab
git push gitlab main
```

## 🌐 Accéder à vos sites déployés

Après quelques minutes, vos sites seront accessibles :

- **GitHub Pages** : https://launayann.github.io/drane-slider/
- **GitLab Pages** : https://ylaunay.forge.apps.education.fr/drane-slider

## 📋 Résumé des corrections apportées

### ✅ Bugs corrigés

1. **optimisateurSlides.js:44**
   - Erreur : `redecouper SlideIntelligente` (espace dans le nom)
   - Corrigé : `redecouperSlideIntelligente`

2. **composants.css**
   - Erreur : Variable CSS `--espacement-petit` non définie
   - Corrigé : Remplacé par `--espacement-sm` (3 occurrences)

### ✨ Nouveautés ajoutées

#### 1. Intégration Continue GitHub
- `.github/workflows/ci.yml` : Tests automatiques
- `.github/workflows/deploy.yml` : Déploiement GitHub Pages
- `.eslintrc.json` : Configuration ESLint

#### 2. Support GitLab CI/CD
- `.gitlab-ci.yml` : Pipeline complet pour GitLab
- `.gitlab/GITLAB-CI-README.md` : Documentation GitLab

#### 3. Outils de déploiement
- `sync.sh` : Script de synchronisation automatique
- `DEPLOIEMENT.md` : Guide multi-plateformes
- `QUICK-START.md` : Ce guide !

## 🧪 Tester en local

```bash
# Vérifier la syntaxe JavaScript
find assets/js -name "*.js" -exec node --check {} \;

# Vérifier les variables CSS
grep -oP '(?<=var\(--)[a-z0-9-]+(?=\))' assets/css/composants.css | sort -u

# Lancer un serveur local
python3 -m http.server 8000
```

## 📊 Voir les workflows CI/CD

### GitHub Actions
https://github.com/launayann/drane-slider/actions

### GitLab Pipelines
https://forge.apps.education.fr/ylaunay/drane-slider/-/pipelines

## 🔧 Configuration recommandée

### Remotes Git

Après configuration, vous devriez avoir :

```bash
git remote -v
```

Résultat attendu :
```
origin  https://github.com/launayann/drane-slider.git (fetch)
origin  https://github.com/launayann/drane-slider.git (push)
gitlab  https://forge.apps.education.fr/ylaunay/drane-slider.git (fetch)
gitlab  https://forge.apps.education.fr/ylaunay/drane-slider.git (push)
```

## 📝 Workflow quotidien

```bash
# 1. Faire vos modifications
# ... éditer les fichiers ...

# 2. Tester localement
python3 -m http.server 8000

# 3. Commiter
git add .
git commit -m "Description des changements"

# 4. Pousser vers GitHub et GitLab
./sync.sh
```

## ❓ Questions fréquentes

### Le script sync.sh ne fonctionne pas

Assurez-vous qu'il est exécutable :
```bash
chmod +x sync.sh
```

### Je veux seulement pousser vers GitHub

```bash
git push origin main
```

### Je veux seulement pousser vers GitLab

```bash
git push gitlab main
```

### Comment supprimer la branche de correction après fusion ?

```bash
# Localement
git branch -d claude/fix-code-issue-011CV2nCWZDt9kJ25NHbvqvs

# Sur GitHub
git push origin --delete claude/fix-code-issue-011CV2nCWZDt9kJ25NHbvqvs
```

## 📚 Documentation complète

- [README.md](README.md) : Documentation du projet
- [DEPLOIEMENT.md](DEPLOIEMENT.md) : Guide de déploiement détaillé
- [.github/CI-README.md](.github/CI-README.md) : Documentation GitHub Actions
- [.gitlab/GITLAB-CI-README.md](.gitlab/GITLAB-CI-README.md) : Documentation GitLab CI/CD

## 🎉 C'est tout !

Votre projet est maintenant :
- ✅ Corrigé et fonctionnel
- ✅ Testé automatiquement (CI/CD)
- ✅ Déployé sur GitHub Pages
- ✅ Prêt pour GitLab (Forge EN)
- ✅ Synchronisable facilement

**Bon développement ! 🚀**
