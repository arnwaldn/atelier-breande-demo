// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Domaine fictif réservé (.example ne se résout jamais → aucun appel réseau).
export default defineConfig({
  // Astro 7 inline par defaut toute feuille de moins de 4 Ko (build.inlineStylesheets:
  // 'auto'). Notre en-tete CSP porte style-src 'self', sans 'unsafe-inline' : une
  // feuille inlinee serait REFUSEE par le navigateur et la page s'afficherait SANS
  // AUCUN STYLE — en production seulement, jamais en developpement. Verrouille ici.
  build: { inlineStylesheets: 'never' },
  site: 'https://atelier-breande-demo.vercel.app',
  integrations: [sitemap()],
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()],
    // CSP stricte (script-src 'self') : aucun script inline. Astro inline par défaut
    // les scripts de moins de 4 Ko — on force la sortie en fichiers séparés.
    build: {
      assetsInlineLimit: 0,
      // Lightning CSS replie animation-timeline dans le raccourci animation, que la

      // specification n'accepte pas : le navigateur rejette alors la declaration

      // ENTIERE et toute animation liee au defilement meurt en silence DANS LE

      // LIVRABLE SEUL, en laissant le texte a son etat final lisible. Bogue vecu le

      // 29/07 sur le portfolio, attrape uniquement en lisant getComputedStyle sur

      // le livrable. esbuild ne fait pas ce repliage.
      cssMinify: 'esbuild',
    },
  },
});
