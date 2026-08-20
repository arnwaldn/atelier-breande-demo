# ADR-005 — Le budget de performance et la politique de sécurité

- **Date** : 2026-08-19
- **Statut** : accepté, verrouillé au lot 1
- **Gouverne** : ce qui a le droit d'être téléchargé, et ce que le navigateur
  a le droit d'exécuter

## Pourquoi ce document existe avant le code

Sur le chantier précédent, **six jours de production ont tourné avec une note de
rapidité à 56** sous une chaîne de gardes qui affichait « OK ». Trois notes sur
quatre étaient gardées. La quatrième — la seule qui bouge — ne l'était pas,
précisément *parce qu'elle bouge*.

Une note qu'on refuse de garder parce qu'elle est instable est exactement celle
qu'il fallait garder. Les notes stables se gardent toutes seules.

D'où l'ordre de ce chantier : **la chaîne de vérification est écrite avant le
code qu'elle garde.**

## Le budget, chiffré

| Poste | Plafond | Mesure |
|---|---|---|
| HTML d'une page | 18 Ko | brut |
| CSS, feuille unique externe | 14 Ko | gzip 9 |
| JS bloquant le premier rendu | **8 Ko** | gzip 9 |
| Polices sur le chemin critique | 95 Ko | brut |
| Image LCP, une seule par page | 90 Ko | brut |
| Couche de mouvement, différée | 40 Ko | gzip 9 |
| Fragment 3D, différé | **140 Ko** | gzip 9 |
| Poids total d'une page | 950 Ko | transféré |

Indicateurs terrain, en profil mobile bridé : LCP ≤ 2,0 s · INP ≤ 200 ms ·
CLS ≤ 0,02 · TBT ≤ 150 ms.

**Notes publiées : 95 / 100 / 100 / 100.** Le chiffre publié est le **plancher**
de trois tirages consécutifs, jamais la médiane. Motif : dès qu'un site anime,
son indice de vitesse devient bimodal — l'animation d'ouverture joue ou ne joue
pas au moment du relevé — et l'écart mesuré allait de 2 000 à 4 650 ms sur la
même page. Une garde ne se juge pas en moyenne : elle mesure une fois. Publier
la médiane la rendrait rouge sans qu'aucune régression n'ait eu lieu, et une
garde qui crie à tort finit désactivée — c'est-à-dire exactement le défaut
qu'elle devait empêcher.

Le fragment 3D descend sous 140 Ko par **imports nommés** au lieu de
`import * as THREE` (Three déclare ses effets de bord limités, Rollup a donc le
droit d'élaguer), **une seule variante de scène**, **zéro module additionnel**,
et **géométrie procédurale**. Point de comparaison mesuré sur le projet voisin :
717 Ko brut, 181 Ko gzip.

## La politique de sécurité, et les quatre pièges

```
default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self';
font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none';
base-uri 'none'; object-src 'none'; frame-src 'none'; media-src 'self';
manifest-src 'self'; worker-src 'none'; upgrade-insecure-requests
```

**1. `style-src 'self'` casserait le style en production seulement.**
Astro 7 a `build.inlineStylesheets: 'auto'` par défaut : toute feuille de moins
de 4 Ko sort en `<style>` inline, que le navigateur refuse alors. La page est
correcte en développement et **sans aucun style en ligne**. Le site y échappait
par chance, sa feuille dépassant le seuil.
→ `inlineStylesheets: 'never'`, plus une garde qui échoue sur tout `<style>`,
tout `<script>` sans `src` et tout attribut `style=` dans le livrable.

**2. `script-src 'self'` et les scripts courts.**
Astro inline aussi les scripts de moins de 4 Ko.
→ `vite.build.assetsInlineLimit: 0`.

**3. `worker-src 'none'` tranche la question du modèle 3D.**
Un glTF compressé passe par un décodeur instancié depuis un worker `blob:`.
La politique le refuse. **C'est la sécurité qui impose la géométrie procédurale,
pas une préférence esthétique** — et c'est un argument autrement plus solide.

**4. Ne pas activer `security.csp` d'Astro en même temps que l'en-tête.**
Une politique en `<meta>` et une politique en en-tête s'appliquent en
**intersection** : les empreintes du `<meta>` ne débloqueraient rien tant que
l'en-tête dit `style-src 'self'`. Une seule politique, dans `vercel.json`.

**Et `require-trusted-types-for 'script'` est refusé, sciemment** : il casse le
découpage de texte de GSAP, qui écrit de l'`innerHTML`, et Lighthouse ne le
compte pas.

## Un dernier verrou, invisible autrement

`vite.build.cssMinify: 'esbuild'`. Lightning CSS replie `animation-timeline`
dans le raccourci `animation`, que la spécification n'accepte pas : le
navigateur rejette alors la déclaration **entière** et toutes les animations
liées au défilement meurent en silence — **dans le livrable seul**, en laissant
le texte à son état final lisible. La page semble correcte. Seule la lecture de
`getComputedStyle().animationName` sur le livrable le révèle.

## Amendement du 20/08/2026 — le budget qui n'était pas mesuré

Le tableau ci-dessus annonçait « Couche de mouvement, différée : 40 Ko gzip 9 ».
**Cette ligne n'a jamais été mesurée par aucune garde.** `verifier-poids.mjs`
pesait le HTML, le CSS, le JS critique et les polices, puis concluait « tous
les postes sont sous leur seuil » — en ne regardant pas celui-là. Le socle
pesait 50,6 Ko, soit 26 % au-dessus du budget déclaré, et rien ne le disait.

C'est la même classe de défaut que le budget qui ne mesurait qu'une origine
sur deux, corrigé le 19/08 : **une garde qui ne regarde pas un poste ne le
protège pas, elle le certifie à tort.**

Deux corrections, indissociables :

| Poste | Ancien | Nouveau | Nature |
|---|---|---|---|
| Couche de mouvement | 40 Ko gz, jamais mesuré | **56 Ko gz, mesuré à chaque build** | tout le JS produit, socle compris (52,88 Ko au 20/08) |
| Matière de fond | — | **60 Ko, un seul fichier AVIF** | 19,1 Ko au 20/08 |

Le seuil de 56 est une mesure, pas un renoncement : les 40 étaient une
estimation écrite avant que la pile ne soit choisie. Le socle contient GSAP,
ScrollTrigger et Lenis plus le code du projet ; à 52,88 mesurés, 56 laisse
10 % de marge et refusera l'ajout suivant. Descendre sous 45 supposerait de
déposer Lenis, donc le lissage du défilement — un choix de conception, pas un
réglage de garde.

**Contre-épreuve faite** : seuil abaissé à 50, la garde sort en code 1 ;
rétabli à 56, code 0. Une garde jamais vue rouge n'est pas une garde.

