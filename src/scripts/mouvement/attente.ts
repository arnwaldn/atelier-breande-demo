/**
 * LES QUATRE ATTENTES — les primitives de report de la couche V3 (ADR-006).
 *
 * POURQUOI CE MODULE EXISTE. L'audit du 11/08/2026 a mesuré la page d'accueil
 * à 56 en performance mobile, contre 100 sans la couche V3. Le coupable n'est
 * pas le rendu de la scène — le navigateur de mesure REFUSE WebGL et ne monte
 * donc aucune scène — c'est le simple fait de TÉLÉCHARGER ET D'ÉVALUER le
 * fragment du socle : 717 Ko de bibliothèque, 2,6 s de fil principal sur un
 * téléphone bridé, pendant que le visiteur attend son premier écran.
 *
 * La correction ne porte donc pas sur ce que la scène COÛTE À JOUER, mais sur
 * le MOMENT où elle entre dans la page. Ce module ne contient que cela : la
 * grammaire de l'attente, sans une ligne de 3D, dans le fragment de
 * l'aiguilleur — quelques centaines d'octets, jamais un module de plus à
 * télécharger.
 *
 * TROIS PROPRIÉTÉS TENUES ICI :
 *
 * 1. AUCUNE ATTENTE N'EST INFINIE. Chaque primitive a son échappatoire :
 *    `load` peut être déjà passé, `requestIdleCallback` peut ne pas exister,
 *    `IntersectionObserver` peut manquer. Dans les trois cas on rend la main
 *    immédiatement plutôt que de laisser une promesse pendante — une scène qui
 *    n'arrive jamais serait un défaut bien pire que celui qu'on corrige.
 * 2. RIEN N'EST CACHÉ EN ATTENDANT. Ces fonctions ne touchent NI au document,
 *    NI au style. L'état d'attente du site est l'affiche de repli du § I.11,
 *    qui est déjà peinte et qui est le DÉFAUT, pas le secours.
 * 3. ON REND LA MAIN POUR DE BON. `rendreLaMain()` cède au fil principal par
 *    `scheduler.yield()` quand il existe — la seule primitive qui replace la
 *    suite APRÈS le rendu et APRÈS les entrées en attente — et retombe sur une
 *    minuterie à zéro milliseconde ailleurs.
 */

/* `scheduler.yield()` n'est pas encore dans les définitions de TypeScript. */
interface OrdonnanceurAvecCession {
  yield?: () => Promise<void>;
}

/**
 * Résout quand le document a fini de charger — ressources comprises.
 *
 * `load` et non `DOMContentLoaded` : le second se déclenche alors que les
 * images et les fontes sont encore en vol, c'est-à-dire au moment précis où
 * le fil principal est le plus disputé. Un fragment de 717 Ko demandé là
 * retarde exactement ce que le visiteur regarde.
 */
export function quandLaPageEstChargee(): Promise<void> {
  if (document.readyState === 'complete') return Promise.resolve();
  return new Promise((resoudre) => {
    window.addEventListener('load', () => resoudre(), { once: true });
  });
}

/**
 * Résout au premier moment d'inactivité du fil principal.
 *
 * Le délai maximal est une SÉCURITÉ, pas un réglage de confort : sur une page
 * qui n'est jamais tout à fait au repos (une animation continue, un onglet
 * ralenti), `requestIdleCallback` peut ne jamais être servi. Passé ce délai,
 * le navigateur l'appelle quand même — c'est la sémantique de son option
 * `timeout`, et le repli la reproduit à la main.
 */
export function quandLeFilEstLibre(delaiMaximalMs = 2000): Promise<void> {
  return new Promise((resoudre) => {
    const auRepos = window.requestIdleCallback;
    if (typeof auRepos === 'function') {
      auRepos(() => resoudre(), { timeout: delaiMaximalMs });
      return;
    }
    /* Safari n'a `requestIdleCallback` que depuis la version 18.5 ; le repli
       doit donc rester une vraie voie, pas une politesse. Une minuterie courte
       après `load` place la suite dans une tâche distincte — c'est tout ce
       qu'on cherche : ne pas partager la tâche du chargement. */
    window.setTimeout(() => resoudre(), 1);
  });
}

