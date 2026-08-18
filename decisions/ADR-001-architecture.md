# ADR-001 — Architecture technique du site vitrine « Atelier Bréande »

- **Statut** : accepté (cadrage Tech Lead, source de vérité pour l'implémentation).
- **Date** : 2026-07-20.
- **Auteur** : persona Tech Lead / Architecte (agence).
- **Amont** : `docs/PRD.md` (contrat produit verrouillé, PM).
- **Aval** : implémenté **exactement** par le persona Senior Dev, recetté par le QA puis le bêta-testeur.
- **Portée** : ce document tranche le « comment » laissé ouvert par le PRD (notamment §5.4). Le Dev n'a pas à me reconsulter : tout choix structurant est figé ci-dessous.

---

## 1. Contexte

Le PRD demande un site vitrine **3 pages** (Accueil `/`, Services `/services`, Contact `/contact`) pour un artisan fictif, avec pour cœur de valeur (« golden path ») un **formulaire de contact validé côté client** qui affiche une **confirmation visible sans quitter la page** — le tout **100 % statique, sans backend, sans appel réseau tiers** (NF-TECH-1/2/3).

Contraintes d'agence imposées : **Astro + Tailwind**. Objectifs de recette mesurables : Lighthouse Perf/A11y/Best-Practices/SEO > 90, accessibilité de base (landmarks, labels, focus, contraste AA), responsive 375 px → ≥ 1280 px.

Environnement vérifié en direct sur le poste (Windows 11, Git Bash, `2026-07-20`) :

| Élément | Valeur constatée | Conséquence |
|---|---|---|
| Node.js | `v24.15.0` | satisfait `astro engines >=22.12.0` |
| npm | `11.12.1` | OK |
| Registry | `https://registry.npmjs.org/` (défaut) | pas de registry interne |
| Proxy npm | `null` (aucun proxy configuré) | flux direct |
| Interception TLS | Avast — `NODE_EXTRA_CA_CERTS=C:\ProgramData\Avast Software\Avast\wscert.pem` | **certificat déjà approuvé**, `strict-ssl=true` reste sûr, le registry est joignable (`npm view` fonctionne) |
| Cache npm | `C:\Users\arnau\AppData\Local\npm-cache` (peuplé) | fallback `--prefer-offline` possible |

**Le « proxy TLS » du poste est donc l'antivirus Avast qui inspecte le HTTPS ; son certificat racine est déjà déclaré à Node via `NODE_EXTRA_CA_CERTS`.** Le réseau registry fonctionne. Le risque résiduel (téléchargement de binaires natifs) est traité au §11.

Versions figées après interrogation du registry :

| Paquet | Version figée | Rôle |
|---|---|---|
| `astro` | `^7.1.1` | framework, build statique |
| `@tailwindcss/vite` | `^4.3.3` | plugin Vite Tailwind v4 (méthode officielle Astro pour Tailwind 4) |
| `tailwindcss` | `^4.3.3` | moteur CSS |
| `@astrojs/check` | `^0.9.9` | `astro check` (vérif types `.astro`) |
| `typescript` | `^5.9.0` | requis par `@astrojs/check` (peer `^5 || ^6`). **Ne pas prendre TS 7.x** (hors peer range → conflit) |

---

## 2. Décision — Stack et versions

- **Framework** : **Astro 7** en mode **statique** (`output: 'static'`, le défaut). Génère du HTML pur, zéro runtime JS imposé, idéal pour Lighthouse Perf/SEO et pour la contrainte « aucun backend ».
- **CSS** : **Tailwind CSS 4** via le **plugin Vite `@tailwindcss/vite`** (approche officielle Tailwind v4, **config CSS-first** avec `@import "tailwindcss";` et bloc `@theme` — **pas** d'ancien `@astrojs/tailwind`, **pas** de `tailwind.config.js`).
- **Aucun framework UI lourd** (pas de React/Vue/Svelte). Le seul JS applicatif est un **script vanilla** pour le formulaire (§6).
- **TypeScript strict** pour les fichiers de données (`src/data/*.ts`) et la config Astro.
- **Images** : **placeholders SVG locaux** servis en `<img>` natif (voir §2.1) — **on n'utilise pas** `astro:assets` / `<Image>`, donc **on ne dépend pas de `sharp`**. Robustesse maximale sur ce poste et Lighthouse parfait (vectoriel, quelques Ko).

Cet ensemble est conforme à la table « Stack défaut » de `CLAUDE.md` (site vitrine → Astro + Tailwind). **Écarts tracés** : (a) pas de shadcn/ui — inutile pour 3 pages sans composants riches, on reste sur Tailwind nu ; (b) déploiement Vercel **différé** — la validation se fait en `build` + `preview` local (conforme au mandat de cette mission). Ces écarts sont des simplifications alignées sur le périmètre témoin, pas des divergences de fond.

### 2.1 Décision images

Les visuels sont **fictifs** (NF-TECH-2). Pour éviter tout appel réseau (NF-TECH-1) et tout binaire natif :

- Le Dev crée des **SVG placeholders** dans `public/images/` : fond dégradé chaud + titre de la pièce en texte, ratio 4:3.
- Rendu via `<img src="/images/…svg" width="…" height="…" alt="…" loading="…">` :
  - **hero** de l'accueil : `loading="eager"` + `fetchpriority="high"` ;
  - réalisations : `loading="lazy"`.
- **`width`/`height` explicites obligatoires** sur chaque `<img>` (évite le CLS, sert Lighthouse Perf — NF-PERF-1/5).
- `alt` descriptif en français pour les images informatives (CA-HOME-4, NF-A11Y-2) ; `alt=""` pour tout visuel purement décoratif.

> Note d'évolution (hors périmètre témoin) : un vrai projet remplacerait ces SVG par des photos réelles optimisées via `astro:assets` `<Image>` (sharp), une fois le poste hors interception ou sharp validé.

---

## 3. Décision — Méthode d'installation (et fallback proxy/offline)

**Méthode primaire retenue : scaffold manuel déterministe** (les fichiers de config ci-dessous sont fournis par le Tech Lead), puis `npm install`. On **n'utilise pas** l'assistant interactif `npm create astro` : le dossier n'est pas vide (`.git/`, `README.md`, `docs/`, `decisions/`), l'assistant poserait des questions et enverrait de la télémétrie — non déterministe. Le scaffold manuel évite ces frictions et garantit des versions épinglées.

Fichiers de config à créer à la racine (contenu exact) :

**`package.json`**
```json
{
  "name": "validation-agence",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  },
  "dependencies": {
    "astro": "^7.1.1",
    "@tailwindcss/vite": "^4.3.3",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.9",
    "typescript": "^5.9.0"
  }
}
```

**`astro.config.mjs`**
```js
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Domaine fictif réservé (.example ne se résout jamais → aucun appel réseau).
export default defineConfig({
  site: 'https://atelier-breande.example',
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**`tsconfig.json`**
```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

**`.env.example`** (convention `CLAUDE.md`, même si aucun secret n'est requis ici)
```
# Aucun secret ni variable d'environnement n'est nécessaire : site 100 % statique, sans backend.
```

Puis :
```bash
npm install
```

**Fallbacks (dans l'ordre) si `npm install` échoue à cause de l'interception TLS ou du réseau :**

1. **Certificat déjà en place** : `NODE_EXTRA_CA_CERTS` pointe sur le cert Avast → normalement aucun `SELF_SIGNED_CERT_IN_CHAIN`. Si l'erreur survient malgré tout, vérifier que la variable est bien exportée dans le shell courant : `echo "$NODE_EXTRA_CA_CERTS"`.
2. **Cache local** : `npm install --prefer-offline` — réutilise les tarballs déjà présents dans le cache npm du poste, limite les téléchargements.
3. **Binaire `sharp`** : il est en `optionalDependencies` d'Astro 7 → **un échec de son build n'interrompt pas l'installation**. On ne l'utilise pas (§2.1), donc aucun impact fonctionnel. Ne pas chercher à le réparer.
4. **Dernier recours (dégradé, à ne pas activer par défaut)** : `npm install --no-audit --no-fund` pour couper les requêtes annexes ; **ne jamais** utiliser `--strict-ssl=false` (contournerait la sécurité TLS).

---

## 4. Décision — Structure du projet (arborescence exacte à créer)

Fichiers **existants** conservés : `.gitignore` (couvre déjà `node_modules/`, `dist/`, `.env*` sauf `.env.example` — **rien à modifier**), `README.md`, `docs/PRD.md`, `decisions/ADR-001-architecture.md` (ce fichier).

Arborescence **cible** (créer tout ce qui n'existe pas) :

```
validation-agence/
├─ .gitignore                    (existant — inchangé)
├─ README.md                     (existant)
├─ .env.example                  (À CRÉER — cf. §3)
├─ package.json                  (À CRÉER — cf. §3)
├─ astro.config.mjs              (À CRÉER — cf. §3)
├─ tsconfig.json                 (À CRÉER — cf. §3)
├─ decisions/
│  └─ ADR-001-architecture.md    (ce fichier)
├─ docs/
│  └─ PRD.md                     (existant)
├─ public/
│  ├─ favicon.svg                (À CRÉER — petit SVG)
│  └─ images/
│     ├─ hero.svg                (À CRÉER — visuel d'ambiance accueil)
│     ├─ realisation-1.svg       (À CRÉER)
│     ├─ realisation-2.svg       (À CRÉER)
│     ├─ realisation-3.svg       (À CRÉER)
│     └─ og-default.svg          (À CRÉER — image Open Graph par défaut)
└─ src/
   ├─ styles/
   │  └─ global.css              (À CRÉER — entrée Tailwind + @theme + base)
   ├─ data/
   │  ├─ realisations.ts         (À CRÉER — 3 réalisations typées)
   │  └─ services.ts             (À CRÉER — 3 offres typées)
   ├─ layouts/
   │  └─ BaseLayout.astro        (À CRÉER — html lang=fr, landmarks, SEO)
   ├─ components/
   │  ├─ SeoHead.astro           (À CRÉER — title/meta/og par page)
   │  ├─ Header.astro            (À CRÉER — <header> + <nav> + état actif)
   │  ├─ Footer.astro            (À CRÉER — nom, Lyon, année)
   │  ├─ RealisationCard.astro   (À CRÉER)
   │  ├─ ServiceCard.astro       (À CRÉER)
   │  └─ ContactForm.astro       (À CRÉER — formulaire + honeypot + script)
   └─ pages/
      ├─ index.astro             (À CRÉER — route /)
      ├─ services.astro          (À CRÉER — route /services)
      └─ contact.astro           (À CRÉER — route /contact)
```

Le routing est **basé fichiers** (Astro) : `src/pages/index.astro` → `/`, `services.astro` → `/services`, `contact.astro` → `/contact`. Aucune erreur 404 possible sur les 3 liens (CA-NAV-2).

---

## 5. Décision — Modèle de contenu (données)

Pas de base de données. Le « modèle de données » se réduit à deux structures typées (contenu **en dur**, NF-CMS exclu) plus le modèle du formulaire.

**`src/data/realisations.ts`**
```ts
export interface Realisation {
  titre: string;
  description: string; // courte, 1 phrase
  image: string;       // chemin public, ex. '/images/realisation-1.svg'
  alt: string;         // texte alternatif descriptif en français
}

export const realisations: Realisation[] = [
  // exactement 3 entrées (CA-HOME-2), contenu fictif inspiré de l'annexe du PRD :
  // « Suspension laiton — appartement haussmannien », « Lampe de table en verre soufflé »,
  // « Applique murale sur mesure — boutique ».
];
```

**`src/data/services.ts`**
```ts
export interface Service {
  titre: string;       // « Création sur mesure » | « Restauration » | « Conseil éclairage »
  description: string; // ce que c'est
  apport: string;      // ce que ça apporte au client (CA-SERV-2)
}

export const services: Service[] = [
  // exactement 3 entrées, dans cet ordre (CA-SERV-1) :
  // Création sur mesure, Restauration, Conseil éclairage.
];
```

**Modèle du formulaire (côté client uniquement)** : trois champs `nom` (texte, non vide), `email` (format valide, cf. §6.2), `message` (≥ 10 caractères), plus un champ piège `website` (honeypot, §6.3). Aucune de ces données n'est stockée ni transmise (NF-TECH-3) : elles ne servent qu'à décider d'afficher ou non la confirmation, puis sont oubliées.

---

## 6. Décision — Architecture du formulaire (le « comment » du §5.4 du PRD)

### 6.1 Choix tranché : interception JavaScript côté client + bascule d'état

Le formulaire est un **`<form>` HTML natif** intercepté par un **script vanilla** (`e.preventDefault()`), qui valide, contrôle le honeypot, puis **remplace le formulaire par un bloc de confirmation** dans la même page. **Aucun appel réseau.**

**Pourquoi ce choix, et pourquoi pas les autres :**

- **Endpoint factice `/api/contact` — ÉCARTÉ.** Une route API Astro exige SSR/adapter (donc un « backend »), ce qui viole NF-TECH-1 et l'esprit « statique, aucun appel réseau ». Le bêta-testeur doit **observer la confirmation sans réseau** : un endpoint est inutile et contre-productif.
- **`mailto:` — ÉCARTÉ.** Il ouvre le client mail du visiteur et le fait **quitter mentalement le site** ; il n'affiche **aucune confirmation in-page**. Le golden path (§4/§7 du PRD, CA-CONT-4/5) exige une confirmation **visible dans la page**. `mailto:` échoue le critère de réussite. (Il reste utilisé **uniquement** en repli `<noscript>`, cf. §6.5.)
- **Interception JS + bascule d'état — RETENU.** C'est la seule option qui : (1) reste 100 % statique, (2) ne fait aucun appel réseau, (3) produit une **confirmation observable au navigateur** par le QA et le bêta-testeur, (4) permet de contrôler intégralement les messages d'erreur **en français** et leur liaison ARIA.

Le script est écrit dans une balise `<script>` **dans `ContactForm.astro`** : Astro l'**extrait et le bundle en module externe hashé** (pas de script inline) — bon pour une future CSP et conforme aux bonnes pratiques.

### 6.2 Stratégie de validation côté client (HTML5 sémantique + JS minimal, zéro framework)

Le `<form>` porte l'attribut **`novalidate`** : on **désactive les bulles natives** du navigateur (messages non maîtrisés, souvent localisés hors de notre contrôle, et **`type="email"` natif accepte `camille@exemple` sans point** — ce qui échouerait CA-CONT-8). Toute la validation est faite en JS pour **maîtriser les messages français** et le câblage ARIA.

Les attributs sémantiques restent présents (accessibilité, SEO, intention) même sous `novalidate` : `type="email"`, `required`, `minlength="10"` sur le message.

Règles de validation (exactes) :

| Champ | Règle JS | Message d'erreur (français) | CA couverts |
|---|---|---|---|
| `nom` | `value.trim().length > 0` | « Le nom est obligatoire. » | CA-CONT-7 |
| `email` | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())` | « L'adresse email n'est pas valide. » | CA-CONT-8, CA-CONT-9 |
| `message` | `value.trim().length >= 10` | « Le message est requis (10 caractères minimum). » | CA-CONT-10 |

La regex email **rejette** `camille`, `camille@`, `camille@exemple` (pas de point), `camille exemple.fr` (espace) et **accepte** `camille@exemple.fr` — exactement les cas de CA-CONT-8/9. Vérifié par construction.

Comportement : à la soumission, on valide **tous** les champs, on affiche/masque chaque erreur, et si au moins un champ est invalide on **bloque** (aucune confirmation) et on **place le focus sur le premier champ fautif** (CA-CONT-6/7/8/10). La correction d'un champ puis un nouvel envoi efface l'erreur et permet le succès (CA-CONT-12).

Squelette du script (le Dev reprend cette logique **telle quelle**) :

```js
const form = document.getElementById('contact-form');
const confirmation = document.getElementById('contact-confirmation');

const regles = {
  nom:     { valide: (v) => v.trim().length > 0,
             message: 'Le nom est obligatoire.' },
  email:   { valide: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
             message: "L'adresse email n'est pas valide." },
  message: { valide: (v) => v.trim().length >= 10,
             message: 'Le message est requis (10 caractères minimum).' },
};

function setErreur(id, actif, texte) {
  const champ = form.querySelector('#' + id);
  const erreur = form.querySelector('#' + id + '-erreur');
  erreur.textContent = actif ? texte : '';
  erreur.hidden = !actif;
  champ.setAttribute('aria-invalid', actif ? 'true' : 'false');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // 1) Honeypot rempli => spam : reset silencieux, AUCUNE confirmation (CA-CONT-11)
  const piege = form.querySelector('#site-web');
  if (piege && piege.value.trim() !== '') {
    form.reset();
    return;
  }

  // 2) Validation champ par champ
  let premierFautif = null;
  for (const id of ['nom', 'email', 'message']) {
    const champ = form.querySelector('#' + id);
    const ok = regles[id].valide(champ.value);
    setErreur(id, !ok, regles[id].message);
    if (!ok && !premierFautif) premierFautif = champ;
  }
  if (premierFautif) { premierFautif.focus(); return; } // bloque (CA-CONT-6/7/8/10)

  // 3) Succès : le formulaire est remplacé par la confirmation (CA-CONT-4/5)
  form.hidden = true;
  confirmation.hidden = false;
  confirmation.focus(); // le bloc porte tabindex="-1" pour recevoir le focus
});
```

> **Sécurité (XSS)** : la confirmation est un **texte statique** ; elle **ne réinjecte jamais** la saisie utilisateur dans le DOM. On utilise exclusivement `textContent` (jamais `innerHTML` / `set:html`) → **aucune surface XSS**. C'est la « validation à la frontière » attendue par la posture sécurité, ici côté client puisqu'il n'y a pas de backend.

### 6.3 Honeypot (implémentation précise)

Champ piège **`website`** (nom appétant pour les robots, jamais présenté à un humain). Il doit être **invisible, non focusable et hors ordre de tabulation** (CA-CONT-3), donc :

- masqué **hors écran** via une classe CSS `.hp-field` (`position:absolute; left:-9999px; width:1px; height:1px; overflow:hidden;`) ;
- **`tabindex="-1"`** sur l'input → retiré de l'ordre de tabulation (garantit CA-CONT-13 : la tabulation ne l'atteint jamais) ;
- **`aria-hidden="true"`** sur le conteneur → retiré de l'arbre d'accessibilité (invisible aux lecteurs d'écran) ;
- **`autocomplete="off"`** → l'autofill du navigateur ne le remplit pas.

HTML exact (dans `ContactForm.astro`, **placé en premier** dans le `<form>`) :
```html
<div class="hp-field" aria-hidden="true">
  <label for="site-web">Ne remplissez pas ce champ</label>
  <input type="text" id="site-web" name="website" tabindex="-1" autocomplete="off" />
</div>
```

Logique : si `website` est non vide à la soumission → traité comme spam → **reset silencieux, aucune confirmation, aucune erreur JS bloquante** (CA-CONT-11). Un humain ne peut pas le remplir ; le QA le teste en le rendant visible via les outils navigateur (retirer `.hp-field` ou éditer le style) puis en le remplissant.

### 6.4 Structure HTML du formulaire (labels + ARIA)

```html
<form id="contact-form" novalidate>
  <!-- honeypot ici (cf. §6.3) -->

  <div class="champ">
    <label for="nom">Nom <span aria-hidden="true">*</span></label>
    <input type="text" id="nom" name="nom" required autocomplete="name"
           aria-describedby="nom-erreur" />
    <p id="nom-erreur" class="erreur" hidden></p>
  </div>

  <div class="champ">
    <label for="email">Email <span aria-hidden="true">*</span></label>
    <input type="email" id="email" name="email" required autocomplete="email"
           aria-describedby="email-erreur" />
    <p id="email-erreur" class="erreur" hidden></p>
  </div>

  <div class="champ">
    <label for="message">Message <span aria-hidden="true">*</span></label>
    <textarea id="message" name="message" required minlength="10" rows="6"
              aria-describedby="message-erreur"></textarea>
    <p id="message-erreur" class="erreur" hidden></p>
  </div>

  <button type="submit">Envoyer</button>
</form>

<div id="contact-confirmation" role="status" aria-live="polite" tabindex="-1" hidden>
  <h2>Merci, votre message a bien été envoyé.</h2>
  <p>Nous vous répondrons rapidement.</p>
</div>
```

Points ARIA (CA-CONT-2/13/14) : chaque champ a un `<label for>` associé ; le champ obligatoire est signalé par `required` **et** l'astérisque visuel ; chaque message d'erreur est lié à son champ par **`aria-describedby`** (CA-CONT-14) ; le bloc de confirmation est une **région live `role="status"` / `aria-live="polite"`** avec `tabindex="-1"` pour recevoir le focus et être annoncé aux lecteurs d'écran.

### 6.5 Repli sans JavaScript

Ajouter un `<noscript>` au-dessus du formulaire indiquant de contacter l'atelier par email, avec un lien `mailto:contact@atelier-breande.fr` (**domaine fictif non enregistré** ; un `mailto:` n'est pas un appel réseau de la page). Sans JS, le formulaire ne peut de toute façon rien faire d'utile sur un site statique ; ce repli est une courtoisie. Le bêta-testeur teste avec un navigateur standard (JS actif).

---

## 7. Décision — Accessibilité de base (transverse)

- **Langue** : `<html lang="fr">` (NF-LANG-2). Tout le contenu visible en français (NF-LANG-1).
- **Landmarks** : `BaseLayout.astro` structure chaque page en `<header>` (contenant `<nav aria-label="Navigation principale">`), `<main id="contenu">` et `<footer>`. Un **lien d'évitement** « Aller au contenu » (`<a class="skip-link" href="#contenu">`) en tête de `<body>`.
- **Titres** : un **seul `<h1>` par page** (NF-A11Y-1), hiérarchie cohérente (`h2` pour les sections : réalisations, offres, etc.).
- **Navigation active** : dans `Header.astro`, comparer `Astro.url.pathname` pour ajouter `aria-current="page"` **et** une classe visuelle `.actif` sur le lien courant (CA-NAV-3).
- **Focus visible** : style global dans `global.css` (CA-NAV-5, CA-CONT-13, NF-A11Y-4) :
  ```css
  :focus-visible { outline: 2px solid var(--color-breande-brass-dark); outline-offset: 2px; }
  ```
- **Labels de formulaire** : cf. §6.4 (NF-A11Y-5).
- **Images** : `alt` pertinent (informatives) ou `alt=""` (décoratives) (NF-A11Y-2).
- **Contraste AA (4,5:1)** : palette de départ ci-dessous **à vérifier en T4** avec un contrôleur de contraste ; le texte courant se pose sur `--color-breande-ink` sur fond `--color-breande-cream` (contraste très élevé). Le texte secondaire (`--color-breande-muted`) et le rouge d'erreur doivent être **validés** ≥ 4,5:1 avant de clore T4 (NF-A11Y-3).
- **Cibles tactiles** : bouton d'envoi et liens dimensionnés confortablement (padding suffisant, ~44 px de hauteur cible) (NF-RESP-3).

Palette recommandée (dans `global.css`, **ajustable** par le Dev / la skill `frontend-design` tant que le contraste AA et le ton « chaleureux, artisanal, haut de gamme » sont tenus) :
```css
@import "tailwindcss";

@theme {
  --color-breande-ink:        #1c1a17; /* texte principal (quasi-noir chaud) */
  --color-breande-cream:      #f7f3ec; /* fond crème */
  --color-breande-brass:      #b08760; /* accent laiton */
  --color-breande-brass-dark: #8a6547; /* accent foncé (focus, liens) */
  --color-breande-muted:      #574e43; /* texte secondaire — À VÉRIFIER AA */
  --color-breande-error:      #9a2f1c; /* erreurs — À VÉRIFIER AA */
  --font-display: Georgia, 'Times New Roman', serif;   /* titres, chaleur artisanale */
  --font-body: system-ui, -apple-system, 'Segoe UI', sans-serif;
}

@layer base {
  :focus-visible { outline: 2px solid var(--color-breande-brass-dark); outline-offset: 2px; }
  .hp-field { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
  .skip-link { position: absolute; left: -9999px; }
  .skip-link:focus { left: 1rem; top: 1rem; position: fixed; z-index: 50; }
}
```

---

## 8. Décision — SEO minimal (par page)

Un composant **`SeoHead.astro`** centralise `<title>`, `<meta name="description">`, canonical et Open Graph, alimenté par des props passées depuis chaque page via `BaseLayout`. Le `site` de `astro.config.mjs` (`https://atelier-breande.example`) sert à construire les URL absolues (canonical + og). NF-PERF-4 (Lighthouse SEO > 90) exige `<title>` unique par page, `meta description`, structure sémantique, `meta viewport`.

Contenu de `SeoHead.astro` (balises à émettre) : `charset`, `meta viewport` (NF-RESP-2), `<title>`, `meta description`, `link canonical`, `og:type=website`, `og:title`, `og:description`, `og:url`, `og:image` (absolue, `/images/og-default.svg`), `og:locale=fr_FR`, `twitter:card=summary_large_image`, `link rel="icon"` (favicon.svg).

Métadonnées **par page** (title unique — NF-PERF-4) :

| Route | `<title>` | `meta description` |
|---|---|---|
| `/` | `Atelier Bréande — Luminaires sur mesure, artisanat lyonnais` | `Atelier Bréande façonne à la main des luminaires sur mesure à Lyon : création, restauration et conseil éclairage.` |
| `/services` | `Nos services — Atelier Bréande` | `Création sur mesure, restauration de luminaires anciens et conseil éclairage pour particuliers et architectes d'intérieur.` |
| `/contact` | `Contact — Atelier Bréande` | `Contactez l'Atelier Bréande à Lyon pour un projet de luminaire sur mesure, une restauration ou un conseil éclairage.` |

---

## 9. Posture sécurité et conformité (synthèse)

- **Validation à la frontière** : côté client (seule frontière existante, pas de backend) — cf. §6.2.
- **Anti-spam** : honeypot (§6.3). Suffisant pour le périmètre (pas de soumission serveur à protéger).
- **Pas d'XSS** : aucune réinjection de saisie dans le DOM, `textContent` uniquement (§6.2).
- **Pas de secrets** : aucune variable d'environnement, aucune clé (NF-TECH-1/3). `.env.example` vide par convention. `.gitignore` couvre déjà `.env*`.
- **Pas d'authz** : site public, aucun rôle, aucune donnée protégée.
- **CSP-friendly** : Astro externalise le `<script>` (pas d'inline).
- **RGPD** : **aucune obligation déclenchée pour ce témoin** — pas de cookie, pas d'analytics, pas de collecte/stockage/transmission de données (NF-TECH-3), données artisan **fictives** (NF-TECH-2). Conforme au hors-périmètre §8.8 du PRD. **Rappel pour un déploiement réel** (hors périmètre) : un formulaire traitant de vrais emails collecterait des données personnelles → il faudrait alors mentions légales, politique de confidentialité et information sur le traitement.

---

## 10. Plan d'implémentation par tranches (pour le Senior Dev)

Reprend l'ordre du PRD §7 (valeur décroissante), mappé sur les fichiers et un critère de « fait » testable indépendamment.

| Tranche | Fichiers à produire | « Fait » quand… |
|---|---|---|
| **T0 — Ossature & design system** | `package.json`, `astro.config.mjs`, `tsconfig.json`, `.env.example`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/{SeoHead,Header,Footer}.astro`, 3 pages vides `src/pages/{index,services,contact}.astro` | `npm run dev` sert les 3 routes sans 404 ; en-tête/pied présents sur les 3 ; `lang="fr"` ; nav clavier avec focus visible et lien actif distingué. Couvre **CA-NAV-1→5, NF-LANG-2, NF-RESP-2**. |
| **T1 — Accueil** | `src/data/realisations.ts`, `src/components/RealisationCard.astro`, `public/images/{hero,realisation-1..3}.svg`, corps de `index.astro` | Proposition de valeur + hero + **exactement 3 réalisations** (visuel + titre + description + `alt`) + CTA vers Contact ; empilement propre à 375 px. Couvre **CA-HOME-1→5**. |
| **T2 — Services** | `src/data/services.ts`, `src/components/ServiceCard.astro`, corps de `services.astro` | **Exactement 3 offres** (titre + description + apport) dans l'ordre imposé + CTA vers Contact ; responsive. Couvre **CA-SERV-1→4**. |
| **T3 — Contact (golden path)** | `src/components/ContactForm.astro` (form + honeypot + script), corps de `contact.astro` | Formulaire Nom/Email/Message + honeypot ; validation FR ; **confirmation visible** au succès ; tous les cas d'erreur ; honeypot rejette. **Golden path atteint.** Couvre **CA-CONT-1→14**. |
| **T4 — Durcissement non-fonctionnel** | ajustements CSS/SEO/images (pas de nouveau fichier majeur) | Contrastes AA vérifiés ; `SeoHead` renseigné par page ; images dimensionnées ; **Lighthouse Perf/A11y/Best-Practices/SEO > 90**. Couvre **NF-A11Y-\*, NF-PERF-\*, NF-RESP-\***. |
| **T5 — Recette QA + bêta** | (aucun code applicatif) | Scénarios dérivés des CA exécutés au navigateur, honeypot et cas d'erreur inclus ; golden path vert de bout en bout. |

---

## 11. Risques & mitigations

| # | Risque | Impact | Mitigation |
|---|---|---|---|
| **R1** | **Interception TLS Avast** casse `npm install` (certificat non reconnu). | Bloquant (pas d'install). | **Déjà mitigé** : `NODE_EXTRA_CA_CERTS` pointe sur le cert Avast, registry joignable (vérifié). Fallbacks §3 : vérifier la variable dans le shell, `--prefer-offline` (cache présent), **ne jamais** désactiver `strict-ssl`. |
| **R2** | Échec du binaire natif **`sharp`** derrière l'interception. | Aucun (isolé). | `sharp` est en `optionalDependencies` d'Astro 7 → `npm install` **n'échoue pas**. On ne l'utilise pas (images SVG en `<img>`, §2.1). Ne pas tenter de le réparer. |
| **R3** | **`type="email"` natif** trop permissif (`camille@exemple` accepté) → CA-CONT-8 échouerait avec la validation native. | Golden path faussé. | `novalidate` + **regex JS** exigeant un point dans le domaine (§6.2). Cas de test CA-CONT-8/9 couverts par construction. |
| **R4** | **Honeypot** mal masqué → soit visible/focusable pour un humain (échec CA-CONT-3/13), soit non lisible par le JS. | A11y + anti-spam KO. | Masquage **hors écran** (`.hp-field`) + `tabindex="-1"` + `aria-hidden` + `autocomplete="off"` (§6.3). **Pas** de `display:none` requis : le champ reste dans le DOM, le JS lit `.value`. La tabulation ne l'atteint jamais. |
| **R5** | **Lighthouse < 90** (perf/a11y) à cause d'images lourdes, CLS, ou contraste insuffisant. | Recette T4 KO. | Images **SVG** légères + `width`/`height` explicites + `loading` adapté ; palette à contraste élevé, contrastes secondaires **vérifiés en T4** ; JS minimal externalisé (§2.1, §7, §8). |

---

## 11bis. Amendement post-audit sécurité (2026-07-20)

**Constat du security-reviewer sur le build réel** : contrairement à ce qu'affirmaient les §6.1 et §9, Astro **inline** le script du formulaire dans `dist/contact/index.html` (optimisation par défaut des petits scripts) — il n'y a **aucun module externe hashé** dans `dist/`. La promesse « CSP-friendly avec `script-src 'self'` » était donc inexacte : une telle CSP **bloquerait le script inline et casserait le golden path silencieusement**.

**Correction actée (honnêteté documentaire, adaptée au périmètre témoin)** : le script est inliné par le build ; toute CSP future devra utiliser un hash `sha256` du bloc inline (ou un nonce, ou configurer Astro pour ne pas inliner), plus `default-src 'self'; object-src 'none'; base-uri 'none'`. Les mentions « module externe hashé » (§6.1) et « CSP-friendly : Astro externalise » (§9) sont réputées **remplacées** par le présent amendement. Aucune CSP n'étant déployée pour ce témoin, l'écart n'était pas exploitable.

---

## 11ter. Amendement post-audit des promesses (2026-07-31)

**Constat** : ce site est devenu la démonstration publique de l'offre « site vitrine » (`atelier-breande-demo.vercel.app`), alors qu'il avait été conçu comme témoin interne. Or son formulaire n'a **ni `action` ni `method`** : au terme de la validation, il affichait « Merci, votre message a bien été envoyé. » sans qu'aucun message ne soit transmis. Sur la vitrine d'un prestataire, ce **faux succès** est indéfendable : le visiteur croit avoir écrit à l'atelier, et le même écran laisse penser que les formulaires livrés se comportent ainsi.

**Décision : désactivation assumée, pas de branchement d'envoi.** Brancher ce formulaire public sur une boîte réelle ouvrirait une porte à spam et créerait la confusion entre un site fictif et un contact professionnel. Le formulaire reste donc **sans destinataire**, et le dit :

- la confirmation d'envoi est **supprimée du DOM** — aucun message de succès n'existe plus dans la page ;
- à la place, une saisie valide révèle l'état : « Formulaire de démonstration — l'envoi est volontairement désactivé sur ce site fictif. Sur un site livré, la délivrance des messages est vérifiée avant la remise. » ;
- une mention discrète est visible **avant** le clic, sous le titre du formulaire, et le bouton d'envoi la référence par `aria-describedby` (annoncée aux lecteurs d'écran au moment du geste) ;
- le formulaire n'est plus masqué après soumission : il reste réutilisable, rien n'est mis en scène ;
- le repli `<noscript>` n'invite plus à écrire à `contact@atelier-breande.fr` : l'adresse est fictive, le lien `mailto:` menait dans le vide.

**Portée sur les critères d'origine** : `CA-CONT-4` et `CA-CONT-5` du PRD (« confirmation d'envoi visible dans la page ») sont réputés **remplacés** par le présent amendement — l'état affiché prend leur place. Tout le reste du parcours est intact : validation champ par champ, messages français, focus sur le premier champ fautif, honeypot silencieux, câblage ARIA (`CA-CONT-1/2/3/6` à `CA-CONT-14`). La valeur de démonstration est préservée : c'est bien la qualité de la validation qui s'observe, sans mentir sur la délivrance.

## 12. Conséquences

- **Positives** : pile minimale et robuste sur ce poste (aucun binaire natif requis, réseau registry validé) ; golden path **entièrement observable au navigateur sans réseau** (attendu du bêta-testeur) ; implémentation **déterministe** (versions figées, fichiers de config fournis) ; accessibilité et SEO cadrés par des composants transverses ; aucune surface backend/secret/RGPD à gérer pour le témoin.
- **Négatives / dettes acceptées** : sans JS, le formulaire n'a qu'un repli `mailto` (acceptable pour un témoin) ; les visuels sont des placeholders SVG (un vrai projet passerait à `astro:assets` + photos) ; déploiement Vercel non couvert par cette mission (build/preview local suffisent) ; la palette exacte reste à valider en contraste AA (T4).
- **Prochaine étape** : le Senior Dev exécute la **T0** (§10) en suivant les fichiers de config du §3, sans reconsulter le Tech Lead. Toute déviation structurante (autre lib, ajout de backend, changement de méthode de formulaire) nécessiterait un **ADR-002**.
```
