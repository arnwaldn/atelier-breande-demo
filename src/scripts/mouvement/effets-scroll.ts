/**
 * LES EFFETS DE DÉFILEMENT SCRUBBÉS — un fichier séparé du socle parce que ce
 * n'est pas un mécanisme transverse (comme les révélations ou la variable du
 * jour) : c'est une collection d'effets propres chacun à une section, qui
 * grossira avec le temps. Le premier : le ruban des gestes de l'accueil.
 *
 * gsap et ScrollTrigger viennent TOUJOURS de socle.ts, jamais du paquet —
 * c'est lui le fournisseur unique (voir son en-tête). demarrerEffetsScroll()
 * est appelée depuis l'INTÉRIEUR du surMouvement() de socle.ts : sous
 * mouvement réduit, ce fichier n'est jamais atteint, donc jamais un
 * déclencheur n'y est créé — pas de garde à répéter ici.
 *
 * PAS DE PIN SCROLLTRIGGER. La fenêtre du ruban est en position: sticky pur
 * CSS (voir .ruban-gestes__fenetre dans global.css, sous html.js) : le pin de
 * ScrollTrigger pose un wrapper qui a coûté des défauts de CLS sur le projet
 * frère. Le déclencheur ne fait ici que LIRE la progression du défilement
 * entre le haut et le bas de la section (start: 'top top', end: 'bottom
 * bottom') — cette plage colle exactement à la hauteur réservée en CSS
 * (height: calc(340svh + 500px), le « + 500px » est le palier d'entrée du
 * bloquant 3, voir SEUIL_PALIER_PX plus bas), donc la translation calculée
 * finit pile quand la fenêtre se dépingle. La mise en page ne dépend jamais
 * de ce fichier.
 *
 * AUCUNE LECTURE DE GÉOMÉTRIE DANS onUpdate. Tout ce qui varie au fil du
 * scrub (position et largeur des panneaux, largeur de la fenêtre) est mesuré
 * une fois par rafraîchissement (mesurer(), voir plus bas) et mis en cache :
 * lire offsetLeft/clientWidth juste après avoir écrit un style force une
 * remise à plat synchrone de la mise en page (reflow) à chaque frame de
 * défilement — un des pièges recensés par gsap-performance.
 */

import { ScrollTrigger, defilerVers } from './socle';

/**
 * QUATRE AUTRES GESTES, un par page (lot du 19/08 — référence qiqiglobal.com,
 * un seul grand geste par page, sobriété autour — le ruban ci-dessus reste
 * le seul de l'accueil, aucune autre page n'en reçoit). Chacun sa fonction,
 * chacun son (ou ses) sélecteur(s), le même principe que le ruban : jamais
 * une lecture de géométrie dans onUpdate, jamais un attribut style="".
 */

const SELECTEUR_SECTION = '[data-ruban]';
const SELECTEUR_FENETRE = '[data-ruban-fenetre]';
const SELECTEUR_PISTE = '[data-ruban-piste]';
const SELECTEUR_IMAGE = '[data-ruban-image]';
const SELECTEUR_PANNEAU = '.ruban-gestes__panneau';
const SELECTEUR_LEGENDE = '[data-ruban-legende]';
const SELECTEUR_ETIQUETTE_KELVIN = '[data-echelle-valeur]';
const SELECTEUR_ENTETE = '[data-entete]';
const SELECTEUR_REPERE = '[data-ruban-repere]';

/** Sous ce seuil, le ruban reste une bande défilable au doigt (voir
 *  global.css) : aucun déclencheur n'y est posé. Même seuil que le reste du
 *  site pour la bascule desktop (nav scellée, bouton de la scène 3D). */
const SEUIL_DESKTOP = '(min-width: 64rem)';

/** Amplitude du parallax interne : ~16 % de la largeur du panneau, à
 *  contre-sens de la piste — c'est ce détail, et lui seul, qui fait l'effet
 *  Qiqi. Relevé DA du 19/08 : 9 % (l'ancienne valeur) donne 99 px sur
 *  1100 px, sous le seuil de perception ; la référence tourne entre 16 et
 *  29 %. L'image est posée 32 % plus large que son cadre (voir global.css) :
 *  16 % est la marge qui reste de chaque côté avant de découvrir du vide. */
