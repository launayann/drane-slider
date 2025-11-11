#!/bin/bash
# Script de lancement du générateur de présentations

echo "🚀 Démarrage du générateur de présentations DRANE..."
echo ""
echo "📂 Dossier: $(pwd)"
echo ""

# Détecter le serveur disponible
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 détecté"
    echo "🌐 Serveur HTTP sur http://localhost:8000"
    echo ""
    echo "Appuyez sur Ctrl+C pour arrêter le serveur"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Python détecté"
    echo "🌐 Serveur HTTP sur http://localhost:8000"
    echo ""
    echo "Appuyez sur Ctrl+C pour arrêter le serveur"
    echo ""
    python -m http.server 8000
elif command -v php &> /dev/null; then
    echo "✅ PHP détecté"
    echo "🌐 Serveur HTTP sur http://localhost:8000"
    echo ""
    echo "Appuyez sur Ctrl+C pour arrêter le serveur"
    echo ""
    php -S localhost:8000
else
    echo "❌ Aucun serveur HTTP trouvé"
    echo ""
    echo "Veuillez installer Python ou PHP, puis relancer ce script."
    echo ""
    echo "Installation Python (Ubuntu/Debian):"
    echo "  sudo apt install python3"
    echo ""
    exit 1
fi
