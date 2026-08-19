/*
 * Le sceau de l'en-tête au défilement.
 *
 * L'en-tête est transparent sur le seuil de la page ; il se scelle (fond nuit
 * à 92 %, filet de laiton en dessous) dès que la sentinelle posée en tout
 * début de <body> (voir BaseLayout.astro) quitte le viewport. Toujours par
 * IntersectionObserver, jamais par un écouteur `scroll` — direction retenue
 * dans la mission de ce chantier.
 *
 * Fichier séparé (et non <script> inline dans le composant) : la CSP du site
 * porte `script-src 'self'` sans `'unsafe-inline'`, et Astro inline tout
 * script de moins de 4 Ko — voir astro.config.mjs (assetsInlineLimit: 0).
 */
const entete = document.querySelector<HTMLElement>('[data-entete]');
const sentinelle = document.querySelector<HTMLElement>('[data-sentinelle-entete]');

if (entete && sentinelle && 'IntersectionObserver' in window) {
  const observateur = new IntersectionObserver(
    ([entree]) => {
      entete.classList.toggle('entete--scelle', !entree.isIntersecting);
    },
    { threshold: 0 }
  );
  observateur.observe(sentinelle);
} else if (entete) {
  // Repli sans IntersectionObserver : l'en-tête reste scellé en permanence —
  // toujours lisible plutôt que transparent sur un fond potentiellement clair.
  entete.classList.add('entete--scelle');
}
