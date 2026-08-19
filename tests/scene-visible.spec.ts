import { expect, test } from '@playwright/test';

/**
 * LA SCÈNE 3D EST-ELLE RÉELLEMENT VISIBLE ?
 *
 * POURQUOI CE FICHIER EXISTE. Le 19/08/2026, un visiteur a signalé que le bloc
 * du luminaire était vide : molette seule, aucune lampe. Les 148 tests étaient
 * verts, et pour cause — ils vérifiaient que le canevas est CRÉÉ, jamais qu'il
 * est VU.
 *
 * La cause tenait en une règle de style : le moteur monte le canevas DANS
 * `.bande-scene__repli` (choix documenté dans moteur.ts : sur mobile, un
 * canevas posé sur l'hôte entier passait par-dessus la molette). Une règle de
 * fondu posait `opacity: 0` sur ce conteneur quand la scène devenait active,
 * pour effacer l'image de repli qu'elle remplace — et effaçait donc la scène
 * avec elle. L'image et son remplaçant vivaient dans la même boîte.
 *
 * La leçon, et le contrat de ce fichier : un élément peut être présent, avoir
 * une taille non nulle, un contexte WebGL valide, et rester STRICTEMENT
 * INVISIBLE parce qu'un ancêtre l'éteint. On ne mesure donc pas l'élément :
 * on remonte toute sa chaîne de parents.
 *
 * Ce test ne lit pas les pixels du canevas — un contexte WebGL sans
 * `preserveDrawingBuffer` se capture vide, ce qui produirait un échec faux.
 * Il mesure ce qui est déterministe : la visibilité effective de la chaîne.
 */

const OPACITE_MINIMALE = 0.9;

test.describe('la pièce que l’on règle — visibilité effective', () => {
  test('une fois montée, la scène 3D n’est éteinte par aucun de ses ancêtres', async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'desktop-1280',
      'sous 64 rem la scène ne se charge que sur geste explicite : couvert par scene.spec.ts'
    );

    await page.goto('/');
    await page.locator('[data-scene]').scrollIntoViewIfNeeded();

    // Le montage est conditionné (load, temps mort, proximité) : on attend le
    // canevas plutôt qu'une durée arbitraire.
    const canevas = page.locator('[data-scene] canvas');
    await expect(canevas).toBeAttached({ timeout: 20_000 });

    // ATTENDRE LA FIN DU FONDU D'APPARITION. Le canevas naît à opacity 0 et
    // monte en 450 ms — c'est la substitution voulue « depuis une image
    // identique » (ADR-002). Mesurer pendant ce fondu accuserait le canevas
    // lui-même d'être éteint : un échec de calendrier, pas de défaut. On
    // attend le drapeau que le moteur pose, puis la durée du fondu.
    await expect(page.locator('[data-scene][data-scene-active="oui"]')).toBeAttached({
      timeout: 20_000,
    });
    await page.waitForTimeout(700);

    const diagnostic = await page.evaluate((seuil) => {
      const element = document.querySelector('[data-scene] canvas');
      if (!element) return { monte: false as const };

      const coupables: Array<{ selecteur: string; cause: string }> = [];
      let opaciteCumulee = 1;

      for (let noeud: Element | null = element; noeud; noeud = noeud.parentElement) {
        const style = getComputedStyle(noeud);
        const opacite = Number.parseFloat(style.opacity);
        const nom =
          noeud.tagName.toLowerCase() +
          (noeud.className && typeof noeud.className === 'string'
            ? '.' + noeud.className.trim().split(/\s+/).join('.')
            : '');

        if (style.display === 'none') coupables.push({ selecteur: nom, cause: 'display:none' });
        if (style.visibility === 'hidden') coupables.push({ selecteur: nom, cause: 'visibility:hidden' });
        if (Number.isFinite(opacite) && opacite < seuil) {
          coupables.push({ selecteur: nom, cause: `opacity:${style.opacity}` });
          opaciteCumulee *= opacite;
        }
      }

      const boite = element.getBoundingClientRect();
      return {
        monte: true as const,
        coupables,
        opaciteCumulee,
        largeur: Math.round(boite.width),
        hauteur: Math.round(boite.height),
      };
    }, OPACITE_MINIMALE);

    expect(diagnostic.monte, 'le canevas doit être monté').toBe(true);
    if (!diagnostic.monte) return;

    expect(
      diagnostic.largeur * diagnostic.hauteur,
      'le canevas doit occuper une surface non nulle'
    ).toBeGreaterThan(0);

    expect(
      diagnostic.coupables,
      'un ancêtre éteint la scène — c’est le défaut du 19/08 : ' +
        JSON.stringify(diagnostic.coupables)
    ).toEqual([]);
  });

  test('l’image de repli, elle, s’efface bien quand la scène prend le relais', async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'desktop-1280',
      'la scène ne se monte pas d’elle-même sous 64 rem'
    );

    await page.goto('/');
    await page.locator('[data-scene]').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-scene] canvas')).toBeAttached({ timeout: 20_000 });

    // ATTENTE EXPLICITE, ET NON UNE DURÉE DEVINÉE. Le canevas est attaché
    // AVANT que le moteur ne déclare la scène active : entre les deux, l'image
    // de repli est encore à pleine opacité, et une mesure prise là échoue pour
    // une raison de calendrier, pas de défaut. On attend donc le drapeau que
    // le moteur pose, puis la durée du fondu (450 ms, voir global.css).
    await expect(page.locator('[data-scene][data-scene-active="oui"]')).toBeAttached({
      timeout: 20_000,
    });
    await page.waitForTimeout(700);

    // Le pendant du premier test : la correction ne doit pas avoir laissé
    // l'image peinte VISIBLE par-dessus la scène, ce qui masquerait le
    // luminaire d'une autre façon — le défaut symétrique.
    const opaciteImage = await page.evaluate(() => {
      const repli = document.querySelector('[data-scene] .bande-scene__repli');
      const porteur = repli?.querySelector('picture') ?? repli?.querySelector('img');
      return porteur ? Number.parseFloat(getComputedStyle(porteur).opacity) : null;
    });

    expect(opaciteImage, 'l’image de repli doit exister dans le bloc').not.toBeNull();
    expect(
      opaciteImage as number,
      'l’image de repli doit s’effacer une fois la scène montée'
    ).toBeLessThan(0.1);
  });
});