/**
 * Résout quand l'élément approche du champ de vision.
 *
 * `marge` est passée telle quelle à `rootMargin` : elle décrit la distance à
 * laquelle on considère que le visiteur est sur le point de voir l'élément.
 * Généreuse par construction — mieux vaut charger un peu tôt et arriver en
 * fondu que charger tard et se faire voir en train d'arriver.
 *
 * SANS `IntersectionObserver`, ON NE FAIT PAS ATTENDRE. Le repli résout tout
 * de suite : sur un navigateur qui n'a pas l'observateur, la seule chose pire
 * qu'une scène en avance est une scène absente.
 */
export function quandLHoteApproche(
  hote: Element,
  marge = '320px',
): Promise<void> {
  if (typeof IntersectionObserver !== 'function') return Promise.resolve();

  return new Promise((resoudre) => {
    const observateur = new IntersectionObserver(
      (entrees) => {
        if (!entrees.some((entree) => entree.isIntersecting)) return;
        observateur.disconnect();
        resoudre();
      },
      { rootMargin: marge },
    );
    observateur.observe(hote);
  });
}

/**
 * LES GESTES QUI DISENT « JE SUIS LÀ ».
 *
 * Volontairement larges, et tous PASSIFS : on observe, on n'intercepte rien.
 * Le défilement est le premier de la liste parce que c'est, de très loin, le
 * premier geste d'une visite sur téléphone.
 */
const SIGNES_DE_PRESENCE = [
  'scroll',
  'touchstart',
  'pointerdown',
  'wheel',
  'keydown',
] as const;

/**
 * Résout au premier signe que le visiteur est vraiment là.
 *
 * POURQUOI CETTE ATTENTE EXISTE, ET POURQUOI ELLE NE VAUT QUE SUR ÉCRAN
 * ÉTROIT (ADR-006). Sur trois pages, la bande partage le premier écran d'un
 * téléphone — c'est une décision de mise en page assumée le 03/08 (« les
 * scènes en évidence, en haut »). La proximité ne peut donc rien y écarter :
 * la bande est là dès la première image. Or facturer 717 Ko de bibliothèque à
 * quelqu'un qui n'a pas encore bougé — et qui repartira peut-être sans avoir
 * rien touché — est une dépense qu'on ne peut pas justifier sur un forfait
 * mobile, pour un ornement.
 *
 * Le seuil est donc un GESTE, pas une minuterie : la scène arrive au premier
 * défilement, c'est-à-dire dans la seconde d'une visite réelle, et jamais
 * pour une visite qui n'a pas eu lieu. Sur grand écran, où la scène EST le
 * fond du hero et où elle se regarde sans qu'on ait à bouger, cette attente
 * ne s'applique pas.
 *
 * UNE PAGE DÉJÀ DÉFILÉE COMPTE COMME UN GESTE : retour par le cache de
 * navigation, lien vers une ancre, restauration de session — dans ces trois
 * cas le visiteur est manifestement au travail, et il serait absurde de lui
 * demander un geste de plus.
 */
export function quandLeVisiteurSeManifeste(): Promise<void> {
  if (window.scrollY > 0) return Promise.resolve();

  return new Promise((resoudre) => {
    const options = { once: true, passive: true } as const;
    const retirer = (): void => {
      for (const signe of SIGNES_DE_PRESENCE) {
        window.removeEventListener(signe, surGeste);
      }
    };
    function surGeste(): void {
      retirer();
      resoudre();
    }
    for (const signe of SIGNES_DE_PRESENCE) {
      window.addEventListener(signe, surGeste, options);
    }
  });
}

/**
 * L'ÉVÉNEMENT ÉMIS PAR `revelations.ts` QUAND LE HERO A FINI DE S'OUVRIR
 * (A1, 17/08). Chaîne en clair, pas une constante importée : coupler ce
 * fragment léger au module d'orchestration — GSAP, ScrollTrigger, SplitText
 * — pour une seule chaîne de caractères irait contre la raison d'être de ce
 * fichier. Même convention que `[convention historique du portfolio]` entre `preloader.ts` et
 * `revelations.ts`.
 */
const EVENEMENT_OUVERTURE_FINIE = 'breande-ouverture-finie';

