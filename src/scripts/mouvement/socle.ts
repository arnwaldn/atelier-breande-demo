/**
 * LE SOCLE DE MOUVEMENT — fournisseur unique de GSAP, ScrollTrigger et Lenis.
 *
 * LENIS — renversement du 19/08/2026 : la référence retenue par le client
 * (qiqiglobal.com) repose sur ce lissage, et la configuration par défaut de
 * Lenis ne lisse QUE la molette et le trackpad — le défilement tactile reste
 * natif (syncTouch: false par défaut). L'objection d'origine (Lenis casse le
 * défilement Android) tombe donc, puisqu'il n'y a aucun tactile lissé. Ce qui
 * a coûté au projet frère (l'instance détruite qui continuait de tamponner
 * <html>) est structurellement écarté ici : Lenis ne vit QUE sous
 * surMouvement() (voir installerLissage), et son destroy() est le dernier
 * geste de la fonction de nettoyage que surMouvement() rappelle — jamais
 * ailleurs, jamais deux fois.
 *
 * UNE SEULE HORLOGE. Tout ce qui anime dans ce site passe par gsap.ticker —
 * la scène 3D comprise (voir scene/), Lenis désormais aussi (autoRaf: false,
 * piloté par le ticker). Deux horloges se désynchronisent d'une image et
 * produisent le « flottement » caractéristique.
 *
 * LA PRÉFÉRENCE DE MOUVEMENT EST SUIVIE EN DIRECT, dans les deux sens :
 * Windows la laisse basculer sans recharger. gsap.matchMedia() est le seul
 * mécanisme GSAP dont le retour en arrière est automatique — tout ce qui
 * s'inscrit ailleurs doit passer par surMouvement().
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { demarrerRevelations, arreterRevelations } from './revelations';
import { demarrerEffetsScroll } from './effets-scroll';

gsap.registerPlugin(ScrollTrigger);

const REQUETE_REDUIT = '(prefers-reduced-motion: reduce)';

/** Le registre des démontages — parcouru une fois, dans l'ordre inverse des
 *  inscriptions. La seule façon d'être sûr qu'un écouteur ajouté un jour de
 *  hâte ne sera pas oublié le jour du démontage. */
const demontages: Array<() => void> = [];

let contexteMedia: gsap.MatchMedia | null = null;
let instanceLissage: Lenis | null = null;

/**
 * LE PLANCHER DE JOUR (recette DA du 19/08, constat du soir) — deux
 * déclencheurs écrivent --part-de-jour à des échelles de progression
 * DIFFÉRENTES : le déclencheur global (ci-dessous, 1 − progress sur TOUTE
 * la hauteur de la page) et celui du ruban des gestes (effets-scroll.ts,
 * 0,55 → 0,30 sur sa SEULE traversée). À la sortie du ruban, le global
 * reprend la main avec une fraction de page bien moins avancée que ce que
 * le ruban venait d'atteindre : le jour REMONTAIT (0,300 → 0,400, mesuré).
 * Le variateur doit être un crépuscule, jamais une aube — d'où ce plancher
 * PARTAGÉ par les deux écrivains (voir demarrerRuban, effets-scroll.ts) :
 * jamais une valeur plus CLAIRE que la plus sombre déjà écrite cette
 * session de défilement. Module-level, réinitialisé à chaque (re)départ de
 * surMouvement() (voir demarrerSocle ci-dessous) : la préférence de
 * mouvement peut basculer plusieurs fois dans la même session (suivie EN
 * DIRECT, voir l'en-tête de ce fichier), et un plancher qui resterait figé
 * au dernier point atteint avant une bascule empêcherait tout nouveau
 * départ de remonter au jour réel de la position de défilement courante.
 */
let plancherPartDeJour = 1;

/** Réinitialise le plancher — un seul appel, au (re)départ de surMouvement(). */
export function reinitialiserPartDeJour(): void {
  plancherPartDeJour = 1;
}

/**
 * Écrit --part-de-jour sur <html>, jamais plus clair que ce qui a déjà été
 * écrit depuis le dernier départ (voir plancherPartDeJour ci-dessus) : la
 * suite est garantie strictement décroissante côté écrivains, quelle que
 * soit l'échelle de progression de l'appelant.
 */
export function ecrirePartDeJour(valeur: number): void {
  plancherPartDeJour = Math.min(plancherPartDeJour, valeur);
  document.documentElement.style.setProperty('--part-de-jour', plancherPartDeJour.toFixed(3));
}

