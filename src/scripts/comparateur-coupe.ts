/*
  Le comparateur de coupe (page L'atelier) — un geste volontaire, pas une
  animation au défilement. Un <input type="range"> natif pilote la révélation
  de la photo par-dessus le dessin technique : le clavier le fait fonctionner
  gratuitement (flèches gauche/droite, Origine/Fin), et le résultat est
  indépendant de prefers-reduced-motion — il n'y a rien à réduire, le
  changement est un geste demandé, pas un défilement.

  Fichier séparé (et non <script> inline dans le composant) : voir la même
  justification que src/scripts/contact-form.ts — script-src 'self' refuse
  tout script en ligne, et Astro inline les scripts de moins de 4 Ko.

  --reveal est une propriété personnalisée posée par élément.style — jamais
  un attribut style="" statique dans le HTML servi (celui-là est interdit
  par la garde de livrable) : la valeur n'existe qu'après exécution, elle ne
  laisse aucune trace dans le HTML produit par la construction.
*/
/*
  aria-valuetext par paliers (C11, recette DA du 19/08) : role="slider" (natif
  sur <input type="range">) expose déjà min/max/now au lecteur d'écran à
  partir des attributs min/max/value — mais jamais le SENS de ces nombres.
  Sans valuetext, l'annonce serait un pourcentage brut (« 50 »), muet sur ce
  qui se révèle réellement. Cinq paliers, du dessin pur à la photo pure.
*/
function valuetextPalier(valeur: number): string {
  if (valeur <= 0) return 'dessin technique';
  if (valeur < 25) return 'surtout le dessin technique';
  if (valeur < 75) return 'moitié dessin technique, moitié photographie';
  if (valeur < 100) return 'surtout la photographie';
  return 'photographie';
}

const curseurs = document.querySelectorAll<HTMLInputElement>('[data-comparateur-curseur]');

for (const curseur of curseurs) {
  const conteneur = curseur.closest<HTMLElement>('[data-comparateur-coupe]');
  if (!conteneur) continue;

  const appliquer = () => {
    conteneur.style.setProperty('--reveal', `${curseur.value}%`);
    curseur.setAttribute('aria-valuenow', curseur.value);
    curseur.setAttribute('aria-valuetext', valuetextPalier(Number(curseur.value)));
  };

  curseur.addEventListener('input', appliquer);
  appliquer();
}
