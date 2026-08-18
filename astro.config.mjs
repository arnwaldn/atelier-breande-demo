// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Domaine fictif réservé (.example ne se résout jamais → aucun appel réseau).
export default defineConfig({
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
