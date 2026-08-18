# PRD — Atelier Bréande (site vitrine)

> **Statut** : contrat produit verrouillé — source de vérité amont → aval.
> **Auteur** : persona Product Manager (agence).
> **Nature du projet** : projet témoin jetable de validation de la chaîne des 5 personas. Non commercial, données fictives.
> **Contrainte technique imposée par l'agence** : Astro + Tailwind, site 100 % statique, aucun backend.
> **Chemin canonique** : ce fichier (`docs/PRD.md`) est relu par le Tech Lead/Architecte (cadrage) et par le QA (validation finale).

---

## 0. Résumé en une phrase

Un site vitrine de 3 pages (Accueil, Services, Contact) pour « Atelier Bréande », artisan fictif créateur de luminaires sur mesure à Lyon, qui présente son savoir-faire et permet à un visiteur de le contacter via un formulaire validé côté client et protégé contre le spam — le tout statique, rapide et accessible.

---

## 1. Problème

Un artisan qui crée des luminaires sur mesure n'a aujourd'hui **aucune présence en ligne** permettant à un prospect de :

1. **Comprendre en quelques secondes** ce qu'il fait, pour qui, et à quel niveau de qualité (proposition de valeur + preuves visuelles de réalisations).
2. **Identifier l'offre** qui correspond à son besoin (création, restauration, ou simple conseil).
3. **Entrer en contact** sans friction et sans se demander si son message est bien parti.