const AMPLITUDE_IMAGE = 0.16;

/** --part-de-jour au début et à la fin de la traversée du ruban : 0,55 (état
 *  "jour=3", le palier de départ posé par RubanGestes) → 0,30 (état
 *  "jour=4", le bandeau qui suit désormais — voir index.astro). Le ruban est
 *  le plus long segment de l'accueil (jusqu'à 340svh) : il ne peut plus
 *  geler l'arc du variateur pendant sa propre traversée (recette DA du
 *  19/08). Coordination avec le déclencheur global : voir
 *  installerPartDeJour dans socle.ts, qui s'efface tant que CE déclencheur-
 *  ci (celui du ruban) est actif — un seul écrivain de --part-de-jour à la
 *  fois sur un même instant de défilement. */
const PART_JOUR_DEBUT = 0.55;
const PART_JOUR_FIN = 0.3;

/** L'étiquette kelvin de la marge active (voir EchelleKelvins.astro) suit la
 *  MÊME plage que --part-de-jour ci-dessus, ancrée aux deux VRAIES
 *  températures de palier qui bornent l'interpolation
 *  (--color-breande-k3000 à 0,55, --color-breande-k2700 à 0,30 — voir
 *  [data-jour] dans global.css) : jamais un nombre inventé entre les deux.
 *  echelle-kelvins.ts reste l'unique auteur de cette étiquette pour tout le
 *  reste du site (paliers discrets, par IntersectionObserver) ; ici seul,
 *  pendant la traversée scrubée du ruban, ce déclencheur écrit directement
 *  la valeur à chaque frame — la mise à jour par palier ne pourrait pas
 *  suivre un panneau haut de 340svh dont le ratio d'intersection reste
 *  quasi constant sur toute sa traversée. */
const KELVIN_DEBUT = 3000;
const KELVIN_FIN = 2700;
const ESPACE_INSECABLE = ' ';

function formaterKelvin(valeur: number): string {
  const arrondi = Math.round(valeur / 10) * 10;
  const texte = arrondi.toString().replace(/\B(?=(\d{3})+(?!\d))/gu, ESPACE_INSECABLE);
  return `${texte}${ESPACE_INSECABLE}K`;
}

/** Seuil d'entrée (fraction de la largeur du panneau visible dans la
 *  fenêtre) à partir duquel sa légende devient LA légende active — et bande
 *  d'hystérésis en dessous de ce seuil avant qu'elle ne se désactive : sans
 *  elle, un visiteur qui hésite pile sur la frontière verrait le texte
 *  clignoter entre deux panneaux. Recette DA du 19/08 : seuil d'entrée
 *  62 %, plage d'hystérésis 18 % (sortie sous 62 − 18 = 44 %). Une seule
 *  légende active à la fois — voir ruban-gestes__legende--active,
 *  global.css. */
const SEUIL_ENTREE_LEGENDE = 0.62;
const PLAGE_HYSTERESIS_LEGENDE = 0.18;

/** LE PALIER D'ENTRÉE (bloquant 3, chantier bêta du 19/08) — mesuré : le
 *  budget de lisibilité du premier panneau (« Créer ») ne tenait que sur
 *  ~100 px, contre 1 200 et 1 300 px pour les deux suivants, parce que la
 *  translation démarrait à l'instant exact où le panneau se collait, sans
 *  aucun temps de pause. 500 px, ajoutés à la course du déclencheur en CSS
 *  (voir .ruban-gestes, global.css) : la translation reste à 0 le temps de
 *  ce premier palier, puis rattrape sur le reste de la course — d'où la
 *  progression RETARDÉE ci-dessous, jamais `soi.progress` brut. */
const SEUIL_PALIER_PX = 500;

/** Un ruban : mesure sa piste, ses images et ses panneaux une fois par
 *  rafraîchissement, applique la translation à chaque image via --ruban-x /
 *  --ruban-image-x — jamais un attribut style="", toujours une propriété
 *  posée sur l'élément (voir installerPartDeJour dans socle.ts, même
 *  geste). */
