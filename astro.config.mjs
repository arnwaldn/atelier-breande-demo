// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://atelier-breande-demo.vercel.app',
  trailingSlash: 'never',
  integrations: [sitemap()],


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
