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
 * C9 (recette DA du 19/08) : la section qui héberge la pièce que l'on règle
 * (BandeScene, [data-scene]) porte data-jour="5" comme le reste de l'arc —
 * cohérent pour la teinte de la page. Mais la molette qu'elle contient a sa
 * propre valeur, RÉGLABLE par le visiteur (voir molette.ts) : dès qu'il la
 * touche, elle diverge de la valeur générique du palier, et deux kelvins
 * affichés à la fois est le défaut relevé au chantier bêta du 19/08
 * (finition importante 8). Tant que cette section gouverne la marge active,
 * ce n'est donc plus À ELLE d'afficher une valeur — la molette est juste à
 * côté et porte la sienne : la marge s'efface plutôt que d'en réafficher
 * une seconde, potentiellement fausse (voir .echelle-kelvins--efface,
 * global.css).
 */
const CLASSE_EFFACE = 'echelle-kelvins--efface';

function appliquerPalier(palier: string, estScene: boolean) {
  if (!echelle || !valeurEl || !PALIERS_CONNUS.has(palier)) return;
  echelle.setAttribute('data-palier', palier);
  echelle.classList.toggle(CLASSE_EFFACE, estScene);
  // Texte mis à jour même caché : au retour de la fenêtre sur la section
  // gouvernée par ce palier, la valeur doit déjà être la bonne AVANT que la
  // transition d'opacité ne la révèle — jamais un flash de l'ancien texte.
  if (!estScene) valeurEl.textContent = LIBELLES[palier];
}

if (echelle && sections.length > 0 && 'IntersectionObserver' in window) {
  const observateur = new IntersectionObserver(
    (entrees) => {
      // La section la plus proche du centre du viewport gouverne la valeur
      // affichée : plusieurs sections peuvent être partiellement visibles à
      // la fois, une seule doit gouverner l'échelle à un instant donné.
      let meilleure: { palier: string; distance: number; estScene: boolean } | null = null;
      for (const entree of entrees) {
        if (!entree.isIntersecting) continue;
        const palier = entree.target.getAttribute('data-jour');
        if (!palier) continue;
        const centre = entree.boundingClientRect.top + entree.boundingClientRect.height / 2;
        const distance = Math.abs(centre - window.innerHeight / 2);
        if (!meilleure || distance < meilleure.distance) {
          const estScene = entree.target.querySelector('[data-scene]') !== null;
          meilleure = { palier, distance, estScene };
        }
      }
      if (meilleure) appliquerPalier(meilleure.palier, meilleure.estScene);
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] }
  );
  sections.forEach((section) => observateur.observe(section));
}