function demarrerRuban(section: HTMLElement): (() => void) | void {
  const fenetre = section.querySelector<HTMLElement>(SELECTEUR_FENETRE);
  const piste = section.querySelector<HTMLElement>(SELECTEUR_PISTE);
  if (!fenetre || !piste) return;

  const images = Array.from(piste.querySelectorAll<HTMLElement>(SELECTEUR_IMAGE));
  const panneaux = Array.from(piste.querySelectorAll<HTMLElement>(SELECTEUR_PANNEAU));
  const legendes = panneaux.map((p) => p.querySelector<HTMLElement>(SELECTEUR_LEGENDE));
  const etiquetteKelvin = document.querySelector<HTMLElement>(SELECTEUR_ETIQUETTE_KELVIN);
  const entete = document.querySelector<HTMLElement>(SELECTEUR_ENTETE);
  const reperes = Array.from(section.querySelectorAll<HTMLElement>(SELECTEUR_REPERE));

  let distanceMax = 0;
  let amplitudes: number[] = [];
  let largeurFenetre = 0;
  let bornesPanneaux: Array<{ gauche: number; largeur: number }> = [];
  // Une légende active à la fois (index dans `panneaux`, -1 = aucune) :
  // portée hors de la boucle pour appliquer l'hystérésis sans revenir sur le
  // DOM à chaque frame.
  let legendeActiveIndex = -1;

  const mesurer = () => {
    distanceMax = Math.max(piste.scrollWidth - fenetre.clientWidth, 0);
    amplitudes = images.map(
      (image) => (image.parentElement?.clientWidth ?? image.clientWidth) * AMPLITUDE_IMAGE
    );
    largeurFenetre = fenetre.clientWidth;
    bornesPanneaux = panneaux.map((p) => ({ gauche: p.offsetLeft, largeur: p.offsetWidth || 1 }));
  };

  /** Fraction (0 à 1) du panneau `i` actuellement visible dans la fenêtre —
   *  intersection de son rectangle (mesuré au repos, translaté de `rubanX`)
   *  avec [0, largeurFenetre], normalisée par sa propre largeur. Purement
   *  arithmétique : aucune lecture DOM ici, voir mesurer() ci-dessus. */
  const fractionVisible = (i: number, rubanX: number): number => {
    const bornes = bornesPanneaux[i];
    if (!bornes) return 0;
    const gauche = bornes.gauche + rubanX;
    const droite = gauche + bornes.largeur;
    const visible = Math.min(droite, largeurFenetre) - Math.max(gauche, 0);
    return Math.max(0, visible) / bornes.largeur;
  };

  const actualiserLegendes = (rubanX: number) => {
    panneaux.forEach((_panneau, i) => {
      const fraction = fractionVisible(i, rubanX);
      if (legendeActiveIndex !== i && fraction >= SEUIL_ENTREE_LEGENDE) {
        legendeActiveIndex = i;
      } else if (
        legendeActiveIndex === i &&
        fraction < SEUIL_ENTREE_LEGENDE - PLAGE_HYSTERESIS_LEGENDE
      ) {
        legendeActiveIndex = -1;
      }
    });
    legendes.forEach((legende, i) => {
      legende?.classList.toggle('ruban-gestes__legende--active', i === legendeActiveIndex);
    });
    // Le repère de progression (important 6) suit la MÊME hystérésis que la
    // légende — un seul indice « actif » à raconter, jamais deux sources de
    // vérité sur quel panneau est « le » panneau courant. -1 (aucune
    // légende encore assez visible, à l'instant précis d'une frontière) :
    // aucun trait plein plutôt qu'un choix arbitraire.
    reperes.forEach((repere, i) => {
      repere.classList.toggle('ruban-gestes__repere--actif', i === legendeActiveIndex);
    });
  };

  // Mesure initiale synchrone : le premier onRefresh de ScrollTrigger n'est
  // pas garanti avant le premier onUpdate, et la légende du premier panneau
  // doit être active dès l'affichage, avant tout défilement.
  mesurer();
  actualiserLegendes(0);

  // La CSS neutralise ici le défilement natif (overflow-x: auto — le repli
  // sans script) : le script prend la main, la piste ne se déplace plus
  // qu'en transform. Remise à zéro du défilement natif au cas où le
  // visiteur aurait déjà glissé la bande avant que le script n'arrive.
  section.setAttribute('data-ruban-pilote', '');
  fenetre.scrollLeft = 0;
  // Le tabindex du repli (défilement natif au clavier) n'a plus d'objet une
  // fois le script en charge : le défilement vertical ordinaire de la page
  // pilote déjà tout, un arrêt de tabulation vide serait un défaut d'accès
  // au clavier, pas une aide.
  fenetre.removeAttribute('tabindex');

  // GARDE DU DÉFILEMENT NATIF (bloquant 1, chantier bêta du 19/08) — mesuré :
  // malgré overflow: hidden + [data-ruban-pilote] ci-dessus, le NAVIGATEUR
  // fait quand même défiler nativement `fenetre` pour révéler un élément qui
  // reçoit le focus (Tab, un lecteur d'écran) ou une correspondance Ctrl+F —
  // « overflow: hidden » retire la barre et le geste manuel, jamais la
  // région de défilement elle-même du calcul « scroll to reveal ». Ce
  // scrollLeft, une fois posé, n'était JAMAIS remis à zéro : la translation
  // scrubbée s'appliquait ensuite PAR-DESSUS un conteneur déjà décalé — panneau
  // désynchronisé de la légende, puis un rectangle noir vide. Un écouteur
  // `scroll` couvre les TROIS déclencheurs à la fois (Tab, lecteur d'écran,
  // Ctrl+F) sans avoir à les distinguer.
  const surDefilementNatif = () => {
    if (fenetre.scrollLeft !== 0) fenetre.scrollLeft = 0;
  };
  fenetre.addEventListener('scroll', surDefilementNatif, { passive: true });

  // Garde n°1 du retrait de l'en-tête (voir .entete--retire, global.css) :
  // un focus clavier dedans le fait revenir IMMÉDIATEMENT, indépendamment du
  // défilement — jamais un lien focalisé caché hors écran.
  const surFocusEntete = () => entete?.classList.remove('entete--retire');
  entete?.addEventListener('focusin', surFocusEntete);

  const declencheur = ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    invalidateOnRefresh: true,
    onRefresh: mesurer,
    onEnter: () => entete?.classList.add('entete--retire'),
    onEnterBack: () => entete?.classList.add('entete--retire'),
    // Garde n°2 : retour dès la sortie du ruban, dans les DEUX sens.
    onLeave: () => entete?.classList.remove('entete--retire'),
    onLeaveBack: () => entete?.classList.remove('entete--retire'),
    onUpdate: (soi) => {
      // LE PALIER D'ENTRÉE (bloquant 3) — `soi.start`/`soi.end` plutôt que la
      // constante `declencheur` : ce callback peut être invoqué par GSAP
      // pendant la construction même de ScrollTrigger.create(), avant que
      // l'affectation de la constante ci-dessous ne soit terminée (zone
      // morte temporelle) ; `soi`, lui, EST déjà l'instance complète.
      const courseTotale = soi.end - soi.start;
      const seuil = courseTotale > 0 ? SEUIL_PALIER_PX / courseTotale : 0;
      const diviseur = 1 - seuil;
      const progression = diviseur > 0 ? Math.max(0, (soi.progress - seuil) / diviseur) : 0;

      const rubanX = -distanceMax * progression;
      piste.style.setProperty('--ruban-x', `${rubanX}px`);
      images.forEach((image, i) => {
        const amplitude = amplitudes[i] ?? 0;
        image.style.setProperty('--ruban-image-x', `${amplitude * progression}px`);
      });
      actualiserLegendes(rubanX);

      // Le ruban devient lui-même l'écrivain de --part-de-jour PENDANT sa
      // traversée (voir installerPartDeJour dans socle.ts, qui s'efface tant
      // que ce déclencheur-ci est actif) — un seul écrivain à la fois.
      // Sur soi.progress BRUT, volontairement : l'arc jour/nuit accompagne
      // tout le défilement de la section, palier d'entrée compris, il ne
      // gèle pas avec la translation.
      const partDeJour = PART_JOUR_DEBUT + (PART_JOUR_FIN - PART_JOUR_DEBUT) * soi.progress;
      document.documentElement.style.setProperty('--part-de-jour', partDeJour.toFixed(3));

      if (etiquetteKelvin) {
        const kelvin = KELVIN_DEBUT + (KELVIN_FIN - KELVIN_DEBUT) * soi.progress;
        etiquetteKelvin.textContent = formaterKelvin(kelvin);
      }
    },
  });

  // FOCUS CLAVIER → DÉFILEMENT VERTICAL (bloquant 1, second volet) — c'est le
  // défilement vertical qui pilote la translation (onUpdate ci-dessus) ;
  // amener le BON panneau au clavier veut donc dire calculer la position
  // verticale qui produirait cette translation, jamais toucher --ruban-x
  // directement. Un lien reçoit le focus (Tab, lecteur d'écran) → on centre
  // son panneau dans la fenêtre, puis on convertit cette cible horizontale
  // en position de défilement via la géométrie même du déclencheur
  // (soi.start/soi.end, la même relation que dans onUpdate, inversée).
  const surFocusPanneau = (evenement: FocusEvent) => {
    const cible = evenement.target;
    if (!(cible instanceof HTMLElement)) return;
    const panneau = cible.closest<HTMLElement>(SELECTEUR_PANNEAU);
    if (!panneau) return;
    const index = panneaux.indexOf(panneau);
    const bornes = bornesPanneaux[index];
    if (!bornes) return;

    const centreCible = bornes.gauche + bornes.largeur / 2 - largeurFenetre / 2;
    const rubanXCible = Math.min(0, Math.max(-distanceMax, -centreCible));
    // Progression DÉLAYÉE (échelle « post-palier », celle de --ruban-x dans
    // onUpdate) — il faut la reconvertir vers la progression BRUTE du
    // déclencheur (celle que soi.progress porte réellement, palier compris)
    // avant de la reprojeter sur une position de défilement : même
    // transformation que dans onUpdate, inversée.
    const progressionDelayee = distanceMax > 0 ? -rubanXCible / distanceMax : 0;
    const courseTotale = declencheur.end - declencheur.start;
    const seuil = courseTotale > 0 ? SEUIL_PALIER_PX / courseTotale : 0;
    const progressionBrute = seuil + progressionDelayee * (1 - seuil);
    const cibleDefilement = declencheur.start + progressionBrute * courseTotale;
    defilerVers(cibleDefilement);
  };
  section.addEventListener('focusin', surFocusPanneau);

  return () => {
    declencheur.kill();
    entete?.removeEventListener('focusin', surFocusEntete);
    entete?.classList.remove('entete--retire');
    section.removeEventListener('focusin', surFocusPanneau);
    fenetre.removeEventListener('scroll', surDefilementNatif);
    section.removeAttribute('data-ruban-pilote');
    fenetre.setAttribute('tabindex', '0');
    piste.style.removeProperty('--ruban-x');
    for (const image of images) image.style.removeProperty('--ruban-image-x');
    for (const legende of legendes) legende?.classList.remove('ruban-gestes__legende--active');
    for (const repere of reperes) repere.classList.remove('ruban-gestes__repere--actif');
  };
}

