# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: console-et-entetes.spec.ts >> console et en-têtes >> l’atelier — zéro violation de la politique de sécurité du contenu (CSP)
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
      - img "L’établi principal de l’atelier, vu de face, avec ses outils rangés à portée de main" [ref=e26]
      - generic [ref=e29]:
        - heading "L’atelier" [level=1] [ref=e30]
        - paragraph [ref=e31]: Soixante-dix mètres carrés dans le 7e arrondissement de Lyon, trois établis, un tour à repousser et une odeur de décapant. Un mardi ordinaire, on y débite du laiton le matin et on y câble l’après-midi.
    - generic [ref=e33]:
      - paragraph [ref=e34]: Nous nous sommes installés ici en 2011, dans un ancien local d’imprimerie dont les murs gardent des traces d’encre sous la peinture. Au fond, une réserve de matière et un coin de bureau qui sert surtout à téléphoner. Nous sommes trois.
      - paragraph [ref=e35]: "Le tour à repousser a été acheté d’occasion en 2016, à un atelier qui fermait. Il est arrivé grippé et il a fallu tout l’hiver pour le remettre en marche, refaire les glissières, retrouver des mandrins. C’est aujourd’hui la machine qui sert le plus : tous nos réflecteurs sortent de là."
      - paragraph [ref=e36]: Tout ne se fait pas sur place. Le verre soufflé vient d’un verrier de la vallée du Rhône, le thermolaquage d’un applicateur de l’est lyonnais. Nous savons ce que nous ne savons pas faire, et nous préférons le confier à des gens qui le font tous les jours.
      - paragraph [ref=e37]: "Une série de six appliques est repartie de chez un client pour revenir ici en 2023. La patine avait viré au rouge sur trois d’entre elles : mauvais bain, temps trop long, nous ne l’avons compris qu’après. Tout a été redécapé et repatiné. Le client a attendu cinq semaines de plus."
    - region [ref=e38]:
      - generic [ref=e39]:
        - heading "Les matières" [level=2] [ref=e40]
        - separator [ref=e41]
      - generic [ref=e42]:
        - generic [ref=e43]:
          - img "Chutes et pièces de laiton brossé, verni et patiné, rangées sur l’établi" [ref=e46]
          - paragraph [ref=e47]: Laiton et cuivre
          - paragraph [ref=e48]: "Brossé et verni mat, poli, patiné brun à la cire, étamé à l’intérieur des réflecteurs. Un laiton laissé nu fonce en six mois : il passe du jaune au miel, puis au brun. C’est prévu et c’est souvent pour cela qu’on le choisit. Qui veut garder l’éclat du premier jour prend le verni mat et le nettoie à l’eau savonneuse. Le cuivre rosé, lui, va plus vite encore. Le bronze d’ornement, nous ne le touchons qu’en restauration."
        - generic [ref=e49]:
          - img "Globes de verre soufflé clairs, ambrés et fumés, alignés à contre-jour" [ref=e52]
          - paragraph [ref=e53]: Verre
          - paragraph [ref=e54]: "Clair, ambré, fumé gris, opalin blanc ; strié, sablé ou gravé à l’acide. Tout est soufflé bouche, donc aucun globe n’est le jumeau d’un autre : l’épaisseur varie, une ligne d’air traverse parfois la paroi. Nous commandons systématiquement une pièce de plus que nécessaire. L’albâtre est réservé aux pièces d’exception, l’opaline ancienne aux restaurations."
        - generic [ref=e55]:
          - img "Plateaux de noyer et de chêne massif empilés, prêts à sécher" [ref=e58]
          - paragraph [ref=e59]: Bois
          - paragraph [ref=e60]: "Noyer huilé, chêne massif brossé, frêne olivier, érable sycomore, hêtre étuvé pour tout ce qui doit se cintrer. Le bois travaille avec l’hygrométrie : un socle tourné en juillet dans un plateau mal sec fend en janvier près d’un radiateur. Nos plateaux sèchent au moins trois ans avant qu’on y touche."
        - generic [ref=e61]:
          - img "Pièces d’acier thermolaqué noir texturé et fonte brute pour bases de lampadaire" [ref=e64]
          - paragraph [ref=e65]: Acier et finitions
          - paragraph [ref=e66]: Acier thermolaqué noir texturé, blanc cassé ou vert profond ; fonte pour les bases de lampadaire, qui ont besoin de poids. Le grain texturé encaisse mieux les chocs qu’une laque lisse et se raccorde presque invisiblement en cas de retouche. Une teinte hors de ces trois-là se commande, avec quinze jours de plus au planning.
    - region [ref=e67]:
      - generic [ref=e68]:
        - heading "Les procédés" [level=2] [ref=e69]
        - separator [ref=e70]
      - paragraph [ref=e71]: Dans l’ordre, du papier kraft à la caisse d’emballage. Une pièce passe par les huit, même la plus simple.
      - generic [ref=e72]:
        - generic [ref=e73]:
          - generic [ref=e74]: "01"
          - generic [ref=e75]:
            - paragraph [ref=e76]: Dessin
            - paragraph [ref=e77]: Tracé à l’échelle 1 sur papier kraft, punaisé au mur. Un gabarit de carton est découpé et présenté sur place quand la pièce est grande.
        - generic [ref=e78]:
          - generic [ref=e79]: "02"
          - generic [ref=e80]:
            - paragraph [ref=e81]: Débit
            - paragraph [ref=e82]: Laiton coupé à la cisaille et à la scie à ruban métal, avec la marge de reprise que réclame chaque assemblage.
        - generic [ref=e83]:
          - generic [ref=e84]: "03"
          - generic [ref=e85]:
            - paragraph [ref=e86]: Cintrage et roulage
            - paragraph [ref=e87]: Cintrage sur gabarit, roulage du tube et du plat au banc. Les cercles se ferment en dernier, après contrôle du faux-rond.
        - generic [ref=e88]:
          - generic [ref=e89]: "04"
          - generic [ref=e90]:
            - paragraph [ref=e91]: Repoussage
            - paragraph [ref=e92]: Le réflecteur est formé à la main sur un mandrin de hêtre, à la molette, en une passe continue. C’est le geste le plus long à apprendre.
        - generic [ref=e93]:
          - generic [ref=e94]: "05"
          - generic [ref=e95]:
            - paragraph [ref=e96]: Assemblage
            - paragraph [ref=e97]: Brasure à l’argent sur le laiton, soudure TIG sur l’acier. Les joints sont repris à la lime jusqu’à disparaître sous la finition.
        - generic [ref=e98]:
          - generic [ref=e99]: "06"
          - generic [ref=e100]:
            - paragraph [ref=e101]: Satinage ou polissage
            - paragraph [ref=e102]: Toile abrasive grain 240 puis 320 pour un satiné régulier, ou touret pour les pièces qui doivent renvoyer la lumière.
        - generic [ref=e103]:
          - generic [ref=e104]: "07"
          - generic [ref=e105]:
            - paragraph [ref=e106]: Patine
            - paragraph [ref=e107]: Bain de foie de soufre, arrêté à l’œil parce qu’il n’attend pas, rincé, séché, puis cire microcristalline passée au chiffon.
        - generic [ref=e108]:
          - generic [ref=e109]: "08"
          - generic [ref=e110]:
            - paragraph [ref=e111]: Câblage et essai
            - paragraph [ref=e112]: Câble H05VV-F 3G0,75, douille porcelaine ou thermoplastique, mise à la terre, serre-câble. Vingt-quatre heures allumée avant l’emballage.
    - region [ref=e113]:
      - generic [ref=e114]:
        - heading "La lumière" [level=2] [ref=e115]
        - separator [ref=e116]
      - generic [ref=e117]:
        - paragraph [ref=e118]: "Nous partons de 2 700 K à peu près partout, parce que c’est la couleur d’une ampoule à filament et que l’œil y est habitué depuis un siècle. On descend à 2 400 ou 2 200 K là où l’on ne fait rien d’exigeant : une chambre, un salon en fin de soirée. On monte à 3 000 K sur un plan de travail, jusqu’à 4 000 K sur un bureau où l’on lit des documents."
        - paragraph [ref=e119]: L’indice de rendu des couleurs compte autant que la température. En dessous de 90, une peinture jaunit, un bois vire au gris et un teint devient malade. Nous livrons en IRC 90 au minimum, et en 95 devant un miroir de salle de bains.
        - paragraph [ref=e120]: "Les sources sont toujours remplaçables : culot E27, E14, G9, GU10, ou module LED qui se change avec un tournevis. Une diode collée dans la pièce transforme un luminaire en consommable, et nous n’en faisons pas."
      - table [ref=e121]:
        - caption [ref=e122]: Repère de température et d’intensité par pièce du logement.
        - rowgroup [ref=e123]:
          - row [ref=e124]:
            - columnheader "pièce" [ref=e125]
            - columnheader "température" [ref=e126]
            - columnheader "intensité par point" [ref=e127]
        - rowgroup [ref=e128]:
          - row [ref=e129]:
            - rowheader "Salon" [ref=e130]
            - cell "2 400 – 2 700 K" [ref=e131]
            - cell "équivalent 40 à 50 W par point" [ref=e132]
          - row [ref=e133]:
            - rowheader "Salle à manger" [ref=e134]
            - cell "2 700 K" [ref=e135]
            - cell "équivalent 50 W par point" [ref=e136]
          - row [ref=e137]:
            - rowheader "Cuisine, plan de travail" [ref=e138]
            - cell "3 000 K" [ref=e139]
            - cell "équivalent 60 à 75 W" [ref=e140]
          - row [ref=e141]:
            - rowheader "Couloir" [ref=e142]
            - cell "2 700 K" [ref=e143]
            - cell "équivalent 25 W par point" [ref=e144]
          - row [ref=e145]:
            - rowheader "Chambre" [ref=e146]
            - cell "2 200 – 2 400 K" [ref=e147]
            - cell "équivalent 25 à 40 W" [ref=e148]
          - row [ref=e149]:
            - rowheader "Miroir de salle de bains" [ref=e150]
            - cell "3 000 K, IRC 95" [ref=e151]
            - cell "équivalent 40 W" [ref=e152]
          - row [ref=e153]:
            - rowheader "Bureau" [ref=e154]
            - cell "3 000 – 4 000 K" [ref=e155]
            - cell "équivalent 60 W" [ref=e156]
          - row [ref=e157]:
            - rowheader "Escalier" [ref=e158]
            - cell "2 700 K" [ref=e159]
            - cell "équivalent 40 W par niveau" [ref=e160]
      - paragraph [ref=e161]: Variation par variateur mural compatible, avec des sources prévues pour, et passage de 2 700 vers 2 200 K en fin de soirée sur demande.
    - region [ref=e162]:
      - generic [ref=e163]:
        - generic [ref=e164]:
          - generic [ref=e165]:
            - heading "La coupe de matière" [level=2] [ref=e166]
            - separator [ref=e167]
          - paragraph [ref=e168]: D’un côté la pièce photographiée, de l’autre le dessin technique qui l’a précédée — c’est le même objet, à deux moments du même geste.
        - generic [ref=e169]:
          - 'figure "Déplacez le trait de laiton : à gauche le dessin technique, à droite la pièce photographiée." [ref=e170]':
            - img "Dessin technique au trait de la même suspension, coté et annoté" [ref=e173]
            - img "Photo d’une suspension en laiton et verre soufflé, allumée" [ref=e176]
            - 'slider "Comparer la photo de la pièce et son dessin technique : déplacer pour révéler l’un ou l’autre" [ref=e177]': "12"
          - paragraph [ref=e179]: Ø 240 mm · verre soufflé — H 214 mm, monture laiton
    - region [ref=e180]:
      - generic [ref=e181]:
        - heading "Ce qui se fait ailleurs" [level=2] [ref=e182]
        - separator [ref=e183]
      - generic [ref=e184]:
        - paragraph [ref=e185]: L’électricité du bâtiment n’est pas notre métier. Le luminaire se raccorde sur un point déjà en place ; tout ce qui touche aux lignes, aux boîtes et au tableau appartient à un électricien, et c’est très bien ainsi.
        - paragraph [ref=e186]: La dorure à la feuille part dans un atelier qui ne fait que cela, à deux rues d’ici. Nous la commandons et nous la contrôlons ; la poser, c’est un autre métier.
        - paragraph [ref=e187]: "Au-delà d’une vingtaine de pièces identiques, nous ne sommes plus le bon atelier : le prix devient déraisonnable pour vous et le travail devient de la série pour nous. Nous le disons dès le premier rendez-vous."
    - region [ref=e188]:
      - generic [ref=e189]:
        - heading "Venir" [level=2] [ref=e190]
        - separator [ref=e191]
      - paragraph [ref=e192]: "L’atelier occupe le fond d’une cour, dans le 7e. On y vient sur rendez-vous, du mardi au vendredi, et le samedi matin quand c’est le seul créneau possible. Nous fermons trois semaines en août. Ce que vous verrez en poussant la porte, ce sont des pièces en cours de montage, des chutes de laiton et de la poussière de ponçage : il n’y a rien à acheter sur place."
    - generic [ref=e194]:
      - paragraph [ref=e195]: Chaque pièce montrée dans les collections est partie chez quelqu’un, pour un endroit précis. Vous y verrez mieux qu’ici ce que nous savons faire.
      - link "Voir les pièces sorties d’ici" [ref=e197] [cursor=pointer]:
        - /url: /collections
  - contentinfo [ref=e198]:
    - generic [ref=e199]:
      - generic [ref=e200]:
        - generic [ref=e201]:
          - paragraph [ref=e202]: Atelier Bréande — luminaires sur mesure.
          - paragraph [ref=e203]: Lyon et la métropole, jusqu’à 60 km, sur rendez-vous
          - paragraph [ref=e204]: du mardi au vendredi, 9 h – 12 h 30 et 14 h – 18 h ; le samedi matin, sur rendez-vous
        - navigation "Plan du site" [ref=e205]:
          - paragraph [ref=e206]: plan du site
          - list [ref=e207]:
            - listitem [ref=e208]:
              - link "accueil" [ref=e209] [cursor=pointer]:
                - /url: /
            - listitem [ref=e210]:
              - link "l’atelier" [ref=e211] [cursor=pointer]:
                - /url: /latelier
            - listitem [ref=e212]:
              - link "collections" [ref=e213] [cursor=pointer]:
                - /url: /collections
            - listitem [ref=e214]:
              - link "services" [ref=e215] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e216]:
              - link "contact" [ref=e217] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e218]:
              - link "mentions légales" [ref=e219] [cursor=pointer]:
                - /url: /mentions-legales
      - paragraph [ref=e220]: Site fictif de démonstration — conçu et réalisé par Arnaud Porcel. 2026.
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