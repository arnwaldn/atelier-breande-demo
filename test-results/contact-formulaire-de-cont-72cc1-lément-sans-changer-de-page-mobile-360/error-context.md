# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact.spec.ts >> formulaire de contact >> un email mal formé est rejeté isolément, sans changer de page
- Location: tests\contact.spec.ts:75:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Envoyer' })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Aller au contenu" [ref=e2] [cursor=pointer]:
    - /url: "#contenu"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Atelier Bréande — retour à l’accueil" [ref=e5] [cursor=pointer]:
        - /url: /
        - generic [ref=e6]:
          - text: Atelier Br
          - generic [ref=e7]:
            - text: e
            - generic [ref=e8]: é
          - text: ande
      - group [ref=e10]:
        - generic "Menu" [ref=e11] [cursor=pointer]
  - complementary
  - main [ref=e16]:
    - generic [ref=e17]:
      - heading "Contact" [level=1] [ref=e18]
      - paragraph [ref=e19]: Le plus utile, pour commencer, c’est de décrire l’endroit plutôt que l’objet. Une photo prise de jour, la hauteur sous plafond et l’emplacement des points existants nous en disent plus que trois paragraphes.
      - generic [ref=e20]:
        - generic [ref=e21]:
          - paragraph [ref=e22]: "Formulaire de démonstration : l’envoi est désactivé sur ce site fictif — aucun message n’est transmis."
          - generic [ref=e23]:
            - generic [ref=e24]:
              - generic [ref=e25]: Nom *
              - textbox "Nom" [ref=e26]: Camille Dubreuil
            - generic [ref=e27]:
              - generic [ref=e28]: Email *
              - textbox "Email" [ref=e29]: pas-un-email
            - generic [ref=e30]:
              - generic [ref=e31]: Message *
              - textbox "Message" [active] [ref=e32]: Un message de démonstration suffisamment long pour passer la validation.
            - button "Envoi désactivé" [ref=e33]
        - generic [ref=e34]:
          - generic [ref=e35]:
            - paragraph [ref=e36]: Autrement qu’en écrivant
            - paragraph [ref=e37]: "Le téléphone marche mieux que l’écrit pour un premier échange : plutôt en fin de matinée ou après 16 h, parce que le reste du temps nous sommes à l’établi et la machine couvre la sonnerie. Les messages reçoivent une réponse sous deux jours ouvrés. Un rendez-vous à l’atelier se prend par téléphone."
            - paragraph [ref=e38]:
              - link "04 65 71 08 42" [ref=e39] [cursor=pointer]:
                - /url: tel:+33465710842
          - generic [ref=e40]:
            - paragraph [ref=e41]: Ce qui se passe ensuite
            - list [ref=e42]:
              - listitem [ref=e43]: Un accusé de réception sous deux jours ouvrés, écrit par quelqu’un qui a lu votre message.
              - listitem [ref=e44]: "Deux ou trois questions de cadrage : hauteur, points existants, usage du soir, ordre de budget."
              - listitem [ref=e45]: Une visite sur place, ou un appel d’une demi-heure si le projet est simple.
              - listitem [ref=e46]: Un croquis et un devis chiffré, cinq à dix jours ouvrés après la visite.
          - generic [ref=e47]:
            - paragraph [ref=e48]: Venir à l’atelier
            - paragraph [ref=e49]: "On nous trouve dans le 7e, côté rive gauche ; la rue vous est donnée quand le rendez-vous est pris. Il n’y a pas de showroom : vous verrez des établis occupés, des chutes de laiton et le tour à repousser. Comptez une heure, et évitez les chaussures neuves."
          - generic [ref=e50]:
            - paragraph [ref=e51]: Où nous intervenons
            - paragraph [ref=e52]: Toute la métropole, et une couronne de 60 km autour. Plus loin, la pièce voyage en caisse bois par transporteur, et le devis l’annonce avant la commande.
            - list [ref=e53]:
              - listitem [ref=e54]: Lyon·
              - listitem [ref=e55]: Villeurbanne·
              - listitem [ref=e56]: Caluire-et-Cuire·
              - listitem [ref=e57]: Écully·
              - listitem [ref=e58]: Tassin·
              - listitem [ref=e59]: Sainte-Foy-lès-Lyon·
              - listitem [ref=e60]: Bron·
              - listitem [ref=e61]: Oullins
            - paragraph [ref=e62]: "Au-delà de 60 km, sur devis : Grenoble, Saint-Étienne, Chambéry. Expédition partout en France."
            - paragraph [ref=e63]: Compris dans la métropole ; ensuite 0,60 € par kilomètre passé 30 km, ou 90 € au forfait.
          - generic [ref=e64]:
            - paragraph [ref=e65]: Horaires
            - paragraph [ref=e66]: du mardi au vendredi, 9 h – 12 h 30 et 14 h – 18 h
            - paragraph [ref=e67]: le samedi matin, sur rendez-vous
            - paragraph [ref=e68]: fermé trois semaines en août
            - paragraph [ref=e69]: réception sur rendez-vous, jamais à l’improviste
    - region [ref=e70]:
      - generic [ref=e71]:
        - heading "Questions fréquentes" [level=2] [ref=e72]
        - separator [ref=e73]
      - generic [ref=e75]:
        - group [ref=e76]:
          - generic "Vous déplacez-vous chez moi ?" [ref=e77] [cursor=pointer]
        - group [ref=e80]:
          - generic "Livrez-vous hors région ?" [ref=e81] [cursor=pointer]
        - group [ref=e84]:
          - generic "J’ai une échéance serrée, c’est possible ?" [ref=e85] [cursor=pointer]
        - group [ref=e88]:
          - generic "Peut-on se voir un samedi ?" [ref=e89] [cursor=pointer]
  - contentinfo [ref=e92]:
    - generic [ref=e93]:
      - generic [ref=e94]:
        - generic [ref=e95]:
          - paragraph [ref=e96]: Atelier Bréande — luminaires sur mesure.
          - paragraph [ref=e97]: Lyon et la métropole, jusqu’à 60 km, sur rendez-vous
          - paragraph [ref=e98]: du mardi au vendredi, 9 h – 12 h 30 et 14 h – 18 h ; le samedi matin, sur rendez-vous
        - navigation "Plan du site" [ref=e99]:
          - paragraph [ref=e100]: plan du site
          - list [ref=e101]:
            - listitem [ref=e102]:
              - link "accueil" [ref=e103] [cursor=pointer]:
                - /url: /
            - listitem [ref=e104]:
              - link "l’atelier" [ref=e105] [cursor=pointer]:
                - /url: /latelier
            - listitem [ref=e106]:
              - link "collections" [ref=e107] [cursor=pointer]:
                - /url: /collections
            - listitem [ref=e108]:
              - link "services" [ref=e109] [cursor=pointer]:
                - /url: /services
            - listitem [ref=e110]:
              - link "contact" [ref=e111] [cursor=pointer]:
                - /url: /contact
            - listitem [ref=e112]:
              - link "mentions légales" [ref=e113] [cursor=pointer]:
                - /url: /mentions-legales
      - paragraph [ref=e114]: Site fictif de démonstration — conçu et réalisé par Arnaud Porcel. 2026.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const SAISIE_VALIDE = {
  4   |   nom: 'Camille Dubreuil',
  5   |   email: 'camille.dubreuil@example.com',
  6   |   message: 'Un message de démonstration suffisamment long pour passer la validation.',
  7   | };
  8   | 
  9   | async function remplir(page: import('@playwright/test').Page, valeurs: Partial<typeof SAISIE_VALIDE>) {
  10  |   if (valeurs.nom !== undefined) await page.fill('#nom', valeurs.nom);
  11  |   if (valeurs.email !== undefined) await page.fill('#email', valeurs.email);
  12  |   if (valeurs.message !== undefined) await page.fill('#message', valeurs.message);
  13  | }
  14  | 
  15  | test.describe('formulaire de contact', () => {
  16  |   test('la mention de désactivation précède le formulaire dans le document', async ({ page }) => {
  17  |     await page.goto('/contact');
  18  |     const ordre = await page.evaluate(() => {
  19  |       const mention = document.querySelector('#contact-demo-mention');
  20  |       const formulaire = document.querySelector('#contact-form');
  21  |       if (!mention || !formulaire) return null;
  22  |       // DOCUMENT_POSITION_FOLLOWING (4) : le formulaire vient bien APRÈS la mention.
  23  |       return Boolean(mention.compareDocumentPosition(formulaire) & Node.DOCUMENT_POSITION_FOLLOWING);
  24  |     });
  25  |     expect(ordre, 'mention ou formulaire introuvable dans le DOM').toBe(true);
  26  |   });
  27  | 
  28  |   test('la mention de désactivation est lisible sans défiler sur le profil mobile 360', async ({
  29  |     page,
  30  |   }, testInfo) => {
  31  |     test.skip(testInfo.project.name !== 'mobile-360', 'vérification propre au profil 360 px');
  32  |     await page.goto('/contact');
  33  |     const mention = page.locator('#contact-demo-mention');
  34  |     await expect(mention).toBeVisible();
  35  | 
  36  |     const boite = await mention.boundingBox();
  37  |     const hauteurEcran = page.viewportSize()?.height ?? 740;
  38  |     expect(boite, 'impossible de mesurer la position de la mention').not.toBeNull();
  39  |     expect(
  40  |       boite!.y + boite!.height,
  41  |       `la mention déborde du premier écran (bas à ${boite!.y + boite!.height}px, écran ${hauteurEcran}px)`
  42  |     ).toBeLessThanOrEqual(hauteurEcran);
  43  |   });
  44  | 
  45  |   test('sans JavaScript, une mention explique que l’envoi est désactivé', async ({ browser }) => {
  46  |     const contexte = await browser.newContext({ javaScriptEnabled: false });
  47  |     const page = await contexte.newPage();
  48  |     await page.goto('/contact');
  49  |     // Le contenu de <noscript> est masqué (display: none) tant que JavaScript est
  50  |     // actif ; même scripts désactivés, `innerText` (utilisé par toContainText) dépend
  51  |     // du rendu visuel. On lit le texte brut du nœud DOM, indépendant de l'affichage —
  52  |     // et on tolère les retours à la ligne source (\s+) plutôt qu'une espace littérale.
  53  |     const texte = (await page.locator('noscript').textContent()) ?? '';
  54  |     expect(texte, `contenu du <noscript> : « ${texte} »`).toMatch(/formulaire\s+de\s+démonstration/i);
  55  |     await contexte.close();
  56  |   });
  57  | 
  58  |   test('la soumission vide affiche les trois erreurs sans changer de page', async ({ page }) => {
  59  |     await page.goto('/contact');
  60  |     const urlDepart = page.url();
  61  | 
  62  |     await page.getByRole('button', { name: 'Envoyer' }).click();
  63  | 
  64  |     await expect(page.locator('#nom-erreur')).toBeVisible();
  65  |     await expect(page.locator('#nom-erreur')).toHaveText('Le nom est obligatoire.');
  66  |     await expect(page.locator('#email-erreur')).toBeVisible();
  67  |     await expect(page.locator('#email-erreur')).toHaveText("L'adresse email n'est pas valide.");
  68  |     await expect(page.locator('#message-erreur')).toBeVisible();
  69  |     await expect(page.locator('#message-erreur')).toHaveText('Le message est requis (10 caractères minimum).');
  70  | 
  71  |     expect(page.url()).toBe(urlDepart);
  72  |     await expect(page.locator('#contact-demo-etat')).toBeHidden();
  73  |   });
  74  | 
  75  |   test('un email mal formé est rejeté isolément, sans changer de page', async ({ page }) => {
  76  |     await page.goto('/contact');
  77  |     const urlDepart = page.url();
  78  | 
  79  |     await remplir(page, { nom: SAISIE_VALIDE.nom, email: 'pas-un-email', message: SAISIE_VALIDE.message });
> 80  |     await page.getByRole('button', { name: 'Envoyer' }).click();
      |                                                         ^ Error: locator.click: Test timeout of 30000ms exceeded.
  81  | 
  82  |     await expect(page.locator('#email-erreur')).toBeVisible();
  83  |     await expect(page.locator('#nom-erreur')).toBeHidden();
  84  |     await expect(page.locator('#message-erreur')).toBeHidden();
  85  |     expect(page.url()).toBe(urlDepart);
  86  |     await expect(page.locator('#contact-demo-etat')).toBeHidden();
  87  |   });
  88  | 
  89  |   test('un message de 9 caractères est rejeté, un message de 10 caractères est accepté', async ({
  90  |     page,
  91  |   }) => {
  92  |     await page.goto('/contact');
  93  |     await remplir(page, { nom: SAISIE_VALIDE.nom, email: SAISIE_VALIDE.email, message: '123456789' });
  94  |     await page.getByRole('button', { name: 'Envoyer' }).click();
  95  |     await expect(page.locator('#message-erreur')).toBeVisible();
  96  | 
  97  |     await page.fill('#message', '1234567890');
  98  |     await page.getByRole('button', { name: 'Envoyer' }).click();
  99  |     await expect(page.locator('#contact-demo-etat')).toBeVisible();
  100 |   });
  101 | 
  102 |   test('une saisie valide affiche l’état de démonstration sans changer de page', async ({ page }) => {
  103 |     await page.goto('/contact');
  104 |     const urlDepart = page.url();
  105 | 
  106 |     await remplir(page, SAISIE_VALIDE);
  107 |     await page.getByRole('button', { name: 'Envoyer' }).click();
  108 | 
  109 |     await expect(page.locator('#contact-demo-etat')).toBeVisible();
  110 |     await expect(page.locator('#contact-demo-etat')).toContainText(/envoi est volontairement désactivé/i);
  111 |     expect(page.url()).toBe(urlDepart);
  112 |   });
  113 | 
  114 |   test('soumettre le formulaire ne déclenche aucune requête réseau sortante', async ({ page }) => {
  115 |     await page.goto('/contact');
  116 |     // On attend l'arrêt du réseau AVANT de brancher l'écoute : les requêtes du
  117 |     // document lui-même (HTML, script, styles, polices) sont ainsi exclues par
  118 |     // construction — seules les requêtes déclenchées PAR l'envoi sont observées.
  119 |     await page.waitForLoadState('networkidle');
  120 | 
  121 |     const requetesApresEnvoi: string[] = [];
  122 |     page.on('request', (req) => {
  123 |       requetesApresEnvoi.push(`${req.method()} ${req.url()}`);
  124 |     });
  125 | 
  126 |     await remplir(page, SAISIE_VALIDE);
  127 |     await page.getByRole('button', { name: 'Envoyer' }).click();
  128 |     await expect(page.locator('#contact-demo-etat')).toBeVisible();
  129 | 
  130 |     // Marge pour une éventuelle requête différée (fetch tardif, beacon).
  131 |     await page.waitForTimeout(500);
  132 | 
  133 |     expect(requetesApresEnvoi, `requêtes déclenchées par l'envoi :\n${requetesApresEnvoi.join('\n')}`).toEqual(
  134 |       []
  135 |     );
  136 |   });
  137 | });
  138 | 
```