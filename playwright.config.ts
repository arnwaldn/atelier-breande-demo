import { defineConfig, devices } from '@playwright/test';

/**
 * Configuration Playwright — harnais de test du site vitrine « Atelier Bréande »
 * (démonstration, atelier de luminaires fictif — Lyon).
 *
 * Deux profils imposés, chromium pour les deux : mobile-360 (le plus contraint) et
 * desktop-1280. Chaque campagne joue sur les deux profils par défaut.
 *
 * PORT DÉDIÉ (4341) ET SERVEUR JAMAIS PARTAGÉ.
 * Piège déjà vécu sur un projet voisin de ce poste (Site web Freelance) : le port 4321,
 * défaut d'Astro, est occupé par un autre projet — avec « réutiliser un serveur
 * existant », Playwright s'était connecté à un site étranger et tous les échecs
 * venaient de là, pas du code testé. Une autre campagne a même testé une ANCIENNE
 * construction restée servie pendant une relecture. D'où reuseExistingServer: false et
 * une commande qui reconstruit TOUJOURS avant de servir : la campagne teste
 * systématiquement son propre livrable, jamais un reste ni un site étranger.
 */
const PORT = 4341;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],

  use: {
    baseURL: BASE_URL,
    locale: 'fr-FR',
    timezoneId: 'Europe/Paris',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'mobile-360',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 360, height: 740 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'desktop-1280',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
      },
    },
  ],

  webServer: {
    // npm run build:nu construit le livrable RÉEL (sans les scripts de garde, hors
    // périmètre de ce harnais) ; npm run preview le sert sur le port 4341 fixé par
    // package.json. Le serveur est TOUJOURS reconstruit avant d'être servi.
    command: 'npm run build:nu && npm run preview',
    url: BASE_URL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
