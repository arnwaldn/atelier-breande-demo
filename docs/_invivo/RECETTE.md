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

---

## Lots 2-3 — Vague A : contenu, visuels, coquille · 2026-08-19, 03h50 → 05h00

Trois équipes en parallèle, périmètres disjoints, contrat d'interface posé
avant le départ (`src/content.config.ts` + structures documentées).

### Typographie (orchestrateur)

| Contrôle | Résultat |
|---|---|
| Bascule API Fonts → déclaration manuelle en feuille externe | l'API Fonts émettait les `@font-face` en `<style>` inline, refusé par la CSP — **attrapé par notre garde de livrable** (8 échecs explicites) |
| Poids | 2 fichiers, 69,87 Ko servis (contre 123 Ko produits avant, dont 55 jamais téléchargés) |
| Vérification en ligne | `document.fonts` : Fraunces + Archivo `loaded`, variables définies |
| Fraunces `wonk` | même poids que `wght` (36,6 Ko), l'axe WONK gratuit |

### Contenu (rédacteur)

| Contrôle | Résultat |
|---|---|
| `astro check` | 0 erreur |
| Volumes | toutes pages dans les cibles du PRD (accueil 609, atelier 1 105, services 1 634, contact 663, fiches 203-221) |
| Interdits | 0 « lumen », 0 formule répétée, 0 apostrophe droite, 1 seul téléphone (plage ARCEP), 0 personne nommée |
| Arbitrage rendu | l'adresse e-mail fictive du repli sans JS retirée — un mailto vers un domaine non enregistré est une porte |

### Visuels (graphiste)

| Contrôle | Résultat |
|---|---|
| Livraison | 32 fichiers, 7,1 Mo, JPEG q82, `-strip`, 0 métadonnée (échantillon vérifié) |
| Rejets QC | filaments Edison ×3, silhouette lampe Gras ×2, cadres blancs ×2 |
| Planche contact | examinée par l'orchestrateur AVANT commit |
| Réserves tracées | encorbellement à revalider par le DA ; ambiance du larmier incohérente avec sa principale |
| Incident d'outillage | MCP nanobanana non chargeable en sous-agent → API Gemini directe, même moteur, même clé. À vérifier côté configuration du poste |

### Coquille (webdesigner)

| Contrôle | Résultat |
|---|---|
| Tests | **103 passés, 1 ignoré, 0 échec** — contre-vérifiés par l'orchestrateur |
| Gardes | 4 vertes (CSS 7,16/14 Ko, JS critique 1,07/8, polices 69,87/95) |
| Bugs réels trouvés en recette | collision de spécificité sur le CTA à 360 px ; seuil desktop 768→1024 px |
| Doutes remontés au DA | CTA mobile dans le panneau plutôt que la barre ; la signature de l'accent en approximation typographique |

### Socle de mouvement et scène 3D (orchestrateur)

| Contrôle | Résultat |
|---|---|
| Fragment 3D bundlé (esbuild, minifié, gzip 9) | **134,1 Ko** — budget 140, référence frère 181 |
| Types | 0 erreur sur tout le périmètre |
| Décisions | pas de Lenis ; verre en double coque sans `transmission` ; gouverneur au 95e centile ; imports nommés de Three |

---

## Lots 4-9 — Assemblage, recette et clôture · 2026-08-19, 05h00 → 09h00

### La vague B (assemblage) puis la recette à trois regards

Six pages assemblées, mouvement branché, scène 3D vivante. Puis trois recettes
indépendantes : le directeur artistique (contre sa propre direction écrite),
le bêta-testeur (deux personas, à contexte frais), et les mesures.

**Verdict du DA : GO avec corrections** — « la direction est là, et elle est
bonne […] Ce site ne ressemble à rien d'autre du poste. » Cinq bloquants,
seize corrections. **Tous soldés le jour même.**

**Le bêta-test a trouvé le bug que ni 147 tests ni le DA n'avaient vu** : la
molette émettait une température que le moteur consommait comme une intensité —
la lampe s'éteignait au premier geste, définitivement. « J'ai cru que j'avais
cassé quelque chose. » Corrigé : la lampe reste allumée, sa couleur suit la
molette sur la courbe du corps noir.

### Les bloquants du DA, soldés sur preuves

