import { test, expect } from '@playwright/test';
import { PAGES, PIECES } from './utils';

/**
 * Le plan du site : chaque page répond, s'identifie correctement (un seul titre de
 * niveau 1, un title et une description non vides), et déclare une URL canonique
 * cohérente avec la page réellement servie. Le title et la description doivent aussi
 * être uniques d'une page à l'autre — un doublon est un signe de copier-coller oublié.
 */
test.describe('plan du site', () => {
  for (const p of PAGES) {
    test(`${p.nom} répond 200, a un h1 unique, une description non vide et un canonical cohérent`, async ({
      page,
    }) => {
      const reponse = await page.goto(p.chemin);
      expect(reponse?.status(), `statut HTTP de ${p.chemin}`).toBe(200);

      await expect(page.locator('html')).toHaveAttribute('lang', 'fr');

      await expect(page.locator('h1')).toHaveCount(1);

      const description = page.locator('meta[name="description"]');
      await expect(description).toHaveCount(1);
      const contenuDescription = (await description.getAttribute('content'))?.trim() ?? '';
      expect(contenuDescription.length, 'meta description vide').toBeGreaterThan(0);

      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      const hrefCanonical = await canonical.getAttribute('href');
      expect(hrefCanonical, 'canonical absent').not.toBeNull();

      // Le site (astro.config.mjs → site) déclare un domaine de production fixe : le
      // canonical y pointe TOUJOURS, même servi en local sur localhost:4341. La
      // cohérence à vérifier porte donc sur le chemin (doit correspondre à la page
      // réellement servie) et sur le domaine annoncé (doit être le vrai domaine de
      // production, jamais localhost ni un autre hôte).
      const urlCanonical = new URL(hrefCanonical!);
      const cheminServi = new URL(page.url()).pathname;
      expect(urlCanonical.pathname, 'canonical pointe vers le mauvais chemin').toBe(cheminServi);
      expect(urlCanonical.origin, 'canonical ne pointe pas vers le domaine de production').toBe(
        'https://atelier-breande-demo.vercel.app'
      );
    });
  }

  test('le title est unique sur les six pages du site', async ({ page }) => {
    const titres = new Set<string>();
    for (const p of PAGES) {
      await page.goto(p.chemin);
      const titre = await page.title();
      expect(titre.trim().length, `title vide sur ${p.chemin}`).toBeGreaterThan(0);
      expect(titres.has(titre), `title dupliqué (« ${titre} ») avant ${p.chemin}`).toBe(false);
      titres.add(titre);
    }
    expect(titres.size).toBe(PAGES.length);
  });

  test('la meta description est unique sur les six pages du site', async ({ page }) => {
    const descriptions = new Set<string>();
    for (const p of PAGES) {
      await page.goto(p.chemin);
      const contenu = await page.locator('meta[name="description"]').getAttribute('content');
      expect(descriptions.has(contenu ?? ''), `description dupliquée avant ${p.chemin}`).toBe(false);
      descriptions.add(contenu ?? '');
    }
    expect(descriptions.size).toBe(PAGES.length);
  });

  // Les sept fiches de pièce (routes dynamiques /collections/[piece]) ne sont pas
  // dans PAGES (elles n'ont pas de canonical de section fixe à comparer terme à
  // terme), mais chacune doit répondre et s'identifier correctement : même
  // contrôle minimal que les six pages ci-dessus, sur un chemin construit.
  test('les sept fiches de pièce répondent 200, avec un h1 unique et un canonical cohérent', async ({
    page,
  }) => {
    for (const slug of PIECES) {
      const chemin = `/collections/${slug}`;
      const reponse = await page.goto(chemin);
      expect(reponse?.status(), `statut HTTP de ${chemin}`).toBe(200);
      await expect(page.locator('h1'), `h1 de ${chemin}`).toHaveCount(1);

      const canonical = page.locator('link[rel="canonical"]');
      const hrefCanonical = await canonical.getAttribute('href');
      expect(hrefCanonical, `canonical absent sur ${chemin}`).not.toBeNull();
      expect(new URL(hrefCanonical!).pathname, `canonical incohérent sur ${chemin}`).toBe(chemin);
    }
  });

  // Deux ressources non-HTML complètent les six pages : robots.txt (fichier statique
  // attendu sous public/) et sitemap-index.xml (généré au build par @astrojs/sitemap,
  // déjà déclaré dans astro.config.mjs). Vérifiées via le contexte de requête plutôt
  // qu'une navigation de page : ce ne sont pas des documents HTML.

  test('/robots.txt répond 200 et référence le sitemap', async ({ request }) => {
    const reponse = await request.get('/robots.txt');
    expect(reponse.status(), '/robots.txt est absent ou en échec').toBe(200);
    const corps = await reponse.text();
    expect(corps, 'robots.txt ne référence aucun Sitemap').toMatch(/Sitemap:\s*\S+/i);
  });

  test('/sitemap-index.xml répond 200 avec un contenu XML bien formé', async ({ request }) => {
    const reponse = await request.get('/sitemap-index.xml');
    expect(reponse.status(), '/sitemap-index.xml est absent ou en échec').toBe(200);
    const typeContenu = reponse.headers()['content-type'] ?? '';
    expect(typeContenu, 'type de contenu inattendu pour le sitemap').toMatch(/xml/i);
    const corps = await reponse.text();
    expect(corps, 'le sitemap ne contient pas de balise <sitemapindex>').toContain('<sitemapindex');
  });
});
