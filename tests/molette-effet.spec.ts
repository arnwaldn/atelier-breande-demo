import { expect, test } from '@playwright/test';

/**
 * LA MOLETTE CHANGE-T-ELLE VRAIMENT LA LUMIÈRE ?
 *
 * POURQUOI CE FICHIER EXISTE. Le geste de la molette est la signature du site
 * — « la seule chose qu'on demande au visiteur de faire » (ADR-002). Il a
 * cassé DEUX FOIS le 19/08/2026, de deux façons différentes, et les deux fois
 * c'est un humain qui l'a vu, jamais la campagne :
 *
 *   1. le matin : la molette émettait une température que le moteur consommait
 *      comme une intensité — la lampe s'éteignait au premier geste ;
 *   2. l'après-midi : l'écouteur se retirait lui-même au premier réglage (en
 *      même temps que le scrub de défilement qu'il devait tuer), donc le
 *      premier geste passait et tous les suivants étaient ignorés ; et la
 *      teinte n'atteignait que la lumière ponctuelle et le filament, soit un
 *      point de 20 px sur un bloc de 1 300 — invisible en usage.
 *
 * Un défaut qui revient deux fois n'est pas un accident : c'est une garde qui
 * manque. Celle-ci mesure l'EFFET, pas le câblage — on ne vérifie pas qu'un
 * écouteur existe, on vérifie que les pixels changent, et qu'ils changent
 * ENCORE au troisième geste.
 *
 * Note technique : `?scene-capture` active `preserveDrawingBuffer` sur le
 * rendu WebGL. Sans lui, un canevas se relit VIDE — le test échouerait pour
 * une raison qui n'a rien à voir avec le défaut cherché.
 */

/** Moyenne des canaux sur les pixels non-noirs du canevas de la scène. */
async function lireTeinte(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const source = document.querySelector<HTMLCanvasElement>('[data-scene] canvas');
    if (!source) return null;
    const copie = document.createElement('canvas');
    copie.width = source.width;
    copie.height = source.height;
    const contexte = copie.getContext('2d');
    if (!contexte) return null;
    contexte.drawImage(source, 0, 0);
    const donnees = contexte.getImageData(0, 0, copie.width, copie.height).data;
    let r = 0;
    let v = 0;
    let b = 0;
    let compte = 0;
    for (let i = 0; i < donnees.length; i += 4) {
      // Le fond de la scène est quasi noir : le compter noierait le signal.
      if (donnees[i] + donnees[i + 1] + donnees[i + 2] < 60) continue;
      r += donnees[i];
      v += donnees[i + 1];
      b += donnees[i + 2];
      compte += 1;
    }
    if (compte === 0) return null;
    return { r: r / compte, v: v / compte, b: b / compte, pixels: compte };
  });
}

async function regler(page: import('@playwright/test').Page, t: number) {
  await page.evaluate((valeur) => {
    document.querySelector('[data-scene]')?.dispatchEvent(
      new CustomEvent('breande-reglage', {
        detail: { t: valeur, kelvins: Math.round(2200 + valeur * 1800) },
      })
    );
  }, t);
  await page.waitForTimeout(600);
}

test.describe('la molette — le geste signature', () => {
  test('la teinte de la scène change avec le réglage, et au troisième geste encore', async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'desktop-1280',
      'sous 64 rem la scène ne se monte que sur geste explicite (voir scene.spec.ts)'
    );

    await page.goto('/?scene-capture');
    await page.locator('[data-scene]').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-scene] canvas')).toBeAttached({ timeout: 20_000 });
    await page.waitForTimeout(1500); // laisser l'allumage au défilement se poser

    await regler(page, 0);
    const chaud = await lireTeinte(page);
    await regler(page, 1);
    const froid = await lireTeinte(page);
    await regler(page, 0);
    const retour = await lireTeinte(page);

    expect(chaud, 'le canevas doit être lisible (paramètre ?scene-capture)').not.toBeNull();
    expect(froid).not.toBeNull();
    expect(retour).not.toBeNull();
    if (!chaud || !froid || !retour) return;

    // DÉFAUT n° 2 (teinte figée) : au bout froid, la scène doit contenir
    // sensiblement plus de bleu qu'au bout chaud. Le seuil est bas à dessein —
    // il attrape « rien ne bouge », pas « ça ne bouge pas assez », qui est un
    // arbitrage de direction artistique et non un défaut de code.
    expect(
      froid.b - chaud.b,
      'la teinte ne bouge pas entre 2 200 K et 4 000 K : le réglage est mort ou ne pilote pas la couleur'
    ).toBeGreaterThan(2);

    // DÉFAUT n° 1 (écouteur retiré au premier geste) : le troisième réglage
    // doit encore produire un effet. C'est LUI que la campagne ne voyait pas.
    expect(
      Math.abs(retour.b - froid.b),
      'le troisième réglage n’a plus d’effet : l’écouteur de la molette a été retiré en route'
    ).toBeGreaterThan(2);
  });
});
