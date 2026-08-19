/**
 * LA MOLETTE — le geste signature du site. « La seule chose qu'on demande au
 * visiteur de faire » (ADR-002, moment de bravoure n° 2).
 *
 * C'est un CONTRÔLE, pas une animation : il vit aussi sous mouvement réduit,
 * et il fonctionne AVANT que la scène 3D n'existe — la molette tourne, le
 * label suit, et si le canevas est monté il reçoit la consigne. Sans
 * JavaScript, la molette reste posée sur 2 700 K : un état, pas un trou.
 *
 * Accessibilité : role="slider", flèches et Début/Fin au clavier, valeur
 * annoncée en kelvins. Le pointeur règle par glissement horizontal — le
 * curseur système `ew-resize` est la SEULE exception au refus des curseurs
 * personnalisés (il informe, il ne décore pas).
 */

const K_MIN = 2200;
const K_MAX = 4000;
/** L'arc SVG va de 200° (gauche) à -20° (droite) autour du moyeu (100,100), r=80. */
const ANGLE_MIN = 200;
const ANGLE_MAX = -20;

function initialiserMolette(molette: SVGElement): void {
  const hote = molette.closest<HTMLElement>('[data-scene]');
  const curseur = molette.querySelector<SVGLineElement>('.bande-scene__curseur');
  const point = molette.querySelector<SVGCircleElement>('.bande-scene__curseur-point');
  const label = molette.querySelector<SVGTextElement>('.bande-scene__label--actif');
  if (!hote || !curseur || !point || !label) return;

  // 2 700 K est la position de repos — la température de la maison.
  let t = (2700 - K_MIN) / (K_MAX - K_MIN);

  const appliquer = (): void => {
    const kelvins = Math.round((K_MIN + t * (K_MAX - K_MIN)) / 10) * 10;
    const angle = ((ANGLE_MIN + t * (ANGLE_MAX - ANGLE_MIN)) * Math.PI) / 180;
    const x = 100 + 80 * Math.cos(angle) * 0.77;
    const y = 100 - 80 * Math.sin(angle) * 0.77;
    curseur.setAttribute('x2', x.toFixed(1));
    curseur.setAttribute('y2', y.toFixed(1));
    point.setAttribute('cx', x.toFixed(1));
    point.setAttribute('cy', y.toFixed(1));
    const separateur = String.fromCharCode(0x202f); // espace fine insecable — jamais en litteral (piege n. 20 du poste)
    label.textContent = `${String(kelvins).slice(0, 1)}${separateur}${String(kelvins).slice(1)}${separateur}K`;
    molette.setAttribute('aria-valuenow', String(kelvins));
    molette.setAttribute('aria-valuetext', `${kelvins} kelvins`);
    // L'allumage de la scène : 0 à 2 200 K froid éteint… non — la consigne
    // est une TEMPÉRATURE ; l'intensité de la scène suit la proximité de
    // 2 700 K par le haut : plus on descend vers le chaud, plus elle donne.
    hote.dispatchEvent(
      new CustomEvent('breande-reglage', { detail: { t, kelvins } })
    );
  };

  const reglerDepuis = (clientX: number): void => {
    const boite = molette.getBoundingClientRect();
    t = Math.min(1, Math.max(0, (clientX - boite.left) / boite.width));
    appliquer();
  };

  let glisse = false;
  molette.addEventListener('pointerdown', (e) => {
    glisse = true;
    molette.setPointerCapture(e.pointerId);
    reglerDepuis(e.clientX);
  });
  molette.addEventListener('pointermove', (e) => {
    if (glisse) reglerDepuis(e.clientX);
  });
  molette.addEventListener('pointerup', () => {
    glisse = false;
  });

  molette.addEventListener('keydown', (e) => {
    const pas = 0.05;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') t = Math.min(1, t + pas);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') t = Math.max(0, t - pas);
    else if (e.key === 'Home') t = 0;
    else if (e.key === 'End') t = 1;
    else return;
    e.preventDefault();
    appliquer();
  });
}

for (const molette of document.querySelectorAll<SVGElement>('.bande-scene__molette')) {
  initialiserMolette(molette);
}