| Bloquant | Correction | Preuve |
|---|---|---|
| B1 — texte collé au bord, jauge sur les mots | le débord porte sur la cellule d'image, jamais sur la section | 3 pages corrigées, campagne verte |
| B2 — cadres blancs (marqueur Vaubrune) | recadrage + contrôle de luminance des 4 bords | < 30 de luminance partout |
| B3 — l'ambiance du larmier montrait un autre produit | image écartée — un manque coûte moins qu'un faux | galerie à 1 entrée valide |
| B4 — bouton « Envoyer » trompeur | « Envoi désactivé », filet, encre éteinte | tests contact verts |
| B5 — repli froid éteint (« sinon on ne livre pas ») | suspension ALLUMÉE à 2 700 K, profil fidèle à la scène | 45 Ko, en ligne |

Plus : l'accent du logo remplacé par le vrai glyphe de Fraunces clippé (le mot
se lisait « Breande ») ; la mesure ramenée à 34 rem ; l'air en trois valeurs ;
le halo de la scène adouci (12 arrêts quadratiques — les 4 arrêts se lisaient
en anneaux durs, vus par extraction du canevas via `?scene-capture`).

### LES QUATRE NOTES FINALES — site complet, en ligne, 19/08

| Note | Mesure | Détail |
|---|---|---|
| Accessibilité | **100** | |
| Bonnes pratiques | **100** | 0 message console, 0 violation CSP |
| Référencement | **100** | |
| **Performance (mobile bridé)** | **99 · 99 · 99 — plancher 99** | LCP 2,06 s · TBT ≤ 12 ms · **CLS 0,000** |

Relevés : `mesures/lighthouse-2026-08-19-final-t*.json`. **La fiche portfolio
publie 95** — le chiffre tenu à chaque tirage, décision d'Arnaud du 19/08.

### Chiffres de sortie du chantier

- **6 pages** (contre 3), ~6 000 mots (contre ~550), 31 visuels en ligne
- **147 tests**, 2 profils, 5 gardes de construction, CI bloquante 4 notes
- Fragment 3D : **134 Ko gz** (budget 140, référence précédente 181)
- Chemin critique : ~38 Ko — HTML+CSS+scripts
- Dépôt public : `github.com/arnwaldn/atelier-breande-demo`
- Portfolio répercuté (lot 8) : fiche, captures, offre, redirection 308

### Restes à faire, tracés

- **Geste d'Arnaud** : « Atelier Lumen » dans MARQUES_INTERDITES du portfolio
  (.env + secret CI) ; test du site sur son Samsung réel (molette au doigt,
  sélection de texte, rendu de la scène).
- Marques TMview (classes 11, 20, 35) et réseaux sociaux pour clore les six
  canaux sur « Bréande ».
- Deux pièces du PRD en réserve (meneau, vasistas) — s'ajoutent sans réécrire.
- Le MCP nanobanana n'est pas chargeable en sous-agent — configuration du
  poste à vérifier.
- Supprimer le projet Vercel redirecteur atelier-lumen-demo dans six mois.

## Décision d'Arnaud du 19/08 à 15h47 — la galerie de profondeur remplacera la lampe

Arnaud a signalé deux références d'animation en cours de chantier :
- `https://codepen.io/moussamamadou/full/WbNepNG` — **écartée** : grande photo
  plein écran + titre monumental en capitales. Le ruban de l'accueil fait déjà
  mieux (il se déplace latéralement), et deux éléments y sont interdits par
  l'ADR-002 : le visage humain en gros plan et le titre monumental en capitales
  (marqueur Vaubrune n° 2).
- `https://tympanus.net/Tutorials/DepthGallery/` — **RETENUE POUR PLUS TARD, en
  remplacement de la scène 3D du luminaire** (arbitrage d'Arnaud : « je suis
  prêt à sacrifier la lampe »). Structure relevée sur pièces : une image par
  écran, numéro + nom dans la marge gauche, fiche technique dans la marge
  droite, fond teinté de la couleur de l'image. C'est presque exactement la
  structure d'une fiche de pièce de Bréande.

**Ce qui a été dit à Arnaud et qu'il faudra vérifier avant de commencer** :
l'effet de DepthGallery tient à sa COMPOSITION, pas à ses shaders. La
transposition peut se faire sans WebGL, avec ScrollTrigger et `--part-de-jour`
— donc sans forcément sacrifier la lampe. Le sacrifice reste sa décision, mais
il n'est peut-être pas nécessaire.

**Ce qu'il faudra refuser de la référence** (ADR-002) : le monospace partout,
les capitales interlettrées, la cotation en tableau, le fond clair. Trois
marqueurs interdits sur quatre — la forme est à réécrire entièrement, seule la
structure se reprend.

Priorité fixée par Arnaud le 19/08 : **finir le chantier en cours d'abord.**
