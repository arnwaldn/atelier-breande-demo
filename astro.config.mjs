// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Domaine fictif réservé (.example ne se résout jamais → aucun appel réseau).
export default defineConfig({
  // Astro 7 inline par defaut toute feuille de moins de 4 Ko (build.inlineStylesheets:
  // 'auto'). Notre en-tete CSP porte style-src 'self', sans 'unsafe-inline' : une
  // feuille inlinee serait REFUSEE par le navigateur et la page s'afficherait SANS
  // AUCUN STYLE — en production seulement, jamais en developpement. Verrouille ici.
  build: { inlineStylesheets: 'never' },
  site: 'https://atelier-breande-demo.vercel.app',
  vite: {
    plugins: [tailwindcss()],
    // CSP stricte (script-src 'self') : aucun script inline. Astro inline par défaut
    // les scripts de moins de 4 Ko — on force la sortie en fichiers séparés.
    build: {
      assetsInlineLimit: 0,
    },
  },
});
