import { test, expect } from '@playwright/test';
import { PAGES } from './utils';

/**
 * LA COUCHE DE MOUVEMENT — trois garanties, testées au navigateur plutôt que
 * lues dans le code :
 *
 * 1. Scripts bloqués : rien n'est jamais caché sans le script qui le révèle
 *    (voir src/scripts/mouvement/revelations.ts, la classe html.mouvement).
 * 2. Mouvement réduit : zéro octet de la couche animée (GSAP, ScrollTrigger,
 *    Three) ne part sur le réseau — vérifié à la requête, pas au style
 *    calculé (voir src/scripts/orchestration.ts).
 * 3. Régime normal : html.mouvement est posée, et tout ce qui est déjà dans
 *    le premier écran au chargement est déjà révélé (pas de clignotement).
 */
const MOTIF_FRAGMENT_ANIME = /gsap|scrolltrigger|three/i;

test.describe('couche de mouvement', () => {
  test('scripts bloqués : aucun texte n’est masqué, sur les six pages', async ({ browser }) => {
    const contexte = await browser.newContext({ javaScriptEnabled: false });
    const page = await contexte.newPage();

    for (const p of PAGES) {
      await page.goto(p.chemin);

      const elementsOpaciteNulle = await page.evaluate(() => {
        const suspects = Array.from(document.querySelectorAll<HTMLElement>('[data-revelation]'));
        return suspects.filter((el) => getComputedStyle(el).opacity === '0').length;
      });
      expect(elementsOpaciteNulle, `élément(s) à opacité 0 sur ${p.chemin} sans JavaScript`).toBe(0);

      // html.mouvement ne doit jamais être posée sans le script qui la pose :
      // sa présence sans JS signalerait une classe écrite dans le HTML statique.
      const classeMouvement = await page.evaluate(() =>
        document.documentElement.classList.contains('mouvement')
      );
      expect(classeMouvement, `html.mouvement posée sans JavaScript sur ${p.chemin}`).toBe(false);

      const texteVisible = ((await page.locator('body').innerText()) ?? '').trim();
      expect(texteVisible.length, `page ${p.chemin} sans texte visible sans JavaScript`).toBeGreaterThan(0);
    }

    await contexte.close();
  });

  test('mouvement réduit : aucun fragment gsap ni three n’est demandé au réseau', async ({
    browser,
  }) => {
    const contexte = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await contexte.newPage();
    const requetes: string[] = [];
    page.on('request', (req) => requetes.push(req.url()));

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Marge : les attentes différées de l'aiguilleur (load + idle) ont le temps
    // de jouer même si elles ne devaient rien déclencher sous mouvement réduit.
    await page.waitForTimeout(800);

    const suspectes = requetes.filter((u) => MOTIF_FRAGMENT_ANIME.test(u));
    expect(suspectes, `requêtes suspectes :\n${suspectes.join('\n')}`).toEqual([]);

    await contexte.close();
  });

  test('régime normal : html.mouvement est posée et le premier écran est déjà révélé', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForFunction(() => document.documentElement.classList.contains('mouvement'));

    const nonRevelesVisibles = await page.evaluate(() => {
      const vh = window.innerHeight;
      return Array.from(document.querySelectorAll('[data-revelation]')).filter((el) => {
        const r = el.getBoundingClientRect();
        const dansLePremierEcran = r.top < vh && r.bottom > 0;
        return dansLePremierEcran && !el.hasAttribute('data-revele');
      }).length;
    });
    expect(
      nonRevelesVisibles,
      'des éléments du premier écran ne sont pas encore révélés (data-revele manquant)'
    ).toBe(0);
  });
});