/* ==========================================================================
   LA COUPE DE MATIÈRE (L'atelier) — un balayage d'entrée, UNE FOIS, jamais
   un scrub : le défilement fait la démonstration, il ne confisque pas le
   geste volontaire du visiteur sur le curseur natif. --reveal reste la
   propriété d'un seul écrivain (comparateur-coupe.ts, voir son en-tête) :
   ce module ne la touche JAMAIS directement, il déplace la VALEUR du
   curseur et laisse le gestionnaire existant appliquer() la conséquence —
   exactement ce que ferait un glissement manuel.
   ========================================================================== */
const SELECTEUR_COUPE = '[data-comparateur-coupe]';
const SELECTEUR_CURSEUR_COUPE = '[data-comparateur-curseur]';
/** 12 % à 88 % — le balayage donné par la mission, appliqué tel quel. */
const COUPE_DEBUT = 12;
const COUPE_FIN = 88;
const COUPE_REPOS = 50; // valeur d'origine du markup (mouvement réduit, jamais atteint ici).
/** Active la transition CSS le temps du balayage (voir
 *  .comparateur-coupe[data-coupe-balaye], global.css) — en dehors de cette
 *  fenêtre, un glissement manuel doit rester instantané, jamais amorti. */
const ETAT_BALAYAGE = 'data-coupe-balaye';

