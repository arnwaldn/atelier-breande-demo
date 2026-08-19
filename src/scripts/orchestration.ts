/**
 * L'AIGUILLEUR — le seul fichier de la couche animée référencé par une balise.
 * ~2 Ko. Tout le reste arrive par import() dynamique, et seulement s'il le faut.
 *
 * LA COUPURE EST EN AMONT : sous `prefers-reduced-motion: reduce`, PAS UN
 * OCTET ne part — ni GSAP, ni la scène. C'est prouvé au réseau par la
 * campagne, pas au style calculé. (Seconde ceinture dans le socle via
 * gsap.matchMedia, pour la bascule en cours de session.)
 *
 * LA SCÈNE 3D NE PART JAMAIS SANS SES CONDITIONS (ADR-006 du projet frère,
 * mesuré : reporter sans changer la question « faut-il charger ? » AGGRAVE la
 * note — 54 contre 56) :
 *   1. `load` — ressources comprises, jamais DOMContentLoaded ;
 *   2. un temps mort réel (requestIdleCallback, repli minuterie) ;
 *   3. sous 64 rem : UN GESTE du visiteur — et même alors, seulement le
 *      bouton explicite du bloc (décision de direction artistique : sur
 *      écran étroit, la 3D ne se charge JAMAIS d'elle-même) ;
 *   4. la proximité du bloc (IntersectionObserver, marge 320 px).
 */

const REDUIT = window.matchMedia('(prefers-reduced-motion: reduce)');

async function demarrer(): Promise<void> {
  if (REDUIT.matches) {
    // L'arc du jour subsiste en paliers via data-jour ; rien à télécharger.
    // Si la préférence bascule vers « permis » en cours de session, on
    // démarre à ce moment-là.
    REDUIT.addEventListener('change', () => void demarrer(), { once: true });
    return;
  }

  // 1 puis 2, séquencés — jamais Promise.all : le second lit une classe que
  // le premier pose, et paralléliser laisserait l'ordre à l'empaqueteur
  // (symptôme : un défaut intermittent, donc le pire).
  const { demarrerSocle } = await import('./mouvement/socle');
  demarrerSocle();

  // 3 — détaché, jamais attendu, avec son propre filet : une promesse rejetée
  // sans capteur est un message de console, et la note « bonnes pratiques »
  // les compte.
  void chargerLaSceneQuandLHeureEstVenue().catch(() => {
    // Le bloc garde son état peint — qui est le DÉFAUT, pas un secours.
  });
}

async function chargerLaSceneQuandLHeureEstVenue(): Promise<void> {
  const hote = document.querySelector<HTMLElement>('[data-scene]');
  if (!hote) return;

  const { quandLaPageEstChargee, quandLeFilEstLibre, quandLHoteApproche } =
    await import('./mouvement/attente');

  await quandLaPageEstChargee();
  await quandLeFilEstLibre();

  const etroit = window.matchMedia('(max-width: 63.99rem)').matches;
  if (etroit) {
    // Sur écran étroit la scène ne se charge JAMAIS d'elle-même : 140 Ko sur
    // un forfait mobile pour un ornement ne se justifie pas devant quelqu'un
    // qui n'a rien demandé. Le bouton du bloc est la seule porte.
    const bouton = hote.querySelector<HTMLButtonElement>('[data-scene-bouton]');
    if (!bouton) return;
    await new Promise<void>((resoudre) => {
      bouton.addEventListener('click', () => resoudre(), { once: true });
    });
  } else {
    await quandLHoteApproche(hote, '320px');
    await quandLeFilEstLibre(1200);
  }

  const { demarrerScene } = await import('./mouvement/scene/moteur');
  await demarrerScene(hote);
}

void demarrer();
