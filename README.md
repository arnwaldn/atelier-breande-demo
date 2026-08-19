# Atelier Bréande — site vitrine de démonstration

**En ligne : https://atelier-breande-demo.vercel.app**

Atelier Bréande est un atelier de luminaires **fictif**. Il n'existe pas, ne
vend rien et n'emploie personne. Ce site est une démonstration : il montre ce
que contient un site vitrine livré dans les règles, sur un cas concret plutôt
que sur une liste d'arguments.

Vous pouvez l'ouvrir, le mesurer vous-même, et lire le code qui le produit.

## Ce qu'il y a à regarder

Un site vitrine d'artisan a trois choses à réussir, et elles se vérifient toutes
depuis un navigateur :

- **Il s'affiche vite sur un téléphone en 4G.** Sortie entièrement statique :
  pas de serveur à réveiller, pas de base de données à interroger, pas de socle
  applicatif à télécharger avant de lire la première ligne.
- **Il se lit par tout le monde.** Navigation au clavier, contrastes tenus,
  textes alternatifs sur les images, structure de titres cohérente.
- **Il ne fuit rien.** Aucun cookie, aucun traceur, aucune ressource extérieure,
  polices auto-hébergées. Le seul appel réseau que fait cette page, c'est vers
  elle-même.

## La pile

Astro 7 en sortie statique, Tailwind CSS 4, hébergement Vercel. Aucun framework
JavaScript côté client.

Ce choix n'est pas une coquetterie : sur une vitrine, un socle applicatif se
paie sur chaque page, à chaque visite, pour des fonctions dont un site de cinq
pages n'a pas l'usage.

## Ce que la chaîne de construction refuse de laisser passer

`npm run build` enchaîne quatre gardes, et la construction échoue si l'une
d'elles trouve quelque chose :

| Garde | Ce qu'elle interdit |
|---|---|
| `verifier-livrable` | script ou style en ligne, image sans texte alternatif, titre de page en double, `TODO` oublié |
| `verifier-poids` | dépassement du budget de poids, poste par poste |
| `verifier-typographie` | apostrophe droite, espace insécable manquante devant `?` `!` `:` `;` |
| `verifier-fiction` | une page qui ne dit pas qu'elle est une démonstration |

Une cinquième, `npm run verifier-notes`, mesure les quatre notes de Lighthouse
sur deux profils et bloque l'intégration continue si elles descendent sous les
seuils. Elle mesure aussi **la note de rapidité**, qui est la seule à varier —
et donc la seule qui vaille d'être gardée.

## Les images

Toutes les images de ce site ont été produites par un outil de génération
d'images par intelligence artificielle, pour ce projet et pour lui seul. Elles
ne représentent aucune personne, aucun lieu, aucun atelier et aucun objet réels,
et aucun visage n'y figure. Cette information est donnée au titre de l'article
50 du règlement européen sur l'intelligence artificielle.

## Faire tourner le site

```bash
npm install
npm run dev        # développement, port 4321
npm run build      # construction + les quatre gardes
npm run preview    # sert le livrable réel, port 4341
npm test           # campagne Playwright, deux profils
```

Node 22.12 ou plus récent.

## Licence

Le code est publié sous licence MIT (voir `LICENSE`). Les polices Fraunces et
Instrument Sans sont diffusées sous SIL Open Font License 1.1.

---

Conçu et réalisé par **Arnaud Porcel**, développeur freelance.
Les décisions techniques qui engagent la suite sont tracées dans `decisions/`.