function demarrerComparateurCoupe(comparateur: HTMLElement): (() => void) | void {
  const curseur = comparateur.querySelector<HTMLInputElement>(SELECTEUR_CURSEUR_COUPE);
  if (!curseur) return;

  // dispatchEvent('input') plutôt qu'un appel direct : appliquer(), dans
  // comparateur-coupe.ts, reste le seul code qui écrit --reveal et les
  // attributs aria-value* — dupliquer cette logique ici créerait un second
  // écrivain, la classe de défaut que ce projet refuse partout ailleurs.
  const ecrire = (valeur: number) => {
    curseur.value = String(valeur);
    curseur.dispatchEvent(new Event('input', { bubbles: true }));
  };

  // Position de repos AVANT le geste : au DÉBUT de la course, pas au milieu
  // — sans quoi le balayage 12 → 88 ne parcourrait que sa moitié utile.
  ecrire(COUPE_DEBUT);

  const declencheur = ScrollTrigger.create({
    trigger: comparateur,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      comparateur.setAttribute(ETAT_BALAYAGE, '');
      ecrire(COUPE_FIN);
      // La transition CSS (--ms-signature, --ease-deplace) porte le
      // mouvement ; ce minuteur ne fait que rendre la main une fois la
      // course terminée — 'left' est la propriété la plus simple à écouter
      // (un seul élément, une seule valeur), le trait et la photo finissent
      // dans la même fenêtre de temps (même transition, mêmes jetons).
      comparateur
        .querySelector('.comparateur-coupe__trait')
        ?.addEventListener(
          'transitionend',
          (evenement) => {
            if ((evenement as TransitionEvent).propertyName !== 'left') return;
            comparateur.removeAttribute(ETAT_BALAYAGE);
          },
          { once: true }
        );
    },
  });

  return () => {
    declencheur.kill();
    comparateur.removeAttribute(ETAT_BALAYAGE);
    ecrire(COUPE_REPOS);
  };
}

