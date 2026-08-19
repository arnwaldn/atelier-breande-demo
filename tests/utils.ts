import type { Page } from '@playwright/test';
import type { AxeResults } from 'axe-core';

/**
 * Les quatre pages du site, avec un nom lisible pour les intitulés de test.
 */
export const PAGES = [
  { chemin: '/', nom: 'accueil' },
  { chemin: '/services', nom: 'services' },
  { chemin: '/contact', nom: 'contact' },
  { chemin: '/mentions-legales', nom: 'mentions légales' },
] as const;

/**
 * Attend que toutes les animations CSS / Web Animations de la page soient terminées.
 *
 * Piège mesuré sur le projet voisin « Site web Freelance » : lancer axe-core pendant
 * un fondu trouve des contrastes fantômes — de l'encre saisie EN PLEIN FONDU, absente
 * de toute charte. Ce site a déjà une telle animation : l'ouverture « allumage » du
 * hero sur l'accueil (1,1 s, opacity + filter — voir src/styles/global.css). Toute
 * mesure d'accessibilité doit d'abord attendre l'immobilité, sans quoi elle mesure le
 * hasard de l'ordonnanceur plutôt que la page réelle.
 */
export async function attendreImmobilite(page: Page, delaiMaxMs = 5000): Promise<void> {
  await page.waitForFunction(
    () => {
      const anims = document.getAnimations ? document.getAnimations() : [];
      return anims.every((a) => a.playState === 'finished' || a.playState === 'idle');
    },
    { timeout: delaiMaxMs }
  );
}

/**
 * Politique de sécurité du contenu déclarée dans vercel.json (racine du projet, hors
 * périmètre de ce harnais). Ces en-têtes sont posés par le réseau Vercel en production ;
 * le serveur `astro preview` utilisé localement par ce harnais ne les envoie PAS — c'est
 * un serveur de prévisualisation Astro générique, indifférent au fichier de
 * configuration d'un hébergeur particulier.
 *
 * Conséquence : sans intervention, un test « zéro violation CSP » passerait toujours,
 * pour la mauvaise raison (rien ne fait respecter la politique). On reconstitue donc
 * l'en-tête par interception de route (voir appliquerCSP) pour que la campagne locale
 * exerce réellement la CSP annoncée, plutôt que de faire semblant de la vérifier.
 */
export const CSP_VERCEL =
  "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'; object-src 'none'; frame-src 'none'; media-src 'self'; manifest-src 'self'; worker-src 'none'; upgrade-insecure-requests";

/**
 * Injecte l'en-tête Content-Security-Policy de vercel.json sur la réponse du document
 * principal, pour chaque page visitée ensuite dans ce contexte. Les sous-ressources
 * (scripts, styles, images) ne sont pas interceptées : c'est l'en-tête du document qui
 * gouverne la politique appliquée à la page, exactement comme sur Vercel.
 */
export async function appliquerCSP(page: Page, csp: string = CSP_VERCEL): Promise<void> {
  await page.route('**/*', async (route) => {
    const requete = route.request();
    if (requete.resourceType() !== 'document') {
      await route.continue();
      return;
    }
    const reponse = await route.fetch();
    // route.fetch() rend une APIResponse (contexte requête), pas la Response de
    // navigation : ses en-têtes se lisent avec .headers() (synchrone), pas
    // .allHeaders() (qui n'existe que sur la Response obtenue via page.goto()).
    const entetes = reponse.headers();
    await route.fulfill({
      response: reponse,
      headers: { ...entetes, 'content-security-policy': csp },
    });
  });
}

/**
 * Indique si l'élément actuellement focalisé porte un anneau de focus visible
 * (le site pose une seule règle globale `:focus-visible { outline: ... }` —
 * voir src/styles/global.css). Vérifié via le style calculé plutôt que la pseudo-classe
 * directement : le support de `getComputedStyle(el, ':focus-visible')` est inégal
 * entre moteurs, alors que le style calculé de l'élément réellement focalisé au clavier
 * reflète déjà la règle appliquée par Chromium.
 */
export async function anneauFocusVisible(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    if (!el || el === document.body) return false;
    const style = getComputedStyle(el);
    return style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0;
  });
}

