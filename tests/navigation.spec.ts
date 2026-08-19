import { test, expect, type Page } from '@playwright/test';
import { PAGES } from './utils';

/**
 * Les cinq entrées de la navigation principale (vague A — chantier « coquille »,
 * 2026-08-19). Deux d'entre elles (l'atelier, collections) sont déjà câblées
 * dans l'en-tête et le pied de page, mais leurs pages arrivent en vague B :
 * on les inclut dans le contrôle STRUCTUREL (l'entrée existe, avec le bon
 * href), mais pas dans les contrôles qui exigent que la page cible RÉPONDE
 * (clic + navigation, aria-current sur la page elle-même) — voir
 * PAGES_ACTIVES ci-dessous et le test dédié « liens à venir » plus bas.
 */
const LIENS_NAV = [
  { libelle: 'accueil', chemin: '/' },
  { libelle: 'l’atelier', chemin: '/latelier' },
  { libelle: 'collections', chemin: '/collections' },
  { libelle: 'services', chemin: '/services' },
  { libelle: 'contact', chemin: '/contact' },
] as const;

/** Les entrées de menu dont la page cible existe déjà et répond 200. */
const PAGES_ACTIVES = LIENS_NAV.filter((l) => l.chemin === '/' || l.chemin === '/services' || l.chemin === '/contact');

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

  test('aucun lien interne mort sur les quatre pages (parcours en largeur)', async ({ page, request }) => {
    const liensInternes = new Set<string>();

    // Vague A (chantier « coquille », 2026-08-19) : l'en-tête et le pied de page
    // câblent déjà /latelier et /collections — ce sont les deux prochaines pages
    // du site (vague B), pas des liens morts. On les exclut explicitement du
    // crawl plutôt que de les laisser faire échouer ce test à tort.
    const ROUTES_A_VENIR = new Set(['/latelier', '/collections']);

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
          if (!ROUTES_A_VENIR.has(chemin)) liensInternes.add(chemin);
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

  test('/latelier et /collections répondent 404 pour l’instant (vague B) — et la page 404 reste tenue', async ({
    request,
  }) => {
    for (const chemin of ['/latelier', '/collections']) {
      const reponse = await request.get(chemin);
      expect(reponse.status(), `${chemin} ne répond plus 404 : la page a peut-être été créée — ce test doit alors être retiré`).toBe(404);
    }
  });
});
