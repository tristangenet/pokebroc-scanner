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

Pour activer l'authentification et la sauvegarde dans Firebase, ajoutez aussi la
configuration Firebase :

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Si aucune clé n'est fournie, l'algorithme retournera simplement un résultat « Inconnu ».
