// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

/**
 * La plage latine, recopiée telle quelle depuis le `wght.css` des paquets
 * Fontsource. Elle couvre tout le français : U+0000-00FF (lettres accentuées et
 * cédille), U+0152-0153 (Œ lié), U+2000-206F (espaces, tirets, guillemets),
 * U+20AC (euro). Les sous-ensembles latin étendu, vietnamien et suivants ne sont
 * jamais chargés — un lecteur français ne les demande pas.
 */
const LATIN =
  'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,' +
  'U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,' +
  'U+2212,U+2215,U+FEFF,U+FFFD';

export default defineConfig({
  site: 'https://atelier-breande-demo.vercel.app',
  trailingSlash: 'never',
  integrations: [sitemap()],

  /**
   * DEUX POLICES, DEUX FICHIERS, 71,5 Ko — et pas un octet de plus.
   *
   * Le fournisseur est LOCAL : aucune requête vers un tiers, ni à la
   * construction ni chez le visiteur. Une police servie par un CDN exposerait
   * l'adresse IP du lecteur sans base légale.
   *
   * Le premier montage passait par un `@import` du paquet npm : il émettait
   * les CINQ sous-ensembles (latin, latin étendu, vietnamien pour Fraunces),
   * soit 123 Ko produits dont 55 qu'un lecteur français ne télécharge jamais.
   *
   * Le choix des VARIANTES a été fait sur mesure, pas au jugé :
   *
   *   Fraunces  wonk  36,6 Ko   graisse 100-900 + l'axe WONK
   *             wght  36,6 Ko   graisse seule
   *             opsz  67,3 Ko   +30 Ko pour l'axe optique
   *             full 121,0 Ko   tous les axes
   *
   * `wonk` pèse le MÊME poids que `wght` tout en apportant l'axe WONK — les
   * formes alternatives du g et du y, ce léger déhanchement qui empêche la
   * serif de sonner « luxe ». C'est gratuit, on le prend. L'axe optique reste
   * le plan B si les grands titres manquent de tranchant : un seul chemin à
   * changer ici.
   *
   *   Archivo   wght  34,9 Ko   graisse seule
   *             wdth  90,1 Ko   +55 Ko pour la chasse
   *
   * La chasse condensée d'Archivo aurait servi aux étiquettes techniques.
   * 55 Ko pour un resserrement de quelques pour cent, sur le poste le plus
   * contraint du budget : refusé. L'effet s'obtient à l'interlettrage.
   *
   * `fallbacks` laisse Astro calculer les métriques de la police de repli :
   * le texte ne saute pas quand la fonte arrive, et le décalage cumulé reste
   * à zéro.
   */
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Fraunces Variable',
      cssVariable: '--police-titre',
      fallbacks: ['Georgia', 'ui-serif', 'serif'],
      options: {
        variants: [
          {
            src: [
              '@fontsource-variable/fraunces/files/fraunces-latin-wonk-normal.woff2',
            ],
            weight: '100 900',
            style: 'normal',
            display: 'swap',
            unicodeRange: [LATIN],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Archivo Variable',
      cssVariable: '--police-texte',
      fallbacks: ['Segoe UI', 'Helvetica Neue', 'ui-sans-serif', 'sans-serif'],
      options: {
        variants: [
          {
            src: [
              '@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2',
            ],
            weight: '100 900',
            style: 'normal',
            display: 'swap',
            unicodeRange: [LATIN],
          },
        ],
      },
    },
  ],

  build: {
    /**
     * Astro 7 inline par défaut toute feuille de moins de 4 Ko
     * (`inlineStylesheets: 'auto'`). Notre en-tête porte `style-src 'self'`
     * sans `'unsafe-inline'` : une feuille inlinée serait REFUSÉE par le
     * navigateur et la page s'afficherait SANS AUCUN STYLE — en production
     * seulement, jamais en développement. Verrouillé ici.
     */
    inlineStylesheets: 'never',
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      /**
       * Même raison, côté scripts : `script-src 'self'` refuse tout script en
       * ligne, et Astro en inline sous 4 Ko.
       */
      assetsInlineLimit: 0,
      /**
       * Lightning CSS replie `animation-timeline` dans le raccourci
       * `animation`, que la spécification n'accepte pas : le navigateur rejette
       * alors la déclaration ENTIÈRE et toute animation liée au défilement meurt
       * en silence — dans le livrable seul, en laissant le texte à son état
       * final lisible. La page semble correcte. Seule la lecture de
       * `getComputedStyle().animationName` sur le livrable le révèle.
       */
      cssMinify: 'esbuild',
    },
  },
});
