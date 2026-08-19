import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PAGES, attendreImmobilite, anneauFocusVisible, decrireFocus, violationsAxeAExiger } from './utils';

test.describe('accessibilité', () => {
  for (const p of PAGES) {
    test(`${p.nom} — zéro violation axe grave ou critique`, async ({ page }) => {
      await page.goto(p.chemin);
      // Attente d'immobilité AVANT la mesure : l'accueil a une animation d'ouverture
      // (« allumage », 1,1 s). Scanner en plein fondu trouverait un contraste
      // temporaire qui n'existe dans aucune charte — voir attendreImmobilite().
      await attendreImmobilite(page);

      const resultats = await new AxeBuilder({ page }).analyze();
      const aExiger = violationsAxeAExiger(resultats);
      expect(aExiger, JSON.stringify(aExiger, null, 2)).toEqual([]);
    });
  }

  test('les erreurs de validation du formulaire restent accessibles après une soumission invalide', async ({
    page,
  }) => {
    await page.goto('/contact');
    await attendreImmobilite(page);
    await page.getByRole('button', { name: 'Envoi désactivé' }).click();
    await expect(page.locator('#nom-erreur')).toBeVisible();
    // Seconde attente (vague B) : la page Contact porte maintenant ses propres
    // révélations au défilement (colonne de droite, voir data-revelation dans
    // contact.astro) — leur IntersectionObserver peut se déclencher après la
    // première attente, en écho au clic. Sans cette seconde immobilité, axe
    // peut scanner un texte encore en fondu, à un contraste de transition qui
    // n'existe dans aucune charte (même piège que documenté sur attendreImmobilite).
    await attendreImmobilite(page);

    const resultats = await new AxeBuilder({ page }).analyze();
    const aExiger = violationsAxeAExiger(resultats);
    expect(aExiger, JSON.stringify(aExiger, null, 2)).toEqual([]);
  });

  test('l’accueil se parcourt entièrement au clavier jusqu’au formulaire de contact, sans piège de focus, anneau visible', async ({
    page,
  }) => {
    await page.goto('/');
    await attendreImmobilite(page);

    // 1) Premier arrêt : le lien d'évitement, avec un anneau visible.
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    expect(await anneauFocusVisible(page)).toBe(true);

    // 2) On tabule jusqu'au lien « Contact » du menu, sans jamais revisiter un élément
    //    déjà rencontré (piège de focus) et avec un anneau visible à chaque arrêt.
    const dejaVus = new Set<string>();
    let lienContactAtteint = false;
    for (let i = 0; i < 20 && !lienContactAtteint; i++) {
      await page.keyboard.press('Tab');
      const description = await decrireFocus(page);
      expect(description, 'le focus est retombé sur le document (body) — piège possible').not.toBeNull();
      expect(dejaVus.has(description!), `piège de focus détecté : ${description} revisité`).toBe(false);
      dejaVus.add(description!);
      expect(await anneauFocusVisible(page), `anneau de focus invisible sur ${description}`).toBe(true);

      lienContactAtteint = await page.evaluate(
        () => document.activeElement?.getAttribute('href') === '/contact'
      );
    }
    expect(lienContactAtteint, 'le lien « Contact » n’a jamais reçu le focus').toBe(true);

    // 3) Activation au clavier : on atteint bien la page de contact.
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/contact$/);
    await attendreImmobilite(page);

    // 4) On continue jusqu'aux trois champs du formulaire, dans l'ordre.
    const champsAttendus = ['nom', 'email', 'message'];
    const champsAtteints: string[] = [];
    for (let i = 0; i < 25 && champsAtteints.length < champsAttendus.length; i++) {
      await page.keyboard.press('Tab');
      expect(await anneauFocusVisible(page)).toBe(true);
      const id = await page.evaluate(() => (document.activeElement as HTMLElement | null)?.id ?? '');
      if (champsAttendus.includes(id)) champsAtteints.push(id);
    }
    expect(champsAtteints, 'les trois champs du formulaire n’ont pas tous reçu le focus, dans l’ordre').toEqual(
      champsAttendus
    );

    // 5) Le bouton d'envoi suit directement le dernier champ.
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Envoi désactivé' })).toBeFocused();
    expect(await anneauFocusVisible(page)).toBe(true);
  });
});
