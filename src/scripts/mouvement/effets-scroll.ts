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

import { ScrollTrigger, defilerVers, ecrirePartDeJour } from './socle';

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
// DUPLIQUÉES dans socle.ts (PART_JOUR_AVANT_RUBAN / PART_JOUR_APRES_RUBAN,
// installerPartDeJour) : c'est là que la plage du déclencheur GLOBAL est
// bornée à ces deux mêmes valeurs pour continuer EXACTEMENT où le ruban
// s'arrête, sans plateau (voir le commentaire de installerPartDeJour). Si
// l'une des deux valeurs ci-dessous bouge, l'autre fichier doit suivre.
const PART_JOUR_DEBUT = 0.55;
const PART_JOUR_FIN = 0.3;

/** L'OMBRE PORTÉE (accueil, lot « lumière » du 19/08 au soir) — troisième
 *  vitesse du ruban, à l'oppose du parallax de l'image : « la lumière ne
 *  bouge pas, c'est la pièce qui passe dessous ». -0,06 (signe opposé au
 *  +0,16 de AMPLITUDE_IMAGE ci-dessus) pour rester sous le seuil de
 *  perception d'un déplacement de la SOURCE elle-même, pas de l'objet.
 *  Portée par la MÊME `progression` (post-palier) que l'image, pour que les
 *  deux restent exactement en opposition de phase à chaque frame. Scale et
 *  opacité, eux, suivent soi.progress BRUT — la même horloge que
 *  --part-de-jour local (voir PART_JOUR_DEBUT/FIN ci-dessus) : c'est elle
 *  qui « pilote » le socle, au sens de la mission. */
const OMBRE_FACTEUR_X = -0.06;
const OMBRE_SCALE_DEBUT = 1;
const OMBRE_SCALE_FIN = 1.38;
const OMBRE_OPACITE_DEBUT = 0.22;
const OMBRE_OPACITE_FIN = 0.3;

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
/*
 * L'effacement de l'echelle pendant la traversee du ruban a ete retire le
 * 20/08/2026. Il posait une classe .echelle-kelvins--efface qu'AUCUNE regle CSS
 * n'exploitait plus : la regle est partie avec la depose de la scene 3D le matin
 * meme, les quatre lignes de JS qui la posaient sont restees. Une depose
 * incomplete laisse toujours le morceau le moins visible. L'echelle reste donc
 * affichee pendant le ruban, et son interpolation y est bornee par les deux
 * paliers reels — juge bon a l'ecran.
 */
