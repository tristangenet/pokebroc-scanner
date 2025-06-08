# PokéBroc Scanner

Application web mobile-first pour scanner, identifier et estimer les cartes Pokémon vendues en brocante.

## Démarrage

```bash
npm install
npm run dev
npm run server
```

Ouvrez ensuite l'URL locale indiquée par Vite pour tester sur mobile (PWA installable).

## Configuration de l'API Google Vision

Pour la détection de contrefaçons, l'application peut utiliser l'API Google Vision.
Ajoutez une clé dans un fichier `.env` à la racine du projet :

```env
VITE_GOOGLE_VISION_KEY=VotreCleAPI
```

Si aucune clé n'est fournie, l'algorithme retournera simplement un résultat « Inconnu ».
