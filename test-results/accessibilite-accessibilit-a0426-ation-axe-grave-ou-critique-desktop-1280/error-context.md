# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibilite.spec.ts >> accessibilité >> accueil — zéro violation axe grave ou critique
- Location: tests\accessibilite.spec.ts:7:5

# Error details

```
Error: [
  {
    "id": "color-contrast",
    "impact": "serious",
    "tags": [
      "cat.color",
      "wcag2aa",
      "wcag143",
      "TTv5",
      "TT13.c",
      "EN-301-549",
      "EN-9.1.4.3",
      "ACT",
      "RGAAv4",
      "RGAA-3.2.1"
    ],
    "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
    "help": "Elements must meet minimum color contrast ratio thresholds",
    "helpUrl": "https://dequeuniversity.com/rules/axe/4.13/color-contrast?application=playwright",
    "nodes": [
      {
        "any": [
          {
            "id": "color-contrast",
            "data": {
              "fontSize": "16.5pt (22px)",
              "fontWeight": "normal",
              "messageKey": "pseudoContent",
              "expectedContrastRatio": "4.5:1"
            },
            "relatedNodes": [
              {
                "html": "<span class=\"logotype__e-hote\">é</span>",
                "target": [
                  ".logotype__e-hote"
                ]
              }
            ],
            "impact": "serious",
            "message": "Element's background color could not be determined due to a pseudo element"
          }
        ],
        "all": [],
        "none": [],
        "impact": "serious",
        "html": "<span class=\"logotype__e-hote\">é</span>",
        "target": [
          ".logotype__e-hote"
        ],
        "failureSummary": "Fix any of the following:\n  Element's background color could not be determined due to a pseudo element"
      }
    ]
  }
]

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 55

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.13/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "expectedContrastRatio": "4.5:1",
+               "fontSize": "16.5pt (22px)",
+               "fontWeight": "normal",
+               "messageKey": "pseudoContent",
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element's background color could not be determined due to a pseudo element",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<span class=\"logotype__e-hote\">é</span>",
+                 "target": Array [
+                   ".logotype__e-hote",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element's background color could not be determined due to a pseudo element",
+         "html": "<span class=\"logotype__e-hote\">é</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".logotype__e-hote",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
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
    - region [ref=e87]:
      - generic [ref=e88]:
        - img "La salle à manger sous verrière, le cercle de laiton allumé au-dessus de la table" [ref=e91]
        - generic [ref=e92]:
          - heading "Une salle à manger sous verrière" [level=2] [ref=e94]
          - generic [ref=e95]:
            - paragraph [ref=e96]: "Plafond à 3,10 m, une table de huit, et une pièce qui devenait triste à quatre heures l’hiver. À cette hauteur, une seule ampoule au centre creuse un anneau d’ombre autour du plateau : les convives des extrémités mangent dans le gris."
            - paragraph [ref=e97]: Nous avons dessiné un cercle de laiton de 90 cm portant huit foyers bas, de l’ordre de 25 W chacun, à 2 400 K, réglables au variateur. La lumière se répartit sur toute la longueur de la table.
            - paragraph [ref=e98]: "L’alimentation, elle, tombait à 40 cm de l’axe. Plutôt que d’ouvrir le plafond, un bras coudé rattrape la distance et devient le troisième point d’accroche. C’était nécessaire : un cercle suspendu montre le moindre défaut d’aplomb."
            - paragraph [ref=e99]: Le premier a été refondu. Quatre millimètres de faux-rond, qu’on ne voit pas sur l’établi et qu’on ne voit que trop une fois la pièce allumée sous la verrière.
          - link "La fiche de cette suspension" [ref=e100] [cursor=pointer]:
            - /url: /collections/cerce
    - paragraph [ref=e103]: "Une pièce se juge deux fois : éteinte au jour, allumée le soir."
    - region [ref=e104]:
      - generic [ref=e105]:
        - heading "Sorties de l’atelier" [level=2] [ref=e106]
        - separator [ref=e107]
      - generic [ref=e108]:
        - link "Suspension linéaire de laiton brossé au-dessus d’une table de salle à manger, trois réflecteurs alignés et verre strié allumé laiton brossé verni mat · verre strié clair Imposte à partir de 1 450 à 1 900 €, selon le verre et le nombre de foyers. 6 à 10 semaines" [ref=e110] [cursor=pointer]:
          - /url: /collections/imposte
          - img "Suspension linéaire de laiton brossé au-dessus d’une table de salle à manger, trois réflecteurs alignés et verre strié allumé" [ref=e113]
          - generic [ref=e114]:
            - paragraph [ref=e115]: laiton brossé verni mat · verre strié clair
            - generic [ref=e116]: Imposte
            - generic [ref=e117]:
              - generic [ref=e118]: à partir de 1 450 à 1 900 €, selon le verre et le nombre de foyers.
              - generic [ref=e119]: 6 à 10 semaines
        - link "Applique murale à casquette en acier noir texturé, intérieur en laiton étamé, lumière rasante sur un mur de couloir acier thermolaqué noir texturé · laiton étamé Larmier à partir de 420 à 560 € l’unité ; 2 200 € la série de six. 6 à 10 semaines" [ref=e121] [cursor=pointer]:
          - /url: /collections/larmier
          - img "Applique murale à casquette en acier noir texturé, intérieur en laiton étamé, lumière rasante sur un mur de couloir" [ref=e124]
          - generic [ref=e125]:
            - paragraph [ref=e126]: acier thermolaqué noir texturé · laiton étamé
            - generic [ref=e127]: Larmier
            - generic [ref=e128]:
              - generic [ref=e129]: à partir de 420 à 560 € l’unité ; 2 200 € la série de six.
              - generic [ref=e130]: 6 à 10 semaines
        - link "Suspension d’atelier ancienne en tôle émaillée verte à l’extérieur et blanche dedans, remise en état et allumée tôle émaillée d’origine · potence acier · douille porcelaine neuve · molette de laiton Suspension d’atelier des années 1930, remise en lumière à partir de 320 € l’intervention, remise aux normes et redressage compris. 2 à 3 semaines" [ref=e132] [cursor=pointer]:
          - /url: /collections/suspension-1930
          - img "Suspension d’atelier ancienne en tôle émaillée verte à l’extérieur et blanche dedans, remise en état et allumée" [ref=e135]
          - generic [ref=e136]:
            - paragraph [ref=e137]: tôle émaillée d’origine · potence acier · douille porcelaine neuve · molette de laiton
            - generic [ref=e138]: Suspension d’atelier des années 1930, remise en lumière
            - generic [ref=e139]:
              - generic [ref=e140]: à partir de 320 € l’intervention, remise aux normes et redressage compris.
              - generic [ref=e141]: 2 à 3 semaines
      - generic [ref=e142]:
        - heading "Ce que nous ne faisons pas" [level=2] [ref=e144]
        - paragraph [ref=e145]: "Nous n’avons pas de boutique et rien n’est en stock : chaque pièce se fabrique après la commande, ce qui prend des semaines. L’installation électrique du logement ne nous appartient pas non plus. Nous posons sur un point existant, votre électricien fait le reste."
      - paragraph [ref=e147]: On vient à l’atelier sur rendez-vous, dans le 7e. Le déplacement est sans frais dans la métropole, jusqu’à 60 km au-delà, et sur devis plus loin. En ce moment, comptez six à dix semaines entre le devis signé et la pose. Une remise aux normes de pièce ancienne, elle, tient en deux à trois semaines.
      - generic [ref=e148]:
        - paragraph [ref=e149]: "Dites-nous où la lumière manque : la pièce, sa hauteur, ce que vous y faites une fois la nuit tombée. Nous répondons sous deux jours ouvrés."
        - generic [ref=e150]:
          - link "Parler de votre projet" [ref=e151] [cursor=pointer]:
            - /url: /contact
          - link "Voir les pièces" [ref=e152] [cursor=pointer]:
            - /url: /collections
  - contentinfo [ref=e153]:
    - generic [ref=e154]:
      - generic [ref=e155]:
        - generic [ref=e156]:
          - paragraph [ref=e157]: Atelier Bréande — luminaires sur mesure.
          - paragraph [ref=e158]: Lyon et la métropole, jusqu’à 60 km, sur rendez-vous
          - paragraph [ref=e159]: du mardi au vendredi, 9 h – 12 h 30 et 14 h – 18 h ; le samedi matin, sur rendez-vous
        - navigation "Plan du site" [ref=e160]:
          - paragraph [ref=e161]: plan du site
          - list [ref=e162]:
            - listitem [ref=e163]:
              - link "accueil" [ref=e164] [cursor=pointer]:
                - /url: /
            - listitem [ref=e165]:
              - link "l’atelier" [ref=e166] [cursor=pointer]:
                - /url: /latelier
            - listitem [ref=e167]:
              - link "collections" [ref=e168] [cursor=pointer]:
                - /url: /collections
            - listitem [ref=e169]:
              - link "services" [ref=e170] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e171]:
              - link "contact" [ref=e172] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e173]:
              - link "mentions légales" [ref=e174] [cursor=pointer]:
                - /url: /mentions-legales
      - paragraph [ref=e175]: Site fictif de démonstration — conçu et réalisé par Arnaud Porcel. 2026.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import AxeBuilder from '@axe-core/playwright';
  3  | import { PAGES, attendreImmobilite, anneauFocusVisible, decrireFocus, violationsAxeAExiger } from './utils';
  4  | 
  5  | test.describe('accessibilité', () => {
  6  |   for (const p of PAGES) {
  7  |     test(`${p.nom} — zéro violation axe grave ou critique`, async ({ page }) => {
  8  |       await page.goto(p.chemin);
  9  |       // Attente d'immobilité AVANT la mesure : l'accueil a une animation d'ouverture
  10 |       // (« allumage », 1,1 s). Scanner en plein fondu trouverait un contraste
  11 |       // temporaire qui n'existe dans aucune charte — voir attendreImmobilite().
  12 |       await attendreImmobilite(page);
  13 | 
  14 |       const resultats = await new AxeBuilder({ page }).analyze();
  15 |       const aExiger = violationsAxeAExiger(resultats);
> 16 |       expect(aExiger, JSON.stringify(aExiger, null, 2)).toEqual([]);
     |                                                         ^ Error: [
  17 |     });
  18 |   }
  19 | 
  20 |   test('les erreurs de validation du formulaire restent accessibles après une soumission invalide', async ({
  21 |     page,
  22 |   }) => {
  23 |     await page.goto('/contact');
  24 |     await attendreImmobilite(page);
  25 |     await page.getByRole('button', { name: 'Envoi désactivé' }).click();
  26 |     await expect(page.locator('#nom-erreur')).toBeVisible();
  27 |     // Seconde attente (vague B) : la page Contact porte maintenant ses propres
  28 |     // révélations au défilement (colonne de droite, voir data-revelation dans
  29 |     // contact.astro) — leur IntersectionObserver peut se déclencher après la
  30 |     // première attente, en écho au clic. Sans cette seconde immobilité, axe
  31 |     // peut scanner un texte encore en fondu, à un contraste de transition qui
  32 |     // n'existe dans aucune charte (même piège que documenté sur attendreImmobilite).
  33 |     await attendreImmobilite(page);
  34 | 
  35 |     const resultats = await new AxeBuilder({ page }).analyze();
  36 |     const aExiger = violationsAxeAExiger(resultats);
  37 |     expect(aExiger, JSON.stringify(aExiger, null, 2)).toEqual([]);
  38 |   });
  39 | 
  40 |   test('l’accueil se parcourt entièrement au clavier jusqu’au formulaire de contact, sans piège de focus, anneau visible', async ({
  41 |     page,
  42 |   }) => {
  43 |     await page.goto('/');
  44 |     await attendreImmobilite(page);
  45 | 
  46 |     // 1) Premier arrêt : le lien d'évitement, avec un anneau visible.
  47 |     await page.keyboard.press('Tab');
  48 |     await expect(page.locator('.skip-link')).toBeFocused();
  49 |     expect(await anneauFocusVisible(page)).toBe(true);
  50 | 
  51 |     // 2) On tabule jusqu'au lien « Contact » du menu, sans jamais revisiter un élément
  52 |     //    déjà rencontré (piège de focus) et avec un anneau visible à chaque arrêt.
  53 |     const dejaVus = new Set<string>();
  54 |     let lienContactAtteint = false;
  55 |     for (let i = 0; i < 20 && !lienContactAtteint; i++) {
  56 |       await page.keyboard.press('Tab');
  57 |       const description = await decrireFocus(page);
  58 |       expect(description, 'le focus est retombé sur le document (body) — piège possible').not.toBeNull();
  59 |       expect(dejaVus.has(description!), `piège de focus détecté : ${description} revisité`).toBe(false);
  60 |       dejaVus.add(description!);
  61 |       expect(await anneauFocusVisible(page), `anneau de focus invisible sur ${description}`).toBe(true);
  62 | 
  63 |       lienContactAtteint = await page.evaluate(
  64 |         () => document.activeElement?.getAttribute('href') === '/contact'
  65 |       );
  66 |     }
  67 |     expect(lienContactAtteint, 'le lien « Contact » n’a jamais reçu le focus').toBe(true);
  68 | 
  69 |     // 3) Activation au clavier : on atteint bien la page de contact.
  70 |     await page.keyboard.press('Enter');
  71 |     await expect(page).toHaveURL(/\/contact$/);
  72 |     await attendreImmobilite(page);
  73 | 
  74 |     // 4) On continue jusqu'aux trois champs du formulaire, dans l'ordre.
  75 |     const champsAttendus = ['nom', 'email', 'message'];
  76 |     const champsAtteints: string[] = [];
  77 |     for (let i = 0; i < 25 && champsAtteints.length < champsAttendus.length; i++) {
  78 |       await page.keyboard.press('Tab');
  79 |       expect(await anneauFocusVisible(page)).toBe(true);
  80 |       const id = await page.evaluate(() => (document.activeElement as HTMLElement | null)?.id ?? '');
  81 |       if (champsAttendus.includes(id)) champsAtteints.push(id);
  82 |     }
  83 |     expect(champsAtteints, 'les trois champs du formulaire n’ont pas tous reçu le focus, dans l’ordre').toEqual(
  84 |       champsAttendus
  85 |     );
  86 | 
  87 |     // 5) Le bouton d'envoi suit directement le dernier champ.
  88 |     await page.keyboard.press('Tab');
  89 |     await expect(page.getByRole('button', { name: 'Envoi désactivé' })).toBeFocused();
  90 |     expect(await anneauFocusVisible(page)).toBe(true);
  91 |   });
  92 | });
  93 | 
```