/* ==========================================================================
   LA GALERIE « EN SITUATION » (fiche de pièce) — parallaxe à plan unique,
   jamais sur l'image de tête (LCP, immobile). L'image de gauche monte,
   celle de droite descend : un seul plan, pas les deux vitesses du ruban —
   un second ruban sur cette page rejouerait le geste déjà consommé par
   l'accueil (règle DA du 19/08).
   ========================================================================== */
const SELECTEUR_GALERIE = '[data-galerie]';
const SELECTEUR_GALERIE_IMAGE = '[data-galerie-image]';
/** ± 28 px — 6 % de 480 px de hauteur de cadre, le plafond exact donné par
 *  la direction artistique. Valeur fixe, pas recalculée sur la hauteur
 *  réellement rendue : c'est le plafond qui est donné, pas une proportion
 *  à reproduire à toutes les tailles de cadre. */
const AMPLITUDE_GALERIE_PX = 28;

function demarrerGaleriePiece(galerie: HTMLElement): (() => void) | void {
  const images = Array.from(galerie.querySelectorAll<HTMLElement>(SELECTEUR_GALERIE_IMAGE));
  if (images.length === 0) return;

  const declencheur = ScrollTrigger.create({
    trigger: galerie,
    start: 'top 80%',
    end: '+=600', // 600 px de traversée, donnés par la mission.
    scrub: 0.6,
    onUpdate: (soi) => {
      for (const image of images) {
        const sens = image.dataset.galerieSens === 'bas' ? 1 : -1;
        image.style.setProperty(
          '--galerie-image-y',
          `${(sens * AMPLITUDE_GALERIE_PX * soi.progress).toFixed(1)}px`
        );
      }
    },
  });

  return () => {
    declencheur.kill();
    for (const image of images) image.style.removeProperty('--galerie-image-y');
  };
}

/* ==========================================================================
   LA FRISE DES HUIT ÉTAPES (services) — un filet de laiton vertical se tire
   au défilement (0 à 100 % de la hauteur de la frise) ; chaque étape se
   révèle quand le filet l'atteint. Le décalage entre étapes vient du
   défilement lui-même (un seuil de progression par étape), jamais d'un
   transition-delay à étendre — c'est ce que demande la mission, et c'est
   ce qui distingue ce geste d'une simple cascade.
   ========================================================================== */
