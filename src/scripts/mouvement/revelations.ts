/**
 * LE CONTRÔLEUR DE RÉVÉLATION — un seul observateur, des attributs, ~120 lignes.
 *
 * Patron repris du projet frère (maison-vaubrune, fournisseurs L552-650), qui
 * a remplacé là-bas un module de 1 000 lignes. Les garanties, dans l'ordre où
 * elles ont été payées :
 *
 * 1. RIEN N'EST CACHÉ SANS CE SCRIPT. Les états de départ (opacité nulle,
 *    décalage de 12 px) n'existent en CSS que sous `html.mouvement`, classe
 *    que CE module pose. Script bloqué, en échec, jamais arrivé : la page est
 *    complète et lisible. C'est la règle de fer, et la campagne la prouve en
 *    bloquant JavaScript.
 *
 * 2. LA ZONE VISIBLE AU CHARGEMENT NE BOUGE PAS. On marque `data-revele` sur
 *    tout ce qui est DÉJÀ dans la fenêtre, PUIS on pose la classe — les deux
 *    écritures dans la même tâche, donc dans le même recalcul de style. Sans
 *    cet ordre, poser la classe fait basculer à l'invisible ce que le visiteur
 *    est en train de lire, puis le re-révèle une image plus tard : un
 *    clignotement, et un LCP repoussé. C'est le geste le moins évident du
 *    socle du projet frère, et le plus important.
 *
 * 3. LA RÉVÉLATION EST DÉFINITIVE. `unobserve` après passage : un contenu qui
 *    se ré-efface quand on remonte est lu comme un défaut d'affichage.
 *
 * 4. DES ATTRIBUTS, JAMAIS DE STYLES EN LIGNE. La feuille décide de l'effet ;
 *    ce module ne décide que du moment. (Et un `style=` violerait la CSP —
 *    la garde de livrable échouerait.)
 */

const SELECTEUR = '[data-revelation]';
const MARQUE = 'data-revele';

/** Marge basse négative : un bloc ne se révèle qu'une fois REELLEMENT entré,
 *  pas quand son premier pixel effleure le bord. */
const MARGE = '0px 0px -12% 0px';

let observateur: IntersectionObserver | null = null;

function estDansLaFenetre(element: Element): boolean {
  const boite = element.getBoundingClientRect();
  return boite.top < window.innerHeight && boite.bottom > 0;
}

export function demarrerRevelations(): void {
  const racine = document.documentElement;
  const elements = Array.from(document.querySelectorAll(SELECTEUR));

  if (elements.length === 0) {
    // Rien à révéler : la classe n'est pas posée, rien n'est jamais caché.
    return;
  }

  // Garantie n° 2 — l'ordre qui empêche le clignotement : marquer ce qui est
  // déjà à l'écran AVANT de poser la classe d'orchestration, dans la même
  // tâche. Le premier recalcul de style voit donc ces éléments déjà révélés.
  for (const element of elements) {
    if (estDansLaFenetre(element)) {
      element.setAttribute(MARQUE, '');
    }
  }
  racine.classList.add('mouvement');

  observateur = new IntersectionObserver(
    (entrees) => {
      for (const entree of entrees) {
        if (!entree.isIntersecting) continue;
        entree.target.setAttribute(MARQUE, '');
        // Garantie n° 3 — définitif.
        observateur?.unobserve(entree.target);
      }
    },
    { rootMargin: MARGE, threshold: 0.25 }
  );

  for (const element of elements) {
    if (!element.hasAttribute(MARQUE)) {
      observateur.observe(element);
    }
  }
}

/** Démontage — ne sert qu'à la bascule de `prefers-reduced-motion` en cours
 *  de session : chaque navigation est un document neuf (pas de ClientRouter,
 *  décision d'architecture), il n'y a donc jamais de démontage de navigation. */
export function arreterRevelations(): void {
  observateur?.disconnect();
  observateur = null;
  // Tout ce qui n'était pas encore révélé le devient : on n'abandonne jamais
  // un bloc invisible derrière soi.
  for (const element of document.querySelectorAll(SELECTEUR)) {
    element.setAttribute(MARQUE, '');
  }
  document.documentElement.classList.remove('mouvement');
}
