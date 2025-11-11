#!/bin/bash

# Script de synchronisation GitHub et GitLab
# Usage: ./sync.sh [message-de-commit]

set -e  # Arrêter en cas d'erreur

# Couleurs pour le terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo -e "${BLUE}🔄 Synchronisation GitHub et GitLab${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo ""

# Vérifier qu'on est dans un repo git
if [ ! -d .git ]; then
    echo -e "${RED}❌ Erreur: Pas de dépôt git détecté${NC}"
    exit 1
fi

# Vérifier l'état du repo
echo -e "${YELLOW}📋 Vérification de l'état du dépôt...${NC}"
git status

# Demander confirmation si des changements non commités
if ! git diff-index --quiet HEAD --; then
    echo ""
    echo -e "${YELLOW}⚠️  Vous avez des changements non commités.${NC}"
    read -p "Voulez-vous les commiter maintenant ? (o/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[OoYy]$ ]]; then
        # Ajouter tous les fichiers
        git add .

        # Message de commit
        if [ -z "$1" ]; then
            read -p "Message du commit: " COMMIT_MSG
        else
            COMMIT_MSG="$1"
        fi

        git commit -m "$COMMIT_MSG"
        echo -e "${GREEN}✅ Commit créé${NC}"
    else
        echo -e "${RED}❌ Annulé. Commitez vos changements avant de synchroniser.${NC}"
        exit 1
    fi
fi

# Vérifier que les remotes existent
echo ""
echo -e "${YELLOW}🔍 Vérification des remotes...${NC}"

GITHUB_EXISTS=$(git remote | grep -c "^github$" || true)
GITLAB_EXISTS=$(git remote | grep -c "^gitlab$" || true)
ORIGIN_EXISTS=$(git remote | grep -c "^origin$" || true)

if [ "$GITHUB_EXISTS" -eq 0 ] && [ "$ORIGIN_EXISTS" -eq 1 ]; then
    echo -e "${YELLOW}⚠️  Remote 'github' non trouvé, utilisation de 'origin' à la place${NC}"
    GITHUB_REMOTE="origin"
else
    GITHUB_REMOTE="github"
fi

if [ "$GITLAB_EXISTS" -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Remote 'gitlab' non trouvé${NC}"
    read -p "Voulez-vous l'ajouter maintenant ? (URL GitLab) [Entrée pour ignorer]: " GITLAB_URL
    if [ ! -z "$GITLAB_URL" ]; then
        git remote add gitlab "$GITLAB_URL"
        echo -e "${GREEN}✅ Remote 'gitlab' ajouté${NC}"
        GITLAB_REMOTE="gitlab"
    else
        GITLAB_REMOTE=""
    fi
else
    GITLAB_REMOTE="gitlab"
fi

# Branche actuelle
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "${BLUE}📌 Branche actuelle: ${BRANCH}${NC}"

# Synchronisation
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo -e "${BLUE}📤 Début de la synchronisation${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo ""

# Push vers GitHub/Origin
if [ ! -z "$GITHUB_REMOTE" ]; then
    echo -e "${YELLOW}📤 Push vers GitHub ($GITHUB_REMOTE)...${NC}"
    if git push "$GITHUB_REMOTE" "$BRANCH"; then
        echo -e "${GREEN}✅ Push GitHub réussi${NC}"
        GITHUB_SUCCESS=true
    else
        echo -e "${RED}❌ Échec du push GitHub${NC}"
        GITHUB_SUCCESS=false
    fi
else
    echo -e "${YELLOW}⏭️  GitHub ignoré (remote non configuré)${NC}"
    GITHUB_SUCCESS=false
fi

echo ""

# Push vers GitLab
if [ ! -z "$GITLAB_REMOTE" ]; then
    echo -e "${YELLOW}📤 Push vers GitLab (Forge EN)...${NC}"
    if git push "$GITLAB_REMOTE" "$BRANCH"; then
        echo -e "${GREEN}✅ Push GitLab réussi${NC}"
        GITLAB_SUCCESS=true
    else
        echo -e "${RED}❌ Échec du push GitLab${NC}"
        GITLAB_SUCCESS=false
    fi
else
    echo -e "${YELLOW}⏭️  GitLab ignoré (remote non configuré)${NC}"
    GITLAB_SUCCESS=false
fi

# Résumé
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo -e "${BLUE}📊 Résumé de la synchronisation${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo ""

if [ "$GITHUB_SUCCESS" = true ]; then
    echo -e "${GREEN}✅ GitHub: Synchronisé${NC}"
else
    echo -e "${RED}❌ GitHub: Échec ou ignoré${NC}"
fi

if [ "$GITLAB_SUCCESS" = true ]; then
    echo -e "${GREEN}✅ GitLab: Synchronisé${NC}"
else
    echo -e "${RED}❌ GitLab: Échec ou ignoré${NC}"
fi

echo ""

# URLs des sites
if [ "$GITHUB_SUCCESS" = true ] || [ "$GITLAB_SUCCESS" = true ]; then
    echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
    echo -e "${BLUE}🌐 Sites accessibles${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
    echo ""

    if [ "$GITHUB_SUCCESS" = true ]; then
        echo -e "${GREEN}GitHub Pages:${NC}"
        echo "  https://launayann.github.io/drane-slider/"
        echo ""
    fi

    if [ "$GITLAB_SUCCESS" = true ]; then
        echo -e "${GREEN}GitLab Pages:${NC}"
        echo "  https://ylaunay.forge.apps.education.fr/drane-slider"
        echo ""
    fi

    echo -e "${YELLOW}⏳ Note: Le déploiement peut prendre quelques minutes${NC}"
fi

echo ""
echo -e "${GREEN}✅ Synchronisation terminée !${NC}"
echo ""
