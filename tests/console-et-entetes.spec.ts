import { test, expect } from '@playwright/test';
import { PAGES, appliquerCSP } from './utils';

test.describe('console et en-têtes', () => {
  for (const p of PAGES) {
    test(`${p.nom} — zéro message de console, zéro erreur, zéro requête en échec`, async ({ page }) => {
      const messages: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error' || msg.type() === 'warning') {
          messages.push(`[console:${msg.type()}] ${msg.text()}`);
        }
      });
      page.on('pageerror', (err) => messages.push(`[pageerror] ${err.message}`));
      page.on('requestfailed', (req) => {
        messages.push(`[requestfailed] ${req.method()} ${req.url()} — ${req.failure()?.errorText ?? ''}`);
      });
      page.on('response', (res) => {
        if (res.status() >= 400) messages.push(`[réponse ${res.status()}] ${res.url()}`);
      });

      const reponse = await page.goto(p.chemin);
      await page.waitForLoadState('networkidle');

      expect(reponse?.ok(), `réponse HTTP non-OK pour ${p.chemin}`).toBe(true);
      expect(messages, messages.join('\n')).toEqual([]);
    });
  }

  for (const p of PAGES) {
    test(`${p.nom} — zéro violation de la politique de sécurité du contenu (CSP)`, async ({ page }) => {
      const violations: string[] = [];
      await page.exposeFunction('__signalerViolationCSP', (detail: string) => {
        violations.push(detail);
      });
      await page.addInitScript(() => {
        document.addEventListener('securitypolicyviolation', (e) => {
          // @ts-expect-error — pont vers Node posé par exposeFunction, invisible du typeur.
          window.__signalerViolationCSP(`${e.violatedDirective} — bloqué : ${e.blockedURI}`);
        });
      });

      // vercel.json (racine du projet, hors périmètre de ce harnais) déclare une CSP
      // stricte, mais ces en-têtes sont posés par le réseau Vercel en production — le
      // serveur `astro preview` utilisé ici ne les envoie pas. On la reconstitue par
      // interception de route pour exercer réellement la CSP en local (voir utils.ts).
      await appliquerCSP(page);

      await page.goto(p.chemin);
      await page.waitForLoadState('networkidle');

      expect(violations, violations.join('\n')).toEqual([]);
    });
  }

  test('aucune ressource chargée sur les quatre pages ne provient d’un domaine externe', async ({
    page,
    baseURL,
  }) => {
    const origineAttendue = new URL(baseURL!).origin;
    const externes: string[] = [];
    page.on('request', (req) => {
      const url = req.url();
      if (url.startsWith('data:') || url.startsWith('blob:')) return;
      if (new URL(url).origin !== origineAttendue) externes.push(url);
    });

    for (const p of PAGES) {
      await page.goto(p.chemin);
      await page.waitForLoadState('networkidle');
    }

    expect(externes, `ressources externes chargées :\n${externes.join('\n')}`).toEqual([]);
  });
});