/**
 * Inscrit un travail d'animation qui ne doit vivre QUE lorsque le mouvement
 * est permis. Le retour de `travail` (une fonction de nettoyage) est appelé
 * automatiquement si la préférence bascule vers « réduit ».
 */
export function surMouvement(travail: () => void | (() => void)): void {
  contexteMedia?.add(`not all and ${REQUETE_REDUIT}`, () => {
    const nettoyage = travail();
    return typeof nettoyage === 'function' ? nettoyage : undefined;
  });
}

/** Enregistre un démontage global (écouteur, minuterie) à rejouer à l'arrêt. */
export function auDemontage(nettoyage: () => void): void {
  demontages.push(nettoyage);
}

/** Force ScrollTrigger à re-mesurer — après une mutation de mise en page. */
export function rafraichir(): void {
  ScrollTrigger.refresh();
}

/**
 * LA VARIABLE MAÎTRESSE AU DÉFILEMENT. Les sections portent data-jour en
 * paliers (état sans script, état « réduit ») ; quand le mouvement est permis,
 * ce déclencheur interpole --part-de-jour continûment de 1 à 0 sur la hauteur
 * de la page, et la feuille en dérive teintes et ombres. Un seul nombre écrit
 * sur <html> par image au plus — jamais de style par élément.
 */
/** Les deux mêmes bornes que PART_JOUR_DEBUT/PART_JOUR_FIN dans
 *  effets-scroll.ts (le ruban n'écrit --part-de-jour QUE dans cet
 *  intervalle) — dupliquées ici, jamais importées : effets-scroll.ts
 *  importe déjà DEPUIS ce fichier, un import dans l'autre sens créerait un
 *  cycle. Si l'une bouge, l'autre doit suivre — les deux fichiers se
 *  citent mutuellement dans leurs commentaires pour ça. */
const PART_JOUR_AVANT_RUBAN = 0.55;
const PART_JOUR_APRES_RUBAN = 0.3;

function installerPartDeJour(): (() => void) | void {
  const racine = document.documentElement;
  // Le ruban des gestes de l'accueil (s'il existe et qu'un déclencheur lui
  // est propre — desktop + mouvement permis seulement, voir
  // effets-scroll.ts) écrit LUI-MÊME --part-de-jour pendant sa propre
  // traversée, avec une interpolation locale à sa course (0,55 → 0,30) :
  // c'est le plus long segment de la page, il ne peut plus geler l'arc du
  // variateur sur un seul palier pendant tout ce temps (recette DA du
  // 19/08). Deux écritures concurrentes de la même propriété au même
  // instant de défilement est la classe de défaut intermittent qu'on
  // refuse : ce déclencheur-ci s'efface donc tant que le ruban est actif.
  //
  // PAS st.isActive — piège mesuré au chantier du 19/08 au soir : GSAP
  // traite les déclencheurs dans leur ordre de CRÉATION, et celui-ci est
  // créé AVANT le ruban (installerPartDeJour() s'exécute avant
  // demarrerEffetsScroll(), voir demarrerSocle plus bas). Au moment où CE
  // callback-ci tourne, rubanST.isActive reflète encore l'état de la frame
  // PRÉCÉDENTE, pas la position de défilement courante — d'où un plateau à
  // 0,300 mesuré sur 27 % de la hauteur de l'accueil (la formule « après »
  // s'appliquait un temps avant que le ruban ne se déclare actif). La
  // géométrie (start/end), elle, est stable d'une frame à l'autre — c'est
  // elle qui décide, jamais un drapeau recalculé ailleurs dans le même tour.
  //
  // LE PLATEAU DE PLANCHER (constat du 19/08 au soir, premier passage) : le
  // plancher seul (voir ecrirePartDeJour) empêche bien toute REMONTÉE, mais
  // pas un long PALIER — le ruban, sur sa course propre bien plus courte
  // que la hauteur totale de la page, atteint 0,30 en ~4 100 px quand la
  // formule uniforme « 1 − progress » n'y arriverait naturellement que vers
  // 6 600 px. Solution retenue (la seconde option offerte par la mission) :
  // sur la page qui porte un ruban, ce déclencheur ne couvre plus TOUTE la
  // hauteur d'un seul tenant — sa plage démarre AVANT le ruban (1 → 0,55,
  // jusqu'à rubanST.start) et reprend APRÈS lui (0,30 → 0, depuis
  // rubanST.end), en continuité exacte avec les deux bornes que le ruban
  // lui-même pose. Les cinq autres pages, sans ruban, gardent la formule
  // uniforme d'origine — déjà strictement décroissante, mesuré.
  const ruban = document.querySelector<HTMLElement>('[data-ruban]');
  const declencheur = ScrollTrigger.create({
    start: 0,
    end: () => Math.max(document.body.scrollHeight - window.innerHeight, 1),
    onUpdate: (auto) => {
      const rubanST = ruban ? ScrollTrigger.getAll().find((st) => st.trigger === ruban) : undefined;
      if (!rubanST) {
        ecrirePartDeJour(1 - auto.progress);
        return;
      }

      const scrollY = window.scrollY;
      if (scrollY >= rubanST.start && scrollY <= rubanST.end) return; // le ruban écrit lui-même.

      if (scrollY < rubanST.start) {
        const local = rubanST.start > 0 ? scrollY / rubanST.start : 0;
        ecrirePartDeJour(1 + (PART_JOUR_AVANT_RUBAN - 1) * local);
        return;
      }
      const finDePage = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const porteeApres = finDePage - rubanST.end;
      const local = porteeApres > 0 ? Math.min(1, Math.max(0, (scrollY - rubanST.end) / porteeApres)) : 1;
      ecrirePartDeJour(PART_JOUR_APRES_RUBAN * (1 - local));
    },
  });
  return () => {
    declencheur.kill();
    racine.style.removeProperty('--part-de-jour');
  };
}

