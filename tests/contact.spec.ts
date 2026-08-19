import { test, expect } from '@playwright/test';

const SAISIE_VALIDE = {
  nom: 'Camille Dubreuil',
  email: 'camille.dubreuil@example.com',
  message: 'Un message de démonstration suffisamment long pour passer la validation.',
};

async function remplir(page: import('@playwright/test').Page, valeurs: Partial<typeof SAISIE_VALIDE>) {
  if (valeurs.nom !== undefined) await page.fill('#nom', valeurs.nom);
  if (valeurs.email !== undefined) await page.fill('#email', valeurs.email);
  if (valeurs.message !== undefined) await page.fill('#message', valeurs.message);
}

test.describe('formulaire de contact', () => {
  test('la mention de désactivation précède le formulaire dans le document', async ({ page }) => {
    await page.goto('/contact');
    const ordre = await page.evaluate(() => {
      const mention = document.querySelector('#contact-demo-mention');
      const formulaire = document.querySelector('#contact-form');
      if (!mention || !formulaire) return null;
      // DOCUMENT_POSITION_FOLLOWING (4) : le formulaire vient bien APRÈS la mention.
      return Boolean(mention.compareDocumentPosition(formulaire) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(ordre, 'mention ou formulaire introuvable dans le DOM').toBe(true);
  });

  test('la mention de désactivation est lisible sans défiler sur le profil mobile 360', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-360', 'vérification propre au profil 360 px');
    await page.goto('/contact');
    const mention = page.locator('#contact-demo-mention');
    await expect(mention).toBeVisible();

    const boite = await mention.boundingBox();
    const hauteurEcran = page.viewportSize()?.height ?? 740;
    expect(boite, 'impossible de mesurer la position de la mention').not.toBeNull();
    expect(
      boite!.y + boite!.height,
      `la mention déborde du premier écran (bas à ${boite!.y + boite!.height}px, écran ${hauteurEcran}px)`
    ).toBeLessThanOrEqual(hauteurEcran);
  });

  test('sans JavaScript, une mention explique que l’envoi est désactivé', async ({ browser }) => {
    const contexte = await browser.newContext({ javaScriptEnabled: false });
    const page = await contexte.newPage();
    await page.goto('/contact');
    // Le contenu de <noscript> est masqué (display: none) tant que JavaScript est
    // actif ; même scripts désactivés, `innerText` (utilisé par toContainText) dépend
    // du rendu visuel. On lit le texte brut du nœud DOM, indépendant de l'affichage —
    // et on tolère les retours à la ligne source (\s+) plutôt qu'une espace littérale.
    const texte = (await page.locator('noscript').textContent()) ?? '';
    expect(texte, `contenu du <noscript> : « ${texte} »`).toMatch(/formulaire\s+de\s+démonstration/i);
    await contexte.close();
  });

  test('la soumission vide affiche les trois erreurs sans changer de page', async ({ page }) => {
    await page.goto('/contact');
    const urlDepart = page.url();

    await page.getByRole('button', { name: 'Envoi désactivé' }).click();

    await expect(page.locator('#nom-erreur')).toBeVisible();
    await expect(page.locator('#nom-erreur')).toHaveText('Le nom est obligatoire.');
    await expect(page.locator('#email-erreur')).toBeVisible();
    // Champ vide : la même faute que le nom vide — « obligatoire », pas
    // « n'est pas valide » (qui suppose une saisie déjà présente).
    await expect(page.locator('#email-erreur')).toHaveText("L'adresse email est obligatoire.");
    await expect(page.locator('#message-erreur')).toBeVisible();
    await expect(page.locator('#message-erreur')).toHaveText('Le message est requis (10 caractères minimum).');

    expect(page.url()).toBe(urlDepart);
    await expect(page.locator('#contact-demo-etat')).toBeHidden();
  });

  test('un email mal formé est rejeté isolément, sans changer de page', async ({ page }) => {
    await page.goto('/contact');
    const urlDepart = page.url();

    await remplir(page, { nom: SAISIE_VALIDE.nom, email: 'pas-un-email', message: SAISIE_VALIDE.message });
    await page.getByRole('button', { name: 'Envoi désactivé' }).click();

    await expect(page.locator('#email-erreur')).toBeVisible();
    // Champ rempli mais mal formé : la faute est « n'est pas valide », jamais
    // « obligatoire » (le champ n'est pas vide).
    await expect(page.locator('#email-erreur')).toHaveText("L'adresse email n'est pas valide.");
    await expect(page.locator('#nom-erreur')).toBeHidden();
    await expect(page.locator('#message-erreur')).toBeHidden();
    expect(page.url()).toBe(urlDepart);
    await expect(page.locator('#contact-demo-etat')).toBeHidden();
  });

  test('un message de 9 caractères est rejeté, un message de 10 caractères est accepté', async ({
    page,
  }) => {
    await page.goto('/contact');
    await remplir(page, { nom: SAISIE_VALIDE.nom, email: SAISIE_VALIDE.email, message: '123456789' });
    await page.getByRole('button', { name: 'Envoi désactivé' }).click();
    await expect(page.locator('#message-erreur')).toBeVisible();

    await page.fill('#message', '1234567890');
    await page.getByRole('button', { name: 'Envoi désactivé' }).click();
    await expect(page.locator('#contact-demo-etat')).toBeVisible();
  });

  test('une saisie valide affiche l’état de démonstration sans changer de page', async ({ page }) => {
    await page.goto('/contact');
    const urlDepart = page.url();

    await remplir(page, SAISIE_VALIDE);
    await page.getByRole('button', { name: 'Envoi désactivé' }).click();

    await expect(page.locator('#contact-demo-etat')).toBeVisible();
    await expect(page.locator('#contact-demo-etat')).toContainText(/envoi est volontairement désactivé/i);
    expect(page.url()).toBe(urlDepart);
  });

  test('soumettre le formulaire ne déclenche aucune requête réseau sortante', async ({ page }) => {
    await page.goto('/contact');
    // On attend l'arrêt du réseau AVANT de brancher l'écoute : les requêtes du
    // document lui-même (HTML, script, styles, polices) sont ainsi exclues par
    // construction — seules les requêtes déclenchées PAR l'envoi sont observées.
    await page.waitForLoadState('networkidle');

    const requetesApresEnvoi: string[] = [];
    page.on('request', (req) => {
      requetesApresEnvoi.push(`${req.method()} ${req.url()}`);
    });

    await remplir(page, SAISIE_VALIDE);
    await page.getByRole('button', { name: 'Envoi désactivé' }).click();
    await expect(page.locator('#contact-demo-etat')).toBeVisible();

    // Marge pour une éventuelle requête différée (fetch tardif, beacon).
    await page.waitForTimeout(500);

    expect(requetesApresEnvoi, `requêtes déclenchées par l'envoi :\n${requetesApresEnvoi.join('\n')}`).toEqual(
      []
    );
  });
});
