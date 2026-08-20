# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: console-et-entetes.spec.ts >> console et en-têtes >> collections — zéro violation de la politique de sécurité du contenu (CSP)
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