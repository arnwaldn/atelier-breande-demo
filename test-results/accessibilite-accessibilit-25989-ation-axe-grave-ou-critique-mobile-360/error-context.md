# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibilite.spec.ts >> accessibilité >> collections — zéro violation axe grave ou critique
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
    - generic [ref=e16]:
      - heading "Les pièces" [level=1] [ref=e17]
      - paragraph [ref=e18]: "Elles ont toutes été faites pour un endroit précis : une table de deux mètres, une cage d’escalier de six, un couloir où six boîtiers étaient déjà posés. Chacune se refait, jamais tout à fait à l’identique — le verre soufflé et la patine s’en chargent."
      - list "Typologies" [ref=e19]:
        - listitem [ref=e20]: Suspensions
        - listitem [ref=e21]: Appliques
        - listitem [ref=e22]: Lampes à poser
        - listitem [ref=e23]: Lampadaires
        - listitem [ref=e24]: Restaurations
    - generic [ref=e26]:
      - 'link "Suspension de cage d’escalier : cinq verres opalins échelonnés le long d’un câble noir, allumés dans la montée d’un immeuble ancien laiton patiné brun · verre soufflé opalin · câble textile coton noir · contrepoids acier Traboule à partir de 3 900 à 5 200 €, selon le nombre de verres et la longueur de la descente. 6 à 10 semaines" [ref=e28] [cursor=pointer]':
        - /url: /collections/traboule
        - 'img "Suspension de cage d’escalier : cinq verres opalins échelonnés le long d’un câble noir, allumés dans la montée d’un immeuble ancien" [ref=e31]'
        - generic [ref=e32]:
          - paragraph [ref=e33]: laiton patiné brun · verre soufflé opalin · câble textile coton noir · contrepoids acier
          - generic [ref=e34]: Traboule
          - generic [ref=e35]:
            - generic [ref=e36]: à partir de 3 900 à 5 200 €, selon le nombre de verres et la longueur de la descente.
            - generic [ref=e37]: 6 à 10 semaines
      - link "Suspension linéaire de laiton brossé au-dessus d’une table de salle à manger, trois réflecteurs alignés et verre strié allumé laiton brossé verni mat · verre strié clair Imposte à partir de 1 450 à 1 900 €, selon le verre et le nombre de foyers. 6 à 10 semaines" [ref=e39] [cursor=pointer]:
        - /url: /collections/imposte
        - img "Suspension linéaire de laiton brossé au-dessus d’une table de salle à manger, trois réflecteurs alignés et verre strié allumé" [ref=e42]
        - generic [ref=e43]:
          - paragraph [ref=e44]: laiton brossé verni mat · verre strié clair
          - generic [ref=e45]: Imposte
          - generic [ref=e46]:
            - generic [ref=e47]: à partir de 1 450 à 1 900 €, selon le verre et le nombre de foyers.
            - generic [ref=e48]: 6 à 10 semaines
    - region "La pièce Cerce" [ref=e49]:
      - generic [ref=e50]:
        - link [ref=e51] [cursor=pointer]:
          - /url: /collections/cerce
          - img "Grande suspension circulaire en laiton poli de 90 cm de diamètre, huit verres coniques ambrés allumés sous une verrière" [ref=e53]
        - generic [ref=e54]:
          - paragraph [ref=e55]: laiton poli · verres coniques ambrés · tiges de laiton brasées
          - link "Cerce" [ref=e56] [cursor=pointer]:
            - /url: /collections/cerce
          - paragraph [ref=e57]: "Salle à manger sous verrière, dans une maison de Caluire-et-Cuire. Trois plafonniers du commerce s’y étaient succédé sans rien régler : trop haut, trop dur, trop centré. Il fallait éclairer une table de huit sans installer un projecteur au-dessus des convives."
          - paragraph [ref=e58]:
            - generic [ref=e59]: à partir de 3 200 à 4 100 €, selon le diamètre et le nombre de foyers.
            - generic [ref=e60]: 6 à 10 semaines
    - generic [ref=e62]:
      - link "Applique murale à casquette en acier noir texturé, intérieur en laiton étamé, lumière rasante sur un mur de couloir acier thermolaqué noir texturé · laiton étamé Larmier à partir de 420 à 560 € l’unité ; 2 200 € la série de six. 6 à 10 semaines" [ref=e64] [cursor=pointer]:
        - /url: /collections/larmier
        - img "Applique murale à casquette en acier noir texturé, intérieur en laiton étamé, lumière rasante sur un mur de couloir" [ref=e67]
        - generic [ref=e68]:
          - paragraph [ref=e69]: acier thermolaqué noir texturé · laiton étamé
          - generic [ref=e70]: Larmier
          - generic [ref=e71]:
            - generic [ref=e72]: à partir de 420 à 560 € l’unité ; 2 200 € la série de six.
            - generic [ref=e73]: 6 à 10 semaines
      - 'link "Lampe à poser : globe de verre soufflé fumé gris sur un socle de noyer tourné, tige de laiton et câble textile écru verre soufflé fumé gris · noyer huilé · laiton brossé · câble textile écru Doucine à partir de 680 à 890 €, selon l’essence du socle et la teinte du verre. 6 à 10 semaines" [ref=e75] [cursor=pointer]':
        - /url: /collections/doucine
        - 'img "Lampe à poser : globe de verre soufflé fumé gris sur un socle de noyer tourné, tige de laiton et câble textile écru" [ref=e78]'
        - generic [ref=e79]:
          - paragraph [ref=e80]: verre soufflé fumé gris · noyer huilé · laiton brossé · câble textile écru
          - generic [ref=e81]: Doucine
          - generic [ref=e82]:
            - generic [ref=e83]: à partir de 680 à 890 €, selon l’essence du socle et la teinte du verre.
            - generic [ref=e84]: 6 à 10 semaines
      - 'link "Lampadaire liseuse : fût d’acier noir, bras de laiton déporté et réflecteur repoussé posé au-dessus d’un fauteuil acier noir mat · laiton satiné · fonte cirée Encorbellement à partir de 1 250 à 1 650 €, selon la finition du bras et la longueur du déport. 6 à 10 semaines" [ref=e86] [cursor=pointer]':
        - /url: /collections/encorbellement
        - 'img "Lampadaire liseuse : fût d’acier noir, bras de laiton déporté et réflecteur repoussé posé au-dessus d’un fauteuil" [ref=e89]'
        - generic [ref=e90]:
          - paragraph [ref=e91]: acier noir mat · laiton satiné · fonte cirée
          - generic [ref=e92]: Encorbellement
          - generic [ref=e93]:
            - generic [ref=e94]: à partir de 1 250 à 1 650 €, selon la finition du bras et la longueur du déport.
            - generic [ref=e95]: 6 à 10 semaines
    - region "La pièce Suspension d’atelier des années 1930, remise en lumière" [ref=e96]:
      - generic [ref=e97]:
        - link [ref=e99] [cursor=pointer]:
          - /url: /collections/suspension-1930
          - img "Suspension d’atelier ancienne en tôle émaillée verte à l’extérieur et blanche dedans, remise en état et allumée" [ref=e101]
        - generic [ref=e102]:
          - paragraph [ref=e103]: tôle émaillée d’origine · potence acier · douille porcelaine neuve · molette de laiton
          - link "Suspension d’atelier des années 1930, remise en lumière" [ref=e104] [cursor=pointer]:
            - /url: /collections/suspension-1930
          - paragraph [ref=e105]: "Une suspension d’atelier des années 1930, descendue d’un grenier familial et destinée à un plan de travail de cuisine. Tôle émaillée blanche dedans, verte dehors, potence d’acier. Elle n’avait pas besoin d’une restauration complète : de la sécurité, un redressage, et qu’on lui rende sa molette."
          - paragraph [ref=e106]:
            - generic [ref=e107]: à partir de 320 € l’intervention, remise aux normes et redressage compris.
            - generic [ref=e108]: 2 à 3 semaines
    - generic [ref=e109]:
      - generic [ref=e110]:
        - heading "Vous ne trouvez pas ce que vous cherchez" [level=2] [ref=e112]
        - paragraph [ref=e113]: C’est plutôt bon signe. Tout part d’un dessin, et aucune de ces pièces n’existait avant qu’on nous la demande. Parlez-nous de la pièce à éclairer, de sa hauteur et de ce qui manque quand la nuit tombe.
        - link "Demander une pièce approchante" [ref=e115] [cursor=pointer]:
          - /url: /contact
      - paragraph [ref=e117]:
        - text: Le déroulé d’une commande, du devis à la pose, est détaillé du côté des services.
        - link "Comment se passe une commande" [ref=e118] [cursor=pointer]:
          - /url: /services#etapes
  - contentinfo [ref=e119]:
    - generic [ref=e120]:
      - generic [ref=e121]:
        - generic [ref=e122]:
          - paragraph [ref=e123]: Atelier Bréande — luminaires sur mesure.
          - paragraph [ref=e124]: Lyon et la métropole, jusqu’à 60 km, sur rendez-vous
          - paragraph [ref=e125]: du mardi au vendredi, 9 h – 12 h 30 et 14 h – 18 h ; le samedi matin, sur rendez-vous
        - navigation "Plan du site" [ref=e126]:
          - paragraph [ref=e127]: plan du site
          - list [ref=e128]:
            - listitem [ref=e129]:
              - link "accueil" [ref=e130] [cursor=pointer]:
                - /url: /
            - listitem [ref=e131]:
              - link "l’atelier" [ref=e132] [cursor=pointer]:
                - /url: /latelier
            - listitem [ref=e133]:
              - link "collections" [ref=e134] [cursor=pointer]:
                - /url: /collections
            - listitem [ref=e135]:
              - link "services" [ref=e136] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e137]:
              - link "contact" [ref=e138] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e139]:
              - link "mentions légales" [ref=e140] [cursor=pointer]:
                - /url: /mentions-legales
      - paragraph [ref=e141]: Site fictif de démonstration — conçu et réalisé par Arnaud Porcel. 2026.
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