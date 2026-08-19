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
  // refuse : ce déclencheur-ci s'efface donc tant que celui du ruban est
  // actif (ScrollTrigger.isActive, l'état public de GSAP — jamais une
  // géométrie recalculée à la main, qui dériverait de celle du ruban).
  const ruban = document.querySelector<HTMLElement>('[data-ruban]');
  const declencheur = ScrollTrigger.create({
    start: 0,
    end: () => Math.max(document.body.scrollHeight - window.innerHeight, 1),
    onUpdate: (auto) => {
      const rubanPilote = ruban
        ? ScrollTrigger.getAll().some((st) => st.trigger === ruban && st.isActive)
        : false;
      if (rubanPilote) return;
      racine.style.setProperty(
        '--part-de-jour',
        (1 - auto.progress).toFixed(3)
      );
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
