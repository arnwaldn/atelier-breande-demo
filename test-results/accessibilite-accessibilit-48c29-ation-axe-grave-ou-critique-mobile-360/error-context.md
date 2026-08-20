# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibilite.spec.ts >> accessibilité >> contact — zéro violation axe grave ou critique
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
      - heading "Contacter l’atelier, à Lyon 7e." [level=1] [ref=e17]:
        - generic [ref=e18]: Contacter
        - generic [ref=e19]: l’atelier,
        - generic [ref=e20]: à Lyon 7e.
      - paragraph [ref=e21]: Le plus utile, pour commencer, c’est de décrire l’endroit plutôt que l’objet. Une photo prise de jour, la hauteur sous plafond et l’emplacement des points existants nous en disent plus que trois paragraphes.
      - generic [ref=e22]:
        - generic [ref=e23]:
          - paragraph [ref=e24]: "Formulaire de démonstration : l’envoi est désactivé sur ce site fictif — aucun message n’est transmis."
          - generic [ref=e25]:
            - generic [ref=e26]:
              - generic [ref=e27]: nom *
              - textbox "nom" [ref=e28]
            - generic [ref=e29]:
              - generic [ref=e30]: e-mail *
              - textbox "e-mail" [ref=e31]
            - generic [ref=e32]:
              - generic [ref=e33]: message *
              - textbox "message" [ref=e34]
            - button "Envoi désactivé" [ref=e35]
        - generic [ref=e36]:
          - generic [ref=e37]:
            - heading "Autrement qu’en écrivant" [level=2] [ref=e38]
            - paragraph [ref=e39]: "Le téléphone marche mieux que l’écrit pour un premier échange : plutôt en fin de matinée ou après 16 h, parce que le reste du temps nous sommes à l’établi et la machine couvre la sonnerie. Les messages reçoivent une réponse sous deux jours ouvrés. Un rendez-vous à l’atelier se prend par téléphone."
            - paragraph [ref=e40]:
              - link "04 65 71 08 42" [ref=e41] [cursor=pointer]:
                - /url: tel:+33465710842
          - generic [ref=e42]:
            - heading "Ce qui se passe ensuite" [level=2] [ref=e43]
            - list [ref=e44]:
              - listitem [ref=e45]: Un accusé de réception sous deux jours ouvrés, écrit par quelqu’un qui a lu votre message.
              - listitem [ref=e46]: "Deux ou trois questions de cadrage : hauteur, points existants, usage du soir, ordre de budget."
              - listitem [ref=e47]: Une visite sur place, ou un appel d’une demi-heure si le projet est simple.
              - listitem [ref=e48]: Un croquis et un devis chiffré, cinq à dix jours ouvrés après la visite.
          - generic [ref=e49]:
            - heading "Venir à l’atelier" [level=2] [ref=e50]
            - paragraph [ref=e51]: "On nous trouve dans le 7e, côté rive gauche ; la rue vous est donnée quand le rendez-vous est pris. Il n’y a pas de showroom : vous verrez des établis occupés, des chutes de laiton et le tour à repousser. Comptez une heure, et évitez les chaussures neuves."
          - generic [ref=e52]:
            - heading "Où nous intervenons" [level=2] [ref=e53]
            - paragraph [ref=e54]: Toute la métropole, et une couronne de 60 km autour. Plus loin, la pièce voyage en caisse bois par transporteur, et le devis l’annonce avant la commande.
            - list [ref=e55]:
              - listitem [ref=e56]: Lyon·
              - listitem [ref=e57]: Villeurbanne·
              - listitem [ref=e58]: Caluire-et-Cuire·
              - listitem [ref=e59]: Écully·
              - listitem [ref=e60]: Tassin·
              - listitem [ref=e61]: Sainte-Foy-lès-Lyon·
              - listitem [ref=e62]: Bron·
              - listitem [ref=e63]: Oullins
            - paragraph [ref=e64]: "Au-delà de 60 km, sur devis : Grenoble, Saint-Étienne, Chambéry. Expédition partout en France."
            - paragraph [ref=e65]: Compris dans la métropole ; ensuite 0,60 € par kilomètre passé 30 km, ou 90 € au forfait.
          - generic [ref=e66]:
            - heading "Horaires" [level=2] [ref=e67]
            - paragraph [ref=e68]: du mardi au vendredi, 9 h – 12 h 30 et 14 h – 18 h
            - paragraph [ref=e69]: le samedi matin, sur rendez-vous
            - paragraph [ref=e70]: fermé trois semaines en août
            - paragraph [ref=e71]: réception sur rendez-vous, jamais à l’improviste
    - region [ref=e72]:
      - generic [ref=e73]:
        - heading "Questions fréquentes" [level=2] [ref=e74]
        - separator [ref=e75]
      - generic [ref=e77]:
        - group [ref=e78]:
          - generic "Vous déplacez-vous chez moi ?" [ref=e79] [cursor=pointer]
        - group [ref=e82]:
          - generic "Livrez-vous hors région ?" [ref=e83] [cursor=pointer]
        - group [ref=e86]:
          - generic "J’ai une échéance serrée, c’est possible ?" [ref=e87] [cursor=pointer]
        - group [ref=e90]:
          - generic "Peut-on se voir un samedi ?" [ref=e91] [cursor=pointer]
  - contentinfo [ref=e94]:
    - generic [ref=e95]:
      - generic [ref=e96]:
        - generic [ref=e97]:
          - paragraph [ref=e98]: Atelier Bréande — luminaires sur mesure.
          - paragraph [ref=e99]: Lyon et la métropole, jusqu’à 60 km, sur rendez-vous
          - paragraph [ref=e100]: du mardi au vendredi, 9 h – 12 h 30 et 14 h – 18 h ; le samedi matin, sur rendez-vous
        - navigation "Plan du site" [ref=e101]:
          - paragraph [ref=e102]: plan du site
          - list [ref=e103]:
            - listitem [ref=e104]:
              - link "accueil" [ref=e105] [cursor=pointer]:
                - /url: /
            - listitem [ref=e106]:
              - link "l’atelier" [ref=e107] [cursor=pointer]:
                - /url: /latelier
            - listitem [ref=e108]:
              - link "collections" [ref=e109] [cursor=pointer]:
                - /url: /collections
            - listitem [ref=e110]:
              - link "services" [ref=e111] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e112]:
              - link "contact" [ref=e113] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e114]:
              - link "mentions légales" [ref=e115] [cursor=pointer]:
                - /url: /mentions-legales
      - paragraph [ref=e116]: Site fictif de démonstration — conçu et réalisé par Arnaud Porcel. 2026.
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