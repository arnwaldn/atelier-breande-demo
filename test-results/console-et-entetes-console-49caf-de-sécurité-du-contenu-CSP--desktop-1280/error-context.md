# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: console-et-entetes.spec.ts >> console et en-têtes >> contact — zéro violation de la politique de sécurité du contenu (CSP)
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
    - generic: 2 700 K
  - main [ref=e22]:
    - generic [ref=e23]:
      - heading "Contacter l’atelier, à Lyon 7e." [level=1] [ref=e24]:
        - generic [ref=e25]: Contacter
        - generic [ref=e26]: l’atelier,
        - generic [ref=e27]: à Lyon 7e.
      - paragraph [ref=e28]: Le plus utile, pour commencer, c’est de décrire l’endroit plutôt que l’objet. Une photo prise de jour, la hauteur sous plafond et l’emplacement des points existants nous en disent plus que trois paragraphes.
      - generic [ref=e29]:
        - generic [ref=e30]:
          - paragraph [ref=e31]: "Formulaire de démonstration : l’envoi est désactivé sur ce site fictif — aucun message n’est transmis."
          - generic [ref=e32]:
            - generic [ref=e33]:
              - generic [ref=e34]: nom *
              - textbox "nom" [ref=e35]
            - generic [ref=e36]:
              - generic [ref=e37]: e-mail *
              - textbox "e-mail" [ref=e38]
            - generic [ref=e39]:
              - generic [ref=e40]: message *
              - textbox "message" [ref=e41]
            - button "Envoi désactivé" [ref=e42]
        - generic [ref=e43]:
          - generic [ref=e44]:
            - heading "Autrement qu’en écrivant" [level=2] [ref=e45]
            - paragraph [ref=e46]: "Le téléphone marche mieux que l’écrit pour un premier échange : plutôt en fin de matinée ou après 16 h, parce que le reste du temps nous sommes à l’établi et la machine couvre la sonnerie. Les messages reçoivent une réponse sous deux jours ouvrés. Un rendez-vous à l’atelier se prend par téléphone."
            - paragraph [ref=e47]:
              - link "04 65 71 08 42" [ref=e48] [cursor=pointer]:
                - /url: tel:+33465710842
          - generic [ref=e49]:
            - heading "Ce qui se passe ensuite" [level=2] [ref=e50]
            - list [ref=e51]:
              - listitem [ref=e52]: Un accusé de réception sous deux jours ouvrés, écrit par quelqu’un qui a lu votre message.
              - listitem [ref=e53]: "Deux ou trois questions de cadrage : hauteur, points existants, usage du soir, ordre de budget."
              - listitem [ref=e54]: Une visite sur place, ou un appel d’une demi-heure si le projet est simple.
              - listitem [ref=e55]: Un croquis et un devis chiffré, cinq à dix jours ouvrés après la visite.
          - generic [ref=e56]:
            - heading "Venir à l’atelier" [level=2] [ref=e57]
            - paragraph [ref=e58]: "On nous trouve dans le 7e, côté rive gauche ; la rue vous est donnée quand le rendez-vous est pris. Il n’y a pas de showroom : vous verrez des établis occupés, des chutes de laiton et le tour à repousser. Comptez une heure, et évitez les chaussures neuves."
          - generic [ref=e59]:
            - heading "Où nous intervenons" [level=2] [ref=e60]
            - paragraph [ref=e61]: Toute la métropole, et une couronne de 60 km autour. Plus loin, la pièce voyage en caisse bois par transporteur, et le devis l’annonce avant la commande.
            - list [ref=e62]:
              - listitem [ref=e63]: Lyon·
              - listitem [ref=e64]: Villeurbanne·
              - listitem [ref=e65]: Caluire-et-Cuire·
              - listitem [ref=e66]: Écully·
              - listitem [ref=e67]: Tassin·
              - listitem [ref=e68]: Sainte-Foy-lès-Lyon·
              - listitem [ref=e69]: Bron·
              - listitem [ref=e70]: Oullins
            - paragraph [ref=e71]: "Au-delà de 60 km, sur devis : Grenoble, Saint-Étienne, Chambéry. Expédition partout en France."
            - paragraph [ref=e72]: Compris dans la métropole ; ensuite 0,60 € par kilomètre passé 30 km, ou 90 € au forfait.
          - generic [ref=e73]:
            - heading "Horaires" [level=2] [ref=e74]
            - paragraph [ref=e75]: du mardi au vendredi, 9 h – 12 h 30 et 14 h – 18 h
            - paragraph [ref=e76]: le samedi matin, sur rendez-vous
            - paragraph [ref=e77]: fermé trois semaines en août
            - paragraph [ref=e78]: réception sur rendez-vous, jamais à l’improviste
    - region [ref=e79]:
      - generic [ref=e80]:
        - heading "Questions fréquentes" [level=2] [ref=e81]
        - separator [ref=e82]
      - generic [ref=e84]:
        - group [ref=e85]:
          - generic "Vous déplacez-vous chez moi ?" [ref=e86] [cursor=pointer]
        - group [ref=e89]:
          - generic "Livrez-vous hors région ?" [ref=e90] [cursor=pointer]
        - group [ref=e93]:
          - generic "J’ai une échéance serrée, c’est possible ?" [ref=e94] [cursor=pointer]
        - group [ref=e97]:
          - generic "Peut-on se voir un samedi ?" [ref=e98] [cursor=pointer]
  - contentinfo [ref=e101]:
    - generic [ref=e102]:
      - generic [ref=e103]:
        - generic [ref=e104]:
          - paragraph [ref=e105]: Atelier Bréande — luminaires sur mesure.
          - paragraph [ref=e106]: Lyon et la métropole, jusqu’à 60 km, sur rendez-vous
          - paragraph [ref=e107]: du mardi au vendredi, 9 h – 12 h 30 et 14 h – 18 h ; le samedi matin, sur rendez-vous
        - navigation "Plan du site" [ref=e108]:
          - paragraph [ref=e109]: plan du site
          - list [ref=e110]:
            - listitem [ref=e111]:
              - link "accueil" [ref=e112] [cursor=pointer]:
                - /url: /
            - listitem [ref=e113]:
              - link "l’atelier" [ref=e114] [cursor=pointer]:
                - /url: /latelier
            - listitem [ref=e115]:
              - link "collections" [ref=e116] [cursor=pointer]:
                - /url: /collections
            - listitem [ref=e117]:
              - link "services" [ref=e118] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e119]:
              - link "contact" [ref=e120] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e121]:
              - link "mentions légales" [ref=e122] [cursor=pointer]:
                - /url: /mentions-legales
      - paragraph [ref=e123]: Site fictif de démonstration — conçu et réalisé par Arnaud Porcel. 2026.
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