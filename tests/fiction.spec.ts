import { test, expect } from '@playwright/test';
import { PAGES } from './utils';

/**
 * Le site est une démonstration d'atelier fictif : il doit le dire à trois endroits
 * distincts (pied de page, title, description), et jamais s'appeler « lumen » — nom
 * d'une société réelle, banni du projet.
 */
test.describe('fiction assumée', () => {
  for (const p of PAGES) {
    test(`${p.nom} — le pied de page annonce le caractère fictif du site`, async ({ page }) => {
      await page.goto(p.chemin);
      await expect(page.locator('footer')).toContainText(/fictif/i);
    });

    test(`${p.nom} — le title et la description portent la mention « démonstration »`, async ({ page }) => {
      await page.goto(p.chemin);
      const titre = await page.title();
      expect(titre.toLowerCase(), `title sans mention démonstration : « ${titre} »`).toContain('démonstration');

      const description = (await page.locator('meta[name="description"]').getAttribute('content')) ?? '';
      expect(
        description.toLowerCase(),
        `description sans mention démonstration : « ${description} »`
      ).toContain('démonstration');
    });
  }

  test('le mot « lumen » n’apparaît nulle part dans le HTML servi, sur aucune des quatre pages', async ({
    page,
  }) => {
    // Ancré sur des limites de mot : "absolument" contient la sous-chaîne "lumen" et ne
    // doit jamais déclencher. Auto-vérification du motif avant de l'utiliser en dur.
    const motif = /\blumen\b/i;
    expect(motif.test('Un mot lumen isolé doit déclencher.'), 'le motif ne détecte pas "lumen" isolé').toBe(
      true
    );
    expect(motif.test('absolument'), 'le motif se déclenche à tort sur "absolument"').toBe(false);

    for (const p of PAGES) {
      await page.goto(p.chemin);
      const html = await page.content();
      expect(motif.test(html), `« lumen » détecté dans le HTML de ${p.chemin}`).toBe(false);
    }
  });
});
