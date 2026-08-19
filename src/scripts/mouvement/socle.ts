/**
 * LE SOCLE DE MOUVEMENT — fournisseur unique de GSAP et ScrollTrigger.
 *
 * PAS DE LENIS, ET C'EST UNE DÉCISION, PAS UN OUBLI. Le défilement lissé
 * casse le défilement natif d'Android et désolidarise le doigt du contenu ;
 * il a coûté au projet frère deux défauts fins (l'instance détruite qui
 * continuait de tamponner <html>, les ancres décalées par scroll-padding).
 * Le concept de ce site — le jour qui s'en va — ne repose pas sur le lissage.
 * ScrollTrigger travaille sur le défilement natif, et c'est très bien ainsi.
 *
 * UNE SEULE HORLOGE. Tout ce qui anime dans ce site passe par gsap.ticker —
 * la scène 3D comprise (voir scene/). Deux horloges se désynchronisent d'une
 * image et produisent le « flottement » caractéristique.
 *
 * LA PRÉFÉRENCE DE MOUVEMENT EST SUIVIE EN DIRECT, dans les deux sens :
 * Windows la laisse basculer sans recharger. gsap.matchMedia() est le seul
 * mécanisme GSAP dont le retour en arrière est automatique — tout ce qui
 * s'inscrit ailleurs doit passer par surMouvement().
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { demarrerRevelations, arreterRevelations } from './revelations';

gsap.registerPlugin(ScrollTrigger);

const REQUETE_REDUIT = '(prefers-reduced-motion: reduce)';

/** Le registre des démontages — parcouru une fois, dans l'ordre inverse des
 *  inscriptions. La seule façon d'être sûr qu'un écouteur ajouté un jour de
 *  hâte ne sera pas oublié le jour du démontage. */
const demontages: Array<() => void> = [];

let contexteMedia: gsap.MatchMedia | null = null;

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
  const declencheur = ScrollTrigger.create({
    start: 0,
    end: () => Math.max(document.body.scrollHeight - window.innerHeight, 1),
    onUpdate: (auto) => {
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

export function demarrerSocle(): void {
  contexteMedia = gsap.matchMedia();

  // Sous mouvement permis : révélations + variable maîtresse.
  surMouvement(() => {
    demarrerRevelations();
    const arreterJour = installerPartDeJour();
    return () => {
      arreterRevelations();
      if (arreterJour) arreterJour();
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
