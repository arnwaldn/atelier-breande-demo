import { test, expect } from '@playwright/test';

/**
 * LA PIÈCE QUE L'ON RÈGLE — le bloc 3D de l'accueil (ADR-006 du projet frère,
 * appliqué ici). Quatre garanties :
 *
 * 1. Le bloc est loin sous la ligne de flottaison (≥ 2 400 px, profil 360) :
 *    il n'entre jamais en concurrence avec le premier écran.
 * 2. Sur mobile, sans geste sur le bouton explicite, aucun octet de Three
 *    n'est demandé au réseau — la 3D ne se charge jamais d'elle-même sous
 *    1024 px (voir src/scripts/orchestration.ts).
 * 3. L'image de repli est dans le HTML statique : le bloc est beau sans
 *    JavaScript ni WebGL (critère de recette n°6 de l'ADR direction
 *    artistique).
 * 4. Le bouton de réglage porte data-scene-bouton, la porte d'entrée que
 *    l'aiguilleur cherche sur écran étroit.
 */
test.describe('la pièce que l’on règle (bloc 3D)', () => {
  test('le bloc [data-scene] est à plus de 2 400 px sous la flottaison (profil 360)', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-360', 'vérification propre au profil 360 px');
    await page.goto('/');
    const scene = page.locator('[data-scene]');
    await expect(scene).toHaveCount(1);
    const boite = await scene.boundingBox();
    expect(boite, 'impossible de mesurer la position du bloc scène').not.toBeNull();
    expect(
      boite!.y,
      `le bloc scène est à ${boite!.y}px, attendu ≥ 2400px`
    ).toBeGreaterThanOrEqual(2400);
  });

  test('sur mobile, sans geste, aucune requête vers un fragment three n’est émise', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-360', 'vérification propre au profil 360 px');
    const requetes: string[] = [];
    page.on('request', (req) => requetes.push(req.url()));

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Marge : laisse jouer les attentes différées (load + idle) de l'aiguilleur
    // sans qu'aucun geste n'ait eu lieu — c'est précisément ce qu'on vérifie.
    await page.waitForTimeout(1500);

    const suspectes = requetes.filter((u) => /three/i.test(u));
    expect(suspectes, `requêtes suspectes :\n${suspectes.join('\n')}`).toEqual([]);
  });

  test('l’image de repli est présente dans le HTML statique (sans JavaScript)', async ({
    browser,
  }) => {
    const contexte = await browser.newContext({ javaScriptEnabled: false });
    const page = await contexte.newPage();
    await page.goto('/');
    const image = page.locator('[data-scene] img');
    const compte = await image.count();
    expect(compte, 'aucune image de repli trouvée dans [data-scene]').toBeGreaterThan(0);
    await contexte.close();
  });

  test('le bouton de réglage porte data-scene-bouton', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-scene] [data-scene-bouton]')).toHaveCount(1);
  });
});
