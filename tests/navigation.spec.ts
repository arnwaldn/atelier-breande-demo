import { test, expect } from '@playwright/test';
import { PAGES } from './utils';

const LIENS_MENU = [
  { libelle: 'Accueil', chemin: '/' },
  { libelle: 'Services', chemin: '/services' },
  { libelle: 'Contact', chemin: '/contact' },
] as const;

test.describe('navigation', () => {
  for (const lien of LIENS_MENU) {
    test(`le lien de menu « ${lien.libelle} » mène vers ${lien.chemin}`, async ({ page }) => {
      await page.goto('/');
      await page
        .getByRole('navigation', { name: 'Navigation principale' })
        .getByRole('link', { name: lien.libelle, exact: true })
        .click();
      expect(new URL(page.url()).pathname).toBe(lien.chemin);
    });
  }

  test('le logo d’en-tête ramène à l’accueil depuis une autre page', async ({ page }) => {
    await page.goto('/services');
    // Deux liens de l'en-tête pointent vers "/" (le logo ET l'entrée « Accueil » du
    // menu) : on cible le logo par son nom accessible, pas par son seul href.
    await page.getByRole('banner').getByRole('link', { name: 'Atelier Bréande' }).click();
    expect(new URL(page.url()).pathname).toBe('/');
  });

  test('le lien « Mentions légales » du pied de page fonctionne', async ({ page }) => {
    await page.goto('/');
    await page.locator('footer a[href="/mentions-legales"]').click();
    expect(new URL(page.url()).pathname).toBe('/mentions-legales');
  });

  for (const p of LIENS_MENU) {
    test(`aria-current="page" est posé sur le lien de menu quand on est sur ${p.chemin}`, async ({
      page,
    }) => {
      await page.goto(p.chemin);
      const lienCourant = page.locator(`nav[aria-label="Navigation principale"] a[href="${p.chemin}"]`);
      await expect(lienCourant).toHaveAttribute('aria-current', 'page');

      // Les autres liens de menu ne doivent PAS porter aria-current : sinon la page
      // courante ne serait plus identifiable sans ambiguïté.
      const autres = LIENS_MENU.filter((l) => l.chemin !== p.chemin);
      for (const autre of autres) {
        const lienAutre = page.locator(`nav[aria-label="Navigation principale"] a[href="${autre.chemin}"]`);
        await expect(lienAutre).not.toHaveAttribute('aria-current', 'page');
      }
    });
  }

  test('le lien d’évitement est atteignable à la première tabulation et mène au contenu', async ({
    page,
  }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.locator('.skip-link');
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute('href', '#contenu');
    await expect(skip).toHaveText('Aller au contenu');

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#contenu$/);
  });

  test('aucun lien interne mort sur les quatre pages (parcours en largeur)', async ({ page, request }) => {
    const liensInternes = new Set<string>();

    for (const p of PAGES) {
      await page.goto(p.chemin);
      const hrefs = await page
        .locator('a[href]')
        .evaluateAll((elements) => elements.map((el) => el.getAttribute('href') ?? ''));

      for (const href of hrefs) {
        // Lien interne : commence par "/" et n'est pas un lien protocole-relatif ("//...").
        if (href.startsWith('/') && !href.startsWith('//')) {
          const cheminSansAncre = href.split('#')[0];
          liensInternes.add(cheminSansAncre === '' ? '/' : cheminSansAncre);
        }
      }
    }

    // Garde-fou : si le crawl ne trouve plus aucun lien interne, le test lui-même a
    // cessé de vérifier quoi que ce soit — on préfère un échec explicite à un vert muet.
    expect(liensInternes.size, 'aucun lien interne trouvé sur le site').toBeGreaterThan(0);

    for (const chemin of liensInternes) {
      const reponse = await request.get(chemin);
      expect(reponse.status(), `lien interne mort : ${chemin}`).toBe(200);
    }
  });
});