/**
 * Résout quand le hero a fini de s'ouvrir — tout de suite s'il n'y en a pas.
 *
 * POURQUOI CETTE ATTENTE EXISTE (ADR-006, correctif A1 du 17/08). L'éclaireur
 * 3D a mesuré 1 263 ms de tâche longue sur le fil principal en première
 * visite : le montage de la scène — le plus gros fragment du site — partait
 * PENDANT que le nom du hero achevait sa levée, et les deux se disputaient le
 * même fil. Le nom restait figé 671 ms, et le fondu d'arrivée du canevas
 * (0,45 s, voir `socle.ts`) ne jouait jamais parce que la première image de
 * la scène arrivait déjà en retard sur son propre budget.
 *
 * SEULE LA PAGE D'ACCUEIL A UN HERO. Sur les cinq bandes, ce sélecteur ne
 * trouve rien : la promesse se résout immédiatement, et le comportement de
 * ces pages n'est pas affecté — exactement la garantie n° 1 de ce module,
 * appliquée à une cinquième primitive.
 *
 * AUCUNE ATTENTE N'EST INFINIE (garantie n° 1 de l'en-tête). Un délai de
 * secours borne cette promesse même si l'événement n'arrivait jamais :
 * `revelations.ts` l'émet lui-même en repli depuis son propre filet de
 * sécurité (6 000 ms), mais si CE module n'a jamais fini de s'évaluer —
 * fragment en échec, exception avant le premier `addEventListener` — rien
 * d'autre ne le ferait. Le délai par défaut reste large : la séquence
 * d'ouverture la plus longue se referme à 1,36 s, marge du préchargeur
 * comprise ; 3 s ne se déclenche donc jamais en usage normal.
 *
 * L'ÉVÉNEMENT A PU DÉJÀ AVOIR LIEU AVANT QUE CETTE FONCTION NE SOIT
 * APPELÉE — défaut bloquant relevé à l'épreuve (campagne Playwright du
 * 17/08), pas supposé. Sur écran étroit, `lancerLaSceneQuandLHeureEstVenue()`
 * attend d'abord `quandLeVisiteurSeManifeste()` : cette fonction-ci n'est
 * donc appelée qu'APRÈS le premier geste du visiteur, alors que l'ouverture
 * du hero, elle, démarre dès le chargement et se termine typiquement en
 * une seconde et demie. Un visiteur qui gestue tard trouvait l'événement
 * déjà PARTI, et l'attente retombait systématiquement sur son délai de
 * secours — un ralentissement réel, mesuré sur la campagne elle-même.
 * `document.documentElement.dataset.ouvertureFinie` est l'attestation
 * SYNCHRONE que `revelations.ts` pose avant l'événement : on la
 * consulte D'ABORD, avant de poser le moindre écouteur. */
export function quandLOuvertureEstFinie(delaiSecoursMs = 3000): Promise<void> {
  if (document.querySelector('[data-hero]') === null) {
    return Promise.resolve();
  }
  if (document.documentElement.dataset.ouvertureFinie === 'oui') {
    return Promise.resolve();
  }

  return new Promise((resoudre) => {
    let regle = false;
    const finir = (): void => {
      if (regle) return;
      regle = true;
      window.removeEventListener(EVENEMENT_OUVERTURE_FINIE, finir);
      window.clearTimeout(minuterie);
      resoudre();
    };
    window.addEventListener(EVENEMENT_OUVERTURE_FINIE, finir, { once: true });
    const minuterie = window.setTimeout(finir, delaiSecoursMs);
  });
}

/**
 * Rend la main au fil principal, puis reprend.
 *
 * C'EST LA PRIMITIVE QUI TUE LE GEL. Un montage de scène en une seule tâche
 * de 1,6 s est une page morte pendant 1,6 s : ni défilement, ni clic, ni
 * rendu. Le même travail découpé en tranches de quelques dizaines de
 * millisecondes coûte exactement autant de processeur et ne se remarque plus —
 * et il ne compte plus dans le temps de blocage total, qui ne retient d'une
 * tâche que ce qui dépasse cinquante millisecondes.
 *
 * `scheduler.yield()` est préféré parce qu'il est le seul à replacer la suite
 * en TÊTE de la file des tâches différées : le montage reprend dès que le
 * navigateur a repeint, sans passer derrière tout ce qui traînait.
 */
export function rendreLaMain(): Promise<void> {
  const ordonnanceur = (
    window as Window & { scheduler?: OrdonnanceurAvecCession }
  ).scheduler;
  if (typeof ordonnanceur?.yield === 'function') {
    return ordonnanceur.yield().catch(() => undefined);
  }
  return new Promise((resoudre) => {
    window.setTimeout(() => resoudre(), 0);
  });
}
