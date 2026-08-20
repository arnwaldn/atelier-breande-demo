# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: console-et-entetes.spec.ts >> console et en-têtes >> mentions légales — zéro violation de la politique de sécurité du contenu (CSP)
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