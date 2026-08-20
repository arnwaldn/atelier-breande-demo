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