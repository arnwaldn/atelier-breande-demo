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
      - group [ref=e9]:
        - generic "Menu" [ref=e10] [cursor=pointer]
  - complementary
  - main [ref=e15]:
    - generic [ref=e16]:
      - heading "Ce que nous faisons" [level=1] [ref=e17]
      - paragraph [ref=e18]: "On entre ici de trois façons. La plus fréquente : une pièce à dessiner et à fabriquer. Vient ensuite la restauration d’un luminaire ancien. Et parfois il n’y a pas encore d’objet, seulement un logement à éclairer et un plan à faire."
    - region [ref=e19]:
      - generic [ref=e20]:
        - img "Croquis à l’échelle 1 et gabarit de carton, punaisés au mur de l’atelier" [ref=e23]
        - generic [ref=e24]:
          - heading "Créer une pièce" [level=2] [ref=e26]
          - paragraph [ref=e27]: Un dessin fait pour un endroit, fabriqué à l’établi, réglé chez vous.
          - generic [ref=e28]:
            - paragraph [ref=e29]: Tout part d’une visite. Nous mesurons la hauteur sous plafond, repérons les points existants, et nous vous demandons à quelle heure vous vivez vraiment dans cette pièce. Le dessin vient après, à l’échelle 1 sur papier kraft, avec un gabarit de carton quand la pièce est grande.
            - paragraph [ref=e30]: "Vous validez un plan coté, par écrit, avant que le premier morceau de laiton soit coupé. C’est le moment où tout se décide : proportions, matière, finition, hauteur de suspension, teinte de la lumière. Nous prêtons des ampoules d’essai pour que vous tranchiez chez vous, le soir."
            - paragraph [ref=e31]: Ensuite la fabrication suit son cours et vous n’en verrez pas grand-chose, deux ou trois photos si vous les demandez. La pièce reste allumée vingt-quatre heures avant de partir.
          - generic [ref=e32]:
            - generic [ref=e33]:
              - heading "inclus" [level=3] [ref=e34]
              - list [ref=e35]:
                - listitem [ref=e36]: la visite et le relevé sur place
                - listitem [ref=e37]: le plan coté et le choix des matières
                - listitem [ref=e38]: le prêt d’ampoules d’essai chez vous
                - listitem [ref=e39]: la fabrication et l’essai de vingt-quatre heures
                - listitem [ref=e40]: la pose sur un point existant, ou l’expédition en caisse bois sur mesure
                - listitem [ref=e41]: un passage de réglage dans les trois mois
            - generic [ref=e42]:
              - heading "non inclus" [level=3] [ref=e43]
              - list [ref=e44]:
                - listitem [ref=e45]: "les travaux électriques : tirer une ligne, déplacer une boîte de sortie, reprendre un tableau"
                - listitem [ref=e46]: la reprise des peintures et des enduits autour des perçages
                - listitem [ref=e47]: les séries au-delà d’une vingtaine de pièces identiques
          - paragraph [ref=e49]: "À préparer : deux ou trois photos de la pièce, prises de jour, la hauteur sous plafond, la position des points lumineux existants."
          - generic [ref=e50]:
            - paragraph [ref=e51]:
              - generic [ref=e52]: D’une applique à 380 € à une grande pièce de cage d’escalier à 6 500 €, le détail figure au tableau plus bas. Acompte de 40 % à la commande, solde à la livraison.
              - generic [ref=e53]: fourchette
            - paragraph [ref=e54]:
              - generic [ref=e55]: 6 à 10 semaines, trois de plus quand un verre est soufflé pour vous. Une série de trois à huit appliques demande 8 à 12 semaines.
              - generic [ref=e56]: délai courant
          - paragraph [ref=e57]:
            - link "comment ça se passe" [ref=e58] [cursor=pointer]:
              - /url: /services#etapes
          - list [ref=e59]:
            - listitem [ref=e60]: 1. Premier contact
            - listitem [ref=e61]: 3. Croquis et devis
            - listitem [ref=e62]: 6. Fabrication et essai
          - link "Demander un devis — créer une pièce" [ref=e64] [cursor=pointer]:
            - /url: /contact
    - region [ref=e65]:
      - generic [ref=e66]:
        - img "Suspension ancienne démontée sur l’établi, câblage textile déposé" [ref=e69]
        - generic [ref=e70]:
          - heading "Remettre en lumière une pièce ancienne" [level=2] [ref=e72]
          - paragraph [ref=e73]: La patine reste, le circuit repart à neuf.
          - generic [ref=e74]:
            - paragraph [ref=e75]: "On nous apporte surtout des suspensions d’atelier, des lustres de famille et des appliques trouvées en brocante. La première question n’est pas esthétique, elle est électrique. Le câblage textile d’origine ne repart jamais avec la pièce, sans exception : un coton de quatre-vingts ans sur du 230 V finit par se fendre là où personne ne le voit."
            - paragraph [ref=e76]: "Ce qui se restaure : la tôle et le laiton se redressent et se repolissent, une molette manquante se refait au tour, un verre cassé se remplace en deux à quatre semaines. La patine d’origine reste en place, et les éclats d’émail sont stabilisés au vernis mat plutôt que repeints."
            - paragraph [ref=e77]: "Ce qui ne se restaure pas : un verre sur mesure qu’on ne retrouve nulle part, un transformateur d’origine qu’on ne peut ni ouvrir ni remplacer. Nous le disons sur photos, avant tout démontage."
          - generic [ref=e78]:
            - generic [ref=e79]:
              - heading "inclus" [level=3] [ref=e80]
              - list [ref=e81]:
                - listitem [ref=e82]: le diagnostic sur photos, puis sur la pièce à l’atelier
                - listitem [ref=e83]: la dépose complète de l’ancien circuit
                - listitem [ref=e84]: douille neuve, câble à trois conducteurs, mise à la terre
                - listitem [ref=e85]: nettoyage, redressage et reprise des finitions d’origine
                - listitem [ref=e86]: essai en charge de vingt-quatre heures avant le retour
            - generic [ref=e87]:
              - heading "non inclus" [level=3] [ref=e88]
              - list [ref=e89]:
                - listitem [ref=e90]: le remplacement d’un verre sur mesure introuvable
                - listitem [ref=e91]: le repeint d’un émail ou d’une laque d’origine
                - listitem [ref=e92]: la conservation du câblage ancien, jamais réutilisé, même en bon état apparent
          - paragraph [ref=e94]: "Photos à envoyer : le dessus de la pièce, là où le câble entre dans la monture, la douille, de près, le câble et son passage dans la tige ou la potence, les marques, plaques ou numéros s’il y en a."
          - generic [ref=e95]:
            - paragraph [ref=e96]:
              - generic [ref=e97]: "Remise aux normes seule : 180 à 350 €. Restauration complète : 450 à 2 500 €, selon l’état de la monture et le verre à refaire."
              - generic [ref=e98]: fourchette
            - paragraph [ref=e99]:
              - generic [ref=e100]: 2 à 3 semaines pour une remise aux normes, 6 à 12 semaines pour une restauration complète.
              - generic [ref=e101]: délai courant
          - paragraph [ref=e102]:
            - link "comment ça se passe" [ref=e103] [cursor=pointer]:
              - /url: /services#etapes
          - list [ref=e104]:
            - listitem [ref=e105]: 1. Premier contact
            - listitem [ref=e106]: 3. Croquis et devis
            - listitem [ref=e107]: 6. Fabrication et essai
          - link "Demander un devis — remettre en lumière une pièce ancienne" [ref=e109] [cursor=pointer]:
            - /url: /contact
    - region [ref=e110]:
      - generic [ref=e111]:
        - img "Plan d’éclairage annoté et ampoules d’essai posées sur une table" [ref=e114]
        - generic [ref=e115]:
          - heading "Décider où mettre la lumière" [level=2] [ref=e117]
          - paragraph [ref=e118]: Décider où va la lumière quand cela ne coûte encore que du crayon.
          - generic [ref=e119]:
            - paragraph [ref=e120]: Il arrive qu’on nous appelle sans projet d’objet. Un appartement en travaux, six pièces, et la question de savoir où placer les points lumineux avant que tout soit refermé. C’est le meilleur moment pour nous appeler, et souvent le dernier.
            - paragraph [ref=e121]: La visite dure deux heures. Nous regardons l’orientation, la couleur des murs, la hauteur sous plafond, et surtout ce que vous faites dans chaque pièce une fois la nuit tombée. Un couloir qu’on traverse et un couloir où les enfants s’assoient ne s’éclairent pas de la même façon.
            - paragraph [ref=e122]: "Vous recevez ensuite un plan pièce par pièce : implantation des points, températures, intensité attendue à chaque foyer, culot, type de source et emplacement des variateurs. Un architecte d’intérieur le transmet tel quel à son électricien."
          - generic [ref=e123]:
            - generic [ref=e124]:
              - heading "inclus" [level=3] [ref=e125]
              - list [ref=e126]:
                - listitem [ref=e127]: la visite et le relevé, deux heures sur place
                - listitem [ref=e128]: le plan d’éclairage pièce par pièce
                - listitem [ref=e129]: les références de sources et de variateurs compatibles
                - listitem [ref=e130]: une relecture du devis de votre électricien
            - generic [ref=e131]:
              - heading "non inclus" [level=3] [ref=e132]
              - list [ref=e133]:
                - listitem [ref=e134]: la fourniture des ampoules et des variateurs
                - listitem [ref=e135]: le suivi de chantier et la coordination des autres corps de métier
          - paragraph [ref=e137]: "Vous recevez : Un plan pièce par pièce, remis en PDF."
          - generic [ref=e138]:
            - paragraph [ref=e139]:
              - generic [ref=e140]: "Visite et relevé : 180 €, déduits en cas de commande. Plan d’éclairage d’un logement : 650 à 1 400 €."
              - generic [ref=e141]: fourchette
            - paragraph [ref=e142]:
              - generic [ref=e143]: 2 à 3 semaines après le relevé.
              - generic [ref=e144]: délai courant
          - paragraph [ref=e145]:
            - link "comment ça se passe" [ref=e146] [cursor=pointer]:
              - /url: /services#etapes
          - list [ref=e147]:
            - listitem [ref=e148]: 1. Premier contact
            - listitem [ref=e149]: 3. Croquis et devis
            - listitem [ref=e150]: 6. Fabrication et essai
          - link "Demander un devis — décider où mettre la lumière" [ref=e152] [cursor=pointer]:
            - /url: /contact
    - region [ref=e153]:
      - generic [ref=e154]:
        - heading "Comment ça se passe" [level=2] [ref=e155]
        - separator [ref=e156]
      - generic [ref=e157]:
        - generic [ref=e158]:
          - paragraph [ref=e159]: "01"
          - generic [ref=e160]:
            - paragraph [ref=e161]: Premier contact
            - paragraph [ref=e162]: Vous décrivez l’endroit, si possible avec deux photos prises de jour. Nous répondons sous deux jours ouvrés.
        - generic [ref=e163]:
          - paragraph [ref=e164]: "02"
          - generic [ref=e165]:
            - paragraph [ref=e166]: Visite et relevé
            - paragraph [ref=e167]: "Une heure ou deux sur place : hauteurs, points existants, couleur des murs, usages du soir."
        - generic [ref=e168]:
          - paragraph [ref=e169]: "03"
          - generic [ref=e170]:
            - paragraph [ref=e171]: Croquis et devis
            - paragraph [ref=e172]: Sous 5 à 10 jours ouvrés, avec la fourchette de prix, le délai et les matières proposées.
        - generic [ref=e173]:
          - paragraph [ref=e174]: "04"
          - generic [ref=e175]:
            - paragraph [ref=e176]: Acompte
            - paragraph [ref=e177]: 40 % à la commande. C’est ce qui déclenche l’achat de la matière et réserve la place au planning.
        - generic [ref=e178]:
          - paragraph [ref=e179]: "05"
          - generic [ref=e180]:
            - paragraph [ref=e181]: Dessin d’exécution
            - paragraph [ref=e182]: Un plan coté, validé par écrit. Rien n’est coupé avant votre retour.
        - generic [ref=e183]:
          - paragraph [ref=e184]: "06"
          - generic [ref=e185]:
            - paragraph [ref=e186]: Fabrication et essai
            - paragraph [ref=e187]: Six à dix semaines à l’établi, puis vingt-quatre heures allumée avant de quitter l’atelier.
        - generic [ref=e188]:
          - paragraph [ref=e189]: "07"
          - generic [ref=e190]:
            - paragraph [ref=e191]: Pose ou expédition
            - paragraph [ref=e192]: Pose sur point existant à 120 € le point dans la métropole, ou caisse bois sur mesure par transporteur.
        - generic [ref=e193]:
          - paragraph [ref=e194]: "08"
          - generic [ref=e195]:
            - paragraph [ref=e196]: Réglage
            - paragraph [ref=e197]: Un passage dans les trois mois, sans frais dans la métropole.
    - region [ref=e198]:
      - generic [ref=e199]:
        - heading "Délais et tarifs" [level=2] [ref=e200]
        - separator [ref=e201]
      - list [ref=e202]:
        - listitem [ref=e203]:
          - generic [ref=e204]: Applique sur mesure
          - generic [ref=e205]: 380 à 900 €
          - generic [ref=e206]: 6 à 10 semaines
        - listitem [ref=e207]:
          - generic [ref=e208]: Série de 6 appliques identiques
          - generic [ref=e209]: 2 200 €
          - generic [ref=e210]: 8 à 12 semaines
        - listitem [ref=e211]:
          - generic [ref=e212]: Suspension en laiton et verre soufflé
          - generic [ref=e213]: 750 à 1 800 €
          - generic [ref=e214]: 6 à 10 semaines, +3 avec du verre soufflé
        - listitem [ref=e215]:
          - generic [ref=e216]: Grande suspension d’escalier
          - generic [ref=e217]: 2 400 à 6 500 €
          - generic [ref=e218]: 6 à 10 semaines, +3 avec du verre soufflé
        - listitem [ref=e219]:
          - generic [ref=e220]: Lampe à poser
          - generic [ref=e221]: 450 à 1 100 €
          - generic [ref=e222]: 6 à 10 semaines
        - listitem [ref=e223]:
          - generic [ref=e224]: Lampadaire ou liseuse
          - generic [ref=e225]: 900 à 2 200 €
          - generic [ref=e226]: 6 à 10 semaines
        - listitem [ref=e227]:
          - generic [ref=e228]: Plafonnier
          - generic [ref=e229]: 650 à 1 100 €
          - generic [ref=e230]: 6 à 10 semaines
        - listitem [ref=e231]:
          - generic [ref=e232]: Restauration, remise aux normes
          - generic [ref=e233]: 180 à 350 €
          - generic [ref=e234]: 2 à 3 semaines
        - listitem [ref=e235]:
          - generic [ref=e236]: Restauration complète
          - generic [ref=e237]: 450 à 2 500 €
          - generic [ref=e238]: 6 à 12 semaines
        - listitem [ref=e239]:
          - generic [ref=e240]: Visite et relevé
          - generic [ref=e241]: 180 €, déduits en cas de commande
          - generic [ref=e242]: devis sous 5 à 10 jours ouvrés
        - listitem [ref=e243]:
          - generic [ref=e244]: Plan d’éclairage d’un logement
          - generic [ref=e245]: 650 à 1 400 €
          - generic [ref=e246]: 2 à 3 semaines après le relevé
        - listitem [ref=e247]:
          - generic [ref=e248]: Pose sur point existant
          - generic [ref=e249]: 120 € par point
          - generic [ref=e250]: à la livraison
    - region [ref=e251]:
      - generic [ref=e252]:
        - heading "Garanties" [level=2] [ref=e253]
        - separator [ref=e254]
      - generic [ref=e255]:
        - paragraph [ref=e256]: "Deux ans sur toute la partie électrique, cinq ans sur la structure et les finitions. L’usure normale et la patine qui fonce ne sont pas des défauts : c’est le comportement attendu d’un laiton nu, et le devis le dit."
        - paragraph [ref=e257]: Nous gardons dix ans les verres, douilles, câbles et molettes de chaque modèle. Un verre brisé se refait sans toucher au reste de la pièce, et une retouche part sous dix jours.
        - paragraph [ref=e258]: "Dans les trois mois qui suivent la pose, nous repassons une fois régler ce qui a bougé : hauteur, aplomb, intensité. Sans frais dans la métropole."
    - region [ref=e259]:
      - generic [ref=e260]:
        - heading "Travailler avec une agence" [level=2] [ref=e261]
        - separator [ref=e262]
      - generic [ref=e263]:
        - paragraph [ref=e264]: "Avec un architecte d’intérieur, nous travaillons sur plan. Chaque pièce part avec un dessin coté et une fiche technique : poids, entraxe de fixation, culot, température, classe électrique, indice de protection. De quoi remplir une pièce écrite sans nous rappeler."
        - paragraph [ref=e265]: "Le planning se cale sur celui du chantier et nous livrons groupé, à la semaine demandée. La facturation se fait au client final ou par l’agence, comme vous préférez. Les échantillons de finition circulent en rendez-vous client : laiton brossé, poli, patiné, tôle thermolaquée."
    - region [ref=e266]:
      - generic [ref=e267]:
        - heading "Questions fréquentes" [level=2] [ref=e268]
        - separator [ref=e269]
      - generic [ref=e271]:
        - group [ref=e272]:
          - generic "Combien de temps avant d’avoir ma pièce ?" [ref=e273] [cursor=pointer]
        - group [ref=e276]:
          - generic "Quel budget prévoir ?" [ref=e277] [cursor=pointer]
        - group [ref=e280]:
          - generic "Comment se passe une commande ?" [ref=e281] [cursor=pointer]
        - group [ref=e284]:
          - generic "Est-ce aux normes, et qui raccorde ?" [ref=e285] [cursor=pointer]
        - group [ref=e288]:
          - generic "Peut-on choisir la couleur de la lumière ?" [ref=e289] [cursor=pointer]
        - group [ref=e292]:
          - generic "Peut-on faire varier l’intensité ?" [ref=e293] [cursor=pointer]
        - group [ref=e296]:
          - generic "Mon ancien luminaire est-il récupérable ?" [ref=e297] [cursor=pointer]
        - group [ref=e300]:
          - generic "Et si quelque chose casse ?" [ref=e301] [cursor=pointer]
    - generic [ref=e305]:
      - paragraph [ref=e306]: Le plus simple, c’est un coup de téléphone. Sinon, écrivez-nous trois lignes sur la pièce et sa hauteur sous plafond.
      - link "Prendre rendez-vous" [ref=e308] [cursor=pointer]:
        - /url: /contact
  - contentinfo [ref=e309]:
    - generic [ref=e310]:
      - generic [ref=e311]:
        - generic [ref=e312]:
          - paragraph [ref=e313]: Atelier Bréande — luminaires sur mesure.
          - paragraph [ref=e314]: Lyon et la métropole, jusqu’à 60 km, sur rendez-vous
          - paragraph [ref=e315]: du mardi au vendredi, 9 h – 12 h 30 et 14 h – 18 h ; le samedi matin, sur rendez-vous
        - navigation "Plan du site" [ref=e316]:
          - paragraph [ref=e317]: plan du site
          - list [ref=e318]:
            - listitem [ref=e319]:
              - link "accueil" [ref=e320] [cursor=pointer]:
                - /url: /
            - listitem [ref=e321]:
              - link "l’atelier" [ref=e322] [cursor=pointer]:
                - /url: /latelier
            - listitem [ref=e323]:
              - link "collections" [ref=e324] [cursor=pointer]:
                - /url: /collections
            - listitem [ref=e325]:
              - link "services" [ref=e326] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e327]:
              - link "contact" [ref=e328] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e329]:
              - link "mentions légales" [ref=e330] [cursor=pointer]:
                - /url: /mentions-legales
      - paragraph [ref=e331]: Site fictif de démonstration — conçu et réalisé par Arnaud Porcel. 2026.
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