/**
 * Décrit brièvement l'élément actuellement focalisé (balise + id + href/type + texte),
 * pour détecter un piège de focus (même élément revisité) au fil d'un parcours clavier.
 *
 * Le texte visible entre dans la signature : le logo d'en-tête et le lien « Accueil »
 * du menu partagent tous deux href="/" et n'ont pas d'id — sans leur texte, ils
 * seraient pris à tort pour le même élément revisité (piège de focus fantôme).
 */
export async function decrireFocus(page: Page): Promise<string | null> {
  return page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    if (!el || el === document.body) return null;
    const identifiant = el.getAttribute('href') ?? el.getAttribute('type') ?? el.id ?? '';
    const texte = (el.textContent ?? '').trim().slice(0, 40);
    return `${el.tagName.toLowerCase()}#${el.id || ''}[${identifiant}]"${texte}"`;
  });
}

/**
 * Filtre un résultat axe-core en ne gardant que ce qui mérite un échec de test.
 *
 * Ne pas se limiter à `resultats.violations` (impact serious/critical) : vérifié en
 * pratique sur ce site, axe classe certains VRAIS problèmes de contraste en
 * `incomplete` plutôt qu'en `violations` — dès qu'il ne peut pas garantir à 100 % le
 * calcul (bordure semi-transparente, superposition), il rend un verdict prudent plutôt
 * qu'une violation ferme. Un test qui ne lirait que `violations` laisserait passer un
 * texte de contraste quasi nul classé « à vérifier ». On remonte donc aussi les
 * `incomplete` de la règle color-contrast : c'est précisément la règle qui a raté un
 * texte de contraste ~1:1 lors du calibrage de ce harnais.
 *
 * Trois exceptions étroites et documentées, chacune un élément DÉCORATIF précis et
 * REVU, dont la nature (gradient, pseudo-élément) empêche mathématiquement axe de
 * calculer un fond — jamais un signe de bug :
 *  - `.lueur` : halo décoratif (pseudo-élément `::before`, radial-gradient, opacité
 *    ≤ 0,28) posé derrière un titre — « background color could not be determined due
 *    to a pseudo element ».
 *  - `.bg-gradient-to-t` : voile posé sur le hero de l'accueil (from-breande-night...)
 *    au-dessus de la photo, pour garantir la lisibilité du texte — « ... due to a
 *    background gradient ». Le texte du hero porte sa propre couleur calibrée
 *    (breande-paper, 14,9:1 sur le fond nuit — voir global.css).
 *  - `header` (ajouté vague A, chantier « coquille », 2026-08-19) : le filet de
 *    laiton qui scelle l'en-tête au défilement est un pseudo-élément `::after` sur
 *    <header class="entete"> (voir .entete::after, global.css) — même mécanique que
 *    `.lueur`. Pour ce relatedNode précis, axe ne rapporte qu'un sélecteur de balise
 *    nu (`["header"]`, sans classe) : le mot complet, pas `.entete`, est donc la
 *    chaîne qui matche réellement `rn.target` ci-dessous. Le texte des liens de menu
 *    porte sa propre couleur calibrée (breande-paper sur breande-night/nuit-profonde,
 *    largement > 4,5:1 dans les deux états, scellé ou transparent — voir global.css) ;
 *    le site n'a qu'un seul <header>, donc pas de risque de sur-filtrage aujourd'hui —
 *    à resserrer si un jour un second `<header>` apparaît sur une page.
 * Toute AUTRE incertitude de contraste reste bloquante : c'est ce filtre qui a
 * démasqué, lors du calibrage de ce harnais, un texte injecté à un contraste ~1:1 sur
 * une page sans aucun de ces trois éléments.
 */
const CAUSES_CONTRASTE_CONNUES_ET_REVUES = ['.lueur', '.bg-gradient-to-t', 'header'];

export function violationsAxeAExiger(resultats: AxeResults) {
  const violationsGraves = resultats.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical'
  );

  const contrastesIncertains = resultats.incomplete
    .filter((v) => v.id === 'color-contrast')
    .map((v) => ({
      ...v,
      nodes: v.nodes.filter((n) => {
        const causeConnue = n.any.some((c) =>
          (c.relatedNodes ?? []).some((rn) =>
            CAUSES_CONTRASTE_CONNUES_ET_REVUES.some((cause) => JSON.stringify(rn.target).includes(cause))
          )
        );
        return !causeConnue;
      }),
    }))
    .filter((v) => v.nodes.length > 0);

  return [...violationsGraves, ...contrastesIncertains];
}
