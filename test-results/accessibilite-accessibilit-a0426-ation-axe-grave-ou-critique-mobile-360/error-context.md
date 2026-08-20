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
      - group [ref=e9]:
        - generic "Menu" [ref=e10] [cursor=pointer]
  - complementary
  - main [ref=e15]:
    - region "L’atelier" [ref=e16]:
      - 'img "L’établi de l’atelier le soir : pièces de laiton, globes de verre soufflé et une suspension allumée qui éclaire le plan de travail" [ref=e17]'
      - generic [ref=e19]:
        - heading "Un luminaire n’éclaire bien qu’un seul endroit." [level=1] [ref=e20]: Un luminairen’éclaire bienqu’un seul endroit.
        - paragraph [ref=e21]: Atelier de luminaires à Lyon 7e, ouvert en 2011. Nous dessinons et fabriquons chaque pièce à l’établi, pour une table, une cage d’escalier ou un couloir précis. Création, restauration, conseil d’éclairage.
        - generic [ref=e22]:
          - link "Parler de votre projet" [ref=e23] [cursor=pointer]:
            - /url: /contact
          - link "Voir les pièces" [ref=e24] [cursor=pointer]:
            - /url: /collections
        - paragraph [ref=e25]: "Image produite par intelligence artificielle. Atelier Bréande n’existe pas : ni ce lieu, ni ces objets, ni cette scène ne sont réels."
    - region "Repères de l’atelier" [ref=e26]:
      - generic [ref=e27]:
        - paragraph [ref=e29]:
          - generic [ref=e30]: "2011"
          - generic [ref=e31]: l’atelier a ouvert
        - paragraph [ref=e33]:
          - generic [ref=e34]: Lyon 7e
          - generic [ref=e35]: tout est fabriqué ici, rive gauche du Rhône
        - paragraph [ref=e37]:
          - generic [ref=e38]: 6 à 10 semaines
          - generic [ref=e39]: entre le dessin validé et la pose
        - paragraph [ref=e41]:
          - generic [ref=e42]: 5 à 10 jours
          - generic [ref=e43]: entre la visite et le devis
    - paragraph [ref=e45]: Nous ne savons pas dessiner un luminaire sans savoir où il ira.
    - 'region "Les trois gestes de l’atelier : créer, restaurer, conseiller" [ref=e46]':
      - generic [ref=e48]:
        - article [ref=e49]:
          - img "Croquis à l’échelle 1 et gabarit de carton, punaisés au mur de l’atelier" [ref=e53]
          - generic [ref=e54]:
            - heading "Créer" [level=2] [ref=e55]
            - paragraph [ref=e56]: "On prête des ampoules d’essai : la teinte se choisit chez vous, le soir."
            - link "La création en détail" [ref=e57] [cursor=pointer]:
              - /url: /services#creation
        - article [ref=e58]:
          - img "Suspension ancienne démontée sur l’établi, câblage textile déposé" [ref=e62]
          - generic [ref=e63]:
            - heading "Restaurer" [level=2] [ref=e64]
            - paragraph [ref=e65]: Deux à trois semaines pour un circuit neuf sous une patine qu’on ne touche pas.
            - link "La restauration en détail" [ref=e66] [cursor=pointer]:
              - /url: /services#restauration
        - article [ref=e67]:
          - img "Plan d’éclairage annoté et ampoules d’essai posées sur une table" [ref=e71]
          - generic [ref=e72]:
            - heading "Conseiller" [level=2] [ref=e73]
            - paragraph [ref=e74]: Parfois il n’y a rien à fabriquer, juste un plan avant de refermer les murs.
            - link "Le conseil en détail" [ref=e75] [cursor=pointer]:
              - /url: /services#conseil
    - region [ref=e76]:
      - generic [ref=e77]:
        - img "La salle à manger sous verrière, le cercle de laiton allumé au-dessus de la table" [ref=e80]
        - generic [ref=e81]:
          - heading "Une salle à manger sous verrière" [level=2] [ref=e83]
          - generic [ref=e84]:
            - paragraph [ref=e85]: "Plafond à 3,10 m, une table de huit, et une pièce qui devenait triste à quatre heures l’hiver. À cette hauteur, une seule ampoule au centre creuse un anneau d’ombre autour du plateau : les convives des extrémités mangent dans le gris."
            - paragraph [ref=e86]: Nous avons dessiné un cercle de laiton de 90 cm portant huit foyers bas, de l’ordre de 25 W chacun, à 2 400 K, réglables au variateur. La lumière se répartit sur toute la longueur de la table.
            - paragraph [ref=e87]: "L’alimentation, elle, tombait à 40 cm de l’axe. Plutôt que d’ouvrir le plafond, un bras coudé rattrape la distance et devient le troisième point d’accroche. C’était nécessaire : un cercle suspendu montre le moindre défaut d’aplomb."
            - paragraph [ref=e88]: Le premier a été refondu. Quatre millimètres de faux-rond, qu’on ne voit pas sur l’établi et qu’on ne voit que trop une fois la pièce allumée sous la verrière.
          - link "La fiche de cette suspension" [ref=e89] [cursor=pointer]:
            - /url: /collections/cerce
    - paragraph [ref=e92]: "Une pièce se juge deux fois : éteinte au jour, allumée le soir."
    - region [ref=e93]:
      - generic [ref=e94]:
        - heading "Sorties de l’atelier" [level=2] [ref=e95]
        - separator [ref=e96]
      - generic [ref=e97]:
        - link "Suspension linéaire de laiton brossé au-dessus d’une table de salle à manger, trois réflecteurs alignés et verre strié allumé laiton brossé verni mat · verre strié clair Imposte à partir de 1 450 à 1 900 €, selon le verre et le nombre de foyers. 6 à 10 semaines" [ref=e99] [cursor=pointer]:
          - /url: /collections/imposte
          - img "Suspension linéaire de laiton brossé au-dessus d’une table de salle à manger, trois réflecteurs alignés et verre strié allumé" [ref=e102]
          - generic [ref=e103]:
            - paragraph [ref=e104]: laiton brossé verni mat · verre strié clair
            - generic [ref=e105]: Imposte
            - generic [ref=e106]:
              - generic [ref=e107]: à partir de 1 450 à 1 900 €, selon le verre et le nombre de foyers.
              - generic [ref=e108]: 6 à 10 semaines
        - link "Applique murale à casquette en acier noir texturé, intérieur en laiton étamé, lumière rasante sur un mur de couloir acier thermolaqué noir texturé · laiton étamé Larmier à partir de 420 à 560 € l’unité ; 2 200 € la série de six. 6 à 10 semaines" [ref=e110] [cursor=pointer]:
          - /url: /collections/larmier
          - img "Applique murale à casquette en acier noir texturé, intérieur en laiton étamé, lumière rasante sur un mur de couloir" [ref=e113]
          - generic [ref=e114]:
            - paragraph [ref=e115]: acier thermolaqué noir texturé · laiton étamé
            - generic [ref=e116]: Larmier
            - generic [ref=e117]:
              - generic [ref=e118]: à partir de 420 à 560 € l’unité ; 2 200 € la série de six.
              - generic [ref=e119]: 6 à 10 semaines
        - link "Suspension d’atelier ancienne en tôle émaillée verte à l’extérieur et blanche dedans, remise en état et allumée tôle émaillée d’origine · potence acier · douille porcelaine neuve · molette de laiton Suspension d’atelier des années 1930, remise en lumière à partir de 320 € l’intervention, remise aux normes et redressage compris. 2 à 3 semaines" [ref=e121] [cursor=pointer]:
          - /url: /collections/suspension-1930
          - img "Suspension d’atelier ancienne en tôle émaillée verte à l’extérieur et blanche dedans, remise en état et allumée" [ref=e124]
          - generic [ref=e125]:
            - paragraph [ref=e126]: tôle émaillée d’origine · potence acier · douille porcelaine neuve · molette de laiton
            - generic [ref=e127]: Suspension d’atelier des années 1930, remise en lumière
            - generic [ref=e128]:
              - generic [ref=e129]: à partir de 320 € l’intervention, remise aux normes et redressage compris.
              - generic [ref=e130]: 2 à 3 semaines
      - generic [ref=e131]:
        - heading "Ce que nous ne faisons pas" [level=2] [ref=e133]
        - paragraph [ref=e134]: "Nous n’avons pas de boutique et rien n’est en stock : chaque pièce se fabrique après la commande, ce qui prend des semaines. L’installation électrique du logement ne nous appartient pas non plus. Nous posons sur un point existant, votre électricien fait le reste."
      - paragraph [ref=e136]: On vient à l’atelier sur rendez-vous, dans le 7e. Le déplacement est sans frais dans la métropole, jusqu’à 60 km au-delà, et sur devis plus loin. En ce moment, comptez six à dix semaines entre le devis signé et la pose. Une remise aux normes de pièce ancienne, elle, tient en deux à trois semaines.
      - generic [ref=e137]:
        - paragraph [ref=e138]: "Dites-nous où la lumière manque : la pièce, sa hauteur, ce que vous y faites une fois la nuit tombée. Nous répondons sous deux jours ouvrés."
        - generic [ref=e139]:
          - link "Parler de votre projet" [ref=e140] [cursor=pointer]:
            - /url: /contact
          - link "Voir les pièces" [ref=e141] [cursor=pointer]:
            - /url: /collections
  - contentinfo [ref=e142]:
    - generic [ref=e143]:
      - generic [ref=e144]:
        - generic [ref=e145]:
          - paragraph [ref=e146]: Atelier Bréande — luminaires sur mesure.
          - paragraph [ref=e147]: Lyon et la métropole, jusqu’à 60 km, sur rendez-vous
          - paragraph [ref=e148]: du mardi au vendredi, 9 h – 12 h 30 et 14 h – 18 h ; le samedi matin, sur rendez-vous
        - navigation "Plan du site" [ref=e149]:
          - paragraph [ref=e150]: plan du site
          - list [ref=e151]:
            - listitem [ref=e152]:
              - link "accueil" [ref=e153] [cursor=pointer]:
                - /url: /
            - listitem [ref=e154]:
              - link "l’atelier" [ref=e155] [cursor=pointer]:
                - /url: /latelier
            - listitem [ref=e156]:
              - link "collections" [ref=e157] [cursor=pointer]:
                - /url: /collections
            - listitem [ref=e158]:
              - link "services" [ref=e159] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e160]:
              - link "contact" [ref=e161] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e162]:
              - link "mentions légales" [ref=e163] [cursor=pointer]:
                - /url: /mentions-legales
      - paragraph [ref=e164]: Site fictif de démonstration — conçu et réalisé par Arnaud Porcel. 2026.
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