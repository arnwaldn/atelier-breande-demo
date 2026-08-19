# Journal de recette — Atelier Bréande

Une entrée par lot. Chaque affirmation porte sa preuve : une commande, une
mesure, une capture. Ce qui n'a pas été vérifié est écrit comme non vérifié.

---

## Lot 0 — Bascule d'identité · 2026-08-19, 01h20 → 02h10

### Ce qui a été fait

La démonstration a changé de nom : « Atelier Lumen » est le nom d'une société
d'éclairage réelle de l'agglomération lyonnaise (détail et remédiation :
`decisions/ADR-006`). Elle s'appelle désormais **Atelier Bréande**.

### Preuves

| Contrôle | Commande | Résultat |
|---|---|---|
| Audit de secrets sur l'historique | `git log --all -p \| grep -E 'sk_\|ghp_\|AKIA\|PRIVATE KEY'` | aucune correspondance |
| Fichiers sensibles ayant existé | `git log --all --name-only \| grep -Ei '\.env\|secret\|token'` | `.env.example` seul, sans valeur |
| Purge du nom | script Node, 17 fichiers | **132 remplacements**, 0 occurrence restante |
| Construction après purge | `npm run build` | 3 pages, sans erreur |
| Dépôt public | `gh repo view` | `visibility: PUBLIC` |
| Ancien dépôt | `gh repo view validation-agence` | `isArchived: true` |
| Nouvelle adresse | `curl -I` | **HTTP 200** |
| Ancienne adresse | `curl -I` | **HTTP 308** vers la nouvelle, sous-pages comprises |
| Déploiements historiques | `vercel project rm` | **supprimés** (9 déploiements) |
| Sous-domaine libéré | projet vide recréé | **repris**, redirige en 308 |

### Corrections de conformité, même session

Issues de la note du juriste-relecteur du 19/08.

| Défaut | Preuve du défaut | Correction | Preuve de la correction |
|---|---|---|---|
| Image de tête montrant un **visage humain identifiable**, généré par IA | fichier `hero-atelier.webp` 2048×1152, visage de trois quarts | remplacée par un établi désert, sans présence humaine | 85 608 octets (contre 118 758), `magick identify` : 0 métadonnée |
| Aucune mention de fiction dans `<title>`, description et `og:` | HTML servi au `curl` | mention portée sur les trois pages | `<title>` servi contrôlé en ligne |
| Le mot « photographiées » sous des images générées | prose de l'accueil | retiré | `grep -c 'photographi' dist/index.html` → 0 |
| Aucune mention d'origine IA | absente du site | légende posée **au contact de l'image, dans le premier écran** | contrôlée dans le livrable et en ligne |
| Pages légales absentes | aucun lien légal sur aucune page | `/mentions-legales` + lien permanent en pied | HTTP 200, rendu contrôlé à l'écran |
| Formulaire invitant au préremplissage | `autocomplete="name"`, `"email"` | `autocomplete="off"` sur le formulaire | — |
| Piège anti-robot sur un formulaire inerte | `div.hp-field` | retiré | — |

### Contrôles finaux du lot

- **Console du navigateur : 0 erreur, 0 avertissement** (Playwright, page en ligne).
- Aucune violation de la politique de sécurité.
- Rendu vérifié à l'écran sur l'accueil et sur les mentions légales.

### Reste à faire, tracé

- Marques France et UE via TMview (classes 11, 20, 35) et réseaux sociaux, pour
  clore les six canaux sur « Bréande ».
- Supprimer le projet redirecteur **six mois après la mise en ligne**, quand
  plus rien n'y pointera.

---

## Lot 1 — Fondations · 2026-08-19, en cours

### Socle posé

