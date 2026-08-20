/*
 * L'échelle des kelvins — la marge active.
 *
 * Affiche la température de lumière de la section actuellement au centre de
 * l'écran, PAR PALIERS (jamais interpolée en continu — cohérent avec
 * --part-de-jour, fixé par section dans global.css). Repose sur les sections
 * qui portent l'attribut data-jour (posé par le composant Bandeau).
 *
 * Tant qu'aucune section data-jour n'est présente sur la page (pages non
 * encore construites avec Bandeau), l'échelle reste sur son état de départ —
 * ce n'est pas une erreur, c'est le comportement attendu.
 *
 * Fichier séparé : voir la même justification que src/scripts/en-tete.ts.
 */
const PALIERS_CONNUS = new Set(['1', '2', '3', '4', '5']);

const echelle = document.querySelector<HTMLElement>('[data-echelle-kelvins]');
const valeurEl = document.querySelector<HTMLElement>('[data-echelle-valeur]');
const sections = document.querySelectorAll<HTMLElement>('[data-jour]');

const LIBELLES: Record<string, string> = {
  '1': '5 000 K',
  '2': '4 000 K',
  '3': '3 000 K',
  '4': '2 700 K',
  '5': '2 200 K',
};

/*
 * La marge active affiche la temperature du palier gouvernant. Elle portait
 * jusqu'au 20/08/2026 un cas particulier : la section de la piece que l'on
 * regle contenait sa propre molette, avec sa propre valeur reglable, et deux
 * temperatures affichees a la fois etait un defaut releve au beta-test du
 * 19/08 — la marge s'effacait donc devant elle. La scene et sa molette sont
 * deposees : il n'y a plus qu'un seul afficheur de temperature sur la page,
 * et le cas particulier disparait avec lui.
 */

function appliquerPalier(palier: string) {
  if (!echelle || !valeurEl || !PALIERS_CONNUS.has(palier)) return;
  if (echelle.getAttribute('data-palier') === palier) return;
  echelle.setAttribute('data-palier', palier);
  valeurEl.textContent = LIBELLES[palier];
}

/*
 * REECRIT LE 20/08/2026 — l'echelle MENTAIT, et c'est le seul organe qui
 * matérialise le concept fondateur de l'ADR-002 (« le jour s'en va pendant
 * qu'on descend »).
 *
 * Releve du directeur artistique en defilement continu, en production :
 * 4 remontees d'affichage sur l'accueil, 6 sur /services, 7 sur /latelier. Et
 * pire qu'un scintillement : sur /services, de y=490 a y=1737 elle affichait
 * 5 000 K alors que la section gouvernante disait 4 000 K — 1 250 px de valeur
 * fausse. La valeur dependait meme du CHEMIN : 3 000 K au meme scrollY apres un
 * defilement pas-a-pas, 4 000 K apres un saut direct.
 *
 * CAUSE : le callback d'IntersectionObserver ne recoit que les sections qui
 * viennent de FRANCHIR un seuil, jamais l'ensemble des sections visibles. Entre
 * deux franchissements — soit des milliers de pixels sur des sections de 2 000 px
 * — rien n'etait recalcule, et la derniere section a avoir franchi un seuil
 * pouvait etre celle qui SORT de l'ecran. --part-de-jour, lui, etait monotone :
 * ce n'etait pas le systeme qui etait faux, c'etait son afficheur.
 *
 * PARADE : on balaie TOUTES les sections, une fois par frame au plus, et
 * seulement quand la position a bouge. L'observateur ne sert plus qu'a savoir
 * s'il y a lieu de travailler. Cout : une lecture de geometrie par section
 * visible et par frame de defilement (moins de dix sections par page), jamais
 * quand la page est immobile.
 *
 * Ce fichier reste AUTONOME, hors de la couche de mouvement : l'echelle doit
 * afficher juste meme sous prefers-reduced-motion, ou aucune animation ne
 * tourne.
 */
function sectionGouvernante(): string | null {
  const milieu = window.innerHeight / 2;
  let palier: string | null = null;
  let plusProche = Infinity;
  for (const section of sections) {
    const r = section.getBoundingClientRect();
    if (r.bottom <= 0 || r.top >= window.innerHeight) continue; // hors champ
    const p = section.getAttribute('data-jour');
    if (!p) continue;
    const distance = Math.abs(r.top + r.height / 2 - milieu);
    if (distance < plusProche) {
      plusProche = distance;
      palier = p;
    }
  }
  return palier;
}

if (echelle && sections.length > 0) {
  let derniereY = -1;
  let planifie = false;

  const recalculer = () => {
    planifie = false;
    derniereY = window.scrollY;
    const palier = sectionGouvernante();
    if (palier) appliquerPalier(palier);
  };

  const auDefilement = () => {
    if (planifie || window.scrollY === derniereY) return;
    planifie = true;
    requestAnimationFrame(recalculer);
  };

  window.addEventListener('scroll', auDefilement, { passive: true });
  window.addEventListener('resize', auDefilement, { passive: true });
  recalculer(); // etat juste des le premier rendu, sans attendre un geste
}
