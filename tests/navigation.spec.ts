import { test, expect, type Page } from '@playwright/test';
import { PAGES } from './utils';

/**
 * Les cinq entrées de la navigation principale (les cinq pages du site,
 * vagues A et B — chantier « cinq pages », 2026-08-19). Toutes répondent
 * désormais : plus de distinction entre entrées « structurelles » et
 * entrées « actives ».
 */
const LIENS_NAV = [
  { libelle: 'accueil', chemin: '/' },
  { libelle: 'l’atelier', chemin: '/latelier' },
  { libelle: 'collections', chemin: '/collections' },
  { libelle: 'services', chemin: '/services' },
  { libelle: 'contact', chemin: '/contact' },
] as const;

/** Toutes les entrées de menu mènent désormais à une page réelle. */
const PAGES_ACTIVES = LIENS_NAV;

/**
 * En dessous de 768 px, les cinq entrées passent dans un <details> accessible
 * (voir EnTete.astro) : son contenu n'existe dans l'arbre d'accessibilité, et
 * n'est « visible » pour Playwright, qu'une fois ouvert. Sur desktop, ce menu
 * est lui-même display:none — .isVisible() y répond donc false, et cette
 * fonction ne fait rien : c'est le nav inline, toujours visible, qui répond
 * aux locators `:visible` utilisés plus bas.
 */
async function ouvrirMenuMobileSiNecessaire(page: Page) {
  const menuMobile = page.locator('.entete__menu-mobile');
  if (await menuMobile.isVisible()) {
    await menuMobile.locator('summary').click();
  }
}

test.describe('navigation', () => {
  test('l’en-tête expose les cinq entrées de menu avec le bon href', async ({ page }) => {
    await page.goto('/');
    await ouvrirMenuMobileSiNecessaire(page);
    for (const lien of LIENS_NAV) {
      const item = page.locator(`nav[aria-label="Navigation principale"] a[href="${lien.chemin}"]:visible`);
      await expect(item, `entrée de menu manquante ou invisible : ${lien.chemin}`).toHaveCount(1);
      await expect(item).toHaveText(lien.libelle);
    }
  });

  for (const lien of PAGES_ACTIVES) {
    test(`le lien de menu « ${lien.libelle} » mène vers ${lien.chemin}`, async ({ page }) => {
      await page.goto('/');
      await ouvrirMenuMobileSiNecessaire(page);
      await page.locator(`nav[aria-label="Navigation principale"] a[href="${lien.chemin}"]:visible`).click();
      expect(new URL(page.url()).pathname).toBe(lien.chemin);
    });
  }

  test('le logo d’en-tête ramène à l’accueil depuis une autre page', async ({ page }) => {
    await page.goto('/services');
    // Deux liens de l'en-tête pointent vers "/" (le logo ET l'entrée « accueil »
    // du menu) : on cible le logo par son nom accessible, pas par son seul href.
    await page.getByRole('banner').getByRole('link', { name: 'Atelier Bréande' }).click();
    expect(new URL(page.url()).pathname).toBe('/');
  });

  test('le lien « Mentions légales » du pied de page fonctionne', async ({ page }) => {
    await page.goto('/');
    await page.locator('footer a[href="/mentions-legales"]').click();
    expect(new URL(page.url()).pathname).toBe('/mentions-legales');
  });

  for (const p of PAGES_ACTIVES) {
    test(`aria-current="page" est posé sur le lien de menu quand on est sur ${p.chemin}`, async ({
      page,
    }) => {
      await page.goto(p.chemin);
      await ouvrirMenuMobileSiNecessaire(page);
      const lienCourant = page.locator(`nav[aria-label="Navigation principale"] a[href="${p.chemin}"]:visible`);
      await expect(lienCourant).toHaveAttribute('aria-current', 'page');

      // Les autres liens de menu ne doivent PAS porter aria-current : sinon la page
      // courante ne serait plus identifiable sans ambiguïté.
      const autres = PAGES_ACTIVES.filter((l) => l.chemin !== p.chemin);
      for (const autre of autres) {
        const lienAutre = page.locator(`nav[aria-label="Navigation principale"] a[href="${autre.chemin}"]:visible`);
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

  test('aucun lien interne mort sur les six pages (parcours en largeur)', async ({ page, request }) => {
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
          const chemin = cheminSansAncre === '' ? '/' : cheminSansAncre;
          liensInternes.add(chemin);
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