const SELECTEUR_FRISE = '[data-frise-etapes]';
const SELECTEUR_FRISE_FILET = '[data-frise-filet]';
const SELECTEUR_FRISE_ETAPE = '[data-frise-etape]';
const MARQUE_FILET_ATTEINT = 'data-filet-atteint';

function demarrerFriseEtapes(frise: HTMLElement): (() => void) | void {
  const filet = frise.querySelector<HTMLElement>(SELECTEUR_FRISE_FILET);
  const etapes = Array.from(frise.querySelectorAll<HTMLElement>(SELECTEUR_FRISE_ETAPE));
  if (!filet || etapes.length === 0) return;

  // Mesuré une fois par rafraîchissement, jamais dans onUpdate (même règle
  // que le ruban, voir l'en-tête de ce fichier) : une hauteur en pourcentage
  // n'aurait de toute façon aucune prise sur un élément absolu dont
  // l'ancêtre positionné est haut « auto ».
  let hauteur = 0;
  const mesurer = () => {
    hauteur = frise.clientHeight;
  };
  mesurer();

  const declencheur = ScrollTrigger.create({
    trigger: frise,
    start: 'top 70%',
    end: 'bottom 80%',
    scrub: 0.8,
    invalidateOnRefresh: true,
    onRefresh: mesurer,
    onUpdate: (soi) => {
      filet.style.setProperty('--filet-hauteur', `${(soi.progress * hauteur).toFixed(1)}px`);
      etapes.forEach((etape, i) => {
        // Seuil de progression, pas une lecture de position : la révélation
        // est définitive (même garantie que revelations.ts), donc on ne
        // fait jamais qu'AJOUTER l'attribut, jamais le retirer.
        if (soi.progress >= (i + 1) / etapes.length) {
          etape.setAttribute(MARQUE_FILET_ATTEINT, '');
        }
      });
    },
  });

  return () => {
    declencheur.kill();
    filet.style.removeProperty('--filet-hauteur');
    // Rien n'est abandonné invisible derrière soi (même garantie que
    // arreterRevelations()) : tout ce qui n'était pas encore atteint le
    // devient au démontage.
    for (const etape of etapes) etape.setAttribute(MARQUE_FILET_ATTEINT, '');
  };
}

export function demarrerEffetsScroll(): (() => void) | void {
  const nettoyages: Array<() => void> = [];

  // LE RUBAN — accueil seulement, desktop seulement (voir l'en-tête de ce
  // fichier) : sous 64 rem, la piste reste la bande défilable au doigt
  // posée par global.css, aucun déclencheur, aucun octet de plus.
  if (window.matchMedia(SEUIL_DESKTOP).matches) {
    for (const section of document.querySelectorAll<HTMLElement>(SELECTEUR_SECTION)) {
      const nettoyage = demarrerRuban(section);
      if (nettoyage) nettoyages.push(nettoyage);
    }
  }

  // LES QUATRE AUTRES GESTES — toutes largeurs, une page au plus les
  // possède chacun : la boucle ne trouve jamais rien à faire sur les pages
  // qui ne les portent pas.
  for (const comparateur of document.querySelectorAll<HTMLElement>(SELECTEUR_COUPE)) {
    const nettoyage = demarrerComparateurCoupe(comparateur);
    if (nettoyage) nettoyages.push(nettoyage);
  }
  for (const galerie of document.querySelectorAll<HTMLElement>(SELECTEUR_GALERIE)) {
    const nettoyage = demarrerGaleriePiece(galerie);
    if (nettoyage) nettoyages.push(nettoyage);
  }
  for (const frise of document.querySelectorAll<HTMLElement>(SELECTEUR_FRISE)) {
    const nettoyage = demarrerFriseEtapes(frise);
    if (nettoyage) nettoyages.push(nettoyage);
  }

  if (nettoyages.length === 0) return;

  return () => {
    for (const nettoyage of nettoyages.splice(0)) nettoyage();
    // ScrollTrigger recalcule les positions de tout le monde une fois les
    // déclencheurs tués — sinon les sections qui suivent gardent les
    // mesures d'avant, décalées de la hauteur qui vient de disparaître.
    ScrollTrigger.refresh();
  };
}
