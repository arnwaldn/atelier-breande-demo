# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: console-et-entetes.spec.ts >> console et en-têtes >> services — zéro violation de la politique de sécurité du contenu (CSP)
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
      - heading "Ce que nous faisons" [level=1] [ref=e24]
      - paragraph [ref=e25]: "On entre ici de trois façons. La plus fréquente : une pièce à dessiner et à fabriquer. Vient ensuite la restauration d’un luminaire ancien. Et parfois il n’y a pas encore d’objet, seulement un logement à éclairer et un plan à faire."
    - region [ref=e26]:
      - generic [ref=e27]:
        - img "Croquis à l’échelle 1 et gabarit de carton, punaisés au mur de l’atelier" [ref=e30]
        - generic [ref=e31]:
          - heading "Créer une pièce" [level=2] [ref=e33]
          - paragraph [ref=e34]: Un dessin fait pour un endroit, fabriqué à l’établi, réglé chez vous.
          - generic [ref=e35]:
            - paragraph [ref=e36]: Tout part d’une visite. Nous mesurons la hauteur sous plafond, repérons les points existants, et nous vous demandons à quelle heure vous vivez vraiment dans cette pièce. Le dessin vient après, à l’échelle 1 sur papier kraft, avec un gabarit de carton quand la pièce est grande.
            - paragraph [ref=e37]: "Vous validez un plan coté, par écrit, avant que le premier morceau de laiton soit coupé. C’est le moment où tout se décide : proportions, matière, finition, hauteur de suspension, teinte de la lumière. Nous prêtons des ampoules d’essai pour que vous tranchiez chez vous, le soir."
            - paragraph [ref=e38]: Ensuite la fabrication suit son cours et vous n’en verrez pas grand-chose, deux ou trois photos si vous les demandez. La pièce reste allumée vingt-quatre heures avant de partir.
          - generic [ref=e39]:
            - generic [ref=e40]:
              - heading "inclus" [level=3] [ref=e41]
              - list [ref=e42]:
                - listitem [ref=e43]: la visite et le relevé sur place
                - listitem [ref=e44]: le plan coté et le choix des matières
                - listitem [ref=e45]: le prêt d’ampoules d’essai chez vous
                - listitem [ref=e46]: la fabrication et l’essai de vingt-quatre heures
                - listitem [ref=e47]: la pose sur un point existant, ou l’expédition en caisse bois sur mesure
                - listitem [ref=e48]: un passage de réglage dans les trois mois
            - generic [ref=e49]:
              - heading "non inclus" [level=3] [ref=e50]
              - list [ref=e51]:
                - listitem [ref=e52]: "les travaux électriques : tirer une ligne, déplacer une boîte de sortie, reprendre un tableau"
                - listitem [ref=e53]: la reprise des peintures et des enduits autour des perçages
                - listitem [ref=e54]: les séries au-delà d’une vingtaine de pièces identiques
          - paragraph [ref=e56]: "À préparer : deux ou trois photos de la pièce, prises de jour, la hauteur sous plafond, la position des points lumineux existants."
          - generic [ref=e57]:
            - paragraph [ref=e58]:
              - generic [ref=e59]: D’une applique à 380 € à une grande pièce de cage d’escalier à 6 500 €, le détail figure au tableau plus bas. Acompte de 40 % à la commande, solde à la livraison.
              - generic [ref=e60]: fourchette
            - paragraph [ref=e61]:
              - generic [ref=e62]: 6 à 10 semaines, trois de plus quand un verre est soufflé pour vous. Une série de trois à huit appliques demande 8 à 12 semaines.
              - generic [ref=e63]: délai courant
          - paragraph [ref=e64]:
            - link "comment ça se passe" [ref=e65] [cursor=pointer]:
              - /url: /services#etapes
          - list [ref=e66]:
            - listitem [ref=e67]: 1. Premier contact
            - listitem [ref=e68]: 3. Croquis et devis
            - listitem [ref=e69]: 6. Fabrication et essai
          - link "Demander un devis — créer une pièce" [ref=e71] [cursor=pointer]:
            - /url: /contact
    - region [ref=e72]:
      - generic [ref=e73]:
        - img "Suspension ancienne démontée sur l’établi, câblage textile déposé" [ref=e76]
        - generic [ref=e77]:
          - heading "Remettre en lumière une pièce ancienne" [level=2] [ref=e79]
          - paragraph [ref=e80]: La patine reste, le circuit repart à neuf.
          - generic [ref=e81]:
            - paragraph [ref=e82]: "On nous apporte surtout des suspensions d’atelier, des lustres de famille et des appliques trouvées en brocante. La première question n’est pas esthétique, elle est électrique. Le câblage textile d’origine ne repart jamais avec la pièce, sans exception : un coton de quatre-vingts ans sur du 230 V finit par se fendre là où personne ne le voit."
            - paragraph [ref=e83]: "Ce qui se restaure : la tôle et le laiton se redressent et se repolissent, une molette manquante se refait au tour, un verre cassé se remplace en deux à quatre semaines. La patine d’origine reste en place, et les éclats d’émail sont stabilisés au vernis mat plutôt que repeints."
            - paragraph [ref=e84]: "Ce qui ne se restaure pas : un verre sur mesure qu’on ne retrouve nulle part, un transformateur d’origine qu’on ne peut ni ouvrir ni remplacer. Nous le disons sur photos, avant tout démontage."
          - generic [ref=e85]:
            - generic [ref=e86]:
              - heading "inclus" [level=3] [ref=e87]
              - list [ref=e88]:
                - listitem [ref=e89]: le diagnostic sur photos, puis sur la pièce à l’atelier
                - listitem [ref=e90]: la dépose complète de l’ancien circuit
                - listitem [ref=e91]: douille neuve, câble à trois conducteurs, mise à la terre
                - listitem [ref=e92]: nettoyage, redressage et reprise des finitions d’origine
                - listitem [ref=e93]: essai en charge de vingt-quatre heures avant le retour
            - generic [ref=e94]:
              - heading "non inclus" [level=3] [ref=e95]
              - list [ref=e96]:
                - listitem [ref=e97]: le remplacement d’un verre sur mesure introuvable
                - listitem [ref=e98]: le repeint d’un émail ou d’une laque d’origine
                - listitem [ref=e99]: la conservation du câblage ancien, jamais réutilisé, même en bon état apparent
          - paragraph [ref=e101]: "Photos à envoyer : le dessus de la pièce, là où le câble entre dans la monture, la douille, de près, le câble et son passage dans la tige ou la potence, les marques, plaques ou numéros s’il y en a."
          - generic [ref=e102]:
            - paragraph [ref=e103]:
              - generic [ref=e104]: "Remise aux normes seule : 180 à 350 €. Restauration complète : 450 à 2 500 €, selon l’état de la monture et le verre à refaire."
              - generic [ref=e105]: fourchette
            - paragraph [ref=e106]:
              - generic [ref=e107]: 2 à 3 semaines pour une remise aux normes, 6 à 12 semaines pour une restauration complète.
              - generic [ref=e108]: délai courant
          - paragraph [ref=e109]:
            - link "comment ça se passe" [ref=e110] [cursor=pointer]:
              - /url: /services#etapes
          - list [ref=e111]:
            - listitem [ref=e112]: 1. Premier contact
            - listitem [ref=e113]: 3. Croquis et devis
            - listitem [ref=e114]: 6. Fabrication et essai
          - link "Demander un devis — remettre en lumière une pièce ancienne" [ref=e116] [cursor=pointer]:
            - /url: /contact
    - region [ref=e117]:
      - generic [ref=e118]:
        - img "Plan d’éclairage annoté et ampoules d’essai posées sur une table" [ref=e121]
        - generic [ref=e122]:
          - heading "Décider où mettre la lumière" [level=2] [ref=e124]
          - paragraph [ref=e125]: Décider où va la lumière quand cela ne coûte encore que du crayon.
          - generic [ref=e126]:
            - paragraph [ref=e127]: Il arrive qu’on nous appelle sans projet d’objet. Un appartement en travaux, six pièces, et la question de savoir où placer les points lumineux avant que tout soit refermé. C’est le meilleur moment pour nous appeler, et souvent le dernier.
            - paragraph [ref=e128]: La visite dure deux heures. Nous regardons l’orientation, la couleur des murs, la hauteur sous plafond, et surtout ce que vous faites dans chaque pièce une fois la nuit tombée. Un couloir qu’on traverse et un couloir où les enfants s’assoient ne s’éclairent pas de la même façon.
            - paragraph [ref=e129]: "Vous recevez ensuite un plan pièce par pièce : implantation des points, températures, intensité attendue à chaque foyer, culot, type de source et emplacement des variateurs. Un architecte d’intérieur le transmet tel quel à son électricien."
          - generic [ref=e130]:
            - generic [ref=e131]:
              - heading "inclus" [level=3] [ref=e132]
              - list [ref=e133]:
                - listitem [ref=e134]: la visite et le relevé, deux heures sur place
                - listitem [ref=e135]: le plan d’éclairage pièce par pièce
                - listitem [ref=e136]: les références de sources et de variateurs compatibles
                - listitem [ref=e137]: une relecture du devis de votre électricien
            - generic [ref=e138]:
              - heading "non inclus" [level=3] [ref=e139]
              - list [ref=e140]:
                - listitem [ref=e141]: la fourniture des ampoules et des variateurs
                - listitem [ref=e142]: le suivi de chantier et la coordination des autres corps de métier
          - paragraph [ref=e144]: "Vous recevez : Un plan pièce par pièce, remis en PDF."
          - generic [ref=e145]:
            - paragraph [ref=e146]:
              - generic [ref=e147]: "Visite et relevé : 180 €, déduits en cas de commande. Plan d’éclairage d’un logement : 650 à 1 400 €."
              - generic [ref=e148]: fourchette
            - paragraph [ref=e149]:
              - generic [ref=e150]: 2 à 3 semaines après le relevé.
              - generic [ref=e151]: délai courant
          - paragraph [ref=e152]:
            - link "comment ça se passe" [ref=e153] [cursor=pointer]:
              - /url: /services#etapes
          - list [ref=e154]:
            - listitem [ref=e155]: 1. Premier contact
            - listitem [ref=e156]: 3. Croquis et devis
            - listitem [ref=e157]: 6. Fabrication et essai
          - link "Demander un devis — décider où mettre la lumière" [ref=e159] [cursor=pointer]:
            - /url: /contact
    - region [ref=e160]:
      - generic [ref=e161]:
        - heading "Comment ça se passe" [level=2] [ref=e162]
        - separator [ref=e163]
      - generic [ref=e164]:
        - generic [ref=e165]:
          - paragraph [ref=e166]: "01"
          - generic [ref=e167]:
            - paragraph [ref=e168]: Premier contact
            - paragraph [ref=e169]: Vous décrivez l’endroit, si possible avec deux photos prises de jour. Nous répondons sous deux jours ouvrés.
        - generic [ref=e170]:
          - paragraph [ref=e171]: "02"
          - generic [ref=e172]:
            - paragraph [ref=e173]: Visite et relevé
            - paragraph [ref=e174]: "Une heure ou deux sur place : hauteurs, points existants, couleur des murs, usages du soir."
        - generic [ref=e175]:
          - paragraph [ref=e176]: "03"
          - generic [ref=e177]:
            - paragraph [ref=e178]: Croquis et devis
            - paragraph [ref=e179]: Sous 5 à 10 jours ouvrés, avec la fourchette de prix, le délai et les matières proposées.
        - generic [ref=e180]:
          - paragraph [ref=e181]: "04"
          - generic [ref=e182]:
            - paragraph [ref=e183]: Acompte
            - paragraph [ref=e184]: 40 % à la commande. C’est ce qui déclenche l’achat de la matière et réserve la place au planning.
        - generic [ref=e185]:
          - paragraph [ref=e186]: "05"
          - generic [ref=e187]:
            - paragraph [ref=e188]: Dessin d’exécution
            - paragraph [ref=e189]: Un plan coté, validé par écrit. Rien n’est coupé avant votre retour.
        - generic [ref=e190]:
          - paragraph [ref=e191]: "06"
          - generic [ref=e192]:
            - paragraph [ref=e193]: Fabrication et essai
            - paragraph [ref=e194]: Six à dix semaines à l’établi, puis vingt-quatre heures allumée avant de quitter l’atelier.
        - generic [ref=e195]:
          - paragraph [ref=e196]: "07"
          - generic [ref=e197]:
            - paragraph [ref=e198]: Pose ou expédition
            - paragraph [ref=e199]: Pose sur point existant à 120 € le point dans la métropole, ou caisse bois sur mesure par transporteur.
        - generic [ref=e200]:
          - paragraph [ref=e201]: "08"
          - generic [ref=e202]:
            - paragraph [ref=e203]: Réglage
            - paragraph [ref=e204]: Un passage dans les trois mois, sans frais dans la métropole.
    - region [ref=e205]:
      - generic [ref=e206]:
        - heading "Délais et tarifs" [level=2] [ref=e207]
        - separator [ref=e208]
      - list [ref=e209]:
        - listitem [ref=e210]:
          - generic [ref=e211]: Applique sur mesure
          - generic [ref=e212]: 380 à 900 €
          - generic [ref=e213]: 6 à 10 semaines
        - listitem [ref=e214]:
          - generic [ref=e215]: Série de 6 appliques identiques
          - generic [ref=e216]: 2 200 €
          - generic [ref=e217]: 8 à 12 semaines
        - listitem [ref=e218]:
          - generic [ref=e219]: Suspension en laiton et verre soufflé
          - generic [ref=e220]: 750 à 1 800 €
          - generic [ref=e221]: 6 à 10 semaines, +3 avec du verre soufflé
        - listitem [ref=e222]:
          - generic [ref=e223]: Grande suspension d’escalier
          - generic [ref=e224]: 2 400 à 6 500 €
          - generic [ref=e225]: 6 à 10 semaines, +3 avec du verre soufflé
        - listitem [ref=e226]:
          - generic [ref=e227]: Lampe à poser
          - generic [ref=e228]: 450 à 1 100 €
          - generic [ref=e229]: 6 à 10 semaines
        - listitem [ref=e230]:
          - generic [ref=e231]: Lampadaire ou liseuse
          - generic [ref=e232]: 900 à 2 200 €
          - generic [ref=e233]: 6 à 10 semaines
        - listitem [ref=e234]:
          - generic [ref=e235]: Plafonnier
          - generic [ref=e236]: 650 à 1 100 €
          - generic [ref=e237]: 6 à 10 semaines
        - listitem [ref=e238]:
          - generic [ref=e239]: Restauration, remise aux normes
          - generic [ref=e240]: 180 à 350 €
          - generic [ref=e241]: 2 à 3 semaines
        - listitem [ref=e242]:
          - generic [ref=e243]: Restauration complète
          - generic [ref=e244]: 450 à 2 500 €
          - generic [ref=e245]: 6 à 12 semaines
        - listitem [ref=e246]:
          - generic [ref=e247]: Visite et relevé
          - generic [ref=e248]: 180 €, déduits en cas de commande
          - generic [ref=e249]: devis sous 5 à 10 jours ouvrés
        - listitem [ref=e250]:
          - generic [ref=e251]: Plan d’éclairage d’un logement
          - generic [ref=e252]: 650 à 1 400 €
          - generic [ref=e253]: 2 à 3 semaines après le relevé
        - listitem [ref=e254]:
          - generic [ref=e255]: Pose sur point existant
          - generic [ref=e256]: 120 € par point
          - generic [ref=e257]: à la livraison
    - region [ref=e258]:
      - generic [ref=e259]:
        - heading "Garanties" [level=2] [ref=e260]
        - separator [ref=e261]
      - generic [ref=e262]:
        - paragraph [ref=e263]: "Deux ans sur toute la partie électrique, cinq ans sur la structure et les finitions. L’usure normale et la patine qui fonce ne sont pas des défauts : c’est le comportement attendu d’un laiton nu, et le devis le dit."
        - paragraph [ref=e264]: Nous gardons dix ans les verres, douilles, câbles et molettes de chaque modèle. Un verre brisé se refait sans toucher au reste de la pièce, et une retouche part sous dix jours.
        - paragraph [ref=e265]: "Dans les trois mois qui suivent la pose, nous repassons une fois régler ce qui a bougé : hauteur, aplomb, intensité. Sans frais dans la métropole."
    - region [ref=e266]:
      - generic [ref=e267]:
        - heading "Travailler avec une agence" [level=2] [ref=e268]
        - separator [ref=e269]
      - generic [ref=e270]:
        - paragraph [ref=e271]: "Avec un architecte d’intérieur, nous travaillons sur plan. Chaque pièce part avec un dessin coté et une fiche technique : poids, entraxe de fixation, culot, température, classe électrique, indice de protection. De quoi remplir une pièce écrite sans nous rappeler."
        - paragraph [ref=e272]: "Le planning se cale sur celui du chantier et nous livrons groupé, à la semaine demandée. La facturation se fait au client final ou par l’agence, comme vous préférez. Les échantillons de finition circulent en rendez-vous client : laiton brossé, poli, patiné, tôle thermolaquée."
    - region [ref=e273]:
      - generic [ref=e274]:
        - heading "Questions fréquentes" [level=2] [ref=e275]
        - separator [ref=e276]
      - generic [ref=e278]:
        - group [ref=e279]:
          - generic "Combien de temps avant d’avoir ma pièce ?" [ref=e280] [cursor=pointer]
        - group [ref=e283]:
          - generic "Quel budget prévoir ?" [ref=e284] [cursor=pointer]
        - group [ref=e287]:
          - generic "Comment se passe une commande ?" [ref=e288] [cursor=pointer]
        - group [ref=e291]:
          - generic "Est-ce aux normes, et qui raccorde ?" [ref=e292] [cursor=pointer]
        - group [ref=e295]:
          - generic "Peut-on choisir la couleur de la lumière ?" [ref=e296] [cursor=pointer]
        - group [ref=e299]:
          - generic "Peut-on faire varier l’intensité ?" [ref=e300] [cursor=pointer]
        - group [ref=e303]:
          - generic "Mon ancien luminaire est-il récupérable ?" [ref=e304] [cursor=pointer]
        - group [ref=e307]:
          - generic "Et si quelque chose casse ?" [ref=e308] [cursor=pointer]
    - generic [ref=e312]:
      - paragraph [ref=e313]: Le plus simple, c’est un coup de téléphone. Sinon, écrivez-nous trois lignes sur la pièce et sa hauteur sous plafond.
      - link "Prendre rendez-vous" [ref=e315] [cursor=pointer]:
        - /url: /contact
  - contentinfo [ref=e316]:
    - generic [ref=e317]:
      - generic [ref=e318]:
        - generic [ref=e319]:
          - paragraph [ref=e320]: Atelier Bréande — luminaires sur mesure.
          - paragraph [ref=e321]: Lyon et la métropole, jusqu’à 60 km, sur rendez-vous
          - paragraph [ref=e322]: du mardi au vendredi, 9 h – 12 h 30 et 14 h – 18 h ; le samedi matin, sur rendez-vous
        - navigation "Plan du site" [ref=e323]:
          - paragraph [ref=e324]: plan du site
          - list [ref=e325]:
            - listitem [ref=e326]:
              - link "accueil" [ref=e327] [cursor=pointer]:
                - /url: /
            - listitem [ref=e328]:
              - link "l’atelier" [ref=e329] [cursor=pointer]:
                - /url: /latelier
            - listitem [ref=e330]:
              - link "collections" [ref=e331] [cursor=pointer]:
                - /url: /collections
            - listitem [ref=e332]:
              - link "services" [ref=e333] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e334]:
              - link "contact" [ref=e335] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e336]:
              - link "mentions légales" [ref=e337] [cursor=pointer]:
                - /url: /mentions-legales
      - paragraph [ref=e338]: Site fictif de démonstration — conçu et réalisé par Arnaud Porcel. 2026.
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