/**
 * LE LISSAGE — molette et trackpad seulement (voir l'en-tête de ce fichier).
 * duration: 0.9, easing par défaut : un amortissement discret, jamais la
 * sensation de flotter. autoRaf: false parce que ce site a UNE SEULE
 * HORLOGE : c'est gsap.ticker, jamais un requestAnimationFrame parallèle,
 * qui fait avancer Lenis à chaque image ; sans ce couplage, Lenis et
 * ScrollTrigger dérivent l'un de l'autre d'une image, et c'est le
 * « flottement » déjà payé ailleurs sur ce projet.
 */
function installerLissage(): () => void {
  const lissage = new Lenis({ duration: 0.9, autoRaf: false });
  instanceLissage = lissage;

  const surImage = (temps: number) => lissage.raf(temps * 1000);
  gsap.ticker.add(surImage);

  // lenis.on() rend elle-même le désabonnement : pas de référence à
  // reconstituer côté nettoyage, pas d'écouteur oublié.
  const desabonner = lissage.on('scroll', ScrollTrigger.update);

  return () => {
    gsap.ticker.remove(surImage);
    desabonner();
    lissage.destroy();
    instanceLissage = null;
  };
}

/**
 * DÉFILEMENT VERTICAL PROGRAMMATIQUE — passe TOUJOURS par Lenis quand
 * l'instance existe, jamais par un window.scrollTo() nu (voir html.lenis
 * dans global.css : Lenis maintient son propre état de cible interne, un
 * window.scrollTo direct le laisse ignorant du nouveau point et il peut le
 * corriger par-dessus à la frame suivante — la leçon du 19/08 sur le
 * scrub du ruban, tracée dans ce même fichier). `immediate: true` : un
 * saut au clavier (focus) doit être instantané, pas amorti — sur des
 * tabulations rapprochées, un défilement adouci s'empilerait.
 */
export function defilerVers(cible: number): void {
  if (instanceLissage) {
    instanceLissage.scrollTo(cible, { immediate: true });
  } else {
    window.scrollTo(0, cible);
  }
}

export function demarrerSocle(): void {
  contexteMedia = gsap.matchMedia();

  // Sous mouvement permis : révélations, variable maîtresse, lissage, et les
  // effets de défilement scrubbés (le ruban des gestes, pour l'instant).
  surMouvement(() => {
    reinitialiserPartDeJour();
    demarrerRevelations();
    const arreterJour = installerPartDeJour();
    const arreterLissage = installerLissage();
    const arreterEffets = demarrerEffetsScroll();
    return () => {
      arreterRevelations();
      if (arreterJour) arreterJour();
      arreterLissage();
      if (arreterEffets) arreterEffets();
    };
  });

  // Sous mouvement réduit : rien n'est instancié — et non « instancié puis
  // arrêté ». La feuille garde ses paliers data-jour ; l'arc subsiste.
}

export function arreterSocle(): void {
  for (const nettoyage of demontages.splice(0).reverse()) nettoyage();
  contexteMedia?.revert();
  contexteMedia = null;
}

export { gsap, ScrollTrigger };