| Élément | État |
|---|---|
| `package.json` | nom, moteurs (Node ≥ 22.12), scripts de garde, dépendances de test |
| `astro.config.mjs` | `inlineStylesheets: 'never'`, `assetsInlineLimit: 0`, `cssMinify: 'esbuild'`, sitemap, `trailingSlash: 'never'` |
| `vercel.json` | préréglage Astro, 4 directives de sécurité ajoutées |
| CI | chaîne bloquante : types → gardes → campagne → **quatre notes** |
| ADR | 005 (budget et sécurité), 006 (identité) |
| README | réécrit — il annonçait « projet témoin jetable » sur un dépôt public |
| LICENSE | MIT |
| `robots.txt` + sitemap | posés ; ils rendaient 404 |

### Contrôles

| Contrôle | Commande | Résultat |
|---|---|---|
| Types | `npm run check` | **0 erreur, 0 avertissement, 0 indice** |
| Construction | `npm run build:nu` | 4 pages + sitemap, sans avertissement |
| Site en ligne | `curl -I` ×3 | 200 · 200 · 308 |

### En cours

Cinq gardes de construction et sept campagnes de test, écrites en parallèle sur
périmètres disjoints. **Chaque garde doit être vue échouer pour la raison
qu'elle annonce** avant d'être admise : une garde qu'on n'a jamais vue rouge
n'est pas une garde, c'est un fichier qui se termine par `exit 0`.

### Clôture du lot 1 — 2026-08-19, 03h00

| Contrôle | Résultat |
|---|---|
| Types (`astro check`) | 0 erreur, 0 avertissement, 0 indice |
| `npm run build` + 4 gardes | code de sortie **0** |
| Campagne Playwright, 2 profils | **99 passés, 1 ignoré, 0 échec** (26,5 s) |
| Lighthouse — accessibilité / bonnes pratiques / référencement | **100 / 100 / 100** (ordinateur) |
| Lighthouse — performance | **97**, trois tirages à 97, plancher retenu (mobile bridé) |
| `<style>` inline, `<script>` sans src, attribut `style=` | **0 / 0 / 0** |
| **Intégration continue, runner propre** | **completed / success** |

#### Les gardes ont mordu sur du réel

Deux défauts de mon propre travail, attrapés à la première exécution :
14 apostrophes droites (`index.astro`, `ContactForm.astro`) et une description
de mentions légales sans le mot « fictif ». Corrigés.

#### Mesure des polices : la garde a été reprise

Première version : seuil assoupli à « par fichier », parce que les cinq fichiers
pèsent 123 Ko cumulés. **Prémisse fausse** — ce sont des sous-ensembles Unicode
à `unicode-range` distincts, et un lecteur français n'en télécharge que deux,
soit **65,2 Ko** pour un budget de 95.

La garde mesure désormais **ce qu'un visiteur reçoit**, et signale à part les
55 Ko produits pour rien (latin étendu, vietnamien) — sans faire échouer, car ce
n'est pas un défaut du livrable servi mais un import trop large, à resserrer
quand la typographie sera refaite au lot 2.

*On corrige la mesure, jamais le seuil : une garde qui s'adapte au livrable
cesse d'être une garde.*

#### Deux trouvailles du harnais, à ne pas perdre

- **axe-core classe certains vrais défauts de contraste en `incomplete`** et non
  en `violations`, dès qu'il ne peut pas garantir le calcul (image, dégradé,
  pseudo-élément). Un test qui ne lit que `violations` — l'usage standard —
  laisse passer un texte quasi invisible. Le harnais lit donc aussi les
  `incomplete` de `color-contrast`, avec deux exceptions **nommées et portant
  sur la CAUSE** de l'incertitude, pas sur des pages en liste blanche.
- **Chromium n'émet aucun événement réseau vers un domaine `.invalid`** (TLD
  réservé). Le premier contrôle d'exfiltration donnait donc un faux vert — pas
  parce que le test était mauvais, mais parce que la cible n'existait pas.

#### Point reporté au lot 2, tracé

Le halo `.lueur` est à 0,28 d'opacité. La direction artistique plafonne à
**0,18** tout halo traversé par du texte. Le texte principal est à 14,9:1 sur
fond nu, donc largement au-dessus du seuil même sous le halo — ce n'est pas un
défaut, c'est un réglage à reprendre avec la nouvelle palette.