Sans ce point de contact, le prospect (particulier ou architecte d'intérieur) repart chez un concurrent visible en ligne. Le problème à résoudre n'est donc **pas** « faire un joli site » : c'est **transformer un visiteur curieux en prise de contact qualifiée**, avec un site qui inspire confiance (haut de gamme) tout en restant accessible et chaleureux.

> Ce problème est énoncé indépendamment de toute solution technique : la contrainte Astro/Tailwind/statique est un choix d'agence, pas une exigence produit.

---

## 2. Objectifs et non-objectifs

### 2.1 Objectifs (ce que le site DOIT accomplir)

- **O1 — Convaincre vite** : dès l'arrivée sur l'Accueil, le visiteur comprend la proposition de valeur (« luminaires sur mesure, artisanat lyonnais ») et voit 3 réalisations.
- **O2 — Orienter** : le visiteur identifie clairement les 3 offres et laquelle le concerne.
- **O3 — Convertir en contact** : le visiteur peut envoyer un message et **obtient une confirmation visible** que son message est parti.
- **O4 — Inspirer confiance** : ton chaleureux, artisanal, haut de gamme accessible ; cohérence visuelle sur les 3 pages.
- **O5 — Ne jamais frustrer** : navigation évidente, site rapide, lisible sur mobile, accessible au clavier.

### 2.2 Non-objectifs (ce que le site ne cherche PAS à faire dans cette version)

- **N1** — Vendre en ligne / paiement (pas d'e-commerce, pas de panier).
- **N2** — Gérer des comptes utilisateurs, connexion, espace client.
- **N3** — Envoyer réellement l'email côté serveur (aucun backend ; voir §5.4 pour le comportement attendu côté utilisateur).
- **N4** — Blog, actualités, newsletter, multilingue.
- **N5** — Système de gestion de contenu (CMS) : le contenu est en dur dans le code.
- **N6** — Prise de rendez-vous / agenda / devis automatisé.

---

## 3. Utilisateur cible (personas)

Contexte : cibles **françaises**, contenu 100 % en français. Données de l'artisan **fictives** (aucune donnée personnelle réelle ne doit être inventée dans le code — utiliser les valeurs fictives du présent PRD ou des `{{PLACEHOLDERS}}`).

### Persona A — Camille, particulier en rénovation (cible principale)

- **Qui** : 30-55 ans, rénove ou aménage son logement, sensible au « fait main » et aux belles pièces.
- **Contexte** : navigue souvent **sur mobile**, le soir, entre deux tâches. Peu de patience pour un site lent ou confus.
- **Contrainte principale** : veut vérifier en < 30 s que l'artisan est sérieux et « pour elle », puis poser une question simple sans créer de compte.
- **Attente clé** : voir de belles réalisations + un moyen de contact rassurant.

### Persona B — Julien, architecte d'intérieur (cible secondaire, à plus forte valeur)

- **Qui** : prescripteur B2B, cherche des artisans fiables pour ses chantiers clients.
- **Contexte** : navigue **sur ordinateur**, compare plusieurs prestataires, juge vite le niveau de gamme.
- **Contrainte principale** : besoin de comprendre la capacité à faire du **sur mesure** et du **conseil éclairage**, et de garder un contact pro.
- **Attente clé** : preuve de savoir-faire (réalisations, offres claires) + contact rapide et net.

### Non-cibles

- Chasseurs de promotions / bas de gamme.
- Recruteurs, fournisseurs, spam commercial (traités par la protection anti-spam du formulaire).

---

## 4. Golden path — première valeur utile

> **Définition de la « première valeur utile »** : un prospect arrive sur le site, comprend l'offre, et **repart avec la certitude que sa demande de contact est bien partie** (confirmation visible). C'est le parcours minimal qui prouve que le site sert à quelque chose. Il est **entièrement testable au navigateur** par le QA et le bêta-testeur, sans backend.

### Parcours nominal (du premier chargement à la confirmation)

1. **Arrivée** — Le visiteur ouvre la page d'**Accueil** (`/`). En haut : nom « Atelier Bréande », une accroche claire (proposition de valeur), une image/visuel d'ambiance et un appel à l'action (« Nous contacter » / « Voir nos services »).
2. **Preuve** — En descendant, il voit **3 réalisations** (visuel + titre + courte description chacune).
3. **Orientation** — Il clique dans la navigation vers **Services** (`/services`). Il lit les **3 offres** : Création sur mesure, Restauration, Conseil éclairage. Chaque offre a un titre, une description et ce qu'elle apporte.
4. **Décision de contact** — Depuis Services (ou la navigation), il clique vers **Contact** (`/contact`).
5. **Saisie** — Il remplit le formulaire : **Nom**, **Email**, **Message**.
6. **Validation** — Il envoie. Les champs sont validés côté client. S'ils sont valides et que le piège anti-spam (honeypot) est vide, la soumission est acceptée.
7. **Confirmation (valeur atteinte)** — Le visiteur voit un **état/message de confirmation clair** en français (ex. « Merci, votre message a bien été envoyé. Nous vous répondrons rapidement. ») **sans quitter mentalement le site** et sans erreur. Le formulaire disparaît ou est remplacé par ce message de confirmation.

> **Critère de réussite du golden path** : à l'étape 7, un testeur constate visuellement la confirmation. C'est le signal « produit qui marche ». Toute autre chose (ex. rester sur le formulaire sans retour, message d'erreur inattendu) = golden path échoué.

---

## 5. Critères d'acceptation (Given-When-Then)

> Convention : chaque critère est **vérifiable** (un testeur sait dire passé/échoué). Les identifiants `CA-x` servent de référence pour les scénarios QA et bêta-test.

### 5.1 Navigation et structure globale (toutes pages)

- **CA-NAV-1**
  - **Étant donné** que je suis sur n'importe laquelle des 3 pages,
  - **Quand** je regarde l'en-tête,
  - **Alors** je vois une navigation avec des liens vers **Accueil**, **Services** et **Contact**, tous en français.

- **CA-NAV-2**
  - **Étant donné** que je suis sur une page,
  - **Quand** je clique sur un lien de navigation,
  - **Alors** j'arrive sur la page correspondante (`/` pour Accueil, `/services` pour Services, `/contact` pour Contact) sans erreur 404.

- **CA-NAV-3**
  - **Étant donné** que je suis sur une page,
  - **Quand** je regarde la navigation,
  - **Alors** le lien de la page courante est visuellement distingué (état actif).

- **CA-NAV-4**
  - **Étant donné** que je consulte le site,
  - **Quand** je regarde le pied de page,
  - **Alors** je vois le nom « Atelier Bréande », une mention de localisation (Lyon) et l'année, le tout en français.

- **CA-NAV-5**
  - **Étant donné** que je navigue **au clavier uniquement** (touche Tab),
  - **Quand** je parcours l'en-tête,
  - **Alors** chaque lien reçoit un focus visible et est activable avec Entrée.

### 5.2 Page Accueil (`/`)

- **CA-HOME-1**
  - **Étant donné** que j'ouvre la page d'accueil,
  - **Quand** la page a fini de charger,
  - **Alors** je vois le nom « Atelier Bréande » et une **proposition de valeur** explicite mentionnant les luminaires sur mesure et l'artisanat (Lyon).

- **CA-HOME-2**
  - **Étant donné** que je suis sur l'accueil,
  - **Quand** je fais défiler la page,
  - **Alors** je vois exactement **3 réalisations**, chacune avec un **visuel**, un **titre** et une **courte description**.

- **CA-HOME-3**
  - **Étant donné** que je suis sur l'accueil,
  - **Quand** je cherche à passer à l'action,
  - **Alors** je trouve au moins un **appel à l'action** menant vers Contact (et/ou Services).

- **CA-HOME-4**
  - **Étant donné** que chaque réalisation comporte une image,
  - **Quand** j'inspecte les images,
  - **Alors** chaque image possède un **texte alternatif** (`alt`) descriptif en français.

- **CA-HOME-5**
  - **Étant donné** que j'ouvre l'accueil sur mobile (largeur ≈ 375 px),
  - **Quand** la page s'affiche,
  - **Alors** le contenu est lisible sans défilement horizontal et les 3 réalisations s'empilent correctement.

### 5.3 Page Services (`/services`)

- **CA-SERV-1**
  - **Étant donné** que j'ouvre la page Services,
  - **Quand** la page a fini de charger,
  - **Alors** je vois exactement **3 offres** : **Création sur mesure**, **Restauration**, **Conseil éclairage**.

- **CA-SERV-2**
  - **Étant donné** que je regarde une offre,
  - **Quand** je la lis,
  - **Alors** elle comporte un **titre**, une **description** claire et une indication de **ce qu'elle apporte** au client, en français.

- **CA-SERV-3**
  - **Étant donné** que je suis sur Services,
  - **Quand** je souhaite passer à l'action,
  - **Alors** je trouve un **appel à l'action** menant vers Contact.

- **CA-SERV-4**
  - **Étant donné** que j'ouvre Services sur mobile (largeur ≈ 375 px),
  - **Quand** la page s'affiche,
  - **Alors** les 3 offres s'empilent proprement, sans défilement horizontal.

### 5.4 Page Contact et formulaire (`/contact`)

> **Comportement produit tranché (côté utilisateur)** — le formulaire est validé **côté client** puis, s'il est valide et non détecté comme spam, il **affiche un état de confirmation** sans rechargement perceptible ni erreur. Aucun email réel n'est envoyé (pas de backend). L'implémentation exacte de la « soumission » (endpoint factice `/api/contact` simulé, ou `mailto:` encodé, ou interception JavaScript affichant la confirmation) est laissée au **Tech Lead** ; seul le **résultat observable côté utilisateur** décrit ci-dessous fait foi pour la validation.

#### Structure et champs

- **CA-CONT-1**
  - **Étant donné** que j'ouvre la page Contact,
  - **Quand** la page a fini de charger,
  - **Alors** je vois un formulaire avec trois champs étiquetés en français : **Nom**, **Email**, **Message**, et un bouton d'envoi (ex. « Envoyer »).

- **CA-CONT-2**
  - **Étant donné** que chaque champ du formulaire,
  - **Quand** j'inspecte l'accessibilité,
  - **Alors** chaque champ a une étiquette (`label`) associée et le champ obligatoire est identifiable (attribut `required` et/ou indication visuelle).

- **CA-CONT-3 (honeypot présent mais invisible)**
  - **Étant donné** que le formulaire contient un **champ piège anti-spam (honeypot)**,
  - **Quand** un utilisateur humain regarde la page,
  - **Alors** ce champ est **invisible et non focusable** (masqué à l'écran et retiré de l'ordre de tabulation), et n'est donc jamais rempli par un humain.

#### Cas nominal (succès)

- **CA-CONT-4 (envoi valide → confirmation)**
  - **Étant donné** que je saisis un **Nom non vide**, un **Email au format valide** et un **Message non vide** (longueur minimale respectée), et que le champ honeypot reste vide,
  - **Quand** je clique sur « Envoyer »,
  - **Alors** un **message/état de confirmation** en français s'affiche (ex. « Merci, votre message a bien été envoyé. »), le formulaire n'affiche **aucune erreur**, et aucune page d'erreur n'apparaît.

- **CA-CONT-5 (le formulaire ne reste pas dans l'état initial après succès)**
  - **Étant donné** un envoi valide,
  - **Quand** la confirmation s'affiche,
  - **Alors** le formulaire de saisie est soit remplacé par la confirmation, soit réinitialisé et accompagné du message de confirmation — de sorte que l'utilisateur comprend sans ambiguïté que l'action a réussi.

#### Cas d'erreur (validation côté client)

- **CA-CONT-6 (champs vides)**
  - **Étant donné** que je laisse **tous les champs vides**,
  - **Quand** je clique sur « Envoyer »,
  - **Alors** la soumission est **bloquée**, **aucune confirmation** n'apparaît, et un **message d'erreur en français** signale les champs obligatoires manquants.

- **CA-CONT-7 (nom vide)**
  - **Étant donné** que Email et Message sont valides mais que **Nom est vide**,
  - **Quand** je clique sur « Envoyer »,
  - **Alors** la soumission est bloquée et une erreur en français indique que le **Nom est obligatoire**.

- **CA-CONT-8 (email invalide)**
  - **Étant donné** que je saisis un **Email au format invalide** (ex. `camille`, `camille@`, `camille@exemple`, `camille exemple.fr`),
  - **Quand** je clique sur « Envoyer »,
  - **Alors** la soumission est bloquée, **aucune confirmation** n'apparaît, et un **message d'erreur en français** indique que l'email n'est pas valide.

- **CA-CONT-9 (email valide accepté)**
  - **Étant donné** que je saisis un email au format valide (ex. `camille@exemple.fr`),
  - **Quand** les autres champs sont valides et que j'envoie,
  - **Alors** l'email n'est **pas** rejeté et le parcours de succès (CA-CONT-4) s'applique.

- **CA-CONT-10 (message vide ou trop court)**
  - **Étant donné** que Nom et Email sont valides mais que **Message est vide** (ou plus court que la longueur minimale attendue),
  - **Quand** je clique sur « Envoyer »,
  - **Alors** la soumission est bloquée et une erreur en français indique que le **Message est requis** (et le cas échéant sa longueur minimale).

- **CA-CONT-11 (honeypot rempli → soumission rejetée silencieusement)**
  - **Étant donné** qu'un robot (simulé en QA en renseignant le champ honeypot via les outils navigateur) remplit **le champ piège** ainsi que des champs valides,
  - **Quand** le formulaire est soumis,
  - **Alors** la soumission est **traitée comme du spam** : **aucun message de contact n'est considéré comme envoyé** et **l'état de confirmation nominal (CA-CONT-4) n'est PAS atteint**. Le comportement est cohérent et reproductible (pas d'erreur JavaScript bloquante visible).
  - *Note QA : ce cas se teste en rendant le champ honeypot visible via les outils de développement puis en le remplissant. Un humain en usage normal ne peut pas déclencher ce cas.*

- **CA-CONT-12 (correction d'erreur possible)**
  - **Étant donné** qu'une erreur de validation s'est affichée,
  - **Quand** je corrige les champs fautifs et renvoie le formulaire,
  - **Alors** l'erreur disparaît et, si tout est valide, la confirmation (CA-CONT-4) s'affiche.

#### Accessibilité du formulaire

- **CA-CONT-13 (navigation clavier)**
  - **Étant donné** que je navigue au clavier,
  - **Quand** je tabule dans le formulaire,
  - **Alors** j'atteins successivement Nom, Email, Message puis le bouton Envoyer (le honeypot n'est **jamais** atteint), chaque élément a un focus visible.

- **CA-CONT-14 (erreurs annoncées)**
  - **Étant donné** qu'une erreur de validation survient,
  - **Quand** elle s'affiche,
  - **Alors** le message d'erreur est associé au champ concerné (lien programmatique, ex. `aria-describedby`) afin d'être compréhensible pour un lecteur d'écran.

---

## 6. Exigences non-fonctionnelles

> Ces exigences sont des **critères de recette** au même titre que les CA. Elles sont mesurables.

### 6.1 Langue et ton

- **NF-LANG-1** — L'intégralité du contenu visible (textes, étiquettes, boutons, messages d'erreur, confirmation, `alt` des images, pied de page) est en **français**. Aucun texte en anglais visible par l'utilisateur.
- **NF-LANG-2** — L'attribut de langue du document est `lang="fr"`.
- **NF-TON-1** — Le ton rédactionnel est **chaleureux, artisanal, haut de gamme accessible** : pas de jargon, pas de superlatifs creux ; on parle de savoir-faire, de matière, de sur-mesure.

### 6.2 Responsive / mobile

- **NF-RESP-1** — Le site est utilisable et lisible de **375 px** (mobile) à **≥ 1280 px** (bureau), sans défilement horizontal parasite.
- **NF-RESP-2** — Une balise `meta viewport` est présente.
- **NF-RESP-3** — Les cibles tactiles (liens, bouton d'envoi) sont suffisamment grandes pour un usage au doigt.

### 6.3 Accessibilité de base

- **NF-A11Y-1** — Chaque page a **un seul `h1`** et une hiérarchie de titres cohérente.
- **NF-A11Y-2** — Toutes les images informatives ont un `alt` pertinent ; les images purement décoratives ont un `alt` vide.
- **NF-A11Y-3** — Le contraste texte/fond respecte au minimum le ratio **AA** (4,5:1 pour le texte courant).
- **NF-A11Y-4** — Tout le site est **navigable au clavier**, avec focus visible.
- **NF-A11Y-5** — Les champs de formulaire ont des `label` correctement associés.

### 6.4 Performance (Lighthouse)

- **NF-PERF-1** — Score **Lighthouse Performance > 90** sur l'Accueil (mobile).
- **NF-PERF-2** — Score **Lighthouse Accessibilité > 90** sur les 3 pages.
- **NF-PERF-3** — Score **Lighthouse Bonnes pratiques (Best Practices) > 90**.
- **NF-PERF-4** — Score **Lighthouse SEO > 90** (titres `<title>` uniques par page, meta description, structure sémantique).
- **NF-PERF-5** — Les images sont optimisées (format et dimensions adaptés) pour ne pas dégrader le score de performance.

### 6.5 Contrainte de plateforme

- **NF-TECH-1** — Site **statique**, **aucun backend**, aucune base de données, aucun appel réseau tiers nécessaire au fonctionnement des 3 pages.
- **NF-TECH-2** — Aucune donnée personnelle réelle n'est présente dans le code ; l'artisan et ses réalisations sont **fictifs**.
- **NF-TECH-3** — Aucune donnée saisie dans le formulaire n'est stockée ni transmise à un tiers (cohérent avec l'absence de backend et de traitement réel).

---

## 7. Roadmap (tranches courtes, ordonnées par valeur)

> Ordonnancement par **valeur décroissante** : chaque tranche est livrable et vérifiable indépendamment. Le golden path (§4) est atteint dès la fin de la Tranche 3.

- **T0 — Ossature & design system** *(fondation)*
  Projet Astro + Tailwind initialisé, layout commun (en-tête + navigation + pied de page), palette et typographie posant le ton chaleureux/haut de gamme, 3 routes vides (`/`, `/services`, `/contact`).
  *Vérifiable par* : CA-NAV-1 à CA-NAV-5, NF-LANG-2, NF-RESP-2.

- **T1 — Page Accueil** *(première impression, forte valeur)*
  Proposition de valeur + visuel d'ambiance + 3 réalisations + appel à l'action.
  *Vérifiable par* : CA-HOME-1 à CA-HOME-5.

- **T2 — Page Services** *(orientation)*
  Les 3 offres détaillées + appel à l'action vers Contact.
  *Vérifiable par* : CA-SERV-1 à CA-SERV-4.

- **T3 — Page Contact + formulaire (golden path complet)** *(conversion — valeur cœur)*
  Formulaire Nom/Email/Message, validation côté client, honeypot, état de confirmation, gestion de tous les cas d'erreur.
  *Vérifiable par* : CA-CONT-1 à CA-CONT-14. **Golden path (§4) atteint.**

- **T4 — Durcissement non-fonctionnel** *(qualité de recette)*
  Optimisation images, passes accessibilité et contraste, méta SEO par page, mesures Lighthouse.
  *Vérifiable par* : NF-A11Y-*, NF-PERF-*, NF-RESP-*.

- **T5 — Recette finale par le QA et le bêta-testeur** *(validation contrat)*
  Exécution des scénarios dérivés des CA au navigateur, y compris cas d'erreur et honeypot ; vérification que le golden path passe de bout en bout.

---

## 8. Hors périmètre (explicite)

Les éléments suivants sont **volontairement exclus** de cette version. Toute demande de les inclure relève d'une évolution de contrat, pas d'un correctif :

1. **Envoi réel d'email / traitement serveur** du formulaire (aucun backend ; seule la confirmation côté utilisateur est requise).
2. **Stockage ou transmission** des messages saisis (pas de base de données, pas de CRM, pas d'API tierce).
3. **E-commerce** : vente en ligne, panier, paiement, devis chiffré automatique.
4. **Comptes utilisateurs** : inscription, connexion, espace client.
5. **CMS / back-office** : le contenu est en dur dans le code, non éditable par un non-développeur.
6. **Blog, actualités, newsletter, avis clients dynamiques.**
7. **Multilingue / internationalisation** : le site est en français uniquement.
8. **Pages légales complètes** (mentions légales, politique de confidentialité détaillées, bandeau cookies) : hors périmètre car projet témoin fictif sans collecte réelle de données ni cookies non essentiels. À réintroduire pour tout usage réel en production.
9. **Prise de rendez-vous / calendrier / chat en direct.**
10. **Analytics, pixels de suivi, cookies de mesure d'audience.**
11. **Intégration réseaux sociaux dynamique** (flux, boutons de partage traqués).

---

## Annexe — Contenu fictif de référence (pour le Dev, à ne pas prendre pour des données réelles)

> Valeurs **fictives** destinées à peupler les pages. Le Dev peut les affiner tant que le ton et la structure sont respectés. **Ne remplacer par aucune donnée personnelle réelle.**

- **Nom de l'atelier** : Atelier Bréande
- **Localisation** : Lyon
- **Accroche possible (Accueil)** : « Des luminaires façonnés à la main, pensés pour votre lumière. »
- **3 réalisations (exemples de titres)** : « Suspension laiton — appartement haussmannien », « Lampe de table en verre soufflé », « Applique murale sur mesure — boutique ».
- **3 offres (Services)** :
  1. **Création sur mesure** — conception d'un luminaire unique, du croquis à la pose.
  2. **Restauration** — remise en état de luminaires anciens, dans le respect de la pièce.
  3. **Conseil éclairage** — accompagnement (particuliers et architectes d'intérieur) pour composer une ambiance lumineuse cohérente.
- **Email de contact affiché (si mailto utilisé)** : `{{EMAIL_CONTACT_FICTIF}}` (à définir par le Tech Lead, ex. `contact@atelier-breande.fr` — domaine fictif non enregistré).
