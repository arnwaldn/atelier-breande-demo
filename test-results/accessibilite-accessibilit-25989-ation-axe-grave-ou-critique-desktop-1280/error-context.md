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
    - generic [ref=e23]:
      - heading "Les pièces" [level=1] [ref=e24]
      - paragraph [ref=e25]: "Elles ont toutes été faites pour un endroit précis : une table de deux mètres, une cage d’escalier de six, un couloir où six boîtiers étaient déjà posés. Chacune se refait, jamais tout à fait à l’identique — le verre soufflé et la patine s’en chargent."
      - list "Typologies" [ref=e26]:
        - listitem [ref=e27]: Suspensions
        - listitem [ref=e28]: Appliques
        - listitem [ref=e29]: Lampes à poser
        - listitem [ref=e30]: Lampadaires
        - listitem [ref=e31]: Restaurations
    - generic [ref=e33]:
      - 'link "Suspension de cage d’escalier : cinq verres opalins échelonnés le long d’un câble noir, allumés dans la montée d’un immeuble ancien laiton patiné brun · verre soufflé opalin · câble textile coton noir · contrepoids acier Traboule à partir de 3 900 à 5 200 €, selon le nombre de verres et la longueur de la descente. 6 à 10 semaines" [ref=e35] [cursor=pointer]':
        - /url: /collections/traboule
        - 'img "Suspension de cage d’escalier : cinq verres opalins échelonnés le long d’un câble noir, allumés dans la montée d’un immeuble ancien" [ref=e38]'
        - generic [ref=e39]:
          - paragraph [ref=e40]: laiton patiné brun · verre soufflé opalin · câble textile coton noir · contrepoids acier
          - generic [ref=e41]: Traboule
          - generic [ref=e42]:
            - generic [ref=e43]: à partir de 3 900 à 5 200 €, selon le nombre de verres et la longueur de la descente.
            - generic [ref=e44]: 6 à 10 semaines
      - link "Suspension linéaire de laiton brossé au-dessus d’une table de salle à manger, trois réflecteurs alignés et verre strié allumé laiton brossé verni mat · verre strié clair Imposte à partir de 1 450 à 1 900 €, selon le verre et le nombre de foyers. 6 à 10 semaines" [ref=e46] [cursor=pointer]:
        - /url: /collections/imposte
        - img "Suspension linéaire de laiton brossé au-dessus d’une table de salle à manger, trois réflecteurs alignés et verre strié allumé" [ref=e49]
        - generic [ref=e50]:
          - paragraph [ref=e51]: laiton brossé verni mat · verre strié clair
          - generic [ref=e52]: Imposte
          - generic [ref=e53]:
            - generic [ref=e54]: à partir de 1 450 à 1 900 €, selon le verre et le nombre de foyers.
            - generic [ref=e55]: 6 à 10 semaines
    - region "La pièce Cerce" [ref=e56]:
      - generic [ref=e57]:
        - link [ref=e58] [cursor=pointer]:
          - /url: /collections/cerce
          - img "Grande suspension circulaire en laiton poli de 90 cm de diamètre, huit verres coniques ambrés allumés sous une verrière" [ref=e60]
        - generic [ref=e61]:
          - paragraph [ref=e62]: laiton poli · verres coniques ambrés · tiges de laiton brasées
          - link "Cerce" [ref=e63] [cursor=pointer]:
            - /url: /collections/cerce
          - paragraph [ref=e64]: "Salle à manger sous verrière, dans une maison de Caluire-et-Cuire. Trois plafonniers du commerce s’y étaient succédé sans rien régler : trop haut, trop dur, trop centré. Il fallait éclairer une table de huit sans installer un projecteur au-dessus des convives."
          - paragraph [ref=e65]:
            - generic [ref=e66]: à partir de 3 200 à 4 100 €, selon le diamètre et le nombre de foyers.
            - generic [ref=e67]: 6 à 10 semaines
    - generic [ref=e69]:
      - link "Applique murale à casquette en acier noir texturé, intérieur en laiton étamé, lumière rasante sur un mur de couloir acier thermolaqué noir texturé · laiton étamé Larmier à partir de 420 à 560 € l’unité ; 2 200 € la série de six. 6 à 10 semaines" [ref=e71] [cursor=pointer]:
        - /url: /collections/larmier
        - img "Applique murale à casquette en acier noir texturé, intérieur en laiton étamé, lumière rasante sur un mur de couloir" [ref=e74]
        - generic [ref=e75]:
          - paragraph [ref=e76]: acier thermolaqué noir texturé · laiton étamé
          - generic [ref=e77]: Larmier
          - generic [ref=e78]:
            - generic [ref=e79]: à partir de 420 à 560 € l’unité ; 2 200 € la série de six.
            - generic [ref=e80]: 6 à 10 semaines
      - 'link "Lampe à poser : globe de verre soufflé fumé gris sur un socle de noyer tourné, tige de laiton et câble textile écru verre soufflé fumé gris · noyer huilé · laiton brossé · câble textile écru Doucine à partir de 680 à 890 €, selon l’essence du socle et la teinte du verre. 6 à 10 semaines" [ref=e82] [cursor=pointer]':
        - /url: /collections/doucine
        - 'img "Lampe à poser : globe de verre soufflé fumé gris sur un socle de noyer tourné, tige de laiton et câble textile écru" [ref=e85]'
        - generic [ref=e86]:
          - paragraph [ref=e87]: verre soufflé fumé gris · noyer huilé · laiton brossé · câble textile écru
          - generic [ref=e88]: Doucine
          - generic [ref=e89]:
            - generic [ref=e90]: à partir de 680 à 890 €, selon l’essence du socle et la teinte du verre.
            - generic [ref=e91]: 6 à 10 semaines
      - 'link "Lampadaire liseuse : fût d’acier noir, bras de laiton déporté et réflecteur repoussé posé au-dessus d’un fauteuil acier noir mat · laiton satiné · fonte cirée Encorbellement à partir de 1 250 à 1 650 €, selon la finition du bras et la longueur du déport. 6 à 10 semaines" [ref=e93] [cursor=pointer]':
        - /url: /collections/encorbellement
        - 'img "Lampadaire liseuse : fût d’acier noir, bras de laiton déporté et réflecteur repoussé posé au-dessus d’un fauteuil" [ref=e96]'
        - generic [ref=e97]:
          - paragraph [ref=e98]: acier noir mat · laiton satiné · fonte cirée
          - generic [ref=e99]: Encorbellement
          - generic [ref=e100]:
            - generic [ref=e101]: à partir de 1 250 à 1 650 €, selon la finition du bras et la longueur du déport.
            - generic [ref=e102]: 6 à 10 semaines
    - region "La pièce Suspension d’atelier des années 1930, remise en lumière" [ref=e103]:
      - generic [ref=e104]:
        - link [ref=e106] [cursor=pointer]:
          - /url: /collections/suspension-1930
          - img "Suspension d’atelier ancienne en tôle émaillée verte à l’extérieur et blanche dedans, remise en état et allumée" [ref=e108]
        - generic [ref=e109]:
          - paragraph [ref=e110]: tôle émaillée d’origine · potence acier · douille porcelaine neuve · molette de laiton
          - link "Suspension d’atelier des années 1930, remise en lumière" [ref=e111] [cursor=pointer]:
            - /url: /collections/suspension-1930
          - paragraph [ref=e112]: "Une suspension d’atelier des années 1930, descendue d’un grenier familial et destinée à un plan de travail de cuisine. Tôle émaillée blanche dedans, verte dehors, potence d’acier. Elle n’avait pas besoin d’une restauration complète : de la sécurité, un redressage, et qu’on lui rende sa molette."
          - paragraph [ref=e113]:
            - generic [ref=e114]: à partir de 320 € l’intervention, remise aux normes et redressage compris.
            - generic [ref=e115]: 2 à 3 semaines
    - generic [ref=e116]:
      - generic [ref=e117]:
        - heading "Vous ne trouvez pas ce que vous cherchez" [level=2] [ref=e119]
        - paragraph [ref=e120]: C’est plutôt bon signe. Tout part d’un dessin, et aucune de ces pièces n’existait avant qu’on nous la demande. Parlez-nous de la pièce à éclairer, de sa hauteur et de ce qui manque quand la nuit tombe.
        - link "Demander une pièce approchante" [ref=e122] [cursor=pointer]:
          - /url: /contact
      - paragraph [ref=e124]:
        - text: Le déroulé d’une commande, du devis à la pose, est détaillé du côté des services.
        - link "Comment se passe une commande" [ref=e125] [cursor=pointer]:
          - /url: /services#etapes
  - contentinfo [ref=e126]:
    - generic [ref=e127]:
      - generic [ref=e128]:
        - generic [ref=e129]:
          - paragraph [ref=e130]: Atelier Bréande — luminaires sur mesure.
          - paragraph [ref=e131]: Lyon et la métropole, jusqu’à 60 km, sur rendez-vous
          - paragraph [ref=e132]: du mardi au vendredi, 9 h – 12 h 30 et 14 h – 18 h ; le samedi matin, sur rendez-vous
        - navigation "Plan du site" [ref=e133]:
          - paragraph [ref=e134]: plan du site
          - list [ref=e135]:
            - listitem [ref=e136]:
              - link "accueil" [ref=e137] [cursor=pointer]:
                - /url: /
            - listitem [ref=e138]:
              - link "l’atelier" [ref=e139] [cursor=pointer]:
                - /url: /latelier
            - listitem [ref=e140]:
              - link "collections" [ref=e141] [cursor=pointer]:
                - /url: /collections
            - listitem [ref=e142]:
              - link "services" [ref=e143] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e144]:
              - link "contact" [ref=e145] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e146]:
              - link "mentions légales" [ref=e147] [cursor=pointer]:
                - /url: /mentions-legales
      - paragraph [ref=e148]: Site fictif de démonstration — conçu et réalisé par Arnaud Porcel. 2026.
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