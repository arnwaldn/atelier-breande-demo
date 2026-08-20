# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: console-et-entetes.spec.ts >> console et en-têtes >> accueil — zéro violation de la politique de sécurité du contenu (CSP)
- Location: tests\console-et-entetes.spec.ts:30:5

# Error details

```
Error: script-src-elem — bloqué : inline

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "script-src-elem — bloqué : inline",
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Aller au contenu" [ref=e2] [cursor=pointer]:
    - /url: "#contenu"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Atelier Bréande — retour à l’accueil" [ref=e5] [cursor=pointer]:
        - /url: /
        - generic [ref=e6]:
          - text: Atelier Br
          - generic [ref=e7]: é é
          - text: ande
      - navigation "Navigation principale" [ref=e8]:
        - list [ref=e9]:
          - listitem [ref=e10]:
            - link "accueil" [ref=e11] [cursor=pointer]:
              - /url: /
          - listitem [ref=e12]:
            - link "l’atelier" [ref=e13] [cursor=pointer]:
              - /url: /latelier
          - listitem [ref=e14]:
            - link "collections" [ref=e15] [cursor=pointer]:
              - /url: /collections
          - listitem [ref=e16]:
            - link "services" [ref=e17] [cursor=pointer]:
              - /url: /services
          - listitem [ref=e18]:
            - link "contact" [ref=e19] [cursor=pointer]:
              - /url: /contact
      - link "Prendre rendez-vous" [ref=e21] [cursor=pointer]:
        - /url: /contact
  - complementary:
    - generic: 5 000 K
  - main [ref=e22]:
    - region "L’atelier" [ref=e23]:
      - 'img "L’établi de l’atelier le soir : pièces de laiton, globes de verre soufflé et une suspension allumée qui éclaire le plan de travail" [ref=e24]'
      - generic [ref=e26]:
        - heading "Un luminaire n’éclaire bien qu’un seul endroit." [level=1] [ref=e27]: Un luminairen’éclaire bienqu’un seul endroit.
        - paragraph [ref=e28]: Atelier de luminaires à Lyon 7e, ouvert en 2011. Nous dessinons et fabriquons chaque pièce à l’établi, pour une table, une cage d’escalier ou un couloir précis. Création, restauration, conseil d’éclairage.
        - generic [ref=e29]:
          - link "Parler de votre projet" [ref=e30] [cursor=pointer]:
            - /url: /contact
          - link "Voir les pièces" [ref=e31] [cursor=pointer]:
            - /url: /collections
        - paragraph [ref=e32]: "Image produite par intelligence artificielle. Atelier Bréande n’existe pas : ni ce lieu, ni ces objets, ni cette scène ne sont réels."
    - region "Repères de l’atelier" [ref=e33]:
      - generic [ref=e34]:
        - paragraph [ref=e36]:
          - generic [ref=e37]: "2011"
          - generic [ref=e38]: l’atelier a ouvert
        - paragraph [ref=e40]:
          - generic [ref=e41]: Lyon 7e
          - generic [ref=e42]: tout est fabriqué ici, rive gauche du Rhône
        - paragraph [ref=e44]:
          - generic [ref=e45]: 6 à 10 semaines
          - generic [ref=e46]: entre le dessin validé et la pose
        - paragraph [ref=e48]:
          - generic [ref=e49]: 5 à 10 jours
          - generic [ref=e50]: entre la visite et le devis
    - paragraph [ref=e52]: Nous ne savons pas dessiner un luminaire sans savoir où il ira.
    - 'region "Les trois gestes de l’atelier : créer, restaurer, conseiller" [ref=e53]':
      - generic [ref=e55]:
        - article [ref=e56]:
          - img "Croquis à l’échelle 1 et gabarit de carton, punaisés au mur de l’atelier" [ref=e60]
          - generic [ref=e61]:
            - heading "Créer" [level=2] [ref=e62]
            - paragraph [ref=e63]: "On prête des ampoules d’essai : la teinte se choisit chez vous, le soir."
            - link "La création en détail" [ref=e64] [cursor=pointer]:
              - /url: /services#creation
        - article [ref=e65]:
          - img "Suspension ancienne démontée sur l’établi, câblage textile déposé" [ref=e69]
          - generic [ref=e70]:
            - heading "Restaurer" [level=2] [ref=e71]
            - paragraph [ref=e72]: Deux à trois semaines pour un circuit neuf sous une patine qu’on ne touche pas.
            - link "La restauration en détail" [ref=e73] [cursor=pointer]:
              - /url: /services#restauration
        - article [ref=e74]:
          - img "Plan d’éclairage annoté et ampoules d’essai posées sur une table" [ref=e78]
          - generic [ref=e79]:
            - heading "Conseiller" [level=2] [ref=e80]
            - paragraph [ref=e81]: Parfois il n’y a rien à fabriquer, juste un plan avant de refermer les murs.
            - link "Le conseil en détail" [ref=e82] [cursor=pointer]:
              - /url: /services#conseil
    - region [ref=e83]:
      - generic [ref=e84]:
        - img "La salle à manger sous verrière, le cercle de laiton allumé au-dessus de la table" [ref=e87]
        - generic [ref=e88]:
          - heading "Une salle à manger sous verrière" [level=2] [ref=e90]
          - generic [ref=e91]:
            - paragraph [ref=e92]: "Plafond à 3,10 m, une table de huit, et une pièce qui devenait triste à quatre heures l’hiver. À cette hauteur, une seule ampoule au centre creuse un anneau d’ombre autour du plateau : les convives des extrémités mangent dans le gris."
            - paragraph [ref=e93]: Nous avons dessiné un cercle de laiton de 90 cm portant huit foyers bas, de l’ordre de 25 W chacun, à 2 400 K, réglables au variateur. La lumière se répartit sur toute la longueur de la table.
            - paragraph [ref=e94]: "L’alimentation, elle, tombait à 40 cm de l’axe. Plutôt que d’ouvrir le plafond, un bras coudé rattrape la distance et devient le troisième point d’accroche. C’était nécessaire : un cercle suspendu montre le moindre défaut d’aplomb."
            - paragraph [ref=e95]: Le premier a été refondu. Quatre millimètres de faux-rond, qu’on ne voit pas sur l’établi et qu’on ne voit que trop une fois la pièce allumée sous la verrière.
          - link "La fiche de cette suspension" [ref=e96] [cursor=pointer]:
            - /url: /collections/cerce
    - paragraph [ref=e99]: "Une pièce se juge deux fois : éteinte au jour, allumée le soir."
    - region [ref=e100]:
      - generic [ref=e101]:
        - heading "Sorties de l’atelier" [level=2] [ref=e102]
        - separator [ref=e103]
      - generic [ref=e104]:
        - link "Suspension linéaire de laiton brossé au-dessus d’une table de salle à manger, trois réflecteurs alignés et verre strié allumé laiton brossé verni mat · verre strié clair Imposte à partir de 1 450 à 1 900 €, selon le verre et le nombre de foyers. 6 à 10 semaines" [ref=e106] [cursor=pointer]:
          - /url: /collections/imposte
          - img "Suspension linéaire de laiton brossé au-dessus d’une table de salle à manger, trois réflecteurs alignés et verre strié allumé" [ref=e109]
          - generic [ref=e110]:
            - paragraph [ref=e111]: laiton brossé verni mat · verre strié clair
            - generic [ref=e112]: Imposte
            - generic [ref=e113]:
              - generic [ref=e114]: à partir de 1 450 à 1 900 €, selon le verre et le nombre de foyers.
              - generic [ref=e115]: 6 à 10 semaines
        - link "Applique murale à casquette en acier noir texturé, intérieur en laiton étamé, lumière rasante sur un mur de couloir acier thermolaqué noir texturé · laiton étamé Larmier à partir de 420 à 560 € l’unité ; 2 200 € la série de six. 6 à 10 semaines" [ref=e117] [cursor=pointer]:
          - /url: /collections/larmier
          - img "Applique murale à casquette en acier noir texturé, intérieur en laiton étamé, lumière rasante sur un mur de couloir" [ref=e120]
          - generic [ref=e121]:
            - paragraph [ref=e122]: acier thermolaqué noir texturé · laiton étamé
            - generic [ref=e123]: Larmier
            - generic [ref=e124]:
              - generic [ref=e125]: à partir de 420 à 560 € l’unité ; 2 200 € la série de six.
              - generic [ref=e126]: 6 à 10 semaines
        - link "Suspension d’atelier ancienne en tôle émaillée verte à l’extérieur et blanche dedans, remise en état et allumée tôle émaillée d’origine · potence acier · douille porcelaine neuve · molette de laiton Suspension d’atelier des années 1930, remise en lumière à partir de 320 € l’intervention, remise aux normes et redressage compris. 2 à 3 semaines" [ref=e128] [cursor=pointer]:
          - /url: /collections/suspension-1930
          - img "Suspension d’atelier ancienne en tôle émaillée verte à l’extérieur et blanche dedans, remise en état et allumée" [ref=e131]
          - generic [ref=e132]:
            - paragraph [ref=e133]: tôle émaillée d’origine · potence acier · douille porcelaine neuve · molette de laiton
            - generic [ref=e134]: Suspension d’atelier des années 1930, remise en lumière
            - generic [ref=e135]:
              - generic [ref=e136]: à partir de 320 € l’intervention, remise aux normes et redressage compris.
              - generic [ref=e137]: 2 à 3 semaines
      - generic [ref=e138]:
        - heading "Ce que nous ne faisons pas" [level=2] [ref=e140]
        - paragraph [ref=e141]: "Nous n’avons pas de boutique et rien n’est en stock : chaque pièce se fabrique après la commande, ce qui prend des semaines. L’installation électrique du logement ne nous appartient pas non plus. Nous posons sur un point existant, votre électricien fait le reste."
      - paragraph [ref=e143]: On vient à l’atelier sur rendez-vous, dans le 7e. Le déplacement est sans frais dans la métropole, jusqu’à 60 km au-delà, et sur devis plus loin. En ce moment, comptez six à dix semaines entre le devis signé et la pose. Une remise aux normes de pièce ancienne, elle, tient en deux à trois semaines.
      - generic [ref=e144]:
        - paragraph [ref=e145]: "Dites-nous où la lumière manque : la pièce, sa hauteur, ce que vous y faites une fois la nuit tombée. Nous répondons sous deux jours ouvrés."
        - generic [ref=e146]:
          - link "Parler de votre projet" [ref=e147] [cursor=pointer]:
            - /url: /contact
          - link "Voir les pièces" [ref=e148] [cursor=pointer]:
            - /url: /collections
  - contentinfo [ref=e149]:
    - generic [ref=e150]:
      - generic [ref=e151]:
        - generic [ref=e152]:
          - paragraph [ref=e153]: Atelier Bréande — luminaires sur mesure.
          - paragraph [ref=e154]: Lyon et la métropole, jusqu’à 60 km, sur rendez-vous
          - paragraph [ref=e155]: du mardi au vendredi, 9 h – 12 h 30 et 14 h – 18 h ; le samedi matin, sur rendez-vous
        - navigation "Plan du site" [ref=e156]:
          - paragraph [ref=e157]: plan du site
          - list [ref=e158]:
            - listitem [ref=e159]:
              - link "accueil" [ref=e160] [cursor=pointer]:
                - /url: /
            - listitem [ref=e161]:
              - link "l’atelier" [ref=e162] [cursor=pointer]:
                - /url: /latelier
            - listitem [ref=e163]:
              - link "collections" [ref=e164] [cursor=pointer]:
                - /url: /collections
            - listitem [ref=e165]:
              - link "services" [ref=e166] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e167]:
              - link "contact" [ref=e168] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e169]:
              - link "mentions légales" [ref=e170] [cursor=pointer]:
                - /url: /mentions-legales
      - paragraph [ref=e171]: Site fictif de démonstration — conçu et réalisé par Arnaud Porcel. 2026.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { PAGES, appliquerCSP } from './utils';
  3  | 
  4  | test.describe('console et en-têtes', () => {
  5  |   for (const p of PAGES) {
  6  |     test(`${p.nom} — zéro message de console, zéro erreur, zéro requête en échec`, async ({ page }) => {
  7  |       const messages: string[] = [];
  8  |       page.on('console', (msg) => {
  9  |         if (msg.type() === 'error' || msg.type() === 'warning') {
  10 |           messages.push(`[console:${msg.type()}] ${msg.text()}`);
  11 |         }
  12 |       });
  13 |       page.on('pageerror', (err) => messages.push(`[pageerror] ${err.message}`));
  14 |       page.on('requestfailed', (req) => {
  15 |         messages.push(`[requestfailed] ${req.method()} ${req.url()} — ${req.failure()?.errorText ?? ''}`);
  16 |       });
  17 |       page.on('response', (res) => {
  18 |         if (res.status() >= 400) messages.push(`[réponse ${res.status()}] ${res.url()}`);
  19 |       });
  20 | 
  21 |       const reponse = await page.goto(p.chemin);
  22 |       await page.waitForLoadState('networkidle');
  23 | 
  24 |       expect(reponse?.ok(), `réponse HTTP non-OK pour ${p.chemin}`).toBe(true);
  25 |       expect(messages, messages.join('\n')).toEqual([]);
  26 |     });
  27 |   }
  28 | 
  29 |   for (const p of PAGES) {
  30 |     test(`${p.nom} — zéro violation de la politique de sécurité du contenu (CSP)`, async ({ page }) => {
  31 |       const violations: string[] = [];
  32 |       await page.exposeFunction('__signalerViolationCSP', (detail: string) => {
  33 |         violations.push(detail);
  34 |       });
  35 |       await page.addInitScript(() => {
  36 |         document.addEventListener('securitypolicyviolation', (e) => {
  37 |           // @ts-expect-error — pont vers Node posé par exposeFunction, invisible du typeur.
  38 |           window.__signalerViolationCSP(`${e.violatedDirective} — bloqué : ${e.blockedURI}`);
  39 |         });
  40 |       });
  41 | 
  42 |       // vercel.json (racine du projet, hors périmètre de ce harnais) déclare une CSP
  43 |       // stricte, mais ces en-têtes sont posés par le réseau Vercel en production — le
  44 |       // serveur `astro preview` utilisé ici ne les envoie pas. On la reconstitue par
  45 |       // interception de route pour exercer réellement la CSP en local (voir utils.ts).
  46 |       await appliquerCSP(page);
  47 | 
  48 |       await page.goto(p.chemin);
  49 |       await page.waitForLoadState('networkidle');
  50 | 
> 51 |       expect(violations, violations.join('\n')).toEqual([]);
     |                                                 ^ Error: script-src-elem — bloqué : inline
  52 |     });
  53 |   }
  54 | 
  55 |   test('aucune ressource chargée sur les quatre pages ne provient d’un domaine externe', async ({
  56 |     page,
  57 |     baseURL,
  58 |   }) => {
  59 |     const origineAttendue = new URL(baseURL!).origin;
  60 |     const externes: string[] = [];
  61 |     page.on('request', (req) => {
  62 |       const url = req.url();
  63 |       if (url.startsWith('data:') || url.startsWith('blob:')) return;
  64 |       if (new URL(url).origin !== origineAttendue) externes.push(url);
  65 |     });
  66 | 
  67 |     for (const p of PAGES) {
  68 |       await page.goto(p.chemin);
  69 |       await page.waitForLoadState('networkidle');
  70 |     }
  71 | 
  72 |     expect(externes, `ressources externes chargées :\n${externes.join('\n')}`).toEqual([]);
  73 |   });
  74 | });
  75 | 
```