function demarrerRuban(section: HTMLElement): (() => void) | void {
  const fenetre = section.querySelector<HTMLElement>(SELECTEUR_FENETRE);
  const piste = section.querySelector<HTMLElement>(SELECTEUR_PISTE);
  if (!fenetre || !piste) return;

  const images = Array.from(piste.querySelectorAll<HTMLElement>(SELECTEUR_IMAGE));
  const panneaux = Array.from(piste.querySelectorAll<HTMLElement>(SELECTEUR_PANNEAU));
  const legendes = panneaux.map((p) => p.querySelector<HTMLElement>(SELECTEUR_LEGENDE));
  const etiquetteKelvin = document.querySelector<HTMLElement>(SELECTEUR_ETIQUETTE_KELVIN);
  const entete = document.querySelector<HTMLElement>(SELECTEUR_ENTETE);
  // L'echelle des kelvins s'efface pendant la traversee du ruban — meme
  // regle que devant la lampe (echelle-kelvins.ts) : une cotation qui passe
  // SUR son sujet est un detail faux (reserve R1 du DA), et au beta-test du
  // 19/08 elle entrait en collision frontale avec le titre « Restaurer ».
  const echelle = document.querySelector<HTMLElement>('.echelle-kelvins');
  const reperes = Array.from(section.querySelectorAll<HTMLElement>(SELECTEUR_REPERE));

  let distanceMax = 0;
  let amplitudes: number[] = [];
  let largeurFenetre = 0;
  let bornesPanneaux: Array<{ gauche: number; largeur: number }> = [];
  // Une légende active à la fois (index dans `panneaux`, -1 = aucune) :
  // portée hors de la boucle pour appliquer l'hystérésis sans revenir sur le
  // DOM à chaque frame.
  let legendeActiveIndex = -1;
  let decalagesLegendes: number[] = [];

  const mesurer = () => {
    distanceMax = Math.max(piste.scrollWidth - fenetre.clientWidth, 0);
    amplitudes = images.map(
      (image) => (image.parentElement?.clientWidth ?? image.clientWidth) * AMPLITUDE_IMAGE
    );
    largeurFenetre = fenetre.clientWidth;
    bornesPanneaux = panneaux.map((p) => ({ gauche: p.offsetLeft, largeur: p.offsetWidth || 1 }));
    // Position au repos de chaque boîte de légende DANS son panneau (le
    // décalage diagonal 0 / 18 / 36 % résolu en pixels) — mesurée ici, jamais
    // dans onUpdate, pour la garde du bord ci-dessous.
    decalagesLegendes = legendes.map((l) => l?.offsetLeft ?? 0);
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
      // LA GARDE DU BORD (bêta-test in vivo du 19/08, gabarit 1280 x 551) :
      // pendant la traversée, un panneau translaté porte sa boîte de légende
      // hors de l'écran à gauche — le texte se collait au bord (x = 0) et
      // entrait en collision avec l'échelle des kelvins. On calcule de
      // combien la boîte est sortie, et le CSS l'ajoute au retrait du texte
      // (padding-inline-start: calc(var(--marge-page) + var(--legende-garde)))
      // — le TEXTE reste exactement à une marge de page du bord, quoi que
      // fasse sa boîte. Purement arithmétique, aucune lecture DOM ici.
      if (!legende) return;
      const bornes = bornesPanneaux[i];
      const boiteGauche = (bornes?.gauche ?? 0) + rubanX + (decalagesLegendes[i] ?? 0);
      legende.style.setProperty('--legende-garde', `${Math.max(0, -boiteGauche).toFixed(1)}px`);
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
    onEnter: () => {
      entete?.classList.add('entete--retire');
    },
    onEnterBack: () => {
      entete?.classList.add('entete--retire');
    },
    // Garde n°2 : retour dès la sortie du ruban, dans les DEUX sens.
    onLeave: () => {
      entete?.classList.remove('entete--retire');
    },
    onLeaveBack: () => {
      entete?.classList.remove('entete--retire');
    },
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
      const scaleOmbre = OMBRE_SCALE_DEBUT + (OMBRE_SCALE_FIN - OMBRE_SCALE_DEBUT) * soi.progress;
      const opaciteOmbre = OMBRE_OPACITE_DEBUT + (OMBRE_OPACITE_FIN - OMBRE_OPACITE_DEBUT) * soi.progress;
      images.forEach((image, i) => {
        const amplitude = amplitudes[i] ?? 0;
        image.style.setProperty('--ruban-image-x', `${amplitude * progression}px`);
        // L'ombre vit sur le PANNEAU (voir .ruban-gestes__panneau::after,
        // global.css), jamais sur `image` : une propriété personnalisée
        // n'est visible que de l'élément qui la porte et de ses
        // descendants — le panneau n'est pas descendant de l'image. Même
        // boucle, même frame, aucun déclencheur de plus.
        const panneau = panneaux[i];
        const largeurPanneau = bornesPanneaux[i]?.largeur ?? 0;
        if (!panneau) return;
        panneau.style.setProperty('--ruban-ombre-x', `${(OMBRE_FACTEUR_X * largeurPanneau * progression).toFixed(1)}px`);
        panneau.style.setProperty('--ruban-ombre-scale', scaleOmbre.toFixed(3));
        panneau.style.setProperty('--ruban-ombre-opacite', opaciteOmbre.toFixed(3));
      });
      actualiserLegendes(rubanX);

      // Le ruban devient lui-même l'écrivain de --part-de-jour PENDANT sa
      // traversée (voir installerPartDeJour dans socle.ts, qui s'efface tant
      // que ce déclencheur-ci est actif) — un seul écrivain à la fois.
      // Sur soi.progress BRUT, volontairement : l'arc jour/nuit accompagne
      // tout le défilement de la section, palier d'entrée compris, il ne
      // gèle pas avec la translation.
      const partDeJour = PART_JOUR_DEBUT + (PART_JOUR_FIN - PART_JOUR_DEBUT) * soi.progress;
      ecrirePartDeJour(partDeJour);

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
    for (const panneau of panneaux) {
      panneau.style.removeProperty('--ruban-ombre-x');
      panneau.style.removeProperty('--ruban-ombre-scale');
      panneau.style.removeProperty('--ruban-ombre-opacite');
    }
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
/** 12 % a 50 %. La borne haute etait a 88 % — la photo se revelait presque
 *  entierement, et le trait finissait sa course pres du bord droit. Le client
 *  a demande le 20/08/2026 qu'elle s'arrete « au milieu de la lampe ».
 *  La valeur n'est pas estimee a l'oeil : analyse de luminance de
 *  coupe-photo.jpg, colonne par colonne — le coeur du globe allume, c'est-a-dire
 *  la zone la plus lumineuse de l'image, est EXACTEMENT a 50 % de la largeur.
 *  Le trait s'arrete donc sur l'axe de la lampe, moitie dessin, moitie photo. */
const COUPE_DEBUT = 12;
const COUPE_FIN = 50;
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

  const declencheur = ScrollTrigger.create({
    trigger: frise,
    start: 'top 70%',
    end: 'bottom 80%',
    scrub: 0.8,
    onUpdate: (soi) => {
      // --filet-progres pilote un transform: scaleY (voir
      // .frise-etapes__filet, global.css), plus une hauteur en px : CORRECTIF
      // CLS (lot « lumière » du 19/08 au soir) — l'ancienne version, en px,
      // changeait la hauteur RÉELLE de l'élément à chaque frame de scrub, une
      // propriété de mise en page ; mesuré, 0,0006 à 0,0019 de Layout Shift
      // sur /services. transform ne bouge jamais la boîte de mise en page.
      filet.style.setProperty('--filet-progres', soi.progress.toFixed(3));
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
    filet.style.removeProperty('--filet-progres');
    // Rien n'est abandonné invisible derrière soi (même garantie que
    // arreterRevelations()) : tout ce qui n'était pas encore atteint le
    // devient au démontage.
    for (const etape of etapes) etape.setAttribute(MARQUE_FILET_ATTEINT, '');
  };
}

/* ==========================================================================
   LE SEUIL QUI SE RETIRE (accueil) — la photo du seuil ne bouge JAMAIS
   (c'est le LCP) ; seul le calque de titre posé dessus se retire sur les
   400 premiers pixels de défilement. `start`/`end` NUMÉRIQUES, sans
   `trigger` : la même mécanique que le déclencheur global de socle.ts
   (installerPartDeJour) — une position de page absolue, aucun élément à
   mesurer, aucun risque de conflit avec la fenêtre épinglée du ruban plus
   bas sur la page.
   ========================================================================== */
const SELECTEUR_SEUIL_TITRE = '[data-seuil-titre]';
const SEUIL_TITRE_DISTANCE_PX = 400;
const SEUIL_TITRE_TRANSLATION_PX = -40;

function demarrerSeuilTitre(bloc: HTMLElement): () => void {
  const declencheur = ScrollTrigger.create({
    start: 0,
    end: SEUIL_TITRE_DISTANCE_PX,
    scrub: 0.4,
    onUpdate: (soi) => {
      bloc.style.setProperty('--seuil-titre-opacite', (1 - soi.progress).toFixed(3));
      bloc.style.setProperty('--seuil-titre-y', `${(SEUIL_TITRE_TRANSLATION_PX * soi.progress).toFixed(1)}px`);
    },
  });
  return () => {
    declencheur.kill();
    bloc.style.removeProperty('--seuil-titre-opacite');
    bloc.style.removeProperty('--seuil-titre-y');
  };
}

/* ==========================================================================
   LA LUMIÈRE RASANTE (L'atelier) — un balayage traverse chaque photo de la
   grille des matières, une matière après l'autre : chaque image a sa
   PROPRE fenêtre de progression, décalée de 12 % et NORMALISÉE sur le
   reste de la course (LUMIERE_DUREE) pour que la DERNIÈRE matière achève
   quand même son balayage exactement à la fin du déclencheur — sans cette
   normalisation, un simple décalage aurait laissé le dernier panneau
   inachevé (0,64 de progression locale au mieux sur une fenêtre de 1).
   ========================================================================== */
const SELECTEUR_LUMIERE_RASANTE = '[data-lumiere-rasante]';
const SELECTEUR_LUMIERE_IMAGE = '.famille-matiere__image';
const LUMIERE_DECALAGE = 0.12;
const LUMIERE_DUREE = 1 - 3 * LUMIERE_DECALAGE; // 3 décalages entre 4 matières.

function demarrerLumiereRasante(grille: HTMLElement): (() => void) | void {
  const images = Array.from(grille.querySelectorAll<HTMLElement>(SELECTEUR_LUMIERE_IMAGE));
  if (images.length === 0) return;

  const declencheur = ScrollTrigger.create({
    trigger: grille,
    start: 'top 78%',
    end: 'bottom 60%',
    scrub: 0.7,
    onUpdate: (soi) => {
      images.forEach((image, i) => {
        const local = Math.min(1, Math.max(0, (soi.progress - i * LUMIERE_DECALAGE) / LUMIERE_DUREE));
        image.style.setProperty('--matiere-x', `${(-40 + 180 * local).toFixed(1)}%`);
        // Opacité en cloche (0 → 0,26 → 0) : un sinus sur [0, π], nul aux
        // deux bornes de la fenêtre locale, jamais négatif grâce au clamp
        // ci-dessus.
        image.style.setProperty('--matiere-opacite', (Math.sin(Math.PI * local) * 0.26).toFixed(3));
      });
    },
  });

  return () => {
    declencheur.kill();
    for (const image of images) {
      image.style.removeProperty('--matiere-x');
      image.style.removeProperty('--matiere-opacite');
    }
  };
}

/* ==========================================================================
   LE DESSIN TECHNIQUE QUI SE POSE (fiche de pièce) — un trait au
   stroke-dashoffset (pathLength="1" sur chaque <path>, voir les fichiers
   src/assets/dessins-techniques/*.svg : la normalisation évite tout calcul
   de longueur réelle de tracé) puis, une fois le trait complet, les cotes
   se posent en fondu (voir [data-trait-trace] .dessin-technique__cote,
   global.css). Révélation DÉFINITIVE (même garantie que revelations.ts et
   la frise des étapes) : l'attribut n'est jamais retiré.
   ========================================================================== */
const SELECTEUR_DESSIN = '[data-dessin-technique]';
const MARQUE_TRAIT_TRACE = 'data-trait-trace';

function demarrerDessinTechnique(aside: HTMLElement): (() => void) | void {
  const declencheur = ScrollTrigger.create({
    trigger: aside,
    start: 'top 70%',
    end: '+=700',
    scrub: 0.5,
    onUpdate: (soi) => {
      aside.style.setProperty('--dessin-progres', (1 - soi.progress).toFixed(3));
      if (soi.progress >= 1) aside.setAttribute(MARQUE_TRAIT_TRACE, '');
    },
  });

  return () => {
    declencheur.kill();
    aside.style.removeProperty('--dessin-progres');
    // Rien n'est abandonné à mi-trait : comme la frise, on complète plutôt
    // que d'effacer.
    aside.setAttribute(MARQUE_TRAIT_TRACE, '');
  };
}

/* ==========================================================================
   LE SURVOL DE PROXIMITÉ (grilles de pièces) — préalable : réparer le halo
   mort de .carte-piece::after (voir global.css) avant d'en piloter
   l'opacité par la distance au curseur. Un seul écouteur `pointermove`
   passif PAR grille, une propriété écrite par carte, AUCUNE lecture de
   géométrie dans le gestionnaire — les centres sont mesurés une fois par
   rafraîchissement ScrollTrigger (même discipline que le ruban), en
   coordonnées de PAGE (scrollX/scrollY ajoutés) précisément pour ne
   jamais avoir à les relire pendant un défilement. `pageX`/`pageY` de
   l'événement sont déjà en coordonnées de page, la comparaison est donc
   valide à tout moment sans jamais toucher au DOM depuis le gestionnaire.
   ========================================================================== */
const SELECTEUR_GRILLE_PIECES = '[data-grille-pieces]';
const RAYON_PROXIMITE_PX = 180;

function demarrerProximite(grille: HTMLElement): (() => void) | void {
  const cartes = Array.from(grille.querySelectorAll<HTMLElement>('.carte-piece'));
  if (cartes.length === 0) return;

  let centres: Array<{ x: number; y: number }> = [];
  const mesurer = () => {
    centres = cartes.map((carte) => {
      const boite = carte.getBoundingClientRect();
      return {
        x: boite.left + boite.width / 2 + window.scrollX,
        y: boite.top + boite.height / 2 + window.scrollY,
      };
    });
  };
  mesurer();
  ScrollTrigger.addEventListener('refresh', mesurer);

  const surPointer = (evenement: PointerEvent) => {
    // Sortie immédiate hors souris (mission) : un halo « au survol » ne se
    // déclenche jamais au doigt, sur écran tactile — la seule affordance
    // qu'un visiteur tactile ait jamais eue pour CETTE carte est le geste
    // qu'il vient de faire (le tapotement lui-même), jamais un calque qui
    // n'apparaîtrait qu'à un curseur qu'il n'a pas.
    if (evenement.pointerType !== 'mouse') return;
    const x = evenement.pageX;
    const y = evenement.pageY;
    cartes.forEach((carte, i) => {
      const centre = centres[i];
      if (!centre) return;
      const distance = Math.hypot(x - centre.x, y - centre.y);
      const intensite = Math.max(0, 1 - distance / RAYON_PROXIMITE_PX);
      carte.style.setProperty('--proximite', intensite.toFixed(3));
    });
  };
  grille.addEventListener('pointermove', surPointer, { passive: true });

  return () => {
    ScrollTrigger.removeEventListener('refresh', mesurer);
    grille.removeEventListener('pointermove', surPointer);
    for (const carte of cartes) carte.style.removeProperty('--proximite');
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
  for (const bloc of document.querySelectorAll<HTMLElement>(SELECTEUR_SEUIL_TITRE)) {
    nettoyages.push(demarrerSeuilTitre(bloc));
  }
  for (const grille of document.querySelectorAll<HTMLElement>(SELECTEUR_LUMIERE_RASANTE)) {
    const nettoyage = demarrerLumiereRasante(grille);
    if (nettoyage) nettoyages.push(nettoyage);
  }
  // Le dessin technique ne vit que dans la marge active, qui n'existe qu'à
  // partir de 64 rem (voir .fiche-piece__dessin, global.css : display:none
  // en dessous) — même seuil que le ruban, un déclencheur GSAP sur un
  // élément display:none n'a aucune géométrie sensée à mesurer.
  if (window.matchMedia(SEUIL_DESKTOP).matches) {
    for (const aside of document.querySelectorAll<HTMLElement>(SELECTEUR_DESSIN)) {
      const nettoyage = demarrerDessinTechnique(aside);
      if (nettoyage) nettoyages.push(nettoyage);
    }
  }
  for (const grille of document.querySelectorAll<HTMLElement>(SELECTEUR_GRILLE_PIECES)) {
    const nettoyage = demarrerProximite(grille);
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
