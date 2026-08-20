# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibilite.spec.ts >> accessibilité >> mentions légales — zéro violation axe grave ou critique
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
      - heading "Mentions légales" [level=1] [ref=e17]
      - paragraph [ref=e18]: "Ce site est une démonstration publique. « Atelier Bréande » est un atelier fictif : il n’existe pas, ne vend rien et n’emploie personne. Les mentions ci-dessous concernent l’éditeur réel du site, seul responsable de sa publication. Elles ne désignent aucune entreprise existante, et aucune donnée d’entreprise n’a été inventée pour les remplir."
      - heading "Éditeur du site" [level=2] [ref=e19]
      - paragraph [ref=e20]: "Arnaud Porcel, entrepreneur individuel, activité de développement web.Courrier électronique : arnaud.porcel@gmail.com"
      - paragraph [ref=e21]: Immatriculation en cours d’attribution. Le numéro SIREN, le SIRET de l’établissement, le code APE et l’adresse professionnelle seront publiés ici dès leur délivrance.
      - paragraph [ref=e22]: TVA non applicable, article 293 B du code général des impôts — régime de la franchise en base.
      - heading "Directeur de la publication" [level=2] [ref=e23]
      - paragraph [ref=e24]: Arnaud Porcel, en sa qualité d’éditeur du site.
      - heading "Hébergeur" [level=2] [ref=e25]
      - paragraph [ref=e26]:
        - text: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis."
        - link "vercel.com" [ref=e27] [cursor=pointer]:
          - /url: https://vercel.com
      - heading "Stockage des données" [level=2] [ref=e28]
      - paragraph [ref=e29]: "Aucune donnée n’est traitée ni stockée dans le cadre de l’édition de ce site en dehors de l’hébergement mentionné ci-dessus. Le site est entièrement statique : aucune base de données, aucun compte, aucun formulaire actif."
      - heading "Données personnelles" [level=2] [ref=e30]
      - paragraph [ref=e31]: "Ce site ne dépose aucun cookie, n’utilise aucun outil de mesure d’audience et ne charge aucune ressource extérieure. Aucun formulaire n’y est actif : rien de ce que vous saisiriez n’est transmis ni conservé."
      - paragraph [ref=e32]: "Le seul traitement est celui des journaux techniques de connexion — adresse IP, type de navigateur, page demandée — conservés par l’hébergeur pour afficher les pages et sécuriser le service. Base légale : l’intérêt légitime de l’éditeur à faire fonctionner son site (article 6.1.f du RGPD). Durée : celle appliquée par l’hébergeur à ses journaux techniques."
      - paragraph [ref=e33]: Vercel Inc. est établie aux États-Unis et inscrite au cadre de protection des données UE–États-Unis, qui fonde ce transfert.
      - paragraph [ref=e34]: Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et d’opposition, exerçable à l’adresse électronique ci-dessus, et du droit d’introduire une réclamation auprès de la CNIL.
      - heading "Images" [level=2] [ref=e35]
      - paragraph [ref=e36]: Les images de ce site ont été produites par un outil de génération d’images par intelligence artificielle, pour ce projet et pour lui seul. Elles ne représentent aucune personne, aucun lieu, aucun atelier et aucun objet réels. Cette information est donnée au titre de l’article 50 du règlement (UE) 2024/1689 sur l’intelligence artificielle.
      - heading "Propriété intellectuelle" [level=2] [ref=e37]
      - paragraph [ref=e38]: Les textes, la mise en page et le code source de ce site appartiennent à Arnaud Porcel. Les polices de caractères employées — Fraunces et Archivo — sont diffusées sous licence SIL Open Font License 1.1.
  - contentinfo [ref=e39]:
    - generic [ref=e40]:
      - generic [ref=e41]:
        - generic [ref=e42]:
          - paragraph [ref=e43]: Atelier Bréande — luminaires sur mesure.
          - paragraph [ref=e44]: Lyon et la métropole, jusqu’à 60 km, sur rendez-vous
          - paragraph [ref=e45]: du mardi au vendredi, 9 h – 12 h 30 et 14 h – 18 h ; le samedi matin, sur rendez-vous
        - navigation "Plan du site" [ref=e46]:
          - paragraph [ref=e47]: plan du site
          - list [ref=e48]:
            - listitem [ref=e49]:
              - link "accueil" [ref=e50] [cursor=pointer]:
                - /url: /
            - listitem [ref=e51]:
              - link "l’atelier" [ref=e52] [cursor=pointer]:
                - /url: /latelier
            - listitem [ref=e53]:
              - link "collections" [ref=e54] [cursor=pointer]:
                - /url: /collections
            - listitem [ref=e55]:
              - link "services" [ref=e56] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e57]:
              - link "contact" [ref=e58] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e59]:
              - link "mentions légales" [ref=e60] [cursor=pointer]:
                - /url: /mentions-legales
      - paragraph [ref=e61]: Site fictif de démonstration — conçu et réalisé par Arnaud Porcel. 2026.
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